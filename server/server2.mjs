import express from 'express';
import bodyParser from 'express';
import cors from 'cors';
import {octokit} from "./classesAndAssignments.mjs";
import { ParseAssignmentNames, WriteAssignmentsToFile} from "./assignmentsAndClasses.mjs";
import fs from "fs";

const app = express();
const PORT = 3009;

app.use(bodyParser.json());
app.use(cors());

setTimeout(pollClassesAndAssignments, 10000);


const server = app.listen(PORT, () => {
    console.log(`Server is polling on http://localhost:${PORT}`);

});



async function pollClassesAndAssignments() {
    let classes = await ClassesGHRequest();
    for(let i = 0; i < classes.length; i++)
    {
        await AssignmentsGHRequest(classes[i])
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
        console.log(aNames);
        return aNames;


    } catch (error) {
        console.log(error);
    }
}

async function ClassesGHRequest() {
    try {
        let data = (await octokit.request('GET /classrooms', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        return await ParseClasses(data);

    } catch (error) {
        console.log(error);
    }
}

async function ParseClasses(data) {
    let classes = [];
    let classIds = [];
    for (let i = 0; i < data.length; i++) {
        classIds.push(data[i].id.toString());

        classes.push(data[i].name);
        classes.push(data[i].id.toString());
    }
    return classIds;
}

function WriteClassesAndAssignmentsToFile(assignments, cId){
    const path = `./assignments${cId}.json`;

    try {
        fs.writeFileSync(path, JSON.stringify(assignments));
        console.log('File written successfully.');
    } catch (err) {
        console.error('An error occurred while writing the file:', err);
    }
}