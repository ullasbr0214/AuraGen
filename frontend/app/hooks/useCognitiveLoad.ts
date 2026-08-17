"use client";

import { useMemo } from "react";

type TelemetryData = {
  velocity: number;
  rapidClicks: number;
  hesitationTime: number;
  scrollCount: number;
  keyPresses: number;
};

export default function useCognitiveLoad({
  velocity,
  rapidClicks,
  hesitationTime,
  scrollCount,
  keyPresses,
}: TelemetryData) {
  const cognitiveLoad = useMemo(() => {
    let score = 20;

    score += rapidClicks * 8;
    score += hesitationTime * 0.5;
    score += scrollCount * 0.2;

    if (velocity > 1200) score += 15;
    if (keyPresses > 40) score += 10;

    return Math.min(Math.round(score), 100);
  }, [
    velocity,
    rapidClicks,
    hesitationTime,
    scrollCount,
    keyPresses,
  ]);

  return cognitiveLoad;
}