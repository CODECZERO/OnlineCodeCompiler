import { app } from "./app.js";
import { WebSocketServer } from "ws";
import { createClient } from "redis";
import { v4 as uuidv4 } from 'uuid';


const httpserver = app.listen(process.env.PORT || 4060);
const wss = new WebSocketServer({ server: httpserver });

const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();
console.log(`Running on ${process.env.PORT || 4060}`);
wss.on('connection', (ws) => {
    ws.on("error", console.error);
    console.log("connected");
    ws.on("message", async (message) => {
        const { language, code, userID } = JSON.parse(message);
        if (!language || !code || !userID) {
            ws.send(JSON.stringify({ error: 'Missing parameters' }));
            return;
        }

        const jobID = uuidv4();
        const payload = JSON.stringify({ jobID, userID, language, code });
        await redisClient.lPush('submission', payload);
        const responseChannel = `response_`;
        console.log("etntered");
        const toConvertJson= await redisClient.rPop(responseChannel);
       console.log(toConvertJson);
       const response=JSON.parse(toConvertJson);
        if(response.userID===userID){
            console.log(response);
        }

        

    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
})