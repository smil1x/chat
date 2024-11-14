# NestJS Chat Application

This is a backend chat application built with NestJS. The application uses WebSockets for real-time messaging and a PostgreSQL database for storing chat messages. The app is designed to run in Docker, and it requires specific environment variables for proper configuration.

## Features

- Real-time messaging using WebSockets
- User authentication with JWT tokens
- PostgreSQL database integration
- Dockerized application

## Prerequisites

Before you begin, make sure you have the following installed:

- Docker
- Docker Compose
- Node.js (for local development and testing)
- PostgreSQL (for local development)

## Getting Started

### 1. Setup Environment Variables

Before starting the application, you need to configure the environment variables.

1. Create a `.env` file in the root directory of the project.
2. Define the required variables in this file.

Example `.env` file:
```plaintext
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres_password
DB_NAME=chat_db
DB_MIGRATIONS_RUN=true
JWT_SECRET=your_jwt_secret_key
APP_PORT=3000
```
- APP_PORT - the port on which the application is running - optional, default 3000

### 2. Running the app for production
```bash
$ docker-compose build
$ docker-compose up
```

## Default Admin User

Upon starting the application for the first time, a default admin user will be automatically created in the database.
This user will have the **admin** role, and you can use this account to log in to the application.

### Default Admin User Credentials:
- **Username:** admin
- **Password:** admin

You can use these credentials to log in and start using the chat application.

## API Documentation
Once the application is running, the API documentation can be accessed at **http://<your_host>/api** via Swagger UI.

## DB Migration

To manage DB migrations you can use the following commands:

```bash
$ npm run migration:create src/migrations/<migration-name>
$ npm run migration:generate src/migrations/<migration-name>
$ npm run migration:run 
$ npm run migration:down 
```