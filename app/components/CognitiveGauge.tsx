"use client";

import { useEffect, useState } from "react";

export default function CognitiveGauge() {
  const [load, setLoad] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(Math.floor(Math.random() * 31) + 60); // 60 - 90
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1b1d31] rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Cognitive Load
      </h2>

      <p className="text-5xl font-bold text-purple-400">
        {load}%
      </p>

      <div className="w-full h-3 bg-gray-700 rounded-full mt-5">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
          style={{ width: `${load}%` }}
        />
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Live AI Cognitive Analysis
      </p>
    </div>
  );
}