import React, { useState } from "react";
import { CandidateProfile, FeedbackReportData, MockInterviewConfig, ScreenType } from "./types";
import { sampleProfile, sampleFeedbackReport } from "./data/mockData";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

// Screens
import { LandingScreen } from "./components/screens/LandingScreen";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { MockSetupScreen } from "./components/screens/MockSetupScreen";
import { LiveInterviewScreen } from "./components/screens/LiveInterviewScreen";
import { FeedbackReportScreen } from "./components/screens/FeedbackReportScreen";
import { ResumeAnalyzerScreen } from "./components/screens/ResumeAnalyzerScreen";
import { QuestionBankScreen } from "./components/screens/QuestionBankScreen";
import { CodeSandboxScreen } from "./components/screens/CodeSandboxScreen";
import { StarBuilderScreen } from "./components/screens/StarBuilderScreen";
import { SalaryInsightsScreen } from "./components/screens/SalaryInsightsScreen";
import { CompanyGuidesScreen } from "./components/screens/CompanyGuidesScreen";
import { AnalyticsScreen } from "./components/screens/AnalyticsScreen";
import { FlashcardsScreen } from "./components/screens/FlashcardsScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("landing");
  const [profile, setProfile] = useState<CandidateProfile>(sampleProfile);
  const [lastReport, setLastReport] = useState<FeedbackReportData>(sampleFeedbackReport);
  const [activeMockConfig, setActiveMockConfig] = useState<MockInterviewConfig | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Quick Mock starter
  const handleStartQuickMock = () => {
    setCurrentScreen("mock-setup");
  };

  // Launch mock with specific company
  const handleLaunchMockForCompany = (companyName: string) => {
    setActiveMockConfig({
      role: profile.targetRole,
      seniority: profile.targetSeniority,
      company: companyName,
      interviewType: "technical",
      durationMinutes: 30,
      questionCount: 3,
      persona: "bar-raiser",
      enableCamera: true,
      enableMicrophone: true,
      focusTopics: ["System Design", "STAR", "Data Structures"],
    });
    setCurrentScreen("live-interview");
  };

  // Live Interview Start Handler
  const handleStartInterview = (config: MockInterviewConfig) => {
    setActiveMockConfig(config);
    setCurrentScreen("live-interview");
  };

  // Interview Finish Handler
  const handleFinishInterview = (report: FeedbackReportData) => {
    setLastReport(report);
    // Increment candidate profile mocks and score
    setProfile((prev) => ({
      ...prev,
      completedMocksCount: prev.completedMocksCount + 1,
      readinessScore: Math.min(99, Math.max(70, Math.round((prev.readinessScore + report.overallScore) / 2))),
    }));
    setCurrentScreen("feedback-report");
  };

  const handleRetakeMock = () => {
    setCurrentScreen("mock-setup");
  };

  const handleUpdateProfile = (updated: CandidateProfile) => {
    setProfile(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-white flex flex-col">
      {/* Top Global Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        profile={profile}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onStartQuickMock={handleStartQuickMock}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Left Side Navigation Bar (Hidden during full live interview focus mode) */}
        {currentScreen !== "live-interview" && (
          <aside className="hidden md:block w-64 shrink-0">
            <Sidebar
              currentScreen={currentScreen}
              onNavigate={(screen) => setCurrentScreen(screen)}
            />
          </aside>
        )}

        {/* Mobile Drawer Sidebar */}
        {isSidebarOpen && currentScreen !== "live-interview" && (
          <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-md flex">
            <div className="w-72 bg-slate-900 h-full p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                <span className="font-bold text-white text-sm">Navigation</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕ Close
                </button>
              </div>
              <Sidebar
                currentScreen={currentScreen}
                onNavigate={(screen) => {
                  setCurrentScreen(screen);
                  setIsSidebarOpen(false);
                }}
              />
            </div>
            <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0">
          {currentScreen === "landing" && (
            <LandingScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onStartQuickMock={handleStartQuickMock}
            />
          )}

          {currentScreen === "dashboard" && (
            <DashboardScreen
              profile={profile}
              lastReport={lastReport}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onStartQuickMock={handleStartQuickMock}
            />
          )}

          {currentScreen === "mock-setup" && (
            <MockSetupScreen onStartInterview={handleStartInterview} />
          )}

          {currentScreen === "live-interview" && activeMockConfig && (
            <LiveInterviewScreen
              config={activeMockConfig}
              onFinishInterview={handleFinishInterview}
              onCancel={() => setCurrentScreen("dashboard")}
            />
          )}

          {currentScreen === "feedback-report" && (
            <FeedbackReportScreen
              report={lastReport}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onRetakeMock={handleRetakeMock}
            />
          )}

          {currentScreen === "resume-analyzer" && <ResumeAnalyzerScreen />}

          {currentScreen === "question-bank" && <QuestionBankScreen />}

          {currentScreen === "code-sandbox" && <CodeSandboxScreen />}

          {currentScreen === "star-builder" && <StarBuilderScreen />}

          {currentScreen === "salary-insights" && <SalaryInsightsScreen />}

          {currentScreen === "company-guides" && (
            <CompanyGuidesScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onLaunchMockForCompany={handleLaunchMockForCompany}
            />
          )}

          {currentScreen === "analytics" && (
            <AnalyticsScreen profile={profile} lastReport={lastReport} />
          )}

          {currentScreen === "flashcards" && <FlashcardsScreen />}

          {currentScreen === "settings" && (
            <SettingsScreen
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>HireReady AI © 2025-2026. Practice Smarter. Get Hired Faster.</span>
          <span className="text-slate-600">Powered by Google DeepMind Gemini Models</span>
        </div>
      </footer>
    </div>
  );
}
