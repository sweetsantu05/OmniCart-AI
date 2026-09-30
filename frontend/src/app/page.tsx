"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setReply(data.reply || data.detail || "No response");
    } catch (err) {
      setReply("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h1 className="text-xl font-bold mb-4 text-emerald-400">Full stack - Prep Test</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something (e.g. Recommend a laptop)..."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send Prompt"}
          </button>
        </form>

        {reply && (
          <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-sm whitespace-pre-line text-slate-200">
            {reply}
          </div>
        )}
      </div>
    </main>
  );
}