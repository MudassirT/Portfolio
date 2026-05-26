# Frontend Integration Example

Use this code in your existing portfolio frontend to connect to the new Python chatbot backend.

## Example React component

```tsx
import { useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  answer: string;
  sources: Array<{ title: string; excerpt: string; source: string }>;
  conversation_id: string;
}

export const PortfolioChatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user" as const, content: query };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const response = await fetch("http://localhost:5000/api/chat/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        conversation_id: conversationId,
        history: [...messages, userMessage],
      }),
    });

    const data: ChatResponse = await response.json();
    setConversationId(data.conversation_id);
    setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    setLoading(false);
    setQuery("");
  };

  return (
    <div className="chatbot-widget">
      <div className="chat-log">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? "message user" : "message assistant"}>
            <strong>{message.role === "user" ? "You:" : "Assistant:"}</strong>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about my portfolio..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
};
```

## Notes

- Change the backend origin if you deploy the chatbot API to a remote server.
- If your portfolio frontend is served from a different host, make sure `FRONTEND_ORIGINS` in `.env` includes that origin.
- Use `/api/chat/reload` to reload the portfolio document index after adding new content.
