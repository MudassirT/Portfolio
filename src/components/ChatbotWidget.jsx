import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_CHATBOT_API_URL ?? "/chatbot/api/chat/query";

export const ChatbotWidget = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hi there! Ask me about my projects, skills, or experience.",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim(), history: messages }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.detail || `Chatbot backend returned ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer || "No response." }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to get a response from the chatbot.");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground shadow-2xl hover:opacity-90"
          aria-label="Open chat"
        >
          Chat
        </button>
      ) : (
        <div className="chatbot-widget glass rounded-3xl p-4 shadow-2xl w-[min(100vw-2rem,420px)] border border-border/70 bg-background/95 backdrop-blur-xl">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Mudassir Ahmed Assistant</p>
              <h2 className="text-xl font-bold">Chat with Mudassir</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-border/10 p-2 text-sm text-muted-foreground hover:bg-border/20"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div ref={messageListRef} className="space-y-3 mb-5 max-h-[320px] overflow-y-auto pr-2">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-background border border-border text-foreground" : "bg-primary/10 border border-primary/20 text-foreground"}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {error && <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <div className="grid grid-cols-[1fr_auto] gap-3">
            <input
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about projects, skills, or experience..."
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !query.trim()}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
