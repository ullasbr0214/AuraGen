"use client";

import { useEffect, useRef, useState } from "react";

import {
  Bot,
  Sparkles,
} from "lucide-react";

import { useChat } from "@/app/context/ChatContext";

import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatPanel() {
  const {
    messages,
    addMessage,
  } = useChat();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const [isTyping, setIsTyping] =
    useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSend = async (
    prompt: string
  ) => {
    if (!prompt.trim()) return;

    setIsTyping(true);

    // Placeholder for Gemini API
    // Replace this section later
    setTimeout(() => {
      addMessage(
        "assistant",
        `Aura AI received your prompt:

"${prompt}"

Gemini integration will generate the response here.`
      );

      setIsTyping(false);
    }, 1200);
  };

  return (
    <section className="flex h-full flex-col rounded-3xl border border-cyan-500/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">

      <ChatHeader />

      {/* Chat Body */}

      <div className="flex-1 overflow-y-auto p-6">

        {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center py-20 text-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 shadow-2xl">

              <Bot
                size={42}
                className="text-white"
              />

            </div>

            <h2 className="mt-8 text-3xl font-bold text-white">
              Welcome to Aura AI
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-slate-400">
              Generate React components, Tailwind UI,
              dashboards, landing pages, reusable code,
              adaptive layouts and intelligent interfaces
              powered by AuraGen AI.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              {[
                "Create Admin Dashboard",
                "Generate Login Page",
                "Build Pricing Section",
                "Create Landing Page",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => handleSend(item)}
                  className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/20"
                >

                  <Sparkles
                    size={18}
                    className="mb-3 text-cyan-400"
                  />

                  <p className="font-medium text-white">
                    {item}
                  </p>

                </button>

              ))}

            </div>

          </div>

        ) : (

          <div className="space-y-6">

            {messages.map((message) => (

              <ChatBubble
                key={message.id}
                message={message}
              />

            ))}

            {isTyping && (
              <TypingIndicator />
            )}

            <div ref={bottomRef} />

          </div>

        )}

      </div>

      {/* Input Area */}

      <div className="border-t border-slate-800 p-5">

        <ChatInput
          onSend={handleSend}
        />

      </div>
            {/* Footer */}

      <div className="border-t border-slate-800 bg-slate-950/40 px-6 py-4">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-sm text-slate-400">

            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

            Aura AI Online

          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">

            <span>
              Messages:
              <span className="ml-2 font-semibold text-cyan-300">
                {messages.length}
              </span>
            </span>

            <span>
              Model:
              <span className="ml-2 font-semibold text-violet-300">
                Gemini
              </span>
            </span>

            <span>
              Workspace:
              <span className="ml-2 font-semibold text-green-300">
                Ready
              </span>
            </span>

          </div>

        </div>

      </div>

    </section>
      );
}