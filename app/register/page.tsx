"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  isValidEmail,
  isStrongPassword,
} from "../utils/validators";

import { registerUser } from "../services/auth";
import { useEffect } from "react";
import AuthBackground from "../components/auth/AuthBackground";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [agree, setAgree] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

  if (token) {
    router.replace("/");
  }
}, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      toast.error("Please accept the Terms & Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (name.trim().length < 3) {
  toast.error("Name must be at least 3 characters.");
  return;
}

if (!isValidEmail(email)) {
  toast.error("Please enter a valid email address.");
  return;
}

if (!isStrongPassword(password)) {
  toast.error(
    "Password must be at least 8 characters and include uppercase, lowercase, and a number."
  );
  return;
}
    setLoading(true);

    try {
      const res = await registerUser(
        name,
        email,
        password
      );

      console.log(res.data);

      toast.success("Registration Successful");
      setName("");
setEmail("");
setPassword("");
setConfirmPassword("");
setAgree(false);


router.push("/login");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Registration Failed"
      );
      console.error("Registration Error:", err);
    }

    setLoading(false);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

      <AuthBackground />

      <AuthCard
        title="Create Account"
        subtitle="Join AuraGen and start building AI interfaces"
      >

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <AuthInput
          maxLength={50}
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <AuthInput
           autoComplete="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <PasswordInput
          autoComplete="new-password"
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <label className="flex items-start gap-3 text-sm text-slate-400">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) =>
                setAgree(e.target.checked)
              }
              className="mt-1"
            />

            <span>
              I agree to the Terms of Service and Privacy Policy.
            </span>

          </label>

          <button
            type="submit"
            disabled={loading || !agree}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
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
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 py-3 font-medium text-white hover:border-cyan-500"
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

          {/* Login */}

          <div className="pt-3 text-center">

            <span className="text-slate-400">
              Already have an account?{" "}
            </span>

            <Link
              href="/login"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Sign In
            </Link>

          </div>

        </form>

      </AuthCard>

    </main>
  );
}