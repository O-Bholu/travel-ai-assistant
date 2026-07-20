export default function ChatInput({ value, onChange, onSend, disabled = false }) {
  return (
    <form
      className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        onSend(value);
      }}
    >
      <textarea
        rows={2}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder="Ask the assistant about destination, dates, budget, travelers, or contact details..."
        className="min-h-12 flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={disabled}
        className="h-12 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        {disabled ? "Sending..." : "Send"}
      </button>
    </form>
  );
}