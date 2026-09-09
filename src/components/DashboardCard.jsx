const PALETTE = [
  "from-amber-400/25 to-orange-500/5 border-amber-300/30 hover:border-amber-300/60",
  "from-sky-400/25 to-blue-500/5 border-sky-300/30 hover:border-sky-300/60",
  "from-emerald-400/25 to-teal-500/5 border-emerald-300/30 hover:border-emerald-300/60",
  "from-fuchsia-400/25 to-pink-500/5 border-fuchsia-300/30 hover:border-fuchsia-300/60",
  "from-violet-400/25 to-indigo-500/5 border-violet-300/30 hover:border-violet-300/60",
  "from-rose-400/25 to-red-500/5 border-rose-300/30 hover:border-rose-300/60",
];

export function paletteFor(name = "") {
  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

function DashboardCard({ title, subtitle, colorClass, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-h-[104px] overflow-hidden rounded-2xl border bg-gradient-to-br p-5 text-left shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${colorClass}`}
    >
      <h3 className="font-heading text-lg leading-snug text-amber-50">{title}</h3>
      {subtitle && <p className="mt-1 text-xs text-amber-100/70">{subtitle}</p>}
      <span className="absolute bottom-3 right-4 text-amber-100/30 transition duration-200 group-hover:translate-x-1 group-hover:text-amber-100/70">
        →
      </span>
    </button>
  );
}

export default DashboardCard;
