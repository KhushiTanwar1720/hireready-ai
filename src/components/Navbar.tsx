import React from "react";
import {
  Sparkles,
  Flame,
  Play,
  User,
  Shield,
  Layers,
  ChevronRight,
  Brain,
  Video,
} from "lucide-react";
import { CandidateProfile, ScreenType } from "../types";

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  profile: CandidateProfile;
  onStartQuickMock: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  profile,
  onStartQuickMock,
}) => {
  const getScreenTitle = (screen: ScreenType): string => {
    switch (screen) {
      case "landing":
        return "Home & Features";
      case "dashboard":
        return "Candidate Hub";
      case "mock-setup":
        return "Configure Mock Interview";
      case "live-interview":
        return "Live AI Interview Room";
      case "feedback-report":
        return "Interview Performance Report";
      case "resume-analyzer":
        return "Resume ATS Optimizer";
      case "question-bank":
        return "Curated Question Bank";
      case "code-sandbox":
        return "Algorithm & Code Arena";
      case "star-builder":
        return "Behavioral STAR Builder";
      case "salary-insights":
        return "Salary Intelligence & Negotiation";
      case "company-guides":
        return "Company Prep Blueprints";
      case "analytics":
        return "Skill Readiness & Analytics";
      case "flashcards":
        return "Rapid Flashcard Drills";
      case "settings":
        return "Settings & Profile";
      default:
        return "HireReady AI";
    }
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            id="brand-logo-button"
            onClick={() => onNavigate("landing")}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950/90">
                <Brain className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-white font-['Outfit'] text-lg">
                HireReady <span className="text-indigo-400">AI</span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-1 hidden sm:block">
                Practice Smarter. Get Hired Faster.
              </p>
            </div>
          </button>

          {currentScreen !== "landing" && (
            <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex border-l border-slate-800 pl-4">
              <span
                onClick={() => onNavigate("dashboard")}
                className="cursor-pointer hover:text-slate-200 transition-colors"
              >
                Dashboard
              </span>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <span className="font-medium text-indigo-300">{getScreenTitle(currentScreen)}</span>
            </div>
          )}
        </div>

        {/* Right: Streak, Quick Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Practice Streak Badge */}
          <div
            id="streak-badge"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 shadow-sm"
            title="Daily Practice Streak"
          >
            <Flame className="h-4 w-4 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{profile.streakDays} Day Streak</span>
          </div>

          {/* Readiness Score Pill */}
          <button
            id="readiness-nav-pill"
            onClick={() => onNavigate("analytics")}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 transition-all"
          >
            <span className="text-slate-400">Readiness:</span>
            <span className="font-bold text-emerald-400">{profile.readinessScore}%</span>
            <div className="h-2 w-12 rounded-full bg-slate-800 overflow-hidden hidden md:block">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                style={{ width: `${profile.readinessScore}%` }}
              />
            </div>
          </button>

          {/* Quick Mock Interview Button */}
          {currentScreen !== "live-interview" && (
            <button
              id="start-mock-nav-btn"
              onClick={onStartQuickMock}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Video className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Start AI Mock</span>
              <span className="sm:hidden">Mock</span>
            </button>
          )}

          {/* User Profile / Settings Trigger */}
          <button
            id="user-profile-button"
            onClick={() => onNavigate("settings")}
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 p-1 pr-2.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-xs font-bold text-white shadow">
              AR
            </div>
            <span className="hidden lg:inline font-medium text-slate-200">{profile.name.split(" ")[0]}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
