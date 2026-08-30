import React from "react";
import {
  Sparkles,
  Flame,
  Award,
  Video,
  FileText,
  HelpCircle,
  Code2,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Target,
  BarChart2,
  Zap,
} from "lucide-react";
import { CandidateProfile, FeedbackReportData, ScreenType } from "../../types";

interface DashboardScreenProps {
  profile: CandidateProfile;
  lastReport: FeedbackReportData;
  onNavigate: (screen: ScreenType) => void;
  onStartQuickMock: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  profile,
  lastReport,
  onNavigate,
  onStartQuickMock,
}) => {
  const readinessMetrics = [
    { label: "Technical Accuracy", score: 88, color: "bg-indigo-500", text: "text-indigo-400" },
    { label: "STAR Structure", score: 82, color: "bg-purple-500", text: "text-purple-400" },
    { label: "Communication & Clarity", score: 86, color: "bg-cyan-500", text: "text-cyan-400" },
    { label: "Confidence & Pacing", score: 79, color: "bg-amber-500", text: "text-amber-400" },
    { label: "Problem Solving Agility", score: 85, color: "bg-emerald-500", text: "text-emerald-400" },
  ];

  const upcomingInterviews = [
    { company: "Google", role: "Senior Software Engineer (L5)", round: "System Design & Googleyness", date: "Thursday, Sep 4, 2:00 PM", status: "In 3 Days" },
    { company: "Stripe", role: "Staff Frontend Engineer", round: "Full-Stack Bug Hunt & Architecture", date: "Monday, Sep 8, 10:30 AM", status: "In 7 Days" },
  ];

  return (
    <div id="dashboard-screen" className="space-y-8 pb-16">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                Target: {profile.targetRole}
              </span>
              <span className="text-xs text-slate-400">• {profile.targetCompanyTier}</span>
            </div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {profile.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              You are currently <strong className="text-emerald-400">{profile.readinessScore}% interview-ready</strong> for top-tier tech loops. Complete today&apos;s daily drill to keep your {profile.streakDays}-day streak active.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="dashboard-start-mock-btn"
              onClick={onStartQuickMock}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Video className="h-4 w-4" />
              <span>Launch Mock Interview</span>
            </button>

            <button
              id="dashboard-resume-btn"
              onClick={() => onNavigate("resume-analyzer")}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-all"
            >
              <FileText className="h-4 w-4 text-indigo-400" />
              <span>Audit Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Readiness Gauge & Metric Bars Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Overall Readiness Gauge Card */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-400" />
              <h2 className="font-['Outfit'] text-base font-bold text-white">
                Interview Readiness Index
              </h2>
            </div>
            <button
              onClick={() => onNavigate("analytics")}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>View Radar</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Radial Circular Display */}
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center">
              {/* Circular SVG Ring */}
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-emerald-500 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * profile.readinessScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-['Outfit'] text-4xl font-extrabold text-white">
                  {profile.readinessScore}%
                </span>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Tier 1 Ready
                </span>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400 max-w-xs">
              Based on {profile.completedMocksCount} mock sessions and {profile.questionsSolvedCount} solved questions.
            </p>
          </div>

          {/* Mini Stat Pills */}
          <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-4 text-center">
            <div className="rounded-xl bg-slate-950 p-2.5">
              <span className="block text-[10px] text-slate-400 uppercase">Mocks Done</span>
              <span className="font-bold text-white text-sm">{profile.completedMocksCount}</span>
            </div>
            <div className="rounded-xl bg-slate-950 p-2.5">
              <span className="block text-[10px] text-slate-400 uppercase">Streak</span>
              <span className="font-bold text-amber-400 text-sm flex items-center justify-center gap-1">
                <Flame className="h-3.5 w-3.5 fill-amber-400" /> {profile.streakDays}d
              </span>
            </div>
            <div className="rounded-xl bg-slate-950 p-2.5">
              <span className="block text-[10px] text-slate-400 uppercase">Avg Score</span>
              <span className="font-bold text-indigo-400 text-sm">84%</span>
            </div>
          </div>
        </div>

        {/* Right: Competency Breakdown Bars */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-indigo-400" />
              <h2 className="font-['Outfit'] text-base font-bold text-white">
                Skill Competency Breakdown
              </h2>
            </div>
            <span className="text-xs text-slate-400">FAANG Hiring Standard</span>
          </div>

          <div className="space-y-4">
            {readinessMetrics.map((met, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-300">{met.label}</span>
                  <span className={`font-bold ${met.text}`}>{met.score} / 100</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${met.color} transition-all duration-500`}
                    style={{ width: `${met.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick recommendations callout */}
          <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/20 p-3.5 flex items-start gap-3">
            <Zap className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-indigo-300 block">AI Recommended Focus for Today:</span>
              <p className="text-slate-300">
                Sharpen <strong>Confidence & Pacing</strong> by doing a rapid 15-minute Behavioral STAR session with a strict Bar Raiser persona.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column: Upcoming Interviews & Recommended Study Path */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Upcoming Scheduled Interviews */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-400" />
              <h3 className="font-['Outfit'] text-base font-bold text-white">
                Upcoming Real-World Loops
              </h3>
            </div>
            <button
              onClick={() => onNavigate("company-guides")}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Company Intel
            </button>
          </div>

          <div className="space-y-3">
            {upcomingInterviews.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.company}</span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-medium">{item.role}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {item.date}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("mock-setup")}
                  className="rounded-lg bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 px-3 py-1.5 text-xs font-semibold text-indigo-300 shrink-0 transition-all"
                >
                  Simulate Loop
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 7-Day Personalized Action Plan */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="font-['Outfit'] text-base font-bold text-white">
                Personalized Preparation Roadmap
              </h3>
            </div>
            <button
              onClick={() => onNavigate("feedback-report")}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Latest Report
            </button>
          </div>

          <div className="space-y-2.5">
            {lastReport.actionPlan.slice(0, 4).map((plan, i) => (
              <div
                key={i}
                onClick={() => plan.link && onNavigate(plan.link)}
                className="cursor-pointer group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-indigo-400 border border-slate-800">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      {plan.day}
                    </span>
                    <p className="text-xs text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {plan.task}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Launch Cards Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Curated Question Bank", desc: "500+ Top Tech Questions", icon: HelpCircle, screen: "question-bank" as ScreenType, color: "text-cyan-400" },
          { label: "STAR Story Coach", desc: "Craft Winning Narratives", icon: Sparkles, screen: "star-builder" as ScreenType, color: "text-purple-400" },
          { label: "Algorithm Sandbox", desc: "Run Code & Get Review", icon: Code2, screen: "code-sandbox" as ScreenType, color: "text-emerald-400" },
          { label: "Salary Intelligence", desc: "Compare Bands & Counter", icon: DollarSign, screen: "salary-insights" as ScreenType, color: "text-amber-400" },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <button
              key={i}
              onClick={() => onNavigate(c.screen)}
              className="flex flex-col text-left justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-4 hover:border-slate-700 hover:bg-slate-900 transition-all group"
            >
              <div className={`mb-3 rounded-xl bg-slate-950 p-2.5 w-fit border border-slate-800 group-hover:scale-105 transition-transform ${c.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block font-['Outfit']">{c.label}</span>
                <span className="text-[11px] text-slate-400">{c.desc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
