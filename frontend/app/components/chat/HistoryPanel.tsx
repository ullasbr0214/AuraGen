"use client";

import { Search, Clock3, Trash2 } from "lucide-react";
import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useAura } from "../../context/AuraContext";
import toast from "react-hot-toast";

export default function HistoryPanel() {
  const { messages, clearMessages } = useChat();

  const [search, setSearch] = useState("");

  const history = messages.filter(
    (m) =>
      m.role === "user" &&
      m.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  const {
  setPrompt,
  setGeneratedCode,
} = useAura();

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          AI History
        </h2>

        <button
          onClick={() => {
  if (confirm("Clear all history?")) {
    clearMessages();
    toast.success("History Cleared");
  }
}}
          className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 hover:bg-red-500/20"
        >
          <Trash2
            size={18}
            className="text-red-300"
          />
        </button>

      </div>

      {/* Search */}

      <div className="mt-5 relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search prompts..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-400"
        />

      </div>

      {/* History */}

      <div className="mt-6 max-h-[420px] space-y-3 overflow-auto">

        {history.length === 0 ? (

          <div className="py-10 text-center text-slate-500">
            No previous prompts
          </div>

        ) : (

          history.map((item, index) => (

            <div
  key={item.id}
 onClick={() => {
  setPrompt(item.content);

  if (item.code) {
    setGeneratedCode(item.code);
  }

  toast.success("Prompt Loaded");
}}
              className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition hover:border-cyan-500/30 hover:bg-slate-800"
            >

              <div className="flex items-center gap-2">

                <Clock3
                  size={16}
                  className="text-cyan-400"
                />

                <div>

  <p className="font-medium text-white">
    {item.content}
  </p>

  <p className="mt-1 text-xs text-slate-500">
    {item.timestamp}
  </p>

</div>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}