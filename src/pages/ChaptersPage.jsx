import AddCard from "../components/AddCard";
import DashboardCard, { paletteFor } from "../components/DashboardCard";
import { useQuestionCounts } from "../hooks/useCounts";
import { useChapters } from "../hooks/useChapters";

function ChaptersPage({ userId, subject, onOpenChapter }) {
  const { chapters, loading, createChapter } = useChapters(subject.id, userId);
  const questionCounts = useQuestionCounts(userId);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl text-amber-200">{subject.name}</h2>
        <p className="text-sm text-amber-100/70">
          Pick a chapter, or create a new one.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-300">Loading chapters...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {chapters.map((chapter) => {
            const count = questionCounts[chapter.id] || 0;
            return (
              <DashboardCard
                key={chapter.id}
                title={chapter.name}
                subtitle={`${count} question${count === 1 ? "" : "s"}`}
                colorClass={paletteFor(chapter.name)}
                onClick={() => onOpenChapter(chapter)}
              />
            );
          })}
          <AddCard
            label="New Chapter"
            placeholder="e.g. Thermodynamics"
            onCreate={createChapter}
          />
        </div>
      )}
    </div>
  );
}

export default ChaptersPage;
