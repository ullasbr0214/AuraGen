"use client";

import { useState } from "react";
import LivePreviewPanel from "./LivePreview";

import {
  LayoutPanelTop,
  CheckCircle2,
  Sparkles,
  Copy,
  Trash2,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
} from "lucide-react";

import { useAura } from "../context/AuraContext";
import Card from "./ui/Card";
import toast from "react-hot-toast";

type ViewMode = "preview" | "code";

export default function DynamicRenderer() {
  const {
    generatedCode,
    setGeneratedCode,
    generatedComponents,
    setGeneratedComponents,
  } = useAura();

  const [viewMode, setViewMode] =
    useState<ViewMode>("preview");

  const [device, setDevice] =
    useState<"desktop" | "tablet" | "mobile">("desktop");

  const clearAll = () => {
    const ok = confirm(
      "Clear all generated components?"
    );

    if (!ok) return;

    setGeneratedCode("");
    setGeneratedComponents([]);

    toast.success("Generated components cleared.");
  };

  const copyCode = async (code: string) => {
    if (!code) {
      toast.error("No JSX code available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(code);

      toast.success("JSX copied successfully.");
    } catch {
      toast.error("Failed to copy JSX.");
    }
  };

  return (
    <Card className="h-full min-w-0 overflow-hidden">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-800 px-5 py-5">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* TITLE */}

          <div className="flex min-w-0 items-center gap-3">

            <div className="shrink-0 rounded-xl bg-cyan-500/10 p-3">
              <LayoutPanelTop
                className="text-cyan-400"
                size={25}
              />
            </div>

            <div className="min-w-0">

              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Dynamic Renderer
              </h2>

              <p className="text-sm text-slate-400">
                Live AI Component Preview
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap items-center gap-2">

            {/* LIVE STATUS */}

            <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

              <span className="text-xs font-semibold text-green-300 sm:text-sm">
                Live
              </span>

            </div>

            {/* CLEAR */}

            {generatedCode && (
              <button
                onClick={clearAll}
                className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">
                  Clear
                </span>
              </button>
            )}

          </div>

        </div>

        {/* STATUS */}

        <div className="mt-5">

          <p className="text-sm text-cyan-300">
            Generated Components:
            <span className="ml-2 font-bold text-white">
              {generatedComponents.length}
            </span>
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Live AI preview updates automatically after
            generation.
          </p>

        </div>

      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {generatedCode.length === 0 ? (

        <div className="p-5">

          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-500/30 bg-slate-800/40 p-8 text-center">

            <Sparkles
              size={48}
              className="text-cyan-400"
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              No Components Generated
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Start by entering a prompt in Aura AI Copilot
              and click
              <span className="font-semibold text-cyan-300">
                {" "}Generate UI
              </span>
              .
            </p>

          </div>

        </div>

      ) : (

        /* ===================================================
           GENERATED CONTENT
        =================================================== */

        <div className="min-w-0 p-4 sm:p-5">

          {/* GENERATED COMPONENT HEADER */}

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-2">

              <CheckCircle2
                size={21}
                className="shrink-0 text-green-400"
              />

              <h3 className="truncate text-base font-bold text-white sm:text-lg">
                Generated React Component
              </h3>

            </div>

            <button
              onClick={() => copyCode(generatedCode)}
              className="flex w-fit items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
            >
              <Copy size={16} />
              Copy JSX
            </button>

          </div>

          {/* =================================================
              VIEW SWITCHER
          ================================================= */}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-950/70 p-2">

            {/* VIEW */}

            <div className="flex items-center gap-1">

              <button
                onClick={() => setViewMode("preview")}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  viewMode === "preview"
                    ? "bg-cyan-500/15 text-cyan-300"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Monitor size={16} />
                Preview
              </button>

              <button
                onClick={() => setViewMode("code")}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  viewMode === "code"
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Code2 size={16} />
                JSX
              </button>

            </div>

            {/* DEVICE SWITCHER */}

            {viewMode === "preview" && (

              <div className="flex items-center gap-1">

                <button
                  onClick={() => setDevice("desktop")}
                  title="Desktop"
                  className={`rounded-lg p-2 transition ${
                    device === "desktop"
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "text-slate-500 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Monitor size={17} />
                </button>

                <button
                  onClick={() => setDevice("tablet")}
                  title="Tablet"
                  className={`rounded-lg p-2 transition ${
                    device === "tablet"
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "text-slate-500 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Tablet size={17} />
                </button>

                <button
                  onClick={() => setDevice("mobile")}
                  title="Mobile"
                  className={`rounded-lg p-2 transition ${
                    device === "mobile"
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "text-slate-500 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Smartphone size={17} />
                </button>

                <button
                  title="Fullscreen"
                  onClick={() => {
                    const element =
                      document.getElementById(
                        "auragen-live-preview"
                      );

                    if (
                      element &&
                      document.fullscreenEnabled
                    ) {
                      element.requestFullscreen();
                    }
                  }}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
                >
                  <Maximize2 size={17} />
                </button>

              </div>

            )}

          </div>

          {/* =================================================
              PREVIEW
          ================================================= */}

          {viewMode === "preview" && (

            <div
              id="auragen-live-preview"
              className="min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/80"
            >

              {/* PREVIEW TOOLBAR */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-green-400" />

                  <span className="text-sm font-semibold text-slate-300">
                    Live Preview
                  </span>

                </div>

                <span className="text-xs text-slate-500">
                  {device === "desktop"
                    ? "Desktop"
                    : device === "tablet"
                    ? "Tablet"
                    : "Mobile"}
                </span>

              </div>

              {/* PREVIEW AREA */}

              <div className="flex min-h-[600px] w-full justify-center overflow-auto bg-slate-950 p-3 sm:p-5">

                <div
                  className={`min-h-[580px] overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ${
                    device === "desktop"
                      ? "w-full"
                      : device === "tablet"
                      ? "w-[768px] max-w-full"
                      : "w-[390px] max-w-full"
                  }`}
                >

                  <LivePreviewPanel
                    code={generatedCode}
                  />

                </div>

              </div>

            </div>

          )}

          {/* =================================================
              JSX VIEW
          ================================================= */}

          {viewMode === "code" && (

            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#08111F]">

              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">

                <div className="flex items-center gap-2">

                  <Code2
                    size={17}
                    className="text-violet-400"
                  />

                  <span className="text-sm font-semibold text-slate-300">
                    Generated JSX
                  </span>

                </div>

                <button
                  onClick={() => copyCode(generatedCode)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
                  title="Copy JSX"
                >
                  <Copy size={16} />
                </button>

              </div>

              <pre className="h-[620px] overflow-auto p-5 text-sm leading-6 text-green-300">

                <code>{generatedCode}</code>

              </pre>

            </div>

          )}

        </div>

      )}

    </Card>
  );
}