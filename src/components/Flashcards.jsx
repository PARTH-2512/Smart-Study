import { useMemo, useState } from "react";

function Flashcards({ cards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState({});

  const total = cards.length;
  const activeLabel = useMemo(() => (total ? `${activeIndex + 1} / ${total}` : "0 / 0"), [activeIndex, total]);

  const toggleFlip = (index) => {
    setActiveIndex(index);
    setFlipped((previous) => ({ ...previous, [index]: !previous[index] }));
  };

  if (!cards.length) {
    return <p className="text-sm text-slate-300">No flashcards generated yet.</p>;
  }

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-wider text-amber-300">{activeLabel}</p>
      <div className="flex snap-x gap-4 overflow-x-auto pb-2">
        {cards.map((card, index) => (
          <button
            type="button"
            key={`${card.q}-${index}`}
            onClick={() => toggleFlip(index)}
            className={`flashcard min-h-48 min-w-[260px] flex-1 rounded-xl text-left ${
              flipped[index] ? "flipped" : ""
            }`}
          >
            <div className="flashcard-inner relative h-full rounded-xl border border-amber-200/20 bg-slate-800">
              <div className="flashcard-face absolute inset-0 rounded-xl p-4">
                <p className="mb-2 text-xs uppercase text-amber-300">Question</p>
                <p className="text-amber-50">{card.q}</p>
              </div>
              <div className="flashcard-face flashcard-back absolute inset-0 rounded-xl bg-amber-300/20 p-4">
                <p className="mb-2 text-xs uppercase text-amber-100">Answer</p>
                <p className="text-amber-50">{card.a}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Flashcards;
