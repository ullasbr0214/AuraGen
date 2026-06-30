"use client";

export default function Sidebar() {
  const menuItems = [
    "🏠 Dashboard",
    "🤖 Ask Aura",
    "📊 Telemetry",
    "📈 Analytics",
    "🧠 Cognitive Load",
    "⚙ Settings",
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-purple-500">
          AuraGen
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          AI Developer Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">

        {menuItems.map((item) => (
          <button
            key={item}
            className="w-full text-left px-4 py-3 mb-3 rounded-xl
                       text-gray-300
                       hover:bg-purple-600
                       hover:text-white
                       transition duration-300"
          >
            {item}
          </button>
        ))}

      </nav>

      {/* Bottom */}
      <div className="p-6 border-t border-slate-800">

        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-white font-semibold">
            Developer
          </p>

          <p className="text-green-400 text-sm mt-1">
            ● Online
          </p>

        </div>

      </div>

    </aside>
  );
}