import React, { useState } from "react";
import {
  Settings2,
  User,
  ShieldCheck,
  Video,
  Mic,
  Save,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  Sliders,
  Layers,
} from "lucide-react";
import { CandidateProfile, SeniorityLevel } from "../../types";

interface SettingsScreenProps {
  profile: CandidateProfile;
  onUpdateProfile: (updated: CandidateProfile) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [targetSeniority, setTargetSeniority] = useState<SeniorityLevel>(profile.targetSeniority);
  const [targetCompanyTier, setTargetCompanyTier] = useState(profile.targetCompanyTier);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      email,
      targetRole,
      targetSeniority,
      targetCompanyTier,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div id="settings-screen" className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Preferences & Calibration
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          Candidate Profile & Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Configure your career target metrics, audio/video devices, and interview coaching preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Candidate Profile Details */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="h-5 w-5 text-indigo-400" />
            <h2 className="font-['Outfit'] text-base font-bold text-white">
              Target Career Goals & Leveling
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Candidate Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Contact Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Target Job Title:</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Company Tier Goal:</label>
              <input
                type="text"
                value={targetCompanyTier}
                onChange={(e) => setTargetCompanyTier(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-slate-300 font-bold block mb-1">Target Seniority Level:</label>
              <div className="grid grid-cols-5 gap-2">
                {(["junior", "mid", "senior", "lead", "staff"] as SeniorityLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setTargetSeniority(lvl)}
                    className={`rounded-xl py-2 text-center text-xs font-bold uppercase transition-all border ${
                      targetSeniority === lvl
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

        {/* AI Calibration & Diagnostics */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h2 className="font-['Outfit'] text-base font-bold text-white">
              AI Interview Simulation Preferences
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Strict Speech & Filler Words Analysis</span>
                <span className="text-slate-400">Detect words like &ldquo;um&rdquo;, &ldquo;like&rdquo;, &ldquo;basically&rdquo; during voice recording</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Automated Test Case Runner</span>
                <span className="text-slate-400">Run unit test cases against algorithm solutions on submit</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => alert("Candidate state exported to JSON backup.")}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export Profile & Reports</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            {saved ? <Check className="h-4 w-4 text-emerald-300" /> : <Save className="h-4 w-4" />}
            <span>{saved ? "Preferences Saved!" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
