"use client";

import { getSocket } from "./socket";

type ComponentResult = {
  success: boolean;
  jsx?: string;
  error?: string;
};

type AuraCodeResult = {
  response: string;
  code: string;
};

export function generateAuraCode(
  prompt: string,
  telemetry?: {
    hesitation: number;
    clicks: number;
  }
): Promise<AuraCodeResult> {
  const socket = getSocket();

  const payload = {
    hesitation: telemetry?.hesitation ?? 3,
    clicks: telemetry?.clicks ?? 0,
    prompt,
  };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      socket.off("component", handleComponent);
      reject(new Error("AI generation timed out."));
    }, 20000);

    function handleComponent(result: ComponentResult) {
      clearTimeout(timeout);

      socket.off("component", handleComponent);

      if (!result.success) {
        reject(new Error(result.error || "Generation failed"));
        return;
      }

      resolve({
        response: `✨ Aura generated code for "${prompt}"`,
        code: result.jsx || "",
      });
    }

    socket.on("component", handleComponent);

    socket.emit("telemetry", payload);
  });
}