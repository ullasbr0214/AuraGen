"use client";

import { getSocket } from "./socket";

export type GeneratedComponent = {
  id: number;
  title: string;
  description: string;
};

export function subscribeToGeneratedComponents(
  onNewComponent: (item: GeneratedComponent) => void
) {
  const socket = getSocket();

  let counter = 0;

  function handleComponent(result: {
    success: boolean;
    jsx?: string;
    error?: string;
  }) {
    if (!result.success) return;

    counter++;

    onNewComponent({
      id: counter,
      title: `Generated Component #${counter}`,
      description: "AI-generated React component received successfully.",
    });
  }

  socket.on("component", handleComponent);

  return () => {
    socket.off("component", handleComponent);
  };
}