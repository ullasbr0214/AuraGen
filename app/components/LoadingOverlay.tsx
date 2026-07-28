"use client";

import { Loader2, Brain, Sparkles } from "lucide-react";

type LoadingOverlayProps = {
  loading: boolean;
};

export default function LoadingOverlay({
  loading,
}: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="w-[420px] rounded-3xl border border-cyan-500/20 bg-slate-900 p-8 shadow-2xl">

        {/* AI Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">

          <Brain
            className="animate-pulse text-cyan-400"
            size={40}
          />

        </div>

        {/* Title */}

        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Aura AI is Working...
        </h2>

        <p className="mt-2 text-center text-slate-400">
          Please wait while AuraGen analyzes your prompt
          and generates a React component.
        </p>

        {/* Spinner */}

        <div className="mt-8 flex justify-center">

          <Loader2
            size={42}
            className="animate-spin text-cyan-400"
          />

        </div>

        {/* Steps */}

        <div className="mt-8 space-y-4">

          <Step text="Analyzing Prompt..." />

          <Step text="Reading Telemetry..." />

          <Step text="Generating React Component..." />

          <Step text="Optimizing Layout..." />

          <Step text="Preparing Renderer..." />

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="h-2 overflow-hidden rounded-full bg-slate-700">

            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />

          </div>

        </div>

      </div>

    </div>
  );
}

function Step({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <Sparkles
        size={16}
        className="text-cyan-400"
      />

      <span className="text-sm text-slate-300">
        {text}
      </span>

    </div>
  );
}