"use client";

export default function Navbar() {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between bg-slate-900 rounded-xl p-5 shadow-lg">

      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold text-purple-400">
          AuraGen
        </h1>

        <p className="text-gray-400 mt-1">
          Self-Healing Generative UI via Cognitive Load
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-slate-800 px-4 py-2 rounded-lg
                     text-white placeholder-gray-500
                     outline-none focus:ring-2
                     focus:ring-purple-500"
        />

        {/* Time */}
        <div className="text-right">
          <p className="text-gray-400 text-sm">
            Current Time
          </p>

          <p className="font-semibold text-white">
            {currentTime}
          </p>
        </div>

        {/* Notification */}
        <button className="text-2xl hover:scale-110 transition">
          🔔
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-purple-600"></div>

          <div>
            <p className="font-semibold text-white">
              Developer
            </p>

            <p className="text-green-400 text-sm">
              ● Online
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}