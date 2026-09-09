import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function ChapterQuestionList({ chapterId, onLoad, refreshKey }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterId) return;

    let mounted = true;
    setLoading(true);

    supabase
      .from("study_sessions")
      .select("*")
      .eq("chapter_id", chapterId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!mounted) return;
        setSessions(data || []);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [chapterId, refreshKey]);

  return (
    <section className="rounded-xl border border-amber-200/20 bg-slate-900/70 p-4 shadow-xl shadow-black/20">
      <h2 className="mb-3 font-heading text-xl text-amber-200">Questions in this chapter</h2>
      {loading && <p className="text-sm text-slate-300">Loading...</p>}
      {!loading && sessions.length === 0 && (
        <p className="text-sm text-slate-300">No questions saved here yet.</p>
      )}
      <div className="space-y-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onLoad(session)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-left transition hover:border-amber-300/50"
          >
            <p className="line-clamp-1 text-sm font-medium text-amber-100">{session.question}</p>
            <p className="text-xs text-slate-400">
              {new Date(session.created_at).toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ChapterQuestionList;
