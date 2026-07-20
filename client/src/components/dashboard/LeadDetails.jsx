export default function LeadDetails({ details = [] }) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.35em] text-sky-600/70">
          Captured fields
        </p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">Lead details</h3>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        {details.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">
              {item.label}
            </dt>
            <dd className="mt-2 text-sm font-semibold text-slate-900">{item.value || "Pending"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}