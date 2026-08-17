"use client";

import { useState } from "react";

import {
  GitBranch,
  GitCommitHorizontal,
  Upload,
  Download,
  RefreshCw,
  CheckCircle2,
  FileCode2,
} from "lucide-react";

interface ChangedFile {
  id: string;
  name: string;
  status: "Modified" | "Added" | "Deleted";
}

const initialFiles: ChangedFile[] = [
  {
    id: "1",
    name: "Navbar.tsx",
    status: "Modified",
  },
  {
    id: "2",
    name: "Dashboard.tsx",
    status: "Added",
  },
  {
    id: "3",
    name: "Footer.tsx",
    status: "Modified",
  },
];

export default function GitPanel() {
  const [files] = useState(initialFiles);
  const [message, setMessage] = useState("");

  const getColor = (status: ChangedFile["status"]) => {
    switch (status) {
      case "Added":
        return "text-green-400";
      case "Deleted":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 p-5">

        <div className="flex items-center gap-3">

          <GitBranch
            size={24}
            className="text-orange-400"
          />

          <div>

            <h2 className="text-xl font-bold text-white">
              Source Control
            </h2>

            <p className="text-sm text-slate-400">
              Branch: main
            </p>

          </div>

        </div>

        <button className="rounded-xl bg-green-500/10 px-4 py-2 text-green-300">
          Connected
        </button>

      </div>

      {/* Commit */}

      <div className="border-b border-slate-800 p-5">

        <textarea
          rows={3}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Commit message..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          <GitCommitHorizontal size={18} />
          Commit Changes
        </button>

      </div>

      {/* Changed Files */}

      <div className="max-h-80 overflow-y-auto">

        {files.map((file) => (

          <div
            key={file.id}
            className="flex items-center justify-between border-b border-slate-800 p-4 hover:bg-slate-800/60"
          >

            <div className="flex items-center gap-3">

              <FileCode2
                size={18}
                className="text-cyan-400"
              />

              <div>

                <p className="font-medium text-white">
                  {file.name}
                </p>

                <p
                  className={`text-sm ${getColor(
                    file.status
                  )}`}
                >
                  {file.status}
                </p>

              </div>

            </div>

            <CheckCircle2
              size={18}
              className="text-green-400"
            />

          </div>

        ))}

      </div>

      {/* Footer Actions */}

      <div className="flex items-center justify-between border-t border-slate-800 p-5">

        <button className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700">
          <Upload size={18} />
          Push
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700">
          <Download size={18} />
          Pull
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700">
          <RefreshCw size={18} />
          Sync
        </button>

      </div>

    </section>
  );
}