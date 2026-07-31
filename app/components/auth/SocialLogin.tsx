"use client";
import {
  Globe,
   Code2,
} from "lucide-react";

export default function SocialLogin() {
  return (
    <div className="mt-8">

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700"></div>
        </div>

        <div className="relative flex justify-center">
          <span className="bg-slate-900 px-4 text-sm text-slate-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 py-3 text-white transition hover:border-cyan-500 hover:bg-slate-700"
        >
          <Globe
            size={20}
            className="text-red-400"
          />
          Google
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 py-3 text-white transition hover:border-cyan-500 hover:bg-slate-700"
        >
          <Code2
            size={20}
          />
          GitHub
        </button>

      </div>

    </div>
  );
}