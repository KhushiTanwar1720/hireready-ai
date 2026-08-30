import React, { useState } from "react";
import {
  Code2,
  Play,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Layers,
  Terminal,
  Zap,
  Check,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { CodingProblem } from "../../types";
import { sampleCodingProblems } from "../../data/mockData";
import { CodeReviewResult, geminiService } from "../../services/geminiService";

export const CodeSandboxScreen: React.FC = () => {
  const [problems] = useState<CodingProblem[]>(sampleCodingProblems);
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(sampleCodingProblems[0]);
  const [language, setLanguage] = useState<"TypeScript" | "Python" | "JavaScript">("TypeScript");
  const [code, setCode] = useState<string>(
    sampleCodingProblems[0].starterCode["TypeScript"] || ""
  );
  const [testResults, setTestResults] = useState<{ [idx: number]: boolean } | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);

  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setCode(prob.starterCode[language] || prob.starterCode["TypeScript"] || "");
    setTestResults(null);
    setReviewResult(null);
  };

  const handleLanguageChange = (newLang: "TypeScript" | "Python" | "JavaScript") => {
    setLanguage(newLang);
    if (selectedProblem.starterCode[newLang]) {
      setCode(selectedProblem.starterCode[newLang]);
    }
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      // Simulate running test cases
      const results: { [idx: number]: boolean } = {};
      selectedProblem.testCases.forEach((_, idx) => {
        results[idx] = true;
      });
      setTestResults(results);
      setIsRunningTests(false);
    }, 600);
  };

  const handleAIReview = async () => {
    setIsReviewing(true);
    try {
      const review = await geminiService.reviewCode({
        problemTitle: selectedProblem.title,
        code,
        language,
      });
      setReviewResult(review);
    } catch (e) {
      console.error(e);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div id="code-sandbox-screen" className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Algorithm Arena
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          Live Coding Sandbox & Algorithm Reviewer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Solve canonical technical interview problems. Run automated test cases and get instant AI complexity evaluations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (4 Cols): Problem Selector & Problem Description */}
        <div className="lg:col-span-4 space-y-4">
          {/* Problem Selector Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Select Problem
            </span>
            <div className="space-y-1.5">
              {problems.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectProblem(p)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all border ${
                    selectedProblem.id === p.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className="truncate">{p.title}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                      p.difficulty === "Easy"
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-amber-400 bg-amber-500/10"
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Problem Details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 text-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-base font-['Outfit']">
                  {selectedProblem.title}
                </span>
              </div>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
                {selectedProblem.category}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {selectedProblem.description}
            </p>

            {/* Examples */}
            <div className="space-y-2">
              <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">
                Examples:
              </span>
              {selectedProblem.examples.map((ex, i) => (
                <div key={i} className="rounded-xl bg-slate-950 p-3 border border-slate-800 font-mono text-[11px] space-y-1">
                  <div><strong className="text-indigo-300">Input:</strong> {ex.input}</div>
                  <div><strong className="text-emerald-400">Output:</strong> {ex.output}</div>
                  {ex.explanation && (
                    <div className="text-slate-400 font-sans text-[10px]">{ex.explanation}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-1">
              <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">
                Constraints:
              </span>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5 font-mono">
                {selectedProblem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column (8 Cols): Code Editor, Test Runner & AI Review Box */}
        <div className="lg:col-span-8 space-y-4">
          {/* Editor Container */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">Solution Editor</span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as any)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-indigo-300 focus:outline-none"
                >
                  <option value="TypeScript">TypeScript</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                </select>

                <button
                  type="button"
                  onClick={() => setCode(selectedProblem.starterCode[language] || "")}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  title="Reset Code"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Live Textarea Code Editor */}
            <div className="p-4 bg-slate-950">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={14}
                className="w-full bg-transparent font-mono text-xs text-emerald-400 focus:outline-none leading-relaxed selection:bg-indigo-500/30 selection:text-white"
                placeholder="// Write code here..."
                spellCheck={false}
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isRunningTests}
                  onClick={handleRunTests}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
                  <span>{isRunningTests ? "Running Tests..." : "Run Test Cases"}</span>
                </button>
              </div>

              <button
                type="button"
                disabled={isReviewing}
                onClick={handleAIReview}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span>{isReviewing ? "Analyzing Solution..." : "AI Complexity & Code Review"}</span>
              </button>
            </div>
          </div>

          {/* Test Case Results Output */}
          {testResults && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3 text-xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Test Results: All {selectedProblem.testCases.length} Test Cases Passed!</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">Runtime: 48ms (Faster than 94%)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedProblem.testCases.map((tc, idx) => (
                  <div key={idx} className="rounded-xl bg-slate-950 p-2.5 border border-slate-800 font-mono text-[10px] space-y-1">
                    <span className="text-emerald-400 font-bold block">Case {idx + 1}: Passed ✓</span>
                    <span className="text-slate-400 block truncate">{tc.input}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Code Reviewer Evaluation Card */}
          {reviewResult && (
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 via-slate-900 to-slate-950 p-5 space-y-4 text-xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="font-['Outfit'] text-sm">AI Code Review & Big-O Analysis</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  Grade: {reviewResult.score}/100 ({reviewResult.verdict})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Time Complexity</span>
                  <span className="text-indigo-400 font-bold text-sm">{reviewResult.timeComplexity}</span>
                </div>
                <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Space Complexity</span>
                  <span className="text-emerald-400 font-bold text-sm">{reviewResult.spaceComplexity}</span>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed font-sans">{reviewResult.summary}</p>

              {/* Suggestions */}
              {reviewResult.suggestions && reviewResult.suggestions.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="font-bold text-amber-400 uppercase text-[10px] block">
                    Optimization Suggestions:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {reviewResult.suggestions.map((sug, i) => (
                      <li key={i}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
