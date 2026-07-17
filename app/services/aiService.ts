"use client";

import { getSocket } from "./socket";

type ComponentResult = {
  success: boolean;
  jsx?: string;
  explanation?: string;
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

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      socket.off("component", handleComponent);

      reject(
        new Error(
          "Timeout: Backend did not respond within 20 seconds."
        )
      );
    }, 20000);

    function handleComponent(result: ComponentResult) {
      console.log("✅ Component received:", result);

      clearTimeout(timeout);

      socket.off("component", handleComponent);

      if (!result.success) {
        reject(
          new Error(
            result.error || "Backend failed to generate UI."
          )
        );
        return;
      }

      resolve({
        response:
          result.explanation ||
          "✅ Aura successfully generated the component.",

        code: result.jsx || "",
      });
    }

    socket.on("component", handleComponent);

    console.log("📤 Sending telemetry to backend...");

    console.log({
      prompt,
      hesitation: telemetry?.hesitation ?? 3,
      clicks: telemetry?.clicks ?? 5,
    });

    socket.emit("telemetry", {
      prompt,
      hesitation: telemetry?.hesitation ?? 3,
      clicks: telemetry?.clicks ?? 5,
    });
  });
}