"use client";

import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">

      {/* AI Avatar */}

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg">

        <Bot
          size={20}
          className="text-white"
        />

      </div>

      {/* Typing Bubble */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900/70 px-5 py-4 shadow-xl">

        <div className="flex items-center gap-2">

          <div className="flex gap-1">

            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400"
              style={{
                animationDelay: "0ms",
              }}
            />

            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400"
              style={{
                animationDelay: "200ms",
              }}
            />

            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400"
              style={{
                animationDelay: "400ms",
              }}
            />

          </div>

          <span className="ml-2 text-sm text-slate-400">
            Aura AI is thinking...
          </span>

        </div>

      </div>

    </div>
  );
}