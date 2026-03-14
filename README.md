# QueueForge - Distributed Job Queue

[![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)](https://nodejs.org/)
[![Redis](https://img.shields.io/badge/redis-v7.0+-red.svg)](https://redis.io/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-v15+-336791.svg)](https://www.postgresql.org/)
[![BullMQ](https://img.shields.io/badge/bullmq-latest-orange.svg)](https://docs.bullmq.io/)
[![Docker](https://img.shields.io/badge/docker-compose-2496ED.svg)](https://www.docker.com/)


QueueForge is a distributed background job processing system built with
Node.js and TypeScript.\
It provides a scalable architecture for handling asynchronous tasks such
as email delivery, report generation, webhook dispatching, and other
long‑running backend workloads.

The system separates API handling from task execution using a
Redis-backed job queue and dedicated worker processes.

------------------------------------------------------------------------

```
Client
  |
  v
API Service (Express)
  |
  v
Redis Queue (BullMQ)
  |
  v
Worker Processes
  |
  v
PostgreSQL (Job Persistence)
```

**Key Idea:**\
User requests enqueue jobs through an API. Workers consume jobs
asynchronously from the queue and update job state in the database.

------------------------------------------------------------------------

## Features

-   Asynchronous job processing
-   Distributed worker architecture
-   Priority-based job scheduling
-   Delayed job execution
-   Automatic retries with exponential backoff
-   Dead Letter Queue (DLQ) for failed jobs
-   Worker concurrency control
-   Rate limiting for job execution
-   Persistent job state using PostgreSQL
-   Queue metrics API
-   Monitoring dashboard (Bull Board)
-   Dockerized infrastructure

------------------------------------------------------------------------

## Project Structure

    QueueForge
    │
    ├── api
    │   └── src
    │       ├── config
    │       │   ├── redis.ts
    │       │   ├── prisma.ts
    │       │   ├── dlq.ts
    │       │   └── queue.ts
    │       │
    │       ├── controllers
    │       │   ├── jobController.ts
    │       │   └── metricsController.ts
    │       │
    │       ├── routes
    │       │   ├── jobRoutes.ts
    │       │   └── metricsRoutes.ts
    │       │
    │       └── server.ts
    │
    ├── worker
    │   └── src
    │       ├── processors
    │       │   ├── emailProcessor.ts
    │       │   ├── reportProcessor.ts
    │       │   └── webhookProcessor.ts
    │       │
    │       ├── registry.ts
    │       └── worker.ts
    │
    ├── prisma
    │   ├── migrations
    │   └── schema.prisma
    │
    └── test
        └── test.ts

------------------------------------------------------------------------

## Job Lifecycle

    queued → processing → completed
                     ↘
                      failed → dead-letter queue

Jobs are stored in PostgreSQL while queue execution state is managed by
Redis.

------------------------------------------------------------------------

## API Endpoints

### Create Job

    POST /api/jobs

Example request:

``` json
{
  "type": "email",
  "payload": {
    "to": "user@test.com"
  },
  "priority": 5,
  "delay": 0
}
```

Response:

``` json
{
  "id": "job-id",
  "status": "queued"
}
```

------------------------------------------------------------------------

### Get Job Status

    GET /api/jobs/:id

Example response:

``` json
{
  "id": "job-id",
  "type": "email",
  "status": "completed",
  "result": {
    "delivered": true
  }
}
```

------------------------------------------------------------------------

### Queue Metrics

    GET /api/metrics

Example response:

``` json
{
  "queue": "jobs",
  "metrics": {
    "waiting": 0,
    "active": 1,
    "completed": 45,
    "failed": 3
  }
}
```

------------------------------------------------------------------------

## Queue Monitoring Dashboard

QueueForge integrates **Bull Board** for queue inspection and
monitoring.

Access the dashboard at:

    http://localhost:3000/admin/queues

The dashboard allows:

-   viewing job states
-   inspecting failures
-   retrying jobs
-   monitoring queue throughput

------------------------------------------------------------------------

## Running the System

### 1. Start Infrastructure

    docker compose up -d redis postgres

This starts:

-   Redis
-   PostgreSQL

------------------------------------------------------------------------

### 2. Install Dependencies

    npm install

------------------------------------------------------------------------

### 3. Generate Prisma Client

    npx prisma generate

------------------------------------------------------------------------

### 4. Run Database Migrations

    npx prisma migrate dev

------------------------------------------------------------------------

### 5. Start the API

    npm run start:api

------------------------------------------------------------------------

### 6. Start the Worker

    npm run start:worker

Workers will start consuming jobs from the queue.

Multiple workers can run simultaneously to increase processing
throughput.

------------------------------------------------------------------------

## Horizontal Scaling

QueueForge supports distributed workers.

You can run multiple workers:

    npm run start:worker
    npm run start:worker
    npm run start:worker

All workers pull jobs from the same Redis queue.

------------------------------------------------------------------------

## Testing

A test script is included to validate:

-   job creation
-   delayed execution
-   concurrency
-   queue throughput
-   metrics reporting

Run:

    npx run test

------------------------------------------------------------------------

## Example Worker Processor

``` ts
export async function processEmail(payload: any) {
  console.log("sending email to", payload.to);
  await new Promise(r => setTimeout(r, 2000));
  return { delivered: true };
}
```

Processors are registered in a central registry and invoked dynamically
based on job type.

------------------------------------------------------------------------

## Technology Stack

-   Node.js
-   TypeScript
-   Express
-   BullMQ
-   Redis
-   PostgreSQL
-   Prisma
-   Docker

------------------------------------------------------------------------

## Design Goals

QueueForge demonstrates:

-   queue‑based backend architecture
-   reliable async processing
-   worker concurrency management
-   retry strategies
-   scalable background task execution

------------------------------------------------------------------------

## Future Improvements

Possible extensions:

-   distributed tracing
-   job batching
-   multiple queue routing
-   worker autoscaling
-   authentication for admin UI
-   job scheduling (cron jobs)
