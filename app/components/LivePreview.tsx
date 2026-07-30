"use client";

import { LiveProvider, LivePreview, LiveError } from "react-live";

interface Props {
  code: string;
}

export default function LivePreviewPanel({ code }: Props) {
  return (
    <LiveProvider code={code} noInline>
      <div className="rounded-xl border border-slate-700 bg-white p-6 min-h-[300px]">
        <LivePreview />
      </div>

      <LiveError className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400" />
    </LiveProvider>
  );
}