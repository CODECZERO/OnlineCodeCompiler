
# Server Component

The Server component in this project facilitates WebSocket communication to handle incoming code submissions from clients. It utilizes Redis Pub/Sub for efficient communication with the Worker component, ensuring seamless code execution and result delivery. This README provides an overview of its functionality, setup instructions (including Docker configuration), and usage guidelines.

## Overview

The Server component primarily serves as a WebSocket server that listens for incoming code submissions from clients. It validates and processes these submissions, publishes them to a Redis channel where the Worker component listens, and subsequently sends back the execution results received from the Worker to the respective clients via WebSocket.

### Features

- **WebSocket Support**: Handles bidirectional communication with clients using WebSocket protocol.
  
- **Validation and Error Handling**: Validates incoming code submissions and handles errors gracefully.
  
- **Efficient Communication**: Utilizes Redis Pub/Sub for asynchronous messaging between the server and Worker component, ensuring efficient code execution and result retrieval.

## Setup

To run the Server component locally or in a containerized environment (Docker), follow these steps:

1. **Install Dependencies**: Ensure Node.js and Redis are installed in your environment.

2. **Environment Variables**:
   - `REDIS_HOST`: Hostname/IP of the Redis server.
   - `REDIS_PORT`: Port on which Redis server is running.
   - `SERVER_PORT`: Port on which the WebSocket server will listen for incoming connections.
   - Additional environment variables for configuring other aspects of the server, if necessary.

3. **Docker Configuration**:
   - Build Docker image:
     ```
     docker build -t server-image .
     ```
   - Run Docker container:
     ```
     docker run --rm -d --name server-container server-image
     ```
   - Adjust Docker run command as needed based on your environment variables and configuration.

## Usage

Once the Server component is running, it will start listening for WebSocket connections from clients. Clients can establish WebSocket connections and submit code for execution. The server validates the submissions, publishes them to the Redis channel that the Worker component is subscribed to, and relays the execution results back to the clients via WebSocket.

## Contributing

Contributions are welcome! If you'd like to improve this Server component, fork the repository and submit a pull request with your changes.

## License
This project is licensed under the [MIT License](https://github.com/CODECZERO/OnlineCodeCompiler/blob/main/MIT-LICENSE.txt).
