"use client";

import Sidebar from "./Sidebar";
import HistoryPanel from "./chat/HistoryPanel";
import AskAura from "./AskAura";
import CodeEditor from "./CodeEditor";
import DynamicRenderer from "./DynamicRenderer";
import ErrorBoundary from "./ErrorBoundary";

export default function Workspace() {
  return (
    <div className="grid min-h-screen grid-cols-12 gap-4 bg-[#08111F] p-4">

      {/* Sidebar */}
      <div className="col-span-2">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="col-span-10 grid grid-cols-2 gap-4">

        {/* Left */}
        <div className="flex h-[500px] flex-col gap-4 overflow-y-auto rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-4">

          <HistoryPanel />

          <AskAura />

        </div>

        {/* Live Preview */}
        <div className="h-[500px] overflow-hidden rounded-2xl border border-violet-500/10 bg-slate-900/60 p-4">

          <ErrorBoundary>
            <DynamicRenderer />
          </ErrorBoundary>

        </div>

        {/* Monaco Editor */}
        <div className="col-span-2 rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-4">

          <CodeEditor />

        </div>

      </div>

    </div>
  );
}