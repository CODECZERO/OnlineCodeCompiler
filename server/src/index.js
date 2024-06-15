import { app } from "./app.js";
import { WebSocketServer} from "ws";
import { createClient } from "redis";
import {config} from "dotenv";
config()

const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
// Initialize HTTP server and WebSocket server
const httpserver = app.listen(process.env.PORT || 4070);
const wss = new WebSocketServer({ server: httpserver });
const redisClient = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();



const responseChannel = process.env.RESPONSE_CHANNEL||"response_";
const submissionChannel=process.env.SUBMISSION_CHANNEL||"submission";

console.log(`Running on ${process.env.PORT || 4070}`);

// WebSocket connection handler
try {
    wss.on('connection', async (ws) => {
        ws.on("error", console.error);
        console.log("connected");
        
        const messageHandler = async (message) => {
            ws.addListener('message',messageHandler);

            const { language, code, userID } = JSON.parse(message);
            if (!language || !code || !userID) {
                ws.send(JSON.stringify({ error: 'Missing parameters' }));
                return;
            }
    
            const payload = JSON.stringify({ userID, language, code });
            
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
    
            await redisClient.lPush(submissionChannel, payload);
    
            
            console.log('entered');
    
            const redisMessageHandler = (message) => {
                const response = JSON.parse(message);
                if (response.userID === userID) {
                    ws.send(JSON.stringify(response?.output||response?.error));
                }
                cleanup()
            }
    
            const cleanup = () => {
                redisClient.unsubscribe(responseChannel);
                ws.removeListener('message', messageHandler);
              
            };
    
          
            await redisClient.subscribe(responseChannel, redisMessageHandler);
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
    
        };
    
        ws.on("message", messageHandler);
    
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
} catch (error) {
    throw error
}