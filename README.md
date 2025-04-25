# Todo List API

A simple RESTful API for managing todo tasks, built with Go.

## Features

- Create, read, update, and delete tasks
- In-memory storage (can be easily extended to use a database)
- RESTful API design
- Proper error handling
- Request logging

## API Endpoints

### Create a Task
```
POST /tasks
Content-Type: application/json

{
    "title": "My Task",
    "description": "Task description"
}
```

### Get All Tasks
```
GET /tasks
```

### Get a Single Task
```
GET /tasks/{id}
```

### Update a Task
```
PUT /tasks/{id}
Content-Type: application/json

{
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true
}
```

### Delete a Task
```
DELETE /tasks/{id}
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   go mod download
   ```
3. Run the server:
   ```bash
   go run cmd/api/main.go
   ```

The server will start on port 8080.

## Project Structure

```
.
├── cmd/
│   └── api/
│       └── main.go
├── internal/
│   ├── handlers/
│   │   └── task_handler.go
│   ├── models/
│   │   └── task.go
│   └── repository/
│       └── task_repository.go
└── README.md
```

## Dependencies

- [gorilla/mux](https://github.com/gorilla/mux) - HTTP router
- [google/uuid](https://github.com/google/uuid) - UUID generation 