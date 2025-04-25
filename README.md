# Todo List Application

A simple Todo List application built with Go backend and Qwik.js frontend.

## Project Structure

- `cmd/api`: Contains the main Go application entry point
- `internal`: Contains the internal Go packages
  - `handlers`: HTTP request handlers
  - `models`: Data models
  - `repository`: Data storage
- `web`: Qwik.js frontend application

## Prerequisites

- Go 1.21 or later
- Node.js 18 or later
- npm or yarn

## Running the Application

### Backend (Go API)

1. Start the Go backend:

```bash
go run cmd/api/main.go
```

This will start the API server at `http://localhost:8080`.

### Frontend (Qwik)

1. Navigate to the web directory:

```bash
cd web
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

This will start the Qwik dev server at `http://localhost:5173`.

## API Endpoints

- `GET /tasks`: Get all tasks
- `GET /tasks/{id}`: Get a specific task
- `POST /tasks`: Create a new task
- `PUT /tasks/{id}`: Update a task
- `DELETE /tasks/{id}`: Delete a task

## Qwik Components

- `TaskList`: Main component that displays and manages tasks
- `TaskItem`: Component to display a single task
- `TaskForm`: Component to add new tasks

## Features

- Create, read, update, and delete tasks
- In-memory storage (can be easily extended to use a database)
- RESTful API design
- Proper error handling
- Request logging

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   go mod download
   ```