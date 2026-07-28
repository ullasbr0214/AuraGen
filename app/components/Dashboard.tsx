"use client";

import { useEffect } from "react";

import Navbar from "./Navbar";
import WelcomeCard from "./WelcomeCard";
import TelemetryTracker from "./TelemetryTracker";
import AskAura from "./AskAura";
import CodeEditor from "./CodeEditor";
import DynamicRenderer from "./DynamicRenderer";
import AdaptiveDashboard from "./AdaptiveDashboard";
import SelfHealingEngine from "./SelfHealingEngine";
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
    console.log("❌ Backend Disconnected");
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

    {/* Dashboard Header */}

    <div className="mt-6 mb-8 rounded-2xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">

      <h1 className="text-4xl font-bold text-white">
        AuraGen Dashboard
      </h1>

      <p className="mt-2 text-slate-300">
        Self-Healing Generative UI using Cognitive Load Intelligence
      </p>

    </div>

    <section>

      <WelcomeCard />

    </section>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">

        <CognitiveGauge />

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">

          <h2 className="font-bold">Stress Meter</h2>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
  {Math.min(100, cognitiveLoad)}%
</p>

<p className="mt-2 text-sm text-slate-400">
  AI detected stress level
</p>

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">

          <h2 className="font-bold">

            Focus Score

          </h2>

          <p className="mt-2 text-3xl font-bold text-green-400">

            {100 - Math.min(100, cognitiveLoad)}%

          </p>

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">

          <h2 className="font-bold">

            Productivity

          </h2>

          <p className="mt-2 text-yellow-400">

            {Math.min(100, telemetry.keyPresses)}%

          </p>

        </div>

      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2 space-y-6">

          <TelemetryTracker />

          <AskAura />

          <CodeEditor />

          <ErrorBoundary>

            <DynamicRenderer />

          </ErrorBoundary>

          <AdaptiveDashboard cognitiveLoad={cognitiveLoad} />

          <SelfHealingEngine cognitiveLoad={cognitiveLoad} />

        </div>

        <div className="space-y-6">

          <ResponseCard />

        </div>

      </section>

      {/* AI Status */}

<div className="mt-6 flex justify-end">

  <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">

    ● AI Monitoring Active

  </div>

</div>

<Footer />

    </div>

  );

}