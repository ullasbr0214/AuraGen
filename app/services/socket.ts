"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Change this if your backend runs on another device
const SOCKET_URL = "https://cover-patriot-overhand.ngrok-free.dev";

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
      console.log("🆔 Socket ID:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection Error:", err.message);
    });

    socket.on("reconnect_attempt", (attempt) => {
      console.log(`🔄 Reconnect Attempt: ${attempt}`);
    });

    socket.on("reconnect", () => {
      console.log("✅ Reconnected");
    });

    socket.on("reconnect_failed", () => {
      console.log("❌ Reconnection Failed");
    });

    socket.on("response", (data) => {
      console.log("📨 Backend Response:", data);
    });

    socket.on("component", (data) => {
      console.log("📦 Component Received:", data);
    });

    socket.on("reply", (data) => {
      console.log("💬 Reply:", data);
    });

    socket.on("error", (err) => {
      console.error("❌ Socket Error:", err);
    });
  }

  return socket;
}