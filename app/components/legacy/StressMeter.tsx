"use client";

type Props = {
  score: number;
};

export default function StressMeter({ score }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3">Cognitive Load Score</h3>

      <div className="w-full bg-gray-200 rounded-full h-5">
        <div
          className="bg-red-500 h-5 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-3 font-semibold">Score: {score}%</p>
    </div>
  );
}