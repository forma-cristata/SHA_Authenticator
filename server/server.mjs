import express from 'express';
import {getClasses} from "./githubsies.mjs";
import bodyParser from "express";
import ParseClasses from "./parseClasses.mjs";
import ParseAssignmentsInGivenClass from "./parseAssignmentsInGivenClass.mjs";
import ParseSHAs from "./parseSHAs.mjs";
import cors from 'cors';
import {Octokit} from 'octokit';


const app = express();
const PORT = 3012;

app.use(bodyParser.json());
app.use(cors());


const server = app.listen(PORT, () =>
{
    console.log(`Server is listening on http://localhost:${PORT}`);
});

// Console.log when the server receives a request
app.get(`/classes`, async (req, res) => {
    console.log('Received a request for classes');
    let octokit = new Octokit({});

    // Tell other server to begin checking for changes
    let data = ((await octokit.request(`GET http://localhost:3009/start`, {}))).data;
    console.log("HERE IS THE COWBOY SHIT;")
    console.log(data);


    let username = req.query.username;
    const forkedRepositories = await getClasses();
/*
    console.log(forkedRepositories);
*/
    if(forkedRepositories){
        const classes = ParseClasses(username, forkedRepositories);
        res.json(classes);

    }

});

app.get(`/assignments`, async (req, res) => {
    console.log('Received a request for assignments');
    let username = req.query.username;
    let className = req.query.classname;
    const forkedRepositories = await getClasses();
    const assignments = await ParseAssignmentsInGivenClass(username, className, forkedRepositories);


    res.json(assignments);
});

app.get('/shas', async (req, res) => {
    console.log("Received a request for shas");
    let username = req.query.username;
    let className = req.query.classname;
    let assignment = req.query.assignment;
    let shaToCheck = req.query.sha;


    const forkedRepositories = await getClasses();
    const feedback = ParseSHAs(username, className, assignment, forkedRepositories, shaToCheck);
    console.log(feedback);
    res.json([feedback]);
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
