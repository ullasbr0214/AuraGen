"use client";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#070B14] text-white">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1d4ed822,transparent_35%),radial-gradient(circle_at_bottom_left,#7c3aed22,transparent_35%)]" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Main Layout */}
      <div className="relative flex w-full">

        <Sidebar />

        <section className="flex-1 overflow-y-auto">
          <Dashboard />
        </section>

      </div>

    </main>
  );
}