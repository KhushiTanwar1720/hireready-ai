import React from "react";
import {
  LineChart,
  BarChart2,
  TrendingUp,
  Award,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { CandidateProfile, FeedbackReportData } from "../../types";

interface AnalyticsScreenProps {
  profile: CandidateProfile;
  lastReport: FeedbackReportData;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  profile,
  lastReport,
}) => {
  const scoreHistory = [
    { date: "Aug 10", score: 68 },
    { date: "Aug 15", score: 74 },
    { date: "Aug 20", score: 78 },
    { date: "Aug 25", score: 82 },
    { date: "Aug 29", score: 86 },
    { date: "Today", score: profile.readinessScore },
  ];

  const competencies = [
    { name: "System Design & Architecture", score: 88, target: 85, status: "Ready" },
    { name: "Algorithms & Big-O Analysis", score: 85, target: 80, status: "Ready" },
    { name: "STAR Behavioral Structure", score: 82, target: 85, status: "Near Target" },
    { name: "Communication & Pacing", score: 86, target: 80, status: "Ready" },
    { name: "Live Debugging & Edge Cases", score: 79, target: 80, status: "Needs Drill" },
  ];

  return (
    <div id="analytics-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Diagnostic Intelligence
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          Performance Analytics & Skill Radar
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Track historical score progression, identify weak competency gaps, and benchmark readiness against FAANG hiring bars.
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
            Overall Readiness
          </span>
          <span className="font-['Outfit'] text-3xl font-extrabold text-emerald-400">
            {profile.readinessScore}%
          </span>
          <span className="text-[11px] text-emerald-300 block mt-1">+18% over 30 days</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
            Active Streak
          </span>
          <span className="font-['Outfit'] text-3xl font-extrabold text-amber-400 flex items-center justify-center gap-1">
            <Flame className="h-6 w-6 fill-amber-400" />
            <span>{profile.streakDays} Days</span>
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Daily consistency</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
            Questions Mastered
          </span>
          <span className="font-['Outfit'] text-3xl font-extrabold text-indigo-400">
            {profile.questionsSolvedCount}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Across 8 categories</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
            Mocks Completed
          </span>
          <span className="font-['Outfit'] text-3xl font-extrabold text-cyan-400">
            {profile.completedMocksCount}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Average score: 84%</span>
        </div>
      </div>

      {/* Historical Trend Chart Simulation */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            <h2 className="font-['Outfit'] text-base sm:text-lg font-bold text-white">
              Mock Score Progression Trajectory
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">Tier-1 Threshold: 85%</span>
        </div>

        {/* Visual Bar Graph */}
        <div className="h-48 flex items-end justify-between gap-2 sm:gap-6 pt-6 px-2 sm:px-6">
          {scoreHistory.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-[11px] font-mono font-bold text-indigo-300">{item.score}%</span>
              <div
                className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-indigo-600 to-cyan-400 transition-all duration-700 hover:opacity-90"
                style={{ height: `${(item.score / 100) * 100}%` }}
              />
              <span className="text-[10px] text-slate-400 mt-1">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Competency Gap Analysis */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="font-['Outfit'] text-base sm:text-lg font-bold text-white">
            Target Competency Benchmarking vs. FAANG L5 Bar
          </h2>
          <span className="text-xs text-slate-400">Target Role: {profile.targetRole}</span>
        </div>

        <div className="space-y-4">
          {competencies.map((comp, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-white text-sm">{comp.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">
                    Your Score: <strong className="text-indigo-400">{comp.score}%</strong> (Target: {comp.target}%)
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      comp.status === "Ready"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {comp.status}
                  </span>
                </div>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${comp.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
