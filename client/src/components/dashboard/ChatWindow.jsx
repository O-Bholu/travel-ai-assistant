import { useEffect, useRef, useState } from "react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow({ messages = [], onSend, isLoading = false, error = "" }) {
  const [draft, setDraft] = useState("");
  const viewportRef = useRef(null);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-200 px-5 py-4">
        <p className="text-xs uppercase tracking-[0.35em] text-sky-600/70">
          Conversation hub
        </p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">AI chat assistant</h3>
        {error ? (
          <p className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}
      </div>

      <div ref={viewportRef} className="max-h-[560px] space-y-4 overflow-y-auto px-5 py-5">
        {messages.length ? (
          messages.map((message) => <ChatMessage key={message.id} message={message} />)
        ) : (
          <div className="rounded-[1.25rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-500">
            No live conversation yet. Send a message to begin qualification.
          </div>
        )}

        {isLoading ? (
          <div className="inline-flex rounded-2xl border border-dashed border-sky-200 bg-sky-50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
            Typing...
          </div>
        ) : null}
      </div>

      <ChatInput
        value={draft}
        onChange={setDraft}
        onSend={(value) => {
          onSend?.(value);
          if (!isLoading) {
            setDraft("");
          }
        }}
        disabled={isLoading}
      />
    </section>
  );
}