import { useState } from "react";
import AuthForm from "./components/AuthForm";
import Breadcrumb from "./components/Breadcrumb";
import { useAuth } from "./context/AuthContext";
import ChaptersPage from "./pages/ChaptersPage";
import ChapterWorkspacePage from "./pages/ChapterWorkspacePage";
import SubjectsPage from "./pages/SubjectsPage";

function App() {
  const { user, initializing, signOut } = useAuth();
  const [view, setView] = useState({ name: "subjects" });

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-amber-100">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 font-body text-amber-50">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-body text-amber-50">
      <header className="sticky top-0 z-20 border-b border-amber-400/20 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="font-heading text-2xl text-amber-300">Smart Study Transformer</h1>
            <p className="text-xs text-amber-100/80">Turn notes into knowledge.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-amber-100/70 sm:inline">{user.email}</span>
            <button
              onClick={signOut}
              className="rounded-lg border border-amber-300/30 px-3 py-1.5 text-xs font-medium text-amber-200 transition hover:border-amber-300/60"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 pb-3">
          <Breadcrumb view={view} onNavigate={setView} />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {view.name === "subjects" && (
          <SubjectsPage
            userId={user.id}
            onOpenSubject={(subject) => setView({ name: "chapters", subject })}
          />
        )}

        {view.name === "chapters" && (
          <ChaptersPage
            userId={user.id}
            subject={view.subject}
            onOpenChapter={(chapter) =>
              setView({ name: "workspace", subject: view.subject, chapter })
            }
          />
        )}

        {view.name === "workspace" && (
          <ChapterWorkspacePage userId={user.id} subject={view.subject} chapter={view.chapter} />
        )}
      </main>
    </div>
  );
}

export default App;
