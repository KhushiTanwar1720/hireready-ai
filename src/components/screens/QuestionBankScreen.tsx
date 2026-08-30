import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code2,
  Building2,
  Star,
  ChevronRight,
  X,
  Play,
} from "lucide-react";
import { QuestionItem } from "../../types";
import { sampleQuestions } from "../../data/mockData";

export const QuestionBankScreen: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>(sampleQuestions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [activeModalQuestion, setActiveModalQuestion] = useState<QuestionItem | null>(null);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [aiEvaluation, setAiEvaluation] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const categories = [
    "All",
    "System Design",
    "Data Structures",
    "Algorithms",
    "Behavioral (STAR)",
    "Frontend",
    "Backend",
  ];

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const companies = ["All", "Google", "Amazon", "Meta", "Netflix", "Stripe", "Apple", "Uber"];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    const matchesCompany =
      selectedCompany === "All" || q.companies.includes(selectedCompany);
    return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany;
  });

  const handlePracticeSubmit = () => {
    if (!practiceAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setAiEvaluation(
        "Strong fundamental explanation! You accurately covered the primary architectural trade-offs. To elevate this to an L5/Senior rating, emphasize metric-driven edge cases and disaster-recovery replication lag."
      );
      setIsEvaluating(false);
    }, 1000);
  };

  return (
    <div id="question-bank-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Curated Tech Arsenal
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          500+ Curated Interview Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Filter by company target, difficulty tier, and domain. Practice with instant AI scoring and view verified FAANG model answers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by topic, algorithm, or concept (e.g. Rate Limiter, LRU, React, STAR)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty & Company Dropdowns */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Difficulties" : d}
                </option>
              ))}
            </select>

            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Companies" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const diffColor =
            q.difficulty === "Easy"
              ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
              : q.difficulty === "Medium"
              ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
              : "text-rose-400 bg-rose-500/10 border-rose-500/20";

          return (
            <div
              key={q.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-indigo-500/40 hover:bg-slate-900 transition-all"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${diffColor}`}>
                    {q.difficulty}
                  </span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                    {q.category}
                  </span>
                  {q.companies.slice(0, 3).map((comp, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-300"
                    >
                      {comp}
                    </span>
                  ))}
                </div>

                <h3 className="font-['Outfit'] text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {q.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {q.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalQuestion(q);
                    setPracticeAnswer("");
                    setAiEvaluation(null);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white px-4 py-2 text-xs font-semibold text-indigo-300 transition-all"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Practice Now</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-12 text-center text-slate-400 text-xs">
            No interview questions matched your query. Try resetting filters.
          </div>
        )}
      </div>

      {/* Interactive Practice & Model Answer Modal */}
      {activeModalQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModalQuestion(null)}
              className="absolute right-5 top-5 rounded-full bg-slate-800 p-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                  {activeModalQuestion.category}
                </span>
                <span className="text-xs text-slate-400">• {activeModalQuestion.difficulty}</span>
              </div>
              <h2 className="font-['Outfit'] text-lg sm:text-xl font-bold text-white">
                {activeModalQuestion.title}
              </h2>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {activeModalQuestion.description}
              </p>
            </div>

            {/* Answer Draft Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Your Answer / Explanation:
              </label>
              <textarea
                value={practiceAnswer}
                onChange={(e) => setPracticeAnswer(e.target.value)}
                placeholder="Draft your structured response here..."
                rows={6}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none font-sans"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={isEvaluating}
                  onClick={handlePracticeSubmit}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isEvaluating ? "Grading..." : "Get AI Instant Feedback"}</span>
                </button>
              </div>
            </div>

            {aiEvaluation && (
              <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/20 p-4 text-xs space-y-1.5 animate-fadeIn">
                <span className="font-bold text-indigo-300 block flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span>AI Grade & Feedback:</span>
                </span>
                <p className="text-slate-200 leading-relaxed">{aiEvaluation}</p>
              </div>
            )}

            {/* Verified Model Answer Box */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Verified FAANG Model Answer & Architecture:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {activeModalQuestion.modelAnswer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
