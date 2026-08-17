"use client";

import {
  Bot,
  Trash2,
  Download,
  Plus,
  Sparkles,
} from "lucide-react";
import { useChat } from "@/app/context/ChatContext";

export default function ChatHeader() {
  const { messages, clearMessages } = useChat();

  const exportChat = () => {
    const content = messages
      .map(
        (message) =>
          `[${message.timestamp}] ${message.role.toUpperCase()}\n${message.content}`
      )
      .join("\n\n");

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "AuraGen-Conversation.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-xl backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 shadow-lg">

            <Bot
              className="text-white"
              size={28}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Aura AI
            </h2>

            <div className="mt-1 flex items-center gap-2">

              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

              <span className="text-sm text-green-300">
                Online
              </span>

            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">

            {messages.length} Messages

          </div>

          <button
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition hover:border-cyan-500 hover:bg-slate-700"
            title="New Chat"
          >
            <Plus
              size={18}
              className="text-cyan-300"
            />
          </button>

          <button
            onClick={exportChat}
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition hover:border-green-500 hover:bg-slate-700"
            title="Export Chat"
          >
            <Download
              size={18}
              className="text-green-300"
            />
          </button>

          <button
            onClick={clearMessages}
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 transition hover:bg-red-500/20"
            title="Clear Chat"
          >
            <Trash2
              size={18}
              className="text-red-400"
            />
          </button>

        </div>

      </div>

      <div className="mt-5 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-4">

        <div className="flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-cyan-400"
          />

          <span className="font-semibold text-cyan-300">
            AI Assistant
          </span>

        </div>

        <p className="mt-2 text-sm leading-7 text-slate-300">

          Aura AI can generate React components, explain code,
          improve UI, optimize layouts, analyze telemetry,
          and assist with adaptive interface generation.

        </p>

      </div>

    </div>
  );
}