"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (
    role: "user" | "assistant",
    content: string
  ) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export function ChatProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (
    role: "user" | "assistant",
    content: string
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        content,
      },
    ]);
  };

  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChat must be used inside ChatProvider"
    );
  }

  return context;
}