import { useEffect, useState } from "react";
import ChapterQuestionList from "../components/ChapterQuestionList";
import InputForm from "../components/InputForm";
import Loader from "../components/Loader";
import OutputTabs from "../components/OutputTabs";
import { useStudySession } from "../hooks/useStudySession";

function ChapterWorkspacePage({ userId, subject, chapter }) {
  const {
    question,
    setQuestion,
    answer,
    setAnswer,
    setSubjectId,
    setChapterId,
    result,
    loading,
    error,
    handleSubmit,
    loadSession,
  } = useStudySession(userId);

  const [refreshKey, setRefreshKey] = useState(0);

  // Lock the session to this chapter whenever the workspace opens.
  useEffect(() => {
    setSubjectId(subject.id);
    setChapterId(chapter.id);
  }, [subject.id, chapter.id, setSubjectId, setChapterId]);

  const onSubmit = async (inputQuestion, inputAnswer) => {
    await handleSubmit(inputQuestion, inputAnswer);
    setRefreshKey((key) => key + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl text-amber-200">{chapter.name}</h2>
        <p className="text-sm text-amber-100/70">in {subject.name}</p>
      </div>

      <InputForm
        question={question}
        answer={answer}
        setQuestion={setQuestion}
        setAnswer={setAnswer}
        onSubmit={onSubmit}
        loading={loading}
      />

      {error && (
        <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? <Loader /> : result ? <OutputTabs result={result} /> : null}

      <ChapterQuestionList chapterId={chapter.id} onLoad={loadSession} refreshKey={refreshKey} />
    </div>
  );
}

export default ChapterWorkspacePage;
