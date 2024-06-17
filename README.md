# OnlineCodeCompiler
#Online Code Runer 

## Overview

This project is a web-based code compilation and execution system designed to allow users to submit code via a client interface, which is then processed by a server and executed by an isolated worker. The results are communicated back to the client seamlessly. The project leverages Docker for containerization and Redis for message brokering.

## Project Structure

- **client/**: Contains the frontend code for user interaction.
- **server/**: Contains the backend code for handling client requests and communicating with the worker.
- **worker/**: Contains the code execution environment. This service runs the submitted code and returns the output.

## Features

- **Multi-language Support**: Supports execution of code in various programming languages including Python, Node.js, C, and C++.
- **Containerized Execution**: Uses Docker to isolate the worker environment, ensuring secure and consistent execution.
- **Asynchronous Processing**: Utilizes Redis for queuing submissions and publishing results, allowing for scalable and efficient processing.

## Prerequisites

- **Docker**: Ensure Docker is installed on your system.
- **Docker Compose**: Used for orchestrating the multi-container setup.
- **Node.js and npm**: Required for building the client and server applications.

## Setup Instructions

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/CODECZERO/OnlineCodeCompiler.git
    cd OnlineCodeCompiler
    ```

2. **Environment Variables**:
    Provide env in  dockerfile in there respect directory with the following variables:
    ```
    # Redis
    REDIS_HOST=redis
    REDIS_PORT=6379

   # Server Environment Variables
    ENV REDIS_HOST=redis
    ENV REDIS_PORT=6379
    ENV SERVER_PORT=4060


    # Client Environment Variables
    ENV VITE_WEBSOCKET_URLL=ws://loclahost:4060
    ENV PORT=5173

  # Worker Environment Variables
    ENV REDIS_HOST=redis
    ENV REDIS_PORT=6379
    ENV WORKER_PORT=4080

    ```

3. **Build and Start the Containers**:
    ```sh
    docker-compose up --build
    ```

4. **Access the Client**:
    Open your browser and navigate to `http://localhost:5173` to access the client interface.

## Usage

- **Client**: Users can submit their code through a web interface.
- **Server**: Receives code submissions from the client, pushes them to Redis, and waits for the worker to process the code.
- **Worker**: Listens for new code submissions in Redis, executes the code, and publishes the results back to Redis.

## Development

### Adding New Languages

To add support for a new programming language, you need to update the worker configuration to include the new language's compilation and execution commands.

### Testing

Ensure that you write tests for any new features or languages added to the project. Use the existing structure and Docker setup to run your tests in an isolated environment.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/CODECZERO/OnlineCodeCompiler/blob/main/LICENSE.txt) file for details.

## Acknowledgments

Thank you to all contributors and the open-source community for your support and contributions.
