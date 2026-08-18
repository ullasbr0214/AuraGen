"use client";


import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import CommandPalette from "./CommandPalette";
import WelcomeCard from "./WelcomeCard";
import HistoryPanel from "./chat/HistoryPanel";
import AIStatusCard from "./AIStatusCard";
import TelemetryTracker from "./TelemetryTracker";
import AskAura from "./AskAura";
import CodeEditor from "./CodeEditor";
import DynamicRenderer from "./DynamicRenderer";
import ErrorBoundary from "./ErrorBoundary";
import CognitiveGauge from "./CognitiveGauge";
import Footer from "./Footer";
import SelfHealingEngine from "./SelfHealingEngine";
import useTelemetry from "../hooks/useTelemetry";
import useAdaptiveLayout from "../hooks/useAdaptiveLayout";
import { getSocket } from "../services/socket";
import { useTelemetryContext } from "../context/TelemetryContext";

export default function Dashboard() {
  const { telemetry } = useTelemetryContext();
  const {
  cognitiveLoad,
  focusLevel,
  productivity,
  recommendation,
} = useTelemetry();
const layoutMode = useAdaptiveLayout(cognitiveLoad);
  const [connected, setConnected] = useState(false);
const [backendDatabase, setBackendDatabase] = useState<string>("Checking...");

  useEffect(() => {
  const socket = getSocket();

  // -----------------------------
  // Socket.IO connection
  // -----------------------------

  const handleSocketConnect = () => {
    console.log("✅ Aura Socket Connected");
  };

  const handleSocketDisconnect = () => {
    console.log("❌ Aura Socket Disconnected");
  };

  socket.on("connect", handleSocketConnect);
  socket.on("disconnect", handleSocketDisconnect);

  if (!socket.connected) {
    socket.connect();
  }

  // -----------------------------
  // Backend health check
  // -----------------------------

  const checkBackendHealth = async () => {
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL ||
"https://auragen-backend-taw0.onrender.com/api";

      const response = await fetch(`${apiBase}/health`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success && data.status === "ok") {
        console.log("✅ Backend API Connected");

        setConnected(true);

        setBackendDatabase(
          data.database === "connected"
            ? "MongoDB Connected"
            : "MongoDB Disconnected"
        );
      } else {
        throw new Error("Backend health check failed");
      }
    } catch (error) {
      console.error(
        "❌ Backend health check failed:",
        error
      );

      setConnected(false);
      setBackendDatabase("API Unreachable");
    }
  };

  // Check immediately
  checkBackendHealth();

  // Check every 10 seconds
  const healthInterval = window.setInterval(
    checkBackendHealth,
    10000
  );

  return () => {
    socket.off("connect", handleSocketConnect);
    socket.off("disconnect", handleSocketDisconnect);

    window.clearInterval(healthInterval);
  };
}, []);

  return (
    <div
  id="dashboard"
  data-layout-mode={layoutMode}
  className={`min-h-screen min-w-0 bg-transparent text-white transition-all duration-500 ${
    layoutMode === "simplified"
      ? "p-3 sm:p-4"
      : layoutMode === "focus"
      ? "p-4 sm:p-5 lg:p-6"
      : "p-4 sm:p-6 lg:p-8"
  }`}
>

      <Navbar />
      <CommandPalette />

      {/* Dashboard Header */}
      <div id="analytics" className="mt-6 mb-8 rounded-2xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">
        <h1 className="text-4xl font-bold">
          AuraGen Dashboard
        </h1>

        <p className="mt-2 text-slate-300">
          Self-Healing Generative UI using Cognitive Load Intelligence
        </p>
      </div>

      {/* Welcome */}
      <WelcomeCard />

      <AIStatusCard />
      <div
  className={`mt-6 rounded-2xl border p-5 transition-all duration-500 ${
    layoutMode === "simplified"
      ? "border-red-500/30 bg-red-500/5"
      : layoutMode === "focus"
      ? "border-yellow-500/30 bg-yellow-500/5"
      : "border-green-500/20 bg-green-500/5"
  }`}
>
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <p className="text-xs uppercase tracking-wider text-slate-500">
        Self-Healing Engine
      </p>

      <h3 className="mt-1 text-lg font-bold text-white">
        {layoutMode === "simplified"
          ? "Simplified Mode Activated"
          : layoutMode === "focus"
          ? "Focus Mode Activated"
          : "Normal Mode"}
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        {recommendation}
      </p>
    </div>

    <div
      className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
        layoutMode === "simplified"
          ? "bg-red-500/10 text-red-300"
          : layoutMode === "focus"
          ? "bg-yellow-500/10 text-yellow-300"
          : "bg-green-500/10 text-green-300"
      }`}
    >
      Cognitive Load: {cognitiveLoad}%
    </div>

  </div>
</div>
      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-5">

  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <h2 className="text-lg font-bold text-white">
        Backend Connection
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Real-time AuraGen backend health
      </p>
    </div>

    <div
      className={`flex items-center gap-2 text-xl font-semibold ${
        connected
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      <span
        className={`h-3 w-3 rounded-full ${
          connected
            ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
            : "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]"
        }`}
      />

      {connected
        ? "Connected"
        : "Disconnected"}
    </div>

  </div>

  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

    <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-3">

      <p className="text-xs uppercase tracking-wider text-slate-500">
        API
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          connected
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {connected
          ? "Healthy"
          : "Unreachable"}
      </p>

    </div>

    <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-3">

      <p className="text-xs uppercase tracking-wider text-slate-500">
        Database
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          backendDatabase === "MongoDB Connected"
            ? "text-green-400"
            : "text-yellow-400"
        }`}
      >
        {backendDatabase}
      </p>

    </div>

  </div>

</div>

      {/* KPI Cards */}
{layoutMode !== "simplified" && (
  <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">

    <CognitiveGauge />

    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">
      <h2 className="text-lg font-bold">
        Stress Meter
      </h2>

      <p className="mt-3 text-3xl font-bold text-cyan-400">
        {Math.min(100, cognitiveLoad)}%
      </p>

      <p className="mt-2 text-sm text-slate-400">
        Real-time telemetry analysis
      </p>
    </div>

    <div className="rounded-2xl border border-green-500/20 bg-slate-900/60 p-6">
      <h2 className="text-lg font-bold">
        Focus Score
      </h2>

      <p className="mt-3 text-3xl font-bold text-green-400">
        {focusLevel}%
      </p>

      <p className="mt-2 text-sm text-slate-400">
        Calculated from cognitive metrics
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-500/20 bg-slate-900/60 p-6">
      <h2 className="text-lg font-bold">
        Productivity
      </h2>

      <p className="mt-3 text-3xl font-bold text-yellow-400">
        {Math.round(productivity)}%
      </p>

      <p className="mt-2 text-sm text-slate-400">
        Typing activity based score
      </p>
    </div>

    </section>
)}

{/* ===================== Telemetry ===================== */}

<div
  id="telemetry"
  className={`mt-8 transition-all duration-500 ${
    layoutMode === "simplified"
      ? "hidden"
      : "block"
  }`}
>
  <TelemetryTracker />
</div>

{/* ===================== AI Workspace ===================== */}

<section
  id="workspace"
  className={`mt-8 min-w-0 overflow-hidden rounded-3xl border bg-slate-900/40 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
    layoutMode === "simplified"
      ? "border-cyan-400/40 p-3 shadow-cyan-500/10 sm:p-4"
      : layoutMode === "focus"
      ? "border-cyan-500/30 p-4 sm:p-5"
      : "border-cyan-500/20 p-4 sm:p-6"
  }`}
>

  <div className="mb-6">

    <div className="mb-6">
  <p className="text-sm text-slate-500">
    Live AI generation using telemetry-driven adaptive UI.
  </p>

  <h2 className="text-2xl font-bold text-cyan-300">
    AI Workspace
  </h2>

  <p className="mt-1 text-slate-400">
    Build, preview and refine adaptive interfaces with Aura AI.
  </p>
</div>

    <p className="mt-1 text-slate-400">
      Build, preview and refine adaptive interfaces with Aura AI.
    </p>

  </div>

  <div className="grid min-w-0 gap-6 xl:grid-cols-[280px_minmax(0,1fr)] items-start">

  {/* AI CONTROLS */}
  <div id="ai-assistant" className="min-w-0 space-y-6">
    <HistoryPanel />
    <AskAura />
  </div>

  {/* CODE + PREVIEW */}
  <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

    {/* CODE */}
    <div className="min-w-0 overflow-hidden rounded-2xl border border-cyan-500/10 bg-slate-950/50">
      <CodeEditor />
    </div>

    {/* PREVIEW */}
    <div className="min-w-0 overflow-hidden rounded-2xl border border-violet-500/10 bg-slate-950/50">
      <ErrorBoundary>
        <DynamicRenderer />
      </ErrorBoundary>
    </div>

  </div>

</div>

</section>
{/* Cognitive engine */}
<div
  id="cognitive-engine"
  className={`mt-8 transition-all duration-500 ${
    layoutMode === "simplified"
      ? "ring-1 ring-red-500/20"
      : layoutMode === "focus"
      ? "ring-1 ring-yellow-500/20"
      : ""
  }`}
>
  <SelfHealingEngine
    cognitiveLoad={cognitiveLoad}
  />
</div>

{/* Footer */}
<div className="mt-8">
  <Footer />
</div>

</div>
);
}