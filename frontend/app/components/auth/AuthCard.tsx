"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <div className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">

      {/* Logo */}

      <div className="mb-8 flex justify-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-violet-500 shadow-xl">

          <span className="text-3xl font-bold text-white">
            A
          </span>

        </div>

      </div>

      {/* Heading */}

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-2 text-slate-400">
          {subtitle}
        </p>

      </div>

      {/* Form */}

      <div className="space-y-5">

        {children}

      </div>

      {/* Footer */}

      <div className="mt-8 border-t border-slate-800 pt-6 text-center">

        <p className="text-xs text-slate-500">
          AuraGen v2.0
        </p>

        <p className="mt-1 text-xs text-cyan-400">
          Self-Healing Generative UI Platform
        </p>

      </div>

    </div>
  );
}