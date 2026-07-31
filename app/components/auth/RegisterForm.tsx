"use client";

import Link from "next/link";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-4xl font-extrabold text-transparent">
          AuraGen
        </h1>

        <p className="mt-3 text-slate-400">
          Create your AI Workspace account
        </p>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-5">

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Full Name
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
            <User className="text-cyan-400" size={18} />

            <input
              type="text"
              placeholder="Ullas B R"
              className="w-full bg-transparent px-3 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
            <Mail className="text-cyan-400" size={18} />

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent px-3 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
            <Lock className="text-cyan-400" size={18} />

            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent px-3 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Confirm Password
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
            <Lock className="text-cyan-400" size={18} />

            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent px-3 py-3 text-white outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          <UserPlus size={18} />
          Create Account
        </button>

      </form>

      <SocialLogin />

      <p className="mt-8 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-cyan-400 hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  );
}