# React Chat Application

This is a simple chat application built with React, Vite, and MobX for state management. The application includes user registration, login, and a chat room where authorized users can send and receive messages in real-time.

## Features
- User registration and login
- Real-time messaging
- Role-based access: only admins can send messages, while all users can view them

## Prerequisites
- Node.js
- npm or yarn

## Getting Started

### 1. Install dependencies
```bash
npm install
# or
yarn install
```

### 2. Setup Environment Variables

Before starting the application, you need to configure the environment variables.

1. Create a `.env` file in the root directory of the project.
2. Define the required variables in this file.


Example `.env` file:
```plaintext
VITE_SERVER_URL=http://localhost:3000
```

### 3. Running the app
```bash
# development
$ npm run dev
# or
$ yarn dev
```

### 4. Running the app
```bash
# development
$ npm run build
# or
$ yarn build
```

