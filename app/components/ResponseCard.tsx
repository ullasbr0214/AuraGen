"use client";

import { useState } from "react";

export default function ResponseCard() {
  const [response] = useState(
    "👋 Welcome to AuraGen.\n\nYour AI-generated code and suggestions will appear here.\n\nStart by entering a prompt in the 'Ask Aura' section."
  );

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          🤖 AuraGen Response
        </h2>

        <span className="text-green-400 text-sm">
          ● Ready
        </span>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 min-h-[220px] whitespace-pre-wrap text-gray-300 leading-7">
        {response}
      </div>
    </div>
  );
}