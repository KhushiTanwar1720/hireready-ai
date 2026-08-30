import React, { useState } from "react";
import {
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Search,
  Briefcase,
  Layers,
} from "lucide-react";
import { geminiService, ResumeAnalysisResult } from "../../services/geminiService";

export const ResumeAnalyzerScreen: React.FC = () => {
  const [targetRole, setTargetRole] = useState("Senior Full-Stack Engineer");
  const [targetCompany, setTargetCompany] = useState("Google / Tier-1 Tech");
  const [resumeText, setResumeText] = useState(
    `ALEX RIVERA\nSan Francisco, CA | alex.rivera@example.com | github.com/alexrivera\n\nSUMMARY\nSenior Full-Stack Engineer with 7+ years of experience building high-scale web platforms using React, TypeScript, Node.js, and PostgreSQL.\n\nEXPERIENCE\nSenior Software Engineer — CloudScale Technologies (2022 - Present)\n- Built features for the customer dashboard and improved page loading time.\n- Worked on database migration and wrote unit tests to improve reliability.\n- Collaborated with product designers on new user workflows.\n\nSoftware Engineer — NexaPay (2019 - 2022)\n- Developed microservices in Node.js and integrated payment gateways.\n- Managed AWS deployments with Docker containers.\n- Resolved bugs and participated in on-call rotation.`
  );
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisResult | null>({
    atsScore: 84,
    matchRate: 88,
    summary:
      "Strong technical foundation with clear full-stack experience. To beat elite ATS filters for Google L5, replace passive statements with quantified business metrics and add keywords for distributed caching, CI/CD, and observability.",
    missingKeywords: [
      "Distributed Caching (Redis)",
      "Kubernetes & Helm",
      "System Observability (Datadog/Prometheus)",
      "CI/CD Automation",
      "GraphQL / gRPC",
    ],
    matchedKeywords: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "REST APIs"],
    bulletImprovements: [
      {
        original: "Built features for the customer dashboard and improved page loading time.",
        improved:
          "Architected responsive React 18 components and implemented client-side query caching, slashing dashboard p95 load times by 42% for 120,000+ monthly active enterprise users.",
        impact: "+42% faster load times, 120k MAU scale",
      },
      {
        original: "Worked on database migration and wrote unit tests to improve reliability.",
        improved:
          "Spearheaded zero-downtime PostgreSQL schema migration and instituted end-to-end Jest/Playwright test suites, elevating code test coverage from 58% to 91%.",
        impact: "Zero downtime, +33% test coverage",
      },
      {
        original: "Developed microservices in Node.js and integrated payment gateways.",
        improved:
          "Engineered resilient Node.js microservices processing $4.5M+ daily transaction volume with idempotent retry mechanisms, maintaining 99.99% uptime.",
        impact: "$4.5M/day volume, 99.99% SLA",
      },
    ],
    sectionScores: {
      formatting: 92,
      experience: 82,
      skills: 86,
      impact: 76,
    },
  });

  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleScan = async () => {
    if (!resumeText.trim()) return;
    setIsScanning(true);
    try {
      const data = await geminiService.analyzeResume({
        resumeText,
        targetRole,
        targetCompany,
      });
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div id="resume-analyzer-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-5">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          AI Resume & ATS Scanner
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          Resume ATS Match & Bullet Rewriter
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Scan your resume against top company requirements. Identify missing technical keywords and upgrade passive bullet points into high-impact STAR narratives.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (5 Cols): Inputs & Resume Editor */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Target Role & Company
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Target Job Title:</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Senior Full-Stack Engineer"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Target Company:</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Google, Amazon, Meta"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Paste Resume Content
              </h2>
              <span className="text-[11px] text-indigo-400">Plain text / Markdown</span>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none leading-relaxed"
              placeholder="Paste your full resume text here..."
            />

            <button
              id="run-ats-scan-btn"
              type="button"
              disabled={isScanning}
              onClick={handleScan}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Scanning ATS Score...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  <span>Run AI ATS Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column (7 Cols): ATS Scores & High Impact Bullet Transformer */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <>
              {/* Top Score Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    ATS Match Score
                  </span>
                  <span className="font-['Outfit'] text-3xl font-extrabold text-emerald-400">
                    {result.atsScore}%
                  </span>
                  <span className="text-[10px] text-emerald-300 block">Tier-1 Qualified</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Keyword Match
                  </span>
                  <span className="font-['Outfit'] text-3xl font-extrabold text-indigo-400">
                    {result.matchRate}%
                  </span>
                  <span className="text-[10px] text-indigo-300 block">High Relevance</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Impact Density
                  </span>
                  <span className="font-['Outfit'] text-3xl font-extrabold text-amber-400">
                    {result.sectionScores.impact}%
                  </span>
                  <span className="text-[10px] text-amber-300 block">Metric Focus</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Formatting
                  </span>
                  <span className="font-['Outfit'] text-3xl font-extrabold text-cyan-400">
                    {result.sectionScores.formatting}%
                  </span>
                  <span className="text-[10px] text-cyan-300 block">Clean Parsing</span>
                </div>
              </div>

              {/* AI Executive Summary Callout */}
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/30 p-4 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span>ATS Auditor Executive Verdict:</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{result.summary}</p>
              </div>

              {/* Keyword Analysis: Matched vs Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Matched ATS Keywords ({result.matchedKeywords.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.matchedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-medium text-emerald-300"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    <span>High-Value Missing Keywords ({result.missingKeywords.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.missingKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 text-[11px] font-medium text-amber-300"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Bullet Point Transformer */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-['Outfit'] text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    <span>AI Bullet Point Transformer (Before vs. After)</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">STAR Quantified Impact</span>
                </div>

                <div className="space-y-4">
                  {result.bulletImprovements.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                          Original Weak Bullet:
                        </span>
                        <p className="text-xs text-slate-400 line-through">&ldquo;{bullet.original}&rdquo;</p>
                      </div>

                      <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/30 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            AI Quantified Upgrade:
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyBullet(bullet.improved, idx)}
                            className="flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-200 hover:text-white transition-colors"
                          >
                            {copiedIdx === idx ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 text-slate-400" />
                                <span>Copy Bullet</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-100 font-medium leading-relaxed">
                          {bullet.improved}
                        </p>
                        <span className="inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          Metric: {bullet.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
