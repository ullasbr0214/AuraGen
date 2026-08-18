require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const passport = require("./config/passport");

const { generateComponent } = require("./generate-component");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const server = http.createServer(app);

const PORT = Number(process.env.PORT || 5000);
const CLIENT_URL =
  process.env.FRONTEND_URL ||
  process.env.CLIENT_URL ||
  "https://auragen-1.onrender.com";

  const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/auragen";

const allowedOrigins = [
  "https://auragen-1.onrender.com",
  CLIENT_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  return allowedOrigins.includes(origin);
}

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: "2mb" }));

// Passport OAuth initialization
app.use(passport.initialize());

const io = new Server(server, {
  path: "/socket.io",
  transports: ["polling", "websocket"],
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// REST API
app.get("/", (_req, res) => {
  res.json({ name: "AuraGen Backend", status: "running", port: PORT });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    service: "AuraGen Backend",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

io.on("connection", (socket) => {
  console.log(`🔌 [Socket] Client connected: ${socket.id}`);

  socket.emit("backend_status", {
    connected: true,
    service: "AuraGen Backend",
  });

  socket.on("generate_component", async (data = {}) => {
    console.log("📥 [Socket] generate_component:", data);

    try {
      const prompt = typeof data === "string" ? data : String(data.prompt || "").trim();
      if (!prompt) {
        socket.emit("component_response", {
          success: false,
          error: "Prompt is required.",
          jsx: "",
        });
        return;
      }

      const result = await generateComponent(prompt, {
        hesitation: Number(data.hesitation) || 0,
        clicks: Number(data.clicks) || 0,
      });

      const response = {
        success: Boolean(result?.success),
        jsx: result?.jsx || result?.code || "",
        explanation: result?.explanation || "Component generated successfully.",
        cognitiveLoad: Number(result?.cognitiveLoad) || 0,
        stressLevel: result?.stressLevel ?? "Unknown",
        focusScore: Number(result?.focusScore) || 0,
        error: result?.error,
      };

      console.log("📤 [Socket] component_response:", {
        success: response.success,
        jsxLength: response.jsx.length,
        cognitiveLoad: response.cognitiveLoad,
        stressLevel: response.stressLevel,
        focusScore: response.focusScore,
      });

      socket.emit("component_response", response);
      // Keep compatibility with older frontend listeners.
      socket.emit("component", response);
    } catch (error) {
      console.error("❌ [Socket] generation error:", error);
      socket.emit("component_response", {
        success: false,
        jsx: "",
        explanation: "Failed to generate component.",
        cognitiveLoad: 0,
        stressLevel: "Unknown",
        focusScore: 0,
        error: error.message || "Unknown generation error",
      });
    }
  });

  socket.on("telemetry", (data) => {
    console.log("📊 [Socket] telemetry:", data);
    socket.emit("telemetry_ack", { received: true, ...data });
  });

  socket.on("disconnect", (reason) => {
    console.log(`❌ [Socket] Client disconnected: ${socket.id} (${reason})`);
  });
});

let databaseConnected = false;

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    databaseConnected = true;
    console.log("[MongoDB] Database connected successfully");
  } catch (error) {
    console.warn("[MongoDB] Connection unavailable:", error.message);
    console.warn("[MongoDB] Auth/project persistence will be unavailable until MongoDB is running.");
  }

  app.locals.databaseConnected = databaseConnected;

  server.listen(PORT, "0.0.0.0", () => {
  console.log(`[Server] Running on port ${PORT}`);
  console.log(`[Socket] Socket.IO initialized at /socket.io`);
  console.log(`[CORS] Allowed frontend: ${CLIENT_URL}`);
  console.log(`[API] Health: /api/health`);
});
}

process.on("SIGINT", async () => {
  await mongoose.connection.close().catch(() => {});
  server.close(() => process.exit(0));
});

start();
