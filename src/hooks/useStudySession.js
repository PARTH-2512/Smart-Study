import { useRef, useState } from "react";
import { transformAnswer } from "../lib/aiService";
import { supabase } from "../lib/supabaseClient";

export function useStudySession(userId) {
  const inFlightRef = useRef(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [subjectId, setSubjectId] = useState(null);
  const [chapterId, setChapterId] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (inputQuestion, inputAnswer) => {
    if (!inputQuestion.trim() || !inputAnswer.trim() || inFlightRef.current) return;

    if (!chapterId) {
      setError("Pick (or create) a subject and chapter before transforming.");
      return;
    }

    inFlightRef.current = true;
    setLoading(true);
    setError("");

    try {
      const transformed = await transformAnswer(inputQuestion, inputAnswer);
      setResult(transformed);

      const { error: insertError } = await supabase.from("study_sessions").insert({
        question: inputQuestion,
        raw_answer: inputAnswer,
        easy_points: transformed.easy_points,
        important_points: transformed.important_points,
        flashcards: transformed.flashcards,
        flowchart_mermaid: transformed.flowchart_mermaid,
        user_id: userId,
        chapter_id: chapterId,
      });

      if (insertError) {
        throw new Error(insertError.message);
      }
    } catch (submitError) {
      setError(submitError.message || "Failed to transform answer");
    } finally {
      inFlightRef.current = false;
      setLoading(false);
    }
  };

  const loadSession = (session) => {
    setQuestion(session.question || "");
    setAnswer(session.raw_answer || "");
    setSubjectId(session.subjectId ?? null);
    setChapterId(session.chapter_id ?? null);
    setResult({
      easy_points: session.easy_points || [],
      important_points: session.important_points || [],
      flashcards: session.flashcards || [],
      flowchart_mermaid: session.flowchart_mermaid || "",
    });
    setError("");
  };

  return {
    question,
    setQuestion,
    answer,
    setAnswer,
    subjectId,
    setSubjectId,
    chapterId,
    setChapterId,
    result,
    loading,
    error,
    handleSubmit,
    loadSession,
  };
}
