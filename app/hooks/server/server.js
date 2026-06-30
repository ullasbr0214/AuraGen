const WebSocket = require("ws");

const wss = new WebSocket.Server({
  port: 8080,
});

console.log("🚀 AuraGen WebSocket Server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("✅ Client Connected");

  const interval = setInterval(() => {
    const data = {
      mouseX: Math.floor(Math.random() * 1000),
      mouseY: Math.floor(Math.random() * 700),
      cognitiveLoad: Math.floor(Math.random() * 31) + 60,
      timestamp: new Date().toLocaleTimeString(),
    };

    ws.send(JSON.stringify(data));
  }, 1000);

  ws.on("close", () => {
    console.log("❌ Client Disconnected");
    clearInterval(interval);
  });
});