import express from "express";
import cors from "cors";
import path from "path";
import letterRoutes from "./routes/letterRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Static uploads directory serving
const uploadsDir = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsDir));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Dearly Backend API", timestamp: new Date().toISOString() });
});

// Mount Routes
app.use("/api/letters", letterRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`[Dearly Backend] REST API server listening on http://localhost:${PORT}`);
});
