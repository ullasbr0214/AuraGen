"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import React from "react";
import {
  LiveProvider,
  LivePreview,
  LiveError,
} from "react-live";

interface Props {
  code: string;
}

export default function LivePreviewPanel({
  code,
}: Props) {
  const [device, setDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const [zoom, setZoom] = useState(100);
  const [refreshKey, setRefreshKey] = useState(0);

  const openFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {
        console.error("Fullscreen request failed.");
      });
    }
  };

  /*
   * Convert the AI-generated component into
   * React Live executable code.
   *
   * Expected AI output:
   *
   * export default function LoginForm() {
   *   return (...);
   * }
   *
   * React Live code:
   *
   * function LoginForm() {
   *   return (...);
   * }
   *
   * render(<LoginForm />);
   */

  const createPreviewCode = (source: string) => {
    if (!source.trim()) {
      return `
function WaitingComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "500px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#334155",
      }}
    >
      Waiting for AI Generated Component...
    </div>
  );
}

render(<WaitingComponent />);
`;
    }

    let transformed = source.trim();

    // Remove markdown code fences if Gemini returns them.
    transformed = transformed
      .replace(/^```(?:jsx|tsx|javascript|react)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // Remove "export default".
    transformed = transformed.replace(
      /^\s*export\s+default\s+/m,
      ""
    );

    /*
     * Find the component name.
     *
     * Supports:
     * function LoginForm()
     * const LoginForm = ()
     * const LoginForm = function()
     */
    let componentName: string | null = null;

    const functionMatch = transformed.match(
      /function\s+([A-Z][A-Za-z0-9_]*)\s*\(/
    );

    if (functionMatch) {
      componentName = functionMatch[1];
    }

    if (!componentName) {
      const constMatch = transformed.match(
        /const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(?:\([^)]*\)|[A-Za-z0-9_]*)\s*=>/
      );

      if (constMatch) {
        componentName = constMatch[1];
      }
    }

    /*
     * If AI returned a component declaration,
     * explicitly render it.
     */
    if (componentName) {
      return `
${transformed}

render(<${componentName} />);
`;
    }

    /*
     * Fallback for raw JSX.
     */
    return `
function GeneratedComponent() {
  return (
    ${transformed}
  );
}

render(<GeneratedComponent />);
`;
  };

  const previewCode = createPreviewCode(code);

  console.log("========== LIVE PREVIEW ==========");
  console.log("Original AI code:");
  console.log(code);
  console.log("----------------------------------");
  console.log("React Live code:");
  console.log(previewCode);
  console.log("==================================");

  return (
    <section className="rounded-2xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-2xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold text-white">
          Live Preview
        </h2>

        <div className="flex items-center gap-2">

          {/* Desktop */}
          <button
            onClick={() => setDevice("desktop")}
            className={`rounded-lg p-2 transition ${
              device === "desktop"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
            title="Desktop"
          >
            <Monitor size={18} />
          </button>

          {/* Tablet */}
          <button
            onClick={() => setDevice("tablet")}
            className={`rounded-lg p-2 transition ${
              device === "tablet"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
            title="Tablet"
          >
            <Tablet size={18} />
          </button>

          {/* Mobile */}
          <button
            onClick={() => setDevice("mobile")}
            className={`rounded-lg p-2 transition ${
              device === "mobile"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
            title="Mobile"
          >
            <Smartphone size={18} />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() =>
              setZoom((z) => Math.max(50, z - 10))
            }
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
            title="Zoom out"
          >
            <ZoomOut size={18} />
          </button>

          {/* Reset Zoom */}
          <button
            onClick={() => setZoom(100)}
            className="rounded-lg bg-slate-800 px-3 py-2 text-slate-300 transition hover:bg-slate-700"
          >
            100%
          </button>

          <span className="w-12 text-center text-sm text-slate-300">
            {zoom}%
          </span>

          {/* Zoom In */}
          <button
            onClick={() =>
              setZoom((z) => Math.min(200, z + 10))
            }
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
            title="Zoom in"
          >
            <ZoomIn size={18} />
          </button>

          {/* Refresh */}
          <button
            onClick={() => {
              setRefreshKey((k) => k + 1);
              toast.success("Preview refreshed.");
            }}
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
            title="Refresh preview"
          >
            <RefreshCw size={18} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={openFullscreen}
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
            title="Fullscreen"
          >
            <Maximize2 size={18} />
          </button>

        </div>
      </div>

      {/* Preview container */}
      <div
        className={`mx-auto overflow-auto rounded-xl border border-slate-700 bg-white transition-all duration-300 ${
          device === "desktop"
            ? "h-[600px] w-full"
            : device === "tablet"
            ? "h-[700px] w-[768px]"
            : "h-[700px] w-[390px]"
        }`}
      >

        <div
          key={refreshKey}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
            minHeight: "600px",
          }}
        >

          <LiveProvider
            code={previewCode}
            scope={{
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useMemo: React.useMemo,
  useCallback: React.useCallback,
  useRef: React.useRef,
}}
            noInline
          >

            <div className="min-h-[600px] p-6">

              <LivePreview />

            </div>

            <LiveError
              className="border-t border-red-200 bg-red-50 p-4 text-sm text-red-600"
            />

          </LiveProvider>

        </div>

      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3">

        <span className="text-sm text-cyan-300">
          Device:
          <span className="ml-2 font-semibold text-white capitalize">
            {device}
          </span>
        </span>

        <span className="text-sm text-slate-300">
          Zoom:
          <span className="ml-2 font-semibold text-white">
            {zoom}%
          </span>
        </span>

      </div>

    </section>
  );
}