import express from 'express';
import { WebSocketServer } from 'ws';
import {getClasses} from "./githubsies.mjs";

const app = express();
const PORT = 3012;

const server = app.listen(PORT, () =>
{
    console.log(`Server is listening on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({server});

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
