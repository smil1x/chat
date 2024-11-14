# Chat Application

This repository contains a full-stack chat application with a frontend built in React and a backend built using NestJS.
The application features real-time messaging, user authentication, and role-based access


## Project Structure

The project is organized into two main directories:

- **frontend/**: Contains the React application that serves as the client-side for the chat application.
- **backend/**: Contains the NestJS application that provides the backend API, user authentication, and WebSocket communication.

## Features

- **Real-time messaging** using WebSockets.
- **User authentication** (register/login) with JWT.
- **Role-based access control** (admin users can send messages).
- **Message persistence** using PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** and **Docker Compose** (for running the backend and database in containers).
- **Node.js** (for running the frontend).

## 1. Clone the Repository

Clone the repository to your local machine.

## 2. Backend Setup (NestJS)
### 2.1 Navigate to the backend directory:

```bash
$ cd ./backend
```

### 2.2 Create `.env` file
Create a `.env` file in the backend directory and provide the required environment variables:
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

### 2.3 Run the Backend
```bash
$ docker-compose build
$ docker-compose up
```

## 3. Frontend Setup (React)
### 3.1 Install Dependencies:
Navigate to the frontend directory and install the required dependencies:
```bash
$ cd frontend
$ npm install
```
### 3.2 Create `.env` file
Create a .env file in the frontend directory and provide the server URL.

Example `.env` file:
```plaintext
VITE_SERVER_URL=http://localhost:3000
```

### 3.3 Run the Frontend
To run the React frontend locally, use the following command:
```bash
$ npm run dev
# or
$ yarn dev
```
This will start the frontend application on http://localhost:5173.

## 4 Usage

1. Open the React application in your browser.
2. Use the login form to authenticate (use default admin credentials to send messages).
3. Once logged in, you can access the chat room and send messages if you are an admin.
4. All users can view messages in real-time.

Default Admin User Credentials:
- **Username:** admin
- **Password:** admin