function Breadcrumb({ view, onNavigate }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm">
      <button
        type="button"
        onClick={() => onNavigate({ name: "subjects" })}
        className={
          view.name === "subjects"
            ? "font-medium text-amber-200"
            : "text-amber-100/60 hover:text-amber-200"
        }
      >
        Subjects
      </button>

      {view.subject && (
        <>
          <span className="text-amber-100/30">/</span>
          <button
            type="button"
            onClick={() => onNavigate({ name: "chapters", subject: view.subject })}
            className={
              view.name === "chapters"
                ? "font-medium text-amber-200"
                : "text-amber-100/60 hover:text-amber-200"
            }
          >
            {view.subject.name}
          </button>
        </>
      )}

      {view.chapter && (
        <>
          <span className="text-amber-100/30">/</span>
          <span className="font-medium text-amber-200">{view.chapter.name}</span>
        </>
      )}
    </nav>
  );
}

export default Breadcrumb;
