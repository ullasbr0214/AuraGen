# 🚀 AuraGen Frontend

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Socket.IO-Client-black?logo=socketdotio" />
  <img src="https://img.shields.io/badge/Status-Frontend%20Complete-success" />
</p>

## 📌 Project Overview

AuraGen is an AI-powered **Self-Healing Generative UI** platform that dynamically adapts user interfaces based on real-time cognitive load and user interaction telemetry.

This repository contains the **Frontend** of the AuraGen system, developed using **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

The frontend captures telemetry data, communicates with the backend using Socket.IO, and visualizes AI-generated UI components in real time.

---

# ✨ Features

- 🤖 AI-powered UI Generation
- 📊 Real-time Telemetry Tracking
- 🧠 Cognitive Load Visualization
- ⚡ Dynamic React Component Rendering
- 🔄 Self-Healing Dashboard
- 📡 Socket.IO Backend Communication
- 📈 Adaptive Dashboard
- 🎯 Productivity & Focus Monitoring
- 📱 Responsive UI
- 🌙 Modern Glassmorphism Design

---

# 🛠 Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Socket.IO Client
- Lucide React
- Context API

---

# 📂 Project Structure

```
AuraGen-Frontend
│
├── app
│   ├── components
│   │   ├── AdaptiveDashboard.tsx
│   │   ├── AskAura.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── CognitiveGauge.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DynamicRenderer.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingOverlay.tsx
│   │   ├── Navbar.tsx
│   │   ├── ResponseCard.tsx
│   │   ├── SelfHealingEngine.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TelemetryCard.tsx
│   │   ├── TelemetryTracker.tsx
│   │   └── WelcomeCard.tsx
│   │
│   ├── context
│   │   ├── AuraContext.tsx
│   │   └── TelemetryContext.tsx
│   │
│   ├── hooks
│   │   └── useTelemetry.ts
│   │
│   ├── services
│   │   ├── aiService.ts
│   │   ├── rendererService.ts
│   │   └── socket.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public
├── package.json
└── README.md
```

---

# 🧠 System Architecture

```
Frontend (Next.js)
        │
        │ Socket.IO
        ▼
Backend (Express.js)
        │
        ▼
AI Pipeline
(Google Gemini + LangChain)
        │
        ▼
Generated React Components
        │
        ▼
Frontend Renderer
```

---

# 📊 Frontend Modules

### Dashboard

- AI Command Center
- Live Metrics
- Adaptive Dashboard

### Telemetry Engine

- Mouse Tracking
- Click Tracking
- Rapid Click Detection
- Keyboard Tracking
- Scroll Tracking
- Hesitation Detection

### AI Copilot

- Prompt Input
- AI Request
- Backend Communication

### Code Workspace

- Live Generated React Code
- Copy Code
- Download Code
- Clear Workspace

### Dynamic Renderer

- Live JSX Preview
- Generated Components
- AI Rendering Pipeline

### Cognitive Engine

- Cognitive Load
- Stress Level
- Focus Score
- Productivity Score

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/ullasbr0214/AuraGen.git
```

Move into the project

```bash
cd AuraGen
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔌 Backend Connection

Configure the backend URL using an environment variable.

Create a `.env.local` file:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

Or replace it with your deployed backend URL.

---

# 👥 Team

### Ullas B R

**Frontend Developer**

Responsibilities

- UI Development
- Dashboard Design
- Telemetry Tracking
- Socket.IO Client Integration
- Dynamic Component Rendering

---

### Goutham

**Backend Developer**

Responsibilities

- Express.js Backend
- Socket.IO Server
- API Development
- Frontend Integration

---

### Ayush

**AI Pipeline Developer**

Responsibilities

- Gemini AI Integration
- LangChain Pipeline
- React Component Generation
- AI Prompt Engineering

---

# 🚀 Future Enhancements

- Live AI Component Rendering
- Multi-User Collaboration
- Voice Commands
- Gesture-Based Navigation
- AI Theme Adaptation
- Real-Time Analytics
- Performance Optimization

---

# 📄 License

This project is developed for educational and research purposes.

---

# 👨‍💻 Author

**Ullas B R**

Frontend Developer | AI & Machine Learning Engineer

GitHub: https://github.com/ullasbr0214

LinkedIn: https://www.linkedin.com/in/ullas-b-r-ai/

---

⭐ If you like this project, consider giving it a star.