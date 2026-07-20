import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-600/70">
            Live lead intelligence
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">
            Real-time travel assistant
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 shadow-sm">
            <Search size={18} />

            <input
              className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-64"
              placeholder="Search conversations, leads..."
            />
          </label>

          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
            <Bell size={20} />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold text-white">
              AM
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Assistant Admin</p>
              <p className="text-xs text-slate-500">Live dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}