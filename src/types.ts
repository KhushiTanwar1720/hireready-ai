export type ScreenType =
  | "landing"
  | "dashboard"
  | "mock-setup"
  | "live-interview"
  | "feedback-report"
  | "resume-analyzer"
  | "question-bank"
  | "code-sandbox"
  | "star-builder"
  | "salary-insights"
  | "company-guides"
  | "analytics"
  | "flashcards"
  | "settings";

export type InterviewType = "technical" | "behavioral" | "system-design" | "leadership" | "case-study";
export type SeniorityLevel = "intern" | "junior" | "mid" | "senior" | "lead" | "staff";
export type AIPersona = "bar-raiser" | "friendly-mentor" | "hr-recruiter" | "fast-lead" | "strict-architect";

export interface MockInterviewConfig {
  id?: string;
  role: string;
  seniority: SeniorityLevel;
  company: string;
  interviewType: InterviewType;
  durationMinutes: number;
  questionCount: number;
  persona: AIPersona;
  enableCamera: boolean;
  enableMicrophone: boolean;
  focusTopics: string[];
}

export interface InterviewTurn {
  id: string;
  questionNumber: number;
  question: string;
  category: string;
  idealAnswerHighlights: string[];
  codeTemplate?: string;
  candidateAnswer: string;
  candidateCode?: string;
  aiFeedback?: string;
  score?: number;
  clarity?: number;
  depth?: number;
  strengths?: string[];
  improvements?: string[];
  modelAnswer?: string;
  timeSpentSeconds: number;
}

export interface FeedbackReportData {
  sessionId: string;
  date: string;
  role: string;
  company: string;
  seniority: string;
  interviewType: InterviewType;
  overallScore: number;
  technicalAccuracy: number;
  starCompliance: number;
  communicationClarity: number;
  confidencePacing: number;
  problemSolving: number;
  wordsPerMinute: number;
  fillerWordCount: number;
  fillerWords: { word: string; count: number }[];
  turns: InterviewTurn[];
  topStrengths: string[];
  criticalGrowthAreas: string[];
  actionPlan: { day: string; task: string; link?: ScreenType }[];
}

export interface QuestionItem {
  id: string;
  title: string;
  category: "Data Structures" | "Algorithms" | "System Design" | "Behavioral (STAR)" | "Frontend" | "Backend" | "DevOps & Cloud" | "Product & Strategy";
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  frequency: "High" | "Medium" | "Low";
  description: string;
  hints: string[];
  modelAnswer: string;
  starterCode?: string;
  status: "unattempted" | "in-progress" | "mastered";
  userNotes?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: { [language: string]: string };
  testCases: { input: string; expected: string }[];
}

export interface STARStory {
  id: string;
  title: string;
  category: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  score: number;
  tags: string[];
  deliveryTips: string[];
  potentialFollowUps: string[];
  refinedStory?: string;
  lastEdited: string;
}

export interface CompanyGuide {
  id: string;
  name: string;
  logo?: string;
  tagline?: string;
  overview?: string;
  hiringBar?: string;
  interviewRounds?: { roundName: string; duration: string; focus: string; tips: string }[];
  rounds?: { step: number; title: string; duration: string; description: string }[];
  coreValues: (string | { title: string; description: string })[];
  frequentlyAsked?: string[];
  tips?: string[];
  salaryTier?: string;
  prepStrategy?: string;
}

export interface Flashcard {
  id: string;
  deck?: string;
  front?: string;
  back?: string;
  question?: string;
  answer?: string;
  keyTakeaway?: string;
  category: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  mastered?: boolean;
  isMastered?: boolean;
}

export type FlashcardItem = Flashcard;

export interface SalaryBenchmark {
  id?: string;
  role: string;
  company?: string;
  level?: string;
  location: string;
  experienceYears?: string;
  p25?: number;
  p50?: number;
  p75?: number;
  p90?: number;
  totalCompensation?: number;
  stockGrantPerYear?: number;
  signingBonus?: number;
  baseSalary: number;
  annualBonus?: number;
  equityPerYear?: number;
  topPayingCompanies?: { name: string; totalComp: string }[];
  negotiationTips?: string[];
}

export type SalaryInsight = SalaryBenchmark;
export type StarStory = STARStory;

export interface CandidateProfile {
  name: string;
  headline: string;
  email: string;
  targetRole: string;
  targetCompanyTier: string;
  yearsOfExperience: number;
  readinessScore: number;
  streakDays: number;
  completedMocksCount: number;
  questionsSolvedCount: number;
  preferredLanguage: string;
  personaPreference: AIPersona;
  theme: "dark" | "light";
}
