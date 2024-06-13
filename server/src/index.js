import { app } from "./app.js";
import { WebSocketServer } from "ws";
import { createClient } from "redis";
import { v4 as uuidv4 } from 'uuid';

// Setup HTTP server
const httpServer = app.listen(process.env.PORT || 4060, () => {
  console.log(`Server running on port ${process.env.PORT || 4060}`);
});

// Setup WebSocket server
const wss = new WebSocketServer({ server: httpServer });
wss.setMaxListeners(100);
// Setup Redis client
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  ws.on("error", console.error);
  console.log("Client connected");

  ws.on("message", async (message) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    const { language, code, userID } = JSON.parse(message);
    if (!language || !code || !userID) {
      ws.send(JSON.stringify({ error: 'Missing parameters' }));
      return;
    }

    const jobID = uuidv4();
    const payload = JSON.stringify({ userID, language, code });
    await redisClient.lPush('submission', payload);
    // Subscribe to Redis channel for response
    const responseChannel = `response_`;
    await redisClient.subscribe(responseChannel, (message) => {
      const response = JSON.parse(message);
      console.log(response)
      if (response.userID === userID) {
        ws.send(JSON.stringify(response));
        redisClient.unsubscribe(responseChannel); // Unsubscribe from the channel after receiving the response
        ws.removeListener('message',WebSocket)
        
      }
    });

    // Clean up WebSocket on close
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
});
