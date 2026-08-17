"use client";

import { useRef, useState } from "react";
import {
  Send,
  Mic,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { useChat } from "@/app/context/ChatContext";

interface Props {
  onSend?: (message: string) => void;
}

export default function ChatInput({
  onSend,
}: Props) {
  const { addMessage } = useChat();

  const [prompt, setPrompt] = useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    "Create a modern dashboard",
    "Generate login page",
    "Build pricing section",
    "Create responsive navbar",
  ];

  const autoResize = () => {
    const el = textareaRef.current;

    if (!el) return;

    el.style.height = "auto";
    el.style.height =
      Math.min(el.scrollHeight, 180) + "px";
  };

  const sendPrompt = () => {
    if (!prompt.trim()) return;

    addMessage("user", prompt);

    onSend?.(prompt);

    setPrompt("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }
  };

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl">

      {/* Suggestions */}

      <div className="mb-5 flex flex-wrap gap-3">

        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => setPrompt(item)}
            className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
          >
            <Sparkles
              size={14}
              className="mr-2 inline"
            />

            {item}
          </button>
        ))}

      </div>

      {/* Text Area */}

      <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3">

        <textarea
          ref={textareaRef}
          rows={2}
          value={prompt}
          placeholder="Ask Aura AI anything..."
          onChange={(e) => {
            setPrompt(e.target.value);
            autoResize();
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              sendPrompt();
            }
          }}
          className="min-h-[56px] w-full resize-none bg-transparent text-slate-200 outline-none placeholder:text-slate-500"
        />

        <div className="mt-4 flex items-center justify-between">

          <div className="flex gap-2">

            <button className="rounded-xl p-2 transition hover:bg-slate-800">
              <Paperclip
                size={20}
                className="text-slate-400"
              />
            </button>

            <button className="rounded-xl p-2 transition hover:bg-slate-800">
              <Mic
                size={20}
                className="text-slate-400"
              />
            </button>

          </div>

          <div className="flex items-center gap-4">

            <span className="text-xs text-slate-500">
              {prompt.length}/2000
            </span>

            <button
              onClick={sendPrompt}
              disabled={!prompt.trim()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={18} />
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}