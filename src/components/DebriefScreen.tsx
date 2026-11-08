import React from 'react';

interface DebriefScreenProps {
  abVersion: 'A' | 'B';
  contributorPoints: number;
  helpfulPostsCount: number;
  onClose: () => void;
  onResetStudy?: () => void;
  onSwitchVersion?: (v: 'A' | 'B') => void;
}

export const DebriefScreen: React.FC<DebriefScreenProps> = ({
  abVersion,
  contributorPoints,
  helpfulPostsCount,
  onClose,
  onResetStudy,
  onSwitchVersion
}) => {
  return (
    <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#b22204] via-[#d63c1e] to-[#bb0017] text-white p-5 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-orange-200 bg-black/20 px-2.5 py-0.5 rounded-full">
              MGMT 6108 · SMU Research Prototype
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
              aria-label="Close debrief"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-amber-300">
              psychology
            </span>
            Study Debrief
          </h2>
          <p className="text-xs text-orange-100 font-medium mt-1">
            Research Explanation &amp; Behavioral Insights
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-[#1b1c1c]">
          {/* Version Announcement Banner */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex flex-col items-center justify-center font-black shrink-0 shadow-sm">
              <span className="text-[10px] uppercase leading-none">Version</span>
              <span className="text-2xl leading-none">{abVersion}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block">
                Condition Assigned
              </span>
              <p className="text-sm font-extrabold text-slate-900">
                You experienced Version {abVersion} ({abVersion === 'A' ? 'Earn Framing' : 'Keep / Endowed Framing'})
              </p>
            </div>
          </div>

          {/* Exact Required Text Callout */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              Thank you for taking part. This study compared two versions of the Contributor Tier card. Version A asked you to earn Silver status; Version B started you at Silver and asked you to keep it. We want to know which wording makes people more willing to write helpful posts. You saw Version {abVersion}.
            </p>
          </div>

          {/* Theoretical Breakdown for MGMT 6108 */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Experimental Design &amp; Hypotheses
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-3 rounded-xl border transition-all ${
                abVersion === 'A' 
                  ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-400/30' 
                  : 'bg-slate-50 border-slate-200 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-slate-900">Condition A</span>
                  {abVersion === 'A' && (
                    <span className="bg-[#b22204] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      Your Group
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 font-medium">
                  <strong>Acquisition Framing:</strong> Starts at Bronze with rewards locked. "Earn Silver status". Tests goal gradient motivation.
                </p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${
                abVersion === 'B' 
                  ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/30' 
                  : 'bg-slate-50 border-slate-200 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-slate-900">Condition B</span>
                  {abVersion === 'B' && (
                    <span className="bg-amber-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      Your Group
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 font-medium">
                  <strong>Endowment Framing:</strong> Starts at Silver with rewards unlocked. "Keep your Silver status". Leverages loss aversion.
                </p>
              </div>
            </div>
          </div>

          {/* Session Activity Stats */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
              Your Session Activity
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-xl shadow-2xs border border-slate-100">
                <span className="text-base font-black text-[#b22204] block">{contributorPoints}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Points This Month</span>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-2xs border border-slate-100">
                <span className="text-base font-black text-amber-600 block">{helpfulPostsCount}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Helpful Posts</span>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-2xs border border-slate-100">
                <span className="text-base font-black text-emerald-600 block">
                  {contributorPoints >= 100 ? 'Unlocked' : `${100 - contributorPoints} to go`}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Silver Goal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#b22204] hover:bg-[#d63c1e] text-white font-extrabold rounded-xl shadow-md active:scale-[0.99] transition-all text-sm cursor-pointer"
          >
            Return to Prototype
          </button>

          {onResetStudy && (
            <div className="flex gap-2">
              {onSwitchVersion && (
                <button
                  onClick={() => onSwitchVersion(abVersion === 'A' ? 'B' : 'A')}
                  className="flex-1 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  Switch to Version {abVersion === 'A' ? 'B' : 'A'}
                </button>
              )}
              <button
                onClick={onResetStudy}
                className="flex-1 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-transparent border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Reset Consent &amp; Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
