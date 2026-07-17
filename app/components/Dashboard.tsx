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
  getSocket();
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

    <div className="min-h-screen bg-transparent text-white p-8">

      <Navbar />

      <section className="mt-8">

        <WelcomeCard />

      </section>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">

        <CognitiveGauge />

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">

          <h2 className="font-bold">Stress Meter</h2>

          <p className="mt-2 text-cyan-400">

            {Math.min(100, cognitiveLoad)}%

          </p>

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">

          <h2 className="font-bold">

            Focus Score

          </h2>

          <p className="mt-2 text-green-400">

            {100 - Math.min(100, cognitiveLoad)}%

          </p>

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">

          <h2 className="font-bold">

            Productivity

          </h2>

          <p className="mt-2 text-yellow-400">

            {telemetry.keyPresses}

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

      <Footer />

    </div>

  );

}