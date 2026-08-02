"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import AuthBackground from "../components/auth/AuthBackground";
import AuthCard from "../components/auth/AuthCard";
import PasswordInput from "../components/auth/PasswordInput";
import { isStrongPassword } from "../utils/validators";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStrongPassword(password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase and a number."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Backend Integration
// await resetPassword(token, password);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      toast.success("Password reset successfully.");
      setTimeout(() => {
  window.location.href = "/login";
}, 3000);

      setPassword("");
      setConfirmPassword("");
    }, 1200);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      <AuthBackground />

      <AuthCard
        title="Reset Password"
        subtitle="Create a new secure password for your account."
      >
        {!success ? (
          <form
            onSubmit={handleReset}
            className="space-y-5"
          >
            <p className="text-xs text-slate-400">
  Password must contain at least:
  8 characters, one uppercase letter,
  one lowercase letter and one number.
</p>
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <span className="text-4xl">✓</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                Password Updated Successfully
              </h3>

              <p className="mt-3 text-slate-400">
                Your password has been changed successfully.
                You can now sign in using your new password.
              </p>
            </div>

            <Link
              href="/login"
              className="inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Go to Login
            </Link>
          </div>
        )}

        {!success && (
          <div className="mt-8 border-t border-slate-800 pt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        )}
      </AuthCard>
    </main>
  );
}