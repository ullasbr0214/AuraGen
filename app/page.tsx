"use client";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="flex bg-slate-950">

      <Sidebar />

      <div className="flex-1">
        <Dashboard />
      </div>

    </div>
  );
}