# AuraGen — Local Integrated Setup

This version is prepared so the frontend and backend can run on the SAME laptop without depending on the other team member's ngrok URL.

## Architecture

Browser (Next.js :3000)
  -> REST API + Socket.IO (Express :5000)
  -> MongoDB
  -> Gemini AI generation (backend/generate-component.js)

The supplied AI-pipeline source is kept in `ai-pipeline-reference/` for reference. The backend has a working copy of the generation module so the demo can run even if the pipeline teammate is unavailable.

## 1. MongoDB

Make sure MongoDB is running locally.

Default database:
`mongodb://127.0.0.1:27017/auragen`

## 2. Backend

Open a terminal:

```bash
cd backend
npm install
copy .env.example .env
```

Edit `.env` and set:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/auragen
JWT_SECRET=change_this_secret
GEMINI_API_KEY=YOUR_REAL_GEMINI_API_KEY
```

Then:

```bash
npm start
```

Expected:

```text
[MongoDB] Database connected successfully
[Server] Running on http://localhost:5000
[Socket] Socket.IO initialized at /socket.io
```

Test in browser:
`http://localhost:5000/api/health`

It should return JSON with `status: "ok"`.

## 3. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:
`http://localhost:3000/login`

The frontend defaults are already configured for:

```text
REST: http://localhost:5000/api
Socket: http://localhost:5000
```

No ngrok is required for this local demo.

## 4. First test

1. Open `/register`.
2. Create a test account.
3. Sign in at `/login`.
4. Dashboard should open.
5. Confirm Backend shows Connected.
6. Enter an AI prompt in Aura AI Copilot.
7. Click Generate UI.
8. Confirm generated JSX appears in the editor and Live Preview.

## If AI generation fails

Check that `GEMINI_API_KEY` is valid in `backend/.env` and restart the backend.

## If login fails

Check:
- MongoDB is running.
- backend is running on port 5000.
- `http://localhost:5000/api/health` works.
- frontend is using localhost:5000 in `.env.local`.

## If you later restore the 3-laptop architecture

You can expose backend port 5000 with ngrok and set the frontend variables to the current HTTPS URL. The backend CORS configuration accepts localhost and ngrok-free.dev origins.


## Important project structure

The live backend is now directly under `backend/` (no nested `backend/backend` folder). The `ai-pipeline-reference/` folder is kept only as the teammate/reference implementation.

## What is integrated

- Next.js frontend on port 3000
- Express + Socket.IO backend on port 5000
- Gemini generation through the backend
- MongoDB-backed registration/login/project APIs
- Live mouse, click, scroll, keyboard and hesitation telemetry
- Live cognitive-load, focus, stress and productivity calculations
- AI-generated JSX in Monaco editor
- Live React preview
- Self-Healing Engine layout recommendations
- Backend health endpoint and graceful startup when MongoDB is temporarily unavailable

If MongoDB is not running, the backend still starts so the health check and AI/socket layer can be tested; authentication and project persistence require MongoDB.
