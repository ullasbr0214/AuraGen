"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BrainCircuit,
  Clock3,
  Search,
  Wifi,
  UserCircle2,
} from "lucide-react";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 rounded-2xl border border-cyan-500/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl">

      <div className="flex items-center justify-between px-6 py-5">

        {/* Left */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            AuraGen
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Self-Healing Generative UI via Cognitive Load
          </p>
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center w-[420px]">

          <div className="flex items-center w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3">

            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Ask Aura anything..."
              className="ml-3 flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
            />

            <span className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-300">
              Ctrl + K
            </span>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* AI Status */}
          <div className="hidden xl:flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2">

            <BrainCircuit size={18} className="text-cyan-400" />

            <div>
              <p className="text-xs text-slate-400">AI Brain</p>
              <p className="text-sm font-semibold text-cyan-300">
                Connected
              </p>
            </div>

          </div>

          {/* WebSocket */}
          <div className="hidden xl:flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2">

            <Wifi size={18} className="text-green-400" />

            <div>
              <p className="text-xs text-slate-400">WebSocket</p>
              <p className="text-sm font-semibold text-green-300">
                Live
              </p>
            </div>

          </div>

          {/* Clock */}
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2">

            <Clock3 size={18} className="text-cyan-400" />

            <div>
              <p className="text-xs text-slate-400">
                Current Time
              </p>

              <p className="font-semibold text-white">
                {currentTime}
              </p>
            </div>

          </div>

          {/* Notification */}
          <button className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10">
            <Bell className="text-cyan-300" size={20} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2">

            <UserCircle2 size={42} className="text-violet-400" />

            <div>

              <p className="font-semibold text-white">
                Ullas B R
              </p>

              <p className="text-sm text-green-400">
                ● Frontend Developer
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}