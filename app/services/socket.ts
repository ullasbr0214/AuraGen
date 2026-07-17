"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL = "http://192.168.29.97:5000";
// or "http://localhost:5000" if backend is running on the same PC

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected");
      console.log(socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌", err.message);
    });

    socket.on("component", (data) => {
      console.log("📦 Component received:", data);
    });
  }

  return socket;
}