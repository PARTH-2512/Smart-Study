import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const promptTemplate = (question, answer) => `
You are a study assistant. Given a question and a long answer, extract and structure learning material.

Question: ${question}
Answer: ${answer}

Respond ONLY with a JSON object (no markdown, no explanation) with these keys:
- easy_points: array of 5-8 simple bullet point strings summarising the answer
- important_points: array of 3-5 high-priority exam-relevant strings
- flashcards: array of 4-6 objects each with "q" (short question) and "a" (short answer)
- flowchart_mermaid: a valid Mermaid.js flowchart string (graph TD) showing the logical steps or concepts

Return only valid JSON.
`;

const parseModelResponse = (rawText) => {
  const normalized = (rawText || "")
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  if (!normalized) {
    const empty = new Error("AI returned an empty response");
    empty.code = "AI_EMPTY_RESPONSE";
    throw empty;
  }

  try {
    return JSON.parse(normalized);
  } catch {
    const parseError = new Error("AI response parsing failed");
    parseError.code = "AI_PARSE_ERROR";
    throw parseError;
  }
};

const getErrorCode = (error) => {
  const status = error?.status || error?.statusCode;
  if (status === 401 || status === 403) return "AI_UNAUTHORIZED";
  if (status === 429) return "AI_RATE_LIMITED";
  if (status === 408 || status >= 500) return "AI_UPSTREAM_ERROR";
  if (error?.name === "AbortError" || /timeout|network|fetch/i.test(error?.message || "")) {
    return "AI_NETWORK_ERROR";
  }
  return "AI_UPSTREAM_ERROR";
};

export const generateStudyMaterial = async ({ question, answer }) => {
  if (!env.geminiApiKey) {
    const missing = new Error("Missing GEMINI_API_KEY — set it in the backend environment");
    missing.code = "AI_KEY_MISSING";
    throw missing;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: env.geminiApiKey,
      httpOptions: { timeout: 30_000 },
    });
    const response = await ai.models.generateContent({
      model: env.geminiModel,
      contents: promptTemplate(question, answer),
      config: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    return parseModelResponse(response.text);
  } catch (error) {
    if (error.code === "AI_PARSE_ERROR" || error.code === "AI_EMPTY_RESPONSE") throw error;

    const mapped = new Error(error?.message || "Gemini request failed");
    mapped.code = getErrorCode(error);
    mapped.details = { status: error?.status || error?.statusCode };
    throw mapped;
  }
};