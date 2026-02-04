import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "@ai-sdk/react";
import { useState } from "react";

export default function App() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>React + AI SDK </h1>

      <div style={{ marginBottom: "20px" }}>
        {messages.map((m: UIMessage) => (
          <div
            key={m.id}
            style={{
              margin: "10px 0",
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <strong>{m.role === "user" ? "Tu: " : "IA: "}</strong>
            {m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .filter(Boolean)
              .join(" ")}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;

          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreve algo..."
          style={{ width: "80%", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
