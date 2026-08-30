import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Video,
  Award,
  CheckCircle2,
  FileText,
  HelpCircle,
  Code2,
  DollarSign,
  Building2,
  LineChart,
  ShieldCheck,
  Zap,
  Play,
  Flame,
  Star,
  Users,
} from "lucide-react";
import { ScreenType } from "../../types";

interface LandingScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onStartQuickMock: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onNavigate,
  onStartQuickMock,
}) => {
  const [activeTab, setActiveTab] = useState<"technical" | "behavioral" | "system-design">("technical");

  const stats = [
    { label: "Mock Interviews Completed", value: "18,400+", icon: Video },
    { label: "Offer Acceptance Rate", value: "93.4%", icon: Award },
    { label: "Average Salary Boost", value: "+$42,000", icon: DollarSign },
    { label: "Curated Question Bank", value: "500+ Questions", icon: HelpCircle },
  ];

  const features = [
    {
      icon: Video,
      title: "Real-Time AI Mock Interviews",
      desc: "Simulate high-pressure FAANG & Fortune 500 loops with realistic voice avatars, live coding sandboxes, and instant diagnostic scoring.",
      action: () => onNavigate("mock-setup"),
      actionLabel: "Configure Session",
      badge: "Flagship",
    },
    {
      icon: FileText,
      title: "Resume ATS Match & Bullet Rewriter",
      desc: "Scan your resume against target job descriptions. Uncover missing tech keywords and transform weak points into high-impact STAR bullets.",
      action: () => onNavigate("resume-analyzer"),
      actionLabel: "Scan Resume",
    },
    {
      icon: Code2,
      title: "Algorithm Sandbox & Code Reviewer",
      desc: "Practice live coding problems in TypeScript, Python, and Java. Get instant AI critique on Big-O complexity and edge-case handling.",
      action: () => onNavigate("code-sandbox"),
      actionLabel: "Launch Arena",
    },
    {
      icon: Sparkles,
      title: "Behavioral STAR Story Builder",
      desc: "Craft punchy Situation-Task-Action-Result narratives with AI impact scoring that satisfy rigorous Amazon Bar Raisers and Google committees.",
      action: () => onNavigate("star-builder"),
      actionLabel: "Build Stories",
    },
    {
      icon: DollarSign,
      title: "Salary Intelligence & Counter-Offers",
      desc: "Access verified compensation percentiles across Tier-1 tech hubs. Generate professional counter-offer email scripts in one click.",
      action: () => onNavigate("salary-insights"),
      actionLabel: "Explore Compensation",
    },
    {
      icon: Building2,
      title: "Company-Specific Prep Blueprints",
      desc: "Deep dive into interview round formats, cultural rubrics, and real questions for Google, Amazon, Meta, Apple, Netflix, and Stripe.",
      action: () => onNavigate("company-guides"),
      actionLabel: "View Blueprints",
    },
  ];

  return (
    <div id="landing-screen" className="space-y-16 py-6 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 px-6 py-16 text-center sm:px-12 lg:py-20 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.18),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Next-Gen AI Interview Coaching Powered by Gemini 3.7</span>
          </div>

          {/* Heading */}
          <h1 className="font-['Outfit'] text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Practice Smarter. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Get Hired Faster.
            </span>
          </h1>

          {/* Tagline / Subtitle */}
          <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg lg:text-xl font-normal leading-relaxed">
            HireReady AI is the end-to-end interview preparation ecosystem. Master technical coding, system design, and behavioral STAR stories with real-time AI simulation and actionable analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="hero-start-mock-btn"
              onClick={onStartQuickMock}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Video className="h-4 w-4" />
              <span>Start Free AI Mock Interview</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              id="hero-dashboard-btn"
              onClick={() => onNavigate("dashboard")}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-all"
            >
              <span>Explore Candidate Hub</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Realistic FAANG Bar Raisers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Speech & Filler Words Analysis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Instant ATS Resume Feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Row */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 text-center backdrop-blur-sm"
            >
              <div className="mb-2 rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
                {st.value}
              </span>
              <span className="text-xs text-slate-400 mt-1">{st.label}</span>
            </div>
          );
        })}
      </section>

      {/* Interactive Mock Interview Preview Card */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              Interactive Preview
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl font-bold text-white font-['Outfit']">
              Live AI Interviewer Experience
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select an interview track to see how HireReady AI evaluates candidates in real-time.
            </p>
          </div>

          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            {(["technical", "behavioral", "system-design"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Live Simulation Card Frame */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: AI Interviewer Video Mock */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  AI Interviewer (Google Bar Raiser)
                </span>
              </div>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 font-mono">
                12:45 remaining
              </span>
            </div>

            {/* Avatar & Waveform visualization */}
            <div className="my-8 flex flex-col items-center justify-center space-y-4">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-xl shadow-indigo-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                  <Sparkles className="h-10 w-10 text-indigo-400 animate-pulse" />
                </div>
              </div>

              {/* Audio Waveform animation bars */}
              <div className="flex items-center gap-1">
                {[40, 70, 100, 60, 90, 45, 80, 55, 95, 60, 30].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1 rounded-full bg-indigo-500 transition-all duration-300"
                    style={{ height: `${h * 0.25}px` }}
                  />
                ))}
              </div>
              <p className="text-center text-xs text-indigo-300 font-medium italic">
                &ldquo;Could you explain how you would guarantee idempotency in payment processing under network retries?&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-900 pt-3 text-[11px] text-slate-400">
              <span>Speech Speed: 135 WPM</span>
              <span className="text-emerald-400 font-semibold">Clarity: 92%</span>
            </div>
          </div>

          {/* Right: Candidate Answer & Live Real-Time Feedback */}
          <div className="lg:col-span-7 space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Real-Time AI Evaluation Matrix
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                Score: 89 / 100
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                <span className="font-semibold text-slate-300 block mb-1">Candidate Transcript:</span>
                <p className="text-slate-400 leading-relaxed font-mono">
                  &ldquo;I would assign a unique deterministic idempotency key from the client header, store it in Redis with an atomic SETNX lock, and verify if the transaction ID already committed in PostgreSQL before executing the charge.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-3">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Key Strengths:
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    <li>Atomic SETNX lock pattern</li>
                    <li>Postgres commit verification</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-amber-950/30 border border-amber-500/20 p-3">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    AI Coaching Tip:
                  </span>
                  <p className="text-slate-300 leading-normal">
                    Mention TTL expiration on the lock to prevent zombie states if worker crashes.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("mock-setup")}
              className="w-full rounded-xl bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 py-2.5 text-xs font-semibold text-indigo-300 transition-colors flex items-center justify-center gap-2"
            >
              <span>Launch This Mock Interview Session</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Comprehensive Interview Arsenal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every tool required to ace technical rounds, behavioral screenings, and executive salary negotiations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-indigo-500/40 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    {feat.badge && (
                      <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Outfit'] text-base font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {feat.desc}
                  </p>
                </div>

                <button
                  onClick={feat.action}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  <span>{feat.actionLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Banner */}
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-1 text-amber-400 mb-1 justify-center sm:justify-start">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" />
            ))}
            <span className="ml-2 text-xs font-bold text-slate-300">4.9/5 Rating from 2,800+ Engineers</span>
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">
            &ldquo;HireReady AI helped me land an L5 offer at Google with a $65k compensation increase.&rdquo;
          </h3>
          <p className="text-xs text-slate-400">
            — Sarah Chen, Senior Software Engineer (Former Stripe Candidate)
          </p>
        </div>

        <div className="mt-6 sm:mt-0 shrink-0">
          <button
            onClick={() => onNavigate("mock-setup")}
            className="w-full sm:w-auto rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 text-xs shadow-lg transition-all active:scale-95"
          >
            Start Practicing Now
          </button>
        </div>
      </section>
    </div>
  );
};
