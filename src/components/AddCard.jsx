import { useState } from "react";

function AddCard({ label, placeholder, onCreate }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setAdding(false);
    setName("");
    setError("");
  };

  const submit = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError("");
    try {
      await onCreate(name);
      reset();
    } catch (createError) {
      setError(createError.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (!adding) {
    return (
      <button
        type="button"
        onClick={() => setAdding(true)}
        className="flex min-h-[104px] items-center justify-center rounded-2xl border-2 border-dashed border-amber-300/25 text-sm font-medium text-amber-200/60 transition hover:border-amber-300/60 hover:text-amber-200"
      >
        + {label}
      </button>
    );
  }

  return (
    <div className="flex min-h-[104px] flex-col justify-between rounded-2xl border border-amber-300/40 bg-slate-900 p-4">
      <input
        autoFocus
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && submit()}
        placeholder={placeholder}
        disabled={saving}
        className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-amber-50 outline-none ring-amber-400 transition focus:ring-2"
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={submit}
          disabled={saving}
          className="rounded-lg bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-900 transition hover:bg-amber-300 disabled:opacity-70"
        >
          {saving ? "Adding..." : "Add"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={saving}
          className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-amber-300/50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddCard;
