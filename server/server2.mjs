
import express from 'express';
import bodyParser from "express";
import cors from 'cors';
import fs from 'fs';
import {ClassesGHRequest} from "./classesAndAssignments.mjs";

const app = express();
const PORT = 3009;

app.use(bodyParser.json());
app.use(cors());

let username_filler = "";

const server = app.listen(PORT, () =>
{
    console.log(`Server is listening on http://localhost:${PORT}`);

});

// TODO THIS IS ALL HOT GARBAGE.
/*

// Console.log when the server receives a request
app.get(`/start`, async (req, res) => {
    /!*console.log('Received a request for classes');
    let username = req.query.username;
    const forkedRepositories = await getClasses();
    console.log(forkedRepositories);
    if(forkedRepositories){
        const classes = ParseClasses(username, forkedRepositories);
        res.json(classes);}*!/
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

    try {
        fs.writeFileSync(path, JSON.stringify(allRepos));
        console.log('File written successfully.');
    } catch (err) {
        console.error('An error occurred while writing the file:', err);
    }
}




app.get(`/classes`, async (req, res) =>
{
    let c = await ClassesGHRequest();
    res.json(c);
});
*/
