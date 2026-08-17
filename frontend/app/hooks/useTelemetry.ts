"use client";

import { useMemo } from "react";
import { useTelemetryContext } from "../context/TelemetryContext";

export default function useTelemetry() {
  const { telemetry } = useTelemetryContext();

  const cognitiveLoad = useMemo(() => {
    let score = 0;

    score += Math.min(telemetry.velocity / 80, 15);
    score += Math.min(telemetry.clicks / 10, 10);
    score += Math.min(telemetry.rapidClicks * 5, 20);
    score += Math.min(telemetry.hesitationTime / 3, 20);
    score += Math.min(telemetry.scrollCount / 10, 20);
    score += Math.min(telemetry.keyPresses / 20, 20);

    return Math.min(Math.round(score), 100);
  }, [telemetry]);

  const stressLevel = useMemo(() => {
    if (cognitiveLoad >= 80) return "High";
    if (cognitiveLoad >= 50) return "Moderate";
    return "Low";
  }, [cognitiveLoad]);

  const focusLevel = useMemo(() => {
    return Math.max(100 - cognitiveLoad, 0);
  }, [cognitiveLoad]);

  const productivity = useMemo(() => {
    return Math.max(100 - cognitiveLoad / 2, 0);
  }, [cognitiveLoad]);

  const recommendation = useMemo(() => {
    if (cognitiveLoad >= 80)
      return "Reduce distractions and simplify the interface.";

    if (cognitiveLoad >= 50)
      return "User is under moderate load. Highlight important actions.";

    return "User interaction is stable.";
  }, [cognitiveLoad]);

  return {
    telemetry,
    cognitiveLoad,
    stressLevel,
    focusLevel,
    productivity,
    recommendation,
  };
}