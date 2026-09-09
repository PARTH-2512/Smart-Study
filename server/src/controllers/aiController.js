import { generateStudyMaterial } from "../services/geminiService.js";
import { RequestQueue } from "../utils/requestQueue.js";

const queue = new RequestQueue(1);
const activeClients = new Set();

const getClientId = (req) => req.ip || req.headers["x-forwarded-for"] || "unknown";

export const runAiTransformation = async (req, res) => {
  const { question, answer } = req.body ?? {};
  if (!question?.trim() || !answer?.trim()) {
    return res.status(400).json({
      ok: false,
      error: { code: "VALIDATION_ERROR", message: "question and answer are required" },
    });
  }

  const clientId = getClientId(req);
  if (activeClients.has(clientId)) {
    return res.status(429).json({
      ok: false,
      error: {
        code: "REQUEST_IN_PROGRESS",
        message: "A previous AI request is still processing. Please wait.",
      },
    });
  }

  activeClients.add(clientId);
  try {
    const transformed = await queue.enqueue(() =>
      generateStudyMaterial({ question: question.trim(), answer: answer.trim() })
    );
    return res.json({ ok: true, data: transformed });
  } catch (error) {
    // Always log the full error on the server for debugging
    console.error("[aiController] AI transformation failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
    });

    if (error.code === "AI_RATE_LIMITED") {
      return res.status(429).json({
        ok: false,
        error: {
          code: error.code,
          message: "AI provider is rate-limited. Please retry in 1-2 minutes.",
          details: error.details,
        },
      });
    }

    if (error.code === "AI_KEY_MISSING" || error.code === "AI_UNAUTHORIZED") {
      return res.status(500).json({
        ok: false,
        error: { code: error.code, message: "AI server configuration error. Check server logs." },
      });
    }

    if (error.code === "AI_PARSE_ERROR" || error.code === "AI_EMPTY_RESPONSE") {
      return res.status(502).json({
        ok: false,
        error: { code: error.code, message: "AI returned an invalid response. Please try again." },
      });
    }

    if (error.code === "AI_NETWORK_ERROR") {
      return res.status(502).json({
        ok: false,
        error: { code: error.code, message: "Could not reach the AI provider. Please try again." },
      });
    }

    return res.status(500).json({
      ok: false,
      error: {
        code: error.code || "AI_INTERNAL_ERROR",
        message: error.message || "Unexpected AI failure",
      },
    });
  } finally {
    activeClients.delete(clientId);
  }
};
