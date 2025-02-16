import express from 'express';
import {getClasses} from "./githubsies.mjs";
import bodyParser from "express";
import ParseClasses from "./parseClasses.mjs";
import ParseAssignmentsInGivenClass from "./parseAssignmentsInGivenClass.mjs";
import ParseSHAs from "./parseSHAs.mjs";

const app = express();
const PORT = 3012;

app.use(bodyParser.json());

let chosenAssignment = 'Something Something'; // todo: how to set??
let chosenClass = 'IT241JavaScript'; // todo: how to set??
let chosenUsername = 'kcraycraft45'; // todo, how to set??

const server = app.listen(PORT, () =>
{
    console.log(`Server is listening on http://localhost:${PORT}`);
});

// Console.log when the server receives a request
app.get(`/classes`, async (req, res) => {
    console.log('Received a request for classes');

    const forkedRepositories = await getClasses(chosenUsername);
    const classes = ParseClasses(chosenUsername, forkedRepositories);

    res.json(classes);
});

app.get(`/class/assignments`, async (req, res) => {
    console.log('Received a request for assignments');

    const forkedRepositories = await getClasses();
    const assignments = await ParseAssignmentsInGivenClass(chosenUsername, chosenClass, forkedRepositories);


    res.json(assignments);
});

app.get('/shas', async (req, res) => {
    console.log("Received a request for shas");

    const forkedRepositories = await getClasses();
    const shas = ParseSHAs('SouthHillsSubmissionCheck/testingtesting-kcraycraft45', forkedRepositories);

    res.json(shas);
});



/*
wss.on('connection', (ws) =>
{
    console.log('New client connected');

    getClasses();


    ws.on('message', (message) =>
    {
       // When we get a message
        console.log(`Received ${message}`);

        // Send an ack back to client
        ws.send(`Server received ${message}`);
    });

    // When the user disconnects (closes the tab), they have closed the web socket
    ws.on('close', () =>
    {
        console.log('Client has disconnected');
    });
});
*/
