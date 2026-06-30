"use client";

import Navbar from "./Navbar";
import WelcomeCard from "./WelcomeCard";
import TelemetryTracker from "./TelemetryTracker";
import AskAura from "./AskAura";
import CodeEditor from "./CodeEditor";
import CognitiveGauge from "./CognitiveGauge";
import ResponseCard from "./ResponseCard";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <Navbar />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 space-y-6">
          <WelcomeCard />
          <TelemetryTracker />
          <AskAura />
          <CodeEditor />
        </div>

        <div className="space-y-6">
          <CognitiveGauge />
          <ResponseCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}