import React from "react";
import {
  LayoutDashboard,
  Video,
  FileText,
  HelpCircle,
  Code2,
  Sparkles,
  DollarSign,
  Building2,
  LineChart,
  Layers,
  Settings,
  Flame,
  Award,
  Globe,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScreenType } from "../types";

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavSection {
  title: string;
  items: {
    id: ScreenType;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  collapsed,
  onToggleCollapse,
}) => {
  const sections: NavSection[] = [
    {
      title: "Core Overview",
      items: [
        { id: "landing", label: "Overview & Features", icon: Globe },
        { id: "dashboard", label: "Candidate Hub", icon: LayoutDashboard, badge: "78% Ready", badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
      ],
    },
    {
      title: "AI Mock Interviews",
      items: [
        { id: "mock-setup", label: "Configure Session", icon: SlidersHorizontal },
        { id: "live-interview", label: "Live AI Interview", icon: Video, badge: "Live", badgeColor: "bg-red-500/10 text-red-400 border-red-500/20" },
        { id: "feedback-report", label: "Performance Report", icon: Award, badge: "New", badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
      ],
    },
    {
      title: "Preparation Suite",
      items: [
        { id: "resume-analyzer", label: "Resume ATS Optimizer", icon: FileText },
        { id: "question-bank", label: "500+ Question Bank", icon: HelpCircle, badge: "500+" },
        { id: "code-sandbox", label: "Algorithm Sandbox", icon: Code2 },
        { id: "star-builder", label: "STAR Story Coach", icon: Sparkles },
        { id: "flashcards", label: "Rapid Flashcards", icon: Layers },
      ],
    },
    {
      title: "Market & Company Intel",
      items: [
        { id: "company-guides", label: "Company Blueprints", icon: Building2 },
        { id: "salary-insights", label: "Salary Intelligence", icon: DollarSign },
        { id: "analytics", label: "Readiness Radar", icon: LineChart },
      ],
    },
    {
      title: "Settings",
      items: [
        { id: "settings", label: "Profile & Settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside
      id="app-sidebar"
      className={`fixed top-16 bottom-0 left-0 z-30 flex flex-col border-r border-slate-800/80 bg-slate-950/95 transition-all duration-300 backdrop-blur-md ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Navigation Links Scroll Container */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </h3>
            )}
            <div className="space-y-1 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-link-${item.id}`}
                    onClick={() => onNavigate(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600/15 text-indigo-300 font-semibold border border-indigo-500/30 shadow-sm shadow-indigo-500/10"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    } ${collapsed ? "justify-center px-2" : ""}`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-indigo-400"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />
                    {!collapsed && (
                      <div className="flex flex-1 items-center justify-between truncate">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold border ${
                              item.badgeColor || "bg-slate-800 text-slate-300 border-slate-700"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Collapse/Expand Toggle Footer */}
      <div className="border-t border-slate-800/80 p-2.5">
        <button
          id="sidebar-collapse-toggle"
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse Menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
