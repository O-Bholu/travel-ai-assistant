import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  change,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg shadow-slate-200/70 ${color}`}>
            <Icon size={18} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              {value}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-emerald-600">{change}</p>
          <div className="mt-4 h-12 w-24 rounded-full bg-gradient-to-r from-cyan-200 via-sky-200 to-violet-200 opacity-70" />
        </div>
      </div>
    </motion.div>
  );
}