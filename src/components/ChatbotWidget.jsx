import { useEffect, useRef, useState, type KeyboardEvent } from "react";



const API_URL = import.meta.env.VITE_CHATBOT_API_URL ?? "/chatbot/api/chat/query";

export const ChatbotWidget = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [typingText, setTypingText] = useState("");
  const [open, setOpen] = useState(false);
  const typingRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingRef.current) {
        window.clearInterval(typingRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role,
          content, skills, or projects ’re talking face to face.",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, typingText]);

  const appendAssistantMessage = (text) => {
    if (typingRef.current) {
      window.clearInterval(typingRef.current);
      typingRef.current = null;
    }

    setTypingText("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypingText(text.slice(0, index));
      if (index >= text.length) {
        if (typingRef.current) {
          window.clearInterval(typingRef.current);
          typingRef.current = null;
        }
        setMessages((prev) => [...prev, { role, content);
        setTypingText("");
      }
    }, 20);

    typingRef.current = interval;
  };

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role, content) };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method,
        headers,
        },
        body),
          conversation_id,
          history, userMessage],
        }),
      });

      if (!response.ok) {
        let payload = null;
        let bodyText = "";
        try {
          payload = await response.json();
        } catch {
          bodyText = await response.text().catch(() => "");
        }
        throw new Error(
          payload?.detail || bodyText || `Chatbot backend returned ${response.status}`
        );
      }

      const data = await response.json();
      setConversationId(data.conversation_id);
      appendAssistantMessage(data.answer);
    } catch (err) {
      let message = "Unable to get a response from the chatbot.";
      if (err instanceof Error) {
        message = err.message === "Failed to fetch"
          ? "Chatbot backend unreachable. Start the Python server at port 5000.";
      }
      setError(message);
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
          className="inline-flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground shadow-2xl transition hover="Open portfolio chat"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http="M4 4h16v12H7l-3 3V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 11h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )="chatbot-widget glass rounded-3xl p-4 shadow-2xl w-[min(100vw-2rem,420px)] border border-border/70 bg-background/95 backdrop-blur-xl">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Mudassir Ahmed Assistant</p>
              <h2 className="text-xl font-bold">Chat with Mudassir</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-border/10 p-2 text-sm text-muted-foreground transition hover="Close chatbot"
            >
              ×
            </button>
          </div>

          <div ref={messageListRef} className="space-y-3 mb-5 max-h-[320px] overflow-y-auto pr-2">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end"={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-background border border-border text-foreground"="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {typingText && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed bg-primary/10 border border-primary/20">
                  <p className="whitespace-pre-wrap">{typingText}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {error && <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

            <div className="grid grid-cols-[1fr_auto] gap-3">
              <input
                value={query}
                onChange={(evt) => setQuery(evt.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, or experience..."
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !query.trim()}
                className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover="text-xs text-muted-foreground">Conversation memory is preserved for this session.</p>
          </div>
        </section>
      )}
    </div>
  );
};
