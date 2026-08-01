"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  BrainCircuit,
  Activity,
  BarChart3,
  Sparkles,
  Settings,
  UserCircle2,
  PanelLeftClose,
  PanelLeftOpen,
  FolderKanban,
  LogOut,
} from "lucide-react";


interface MenuItem {
  title: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workspace",
    icon: PanelLeftOpen,
  },
  {
    title: "Projects",
    icon: FolderKanban,
  },
  {
    title: "AI Assistant",
    icon: Sparkles,
  },
  {
    title: "Telemetry",
    icon: Activity,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
  {
    title: "Cognitive Engine",
    icon: BrainCircuit,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState("Workspace");

    const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(
      "sidebar-collapsed"
    );

    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sidebar-collapsed",
      String(collapsed)
    );
  }, [collapsed]);

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");

  router.push("/login");
};

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-72"
      } min-h-screen border-r border-cyan-500/10 bg-slate-900/70 backdrop-blur-xl transition-all duration-300`}
    >

      {/* Logo */}

      <div className="border-b border-slate-800 px-6 py-7">

        <div className="mb-6 flex justify-end">

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 text-xl font-bold text-white shadow-lg">
            A
          </div>

          {!collapsed && (

            <div>

              <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-3xl font-extrabold text-transparent">
                AuraGen
              </h1>

              <p className="text-xs text-slate-500">
                AI Workspace
              </p>

            </div>

          )}

        </div>

      </div>

      {!collapsed && (

        <>

          <div className="m-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">

            <p className="text-xs uppercase tracking-widest text-cyan-300">
              AI Brain
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              AI Online
            </h3>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">

              <div className="h-full w-[92%] rounded-full bg-cyan-400" />

            </div>

            <p className="mt-2 text-sm text-slate-300">
              Gemini Connected
            </p>

          </div>

        </>

      )}

      {/* Navigation */}

      <nav className="flex-1 px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              onClick={() =>
                setActiveMenu(item.title)
              }
              title={collapsed ? item.title : ""}
              className={`group relative mb-3 flex w-full items-center ${
                collapsed
                  ? "justify-center px-0"
                  : "gap-4 px-4"
              } rounded-xl py-3 text-left transition-all duration-300 hover:translate-x-1 ${
                activeMenu === item.title
                  ? "border border-cyan-500/30 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                  : "border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/10"
              }`}
            >

              <Icon
                size={22}
                className="text-cyan-400"
              />

              {!collapsed && (

                <span className="font-medium text-slate-200">
                  {item.title}
                </span>

              )}

            </button>

          );

        })}

      </nav>
            {/* Profile */}

      {!collapsed && (

        <div className="border-t border-slate-800 p-5">

          <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4">

            <div className="flex items-center gap-3">

              <UserCircle2
                size={46}
                className="text-violet-400"
              />

              <div>

                <p className="font-semibold text-white">
                  Ullas B R
                </p>

                <p className="text-sm text-green-400">
                  ● AI & Frontend Developer
                </p>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-xl bg-slate-900 p-3 text-center">

                <p className="text-lg font-bold text-cyan-400">
                  12
                </p>

                <p className="text-xs text-slate-500">
                  Projects
                </p>

              </div>

              <div className="rounded-xl bg-slate-900 p-3 text-center">

                <p className="text-lg font-bold text-green-400">
                  98%
                </p>

                <p className="text-xs text-slate-500">
                  Progress
                </p>

              </div>

            </div>

            <div className="mt-5 border-t border-slate-700 pt-4">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Workspace
                </span>

                <span className="text-xs text-cyan-400">
                  Online
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-700">

                <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />

              </div>

            </div>

            <button
  onClick={handleLogout}
  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-medium text-red-400 transition hover:bg-red-500/20"
>
  <LogOut size={18} />
  Logout
</button>

            <div className="mt-5 border-t border-slate-700 pt-4 text-center">

              <p className="text-xs text-slate-500">
                AuraGen v2.0
              </p>

              <p className="mt-1 text-xs text-cyan-400">
                Self-Healing AI Workspace
              </p>

            </div>

          </div>

        </div>

      )}

    </aside>
  );
}