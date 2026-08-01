"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#070B14] text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1d4ed822,transparent_35%),radial-gradient(circle_at_bottom_left,#7c3aed22,transparent_35%)]" />

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative flex w-full">

        <Sidebar />

        <section className="flex-1 overflow-y-auto">
          <Dashboard />
        </section>

      </div>

    </main>
  );
}