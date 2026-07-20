import {
  LayoutDashboard,
  MessageSquare,
  Users,
  BadgeCheck,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  Plane,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Conversations", icon: MessageSquare },
  { title: "Leads", icon: Users },
  { title: "Qualified", icon: BadgeCheck },
  { title: "Analytics", icon: BarChart3 },
  { title: "Calendar", icon: Calendar },
  { title: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950/90 px-5 py-6 text-slate-100 backdrop-blur-xl lg:flex">
      <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-4 shadow-lg shadow-cyan-950/20">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-black text-slate-950">
            <Plane size={24} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">
              Travel AI
            </p>
            <h1 className="text-lg font-semibold text-white">Lead Assistant</h1>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                item.active
                  ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          );
        })}
      </nav>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium text-white">Production mode</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Ready for AI conversation capture, scoring, and MongoDB-backed lead storage.
        </p>

        <button className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-400/15">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}