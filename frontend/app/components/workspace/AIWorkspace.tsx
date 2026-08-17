"use client";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceFooter from "./WorkspaceFooter";
import FileExplorer from "./FileExplorer";
import GeneratedFiles from "./GeneratedFiles";

import CodeEditor from "../CodeEditor";
import DynamicRenderer from "../DynamicRenderer";
import ErrorBoundary from "../ErrorBoundary";
import ChatPanel from "../chat/ChatPanel";
import ActivityBar from "./ActivityBar";
import SearchPanel from "./SearchPanel";
import GitPanel from "./GitPanel";

import EditorTabs from "./EditorTabs";
import Terminal from "./Terminal";
import ProblemsPanel from "./ProblemsPanel";
import StatusBar from "./StatusBar";

import ExtensionsPanel from "./ExtensionsPanel";

export default function AIWorkspace() {
  return (
    <section className="space-y-6">

      {/* Workspace Header */}
      <WorkspaceHeader />

      {/* Main Workspace */}
      <div className="grid gap-6 xl:grid-cols-[300px_1fr_520px]">

        {/* Left Sidebar */}
        <div className="space-y-6">

  <ActivityBar />

  <FileExplorer />

  <SearchPanel />

  <GitPanel />

</div>

        {/* Center Editor */}
        <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-2xl">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-xl font-bold text-white">
              AI Code Editor
            </h2>

            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Monaco Editor
            </span>

          </div>

          <EditorTabs />

<div className="mt-4">
  <CodeEditor />
</div>

<div className="mt-6">
  <Terminal />
</div>

<div className="mt-6">
  <ProblemsPanel />
</div>

<div className="mt-6">
  <StatusBar />
</div>

        </div>

        {/* Right Panel */}
        <div className="space-y-6">

          <div className="rounded-3xl border border-violet-500/10 bg-slate-900/70 p-5 shadow-2xl">

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

          </div>

          <GeneratedFiles />

<ExtensionsPanel />

        </div>

      </div>

      {/* Footer */}
      <WorkspaceFooter />

    </section>
  );
}