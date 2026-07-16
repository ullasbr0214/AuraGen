"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function getSocket(): Socket {
  if (!socket) {
    console.log("🚀 Initializing Socket.IO...");

    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      forceNew: false,
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket Connected");
      console.log("Socket ID:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket Disconnected");
      console.log("Reason:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket Connection Error:", err.message);
    });

    socket.on("error", (err) => {
      console.error("❌ Socket Error:", err);
    });

    socket.io.on("reconnect", (attempt) => {
      console.log(`🔄 Reconnected after ${attempt} attempt(s)`);
    });

    socket.io.on("reconnect_error", (err) => {
      console.error("❌ Reconnect Error:", err.message);
    });
  }

  return socket;
}