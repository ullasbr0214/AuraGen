"use client";

import { useEffect, useState } from "react";
import { getSocket } from "../services/socket";

export default function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("✅ Socket Connected");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
      setConnected(false);
    });

    socket.on("response", (data) => {
      setLastMessage(JSON.stringify(data));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("response");
    };
  }, []);

  return {
    connected,
    lastMessage,
  };
}