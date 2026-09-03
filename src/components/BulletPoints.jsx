function BulletPoints({ points, variant }) {
  const isEasy = variant === "easy";

  return (
    <ul className="space-y-3">
      {points.map((point, index) => (
        <li
          key={`${point}-${index}`}
          className={`point-enter flex gap-3 rounded-lg border p-3 ${
            isEasy
              ? "border-emerald-400/30 bg-emerald-300/10"
              : "border-amber-300/30 bg-amber-300/10 font-medium"
          }`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <span className={isEasy ? "text-emerald-300" : "text-amber-300"}>{isEasy ? "●" : "★"}</span>
          <span className="text-amber-50">{point}</span>
        </li>
      ))}
      {points.length === 0 && <li className="text-sm text-slate-300">No points generated yet.</li>}
    </ul>
  );
}

export default BulletPoints;
