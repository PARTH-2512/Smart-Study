function InputForm({ question, answer, setQuestion, setAnswer, onSubmit, loading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(question, answer);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-amber-200/20 bg-slate-900/70 p-5 shadow-xl shadow-black/20"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-amber-100">Question</label>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="What topic are you studying?"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-amber-50 outline-none ring-amber-400 transition focus:ring-2"
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-amber-100">Long Answer</label>
          <span className="text-xs text-amber-200/70">{answer.length} characters</span>
        </div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Paste your detailed notes or answer..."
          minLength={20}
          rows={6}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-amber-50 outline-none ring-amber-400 transition focus:ring-2"
          disabled={loading}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-900 transition hover:scale-[1.02] hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Transforming..." : "Transform 🚀"}
      </button>
    </form>
  );
}

export default InputForm;
