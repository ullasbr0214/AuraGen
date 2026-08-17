"use client";

import { useState } from "react";

import {
  FileCode2,
  X,
  Circle,
} from "lucide-react";

interface EditorTab {
  id: string;
  name: string;
  language: string;
  dirty: boolean;
}

const initialTabs: EditorTab[] = [
  {
    id: "1",
    name: "page.tsx",
    language: "tsx",
    dirty: false,
  },
  {
    id: "2",
    name: "Navbar.tsx",
    language: "tsx",
    dirty: true,
  },
  {
    id: "3",
    name: "globals.css",
    language: "css",
    dirty: false,
  },
];

export default function EditorTabs() {
  const [tabs, setTabs] =
    useState(initialTabs);

  const [activeTab, setActiveTab] =
    useState("1");

  const closeTab = (id: string) => {
    setTabs((prev) =>
      prev.filter((tab) => tab.id !== id)
    );

    if (activeTab === id && tabs.length > 1) {
      const nextTab = tabs.find(
        (tab) => tab.id !== id
      );

      if (nextTab) {
        setActiveTab(nextTab.id);
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-t-2xl border-b border-slate-700 bg-slate-900">

      <div className="flex min-w-max">

        {tabs.map((tab) => {
          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`group flex min-w-[190px] items-center justify-between border-r border-slate-700 px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">

                <FileCode2
                  size={18}
                  className="text-cyan-400"
                />

                <span className="text-sm font-medium">
                  {tab.name}
                </span>

                {tab.dirty && (
                  <Circle
                    size={8}
                    fill="currentColor"
                    className="text-orange-400"
                  />
                )}

              </div>

              <X
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="opacity-0 transition group-hover:opacity-100 hover:text-red-400"
              />

            </button>
          );
        })}

      </div>

    </div>
  );
}