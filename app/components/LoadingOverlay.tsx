"use client";

import { Loader2, BrainCircuit, Sparkles } from "lucide-react";

type LoadingOverlayProps = {
  loading: boolean;
};

export default function LoadingOverlay({
  loading,
}: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">

      <div className="w-full max-w-lg rounded-3xl border border-cyan-500/20 bg-slate-900 p-8 shadow-2xl">

        <div className="flex flex-col items-center">

          <BrainCircuit
            size={56}
            className="text-cyan-400 animate-pulse"
          />

          <h2 className="mt-5 text-3xl font-bold text-white">
            Aura AI
          </h2>

          <p className="mt-2 text-slate-400">
            Building your adaptive interface...
          </p>

        </div>

        <div className="mt-10 space-y-6">

          <Step
            icon={<Loader2 className="animate-spin" />}
            text="Analyzing Prompt"
          />

          <Step
            icon={<Sparkles />}
            text="Generating React Components"
          />

          <Step
            icon={<BrainCircuit />}
            text="Optimizing User Experience"
          />

          <Step
            icon={<Loader2 className="animate-spin" />}
            text="Preparing Dynamic Renderer"
          />

        </div>

        <div className="mt-10">

          <div className="h-2 overflow-hidden rounded-full bg-slate-700">

            <div className="h-full w-3/4 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

function Step({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-800/60 p-4">

      <div className="text-cyan-400">
        {icon}
      </div>

      <p className="text-slate-300">
        {text}
      </p>

    </div>
  );
}