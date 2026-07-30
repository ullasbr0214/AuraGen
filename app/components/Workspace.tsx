"use client";

import Sidebar from "./Sidebar";
import ChatPanel from "./chat/ChatPanel";
import AskAura from "./AskAura";
import CodeEditor from "./CodeEditor";
import DynamicRenderer from "./DynamicRenderer";

export default function Workspace() {
  return (
    <div className="grid h-screen grid-cols-12 gap-4 bg-[#08111F] p-4">

      {/* Sidebar */}
      <div className="col-span-2">
        <Sidebar />
      </div>

      {/* Chat */}
      <div className="col-span-3 flex flex-col gap-4">
        <ChatPanel />
        <AskAura />
      </div>

      {/* Monaco */}
      <div className="col-span-4">
        <CodeEditor />
      </div>

      {/* Live Preview */}
      <div className="col-span-3">
        <DynamicRenderer />
      </div>

    </div>
  );
}