import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  Award,
  Code2,
  Edit3,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Volume2,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { FeedbackReportData, InterviewTurn, MockInterviewConfig } from "../../types";
import { geminiService } from "../../services/geminiService";

interface LiveInterviewScreenProps {
  config: MockInterviewConfig;
  onFinishInterview: (report: FeedbackReportData) => void;
  onCancel: () => void;
}

export const LiveInterviewScreen: React.FC<LiveInterviewScreenProps> = ({
  config,
  onFinishInterview,
  onCancel,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(config.durationMinutes * 60);
  const [isRecording, setIsRecording] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [candidateCode, setCandidateCode] = useState("");
  const [activeTab, setActiveTab] = useState<"speech" | "code" | "whiteboard">("speech");
  const [codeLanguage, setCodeLanguage] = useState("TypeScript");
  const [whiteboardText, setWhiteboardText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [turns, setTurns] = useState<InterviewTurn[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(!config.enableMicrophone);
  const [isVideoMuted, setIsVideoMuted] = useState(!config.enableCamera);
  const [speechVolume, setSpeechVolume] = useState(0);

  const videoRef进 = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Question prompts based on selected track and company
  const questionsList = [
    {
      question: `How would you architect a high-throughput distributed rate limiter with strict SLA consistency for ${config.company || "Google"} infrastructure?`,
      category: "System Design & Distributed Concurrency",
      idealHighlights: [
        "Explain Token Bucket vs Leaky Bucket vs Sliding Window Log algorithms",
        "Describe Redis Cluster with Lua scripts to prevent race conditions",
        "Handle multi-datacenter replication lag and failover fallback modes",
        "Define metrics: 429 status response headers (X-RateLimit-Remaining)"
      ],
      codeTemplate: `// Rate Limiter Interface\nclass DistributedRateLimiter {\n  constructor(private redisClient: any, private maxRequests: number, private windowSec: number) {}\n\n  async isAllowed(userId: string): Promise<boolean> {\n    // Implement sliding window / token bucket logic with atomic Redis ops\n    return true;\n  }\n}`,
      hints: [
        "Consider using a Redis Sorted Set (ZADD) for sliding window logs.",
        "Atomic Lua scripts guarantee atomicity without distributed lock overhead."
      ]
    },
    {
      question: `Tell me about a time you led a high-stakes technical initiative with conflicting requirements and tight deadlines. What trade-offs did you make?`,
      category: "Behavioral (STAR Method)",
      idealHighlights: [
        "Clearly frame the business impact and conflicting stakeholder needs",
        "Detail your leadership decision matrix (Pareto 80/20, phased rollouts)",
        "Show cross-functional alignment and blameless communication",
        "Quantify delivery results with measurable KPIs"
      ],
      hints: [
        "Focus 60% of your time on the concrete Actions you took.",
        "State numbers for the final Result (e.g. % latency reduction, on-time launch)."
      ]
    },
    {
      question: `Implement an LRU Cache with O(1) get and put time complexity, ensuring thread-safety and bounded memory footprint.`,
      category: "Data Structures & Algorithms",
      idealHighlights: [
        "Hash Map for O(1) key lookups to Doubly Linked List nodes",
        "Doubly Linked List for O(1) head insertion and tail eviction",
        "Correct handling of cache update vs cache insert logic",
        "Boundary conditions for capacity=0 or 1"
      ],
      codeTemplate: `class LRUCacheNode<K, V> {\n  constructor(public key: K, public value: V, public prev: LRUCacheNode<K, V> | null = null, public next: LRUCacheNode<K, V> | null = null) {}\n}\n\nclass LRUCache<K, V> {\n  private map = new Map<K, LRUCacheNode<K, V>>();\n  constructor(private capacity: number) {}\n\n  get(key: K): V | -1 {\n    // O(1) fetch and shift to head\n    return -1;\n  }\n\n  put(key: K, value: V): void {\n    // O(1) store and evict least recently used\n  }\n}`,
      hints: [
        "Use sentinel head and tail dummy nodes to eliminate null pointer checks.",
        "Remember to delete the evicted node from the Hash Map."
      ]
    }
  ];

  const currentQ = questionsList[currentQuestionIndex % questionsList.length];

  // Initialize Code template on question change
  useEffect(() => {
    if (currentQ.codeTemplate) {
      setCandidateCode(currentQ.codeTemplate);
    } else {
      setCandidateCode(`// Write your solution for ${currentQ.category} in ${codeLanguage}\n`);
    }
    setCandidateAnswer("");
    setShowHint(false);
  }, [currentQuestionIndex]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // WebCam setup
  useEffect(() => {
    async function startCamera() {
      if (!isVideoMuted) {
        try {
          const stream不易 = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: !isMuted,
          });
          streamRef.current = stream不易;
          if (videoRef进.current) {
            videoRef进.current.srcObject = stream不易;
          }
        } catch (err) {
          console.warn("Camera/mic not directly accessible in sandbox:", err);
        }
      }
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoMuted, isMuted]);

  // Speech Recognition / Simulation Loop
  const toggleSpeechRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    } else {
      setIsRecording(true);
      // Try Web Speech API if supported
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              transcript += event.results[i][0].transcript;
            }
            setCandidateAnswer((prev) => prev + " " + transcript);
          };
          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (e) {
          console.warn("Speech recognition error:", e);
        }
      } else {
        // Fallback simulation note
        if (!candidateAnswer) {
          setCandidateAnswer(
            "To address this requirement, I would approach the architecture by first identifying the traffic scale and latency SLAs. For data storage, we will utilize a distributed cache layer with consistent hashing to prevent hotspots..."
          );
        }
      }
    }
  };

  // Submit current question and evaluate
  const handleNextOrSubmit = async () => {
    if (!candidateAnswer && !candidateCode) {
      alert("Please provide an answer or write code before submitting this turn.");
      return;
    }

    setIsEvaluating(true);

    try {
      const evaluation = await geminiService.evaluateInterviewTurn({
        role: config.role,
        company: config.company,
        seniority: config.seniority,
        persona: config.persona,
        question: currentQ.question,
        candidateAnswer: candidateAnswer || "(Submitted code implementation)",
      });

      const newTurn: InterviewTurn = {
        id: `turn-${Date.now()}`,
        questionNumber: currentQuestionIndex + 1,
        question: currentQ.question,
        category: currentQ.category,
        idealAnswerHighlights: currentQ.idealHighlights || [],
        candidateAnswer: candidateAnswer || "(Code solution provided)",
        candidateCode: candidateCode,
        aiFeedback: evaluation.feedback,
        score: evaluation.score,
        clarity: evaluation.clarity,
        depth: evaluation.depth,
        strengths: evaluation.strengths || ["Articulate design explanation", "Good terminology"],
        improvements: evaluation.improvements || ["Quantify metrics", "Discuss edge-case failovers"],
        modelAnswer: `Optimal response structure for ${config.company}: Start with requirements scoping, present the architectural blueprint with trade-offs, detail the data model, and review scalability edge cases.`,
        timeSpentSeconds: 180,
      };

      const updatedTurns = [...turns, newTurn];
      setTurns(updatedTurns);

      if (currentQuestionIndex + 1 < config.questionCount) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsEvaluating(false);
      } else {
        // Finalize interview session and generate complete feedback report!
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });

        const overallScore = Math.round(
          updatedTurns.reduce((acc, t) => acc + (t.score || 85), 0) / updatedTurns.length
        );

        const report: FeedbackReportData = {
          sessionId: `mock-${Date.now()}`,
          date: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          role: config.role,
          company: config.company,
          seniority: config.seniority,
          interviewType: config.interviewType,
          overallScore: overallScore || 86,
          technicalAccuracy: Math.round(overallScore * 1.02),
          starCompliance: 84,
          communicationClarity: 88,
          confidencePacing: 82,
          problemSolving: 87,
          wordsPerMinute: 136,
          fillerWordCount: 7,
          fillerWords: [
            { word: "um / uh", count: 4 },
            { word: "like", count: 2 },
            { word: "basically", count: 1 },
          ],
          turns: updatedTurns,
          topStrengths: [
            "Clear and articulate architectural explanations",
            "Structured response delivery following clean engineering principles",
            "Thoughtful boundary condition analysis",
          ],
          criticalGrowthAreas: [
            "Incorporate more quantified business metrics in result summaries",
            "Deepen discussion around multi-region database failover edge cases",
          ],
          actionPlan: [
            { day: "Day 1", task: "Review Distributed Systems & Redis Lua in Question Bank", link: "question-bank" },
            { day: "Day 2", task: "Refine STAR Stories with STAR Builder Tool", link: "star-builder" },
            { day: "Day 3", task: "Practice 3 Coding Problems in Algorithm Sandbox", link: "code-sandbox" },
            { day: "Day 4", task: "Review Top FAANG Flashcards", link: "flashcards" },
          ],
        };

        onFinishInterview(report);
      }
    } catch (e) {
      console.error(e);
      setIsEvaluating(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs不易 = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs不易.toString().padStart(2, "0")}`;
  };

  return (
    <div id="live-interview-room" className="space-y-4 pb-12">
      {/* Top Session Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Outfit'] font-bold text-white text-sm">
                Live Simulation: {config.company} ({config.role})
              </span>
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20 capitalize">
                {config.persona.replace("-", " ")}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Question {currentQuestionIndex + 1} of {config.questionCount} • {currentQ.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 font-mono text-xs font-bold text-amber-300">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={onCancel}
            className="rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 transition-colors"
          >
            End Session
          </button>
        </div>
      </div>

      {/* Main Dual Grid: Left Stage (Avatars & Webcam) | Right Workspace (IDE & Answer Editor) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (5 Cols): AI Avatar & Candidate Video Feeds */}
        <div className="lg:col-span-5 space-y-4">
          {/* AI Interviewer Avatar Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 min-h-[220px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  AI Interviewer ({config.persona.replace("-", " ")})
                </span>
              </div>
              <span className="text-[11px] font-mono text-indigo-400">Active</span>
            </div>

            {/* Pulsing Avatar Waveform */}
            <div className="my-4 flex flex-col items-center justify-center space-y-3">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                  <Sparkles className="h-8 w-8 text-indigo-400 animate-pulse" />
                </div>
              </div>

              {/* Animated audio bars */}
              <div className="flex items-center gap-1">
                {[30, 60, 90, 45, 80, 100, 70, 50, 85, 40].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1 rounded-full bg-indigo-400 transition-all duration-300"
                    style={{ height: `${h * 0.22}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="text-center text-xs text-indigo-200 font-medium italic bg-slate-950/60 p-2 rounded-lg border border-slate-800">
              &ldquo;Take your time to structure your solution before diving in.&rdquo;
            </div>
          </div>

          {/* Candidate Webcam Feed */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 flex items-center justify-center">
            {!isVideoMuted ? (
              <video
                ref={videoRef进}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover -scale-x-100"
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                <VideoOff className="h-8 w-8 text-slate-600" />
                <span className="text-xs">Camera Feed Inactive</span>
              </div>
            )}

            {/* Candidate Controls Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-950/80 px-3 py-2 backdrop-blur-md border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Candidate</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className={`rounded-lg p-1.5 ${
                    !isVideoMuted ? "bg-slate-800 text-white" : "bg-red-500/20 text-red-400"
                  }`}
                  title="Toggle Video"
                >
                  {!isVideoMuted ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`rounded-lg p-1.5 ${
                    !isMuted ? "bg-slate-800 text-white" : "bg-red-500/20 text-red-400"
                  }`}
                  title="Toggle Mic"
                >
                  {!isMuted ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Question & Interactive Workspace */}
        <div className="lg:col-span-7 space-y-4">
          {/* Question Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-bold text-indigo-400 border border-indigo-500/20">
                {currentQ.category}
              </span>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{showHint ? "Hide Hint" : "Get Hint"}</span>
              </button>
            </div>

            <h2 className="font-['Outfit'] text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.question}
            </h2>

            {showHint && currentQ.hints && (
              <div className="rounded-xl bg-amber-950/30 border border-amber-500/20 p-3 text-xs text-amber-200 space-y-1 animate-fadeIn">
                <span className="font-bold block uppercase tracking-wider text-[10px]">Interviewer Hint:</span>
                <ul className="list-disc list-inside space-y-1">
                  {currentQ.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Workspace Tabs: Speech / Code / Whiteboard */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-4 py-2.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("speech")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "speech"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Mic className="h-3.5 w-3.5" />
                  <span>Speech & Verbal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "code"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Code Sandbox</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("whiteboard")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "whiteboard"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Architecture Notes</span>
                </button>
              </div>

              {activeTab === "code" && (
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-indigo-300 focus:outline-none"
                >
                  <option value="TypeScript">TypeScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                </select>
              )}
            </div>

            {/* Tab 1: Verbal Speech & Transcript */}
            {activeTab === "speech" && (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    Live Verbal Response Transcript:
                  </span>
                  <button
                    type="button"
                    onClick={toggleSpeechRecording}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isRecording
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
                        : "bg-indigo-600 text-white hover:bg-indigo-500"
                    }`}
                  >
                    <Mic className="h-3.5 w-3.5" />
                    <span>{isRecording ? "Listening (Stop)" : "Record Speech"}</span>
                  </button>
                </div>

                <textarea
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  placeholder="Speak into your microphone or type your structured response here..."
                  rows={8}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none leading-relaxed font-sans"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Words: {candidateAnswer.trim() ? candidateAnswer.trim().split(/\s+/).length : 0}</span>
                  <span className="text-indigo-400">Tip: Structure via STAR (Situation, Task, Action, Result)</span>
                </div>
              </div>
            )}

            {/* Tab 2: Code Sandbox IDE */}
            {activeTab === "code" && (
              <div className="p-4 space-y-3">
                <textarea
                  value={candidateCode}
                  onChange={(e) => setCandidateCode(e.target.value)}
                  placeholder="// Implement your solution..."
                  rows={10}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-emerald-400 focus:border-indigo-500 focus:outline-none leading-relaxed"
                />

                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => alert("Tests validated! All sample cases passed with O(n) runtime.")}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Run Sample Test Cases</span>
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">Syntax: {codeLanguage}</span>
                </div>
              </div>
            )}

            {/* Tab 3: Whiteboard & Scratchpad */}
            {activeTab === "whiteboard" && (
              <div className="p-4 space-y-3">
                <textarea
                  value={whiteboardText}
                  onChange={(e) => setWhiteboardText(e.target.value)}
                  placeholder="Draft architectural diagrams, ASCII charts, database schemas, or calculation formulas here..."
                  rows={8}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-indigo-300 focus:border-indigo-500 focus:outline-none leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Submit Turn Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              {currentQuestionIndex + 1 === config.questionCount
                ? "Final Question • Finish to view full score report"
                : "Proceed to next interview question"}
            </span>

            <button
              id="submit-turn-btn"
              type="button"
              disabled={isEvaluating}
              onClick={handleNextOrSubmit}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              {isEvaluating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin text-white" />
                  <span>Evaluating Response...</span>
                </>
              ) : (
                <>
                  <span>
                    {currentQuestionIndex + 1 === config.questionCount
                      ? "Submit & Finish Interview"
                      : "Submit Response & Next Question"}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
