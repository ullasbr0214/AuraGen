# AuraGen Integrated Backend

This folder is the live backend for the local AuraGen demo.

## Architecture

`Next.js frontend (3000) -> Express + Socket.IO backend (5000) -> Gemini AI`

MongoDB is used for registration, login, and project persistence.

## Start

```bash
cd backend
npm install
copy .env.example .env
```

Set a real `GEMINI_API_KEY` and, for authentication/project persistence, make sure MongoDB is running.

Then:

```bash
npm start
```

Health check:

```text
http://localhost:5000/api/health
```

## Socket events

- `generate_component` — receives `{ prompt, hesitation, clicks }`
- `component_response` — returns generated JSX plus cognitive metrics
- `telemetry` — receives live frontend interaction telemetry
- `backend_status` — emitted when a client connects

## REST API

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/projects`
- `POST /api/projects`
- `DELETE /api/projects/:id`

## AI pipeline

The live `generate-component.js` validates Gemini output before sending it to the frontend. The separate `ai-pipeline-reference/` directory is kept only for reference/testing.

If MongoDB is unavailable, the backend still starts so the health check and AI/socket generation can be tested. Auth and project persistence require MongoDB.
