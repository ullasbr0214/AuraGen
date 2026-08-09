"use client";

import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  "https://cover-patriot-overhand.ngrok-free.dev";

export const socket: Socket = io(SOCKET_URL, {
  path: "/socket.io",
  transports: ["polling"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  timeout: 20000,
});

socket.on("connect", () => {
  console.log("✅ SOCKET CONNECTED");
  console.log("Socket ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ SOCKET DISCONNECTED:", reason);
});

socket.on("connect_error", (error) => {
  console.error("❌ SOCKET CONNECTION ERROR:", error.message);
});

socket.on("component_response", (data) => {
  console.log("📦 COMPONENT_RESPONSE RECEIVED:", data);
});

export function getSocket() {
  return socket;
}