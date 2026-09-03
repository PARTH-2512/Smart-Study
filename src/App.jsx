import InputForm from "./components/InputForm";
import OutputTabs from "./components/OutputTabs";
import HistoryPanel from "./components/HistoryPanel";
import Loader from "./components/Loader";
import { useStudySession } from "./hooks/useStudySession";

function App() {
  const {
    question,
    setQuestion,
    answer,
    setAnswer,
    result,
    loading,
    error,
    handleSubmit,
    loadSession,
  } = useStudySession();

  return (
    <div className="min-h-screen bg-slate-950 text-amber-50 font-body">
      <header className="sticky top-0 z-20 border-b border-amber-400/20 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <h1 className="font-heading text-2xl text-amber-300">Smart Study Transformer</h1>
          <p className="text-xs text-amber-100/80">Turn notes into knowledge.</p>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        <InputForm
          question={question}
          answer={answer}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {error && (
          <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading ? <Loader /> : result ? <OutputTabs result={result} /> : null}

        <HistoryPanel onLoad={loadSession} />
      </main>
    </div>
  );
}

export default App;
