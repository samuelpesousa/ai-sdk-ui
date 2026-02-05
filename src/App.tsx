import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, Trash2, Terminal } from "lucide-react";

export default function App() {
  const { messages, sendMessage, setMessages } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#020c1b] text-slate-300 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0a192f] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#1e3a8a]/30 flex flex-col h-[85vh] overflow-hidden">
        <header className="px-6 py-4 border-b border-[#1e3a8a]/20 flex items-center justify-between bg-[#112240]/80">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
              <Terminal className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                AI Protocol
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]"></span>
                <span className="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest">
                  Encrypted Session
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setMessages([])}
            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(circle_at_top,_#112240_0%,_#0a192f_100%)]"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-30">
              <Sparkles size={64} />
              <p className="text-sm font-mono tracking-widest">
                READY FOR COMMANDS
              </p>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`mt-1 w-8 h-8 rounded border ${
                  m.role === "user"
                    ? "bg-blue-700 border-blue-400/30 text-white"
                    : "bg-[#112240] border-[#1e3a8a] text-blue-400"
                } flex items-center justify-center`}
              >
                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div
                className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed shadow-md ${
                  m.role === "user"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1d2d50] border border-[#1e3a8a]/40 text-slate-200"
                }`}
              >
                {m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .filter(Boolean)
                  .join(" ")}
              </div>
            </div>
          ))}
        </div>

        <footer className="p-4 bg-[#0a192f] border-t border-[#1e3a8a]/20">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Aguardando entrada..."
                className="w-full bg-[#112240] border border-[#1e3a8a]/30 rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-600"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-1.5 p-1.5 text-blue-400 hover:text-white disabled:text-slate-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <div className="flex justify-between items-center mt-3 px-1">
            <span className="text-xs text-slate-600 font-mono">
              STATUS: STABLE
            </span>
            <span className="text-xs text-slate-600 font-mono italic">
              Samuel v1.0.0
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
