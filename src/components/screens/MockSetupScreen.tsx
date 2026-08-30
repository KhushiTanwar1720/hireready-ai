import React, { useState, useRef, useEffect } from "react";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Sparkles,
  Play,
  Building2,
  Briefcase,
  Layers,
  Clock,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Settings2,
} from "lucide-react";
import { AIPersona, InterviewType, MockInterviewConfig, SeniorityLevel } from "../../types";

interface MockSetupScreenProps {
  onStartInterview: (config: MockInterviewConfig) => void;
}

export const MockSetupScreen: React.FC<MockSetupScreenProps> = ({
  onStartInterview,
}) => {
  const [role, setRole] = useState("Senior Full-Stack Engineer");
  const [seniority, setSeniority] = useState<SeniorityLevel>("senior");
  const [company, setCompany] = useState("Google");
  const [interviewType, setInterviewType] = useState<InterviewType>("technical");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [questionCount, setQuestionCount] = useState(3);
  const [persona, setPersona] = useState<AIPersona>("bar-raiser");
  const [enableCamera, setEnableCamera] = useState(true);
  const [enableMicrophone, setEnableMicrophone] = useState(true);
  const [isMediaActive, setIsMediaActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize or cleanup webcam stream for device calibration
  useEffect(() => {
    async function setupStream() {
      if (enableCamera && !isMediaActive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: enableMicrophone,
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setIsMediaActive(true);
        } catch (err) {
          console.warn("Camera access denied or unavailable in preview container:", err);
          setIsMediaActive(false);
        }
      }
    }

    setupStream();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [enableCamera, enableMicrophone]);

  const roles = [
    "Senior Full-Stack Engineer",
    "Frontend Engineer (React/TypeScript)",
    "Backend Engineer (Distributed Systems)",
    "Staff System Architect",
    "Engineering Manager / Tech Lead",
    "DevOps & Cloud Architect",
    "Data Scientist / AI Engineer",
  ];

  const companies = [
    { name: "Google", desc: "Technical Rigor & Googleyness" },
    { name: "Amazon", desc: "16 Leadership Principles & Bar Raiser" },
    { name: "Meta", desc: "Speed, Architecture & Product Sense" },
    { name: "Stripe", desc: "API Design, Real-world Systems & Bugs" },
    { name: "Netflix", desc: "Freedom & Responsibility Culture" },
    { name: "High-Growth AI Startup", desc: "Fast Execution & Ambiguity" },
  ];

  const personas: { id: AIPersona; name: string; desc: string; badge: string }[] = [
    {
      id: "bar-raiser",
      name: "Rigorous FAANG Bar Raiser",
      desc: "Challenging edge-cases, deep Big-O probes, and zero tolerance for hand-wavy explanations.",
      badge: "Most Realistic",
    },
    {
      id: "friendly-mentor",
      name: "Supportive Tech Mentor",
      desc: "Provides thoughtful hints, encourages problem exploration, and coaches best practices.",
      badge: "Learning Mode",
    },
    {
      id: "hr-recruiter",
      name: "Executive HR Partner",
      desc: "Laser-focused on STAR behavioral metrics, leadership presence, and culture alignment.",
      badge: "Behavioral",
    },
    {
      id: "fast-lead",
      name: "Fast-Paced Startup Lead",
      desc: "Prioritizes rapid prototyping trade-offs, practical delivery velocity, and pragmatic design.",
      badge: "Applied",
    },
  ];

  const handleLaunch = () => {
    // stop preview stream before entering full interview
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    onStartInterview({
      role,
      seniority,
      company,
      interviewType,
      durationMinutes,
      questionCount,
      persona,
      enableCamera,
      enableMicrophone,
      focusTopics: ["Architecture", "STAR Narrative", "Concurrency", "Optimization"],
    });
  };

  return (
    <div id="mock-setup-screen" className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Step-by-Step Configuration
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          Configure Your AI Mock Interview
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Customize role, company hiring rubrics, AI interviewer persona, and test your audio/video devices before launching.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Track / Format Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Layers className="h-4 w-4 text-indigo-400" />
              <span>1. Select Interview Track</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "technical" as InterviewType, label: "Technical Coding & DSA" },
                { id: "system-design" as InterviewType, label: "System Design & Arch" },
                { id: "behavioral" as InterviewType, label: "Behavioral & STAR" },
                { id: "leadership" as InterviewType, label: "Leadership & Strategy" },
                { id: "case-study" as InterviewType, label: "Product & Case Study" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setInterviewType(t.id)}
                  className={`rounded-xl p-3 text-left text-xs font-semibold transition-all border ${
                    interviewType === t.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role & Leveling Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Briefcase className="h-4 w-4 text-indigo-400" />
              <span>2. Target Role & Seniority</span>
            </label>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Target Position:</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                >
                  {roles.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Leveling Bracket:</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {(["junior", "mid", "senior", "lead", "staff"] as SeniorityLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeniority(lvl)}
                      className={`rounded-lg py-2 text-center text-xs font-bold uppercase tracking-wider transition-all border ${
                        seniority === lvl
                          ? "bg-indigo-600 text-white border-indigo-500 shadow"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Target Company Rubric */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Building2 className="h-4 w-4 text-indigo-400" />
              <span>3. Target Company Culture Rubric</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {companies.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCompany(c.name)}
                  className={`rounded-xl p-3 text-left transition-all border ${
                    company === c.name
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="font-bold text-xs text-white block">{c.name}</span>
                  <span className="text-[10px] text-slate-400 line-clamp-1">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Persona Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <UserCheck className="h-4 w-4 text-indigo-400" />
              <span>4. AI Interviewer Persona</span>
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {personas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPersona(p.id)}
                  className={`relative rounded-xl p-3.5 text-left transition-all border ${
                    persona === p.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{p.name}</span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[9px] font-semibold text-indigo-300">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Device Calibration & Summary Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Webcam & Mic Live Calibration Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Hardware & Camera Check
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEnableCamera(!enableCamera)}
                  className={`rounded-lg p-1.5 text-xs transition-colors ${
                    enableCamera ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                  title={enableCamera ? "Turn off camera" : "Turn on camera"}
                >
                  {enableCamera ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setEnableMicrophone(!enableMicrophone)}
                  className={`rounded-lg p-1.5 text-xs transition-colors ${
                    enableMicrophone ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                  title={enableMicrophone ? "Mute mic" : "Unmute mic"}
                >
                  {enableMicrophone ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center">
              {enableCamera ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover -scale-x-100"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                  <VideoOff className="h-8 w-8 text-slate-600" />
                  <span className="text-xs">Camera Disabled (Voice/Text Mode)</span>
                </div>
              )}

              {/* Status Pill Overlay */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur-sm border border-slate-800">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Audio & Video Ready</span>
              </div>
            </div>

            {/* Duration & Question count sliders */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block mb-1">Duration</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{durationMinutes} Minutes</span>
                  <div className="flex gap-1">
                    {[15, 30, 45].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setDurationMinutes(m)}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          durationMinutes === m ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block mb-1">Questions</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{questionCount} Prompts</span>
                  <div className="flex gap-1">
                    {[2, 3, 4].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuestionCount(q)}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          questionCount === q ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {q}Q
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Summary Card & Big Launch CTA */}
          <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 p-6 space-y-5 shadow-xl shadow-indigo-500/5">
            <div className="space-y-1">
              <h3 className="font-['Outfit'] text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Ready to Begin Simulation</span>
              </h3>
              <p className="text-xs text-slate-400">
                AI will evaluate your speech clarity, technical accuracy, and STAR compliance in real time.
              </p>
            </div>

            <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Format:</span>
                <span className="font-bold text-indigo-300 capitalize">{interviewType.replace("-", " ")}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Target Role:</span>
                <span className="font-bold text-white">{role}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Company Benchmark:</span>
                <span className="font-bold text-emerald-400">{company}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">AI Persona:</span>
                <span className="font-bold text-purple-300">
                  {personas.find((p) => p.id === persona)?.name}
                </span>
              </div>
            </div>

            <button
              id="launch-mock-session-btn"
              type="button"
              onClick={handleLaunch}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Enter Live AI Interview Room</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
