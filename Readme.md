# ProjectSphere

**SaaS Project Management & Collaboration Platform**

ProjectSphere is a production-grade, multi-tenant SaaS application that enables teams to plan, track, and collaborate on projects efficiently. It demonstrates real-world full-stack engineering practices, scalable system design, and clean separation of concerns across frontend, backend, and infrastructure layers.

---

## Table of Contents

* Overview
* Features
* User Roles
* Tech Stack
* System Architecture
* Database Design
* API Design
* Security
* Installation & Setup
* Environment Variables
* Running the Application
* Testing
* Deployment
* Future Enhancements
* License

---

## Overview

ProjectSphere allows organizations to create isolated workspaces where teams can manage projects, assign tasks, collaborate in real time, and analyze productivity through dashboards. The platform follows a **multi-tenant SaaS architecture** with strict workspace-level data isolation.

---

## Features

* User authentication with JWT
* Multi-tenant workspace support
* Role-based access control (RBAC)
* Project and task lifecycle management
* Real-time collaboration and activity logs
* Analytics and productivity dashboards
* Subscription tiers and usage limits

---

## User Roles

| Role   | Permissions                                          |
| ------ | ---------------------------------------------------- |
| Owner  | Workspace administration, billing, member management |
| Member | Create, update, and manage assigned tasks            |
| Viewer | Read-only access to projects and tasks               |

---

## Tech Stack

### Frontend

* **React** – Component-based UI development
* **React Query / Redux Toolkit** – State and server-state management
* **Tailwind CSS** – Utility-first styling
* **Axios** – API communication

### Backend

* **Node.js (Express / NestJS)** *or* **Django REST Framework**
* **JWT (Access + Refresh Tokens)** – Authentication
* **RBAC Middleware** – Authorization control
* **RESTful APIs** – Service communication

### Database

* **PostgreSQL** – Relational data storage
* **Prisma ORM / Django ORM** – Database abstraction and migrations

### Real-Time Communication

* **WebSockets / Socket.IO** – Live updates and collaboration

### DevOps & Infrastructure

* **Docker** – Containerization
* **Nginx** – Reverse proxy and load handling
* **GitHub Actions** – CI/CD pipeline
* **Cloud Hosting** – AWS / DigitalOcean / Render

---

## System Architecture

```
Frontend (React)
      |
      | REST APIs / WebSockets
      v
Backend API (Node.js / Django)
      |
      | ORM
      v
PostgreSQL Database
```

* Stateless backend architecture
* Token-based authentication
* Role-aware request validation
* Real-time event broadcasting

---

## Database Design (Core Tables)

* `users`
* `workspaces`
* `workspace_members`
* `projects`
* `tasks`
* `comments`
* `activity_logs`
* `subscriptions`

This schema supports:

* Tenant isolation
* Permission enforcement
* Auditability
* Horizontal scalability

---

## API Design

* RESTful conventions
* Versioned endpoints (`/api/v1`)
* Consistent response structures
* Centralized error handling
* Swagger / OpenAPI documentation

Example endpoints:

```
POST   /api/v1/auth/login
GET    /api/v1/projects
POST   /api/v1/tasks
PATCH  /api/v1/tasks/{id}
```

---

## Security

* Password hashing using bcrypt
* JWT-based authentication with refresh tokens
* Role-based authorization checks
* Workspace-level data access validation
* Input validation and sanitization
* Protection against common vulnerabilities (XSS, CSRF)

---

## Installation & Setup

### Prerequisites

* Node.js ≥ 18 / Python ≥ 3.10
* PostgreSQL
* Docker (optional)

### Clone Repository

```bash
git clone https://github.com/your-username/projectsphere.git
cd projectsphere
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/projectsphere
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
```

---

## Running the Application

### Backend

```bash
npm install
npm run dev
```

or (Django)

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
npm install
npm run dev
```

---

## Testing

* Unit tests for services and utilities
* API integration tests
* Role-based access validation

```bash
npm run test
```

---

## Deployment

* Dockerized services
* Nginx reverse proxy
* Managed PostgreSQL instance
* CI/CD with GitHub Actions

Supported platforms:

* AWS
* DigitalOcean
* Render
* Railway

---

## Future Enhancements

* Mobile app (React Native)
* Advanced analytics and exports
* Third-party integrations (Slack, Email)
* AI-powered task prioritization
* GraphQL API support

---

## License

MIT License

---

### Author

**Godfrey T R**
Full-Stack Developer
