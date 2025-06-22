# Task Manager System Design Document

## Overview

The Task Manager is a full-stack web application enabling users to register, login, and manage tasks. It provides features to create, update, delete, and filter tasks by status and priority, secured with JWT authentication.

---

## Architecture

- **Frontend:** React SPA using Bootstrap for UI, communicates via REST API.
- **Backend:** ASP.NET Core Web API for authentication and task management.
- **Database:** PostgreSQL storing users and tasks data.
- **Authentication:** JWT-based stateless authentication.
- **Deployment:** Docker containers for frontend, backend, and database.

---

## Components

### Frontend

- React with React Router and Context API.
- Axios for API requests with token in headers.
- Bootstrap for responsive design.

### Backend

- REST API endpoints for user registration/login and task CRUD.
- Entity Framework Core for database access.
- JWT token generation and validation.
- Authorization middleware.

### Database

- Users table with Id, Username, PasswordHash, PasswordSalt.
- Tasks table with Id, Title, Description, Status, Priority, UserId (foreign key).

---

## Sequence Flow

1. User registers: backend checks username uniqueness, hashes password, stores user, returns JWT.
2. User logs in: backend verifies credentials, returns JWT.
3. User fetches tasks: backend validates JWT, returns filtered task list.
4. User creates/reads/updates/deletes tasks: backend authorizes and performs DB operations.

---

## Security

- Passwords hashed with HMACSHA512 and salt.
- JWT signed with secret key.
- Authorization ensures users access only their own tasks.
- HTTPS recommended for production.

---

## Scalability

- Stateless backend supports horizontal scaling.
- Database can be scaled or replicated.
- Docker containers ensure deployment consistency.

---

## Assumptions

- Usernames are unique identifiers.
- Task statuses: Pending, In Progress, Completed.
- Task priorities: High, Medium, Low.
- No password reset or email verification features.

---

# End of Document
