"use client";

import { getSocket } from "./socket";

export type GeneratedComponent = {
  id: number;
  title: string;
  description: string;
  jsx?: string;
};

type ComponentResult = {
  success: boolean;
  jsx?: string;
  explanation?: string;
  error?: string;
};

export function subscribeToGeneratedComponents(
  onNewComponent: (item: GeneratedComponent) => void
) {
  const socket = getSocket();

  let counter = 0;

  function handleComponent(result: ComponentResult) {
    console.log("📦 Renderer received:", result);

    if (!result.success) return;

    counter++;

    onNewComponent({
      id: counter,
      title: `Generated Component ${counter}`,
      description:
        result.explanation ||
        "AI successfully generated a React component.",
      jsx: result.jsx || "",
    });
  }

  socket.on("component", handleComponent);

  return () => {
    socket.off("component", handleComponent);
  };
}