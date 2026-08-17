"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type TelemetryState = {
  mouseX: number;
  mouseY: number;
  velocity: number;
  clicks: number;
  rapidClicks: number;
  hesitationTime: number;
  scrollCount: number;
  keyPresses: number;
};

type TelemetryContextType = {
  telemetry: TelemetryState;
  setTelemetry: React.Dispatch<React.SetStateAction<TelemetryState>>;
};

const TelemetryContext = createContext<TelemetryContextType | undefined>(
  undefined
);

export function TelemetryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    mouseX: 0,
    mouseY: 0,
    velocity: 0,
    clicks: 0,
    rapidClicks: 0,
    hesitationTime: 0,
    scrollCount: 0,
    keyPresses: 0,
  });

  return (
    <TelemetryContext.Provider value={{ telemetry, setTelemetry }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetryContext() {
  const context = useContext(TelemetryContext);

  if (!context) {
    throw new Error(
      "useTelemetryContext must be used inside TelemetryProvider"
    );
  }

  return context;
}