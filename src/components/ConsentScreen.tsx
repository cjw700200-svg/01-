import React, { useState } from 'react';

interface ConsentScreenProps {
  onAgree: () => void;
  onDecline: () => void;
  initialDeclined?: boolean;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({
  onAgree,
  onDecline,
  initialDeclined = false
}) => {
  const [declined, setDeclined] = useState<boolean>(initialDeclined);

  const handleDeclineClick = () => {
    setDeclined(true);
    onDecline();
  };

  const handleAgreeClick = () => {
    setDeclined(false);
    onAgree();
  };

  if (declined) {
    return (
      <div className="flex justify-center bg-slate-900 min-h-screen text-[#1b1c1c] antialiased select-none font-sans">
        <div className="w-full max-w-xl bg-white min-h-screen flex flex-col justify-between p-6 shadow-2xl">
          <div className="pt-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-5 shadow-inner">
              <span className="material-symbols-outlined text-[36px]">handshake</span>
            </div>
            
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full mb-3">
              MGMT 6108 · SMU
            </span>

            <h1 className="text-2xl font-black text-slate-900 mb-3">
              Thank You!
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Thank you for your time. You have declined participation in this study prototype. No data has been recorded.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 max-w-sm">
              If you changed your mind and would like to experience the shopping app and contribute to the research, you can join at any time.
            </div>
          </div>

          <div className="pb-8 pt-4">
            <button
              onClick={handleAgreeClick}
              className="w-full py-3.5 px-4 bg-[#b22204] hover:bg-[#d63c1e] text-white font-extrabold rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Change mind &amp; start study</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-slate-900 min-h-screen text-[#1b1c1c] antialiased select-none font-sans">
      <div className="w-full max-w-xl bg-[#f8f9fa] min-h-screen flex flex-col justify-between p-6 shadow-2xl">
        <div className="pt-6">
          {/* Institution Header Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b22204] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Singapore Management University · MGMT 6108
            </span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#b22204] mb-4">
              <span className="material-symbols-outlined text-[28px]">verified_user</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
              Study Consent
            </h1>

            {/* Exact required wording */}
            <p className="text-sm text-slate-700 leading-relaxed mb-6 font-medium">
              This is a class prototype for MGMT 6108 at SMU. You will browse a shopping app and may write a post or vote. It takes about 5 minutes. Participation is voluntary and anonymous, and you can stop at any time. No real purchases are made.
            </p>

            {/* Key Information Checklist */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                  schedule
                </span>
                <div>
                  <span className="font-bold text-slate-900">Duration: </span>
                  <span className="text-slate-600">Takes about 5 minutes to explore and try features.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                  lock
                </span>
                <div>
                  <span className="font-bold text-slate-900">Anonymity: </span>
                  <span className="text-slate-600">Completely voluntary and anonymous. You may exit anytime.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                  shopping_bag
                </span>
                <div>
                  <span className="font-bold text-slate-900">Simulation: </span>
                  <span className="text-slate-600">Simulated shopping prototype — no real transactions or fees.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pb-6 pt-2 space-y-3">
          <button
            onClick={handleAgreeClick}
            className="w-full py-3.5 px-4 bg-[#b22204] hover:bg-[#d63c1e] text-white font-extrabold rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>I agree</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <button
            onClick={handleDeclineClick}
            className="w-full py-3 px-4 bg-transparent hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 font-bold rounded-xl border border-slate-300 transition-all text-xs cursor-pointer"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
};
