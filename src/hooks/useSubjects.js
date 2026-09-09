import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useSubjects(userId) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!userId) {
      setSubjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("subjects")
      .select("*")
      .order("name", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setSubjects(data || []);
      setError("");
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createSubject = async (name) => {
    const trimmed = name.trim();
    if (!trimmed) throw new Error("Subject name is required");

    const { data, error: insertError } = await supabase
      .from("subjects")
      .insert({ name: trimmed, user_id: userId })
      .select()
      .single();

    if (insertError) throw insertError;

    setSubjects((previous) =>
      [...previous, data].sort((a, b) => a.name.localeCompare(b.name))
    );
    return data;
  };

  return { subjects, loading, error, createSubject, refresh };
}
