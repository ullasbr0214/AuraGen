"use client";

interface Props {
  message: string;
}

export default function ErrorAlert({
  message,
}: Props) {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
      {message}
    </div>
  );
}