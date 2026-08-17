"use client";

import { useMemo } from "react";

export type LayoutMode =
  | "normal"
  | "focus"
  | "simplified";

export default function useAdaptiveLayout(
  cognitiveLoad: number
) {
  const layout = useMemo<LayoutMode>(() => {
    if (cognitiveLoad >= 80) {
      return "simplified";
    }

    if (cognitiveLoad >= 50) {
      return "focus";
    }

    return "normal";
  }, [cognitiveLoad]);

  return layout;
}