import React, { useState } from "react";
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Plus,
  Bookmark,
  Layers,
  ArrowRight,
  TrendingUp,
  Tag,
} from "lucide-react";
import { sampleStarStories } from "../../data/mockData";
import { StarStory } from "../../types";
import { geminiService } from "../../services/geminiService";

export const StarBuilderScreen: React.FC = () => {
  const [stories, setStories] = useState<StarStory[]>(sampleStarStories);
  const [selectedStory, setSelectedStory] = useState<StarStory>(sampleStarStories[0]);

  // Form State
  const [title, setTitle] = useState(sampleStarStories[0].title);
  const [category, setCategory] = useState(sampleStarStories[0].category);
  const [situation, setSituation] = useState(sampleStarStories[0].situation);
  const [task, setTask] = useState(sampleStarStories[0].task);
  const [action, setAction] = useState(sampleStarStories[0].action);
  const [result, setResult] = useState(sampleStarStories[0].result);
  const [selectedTags, setSelectedTags] = useState<string[]>(sampleStarStories[0].tags);

  const [isScoring, setIsScoring] = useState(false);
  const [aiScoreFeedback, setAiScoreFeedback] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const availableTags = [
    "Conflict Resolution",
    "Customer Obsession",
    "Technical Failure",
    "Leadership Under Pressure",
    "Zero Downtime",
    "Performance Optimization",
    "Ownership",
    "Bias for Action",
  ];

  const handleSelectStory = (st: StarStory) => {
    setSelectedStory(st);
    setTitle(st.title);
    setCategory(st.category);
    setSituation(st.situation);
    setTask(st.task);
    setAction(st.action);
    setResult(st.result);
    setSelectedTags(st.tags);
    setAiScoreFeedback(null);
  };

  const handleNewStory = () => {
    const newSt: StarStory = {
      id: `star-${Date.now()}`,
      title: "New STAR Narrative",
      category: "Ownership & Execution",
      situation: "",
      task: "",
      action: "",
      result: "",
      tags: ["Ownership"],
      score: 80,
      deliveryTips: ["Focus on concrete technical ownership", "Quantify measurable end impact"],
      potentialFollowUps: ["How did you align stakeholders during the process?"],
      lastEdited: "Just now",
    };
    setStories([newSt, ...stories]);
    handleSelectStory(newSt);
  };

  const handleScoreStory = async () => {
    setIsScoring(true);
    try {
      const evaluation = await geminiService.refineSTARStory({
        situation,
        task,
        action,
        result,
        roleCategory: category,
      });
      setAiScoreFeedback(evaluation);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScoring(false);
    }
  };

  const handleCopyFullNarrative = () => {
    const full = `TITLE: ${title}\n\nSITUATION: ${situation}\n\nTASK: ${task}\n\nACTION: ${action}\n\nRESULT: ${result}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTag = (t: string) => {
    if (selectedTags.includes(t)) {
      setSelectedTags(selectedTags.filter((x) => x !== t));
    } else {
      setSelectedTags([...selectedTags, t]);
    }
  };

  return (
    <div id="star-builder-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            Behavioral Mastery
          </span>
          <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
            STAR Story Builder & Impact Scorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Structure compelling Situation-Task-Action-Result stories tailored for Amazon Bar Raisers and FAANG behavioral loops.
          </p>
        </div>

        <button
          type="button"
          onClick={handleNewStory}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Story</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (4 Cols): Story Vault */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Your Story Repository ({stories.length})
            </span>

            <div className="space-y-2">
              {stories.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleSelectStory(st)}
                  className={`w-full rounded-xl p-3.5 text-left transition-all border ${
                    selectedStory.id === st.id
                      ? "bg-indigo-600/20 border-indigo-500 shadow"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white truncate">{st.title}</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                      {st.score || 88}%
                    </span>
                  </div>
                  <span className="text-[10px] text-indigo-300 block mb-2">{st.category}</span>
                  <div className="flex flex-wrap gap-1">
                    {st.tags.slice(0, 2).map((tg, i) => (
                      <span
                        key={i}
                        className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] text-slate-400"
                      >
                        #{tg}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (8 Cols): Structured STAR Form & AI Evaluation */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main STAR Form Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent font-['Outfit'] text-base sm:text-lg font-bold text-white focus:outline-none border-b border-dashed border-slate-700 focus:border-indigo-500"
                placeholder="Story Title (e.g. Scaling Payments Under Black Friday)"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyFullNarrative}
                  className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-600 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy Full"}</span>
                </button>

                <button
                  type="button"
                  disabled={isScoring}
                  onClick={handleScoreStory}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                  <span>{isScoring ? "Evaluating..." : "Score STAR with AI"}</span>
                </button>
              </div>
            </div>

            {/* S - T - A - R Inputs */}
            <div className="space-y-4">
              {/* Situation */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <span>S — Situation (Context & Scale)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Target: 15% of answer</span>
                </label>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none leading-relaxed"
                  placeholder="What was the business background, scale, and immediate crisis/challenge?"
                />
              </div>

              {/* Task */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <span>T — Task (Your Responsibility)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Target: 15% of answer</span>
                </label>
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none leading-relaxed"
                  placeholder="What was your specific individual ownership and the success criteria?"
                />
              </div>

              {/* Action */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400">
                  <span>A — Action (Concrete Steps You Executed)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Target: 50% of answer</span>
                </label>
                <textarea
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none leading-relaxed"
                  placeholder="Detail the technical decisions, architecture, cross-team influence, and exact steps you took."
                />
              </div>

              {/* Result */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <span>R — Result (Quantified Business Impact & Learnings)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Target: 20% of answer</span>
                </label>
                <textarea
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none leading-relaxed"
                  placeholder="What were the quantifiable metrics (latency reduction, $ saved, uptime, adoption rate)?"
                />
              </div>
            </div>

            {/* Tag Selector */}
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-indigo-400" />
                <span>Applicable Leadership Principles & Tags:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tg) => {
                  const active = selectedTags.includes(tg);
                  return (
                    <button
                      key={tg}
                      type="button"
                      onClick={() => toggleTag(tg)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                        active
                          ? "bg-indigo-600 text-white shadow"
                          : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                      }`}
                    >
                      #{tg}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Score Feedback Box */}
          {aiScoreFeedback && (
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 via-slate-900 to-slate-950 p-6 space-y-4 text-xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="font-['Outfit'] text-sm">AI STAR Coach Diagnostic</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  STAR Score: {aiScoreFeedback.score}/100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-3 space-y-1">
                  <span className="font-bold text-emerald-400 block uppercase text-[10px]">
                    Strengths:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {aiScoreFeedback.strengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-3 space-y-1">
                  <span className="font-bold text-amber-400 uppercase text-[10px] block">
                    Growth Fixes:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {aiScoreFeedback.improvements?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {aiScoreFeedback.improvedVersion && (
                <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-indigo-300 block">
                    AI Enhanced Story Delivery Version:
                  </span>
                  <p className="text-slate-300 leading-relaxed italic">
                    &ldquo;{aiScoreFeedback.improvedVersion}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
