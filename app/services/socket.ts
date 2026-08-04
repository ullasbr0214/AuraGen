import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  "https://cover-patriot-overhand.ngrok-free.dev";

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
  extraHeaders: {
    "ngrok-skip-browser-warning": "true",
  },
});

socket.on("connect", () => {
  console.log("✅ Connected to AuraGen Backend");
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection Error:", err.message);
});

// ✅ Add this function
export function getSocket() {
  return socket;
}

export { socket };