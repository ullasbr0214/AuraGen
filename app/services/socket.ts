"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

    socket.on("connect", () => {
      console.log("✅ Connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket Error:", err.message);
    });
  }

  return socket;
}