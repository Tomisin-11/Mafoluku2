const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");

const authRoutes    = require("./routes/auth");
const contentRoutes = require("./routes/content");

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow no-origin requests (Postman, curl), localhost, and any Netlify domain
    if (
      !origin ||
      /^https?:\/\/localhost/.test(origin) ||
      /\.netlify\.app$/.test(origin) ||
      /\.netlify\.live$/.test(origin)
    ) {
      return callback(null, true);
    }
    callback(new Error("CORS: origin not allowed → " + origin));
  },
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

// ─── Routes — mounted at BOTH /api/... and /... ───────────────────────────────
// Local dev (via Vite proxy): /api/auth/login → Express sees /api/auth/login
// Netlify Function:           /api/auth/login → redirect strips to /auth/login
app.use("/api/auth",    authRoutes);
app.use("/api/content", contentRoutes);
app.use("/auth",        authRoutes);     // Netlify function path
app.use("/content",     contentRoutes);  // Netlify function path

app.get(["/api/health", "/health"], (_req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() })
);

// ─── Always-JSON 404 ─────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

// ─── Always-JSON error handler ────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: err.message || "Internal server error" });
});

// ─── MongoDB — cached connection (safe for serverless) ───────────────────────
async function connectDB() {
  if (mongoose.connection.readyState === 1) return; // already connected
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/church-cms",
    { bufferCommands: false, serverSelectionTimeoutMS: 10000 }
  );
}

module.exports = { app, connectDB };
