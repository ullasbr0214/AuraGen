"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

if (!SOCKET_URL) {
  throw new Error(
    "NEXT_PUBLIC_SOCKET_URL is not defined. Please check your .env.local file."
  );
}

export function getSocket(): Socket {
  if (!socket) {
    console.log("🔌 Connecting to AuraGen Backend:", SOCKET_URL);

    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    socket.on("connect", () => {
  console.log("✅ Connected to AuraGen Backend");
  console.log("🆔 Socket ID:", socket!.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection Error:", err.message);
});

    socket.on("component", (data) => {
      console.log("📦 Component Received:", data);
    });

    socket.on("error", (err) => {
      console.error("❌ Socket Error:", err);
    });
  }

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}