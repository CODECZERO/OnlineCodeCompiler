import { WebSocketServer } from "ws";
import { createClient } from "redis";
import express from "express";

const app = express();

const PublishData = async () => {
    const httpServer = app.listen(process.env.PUBPORT || 4000);
    console.log(`Running on port ${process.env.PUBPORT || 4000}`);
    const wss = new WebSocketServer({ server: httpServer });

    const redisClient = createClient();
    redisClient.on("error", (error) => console.error(`Redis Client Error: ${error}`));
    console.log("Reids connect")
    await redisClient.connect();

    const listener = process.env.PUBID || 'response_';

    wss.on('connection', async (ws) => {
        console.log("WebSocket client connected");
        ws.on('error', console.error);
        await redisClient.subscribe(listener, (message) => {
            if (!message) {
                console.log("no message")
            }
            ws.send(message);
        });
        ws.on('close', () => {
            console.log('WebSocket client disconnected');
            redisClient.unsubscribe(listener);
        });
    });
}

PublishData();
