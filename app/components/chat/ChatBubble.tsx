"use client";

import { memo } from "react";
import {
  Bot,
  User,
  Copy,
  Check,
  Code2,
} from "lucide-react";
import { ChatMessage } from "@/app/context/ChatContext";
import { useState } from "react";

interface ChatBubbleProps {
  message: ChatMessage;
}

function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(
        message.code ?? message.content
      );

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[90%] items-start gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-lg ${
            isUser
              ? "bg-gradient-to-br from-cyan-500 to-blue-600"
              : "bg-gradient-to-br from-violet-500 to-fuchsia-600"
          }`}
        >
          {isUser ? (
            <User
              size={20}
              className="text-white"
            />
          ) : (
            <Bot
              size={20}
              className="text-white"
            />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`relative overflow-hidden rounded-3xl border p-5 shadow-xl transition-all duration-300 hover:shadow-cyan-500/10 ${
            isUser
              ? "border-cyan-500/20 bg-cyan-500/10"
              : "border-slate-700 bg-slate-900/70"
          }`}
        >
          {/* Header */}

          <div className="mb-3 flex items-center justify-between gap-5">
            <div>
              <h4 className="font-semibold text-white">
                {isUser
                  ? "You"
                  : "Aura AI"}
              </h4>

              <p className="text-xs text-slate-500">
                {message.timestamp}
              </p>
            </div>

            <button
              onClick={copyMessage}
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 transition hover:border-cyan-500 hover:bg-slate-700"
            >
              {copied ? (
                <Check
                  size={16}
                  className="text-green-400"
                />
              ) : (
                <Copy
                  size={16}
                  className="text-slate-300"
                />
              )}
            </button>
          </div>

          {/* Message */}

          <div className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">
            {message.content}
          </div>

          {/* JSX Preview */}

          {message.code && (
            <div className="mt-5">
              <div className="mb-2 flex items-center gap-2 text-cyan-300">
                <Code2 size={16} />
                <span className="text-sm font-semibold">
                  Generated JSX
                </span>
              </div>

              <pre className="max-h-80 overflow-auto rounded-2xl border border-slate-700 bg-[#08111F] p-4 text-xs leading-6 text-green-300">
                <code>{message.code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ChatBubble);