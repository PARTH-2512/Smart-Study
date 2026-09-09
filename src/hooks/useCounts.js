import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// subjectId -> number of chapters in it (for the Subjects page)
export function useChapterCounts(userId) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (!userId) {
      setCounts({});
      return;
    }

    supabase
      .from("chapters")
      .select("subject_id")
      .then(({ data }) => {
        const map = {};
        (data || []).forEach((row) => {
          map[row.subject_id] = (map[row.subject_id] || 0) + 1;
        });
        setCounts(map);
      });
  }, [userId]);

  return counts;
}

// chapterId -> number of saved questions in it (for the Chapters page)
export function useQuestionCounts(userId) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (!userId) {
      setCounts({});
      return;
    }

    supabase
      .from("study_sessions")
      .select("chapter_id")
      .then(({ data }) => {
        const map = {};
        (data || []).forEach((row) => {
          if (!row.chapter_id) return;
          map[row.chapter_id] = (map[row.chapter_id] || 0) + 1;
        });
        setCounts(map);
      });
  }, [userId]);

  return counts;
}
