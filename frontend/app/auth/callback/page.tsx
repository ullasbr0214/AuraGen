"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      router.replace("/login?error=google");
      return;
    }

    localStorage.setItem("token", token);

    router.replace("/");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

        <h1 className="text-2xl font-bold">
          Signing you in...
        </h1>

        <p className="mt-2 text-slate-400">
          Connecting to AuraGen
        </p>
      </div>
    </main>
  );
}