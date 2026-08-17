"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Sparkles } from "lucide-react";

import { useChat } from "@/app/context/ChatContext";

import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatPanel() {
  const { messages, addMessage } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSend = async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsTyping(true);

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
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-cyan-500/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">

      <ChatHeader />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4">

        {messages.length === 0 ? (

          <div className="flex flex-1 flex-col items-center justify-center text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 shadow-xl">

              <Bot
                size={38}
                className="text-white"
              />

            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Welcome to Aura AI
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Generate React components, Tailwind UI,
              dashboards and reusable interfaces
              powered by Aura AI.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3">

              {[
                "Create Admin Dashboard",
                "Generate Login Page",
                "Build Pricing Section",
                "Create Landing Page",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => handleSend(item)}
                  className="w-full rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-left transition hover:border-cyan-400 hover:bg-cyan-500/20"
                >

                  <div className="flex items-center gap-3">

                    <Sparkles
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="font-medium text-white">
                      {item}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>

        ) : (

          <div className="space-y-5">

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

      <div className="border-t border-slate-800 bg-slate-900 p-4">

        <ChatInput
          onSend={handleSend}
        />

      </div>
            {/* Footer */}

      <div className="border-t border-slate-800 bg-slate-950 px-4 py-3">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-2 text-sm text-slate-400">

            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

            <span>Aura AI Online</span>

          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">

            <span>
              Messages:
              <span className="ml-1 font-semibold text-cyan-300">
                {messages.length}
              </span>
            </span>

            <span>
              Model:
              <span className="ml-1 font-semibold text-violet-300">
                Gemini
              </span>
            </span>

            <span>
              Workspace:
              <span className="ml-1 font-semibold text-green-300">
                Ready
              </span>
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}