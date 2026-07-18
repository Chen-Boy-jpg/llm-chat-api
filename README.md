# LLM Chat Backend

A TypeScript + Node.js backend service for managing multi-session chat conversations with LLM integration.

This project was developed as part of a backend interview assignment and focuses on a simple, modular API structure with PostgreSQL persistence and Docker-based deployment.

## Features

- Create and manage multiple conversation sessions
- Store and retrieve chat history
- Send prompts and receive LLM-generated responses
- Persist data in PostgreSQL using Prisma
- Expose REST endpoints for sessions and messages
- Run the backend and database together with Docker Compose
- Provide API documentation through Fastify Swagger

## System Architecture

```text
Client
  │
  ▼
Fastify API
  │
  ├── Routes
  ├── Services
  ├── Plugins
  │
  ├── Prisma ORM
  │
  ├── LLM Service
  │
  ▼
PostgreSQL Database
```

## Technology Stack

### Backend

- Node.js
- TypeScript
- Fastify
- Prisma ORM

### Database

- PostgreSQL

### LLM

- NVIDIA hosted LLM API
- OpenAI-compatible request format

### DevOps

- Docker
- Docker Compose
- pnpm

## Project Structure

```text
llm-chat-backend/
├── apps/
│   └── server/
│       ├── src/
│       │   ├── routes/
│       │   │   ├── sessions.ts
│       │   │   └── messages.ts
│       │   ├── services/
│       │   ├── plugins/
│       │   └── index.ts
│       ├── prisma/
│       │   └── schema.prisma
│       ├── Dockerfile
│       └── package.json
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Getting Started

### Requirements

Make sure these are installed:

- Node.js >= 22
- pnpm >= 9
- Docker

### Environment Variables

Create a root `.env` file:

```env
NVIDIA_API_KEY=your_nvidia_api_key
NVIDIA_MODEL=your_model_name
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=chatdb
POSTGRES_PORT=5433
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/chatdb
```

> `DATABASE_URL` is used by the server container inside Docker. If you run the app locally, you may need a different value such as `localhost:5433`.

### Run with Docker

Build and start the services:

```bash
docker compose up --build
```

Services:

- Backend: http://localhost:3000
- PostgreSQL: localhost:5433

Stop the services:

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```

## Testing

### Run tests locally

From the project root:

```bash
pnpm --dir apps/server test
```

### Run tests with Docker

Run the automated test service:

```bash
docker compose up --build test
```

This will:

- start PostgreSQL
- wait until the database is ready
- run Prisma schema sync
- execute the Vitest test suite

## API Overview

The backend exposes endpoints for:

- Creating sessions
- Listing sessions
- Fetching a single session
- Updating a session
- Deleting a session
- Creating and retrieving messages
- Streaming message responses

## Database Design

The application uses PostgreSQL to store:

- sessions
- messages

### Data Model

#### Session

- `id`: UUID
- `title`: string
- `createdAt`: datetime
- `updatedAt`: datetime

#### Message

- `id`: UUID
- `sessionId`: UUID
- `role`: string
- `content`: string
- `createdAt`: datetime

## Notes

The current implementation uses a simple Fastify-based backend structure with Prisma for persistence and an OpenAI-compatible LLM service layer that can be swapped to another provider later if needed.
