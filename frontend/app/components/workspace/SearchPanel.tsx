"use client";

import { useMemo, useState } from "react";

import {
  Search,
  FileCode2,
  Clock3,
  X,
} from "lucide-react";

interface SearchItem {
  id: string;
  file: string;
  line: number;
  text: string;
}

const searchData: SearchItem[] = [
  {
    id: "1",
    file: "Navbar.tsx",
    line: 18,
    text: "const Navbar = () => {",
  },
  {
    id: "2",
    file: "Hero.tsx",
    line: 42,
    text: "Generate AI Landing Page",
  },
  {
    id: "3",
    file: "Dashboard.tsx",
    line: 120,
    text: "<TelemetryTracker />",
  },
  {
    id: "4",
    file: "Footer.tsx",
    line: 15,
    text: "© AuraGen AI Workspace",
  },
  {
    id: "5",
    file: "CodeEditor.tsx",
    line: 77,
    text: "Monaco Editor Ready",
  },
];

export default function SearchPanel() {
  const [query, setQuery] = useState("");

  const recentSearches = [
    "dashboard",
    "navbar",
    "telemetry",
    "gemini",
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return searchData.filter(
      (item) =>
        item.file
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        item.text
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 shadow-2xl">

      {/* Header */}

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center gap-3">

          <Search
            size={22}
            className="text-cyan-400"
          />

          <div>

            <h2 className="text-xl font-bold text-white">
              Search
            </h2>

            <p className="text-sm text-slate-400">
              Search across project files
            </p>

          </div>

        </div>

      </div>

      {/* Search Box */}

      <div className="p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-slate-500"
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-11 text-white outline-none focus:border-cyan-500"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 rounded-lg p-1 hover:bg-slate-700"
            >
              <X
                size={16}
                className="text-slate-400"
              />
            </button>
          )}

        </div>

      </div>

      {/* Recent Searches */}

      {!query && (

        <div className="px-5">

          <div className="mb-3 flex items-center gap-2">

            <Clock3
              size={16}
              className="text-cyan-300"
            />

            <span className="text-sm text-slate-400">
              Recent Searches
            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {recentSearches.map((item) => (

              <button
                key={item}
                onClick={() =>
                  setQuery(item)
                }
                className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-cyan-500/20 hover:text-cyan-300"
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      )}

      {/* Results */}

      <div className="mt-5 max-h-[420px] overflow-y-auto">

        {query && results.length === 0 && (

          <div className="p-8 text-center text-slate-500">
            No matching results found.
          </div>

        )}

        {results.map((item) => (

          <button
            key={item.id}
            className="flex w-full items-start gap-3 border-b border-slate-800 p-4 text-left transition hover:bg-slate-800/60"
          >

            <FileCode2
              size={18}
              className="mt-1 text-cyan-400"
            />

            <div>

              <p className="font-semibold text-white">
                {item.file}
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {item.text}
              </p>

              <p className="mt-2 text-xs text-cyan-300">
                Line {item.line}
              </p>

            </div>

          </button>

        ))}

      </div>

    </section>
  );
}