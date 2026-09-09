import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useChapters(subjectId, userId) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!subjectId || !userId) {
      setChapters([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("chapters")
      .select("*")
      .eq("subject_id", subjectId)
      .order("name", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setChapters(data || []);
      setError("");
    }
    setLoading(false);
  }, [subjectId, userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createChapter = async (name) => {
    const trimmed = name.trim();
    if (!trimmed) throw new Error("Chapter name is required");
    if (!subjectId) throw new Error("Pick a subject first");

    const { data, error: insertError } = await supabase
      .from("chapters")
      .insert({ name: trimmed, subject_id: subjectId, user_id: userId })
      .select()
      .single();

    if (insertError) throw insertError;

    setChapters((previous) =>
      [...previous, data].sort((a, b) => a.name.localeCompare(b.name))
    );
    return data;
  };

  return { chapters, loading, error, createChapter, refresh };
}
