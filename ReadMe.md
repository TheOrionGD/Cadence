# Cadence

**Autonomous Work Orchestration Platform for Teams & Agencies**

Cadence is a production-grade, multi-tenant SaaS application that enables teams to plan, track, and collaborate on projects efficiently. It demonstrates real-world full-stack engineering practices, scalable system design, AI-assisted workflows, and clean separation of concerns across frontend, backend, and infrastructure layers — built on a 2026-current, type-safe stack.

---

## Table of Contents

* Overview
* Features
* User Roles
* Tech Stack
* System Architecture
* Database Design
* API Design
* AI Layer
* Autonomous Work Orchestration (Premium)
* Code Sandbox & Test Runner (Premium)
* Subscription Tiers
* Security
* Installation & Setup
* Environment Variables
* Running the Application
* Testing
* Deployment
* Future Enhancements
* Development Team & Roles
* Developer Story
* License

---

## Overview

Cadence allows organizations to create isolated workspaces where teams can manage projects, assign tasks, collaborate in real time, and analyze productivity through dashboards — now enhanced with AI-assisted prioritization and insights. The platform follows a **multi-tenant SaaS architecture** with strict workspace-level data isolation, end-to-end type safety, and an AI integration layer built for the LLM era.

### Positioning

> **Cadence is an Autonomous Work Orchestration Platform** that continuously distributes, optimizes, predicts, and coordinates human work across teams and organizations with minimal managerial intervention.

Where traditional tools like Asana or Monday.com help teams **manage tasks**, Cadence helps organizations **execute operational work autonomously** — moving the product from passive task tracking into active, continuous work orchestration. The system doesn't just assign work once; it keeps watching, reallocating, predicting, and explaining its decisions for as long as the project runs.

---

## Features

* Authentication via Clerk / Auth.js (passkeys, social login, SSO-ready)
* Multi-tenant workspace support with row-level security
* Role-based access control (RBAC)
* Project and task lifecycle management
* Real-time collaboration and activity logs
* AI-powered task prioritization, summarization, and insights
* **Skill-Based Auto Task Assignment (Exclusive)** – intelligent distribution of file-based work (CSV/Excel) across a team based on each member's skill score
* **Agentic AI Workflows (Google ADK)** – autonomous, multi-step agents for task triage, reassignment, and file-processing orchestration
* **Agency Portfolio Mode** – cross-workspace dashboard for service providers managing multiple client organizations under one System Admin account
* **In-Platform Code Sandbox & Test Runner (Premium, Exclusive)** – embedded terminal to run, test, and validate code submitted against a development task, with a 7-day free trial
* Analytics and productivity dashboards
* Subscription tiers and usage limits via Stripe
* In-app & email/push notifications with per-user preference controls
* Time tracking and timesheet exports per task/project
* Gantt chart and dependency-aware timeline view
* Kanban, List, and Calendar project views
* Approval workflows (e.g., Client/Manager sign-off before a task closes)
* Integrations marketplace (Slack, Microsoft Teams, Google Drive, Jira, GitHub)
* Custom fields and project templates per workspace
* File versioning and inline document preview
* Guest/Client share links with expiry and granular scoping
* Workspace-wide audit log and compliance export (GDPR/CCPA ready)
* White-label branding for agency workspaces (logo, colors, custom domain)
* Mobile-responsive PWA with offline task viewing

---

## User Roles

| Role          | Permissions                                                                  |
| ------------- | ----------------------------------------------------------------------------- |
| Super Admin   | Cross-workspace platform administration, infrastructure & support access     |
| System Admin  | Service-provider role; manages multiple client organizations on the agency's behalf (provisioning, portfolio oversight, billing relay) |
| Owner         | Workspace administration, billing, member management                        |
| Admin         | Workspace-level management delegated by Owner (no billing access)           |
| Manager       | Oversees specific projects/teams, assigns tasks, sets skill profiles         |
| Member        | Create, update, and manage assigned tasks                                   |
| Contributor   | External/freelance collaborator with scoped, time-limited project access    |
| Client        | Outside stakeholder with read + approval access on specific deliverables    |
| Viewer        | Read-only access to projects and tasks                                      |
| Guest         | Temporary, link-based access to a single project or file, no login required |

### Role Notes

* **Super Admin** sits above workspace boundaries — used for platform support/operations, not assignable by Owners.
* **System Admin** is the role for the service provider/agency running Cadence as a managed offering — e.g., a dev shop or consultancy that sets up and operates the platform on behalf of client organizations. They get a **cross-workspace portfolio view** across every client org they service (provisioning new client workspaces, monitoring health/usage, relaying billing), but cannot see internal task-level content inside a client's workspace unless explicitly granted Owner/Admin access within that workspace. This is distinct from Super Admin, which is internal platform/infrastructure access — System Admin is a customer-facing, service-delivery role.
* **Admin** is a new delegated tier so Owners can hand off day-to-day workspace management without exposing billing/financial data.
* **Manager** is new and sits between Owner and Member — manages skill profiles, oversees the auto-assignment engine for their team, and runs project-level reporting, without full workspace admin rights.
* **Contributor** is built for agencies/freelancers — access expires automatically at a configurable date or on project close.
* **Client** is a lightweight external role for approvals/sign-off (e.g., approving a deliverable) without full Viewer-level visibility into internal discussions.
* **Guest** is for one-off sharing — e.g., sending a single task or file link to someone outside the workspace, no account required, access auto-expires.

---

## Tech Stack

### Frontend

* **Next.js 16 (React 19, App Router)** – Server Components, Server Actions, and streaming SSR
* **TypeScript** – End-to-end type safety
* **Tailwind CSS v4 + shadcn/ui (Radix primitives)** – Utility-first, accessible component system
* **TanStack Query** – Server-state management and caching (replaces heavier global-state libraries)

### Backend

* **tRPC** (preferred for tightly-coupled Next.js apps) or **NestJS/Hono** for a decoupled API service
* **Bun** as the JS runtime/package manager/test runner (Node.js 22 LTS remains a fully supported fallback)
* **Zod** – Schema validation shared across client and server
* **Clerk / Auth.js v5** – Authentication (JWT/session-based, SSO and passkey ready)
* **RBAC Middleware** – Authorization control

> Alternative backend track: **Python (FastAPI or Django)** is still the strongest choice if heavy AI/ML workloads, RAG pipelines, or data-science tooling live in the same service.

### Database

* **PostgreSQL** (via **Supabase** or **Neon** for managed, branchable Postgres)
* **Prisma** or **Drizzle ORM** – Type-safe queries and migrations
* **Redis** – Caching, session storage, and rate limiting

### Real-Time Communication

* **WebSockets / Socket.IO**, or **Supabase Realtime / Pusher** for managed real-time channels

### AI Layer

* **Vercel AI SDK** – Streaming AI responses in the UI, with a unified provider interface
* **Google Agent Development Kit (ADK)** – Orchestration framework for autonomous, multi-step agentic workflows (triage, reassignment, scheduled reporting)
* **LangChain / LlamaIndex** – Orchestration for RAG and agentic workflows
* **Multi-model inference layer** – pluggable across providers depending on task:
  * **Claude API (Anthropic)** – Complex reasoning, task prioritization, nuanced summarization
  * **Groq (Llama / Kimi / GPT-OSS on LPU inference)** – Ultra-low-latency inference for real-time features (live chat assistant, instant auto-assignment scoring, fast classification)
  * **Gemini API (Google)** – Multimodal understanding (image/file analysis) and large-context-window tasks (e.g., reasoning over an entire large CSV/Excel dataset at once)
* **Vector store** (pgvector on Postgres, or a dedicated vector DB) for embeddings/RAG
* **SheetJS / Papaparse** – CSV and Excel parsing for the auto-assignment engine's file ingestion pipeline

### DevOps & Infrastructure

* **Docker** – Containerization
* **Nginx** – Reverse proxy and load handling (or platform-native edge routing)
* **GitHub Actions** – CI/CD pipeline
* **Vercel** (frontend/edge) + **AWS** (heavy backend/AI workloads), or **Render/Railway** for simpler deployments
* **Sentry / OpenTelemetry** – Error tracking and observability

### Payments

* **Stripe** – Subscription billing, metering, and customer portal

---

## System Architecture

```
Frontend (Next.js 16 / React 19, RSC + Server Actions)
      |
      | tRPC / REST APIs / WebSockets
      v
Backend API (tRPC, NestJS, or Hono)
      |
      | Prisma / Drizzle ORM
      v
PostgreSQL (Supabase/Neon) + Redis (cache) + pgvector (AI)
```

* Stateless backend architecture, horizontally scalable
* Token-based authentication (JWT / session via Clerk or Auth.js)
* Role-aware request validation enforced at the API and database (RLS) layers
* Real-time event broadcasting
* AI inference layer decoupled from core business logic for independent scaling

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
* `embeddings` (vector store for AI-powered search/insights)
* `skill_profiles` (per-member skill scores by task category)
* `file_work_units` (row/sheet-level task chunks parsed from uploaded CSV/Excel files)
* `member_levels` (XP, level, collaboration score per member)

This schema supports:

* Tenant isolation (Postgres Row-Level Security)
* Permission enforcement
* Auditability
* Horizontal scalability
* AI-ready semantic search via vector embeddings

---

## API Design

* End-to-end type-safe procedures via tRPC, or RESTful conventions with OpenAPI/Swagger for public-facing endpoints
* Versioned endpoints (`/api/v1`) for REST consumers
* Consistent response structures
* Centralized error handling

Example endpoints (REST variant):

```
POST   /api/v1/auth/login
GET    /api/v1/projects
POST   /api/v1/tasks
PATCH  /api/v1/tasks/{id}
POST   /api/v1/ai/prioritize
```

---

## AI Layer

* **Task prioritization** – Claude-powered scoring based on deadlines, dependencies, and team velocity
* **Smart summaries** – Auto-generated project/sprint summaries and standup digests
* **Semantic search** – Vector-embedding-backed search across tasks, comments, and files
* **Conversational assistant** – In-app chat for querying project status in natural language, routed to Groq for near-instant responses
* **Multimodal file insights** – Gemini-powered analysis of uploaded CSVs, spreadsheets, and images (e.g., flagging anomalies in a dataset before it's split into work units)
* **Model routing strategy** – a lightweight orchestration layer (LangChain/Vercel AI SDK) selects the right model per task:

| Use Case | Model | Why |
|----------|-------|-----|
| Task prioritization, nuanced summaries | Claude | Strongest reasoning quality |
| Live chat assistant, real-time scoring during auto-assignment | Groq | Lowest latency, near-instant token throughput |
| Large CSV/Excel ingestion & analysis, image/file understanding | Gemini | Large context window + native multimodal input |

### Agentic AI Workflows (Google Agent Development Kit)

Cadence uses **Google ADK** to run autonomous, multi-step agents rather than single-shot LLM calls for anything that requires orchestration across tools/state:

* **Triage Agent** – continuously scans incoming file uploads and unassigned work units, decides priority order, and hands off to the Auto-Assignment engine without a human trigger.
* **Reassignment Agent** – watches for completed work units, blocked tasks, or members going over capacity, and re-routes work in real time (the agentic backbone behind the Skill-Based Auto Task Assignment feature).
* **Reporting Agent** – runs on a schedule (e.g., end-of-day) to compile and deliver project/portfolio summaries to Owners, Managers, and System Admins.
* Agents are composed as ADK tool-calling workflows, with Claude/Gemini/Groq plugged in underneath as the reasoning models depending on the task (see model routing table above) — ADK handles the orchestration/state/tool-execution layer, the LLMs handle the reasoning.
* All agent actions are logged to the audit trail and are reversible by a Manager/Owner.

### Agency Portfolio Mode (Service Product)

Cadence can be deployed/sold as a **managed service** by an agency or consultancy. This mode is built around the new **System Admin** role:

* A **System Admin** account is created at the service-provider level, sitting above individual client workspaces.
* From a single **Portfolio Dashboard**, the System Admin can: provision new client workspaces, monitor usage/health/SLA metrics across all clients, relay/consolidate billing, and apply standardized templates/policies across client orgs.
* Each client workspace remains fully isolated — the System Admin's portfolio view shows aggregate metrics (status, activity, utilization) but not internal task/file content, unless the client explicitly grants elevated access for support purposes.
* This positions Cadence not just as self-serve SaaS, but as a white-label-able platform that an agency can resell as "managed project operations" to its own client base.

---

## Skill-Based Auto Task Assignment (Exclusive Feature)

This is Cadence's signature differentiator: a self-balancing task distribution engine built specifically for teams that work off CSV/Excel data sets (e.g., data cleanup, QA review, content tagging, claims processing). It removes manual task-handoff entirely.

### How It Works

1. **File Ingestion** – A workspace Owner/Member uploads a CSV or Excel file (or connects a live Google Sheet/Drive source). Cadence parses it into discrete, assignable row-level or sheet-level work units.
2. **Skill Profile per Member** – Every team member has a **Skill Score** per task category (e.g., data validation, formatting, domain review), built from:
   * Historical completion speed and accuracy
   * Manager-assigned proficiency ratings
   * Self-reported expertise (verified over time by actual output quality)
3. **Auto-Assignment Engine** – When a file is ingested, the engine matches work units to team members using a weighted algorithm that factors in:
   * Member's skill score for the relevant task type
   * Current workload/capacity (no overloading one person)
   * Historical turnaround time
4. **Real-Time Reassignment on Completion** – The moment a member marks their chunk complete, the engine immediately pulls the next-best-fit unprocessed unit from the same file and assigns it to the next available, best-matched member — keeping the whole team continuously fed with work without a coordinator manually redistributing rows.
5. **Live Progress Sync** – All four (or more) team members see a shared, real-time view of file completion percentage, who's working on what, and what's left.

### Productivity Leveling System

To reinforce engagement and fair recognition, every member has a visible **Level** that grows with contribution quality and consistency:

| Level | Title | Unlocked By |
|-------|-------|-------------|
| 1 | Contributor | Baseline — joined workspace |
| 2 | Specialist | Consistent on-time, accurate completions in one category |
| 3 | Expert | High skill score across multiple categories + low rework rate |
| 4 | Lead Collaborator | Strong individual output **and** high collaboration score |
| 5 | Workspace MVP | Sustained top-tier output + mentoring/helping teammates |

* **XP** is earned per completed work unit, weighted by accuracy and speed.
* **Collaboration Score** (separate from raw output) tracks helpfulness — assisting teammates, reviewing others' work, resolving blockers — so leveling up rewards teamwork, not just solo throughput.
* Levels are visible on profile cards and team dashboards, encouraging healthy, transparent competition without exposing raw performance data to Viewers.

### Why It Matters

* Eliminates idle time between task handoffs — the moment one person finishes, the next unit is already routed to the best-fit teammate.
* Plays to each member's strengths instead of arbitrary or first-come allocation.
* Builds a transparent, gamified incentive layer that rewards both speed/accuracy and team collaboration equally.
* Scales beyond 4-person teams — the same matching engine works for larger pods working across multiple files simultaneously.

---

## Autonomous Work Orchestration (Premium / Enterprise, Exclusive)

This is the evolution of the Skill-Based Auto Task Assignment engine from a one-time assignment system into a **continuous orchestration layer** — the system doesn't just split and hand off work once, it keeps watching the whole project and intervening automatically. These capabilities sit behind paid tiers since they run continuous background inference rather than on-demand calls.

### Continuous Reallocation

The engine doesn't stop after the initial assignment. It constantly asks: who's about to go idle, who's overloaded, who's consistently faster than expected? Work is silently rebalanced mid-flight — e.g., if Member C has 40 rows left and Member B just finished, the system reallocates a portion from C to B automatically, with no manager intervention required.

### Predictive Completion Engine

Replaces a flat "72% complete" progress bar with a forecast: predicted completion time, a confidence score, and a risk level (Low/Medium/High), calculated from historical speed, idle time, task complexity, file size, and contributor history. Managers care about *when it'll be done*, not just how much is done.

### AI Bottleneck Detection

When progress slows, the system diagnoses *why* (contributor unavailable, validation queue blocked, skill mismatch) and proposes a concrete fix with an estimated time saved — turning the platform from a tracker into an advisor.

### Dynamic Skill Graph

Skill scores evolve from a single flat number into a per-category graph (e.g., Excel Cleaning: 95, Data Validation: 84, OCR Review: 88) that updates automatically after every completed task — no manual ratings required.

### Learning Assignment Model

Assignment doesn't always route to the top performer. The model can deliberately balance productivity against growth — giving a learning team member a smaller, supported share of work instead of always loading the expert, so the team's overall skill floor rises over time.

### Work Recommendation Engine

On file upload, the system detects the type of dataset (e.g., an invoice batch) and proposes a structured workflow (OCR → Validation → Duplicate Check → Approval) instead of a flat equal split.

### Quality Prediction

Before a submission is marked complete, the system estimates expected accuracy, likely error count, and which specific fields/columns are most at risk — letting contributors fix issues before review instead of after.

### Digital Twin Simulation

Managers can ask "what if Member B goes offline?" and the system simulates the downstream delivery impact and the best mitigation (e.g., reroute 18 tasks to Member D, cutting a 3-hour delay down to 25 minutes) — without actually disrupting the live project.

### Workspace Intelligence Dashboard

Beyond a generic "health score," this surfaces efficiency %, idle time %, skill utilization %, context-switching rate, and estimated automation savings (hours/month) — built for agency clients who need to justify the platform's ROI to their own clients.

### Multi-Agent AI Workforce

Instead of one general-purpose AI layer, specialized agents handle distinct responsibilities and communicate internally: Task Routing Agent, Quality Review Agent, Workload Balancer, Deadline Predictor, Analytics Agent, Billing Agent, and Workspace Health Agent. (Built on Google ADK — see AI Layer.)

### Natural Language Operations

Managers can issue commands conversationally instead of clicking through menus — e.g., "Move all OCR work from Team Alpha to Team Beta after 5 PM," or "Show who slowed production this week," or "Create a new workspace for Client X."

### Auto SOP Generation

After observing real team workflows, the system generates a written SOP, an onboarding guide, a workflow diagram, and improvement suggestions — so new hires/contributors ramp up faster without a human writing documentation by hand.

### Internal Talent Marketplace

For agencies running multiple client workspaces: when one client has surplus work, the system recommends pulling available, high-quality reviewers from another underutilized client workspace, with an estimated cost — turning idle capacity into usable capacity across the portfolio.

### Adaptive File Chunking

Chunk size is driven by row/task complexity, not a flat row count — complex rows get smaller chunks, simple rows get larger ones, so no single contributor gets an unfairly hard or easy batch.

### AI Context Memory

The system learns soft patterns over time — which contributors collaborate well together, who performs better at certain times of day, common validation mistakes, and client-specific workflow preferences — so every future assignment is informed by accumulated history, not just the current snapshot.

### Executive Intelligence Dashboard

A business-facing summary instead of raw charts: hours of manual coordination removed, average delivery improvement %, rework reduction %, and estimated monthly cost savings — built to speak directly to decision-makers, not just project managers.

### Explainable AI

Every auto-assignment decision comes with a visible rationale (skill match %, current load %, past accuracy %, expected finish time) so managers can trust *why* the system made a call, not just accept it as a black box.

### Cross-Workspace Optimization (Agency-Level)

Extends Agency Portfolio Mode from passive monitoring into active optimization — e.g., detecting that Client A has idle reviewers while Client B is overloaded, and recommending a temporary cross-client reallocation with an estimated SLA improvement.

### Autonomous Workflow Evolution

The system observes repeated manual actions (e.g., a manager re-validating every CSV import by hand) and proposes turning that pattern into an automated pipeline, with an estimated time savings — so the platform keeps improving itself alongside the organization rather than staying static.

---

## In-Platform Code Sandbox & Test Runner (Premium, Exclusive)

### The Problem It Solves

In most team-based projects (especially academic/college teams), work splits unevenly by nature: one person writes the code, another does documentation, another builds the presentation, and contribution quality is hard to verify objectively for anyone except the developer — whose output can actually be run and checked. This feature gives the platform an objective, automated way to validate the one role whose work is directly testable: the code.

### How It Works

1. **Code Submission** – The team member assigned the "Developer" task type submits their code directly against the task (file upload, Git repo link, or pasted snippet) instead of just marking the task complete.
2. **Embedded Terminal** – A browser-based terminal/IDE runs inside the task view (no local setup required) where the submitted code executes in an isolated, sandboxed container.
3. **Role-Based Test Cases** – The Manager/Owner (or an AI-assisted suggestion) attaches a test suite to the task at assignment time. Test cases run automatically against the submitted code and report pass/fail with output diffs.
4. **Compatibility Check** – Beyond pass/fail, the sandbox checks the submitted code against other already-merged code in the same project (shared interfaces, function signatures, dependency versions) to flag integration conflicts before merge — not just "does it run," but "does it work with what the rest of the team already built."
5. **AI-Assisted Optimization** – Claude reviews the passing code for performance, readability, and security issues, and suggests concrete optimizations inline (this reuses the existing AI Layer, routed to Claude for code reasoning).
6. **Result Logging** – Test run history, pass rates, and optimization suggestions are attached to the task permanently, giving Managers an objective artifact instead of just a checkbox marked "done."

### Access Model

| Tier | Access |
|------|--------|
| Free Trial | Full sandbox + test runner access for 7 days per workspace |
| Paid (Pro/Team tier) | Unlimited sandbox sessions, persistent test history, compatibility checks across the full codebase |
| Free Plan (post-trial) | Feature locks; tasks revert to manual completion marking only |

### Supporting Tech

* **Sandboxed execution**: isolated, ephemeral Docker containers (or a managed code-execution API like Piston/Judge0) per run — never executes against production infrastructure
* **Browser terminal**: WebContainers or xterm.js + a containerized backend, streamed over WebSockets
* **Test orchestration**: language-agnostic test runner adapters (pytest, Jest, JUnit, etc.) selected based on the submitted code's detected language
* **Resource limits**: strict CPU/memory/time caps per execution to control hosting cost and prevent abuse

### New Database Tables

* `code_submissions` (task_id, member_id, code/repo reference, language, submitted_at)
* `test_runs` (submission_id, test_suite_id, pass/fail status, output logs, duration)
* `compatibility_checks` (submission_id, conflicting_submission_id, conflict_type, resolved boolean)

---

## Subscription Tiers

| Feature | Free | Pro | Enterprise (Agency) |
|---|---|---|---|
| Core task/project management, Kanban/List/Calendar | ✅ | ✅ | ✅ |
| Skill-Based Auto Task Assignment (one-time, on-upload) | ✅ (limited team size) | ✅ | ✅ |
| Continuous Reallocation & Predictive Completion Engine | ❌ | ✅ | ✅ |
| AI Bottleneck Detection & Explainable AI rationale | ❌ | ✅ | ✅ |
| Dynamic Skill Graph & Learning Assignment Model | ❌ | ✅ | ✅ |
| Quality Prediction & Digital Twin Simulation | ❌ | Limited | ✅ |
| Multi-Agent AI Workforce (Google ADK agents) | ❌ | Core agents only | Full agent suite |
| Natural Language Operations | ❌ | ✅ | ✅ |
| Auto SOP Generation | ❌ | ✅ | ✅ |
| Executive Intelligence Dashboard | ❌ | ❌ | ✅ |
| Internal Talent Marketplace & Cross-Workspace Optimization | ❌ | ❌ | ✅ |
| Autonomous Workflow Evolution | ❌ | ❌ | ✅ |
| Agency Portfolio Mode (System Admin role) | ❌ | ❌ | ✅ |
| In-Platform Code Sandbox & Test Runner | 7-day free trial | ✅ | ✅ |

* **Free** – core orchestration on first assignment only, no continuous AI layer.
* **Pro** – unlocks the continuous orchestration engine and code sandbox for a single workspace/team.
* **Enterprise (Agency)** – adds everything needed to run Cadence as a managed service across multiple client workspaces, including the System Admin role and cross-client optimization.
* All premium/exclusive features above are billed and enforced via Stripe subscription tiers, with usage gating handled at the API layer (not just hidden in the UI).

---

## Security

* Password hashing via bcrypt/argon2 (when not delegated to Clerk/Auth.js)
* JWT-based authentication with refresh tokens, passkey support
* Role-based authorization checks
* Workspace-level data access validation, enforced with Postgres Row-Level Security
* Input validation via Zod schemas shared client/server
* Protection against common vulnerabilities (XSS, CSRF, SSRF)
* AI input/output sanitization to prevent prompt injection from user-generated content
* Code execution fully isolated per run (ephemeral containers, no network/filesystem access to platform infrastructure, strict resource quotas) to prevent malicious code submissions from impacting the host system

---

## Installation & Setup

### Prerequisites

* Bun ≥ 1.1 (or Node.js ≥ 22 LTS) / Python ≥ 3.12 if using the FastAPI/Django track
* PostgreSQL (or a Supabase/Neon account)
* Docker (optional, recommended for local parity)

### Clone Repository

```bash
git clone https://github.com/TheOrionGD/cadence.git
cd cadence
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cadence
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_secret
ANTHROPIC_API_KEY=your_anthropic_api_key
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

---

## Running the Application

### Backend

```bash
bun install
bun run dev
```

or (Python/FastAPI track)

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
bun install
bun run dev
```

---

## Testing

* Unit tests for services and utilities (Vitest/Bun test runner)
* API integration tests
* Role-based access validation
* End-to-end tests (Playwright)

```bash
bun run test
```

---

## Deployment

* Dockerized services
* Nginx reverse proxy (or platform-native edge routing on Vercel)
* Managed PostgreSQL instance (Supabase/Neon)
* CI/CD with GitHub Actions

Supported platforms:

* Vercel (frontend/edge)
* AWS
* Render
* Railway

---

## Future Enhancements

* Native mobile app (React Native / Expo) beyond the current PWA
* Custom/configurable role builder (mix-and-match permissions beyond the fixed role set)
* Predictive analytics (sprint risk forecasting, burnout/workload alerts)
* GraphQL API support for multi-client data aggregation
* Self-service white-label storefront for agencies to onboard their own clients

---

## Development Team & Roles

To ensure balanced workloads and avoid single-person development silos, the Cadence team operates on a **cross-functional, collaborative model**. Responsibilities are shared across complementary skill sets so that no single component (like the frontend portal or the database) is built in isolation.

### Cross-Functional Collaboration Matrix

| Functional Area | Primary Lead | Co-Developers / Collaborators |
| :--- | :--- | :--- |
| **System Architecture & AI Integration** | Godfrey | Vijesh (DB Sync), Santosh (Sandboxing) |
| **Frontend UI/UX & State Management** | Yuvaraj | Godfrey (RSC & APIs), Santosh (E2E Testing) |
| **Backend APIs & Ingestion Engines** | Vijesh | Godfrey (tRPC/Zod), Santosh (Middleware & Security) |
| **DevOps, Security, & Testing** | Santosh | All Members (Unit & E2E Testing, Security Reviews) |

---

### Team Members & Focus Areas

* **Godfrey** — **Lead Full-Stack Architect**
  * **Focus**: Full-Stack System Design, tRPC API Integration, and AI Orchestration.
  * **Collaborative Responsibilities**:
    * Co-develops Next.js 16 frontend architecture and Server Components with **Yuvaraj** to ensure seamless data flows and state synchronization.
    * Designs core API boundaries (tRPC/REST) and Zod schema validations.
    * Coordinates with **Vijesh** on database design, caching patterns (Redis), and vector embeddings (pgvector).
    * Assists **Santosh** with designing security middleware, containerization (Docker), and sandbox code execution environments.

* **Yuvaraj** — **Frontend UI/UX & Interaction Engineer**
  * **Focus**: UI Components, Interactive Portals, and Real-Time State Management.
  * **Collaborative Responsibilities**:
    * Leads the design and implementation of responsive user interfaces, Gantt/Kanban charts, and collaboration panels.
    * Collaborates with **Godfrey** on integrating streaming SSR, Server Actions, and frontend state synchronization (TanStack Query).
    * Integrates WebSocket real-time channels and frontend Clerk/Auth.js flows.
    * Works with **Santosh** to write and maintain automated E2E tests (Playwright) to ensure frontend reliability.

* **Vijesh** — **Backend & Database Engineer**
  * **Focus**: PostgreSQL Schema Architecture, Data Ingestion Pipelines, and Cache Optimization.
  * **Collaborative Responsibilities**:
    * Designs and optimizes database tables, migrations (Prisma/Drizzle ORM), and pgvector similarity queries.
    * Co-develops the CSV/Excel file parser and auto-assignment engine alongside **Godfrey** (AI triage rules) and **Santosh** (worker limits).
    * Integrates Redis caching layer to minimize database load on critical endpoints.
    * Implements Postgres Row-Level Security (RLS) policies and database access control checks in cooperation with **Santosh**.

* **Santosh** — **DevSecOps & QA Lead**
  * **Focus**: Cloud Infrastructure, Application Security, CI/CD, and Automated Testing.
  * **Collaborative Responsibilities**:
    * Provisions and maintains deployment environments (Vercel, AWS, Docker, Nginx) and CI/CD workflows (GitHub Actions).
    * Leads application security auditing, input sanitization, and isolated execution sandbox design for code validation.
    * Standardizes testing frameworks (Vitest/Bun test runners) and partners with **Yuvaraj** on frontend test coverage.
    * Collaborates with **Vijesh** on database access security, server-side rate-limiting, and error telemetry (Sentry).

---

## Developer Story

To provide a clear roadmap of code ownership and implementation paths across the Cadence codebase, the development is divided into distinct, collaborative tracks for frontend and backend files:

### 1. Frontend Development Track (Next.js 16, React 19, TypeScript)

* **Yuvaraj** — **Primary UI/UX Developer**
  * **Ownership**: Visual layouts, component libraries, and interactive portal views.
  * **Code Focus**:
    * Interactive portal dashboards, Gantt charts, Kanban boards, and calendar views.
    * Client-side state-management hook files and context providers.
    * Real-time client-side sync via Socket.IO/WebSockets.
    * Playwright E2E visual and interaction testing suites.

* **Godfrey** — **Full-Stack Integrator & Page Architect**
  * **Ownership**: App Router pages, Server Actions, and data hydration boundaries.
  * **Code Focus**:
    * Next.js 16 App Router page routing, layout wrappers, and Next.js Server Components.
    * Server Actions and streaming SSR setups.
    * Data hydration and validation interfaces bridging UI state with backend APIs.

---

### 2. Backend Development Track (tRPC, NestJS/Hono, PostgreSQL, Bun)

* **Vijesh** — **Primary Database & Engine Developer**
  * **Ownership**: DB schema architecture, parsing engines, and cache performance.
  * **Code Focus**:
    * PostgreSQL table definitions, schema files, and migration scripts (Prisma/Drizzle ORM).
    * `pgvector` similarity queries and vector embedding tables for AI features.
    * Ingestion pipelines (CSV/Excel parsing logic and raw data chunking scripts).
    * Redis session storage configurations and endpoint caching layers.

* **Santosh** — **DevSecOps, Security & QA Developer**
  * **Ownership**: Security middleware, rate limiting, containerization, and test runners.
  * **Code Focus**:
    * Backend security middleware (JWT auth, Clerk session check handlers, and RBAC rules).
    * Zod request-validation schema files.
    * Sandboxed execution runners for the in-platform test suite.
    * Automated API and unit testing suites (Vitest/Bun test runners).
    * Cloud deployment setups (AWS, Vercel, Railway, Docker configurations) and Sentry/OpenTelemetry monitoring logs.

* **Godfrey** — **Lead API & AI Architect**
  * **Ownership**: Core API orchestration, tRPC routers, and multi-model routing.
  * **Code Focus**:
    * tRPC endpoint declarations and NestJS/Hono router files.
    * Google Agent Development Kit (ADK) workflow agent files (Triage, Reassignment, Reporting).
    * Multi-model inference routing logic (Claude/Gemini/Groq integration handlers).

---

## License

MIT License

---

### Author

**TheOrionGD**
