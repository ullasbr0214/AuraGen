"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  Wand2,
  Loader2,
  Lightbulb,
} from "lucide-react";

import { useAura } from "../context/AuraContext";
import { useTelemetryContext } from "../context/TelemetryContext";
import { generateAuraCode } from "../services/aiService";
import LoadingOverlay from "./LoadingOverlay";

export default function AskAura() {
  const {
    prompt,
    setPrompt,
    setResponse,
    setGeneratedCode,
  } = useAura();

  const { telemetry } = useTelemetryContext();

  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Generate a responsive login page",
    "Create a dashboard with charts",
    "Build a pricing section",
    "Design a modern landing page",
  ];

  const generateCode = async () => {
    if (!prompt.trim()) {
      setResponse("⚠ Please enter a prompt first.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateAuraCode(prompt, {
        hesitation: telemetry.hesitationTime,
        clicks: telemetry.clicks,
      });

      setResponse(result.response);
      setGeneratedCode(result.code);

      // Optional: clear prompt after successful generation
      setPrompt("");
    } catch (error) {
      console.error(error);

      setResponse(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Unable to connect to Aura Backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/10 p-3">
          <Sparkles className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Aura AI Copilot
          </h2>

          <p className="text-slate-400">
            Describe the interface you want AuraGen to generate.
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-6 flex flex-wrap gap-3">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => setPrompt(item)}
            className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Prompt */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={8}
        placeholder="Example: Build a futuristic AI dashboard with telemetry analytics and adaptive cards..."
        className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-800/70 p-5 text-white outline-none transition focus:border-cyan-400"
      />

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2 text-slate-400">
          <Lightbulb size={18} />

          <span className="text-sm">
            AI uses your prompt to generate React components.
          </span>
        </div>

        <button
          onClick={generateCode}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Generating...
            </>
          ) : (
            <>
              <Send size={18} />
              Generate UI
            </>
          )}
        </button>

      </div>

      {/* AI Pipeline */}
      <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-slate-800/50 p-5">

        <div className="flex items-center gap-3">

          <Wand2 className="text-cyan-400" />

          <div>
            <h3 className="font-semibold text-white">
              AI Generation Pipeline
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Prompt → AI Model → React Component → Dynamic Renderer
            </p>
          </div>

        </div>

      </div>

      <LoadingOverlay loading={loading} />

    </section>
  );
}