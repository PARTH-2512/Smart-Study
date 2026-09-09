import AddCard from "../components/AddCard";
import DashboardCard, { paletteFor } from "../components/DashboardCard";
import { useChapterCounts } from "../hooks/useCounts";
import { useSubjects } from "../hooks/useSubjects";

function SubjectsPage({ userId, onOpenSubject }) {
  const { subjects, loading, createSubject } = useSubjects(userId);
  const chapterCounts = useChapterCounts(userId);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl text-amber-200">Your Subjects</h2>
        <p className="text-sm text-amber-100/70">
          Pick a subject to see its chapters, or create a new one.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-300">Loading subjects...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {subjects.map((subject) => {
            const count = chapterCounts[subject.id] || 0;
            return (
              <DashboardCard
                key={subject.id}
                title={subject.name}
                subtitle={`${count} chapter${count === 1 ? "" : "s"}`}
                colorClass={paletteFor(subject.name)}
                onClick={() => onOpenSubject(subject)}
              />
            );
          })}
          <AddCard label="New Subject" placeholder="e.g. Physics" onCreate={createSubject} />
        </div>
      )}
    </div>
  );
}

export default SubjectsPage;
