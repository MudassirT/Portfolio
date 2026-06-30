import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

type ChatResponse = {
  answer: string;
  sources: Array<{ title: string; excerpt: string; source: string }>;
  conversation_id: string;
};

const API_URL = import.meta.env.VITE_CHATBOT_API_URL ?? "/chatbot/api/chat/query";

const SUGGESTED = [
  "What projects has Mudassir worked on?",
  "What technologies does Mudassir use?",
  "Tell me about Mudassir's experience.",
];

let msgCounter = 0;
const uid = () => `msg-${++msgCounter}-${Date.now()}`;

/* ════════════════════════════════════════
   Professional Double-Click Reaction
   ════════════════════════════════════════ */
function MessageBubble({
  msg,
  role,
}: {
  msg: ChatMessage;
  role: "user" | "assistant";
}) {
  const [phase, setPhase] = useState<"idle" | "burst" | "liked">("idle");
  const timerRef = useRef<number | null>(null);

  const handleDoubleClick = () => {
    if (phase === "liked") return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("burst");
    timerRef.current = window.setTimeout(() => setPhase("liked"), 750);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const isUser = role === "user";

  return (
    <div className={`bubble-wrapper ${isUser ? "user" : "assistant"}`} onDoubleClick={handleDoubleClick}>
      {/* ── Actual message bubble ── */}
      <div className={isUser ? "user-bubble" : "assistant-bubble"}>
        {msg.content}
      </div>

      {/* ── Burst heart overlay ── */}
      {phase === "burst" && (
        <div className="heart-burst-overlay">
          {/* Large centre heart */}
          <div className="heart-center">
            <HeartSVG className="heart-big" />
          </div>
          {/* Sparkle particles */}
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`spark spark-${i}`} />
          ))}
          {/* Ring ripple */}
          <div className="ring-ripple" />
        </div>
      )}

      {/* ── Persistent reaction badge ── */}
      {phase === "liked" && (
        <div className={`reaction-badge ${isUser ? "badge-user" : "badge-assistant"}`}>
          <HeartSVG className="badge-heart" />
        </div>
      )}
    </div>
  );
}

function HeartSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* ─── Typing dots ─── */
function TypingDots() {
  return (
    <div className="chatbot-msg-row assistant">
      <div className="bot-avatar-sm"><RobotIcon /></div>
      <div className="msg-group">
        <div className="msg-sender">AI Assistant</div>
        <div className="assistant-bubble typing-bubble">
          <span className="dot" /><span className="dot" /><span className="dot" />
        </div>
      </div>
    </div>
  );
}

/* ─── Robot SVG ─── */
function RobotIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="robot-svg">
      <rect x="9" y="12" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="17" width="2.5" height="2.5" rx="0.6" fill="currentColor" />
      <rect x="16.5" y="17" width="2.5" height="2.5" rx="0.6" fill="currentColor" />
      <line x1="16" y1="12" x2="16" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <line x1="9" y1="17" x2="6" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="17" x2="26" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="23" x2="11" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="23" x2="21" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Send icon ─── */
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="send-svg">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ════════════════════════════════════════
   Main Widget
   ════════════════════════════════════════ */
export const ChatbotWidget = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingText, setTypingText] = useState("");
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const typingRef = useRef<number | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => () => { if (typingRef.current) window.clearInterval(typingRef.current); }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Hi there! I'm Mudassir's AI assistant. Ask me anything about his work, skills, or projects.",
        id: uid(),
      }]);
    }
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open, minimized]);

  useEffect(() => {
    if (messageListRef.current)
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages, typingText]);

  const appendAssistantMessage = (text: string) => {
    if (typingRef.current) { window.clearInterval(typingRef.current); typingRef.current = null; }
    setTypingText("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 2;
      setTypingText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
        typingRef.current = null;
        setMessages(prev => [...prev, { role: "assistant", content: text, id: uid() }]);
        setTypingText("");
      }
    }, 18);
    typingRef.current = interval;
  };

  const sendMessage = async (text?: string) => {
    const q = (text ?? query).trim();
    if (!q) return;
    const userMessage: ChatMessage = { role: "user", content: q, id: uid() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    setQuery("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, conversation_id: conversationId, history: [...messages, userMessage] }),
      });

      if (!response.ok) {
        let payload = null; let bodyText = "";
        try { payload = await response.json(); } catch { bodyText = await response.text().catch(() => ""); }
        throw new Error(payload?.detail || bodyText || `Chatbot backend returned ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      setConversationId(data.conversation_id);
      appendAssistantMessage(data.answer);
    } catch (err) {
      let msg = "Unable to get a response from the chatbot.";
      if (err instanceof Error)
        msg = err.message === "Failed to fetch"
          ? "Chatbot backend unreachable. Start the Python server at port 5000."
          : err.message;
      setError(msg);
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); sendMessage(); }
  };

  const fmtTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* ══════════════════ STYLES ══════════════════ */}
      <style>{`
        /* ── Shell ── */
        .chatbot-shell {
          position: fixed; bottom: 1.5rem; right: 1.5rem;
          z-index: 9999; display: flex; flex-direction: column; align-items: flex-end;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        }

        /* ── Trigger ── */
        .chatbot-trigger {
          width: 54px; height: 54px; border-radius: 50%;
          background: linear-gradient(135deg, hsl(160 84% 34%), hsl(160 68% 48%));
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px hsl(160 84% 39% / 0.45);
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          animation: trigger-pulse 2.8s infinite;
        }
        .chatbot-trigger:hover { transform: scale(1.12); box-shadow: 0 6px 28px hsl(160 84% 39% / 0.65); }
        @keyframes trigger-pulse {
          0%,100% { box-shadow: 0 4px 20px hsl(160 84% 39% / 0.45), 0 0 0 0 hsl(160 84% 39% / 0.3); }
          50% { box-shadow: 0 4px 20px hsl(160 84% 39% / 0.45), 0 0 0 12px hsl(160 84% 39% / 0); }
        }
        .chatbot-trigger svg { width: 22px; height: 22px; color: #fff; }

        /* ── Window ── */
        .chatbot-window {
          width: min(100vw - 2rem, 420px);
          border-radius: 22px; overflow: hidden;
          display: flex; flex-direction: column;
          background: #050d0a;
          border: 1px solid hsl(160 30% 12%);
          box-shadow:
            0 0 0 1px hsl(160 84% 39% / 0.06),
            0 40px 90px -15px hsl(0 0% 0% / 0.75),
            0 0 70px hsl(160 84% 39% / 0.06);
          animation: window-in 0.38s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes window-in {
          from { opacity: 0; transform: translateY(28px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chatbot-window.minimized .chatbot-body,
        .chatbot-window.minimized .chatbot-footer { display: none; }

        /* ── Header ── */
        .chatbot-header {
          padding: 15px 16px 13px;
          display: flex; align-items: center; gap: 11px;
          background: linear-gradient(135deg, hsl(160 40% 4%), hsl(160 35% 5.5%));
          border-bottom: 1px solid hsl(160 30% 9%);
          position: relative;
        }
        .chatbot-header::after {
          content: ''; position: absolute;
          bottom: 0; left: 16px; right: 16px; height: 1px;
          background: linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.35), transparent);
        }
        .bot-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, hsl(160 84% 12%), hsl(160 84% 20%));
          border: 1.5px solid hsl(160 84% 39% / 0.45);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 18px hsl(160 84% 39% / 0.18);
        }
        .robot-svg { width: 25px; height: 25px; color: hsl(160 84% 55%); }
        .chatbot-header-info { flex: 1; min-width: 0; }
        .header-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: hsl(160 84% 52%); margin-bottom: 1px;
        }
        .header-title {
          font-size: 13.5px; font-weight: 700; color: hsl(160 30% 92%);
        }
        .header-sub {
          font-size: 11px; color: hsl(160 12% 48%); margin-top: 1px;
          display: flex; align-items: center; gap: 4px;
        }
        .status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: hsl(160 84% 52%); box-shadow: 0 0 6px hsl(160 84% 52%);
          animation: dot-blink 2.2s infinite; flex-shrink: 0;
        }
        @keyframes dot-blink { 0%,100%{opacity:1} 50%{opacity:.35} }
        .header-actions { display: flex; gap: 5px; }
        .hdr-btn {
          width: 27px; height: 27px; border-radius: 7px;
          background: hsl(160 20% 7%); border: 1px solid hsl(160 20% 11%);
          color: hsl(160 12% 52%); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; line-height: 1;
          transition: background .18s, color .18s;
        }
        .hdr-btn:hover { background: hsl(160 20% 11%); color: hsl(160 30% 80%); }
        .hdr-btn.x:hover { background: hsl(0 55% 18%); color: hsl(0 75% 72%); }

        /* ── Body ── */
        .chatbot-body {
          flex: 1; display: flex; flex-direction: column;
          padding: 13px 13px 0; overflow: hidden;
        }

        /* ── Suggested ── */
        .suggested-section { margin-bottom: 11px; }
        .suggested-label {
          font-size: 9px; font-weight: 700; letter-spacing: .2em;
          text-transform: uppercase; color: hsl(160 84% 40%); margin-bottom: 7px;
        }
        .chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .chip {
          font-size: 11px; font-weight: 500; padding: 5px 12px;
          border-radius: 100px; border: 1px solid hsl(160 84% 39% / 0.3);
          background: hsl(160 84% 39% / 0.06); color: hsl(160 30% 76%);
          cursor: pointer; white-space: nowrap;
          transition: background .2s, border-color .2s, color .2s, transform .15s;
        }
        .chip:hover {
          background: hsl(160 84% 39% / 0.16); border-color: hsl(160 84% 39% / 0.65);
          color: hsl(160 84% 68%); transform: translateY(-1px);
        }

        /* ── Messages list ── */
        .chatbot-messages {
          flex: 1; overflow-y: auto; overflow-x: hidden;
          padding-right: 3px; padding-bottom: 10px;
          display: flex; flex-direction: column; gap: 10px;
          max-height: 300px;
          scrollbar-width: thin; scrollbar-color: hsl(160 20% 11%) transparent;
        }
        .chatbot-messages::-webkit-scrollbar { width: 3px; }
        .chatbot-messages::-webkit-scrollbar-thumb { background: hsl(160 20% 13%); border-radius: 100px; }

        /* ── Message row ── */
        .chatbot-msg-row {
          display: flex; align-items: flex-end; gap: 7px;
          animation: row-in .3s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes row-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .chatbot-msg-row.user { justify-content: flex-end; }
        .chatbot-msg-row.assistant { justify-content: flex-start; }

        .bot-avatar-sm {
          width: 27px; height: 27px; border-radius: 50%;
          background: linear-gradient(135deg, hsl(160 84% 11%), hsl(160 84% 17%));
          border: 1px solid hsl(160 84% 39% / 0.35);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .bot-avatar-sm .robot-svg { width: 16px; height: 16px; }

        .msg-group { display: flex; flex-direction: column; max-width: 80%; gap: 0; }
        .chatbot-msg-row.user .msg-group { align-items: flex-end; }
        .chatbot-msg-row.assistant .msg-group { align-items: flex-start; }

        .msg-sender {
          font-size: 10px; font-weight: 600; letter-spacing: .04em;
          color: hsl(160 84% 48%); margin-bottom: 3px; padding-left: 2px;
        }

        /* ════════════════════════════════
           BUBBLE WRAPPER — the key container
           ════════════════════════════════ */
        .bubble-wrapper {
          position: relative;
          display: inline-block;
          cursor: default;
          user-select: none;
          -webkit-user-select: none;
        }
        /* subtle scale feedback on double-click */
        .bubble-wrapper:active { transform: scale(0.985); }

        /* ── Bubbles ── */
        .user-bubble, .assistant-bubble {
          border-radius: 18px;
          padding: 10px 14px;
          font-size: 13px; line-height: 1.65;
          white-space: pre-wrap; word-break: break-word;
          transition: transform .15s ease;
        }
        .user-bubble {
          background: hsl(160 20% 9%);
          border: 1px solid hsl(160 20% 14%);
          color: hsl(160 30% 88%);
          border-bottom-right-radius: 5px;
        }
        .assistant-bubble {
          background: hsl(160 84% 39% / 0.09);
          border: 1px solid hsl(160 84% 39% / 0.2);
          color: hsl(160 30% 88%);
          border-bottom-left-radius: 5px;
          box-shadow: 0 2px 14px hsl(160 84% 39% / 0.05);
        }

        /* ════════════════════════════════
           HEART BURST OVERLAY
           ════════════════════════════════ */
        .heart-burst-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex; align-items: center; justify-content: center;
          border-radius: inherit;
          overflow: visible;
          z-index: 10;
        }

        /* ── Big centre heart ── */
        .heart-center {
          position: absolute;
          display: flex; align-items: center; justify-content: center;
          animation: heart-pop 0.72s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        .heart-big {
          width: 58px; height: 58px;
          fill: hsl(160 84% 52%);
          filter: drop-shadow(0 0 18px hsl(160 84% 52% / 0.85))
                  drop-shadow(0 0 36px hsl(160 84% 52% / 0.4));
        }
        @keyframes heart-pop {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          25%  { transform: scale(1.35) rotate(5deg); opacity: 1; }
          55%  { transform: scale(0.92) rotate(-2deg); opacity: 1; }
          80%  { transform: scale(1.08) rotate(1deg); opacity: 1; }
          100% { transform: scale(0.15) rotate(0deg); opacity: 0; }
        }

        /* ── Ring ripple ── */
        .ring-ripple {
          position: absolute;
          width: 72px; height: 72px; border-radius: 50%;
          border: 2.5px solid hsl(160 84% 52% / 0.7);
          animation: ring-expand .65s ease-out forwards;
        }
        @keyframes ring-expand {
          0%   { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* ── Spark particles ── */
        .spark {
          position: absolute;
          width: 5px; height: 5px; border-radius: 50%;
          background: hsl(160 84% 60%);
          box-shadow: 0 0 6px hsl(160 84% 60%);
        }
        /* 8 sparks evenly around the circle */
        .spark-0 { animation: spark-fly-0 .6s ease-out forwards; }
        .spark-1 { animation: spark-fly-1 .6s ease-out forwards .04s; }
        .spark-2 { animation: spark-fly-2 .6s ease-out forwards .08s; }
        .spark-3 { animation: spark-fly-3 .6s ease-out forwards .02s; }
        .spark-4 { animation: spark-fly-4 .6s ease-out forwards .06s; }
        .spark-5 { animation: spark-fly-5 .6s ease-out forwards .03s; }
        .spark-6 { animation: spark-fly-6 .6s ease-out forwards .07s; }
        .spark-7 { animation: spark-fly-7 .6s ease-out forwards .01s; }

        @keyframes spark-fly-0 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(0px,-42px) scale(0);opacity:0} }
        @keyframes spark-fly-1 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(30px,-30px) scale(0);opacity:0} }
        @keyframes spark-fly-2 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(42px,0px) scale(0);opacity:0} }
        @keyframes spark-fly-3 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(30px,30px) scale(0);opacity:0} }
        @keyframes spark-fly-4 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(0px,42px) scale(0);opacity:0} }
        @keyframes spark-fly-5 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(-30px,30px) scale(0);opacity:0} }
        @keyframes spark-fly-6 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(-42px,0px) scale(0);opacity:0} }
        @keyframes spark-fly-7 { 0%{transform:translate(0,0) scale(1);opacity:1}   100%{transform:translate(-30px,-30px) scale(0);opacity:0} }

        /* ════════════════════════════════
           PERSISTENT REACTION BADGE
           ════════════════════════════════ */
        .reaction-badge {
          position: absolute;
          bottom: -10px;
          display: flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; border-radius: 50%;
          background: hsl(160 84% 39%);
          border: 2px solid hsl(160 40% 5%);
          box-shadow: 0 2px 8px hsl(160 84% 39% / 0.55), 0 0 12px hsl(160 84% 39% / 0.35);
          animation: badge-settle .45s cubic-bezier(.34,1.56,.64,1) forwards;
          z-index: 5;
        }
        .badge-user  { right: 6px; }
        .badge-assistant { left: 6px; }

        @keyframes badge-settle {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.25) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .badge-heart {
          width: 11px; height: 11px;
          fill: #fff;
        }

        /* ── Light mode reaction badge ── */
        :root:not(.dark) .reaction-badge {
          border-color: hsl(160 30% 94%);
        }

        /* ── Typing bubble ── */
        .typing-bubble {
          display: flex; align-items: center; gap: 5px;
          padding: 12px 15px;
        }
        .dot {
          width: 5.5px; height: 5.5px; border-radius: 50%;
          background: hsl(160 84% 48%);
          animation: dot-bounce 1.25s infinite ease-in-out;
        }
        .dot:nth-child(2) { animation-delay: .16s; }
        .dot:nth-child(3) { animation-delay: .32s; }
        @keyframes dot-bounce {
          0%,80%,100% { transform: scale(0.65); opacity: 0.45; }
          40% { transform: scale(1.1); opacity: 1; }
        }

        /* ── Timestamp ── */
        .msg-time {
          font-size: 10px; color: hsl(160 12% 40%); margin-top: 5px; padding: 0 2px;
          display: flex; align-items: center; gap: 3px;
        }
        .check-icon { color: hsl(160 84% 48%); font-size: 11px; }

        /* ── Footer ── */
        .chatbot-footer {
          padding: 11px 13px 13px;
          border-top: 1px solid hsl(160 20% 7%);
          background: hsl(160 40% 3%);
        }
        .chatbot-input-row { display: flex; gap: 7px; align-items: center; }
        .input-wrap {
          flex: 1; display: flex; align-items: center; gap: 8px;
          background: hsl(160 20% 6.5%);
          border: 1px solid hsl(160 20% 11%);
          border-radius: 14px; padding: 0 12px;
          transition: border-color .2s, box-shadow .2s;
        }
        .input-wrap:focus-within {
          border-color: hsl(160 84% 39% / 0.55);
          box-shadow: 0 0 0 3px hsl(160 84% 39% / 0.09);
        }
        .input-pen { width: 13px; height: 13px; color: hsl(160 84% 44%); flex-shrink: 0; }
        .chatbot-input {
          flex: 1; background: none; border: none; outline: none;
          font-family: inherit; font-size: 13px;
          color: hsl(160 30% 88%); padding: 11px 0; min-width: 0;
        }
        .chatbot-input::placeholder { color: hsl(160 12% 38%); }
        .chatbot-send {
          width: 40px; height: 40px; border-radius: 12px;
          background: linear-gradient(135deg, hsl(160 84% 34%), hsl(160 68% 46%));
          border: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px hsl(160 84% 39% / 0.38);
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .2s, opacity .2s;
        }
        .chatbot-send:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 6px 22px hsl(160 84% 39% / 0.55);
        }
        .chatbot-send:disabled { opacity: .38; cursor: not-allowed; }
        .send-svg { width: 15px; height: 15px; }

        .chatbot-error {
          margin: 0 0 8px; padding: 8px 12px; border-radius: 10px;
          font-size: 12px;
          background: hsl(0 60% 14% / 0.5);
          border: 1px solid hsl(0 60% 28% / 0.4);
          color: hsl(0 78% 72%);
        }
        .chatbot-caption {
          font-size: 10px; color: hsl(160 12% 34%);
          text-align: center; margin-top: 7px;
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }
        .cap-shield { width: 9px; height: 9px; }

        /* ════════════════════ LIGHT THEME ════════════════════ */
        :root:not(.dark) .chatbot-window {
          background: #f2faf7;
          border-color: hsl(160 20% 83%);
          box-shadow: 0 24px 70px hsl(0 0% 0% / 0.13), 0 0 0 1px hsl(160 30% 86%);
        }
        :root:not(.dark) .chatbot-header {
          background: linear-gradient(135deg, hsl(160 35% 97%), hsl(160 30% 94%));
          border-bottom-color: hsl(160 20% 87%);
        }
        :root:not(.dark) .header-title { color: hsl(160 20% 10%); }
        :root:not(.dark) .header-sub { color: hsl(160 12% 44%); }
        :root:not(.dark) .bot-avatar {
          background: linear-gradient(135deg, hsl(160 84% 88%), hsl(160 84% 80%));
          border-color: hsl(160 84% 39% / 0.3);
        }
        :root:not(.dark) .hdr-btn {
          background: hsl(160 20% 93%); border-color: hsl(160 20% 86%); color: hsl(160 12% 34%);
        }
        :root:not(.dark) .hdr-btn:hover { background: hsl(160 20% 88%); }
        :root:not(.dark) .chip {
          background: hsl(160 84% 39% / 0.07); border-color: hsl(160 84% 39% / 0.22);
          color: hsl(160 20% 22%);
        }
        :root:not(.dark) .chip:hover { background: hsl(160 84% 39% / 0.14); border-color: hsl(160 84% 39% / 0.58); color: hsl(160 84% 27%); }
        :root:not(.dark) .user-bubble {
          background: #fff; border-color: hsl(160 20% 86%); color: hsl(160 20% 10%);
          box-shadow: 0 2px 8px hsl(0 0% 0% / 0.055);
        }
        :root:not(.dark) .assistant-bubble {
          background: hsl(160 84% 39% / 0.07);
          border-color: hsl(160 84% 39% / 0.18);
          color: hsl(160 20% 10%);
        }
        :root:not(.dark) .bot-avatar-sm {
          background: linear-gradient(135deg, hsl(160 84% 88%), hsl(160 84% 80%));
        }
        :root:not(.dark) .msg-sender { color: hsl(160 84% 32%); }
        :root:not(.dark) .msg-time { color: hsl(160 12% 52%); }
        :root:not(.dark) .suggested-label { color: hsl(160 84% 30%); }
        :root:not(.dark) .chatbot-footer {
          background: hsl(160 30% 97%); border-top-color: hsl(160 20% 88%);
        }
        :root:not(.dark) .input-wrap {
          background: #fff; border-color: hsl(160 20% 83%);
        }
        :root:not(.dark) .chatbot-input { color: hsl(160 20% 10%); }
        :root:not(.dark) .chatbot-input::placeholder { color: hsl(160 12% 57%); }
        :root:not(.dark) .chatbot-caption { color: hsl(160 12% 50%); }
        :root:not(.dark) .chatbot-messages::-webkit-scrollbar-thumb { background: hsl(160 20% 82%); }

        /* light mode — heart burst uses same emerald colour, looks great */
      `}</style>

      {/* ══════════════════ WIDGET ══════════════════ */}
      <div className="chatbot-shell">
        {!open ? (
          <button type="button" onClick={() => setOpen(true)} className="chatbot-trigger" aria-label="Open chatbot">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16v12H7l-3 3V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          </button>
        ) : (
          <div className={`chatbot-window ${minimized ? "minimized" : ""}`}>

            {/* ── Header ── */}
            <div className="chatbot-header">
              <div className="bot-avatar"><RobotIcon /></div>
              <div className="chatbot-header-info">
                <div className="header-label">AI ASSISTANT</div>
                <div className="header-title">Chat with Mudassir</div>
                <div className="header-sub">
                  <span className="status-dot" />
                  Ask about projects, experience, or tech stack
                </div>
              </div>
              <div className="header-actions">
                <button type="button" className="hdr-btn"
                  onClick={() => setMinimized(m => !m)}
                  title={minimized ? "Expand" : "Minimise"}>
                  {minimized ? "□" : "–"}
                </button>
                <button type="button" className="hdr-btn x"
                  onClick={() => { setOpen(false); setMinimized(false); }}
                  title="Close">×</button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="chatbot-body">
              {messages.length <= 1 && (
                <div className="suggested-section">
                  <div className="suggested-label">Suggested Questions</div>
                  <div className="chips">
                    {SUGGESTED.map(s => (
                      <button key={s} className="chip" onClick={() => sendMessage(s)} disabled={loading} type="button">{s}</button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messageListRef} className="chatbot-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`chatbot-msg-row ${msg.role}`}>
                    {msg.role === "assistant" && (
                      <div className="bot-avatar-sm"><RobotIcon /></div>
                    )}
                    <div className="msg-group">
                      {msg.role === "assistant" && <div className="msg-sender">AI Assistant &nbsp;{fmtTime()}</div>}
                      {/* ── Double-clickable bubble ── */}
                      <MessageBubble msg={msg} role={msg.role} />
                      {msg.role === "user" && (
                        <div className="msg-time">You &nbsp;{fmtTime()} <span className="check-icon">✓✓</span></div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && !typingText && <TypingDots />}

                {typingText && (
                  <div className="chatbot-msg-row assistant">
                    <div className="bot-avatar-sm"><RobotIcon /></div>
                    <div className="msg-group">
                      <div className="msg-sender">AI Assistant &nbsp;{fmtTime()}</div>
                      <div className="assistant-bubble">{typingText}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="chatbot-footer">
              {error && <div className="chatbot-error">{error}</div>}
              <div className="chatbot-input-row">
                <div className="input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="input-pen">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    ref={inputRef} value={query}
                    onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Mudassir..."
                    className="chatbot-input" disabled={loading}
                    aria-label="Chat message input"
                  />
                </div>
                <button type="button" onClick={() => sendMessage()}
                  disabled={loading || !query.trim()} className="chatbot-send" aria-label="Send">
                  <SendIcon />
                </button>
              </div>
              <div className="chatbot-caption">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cap-shield">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Personal AI assistant • Trained on Mudassir's portfolio
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
};
