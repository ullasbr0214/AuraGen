"use client";

import { useEffect, useState } from "react";

export default function useWebSocket(url: string) {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    let socket: WebSocket;

    try {
      socket = new WebSocket(url);

      socket.onopen = () => {
        console.log("✅ Connected");
        setConnected(true);
      };

      socket.onmessage = (event) => {
        setLastMessage(event.data);
      };

      socket.onclose = () => {
        console.log("❌ Disconnected");
        setConnected(false);
      };

      socket.onerror = () => {
        console.log("⚠ WebSocket Error");
      };
    } catch (err) {
      console.log(err);
    }

    return () => {
      socket?.close();
    };
  }, [url]);

  return {
    connected,
    lastMessage,
  };
}