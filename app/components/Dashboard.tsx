"use client";

import Navbar from "./Navbar";
import WelcomeCard from "./WelcomeCard";
import TelemetryTracker from "./TelemetryTracker";
import AskAura from "./AskAura";
import CodeEditor from "./CodeEditor";
import DynamicRenderer from "./DynamicRenderer";
import CognitiveGauge from "./CognitiveGauge";
import ResponseCard from "./ResponseCard";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-transparent text-white p-8">

      <Navbar />

      {/* Hero */}
      <section className="mt-8">
        <WelcomeCard />
      </section>

      {/* AI Metrics */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">

        <CognitiveGauge />

        {/* Placeholder cards for now */}
        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">
          Stress Meter
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">
          Focus Score
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">
          Productivity
        </div>

      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2 space-y-6">

          <TelemetryTracker />

          <AskAura />

          <CodeEditor />

        </div>

        <div className="space-y-6">

          <ResponseCard />

        </div>

      </section>

      <Footer />

    </div>
  );
}