export default function LeadScore({ score = 0, confidence = "Low", buyingIntent = "Low" }) {
  const boundedScore = Math.max(0, Math.min(100, score));
  const strokeColor =
    boundedScore >= 80
      ? "from-emerald-400 to-cyan-400"
      : boundedScore >= 50
        ? "from-amber-400 to-orange-500"
        : "from-rose-400 to-pink-500";

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <p className="text-xs uppercase tracking-[0.35em] text-sky-600/70">
        Lead intelligence
      </p>
      <h3 className="mt-1 text-xl font-semibold text-slate-900">Lead score</h3>

      <div className="mt-5 flex items-center gap-5">
        <div
          className={`flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br ${strokeColor} p-2`}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-slate-200 bg-white text-center">
            <span className="text-4xl font-semibold text-slate-900">{boundedScore}%</span>
            <span className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
              Score
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Confidence
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{confidence}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Buying intent
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{buyingIntent}</p>
          </div>
        </div>
      </div>
    </section>
  );
}