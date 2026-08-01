"use client";

import { useState } from "react";

import {
  AlertCircle,
  AlertTriangle,
  Info,
  FileCode2,
  Filter,
  RefreshCw,
} from "lucide-react";

interface Problem {
  id: number;
  type: "error" | "warning" | "info";
  title: string;
  file: string;
  line: number;
  column: number;
}

const initialProblems: Problem[] = [
  {
    id: 1,
    type: "error",
    title: "Unexpected token ';'",
    file: "Navbar.tsx",
    line: 42,
    column: 15,
  },
  {
    id: 2,
    type: "warning",
    title: "Unused variable 'data'",
    file: "Hero.tsx",
    line: 18,
    column: 9,
  },
  {
    id: 3,
    type: "info",
    title: "Component can be memoized",
    file: "Dashboard.tsx",
    line: 88,
    column: 5,
  },
];

export default function ProblemsPanel() {
  const [problems] = useState(initialProblems);

  const errorCount = problems.filter(
    (p) => p.type === "error"
  ).length;

  const warningCount = problems.filter(
    (p) => p.type === "warning"
  ).length;

  const infoCount = problems.filter(
    (p) => p.type === "info"
  ).length;

  const icon = (type: Problem["type"]) => {
    switch (type) {
      case "error":
        return (
          <AlertCircle
            size={18}
            className="text-red-400"
          />
        );

      case "warning":
        return (
          <AlertTriangle
            size={18}
            className="text-yellow-400"
          />
        );

      default:
        return (
          <Info
            size={18}
            className="text-cyan-400"
          />
        );
    }
  };

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 p-5">

        <div>

          <h2 className="text-xl font-bold text-white">
            Problems
          </h2>

          <p className="text-sm text-slate-400">
            Diagnostics & Issues
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button className="rounded-xl p-2 transition hover:bg-slate-800">
            <Filter
              size={18}
              className="text-cyan-300"
            />
          </button>

          <button className="rounded-xl p-2 transition hover:bg-slate-800">
            <RefreshCw
              size={18}
              className="text-green-400"
            />
          </button>

        </div>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 border-b border-slate-800">

        <Summary
          title="Errors"
          value={errorCount}
          color="text-red-400"
        />

        <Summary
          title="Warnings"
          value={warningCount}
          color="text-yellow-400"
        />

        <Summary
          title="Info"
          value={infoCount}
          color="text-cyan-400"
        />

      </div>

      {/* List */}

      <div className="max-h-72 overflow-y-auto">

        {problems.length === 0 ? (

          <div className="p-10 text-center text-slate-500">
            No problems found.
          </div>

        ) : (

          problems.map((problem) => (

            <button
              key={problem.id}
              className="flex w-full items-center justify-between border-b border-slate-800 p-4 text-left transition hover:bg-slate-800/60"
            >

              <div className="flex items-start gap-3">

                {icon(problem.type)}

                <div>

                  <p className="font-medium text-white">
                    {problem.title}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">

                    <FileCode2 size={15} />

                    {problem.file}

                    <span>
                      Ln {problem.line},
                      Col {problem.column}
                    </span>

                  </div>

                </div>

              </div>

            </button>

          ))

        )}

      </div>

    </section>
  );
}

function Summary({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="border-r border-slate-800 p-4 text-center last:border-r-0">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className={`mt-2 text-2xl font-bold ${color}`}>
        {value}
      </p>

    </div>
  );
}