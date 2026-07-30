"use client";

import { getSocket } from "./socket";

type ComponentResult = {
  success: boolean;
  jsx?: string;
  explanation?: string;

  cognitiveLoad?: number;
  stressLevel?: string;
  focusScore?: number;

  error?: string;
};

type AuraCodeResult = {
  response: string;
  code: string;

  cognitiveLoad: number;
  stressLevel: string;
  focusScore: number;
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

  cognitiveLoad: result.cognitiveLoad ?? 0,
  stressLevel: result.stressLevel ?? "Unknown",
  focusScore: result.focusScore ?? 0,
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