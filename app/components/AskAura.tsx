"use client";

import { useAura } from "../context/AuraContext";
import { generateAuraCode } from "../services/aiService";

export default function AskAura() {
  const {
    prompt,
    setPrompt,
    setResponse,
    setGeneratedCode,
  } = useAura();

  const generateCode = async () => {
    if (!prompt.trim()) {
      setResponse("⚠ Please enter a prompt first.");
      return;
    }

    try {
      const result = await generateAuraCode(prompt);

      setResponse(result.response);
      setGeneratedCode(result.code);
    } catch (error) {
      console.error(error);
      setResponse("❌ Failed to generate code.");
    }
  };

  return (
    <div className="rounded-2xl bg-[#111827] border border-slate-700 p-6">
      <h2 className="text-2xl font-bold mb-2">
        ✨ Ask Aura
      </h2>

      <p className="text-gray-400 mb-4">
        Describe what you want AuraGen to build.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: Build a modern React login page with Tailwind CSS..."
        rows={6}
        className="w-full rounded-xl bg-[#1e293b] text-white p-4 outline-none resize-none"
      />

      <button
        onClick={generateCode}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 py-3 text-white font-semibold hover:opacity-90 transition"
      >
        🚀 Generate with Aura
      </button>
    </div>
  );
}