"use client";

export default function WelcomeCard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-purple-700 via-slate-900 to-slate-900 rounded-2xl p-8 shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            {greeting}, Developer! 👋
          </h2>

          <p className="text-gray-300 mt-2">
            Welcome back to AuraGen AI Dashboard.
          </p>

          <p className="text-gray-400 mt-1">
            {today}
          </p>

        </div>

        <div className="text-right">

          <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse ml-auto"></div>

          <p className="text-green-400 mt-2 font-semibold">
            AI Systems Online
          </p>

          <p className="text-gray-400 text-sm">
            Everything is running smoothly
          </p>

        </div>

      </div>

    </div>
  );
}