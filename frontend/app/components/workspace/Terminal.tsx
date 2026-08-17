"use client";

import { useEffect, useRef, useState } from "react";

import {
  TerminalSquare,
  Trash2,
  Copy,
  Download,
  Play,
} from "lucide-react";

interface Log {
  id: number;
  type: "info" | "success" | "warning" | "error";
  text: string;
}

const initialLogs: Log[] = [
  {
    id: 1,
    type: "info",
    text: "AuraGen Terminal Started...",
  },
  {
    id: 2,
    type: "success",
    text: "Frontend Connected.",
  },
  {
    id: 3,
    type: "success",
    text: "Socket.IO Connected.",
  },
  {
    id: 4,
    type: "warning",
    text: "Gemini API awaiting request.",
  },
];

export default function Terminal() {
  const [logs, setLogs] = useState(initialLogs);

  const terminalRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [logs]);

  const clearTerminal = () => {
    setLogs([]);
  };

  const copyLogs = async () => {
    await navigator.clipboard.writeText(
      logs.map((l) => l.text).join("\n")
    );
  };

  const downloadLogs = () => {
    const blob = new Blob(
      [logs.map((l) => l.text).join("\n")],
      {
        type: "text/plain",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "terminal.log";

    a.click();

    URL.revokeObjectURL(url);
  };

  const simulateBuild = () => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "info",
        text: "Running build...",
      },
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "success",
          text: "Build completed successfully.",
        },
      ]);
    }, 1500);
  };

  const getColor = (type: Log["type"]) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-cyan-300";
    }
  };

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-950 shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

        <div className="flex items-center gap-3">

          <TerminalSquare
            className="text-cyan-400"
            size={22}
          />

          <h2 className="text-lg font-bold text-white">
            Terminal
          </h2>

        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={simulateBuild}
            className="rounded-lg p-2 transition hover:bg-slate-800"
          >
            <Play
              size={18}
              className="text-green-400"
            />
          </button>

          <button
            onClick={copyLogs}
            className="rounded-lg p-2 transition hover:bg-slate-800"
          >
            <Copy
              size={18}
              className="text-cyan-300"
            />
          </button>

          <button
            onClick={downloadLogs}
            className="rounded-lg p-2 transition hover:bg-slate-800"
          >
            <Download
              size={18}
              className="text-green-300"
            />
          </button>

          <button
            onClick={clearTerminal}
            className="rounded-lg p-2 transition hover:bg-slate-800"
          >
            <Trash2
              size={18}
              className="text-red-400"
            />
          </button>

        </div>

      </div>

      {/* Logs */}

      <div
        ref={terminalRef}
        className="h-72 overflow-y-auto bg-black p-5 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <p className="text-slate-500">
            Terminal cleared...
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`mb-2 ${getColor(
                log.type
              )}`}
            >
              <span className="mr-2 text-slate-600">
                $
              </span>

              {log.text}
            </div>
          ))
        )}
      </div>

    </section>
  );
}