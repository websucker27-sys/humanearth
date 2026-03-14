"use client";
import { useState } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";

const countries = [
  "Afghanistan","Albania","Algeria","Angola","Argentina","Australia","Austria","Bangladesh",
  "Belgium","Bolivia","Brazil","Cameroon","Canada","Chile","China","Colombia","Congo",
  "Cuba","Denmark","Ecuador","Egypt","Ethiopia","Finland","France","Germany","Ghana",
  "Greece","Guatemala","Haiti","Honduras","Hungary","India","Indonesia","Iran","Iraq",
  "Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kenya","Madagascar","Malaysia",
  "Mali","Mexico","Morocco","Mozambique","Myanmar","Nepal","Netherlands","New Zealand",
  "Nicaragua","Niger","Nigeria","Norway","Pakistan","Panama","Paraguay","Peru","Philippines",
  "Poland","Portugal","Romania","Russia","Rwanda","Saudi Arabia","Senegal","Sierra Leone",
  "Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland",
  "Syria","Tanzania","Thailand","Tunisia","Turkey","Uganda","Ukraine","United Kingdom",
  "United States","Uruguay","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe","Other"
];

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("signups")
      .update({ name, country, sentence })
      .eq("email", email)
      .select()
      .single();

    if (error) {
      setError("Email not found. Please sign up on the homepage first.");
      setLoading(false);
      return;
    }

    router.push(`/human/${data.human_number}`);
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">

      <a href="/" className="text-xs text-gray-600 uppercase tracking-widest mb-12 hover:text-gray-400 transition-colors">
        ← Human Earth
      </a>

      {step === 1 && (
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-medium text-center mb-2">Claim your page</h1>
          <p className="text-gray-500 text-center text-sm mb-10">Enter the email you signed up with</p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 text-sm w-full"
            />
            <button
              onClick={() => { if (email) setStep(2); }}
              className="bg-white text-black font-medium px-6 py-3 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h1 className="text-3xl font-medium text-center mb-2">Your permanent page</h1>
          <p className="text-gray-500 text-center text-sm mb-10">This is forever. Take your time.</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Your name</label>
              <input
                type="text"
                required
                placeholder="What should humanity call you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 text-sm w-full"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Your country</label>
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm w-full"
              >
                <option value="">Select your country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">
                Your one sentence — what do you want humanity to remember?
              </label>
              <textarea
                required
                maxLength={280}
                placeholder="Write one sentence. Make it yours."
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                rows={4}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 text-sm w-full resize-none"
              />
              <p className="text-gray-600 text-xs mt-1 text-right">{sentence.length}/280</p>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !name || !country || !sentence}
              className="bg-white text-black font-medium px-6 py-3 rounded-lg text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Creating your page..." : "Create my permanent page"}
            </button>
          </div>
        </form>
      )}

    </main>
  );
}