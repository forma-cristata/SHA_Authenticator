import express from 'express';
import bodyParser from "express";
import cors from 'cors';
import {AssignmentsCacheRequest} from "./assignmentsAndClasses.mjs";
import {ClassesCacheRequest} from "./classesAndAssignments.mjs";
import {shaGHRequest, generateFeedback} from "./shas.mjs";

const app = express();
const PORT = 3012;

app.use(bodyParser.json());
app.use(cors());

const server = app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

app.get(`/classes`, async (req, res) => {
    console.log('Received a request for classes');
    let data = await ClassesCacheRequest();
    res.json(data);
});

app.get(`/assignments`, async (req, res) => {
    console.log('Received a request for assignments');
    let data = await AssignmentsCacheRequest(req.query.classname);
    res.json(data);
});

app.get('/shas', async (req, res) => {
    console.log("Received a request for shas");
    let username = req.query.username;
    let assignment = req.query.assignment;
    let shaToCheck = req.query.sha;
    let validSHAs = await shaGHRequest(assignment, username);
    res.json([generateFeedback(validSHAs, shaToCheck)]);
});
