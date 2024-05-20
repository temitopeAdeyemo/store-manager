# Product Management Application

This application is a Node.js based service that manages products and implements token-based authentication. It supports functionalities such as registering and logging in of users, creating and managing products, and fetching products by the user who uploaded them. The application is containerized using Docker and includes a rate limiter to control traffic and enhance security against denial-of-service (DoS) attacks.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Docker](#docker)
- [Unit Test](#docker)
- [Rate Limiting](#rate-limiting)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v12.x or higher)
- npm (v10.x or higher)
- Docker
- Docker Compose
- Redis (Used with rate limiter)

### Installation

1. Clone the repository:

   https://github.com/temitopeAdeyemo/store-manager.git
   cd store-manager

   ```

   ```
2. Install dependencies:

   ```bash
   npm i
   ```

## Usage

To start the application in development mode:

```bash
  yarn start:dev
```

## Docker

The application is containerized using Docker. To run the application in a Docker container:

1. Ensure Docker is running on your machine.
2. Navigate to the Docker directory:

   ```bash
    cd docker
   ```
3. Run the following command to build and start the containers:

   ```bash
   docker-compose up
   ```

   This will start the application along with any other services defined in the `docker-compose.yml` file. The application should then be running.

## Unit Test

The application is unit tested with jest. Test can be run using

```bash
    npm run test 
```

## Rate Limiting

The application includes a rate limiter to control traffic and protect against denial-of-service (DoS) attacks. The rate limiter is configured using the following environment variables:

The traffic rate is controlled depending on the endpoint, where traffics to endpoints that writes or modify data are more controlled.

These settings help mitigate potential DoS attacks by limiting the number of requests a client can make in a specified time frame.
