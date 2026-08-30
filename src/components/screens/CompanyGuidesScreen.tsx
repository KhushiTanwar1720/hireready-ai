import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Users,
  Award,
  Layers,
  ShieldCheck,
  Video,
} from "lucide-react";
import { sampleCompanyGuides } from "../../data/mockData";
import { CompanyGuide, ScreenType } from "../../types";

interface CompanyGuidesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onLaunchMockForCompany: (companyName: string) => void;
}

export const CompanyGuidesScreen: React.FC<CompanyGuidesScreenProps> = ({
  onNavigate,
  onLaunchMockForCompany,
}) => {
  const [guides] = useState<CompanyGuide[]>(sampleCompanyGuides);
  const [selectedGuide, setSelectedGuide] = useState<CompanyGuide>(sampleCompanyGuides[0]);

  return (
    <div id="company-guides-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Company Blueprints
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          FAANG & Tier-1 Company Interview Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Verified round structures, Bar Raiser cultural rubrics, and insider preparation strategies for top tech companies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Company Selector Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Select Company
          </span>
          {guides.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGuide(g)}
              className={`w-full rounded-2xl p-4 text-left transition-all border ${
                selectedGuide.id === g.id
                  ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/5"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-['Outfit'] font-bold text-sm text-white">{g.name}</span>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  {g.interviewRounds?.length || g.rounds?.length || 4} Rounds
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{g.prepStrategy || g.overview || g.tagline}</p>
            </button>
          ))}
        </div>

        {/* Right: Company Deep-Dive Blueprint */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="font-['Outfit'] text-2xl font-extrabold text-white">
                  {selectedGuide.name} Interview Blueprint
                </h2>
                <p className="text-xs text-slate-400 mt-1">{selectedGuide.tagline || selectedGuide.overview}</p>
              </div>

              <button
                type="button"
                onClick={() => onLaunchMockForCompany(selectedGuide.name)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 shrink-0"
              >
                <Video className="h-4 w-4" />
                <span>Simulate {selectedGuide.name} Loop</span>
              </button>
            </div>

            {/* Rounds Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Onsite Interview Format & Rounds:
              </h3>
              <div className="space-y-2.5">
                {(selectedGuide.interviewRounds || []).map((rnd, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 font-bold text-indigo-400">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-bold text-white block">{rnd.roundName}</span>
                        <span className="text-[11px] text-slate-400">{rnd.focus} — {rnd.tips}</span>
                      </div>
                    </div>
                    <span className="rounded bg-slate-900 px-2 py-1 text-[10px] font-mono text-slate-300">
                      {rnd.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Culture & Core Values */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Core Leadership Principles & Evaluation Rubric:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedGuide.coreValues.map((val, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      {typeof val === "string" ? (
                        <span>{val}</span>
                      ) : (
                        <>
                          <strong className="text-white block">{val.title}</strong>
                          <span className="text-[11px] text-slate-400">{val.description}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Preparation Tips & Frequently Asked */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Frequently Asked FAANG Questions:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200 list-disc list-inside">
                {(selectedGuide.frequentlyAsked || selectedGuide.tips || []).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
