"use client";


import { useEffect } from "react";

import Navbar from "./Navbar";
import CommandPalette from "./CommandPalette";
import WelcomeCard from "./WelcomeCard";
import HistoryPanel from "./chat/HistoryPanel";
import AIStatusCard from "./AIStatusCard";
import TelemetryTracker from "./TelemetryTracker";
import AskAura from "./AskAura";
import CodeEditor from "./CodeEditor";
import DynamicRenderer from "./DynamicRenderer";
import AdaptiveDashboard from "./AdaptiveDashboard";
import SelfHealingEngine from "./SelfHealingEngine";
import ChatPanel from "./chat/ChatPanel";
import ErrorBoundary from "./ErrorBoundary";
import CognitiveGauge from "./CognitiveGauge";
import ResponseCard from "./ResponseCard";
import Footer from "./Footer";

import { getSocket } from "../services/socket";
import { useTelemetryContext } from "../context/TelemetryContext";

export default function Dashboard() {
  const { telemetry } = useTelemetryContext();

  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("✅ Aura Backend Connected");
    });

    socket.on("disconnect", () => {
      console.log("❌ Aura Backend Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const cognitiveLoad = Math.min(
    100,
    Math.round(
      telemetry.clicks * 3 +
        telemetry.rapidClicks * 5 +
        telemetry.hesitationTime / 10 +
        telemetry.velocity / 8
    )
  );

  return (
    <div className="min-h-screen bg-transparent p-8 text-white">

      <Navbar />
      <CommandPalette />

      {/* Dashboard Header */}
      <div className="mt-6 mb-8 rounded-2xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">
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

      {/* KPI Cards */}
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">

        <CognitiveGauge />

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">
          <h2 className="font-bold text-lg">
            Stress Meter
          </h2>

          <p className="mt-3 text-3xl font-bold text-cyan-400">
            {Math.min(100, cognitiveLoad)}%
          </p>

          <p className="mt-2 text-sm text-slate-400">
            AI detected stress level
          </p>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-slate-900/60 p-6">
          <h2 className="font-bold text-lg">
            Focus Score
          </h2>

          <p className="mt-3 text-3xl font-bold text-green-400">
            {100 - Math.min(100, cognitiveLoad)}%
          </p>

          <p className="mt-2 text-sm text-slate-400">
            User concentration level
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-slate-900/60 p-6">
          <h2 className="font-bold text-lg">
            Productivity
          </h2>

          <p className="mt-3 text-3xl font-bold text-yellow-400">
            {Math.min(100, telemetry.keyPresses)}%
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Keyboard activity score
          </p>
        </div>

      </section>

            {/* Telemetry */}
      <div className="mt-8">
        <TelemetryTracker />
      </div>

      {/* ===================== AI Workspace ===================== */}
<section className="mt-8 rounded-3xl border border-cyan-500/20 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">

  <div className="mb-6">
    <h2 className="text-2xl font-bold text-cyan-300">
      AI Workspace
    </h2>

    <p className="mt-1 text-slate-400">
      Build, preview and refine adaptive interfaces with Aura AI.
    </p>
  </div>

  <div className="grid gap-6 xl:grid-cols-[320px_1fr_520px]">

    {/* Left */}
    <div className="space-y-6">
      <HistoryPanel />
      <ChatPanel />
      <AskAura />
    </div>

    {/* Center */}
    <div className="rounded-2xl border border-cyan-500/10 bg-slate-950/40 p-4">
      <CodeEditor />
    </div>

    {/* Right */}
    <div className="rounded-2xl border border-violet-500/10 bg-slate-950/40 p-4">
      <ErrorBoundary>
        <DynamicRenderer />
      </ErrorBoundary>
    </div>

  </div>

</section>

      {/* AI Components */}
      <div className="mt-8 space-y-6">

        <AdaptiveDashboard
          cognitiveLoad={cognitiveLoad}
        />

        <SelfHealingEngine
          cognitiveLoad={cognitiveLoad}
        />

        <ResponseCard />

      </div>

      {/* Footer */}
      <div className="mt-8">
        <Footer />
      </div>

    </div>
  );
}