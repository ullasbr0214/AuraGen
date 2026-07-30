"use client";

import { Loader2 } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 text-slate-400">
      <Loader2 className="animate-spin" size={18} />
      Aura AI is thinking...
    </div>
  );
}