"use client";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceFooter from "./WorkspaceFooter";

import ActivityBar from "./ActivityBar";
import FileExplorer from "./FileExplorer";
import SearchPanel from "./SearchPanel";
import GitPanel from "./GitPanel";

import EditorTabs from "./EditorTabs";
import Terminal from "./Terminal";
import ProblemsPanel from "./ProblemsPanel";
import StatusBar from "./StatusBar";

import GeneratedFiles from "./GeneratedFiles";
import ExtensionsPanel from "./ExtensionsPanel";

import ChatPanel from "../chat/ChatPanel";
import CodeEditor from "../CodeEditor";
import DynamicRenderer from "../DynamicRenderer";
import ErrorBoundary from "../ErrorBoundary";

export default function AIWorkspace() {
  return (
    <div className="space-y-6">

      {/* Workspace Header */}

      <WorkspaceHeader />

      {/* Main Workspace */}

      <div className="grid gap-6 xl:grid-cols-[320px_1fr_450px]">

        {/* ================= LEFT ================= */}

        <aside className="space-y-6">

          <ActivityBar />

          <FileExplorer />

          <SearchPanel />

          <GitPanel />

        </aside>

        {/* ================= CENTER ================= */}

        <main className="space-y-6">

          <section className="rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">

            <EditorTabs />

            <div className="rounded-b-3xl p-4">

              <CodeEditor />

            </div>
            </section>
                      {/* Terminal */}

          <section>

            <Terminal />

          </section>

          {/* Problems */}

          <section>

            <ProblemsPanel />

          </section>

          {/* Status Bar */}

          <section>

            <StatusBar />

          </section>

        </main>

        {/* ================= RIGHT ================= */}

        <aside className="space-y-6">

          {/* Live Preview */}

          <section className="rounded-3xl border border-violet-500/10 bg-slate-900/70 p-5 shadow-2xl">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-bold text-white">
                Live Preview
              </h2>

              <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
                Running
              </span>

            </div>

            <ErrorBoundary>

              <DynamicRenderer />

            </ErrorBoundary>

          </section>

          {/* AI Chat */}

          <ChatPanel />
                    {/* Generated Files */}

          <GeneratedFiles />

          {/* Extensions */}

          <ExtensionsPanel />

        </aside>

      </div>

      {/* Workspace Footer */}

      <WorkspaceFooter />

    </div>
  );
}
