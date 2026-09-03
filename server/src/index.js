import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(
  cors({
    origin: env.siteUrl,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, status: "healthy" });
});
app.use("/api", aiRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({
    ok: false,
    error: { code: "UNHANDLED_ERROR", message: err?.message || "Unhandled server error" },
  });
});

app.listen(env.port, () => {
  console.log(`AI backend listening on http://localhost:${env.port}`);
});
