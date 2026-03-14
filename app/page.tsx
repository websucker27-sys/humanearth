"use client";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export default function Home() {
  const [count, setCount] = useState(8109442017);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase
      .from("signups")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        setError("This email is already registered.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">

      <p className="text-xs tracking-widest text-gray-500 uppercase mb-6">
        March 13, 2026
      </p>

      <h1 className="text-5xl md:text-7xl font-medium text-center tracking-tight mb-4">
        Human Earth
      </h1>

      <p className="text-lg md:text-xl text-gray-400 text-center max-w-xl mb-12 leading-relaxed">
        Every person on earth. One permanent page. One sentence. Forever.
        The human layer of the internet — owned by no one, belonging to everyone.
      </p>

      <div className="flex flex-col items-center mb-16">
        <span className="text-6xl md:text-8xl font-medium tabular-nums tracking-tight">
          {count.toLocaleString()}
        </span>
        <span className="text-gray-500 text-sm mt-2">
          humans registered — join them
        </span>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black font-medium px-6 py-3 rounded-lg text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Claim your page"}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-green-400 text-lg font-medium">You are on the list.</p>
          <p className="text-gray-500 text-sm mt-1">We will contact you when your page is ready.</p>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm mt-3">{error}</p>
      )}

      <div className="mt-24 border-t border-white/5 pt-12 w-full max-w-2xl">
        <p className="text-xs text-gray-600 text-center mb-8 uppercase tracking-widest">Recent humans</p>
        <div className="flex flex-col gap-4">
          {[
            { num: "8,109,441,892", text: "I loved my children more than they ever knew.", location: "Lagos, Nigeria" },
            { num: "8,109,441,651", text: "Curiosity was the only religion I kept my whole life.", location: "Osaka, Japan" },
            { num: "8,109,440,887", text: "I taught for 34 years. I hope one of them remembers.", location: "São Paulo, Brazil" },
          ].map((h) => (
            <div key={h.num} className="border border-white/5 rounded-lg px-5 py-4">
              <p className="text-white text-sm leading-relaxed">"{h.text}"</p>
              <p className="text-gray-600 text-xs mt-2">Human #{h.num} · {h.location}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}