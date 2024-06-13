import { app } from "./app.js";
import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "redis";
import { v4 as uuidv4 } from 'uuid';

// Initialize HTTP server and WebSocket server
const httpserver = app.listen(process.env.PORT || 4060);
const wss = new WebSocketServer({ server: httpserver });
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

console.log(`Running on ${process.env.PORT || 4060}`);

// WebSocket connection handler
wss.on('connection', (ws) => {
    ws.on("error", console.error);
    console.log("connected");

    const messageHandler = async (message) => {
        ws.addListener('message',messageHandler);
        const { language, code, userID } = JSON.parse(message);
        if (!language || !code || !userID) {
            ws.send(JSON.stringify({ error: 'Missing parameters' }));
            return;
        }

        const jobID = uuidv4();
        const payload = JSON.stringify({ userID, language, code });
        await redisClient.lPush('submission', payload);

        const responseChannel = `response_`;
        console.log('entered');



        const redisMessageHandler = (message) => {
            console.log(message);
            const response = JSON.parse(message);
            console.log(response)
            if (response.userID === userID) {
                ws.send(JSON.stringify(response));
            }
            cleanup()
        }

        const cleanup = () => {
            console.log('entered3');
            redisClient.unsubscribe(responseChannel);
            ws.removeListener('message', messageHandler);
          
        };


        await redisClient.subscribe(responseChannel, redisMessageHandler);

    };

    ws.on("message", messageHandler);

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
