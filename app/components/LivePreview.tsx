"use client";

import { useState } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

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
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <section className="rounded-2xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-2xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold text-white">
          Live Preview
        </h2>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setDevice("desktop")}
            className={`rounded-lg p-2 transition ${
              device === "desktop"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            <Monitor size={18} />
          </button>

          <button
            onClick={() => setDevice("tablet")}
            className={`rounded-lg p-2 transition ${
              device === "tablet"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            <Tablet size={18} />
          </button>

          <button
            onClick={() => setDevice("mobile")}
            className={`rounded-lg p-2 transition ${
              device === "mobile"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            <Smartphone size={18} />
          </button>

          <button
            onClick={() =>
              setZoom((z) => Math.max(50, z - 10))
            }
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
          >
            <ZoomOut size={18} />
          </button>

          <span className="w-12 text-center text-sm text-slate-300">
            {zoom}%
          </span>

          <button
            onClick={() =>
              setZoom((z) => Math.min(200, z + 10))
            }
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={() =>
              setRefreshKey((k) => k + 1)
            }
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
          >
            <RefreshCw size={18} />
          </button>

          <button
            onClick={openFullscreen}
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
          >
            <Maximize2 size={18} />
          </button>

        </div>

      </div>

      {/* Preview */}
      <div
        className={`mx-auto overflow-auto rounded-xl border border-slate-700 bg-white transition-all duration-300

        ${
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
          }}
        >
          <LiveProvider code={code} noInline>

            <div className="min-h-[600px] p-6">

              <LivePreview />

            </div>

            <LiveError className="border-t border-red-200 bg-red-50 p-4 text-sm text-red-600" />

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