"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Dashboard from "./components/Dashboard";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("isLoggedIn");

    if (!loggedIn) {
      router.replace("/login");
    }
  }, [router]);

  return <Dashboard />;
}