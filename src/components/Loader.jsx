import { useEffect, useState } from "react";

const TIPS = [
  "Tip: Study in short focused bursts to retain more.",
  "Tip: Explain concepts out loud to test understanding.",
  "Tip: Review flashcards right before sleeping.",
  "Tip: Mix easy and hard topics in one session.",
  "Tip: Active recall beats passive re-reading.",
];

function Loader() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((previous) => (previous + 1) % TIPS.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="rounded-xl border border-amber-200/20 bg-slate-900/70 p-4">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-amber-300 border-t-transparent" />
        <p className="text-sm text-amber-100">Transforming your notes...</p>
      </div>
      <div className="space-y-2">
        <div className="h-4 animate-pulse rounded bg-slate-700" />
        <div className="h-4 animate-pulse rounded bg-slate-700/80" />
        <div className="h-24 animate-pulse rounded bg-slate-700/70" />
      </div>
      <p className="mt-3 text-xs text-amber-200/80">{TIPS[tipIndex]}</p>
    </section>
  );
}

export default Loader;
