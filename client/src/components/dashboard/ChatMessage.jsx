export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-[1.5rem] px-4 py-3 text-sm shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-sky-500 to-indigo-600 text-white"
            : "border border-slate-200 bg-slate-50 text-slate-700"
        }`}
      >
        <p className="leading-6">{message.content}</p>

        <div
          className={`mt-2 text-[11px] uppercase tracking-[0.25em] ${
            isUser ? "text-white/80" : "text-slate-400"
          }`}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}