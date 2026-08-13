"use client";

import { getSocket } from "./socket";

type ComponentResult = {
  success?: boolean;
  jsx?: string;
  explanation?: string;
  cognitiveLoad?: number;
  stressLevel?: string | number;
  focusScore?: number;
  error?: string;
};

export type AuraCodeResult = {
  response: string;
  code: string;
  cognitiveLoad: number;
  stressLevel: string;
  focusScore: number;
};

type TelemetryData = {
  hesitation: number;
  clicks: number;
};

export function generateAuraCode(
  prompt: string,
  telemetry?: TelemetryData
): Promise<AuraCodeResult> {
  const socket = getSocket();

  return new Promise((resolve, reject) => {
    console.log("================================");
    console.log("🤖 AURA AI GENERATION");
    console.log("Prompt:", prompt);
    console.log("Socket connected:", socket.connected);
    console.log("Socket ID:", socket.id);
    console.log("================================");

    let completed = false;

    const timeout = setTimeout(() => {
      if (completed) return;

      completed = true;
      cleanup();

      console.error(
        "❌ AI GENERATION TIMEOUT"
      );

      reject(
        new Error(
          "Backend/AI pipeline did not respond within 20 seconds."
        )
      );
    }, 60000);

    const cleanup = () => {
      socket.off(
        "component_response",
        handleComponentResponse
      );

      socket.off(
        "connect_error",
        handleConnectionError
      );

      socket.off(
        "connect",
        handleConnect
      );
    };

    function handleComponentResponse(
      result: ComponentResult
    ) {
      if (completed) return;

      console.log("================================");
      console.log("📦 COMPONENT_RESPONSE RECEIVED");
      console.log("================================");

      console.log("Raw response:", result);

      if (result.success === false) {
        completed = true;
        clearTimeout(timeout);
        cleanup();

        reject(
          new Error(
            result.error ||
              result.explanation ||
              "AI failed to generate UI."
          )
        );

        return;
      }

      if (!result.jsx) {
        completed = true;
        clearTimeout(timeout);
        cleanup();

        reject(
          new Error(
            "Backend responded, but no JSX was returned."
          )
        );

        return;
      }

      completed = true;
      clearTimeout(timeout);
      cleanup();

      console.log("================================");
      console.log("✅ JSX RECEIVED SUCCESSFULLY");
      console.log("================================");

      console.log("JSX:", result.jsx);
      console.log(
        "Cognitive Load:",
        result.cognitiveLoad
      );
      console.log(
        "Stress:",
        result.stressLevel
      );
      console.log(
        "Focus:",
        result.focusScore
      );

      resolve({
        response:
          result.explanation ||
          "Aura successfully generated the UI.",

        code: result.jsx,

        cognitiveLoad:
          result.cognitiveLoad ?? 0,

        stressLevel:
          String(
            result.stressLevel ?? "Unknown"
          ),

        focusScore:
          result.focusScore ?? 0,
      });
    }

    function handleConnectionError(
      error: Error
    ) {
      console.error(
        "❌ SOCKET CONNECTION ERROR:",
        error.message
      );
    }

    function sendGenerationRequest() {
      const requestData = {
        prompt,

        hesitation:
          telemetry?.hesitation ?? 0,

        clicks:
          telemetry?.clicks ?? 0,
      };

      console.log("================================");
      console.log(
        "📤 SENDING GENERATE_COMPONENT"
      );
      console.log("================================");

      console.log(requestData);

      socket.emit("generate_component", {
  prompt,
  hesitation: telemetry?.hesitation ?? 0,
  clicks: telemetry?.clicks ?? 0,
});
    }

    function handleConnect() {
      console.log("================================");
      console.log("✅ SOCKET CONNECTED");
      console.log("Socket ID:", socket.id);
      console.log("================================");

      sendGenerationRequest();
    }

    // Listen BEFORE sending request
    socket.on(
      "component_response",
      handleComponentResponse
    );

    socket.on(
      "connect_error",
      handleConnectionError
    );

    if (socket.connected) {
      console.log(
        "✅ Socket already connected."
      );

      sendGenerationRequest();
    } else {
      console.log(
        "⏳ Waiting for socket connection..."
      );

      socket.once(
        "connect",
        handleConnect
      );

      socket.connect();
    }
  });
}