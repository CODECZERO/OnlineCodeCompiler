# if you are using nodemon or npm run dev, while using it, the chance of node/js code not working is very high because nodemon doesn't allow it for some reason
# so while using worker use node or npm run start

# Worker Component

The Worker component in this project is responsible for executing code snippets received from the server. It operates in an isolated environment, communicating with the server via Redis Pub/Sub. This README provides an overview of its functionality, setup instructions (including Docker configuration), and usage guidelines.

## Overview

The Worker component is designed to handle code execution in various languages. It operates in isolation to ensure security and stability. It communicates with the server through a Redis channel, where it listens for new code submissions and publishes the execution results back.

### Features

- **Multi-Language Support**: Capable of executing code written in Python, Node.js, C, and C++.
  
- **Isolated Execution**: Operates in an isolated environment to ensure security and prevent interference with other system components.
  
- **Error Handling**: Handles compilation errors and runtime errors gracefully, publishing error messages to Redis for server-side handling.

- **Asynchronous Execution**: Supports concurrent execution of multiple code submissions, ensuring efficient handling of incoming requests.

## Setup

To run the Worker component locally or in a containerized environment (Docker), follow these steps:

1. **Install Dependencies**: Ensure Redis and necessary compilers/interpreters are installed in your environment.

2. **Environment Variables**:
   - `REDIS_HOST`: Hostname/IP of the Redis server.
   - `REDIS_PORT`: Port on which Redis server is running.
   - Additional environment variables for specifying ports, if necessary.

3. **Docker Configuration**:
   - Build Docker image:
     ```
     docker build -t worker-image .
     ```
   - Run Docker container:
     ```
     docker run --rm -d --name worker-container worker-image
     ```
   - Adjust Docker run command as needed based on your environment variables and configuration.

## Usage

Once the Worker component is running, it will automatically start listening for code submissions from the server. Ensure the server is correctly configured to publish code submissions to the designated Redis channel that the Worker is subscribed to.

## Contributing

Contributions are welcome! If you'd like to improve this Worker component, fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](https://github.com/CODECZERO/OnlineCodeCompiler/blob/main/MIT-LICENSE.txt).
