"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`rounded-3xl border border-cyan-500/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}