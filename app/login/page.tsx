"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

import { loginUser } from "../services/auth";
import { isValidEmail } from "../utils/validators";

import AuthBackground from "../components/auth/AuthBackground";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
const { login } = useAuth();
  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();

useEffect(() => {
  if (isAuthenticated) {
    router.replace("/");
  }
}, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(email, password);

login(
  res.data.token,
  res.data.user
);

toast.success("Login Successful");

router.push("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Invalid email or password."
      );

      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      <AuthBackground />

      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to continue using AuraGen"
      >
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
                className="rounded border-slate-700"
              />

              Remember Me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-slate-900 px-4 text-sm text-slate-400">
                OR
              </span>
            </div>
          </div>

          {/* Google */}

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 py-3 font-medium text-white transition hover:border-cyan-500 hover:bg-slate-800"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* GitHub */}

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 py-3 font-medium text-white transition hover:border-violet-500 hover:bg-slate-800"
          >
            <FaGithub size={20} />
            Continue with GitHub
          </button>

          {/* Register */}

          <div className="pt-3 text-center">
            <span className="text-slate-400">
              Don't have an account?{" "}
            </span>

            <Link
              href="/register"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Create Account
            </Link>
          </div>
        </form>
      </AuthCard>
    </main>
  );
}