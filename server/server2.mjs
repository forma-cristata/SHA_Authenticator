
import express, {json} from 'express';
import {getClasses} from "./githubsies.mjs";
import bodyParser from "express";
import ParseClasses from "./parseClasses.mjs";
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3009;

app.use(bodyParser.json());
app.use(cors());

let username_filler = "";

const server = app.listen(PORT, () =>
{
    console.log(`Server is listening on http://localhost:${PORT}`);

});



// Console.log when the server receives a request
app.get(`/start`, async (req, res) => {
    /*console.log('Received a request for classes');
    let username = req.query.username;
    const forkedRepositories = await getClasses();
    console.log(forkedRepositories);
    if(forkedRepositories){
        const classes = ParseClasses(username, forkedRepositories);
        res.json(classes);}*/
   let intervalNum = setInterval(async () => {
       let allRepos = await getClasses();
       await compareObjects(allRepos);
       }, 30000); // TODO THIS SHOULD BE 30 SECONDS... IT BREAKS IF 1 SECOND DON'T DO IT. PATIENCE IS A VIRTUE

    res.json("SUCCESS"); // todo: you are successful here, you are here
});


async function compareObjects(allRepos) {
    const path = `./savedRepositories.json`;
    let savedRepos = [];

    try {
        const data = fs.readFileSync(path, 'utf8');
        console.log(data); // TODO YOU ARE HERE
        savedRepos = JSON.parse(data);
        console.log("Here is your file contents:");
        console.log(savedRepos);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File not found, creating a new one.');
        } else {
            console.error('An error occurred while reading the file:', err);
            return;
        }
    }

    // Compare
    // If changes
    try {
        await fs.writeFile(path, JSON.stringify(allRepos));
        console.log('File has been written successfully.');
    } catch (err) {
        console.error('An error occurred while writing the file:', err);
    }
    // else, return
}


/*async function compareObjects(allRepos) {   /!*: Repository[]*!/
    const path = './savedRepos.txt';
    let savedRepos = [];

    try {
        const data = await fs.readFile(path, 'utf8');
        savedRepos = JSON.parse(data);
        console.log("Here is your file contents:");
        console.log(savedRepos);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File not found, creating a new one.');
        } else {
            console.error('An error occurred while reading the file:', err);
            return;
        }
    }

    // Compare
    // If changes
    try {
        await fs.writeFile(path, JSON.stringify(allRepos));
        console.log('File has been written successfully.');
    } catch (err) {
        console.error('An error occurred:', err);
    }
    // else, return
}*/

/*async function compareObjects(allRepos) {   /!*: Repository[]*!/
    const path = './savedRepos.txt';
    const reader = new FileReader();
    let savedRepos = [];


    reader.onprogress = (event) => {
        if (event.lengthComputable) {
            const percentComplete = Math.round(event.loaded / event.total * 100);
            console.log(percentComplete);
            if (percentComplete < 100) {
                console.log("Still loading");
            } else {
                console.log("Upload Complete");
            }
        }
    };


    reader.onload = (event) => {
        savedRepos = event.target.result;
        console.log("Here is your file contents bitch");
        console.log(savedRepos);
    };


    // Get repos from savedRepositories.json as an array of Repository objects

    // Compare

    // If changes
    // Write them to savedRepositories.json

    try {
        await fs.writeFile(path, JSON.stringify(allRepos));
        console.log('File has been written successfully.');
    } catch (err) {
        console.error('An error occurred:', err);
    }

    /!*
        fs.writeFileSync(path, json(allRepos), () => {console.log("Successful write");});
    *!/

    // else, return
}*/

/*
interface Repository {
    repositoryName;
    username;
    assignmentId;
    assignmentName;
    classId;
    className;
    sHAs;
}*/


/*
* If the file is empty, indicate you need a moment to write to it since writing is async
*
* */