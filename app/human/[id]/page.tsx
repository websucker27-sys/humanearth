"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useParams } from "next/navigation";

type Human = {
  human_number: number;
  name: string;
  sentence: string;
  country: string;
  created_at: string;
};

export default function HumanPage() {
  const params = useParams();
  const [human, setHuman] = useState<Human | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchHuman() {
      const { data, error } = await supabase
        .from("signups")
        .select("human_number, name, sentence, country, created_at")
        .eq("human_number", params.id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setHuman(data);
      }
      setLoading(false);
    }

    fetchHuman();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <p className="text-gray-500 text-sm mb-4">This human page does not exist yet.</p>
        <a href="/" className="text-white text-sm underline">Return to Human Earth</a>
      </main>
    );
  }

  const year = human ? new Date(human.created_at).getFullYear() : "";

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">

      <a href="/" className="text-xs text-gray-600 uppercase tracking-widest mb-16 hover:text-gray-400 transition-colors">
        ← Human Earth
      </a>

      <div className="w-full max-w-lg text-center">

        <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">
          Human #{human?.human_number?.toLocaleString()}
        </p>

        <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight">
          {human?.name}
        </h1>

        <p className="text-gray-500 text-sm mb-16">
          {human?.country} · {year}
        </p>

        <div className="border border-white/10 rounded-2xl px-8 py-10 mb-16">
          <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
            "{human?.sentence}"
          </p>
        </div>

        <div className="border-t border-white/5 pt-10">
          <p className="text-gray-600 text-xs mb-6">
            This page is permanent. It will exist as long as the internet exists.
          </p>
          <a
            href="/register"
            className="bg-white text-black font-medium px-6 py-3 rounded-lg text-sm hover:bg-gray-200 transition-colors inline-block"
          >
            Claim your page
          </a>
        </div>

      </div>

    </main>
  );
}