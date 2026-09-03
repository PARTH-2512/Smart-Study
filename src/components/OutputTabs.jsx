import { useMemo, useState } from "react";
import BulletPoints from "./BulletPoints";
import Flashcards from "./Flashcards";
import FlowchartView from "./FlowchartView";

const TAB_KEYS = ["easy", "important", "flashcards", "flowchart"];

function OutputTabs({ result }) {
  const [activeTab, setActiveTab] = useState("easy");

  const tabConfig = useMemo(
    () => ({
      easy: { label: "Easy Points" },
      important: { label: "Important Points" },
      flashcards: { label: "Flashcards" },
      flowchart: { label: "Flowchart" },
    }),
    []
  );

  const indicatorIndex = TAB_KEYS.indexOf(activeTab);

  return (
    <section className="rounded-xl border border-amber-200/20 bg-slate-900/70 p-4 shadow-xl shadow-black/20">
      <div className="relative mb-5 grid grid-cols-2 gap-2 rounded-full bg-slate-800 p-1 sm:grid-cols-4">
        <div
          className="pointer-events-none absolute bottom-1 top-1 rounded-full bg-amber-300/20 transition-all duration-300"
          style={{
            width: "calc(25% - 0.5rem)",
            left: `calc(${indicatorIndex} * 25% + 0.25rem)`,
          }}
        />
        {TAB_KEYS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative z-10 rounded-full px-3 py-2 text-sm transition ${
              activeTab === tab ? "text-amber-200" : "text-slate-300 hover:text-amber-100"
            }`}
          >
            {tabConfig[tab].label}
          </button>
        ))}
      </div>

      {activeTab === "easy" && <BulletPoints points={result.easy_points || []} variant="easy" />}
      {activeTab === "important" && (
        <BulletPoints points={result.important_points || []} variant="important" />
      )}
      {activeTab === "flashcards" && <Flashcards cards={result.flashcards || []} />}
      {activeTab === "flowchart" && <FlowchartView mermaid={result.flowchart_mermaid || ""} />}
    </section>
  );
}

export default OutputTabs;
