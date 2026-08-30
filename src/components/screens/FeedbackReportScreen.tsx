import React, { useState } from "react";
import {
  Award,
  BarChart2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Download,
  Share2,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Volume2,
  MessageSquare,
  HelpCircle,
  FileText,
} from "lucide-react";
import { FeedbackReportData, ScreenType } from "../../types";

interface FeedbackReportScreenProps {
  report: FeedbackReportData;
  onNavigate: (screen: ScreenType) => void;
  onRetakeMock: () => void;
}

export const FeedbackReportScreen: React.FC<FeedbackReportScreenProps> = ({
  report,
  onNavigate,
  onRetakeMock,
}) => {
  const [expandedTurn, setExpandedTurn] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const subScores = [
    { label: "Technical Accuracy", score: report.technicalAccuracy, color: "bg-indigo-500", text: "text-indigo-400" },
    { label: "STAR Compliance", score: report.starCompliance, color: "bg-purple-500", text: "text-purple-400" },
    { label: "Communication Clarity", score: report.communicationClarity, color: "bg-cyan-500", text: "text-cyan-400" },
    { label: "Confidence & Pacing", score: report.confidencePacing, color: "bg-amber-500", text: "text-amber-400" },
    { label: "Problem Solving", score: report.problemSolving, color: "bg-emerald-500", text: "text-emerald-400" },
  ];

  const handleExportPDF = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="feedback-report-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              Session Performance Diagnostic
            </span>
            <span className="text-xs text-slate-400">• {report.date}</span>
          </div>
          <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
            Interview Performance Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Target: <strong>{report.company}</strong> — {report.role} ({report.seniority})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-600 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copied ? "Link Copied!" : "Share Report"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-600 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-indigo-400" />
            <span>Export PDF</span>
          </button>

          <button
            type="button"
            onClick={onRetakeMock}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retake Mock</span>
          </button>
        </div>
      </div>

      {/* Main Diagnostic Summary Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Overall Score Badge Card */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20">
            <Award className="h-8 w-8" />
          </div>

          <div>
            <span className="font-['Outfit'] text-5xl font-extrabold text-white">
              {report.overallScore}
            </span>
            <span className="text-xl font-bold text-slate-400"> / 100</span>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              {report.overallScore >= 85 ? "Strong Hire Recommendation" : "Solid Candidate (Near Bar)"}
            </p>
          </div>

          <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
            Your structured architectural approach and clear pacing meet Google L5 / Amazon SDE III hiring standards.
          </p>

          <div className="w-full border-t border-slate-800 pt-4 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-xl bg-slate-900/80 p-2.5">
              <span className="block text-[10px] text-slate-400 uppercase">Pacing</span>
              <span className="font-bold text-white">{report.wordsPerMinute} WPM</span>
            </div>
            <div className="rounded-xl bg-slate-900/80 p-2.5">
              <span className="block text-[10px] text-slate-400 uppercase">Filler Words</span>
              <span className="font-bold text-amber-400">{report.fillerWordCount} Total</span>
            </div>
          </div>
        </div>

        {/* Competency Breakdown & Speech Metrics */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-indigo-400" />
              <h2 className="font-['Outfit'] text-base font-bold text-white">
                Detailed Skill Breakdown
              </h2>
            </div>
            <span className="text-xs text-slate-400">FAANG Rubric Analysis</span>
          </div>

          <div className="space-y-3.5">
            {subScores.map((s, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-300">{s.label}</span>
                  <span className={`font-bold ${s.text}`}>{s.score} / 100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color} transition-all duration-500`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Filler words breakdown pill */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-indigo-400" />
              <span className="font-semibold text-slate-300">Filler Word Counter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {report.fillerWords.map((fw, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300 border border-slate-800"
                >
                  &ldquo;{fw.word}&rdquo;: <strong className="text-amber-400">{fw.count}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Growth Areas Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Top Strengths */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-['Outfit'] text-base font-bold">Key Strengths Demonstrated</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-200">
            {report.topStrengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Growth Areas */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-['Outfit'] text-base font-bold">Critical High-Impact Fixes</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-200">
            {report.criticalGrowthAreas.map((gr, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>{gr}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question Deep Dive (Accordion) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-400" />
            <h3 className="font-['Outfit'] text-base font-bold text-white">
              Question-by-Question Diagnostic & Ideal Model Answers
            </h3>
          </div>
          <span className="text-xs text-slate-400">{report.turns.length} Questions Evaluated</span>
        </div>

        <div className="space-y-3">
          {report.turns.map((turn, idx) => {
            const isExpanded = expandedTurn === idx;
            return (
              <div
                key={turn.id || idx}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedTurn(isExpanded ? null : idx)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-900/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20 text-xs font-bold text-indigo-400 border border-indigo-500/30">
                      Q{turn.questionNumber || idx + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        {turn.category}
                      </span>
                      <p className="text-xs font-semibold text-white line-clamp-1">{turn.question}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                      Score: {turn.score || 85}%
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="space-y-4 border-t border-slate-800/80 p-4 text-xs">
                    {/* Candidate's submitted response */}
                    <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-300 block">Your Response:</span>
                      <p className="text-slate-300 leading-relaxed font-sans italic">
                        &ldquo;{turn.candidateAnswer}&rdquo;
                      </p>
                    </div>

                    {/* AI Feedback & Coaching */}
                    {turn.aiFeedback && (
                      <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/20 p-3.5 space-y-1">
                        <span className="font-bold text-indigo-300 block flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                          <span>AI Bar Raiser Feedback:</span>
                        </span>
                        <p className="text-slate-200 leading-relaxed">{turn.aiFeedback}</p>
                      </div>
                    )}

                    {/* Ideal Model Answer */}
                    <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-3.5 space-y-1">
                      <span className="font-bold text-emerald-400 block">
                        Model Ideal Answer (FAANG Standard):
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {turn.modelAnswer ||
                          "An optimal response articulates clear system boundaries, highlights trade-offs between latency vs consistency, and supports arguments with empirical metrics."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Personalized Action Plan */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h3 className="font-['Outfit'] text-base font-bold text-white">
              7-Day Personalized Action Plan
            </h3>
          </div>
          <span className="text-xs text-slate-400">Tailored to your weak areas</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {report.actionPlan.map((plan, i) => (
            <div
              key={i}
              onClick={() => plan.link && onNavigate(plan.link)}
              className="cursor-pointer group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 hover:border-indigo-500/40 hover:bg-slate-900 transition-all"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-indigo-400">{plan.day}</span>
                <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                  {plan.task}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
