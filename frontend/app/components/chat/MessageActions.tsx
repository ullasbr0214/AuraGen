"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Trash2,
} from "lucide-react";

interface Props {
  content: string;
  onRegenerate?: () => void;
  onDelete?: () => void;
}

export default function MessageActions({
  content,
  onRegenerate,
  onDelete,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">

      {/* Copy */}

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-300"
      >
        {copied ? (
          <>
            <Check
              size={16}
              className="text-green-400"
            />
            Copied
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy
          </>
        )}
      </button>

      {/* Regenerate */}

      <button
        onClick={onRegenerate}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:border-yellow-500 hover:text-yellow-300"
      >
        <RotateCcw size={16} />
        Regenerate
      </button>

      {/* Like */}

      <button
        onClick={() => setLiked(true)}
        className={`rounded-xl border px-3 py-2 transition ${
          liked === true
            ? "border-green-500 bg-green-500/20"
            : "border-slate-700 bg-slate-800 hover:border-green-500"
        }`}
      >
        <ThumbsUp
          size={16}
          className={
            liked === true
              ? "text-green-400"
              : "text-slate-300"
          }
        />
      </button>

      {/* Dislike */}

      <button
        onClick={() => setLiked(false)}
        className={`rounded-xl border px-3 py-2 transition ${
          liked === false
            ? "border-red-500 bg-red-500/20"
            : "border-slate-700 bg-slate-800 hover:border-red-500"
        }`}
      >
        <ThumbsDown
          size={16}
          className={
            liked === false
              ? "text-red-400"
              : "text-slate-300"
          }
        />
      </button>

      {/* Delete */}

      <button
        onClick={onDelete}
        className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 transition hover:bg-red-500/20"
      >
        <Trash2
          size={16}
          className="text-red-400"
        />
      </button>

    </div>
  );
}