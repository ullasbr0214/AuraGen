"use client";

type TelemetryCardProps = {
  mouseX: number;
  mouseY: number;
  velocity: number;
  clicks: number;
  rapidClicks: number;
  hesitationTime: number;
  scrollCount: number;
  keyPresses: number;
};

export default function TelemetryCard({
  mouseX,
  mouseY,
  velocity,
  clicks,
  rapidClicks,
  hesitationTime,
  scrollCount,
  keyPresses,
}: TelemetryCardProps) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-5">
        📊 Telemetry Tracker
      </h2>

      <div className="grid grid-cols-2 gap-y-4 text-gray-300">

        <span>Mouse X</span>
        <span className="text-right">{mouseX}</span>

        <span>Mouse Y</span>
        <span className="text-right">{mouseY}</span>

        <span>Velocity</span>
        <span className="text-right">{velocity} px/s</span>

        <span>Total Clicks</span>
        <span className="text-right">{clicks}</span>

        <span>Rapid Clicks</span>
        <span className="text-right">{rapidClicks}</span>

        <span>Hesitation Time</span>
        <span className="text-right">{hesitationTime} sec</span>

        <span>Scroll Count</span>
        <span className="text-right">{scrollCount}</span>

        <span>Key Presses</span>
        <span className="text-right">{keyPresses}</span>

      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-green-400 font-semibold">
          Monitoring
        </span>
      </div>
    </div>
  );
}
``