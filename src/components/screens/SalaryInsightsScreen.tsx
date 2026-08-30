import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  Building2,
  Copy,
  Check,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Send,
} from "lucide-react";
import { sampleSalaryData } from "../../data/mockData";
import { SalaryInsight } from "../../types";
import { geminiService } from "../../services/geminiService";

export const SalaryInsightsScreen: React.FC = () => {
  const [data] = useState<SalaryInsight[]>(sampleSalaryData);
  const [selectedComp, setSelectedComp] = useState<SalaryInsight>(sampleSalaryData[0]);

  // Negotiation Script generator form
  const [role, setRole] = useState("Senior Full-Stack Engineer");
  const [company, setCompany] = useState("Google");
  const [currentOffer, setCurrentOffer] = useState("$320,000 Total Compensation ($190k Base + $100k Equity + $30k Bonus)");
  const [targetCompensation, setTargetCompensation] = useState("$365,000 Total Compensation");
  const [competingOffers, setCompetingOffers] = useState("Meta ($350k TC offer on the table)");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(
    `Subject: Follow-up regarding Senior Software Engineer offer — Alex Rivera\n\nDear Recruiter,\n\nThank you so much for extending the offer to join Google as a Senior Software Engineer. I am genuinely thrilled about the team's mission and the impactful work we discussed throughout the interview process.\n\nAfter reviewing the details of the offer against current market benchmarks for L5 in the Bay Area, as well as a competing offer I have received at $350,000 TC, I would be ready to sign immediately if we could bring the total compensation closer to $365,000—specifically by adjusting the equity component or initial signing bonus.\n\nI am confident in my ability to hit the ground running and drive immediate architectural impact for the team. Please let me know if we can discuss this further.\n\nWarm regards,\nAlex Rivera`
  );
  const [copied, setCopied] = useState(false);

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    try {
      const result = await geminiService.generateSalaryNegotiation({
        role,
        company,
        currentOffer,
        targetCompensation,
        competingOffers,
        experienceYears: 7,
      });
      setGeneratedScript(result.emailDraft);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id="salary-insights-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Compensation Intelligence
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          Salary Benchmarks & AI Counter-Offer Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Compare verified FAANG & Tier-1 tech salary percentiles. Generate customized counter-offer scripts to maximize total compensation.
        </p>
      </div>

      {/* Verified Percentiles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-['Outfit'] text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span>Tier-1 Tech Compensation Bands (2025-2026 Data)</span>
          </h2>
          <span className="text-xs text-slate-400">Location: SF Bay Area / Seattle / NYC</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedComp(item)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all space-y-4 ${
                selectedComp.id === item.id
                  ? "border-emerald-500/50 bg-slate-900/90 shadow-xl shadow-emerald-500/5"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-sm block">{item.company}</span>
                  <span className="text-xs text-emerald-400 font-semibold">{item.level} ({item.role})</span>
                </div>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                  {item.location}
                </span>
              </div>

              {/* Total Comp Highlight */}
              <div className="rounded-xl bg-slate-950 p-3 text-center border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Median Total Comp</span>
                <span className="font-['Outfit'] text-2xl font-extrabold text-white">
                  ${(item.totalCompensation / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-emerald-400 block">Top 10%: ${(item.p90 / 1000).toFixed(0)}k</span>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Base Salary:</span>
                  <span className="font-bold">${(item.baseSalary / 1000).toFixed(0)}k / yr</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Stock / RSU:</span>
                  <span className="font-bold text-indigo-400">${(item.stockGrantPerYear / 1000).toFixed(0)}k / yr</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Signing Bonus:</span>
                  <span className="font-bold text-amber-400">${(item.signingBonus / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Counter-Offer Generator Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              AI Offer Negotiator
            </span>
            <h2 className="mt-2 font-['Outfit'] text-lg sm:text-xl font-bold text-white">
              Generate High-Leverage Counter-Offer Email
            </h2>
          </div>
          <Sparkles className="h-6 w-6 text-indigo-400" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Input Form */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Company Offering:</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Initial Offer Extended:</label>
              <input
                type="text"
                value={currentOffer}
                onChange={(e) => setCurrentOffer(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Target Counter Total Comp:</label>
              <input
                type="text"
                value={targetCompensation}
                onChange={(e) => setTargetCompensation(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Competing Offers / Leverage:</label>
              <input
                type="text"
                value={competingOffers}
                onChange={(e) => setCompetingOffers(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerateScript}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span>{isGenerating ? "Drafting Negotiation..." : "Generate AI Counter-Offer Email"}</span>
            </button>
          </div>

          {/* Right: Generated Script */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AI Email Negotiation Draft
              </span>
              {generatedScript && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
              )}
            </div>

            <textarea
              readOnly
              value={generatedScript || ""}
              rows={12}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 font-sans text-xs text-slate-200 focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
