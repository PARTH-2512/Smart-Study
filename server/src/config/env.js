import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Resolve paths relative to the project root (3 levels up from config/env.js)
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..", "..", "..");

dotenv.config({ path: resolve(projectRoot, ".env") });
dotenv.config({ path: resolve(projectRoot, ".env.local"), override: false });

export const env = {
  port: Number(process.env.PORT || 8787),
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-3.6-flash",
  siteUrl: process.env.SITE_URL || "http://localhost:5173",
  siteName: process.env.SITE_NAME || "Smart Study Transformer",
};

console.log("[env] Gemini model:", env.geminiModel);
console.log("[env] Gemini API key loaded:", env.geminiApiKey ? "yes" : "NO — AI calls will fail!");
