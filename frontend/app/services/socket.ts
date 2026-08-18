"use client";

import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  "https://auragen-backend-taw0.onrender.com";
  
export const socket: Socket = io(SOCKET_URL, {
  path: "/socket.io",
  transports: ["polling", "websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  timeout: 20000,
});

socket.on("connect", () => {
  console.log("✅ AURAGEN SOCKET CONNECTED", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ SOCKET DISCONNECTED:", reason);
});

socket.on("connect_error", (error) => {
  console.error("❌ SOCKET CONNECTION ERROR:", error.message);
});

socket.on("backend_status", (data) => {
  console.log("🟢 BACKEND STATUS:", data);
});

export function getSocket(): Socket {
  return socket;
}
