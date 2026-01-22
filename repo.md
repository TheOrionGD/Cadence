
---

## 1. High-Level Repository Structure

```
projectsphere/
│
├── frontend/
├── backend/
├── docs/
├── docker/
├── .github/
├── .env.example
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

## 2. Frontend Skeleton (React)

```
frontend/
├── public/
│   └── index.html
│
├── src/
│   ├── app/
│   │   ├── store.ts
│   │   └── hooks.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loader.tsx
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       └── Navbar.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authAPI.ts
│   │   │   ├── authSlice.ts
│   │   │   └── Login.tsx
│   │   │
│   │   ├── workspace/
│   │   ├── projects/
│   │   ├── tasks/
│   │   └── analytics/
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   └── Settings.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── services/
│   │   └── apiClient.ts
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   └── validators.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

**Why this matters (interview-ready):**

* `features/` → scalable domain-driven frontend
* API logic separated from UI
* Clean routing and reusable components

---

## 3. Backend Skeleton (Node.js – Express / NestJS style)

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── jwt.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.middleware.ts
│   │   │
│   │   ├── users/
│   │   ├── workspaces/
│   │   ├── projects/
│   │   ├── tasks/
│   │   └── subscriptions/
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── response.ts
│   │   └── validators.ts
│   │
│   ├── routes.ts
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── auth.test.ts
│   └── projects.test.ts
│
├── package.json
└── tsconfig.json
```

**Why this matters:**

* Modular architecture (easy to scale)
* Clear separation of controller, service, and routes
* Enterprise-style RBAC middleware

---

## 4. Database (Prisma Example)

```
backend/prisma/
├── schema.prisma
└── migrations/
```

`schema.prisma` includes:

* User
* Workspace
* WorkspaceMember
* Project
* Task
* Comment
* Subscription

---

## 5. DevOps & Infrastructure

```
docker/
├── frontend.Dockerfile
├── backend.Dockerfile
└── nginx.conf
```

```
docker-compose.yml
```

Supports:

* Frontend container
* Backend API container
* PostgreSQL container
* Nginx reverse proxy

---

## 6. Documentation

```
docs/
├── architecture.md
├── api-spec.md
└── database-design.md
```

This shows **engineering maturity**, not just coding.

---

## 7. CI/CD Skeleton

```
.github/
└── workflows/
    └── ci.yml
```

Pipeline:

* Install dependencies
* Run tests
* Build frontend & backend


