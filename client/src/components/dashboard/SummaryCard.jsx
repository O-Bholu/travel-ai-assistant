export default function SummaryCard({ summary }) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <p className="text-xs uppercase tracking-[0.35em] text-sky-600/70">
        AI generated
      </p>
      <h3 className="mt-1 text-xl font-semibold text-slate-900">Lead summary</h3>

      <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        {summary || "Waiting for the first live conversation to generate a summary."}
      </p>
    </section>
  );
}