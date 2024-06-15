# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# OnlineCodeCompiler - Client (Frontend)

Welcome to the Client (Frontend) repository of **Project Name**. This repository contains the frontend component built using Vite and React.js, which interacts with the server via WebSocket for submitting code and receiving execution results.

## Overview

The Client component is the frontend interface of **Project Name**, responsible for facilitating interactions between users and the server. It leverages WebSocket communication to enable real-time code submission and execution result retrieval.

### Features

- **WebSocket Integration**: Establishes WebSocket connections with the server to facilitate real-time communication for code submission and result retrieval.
  
- **User Interface**: Provides an intuitive user interface built with React.js, offering seamless interactions for code input and output display.
  
- **Efficient Build Process**: Utilizes Vite for fast development and optimized production builds.

## Setup

To run the Client component locally or deploy it in a containerized environment (Docker), follow these steps:

1. **Install Dependencies**: Ensure Node.js and npm (Node Package Manager) are installed on your system.

2. **Environment Variables**:
   - Configure environment variables specific to the Client component. This may include the WebSocket server URL or any other necessary configurations.

3. **Local Development**:
   - Clone this repository:
     ```
     git clone <repository-url>
     cd client
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the development server:
     ```
     npm run dev
     ```
   - Access the client application at `http://localhost:3000`.

4. **Docker Configuration**:
   - Build Docker image:
     ```
     docker build -t client-image .
     ```
   - Run Docker container:
     ```
     docker run --rm -d -p 3000:3000 --name client-container client-image
     ```
   - Adjust Docker run command based on your environment variables and configuration needs.

## Usage

Once the Client component is running, it will connect to the WebSocket server (configured via environment variables) and provide a user-friendly interface for users to input code. Upon submission, the Client will display real-time execution results received from the server via WebSocket.

## Contributing

Contributions are welcome! If you'd like to improve this Client component, fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](https://github.com/CODECZERO/OnlineCodeCompiler/blob/main/MIT-LICENSE.txt).

