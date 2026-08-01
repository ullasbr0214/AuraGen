"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import AuthBackground from "../components/auth/AuthBackground";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSent(true);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

      <AuthBackground />

      <AuthCard
        title="Forgot Password"
        subtitle="We'll send a password reset link to your email."
      >

        {!sent ? (

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <AuthInput
              label="Email Address"
              type="email"
              placeholder="Enter your registered email"
              required
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Send Reset Link
            </button>
                      </form>

        ) : (

          <div className="space-y-6 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">

              <span className="text-4xl">✓</span>

            </div>

            <div>

              <h3 className="text-2xl font-bold text-white">
                Check Your Email
              </h3>

              <p className="mt-3 text-slate-400">
                We've sent a password reset link to your registered email address.
                Please check your inbox (and spam folder if needed).
              </p>

            </div>

          </div>

        )}

        <div className="mt-8 border-t border-slate-800 pt-6 text-center">

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

        </div>

      </AuthCard>

    </main>
  );
}