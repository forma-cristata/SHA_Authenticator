import fs from "fs";
import {octokit} from "./classesAndAssignments.mjs";

export { AssignmentsGHRequest, AssignmentsCacheRequest, organization};


const organization = "SouthHillsSubmissionCheck";



function WriteAssignmentsToFile(assignments, cId){
    const path = `./assignments${cId}.json`;

    try {
        fs.writeFileSync(path, JSON.stringify(assignments));
        console.log('File written successfully.');
    } catch (err) {
        console.error('An error occurred while writing the file:', err);
    }
}






async function AssignmentsGHRequest(cId, username) {
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



async function AssignmentsCacheRequest(cName, username)
{
    const classPath = './classes.json';
    let cId = 0;

    let cachedAssignments = [];

    try{
        const classData = await fs.readFileSync(classPath, 'utf8');
        let classes = JSON.parse(classData);
        console.log(classes[classes.indexOf(cName) + 1]);
        cId = parseInt(classes[classes.indexOf(cName) + 1]);
    }
    catch(error){
        console.log(error)
    }

    const assPath = `./assignments${cId}.json`;



    try {
        const data = await fs.readFileSync(assPath, 'utf8');
        console.log(data);

        cachedAssignments = JSON.parse(data);

        console.log("Here are your file contents:");
        console.log(cachedAssignments)

        return cachedAssignments;
    } catch (err) {
        //console.error('An error occurred while reading the file:', err);

        return await AssignmentsGHRequest(cId, username);
    }
}

function ParseAssignmentNames(data){
    let aNames = [];
    for(let i = 0; i < data.length; i = i+2)
    {
        aNames.push(data[i].title);
    }
    return aNames;
}