import fs from "fs";
import {octokit} from "./classesAndAssignments.mjs";
export {WriteAssignmentsToFile, ParseAssignmentNames, AssignmentsGHRequest, AssignmentsCacheRequest, organization};

const organization = JSON.parse(fs.readFileSync('../app.config.json', 'utf8')).organization;

function WriteAssignmentsToFile(assignments, cId) {
    const path = `../database/assignments${cId}.json`;
    try {
        fs.writeFileSync(path, JSON.stringify(assignments));
    } catch (err) {
        console.error('An error occurred while writing the file:', err);
    }
}

async function AssignmentsGHRequest(cId) {
    try {
        let data = (await octokit.request(`GET /classrooms/${cId}/assignments`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        let aNames = ParseAssignmentNames(data);
        WriteAssignmentsToFile(aNames, cId);
        return aNames;
    } catch (error) {
        console.log(error);
    }
}

async function AssignmentsCacheRequest(cName, username) {
    const classPath = '../database/classes.json';
    let cId = 0;
    let cachedAssignments = [];
    try {
        const classData = await fs.readFileSync(classPath, 'utf8');
        let classes = JSON.parse(classData);
        cId = parseInt(classes[classes.indexOf(cName) + 1]);
    } catch (error) {
        console.log(error)
    }
    const assPath = `../database/assignments${cId}.json`;
    try {
        const data = await fs.readFileSync(assPath, 'utf8');
        cachedAssignments = JSON.parse(data);
        return cachedAssignments;
    } catch (err) {
        return await AssignmentsGHRequest(cId, username);
    }
}

function ParseAssignmentNames(data) {
    let aNames = [];
    for (let i = data.length - 1; i >= 0; i--) {
        aNames.push(data[i].title);
    }
    return aNames;
}