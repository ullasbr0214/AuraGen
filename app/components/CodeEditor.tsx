"use client";

import { useAura } from "../context/AuraContext";

export default function CodeEditor() {
  const { generatedCode } = useAura();

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex justify-between items-center px-5 py-3 border-b border-gray-700">
        <h2 className="text-xl font-bold">
          💻 Live Code Editor
        </h2>

        <span className="text-green-400 text-sm">
          ● Ready
        </span>
      </div>

      <pre className="p-6 overflow-x-auto text-green-400 text-sm whitespace-pre-wrap">
        <code>
          {generatedCode ||
            "// Start coding here...\n\nconsole.log('Hello AuraGen');"}
        </code>
      </pre>
    </div>
  );
}