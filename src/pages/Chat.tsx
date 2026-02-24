import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const { chatHistory, addChatMessage, userProfile } = useStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: input,
      timestamp: Date.now()
    };
    
    addChatMessage(userMsg);
    setInput('');
    setLoading(true);

    // AI API connection is currently disabled per request
    setTimeout(() => {
      addChatMessage({
        id: crypto.randomUUID(),
        role: 'model',
        content: "I am your Scholira Consultant. Currently, my live API connection is being updated, but I can help you review your saved profile locally!",
        timestamp: Date.now()
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden h-[600px] max-w-4xl mx-auto mt-8">
      <div className="p-4 border-b border-indigo-50 bg-indigo-50/30 flex items-center gap-3">
        <Bot className="text-indigo-600" size={24} />
        <div>
          <h2 className="font-bold text-slate-900">AI Admission Consultant</h2>
          <p className="text-xs text-slate-500">Personalized advice for {userProfile.name || 'your'} journey</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {chatHistory.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? "bg-slate-200" : "bg-indigo-100"}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-indigo-600" />}
            </div>
            <div className={`p-4 rounded-2xl text-sm ${msg.role === 'user' ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-800 border border-slate-100"}`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && <div className="flex gap-2 items-center text-slate-400 text-sm"><Loader2 className="animate-spin" size={14} /> Thinking...</div>}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-indigo-50 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about essays or college fit..."
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
