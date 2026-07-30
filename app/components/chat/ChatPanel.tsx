"use client";

import { useChat } from "../../context/ChatContext";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface Props {
  loading?: boolean;
}

export default function ChatPanel({ loading = false }: Props) {
  const { messages } = useChat();

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-900">
      <div className="border-b border-slate-700 p-4">
        <h2 className="text-xl font-bold text-white">
          Aura AI Chat
        </h2>

        <p className="text-sm text-slate-400">
          Build your UI with conversation
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 mt-20">
            Start a conversation with Aura AI 🚀
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))
        )}

        {loading && <TypingIndicator />}
      </div>
    </div>
  );
}