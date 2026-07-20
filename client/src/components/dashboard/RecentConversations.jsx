function formatTime(value) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Just now";
  }
}

export default function RecentConversations({ items = [] }) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-600/70">
            Live activity
          </p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            Recent conversations
          </h3>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {items.length} live
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.length ? (
          items.map((item) => (
            <article
              key={item.conversationId}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.conversationId}
                  </p>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                  {item.messagesCount} msgs
                </span>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                {item.detail}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{formatTime(item.updatedAt)}</span>
                <span className="font-medium text-emerald-600">Live</span>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-500 md:col-span-2 xl:col-span-4">
            No recent conversations yet. The feed will populate automatically when chat activity begins.
          </div>
        )}
      </div>
    </section>
  );
}
