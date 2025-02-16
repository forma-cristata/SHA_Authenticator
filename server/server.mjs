import express from 'express';
import {getClasses} from "./githubsies.mjs";
import bodyParser from "express";

const app = express();
const PORT = 3012;

app.use(bodyParser.json());

const server = app.listen(PORT, () =>
{
    console.log(`Server is listening on http://localhost:${PORT}`);
});

// Console.log when the server receives a request
app.get('/classes', async (req, res) => {
    console.log('Received a request for objects');
    console.log(req.body);
    const classes = await getClasses();
    console.log(classes);
    res.json(classes);
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
