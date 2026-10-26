import React from 'react';

interface ContributorTierCardProps {
  abVersion: 'A' | 'B';
  helpfulPostsCount: number;
  onSwitchVersion: (version: 'A' | 'B') => void;
  onOpenVouchers: () => void;
}

export const ContributorTierCard: React.FC<ContributorTierCardProps> = ({
  abVersion,
  helpfulPostsCount,
  onSwitchVersion,
  onOpenVouchers
}) => {
  // Show A/B version toggle ONLY when URL contains debug=1 (e.g. ?v=A&debug=1)
  const isDebugMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1';

  // Determine current Tier, wording, and progress
  // Both versions require the same effort (2 helpful posts) and time window ("this month").
  // Version A: Starts at Bronze.
  //   - 0: "Write 2 helpful posts this month to earn Silver and unlock priority access." ("0 / 2 this month")
  //   - 1: "Write 1 helpful post this month to earn Silver and unlock priority access." ("1 / 2 this month")
  //   - 2+: "You earned Silver!" and unlocks rewards ("2 / 2 this month")
  // Version B: Starts at Silver with rewards already unlocked.
  //   - 0: "Write 2 helpful posts this month to keep your Silver status and priority access." ("0 / 2 this month")
  //   - 1: "Write 1 helpful post this month to keep your Silver status and priority access." ("1 / 2 this month")
  //   - 2+: "You kept your Silver status for this month!" ("2 / 2 this month")
  let currentTier: 'Bronze' | 'Silver' | 'Gold' = 'Bronze';
  let tierGoalText = '';
  let progressPercent = 0;
  let progressFraction = '';

  if (abVersion === 'A') {
    if (helpfulPostsCount === 0) {
      currentTier = 'Bronze';
      tierGoalText = 'Write 2 helpful posts this month to earn Silver and unlock priority access.';
      progressFraction = '0 / 2 this month';
      progressPercent = 0;
    } else if (helpfulPostsCount === 1) {
      currentTier = 'Bronze';
      tierGoalText = 'Write 1 helpful post this month to earn Silver and unlock priority access.';
      progressFraction = '1 / 2 this month';
      progressPercent = 50;
    } else if (helpfulPostsCount < 10) {
      currentTier = 'Silver';
      tierGoalText = 'You earned Silver!';
      progressFraction = '2 / 2 this month';
      progressPercent = 100;
    } else {
      currentTier = 'Gold';
      tierGoalText = 'You earned Silver! Gold VIP status achieved.';
      progressFraction = '10+ / 10 (Max)';
      progressPercent = 100;
    }
  } else {
    // Version B: Starts at Silver with rewards already unlocked
    if (helpfulPostsCount === 0) {
      currentTier = 'Silver';
      tierGoalText = 'Write 2 helpful posts this month to keep your Silver status and priority access.';
      progressFraction = '0 / 2 this month';
      progressPercent = 0;
    } else if (helpfulPostsCount === 1) {
      currentTier = 'Silver';
      tierGoalText = 'Write 1 helpful post this month to keep your Silver status and priority access.';
      progressFraction = '1 / 2 this month';
      progressPercent = 50;
    } else if (helpfulPostsCount < 10) {
      currentTier = 'Silver';
      tierGoalText = 'You kept your Silver status for this month!';
      progressFraction = '2 / 2 this month';
      progressPercent = 100;
    } else {
      currentTier = 'Gold';
      tierGoalText = 'You kept your Silver status for this month! Gold VIP status achieved.';
      progressFraction = '10+ / 10 (Max)';
      progressPercent = 100;
    }
  }

  // Tier Colors & Aesthetics
  const tierConfig = {
    Bronze: {
      badgeBg: 'bg-amber-700/80',
      badgeText: 'text-amber-100',
      borderColor: 'border-amber-600/40',
      icon: 'military_tech',
      colorName: 'Bronze Contributor',
      glow: 'shadow-amber-900/30'
    },
    Silver: {
      badgeBg: 'bg-slate-200',
      badgeText: 'text-slate-900',
      borderColor: 'border-slate-300',
      icon: 'stars',
      colorName: 'Silver Contributor',
      glow: 'shadow-slate-500/30'
    },
    Gold: {
      badgeBg: 'bg-amber-400',
      badgeText: 'text-amber-950 font-black',
      borderColor: 'border-amber-300',
      icon: 'workspace_premium',
      colorName: 'Gold Contributor VIP',
      glow: 'shadow-amber-400/40'
    }
  }[currentTier];

  // Rewards Status Check
  // In Version B: starts with Silver and all 3 rewards already unlocked.
  // In Version A: starts at Bronze (locked) and unlocks all 3 rewards at Silver (helpfulPostsCount >= 2).
  const isSilverOrHigher = currentTier === 'Silver' || currentTier === 'Gold';

  const isProfileDecorationUnlocked = isSilverOrHigher;
  const isVoucherUnlocked = isSilverOrHigher;
  const isPriorityAccessUnlocked = isSilverOrHigher;

  const unlockedRewardsCount = [
    isProfileDecorationUnlocked,
    isVoucherUnlocked,
    isPriorityAccessUnlocked
  ].filter(Boolean).length;

  return (
    <div className="mt-3 bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-white shadow-xl relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />

      {/* Header: Title & A/B switcher toggle (only shown when debug=1) */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${tierConfig.badgeBg} ${tierConfig.badgeText} flex items-center justify-center shadow-md`}>
            <span className="material-symbols-outlined text-[18px]">
              {tierConfig.icon}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-orange-200 uppercase font-extrabold tracking-wider block">
              Shopee Community
            </span>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black leading-tight text-white">
                {tierConfig.colorName}
              </h3>
              {helpfulPostsCount > 0 && (
                <span className="bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full">
                  +{helpfulPostsCount} Helpful Post{helpfulPostsCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* A/B Switcher pill: hidden for normal users, only visible when URL contains debug=1 */}
        {isDebugMode && (
          <div className="flex items-center bg-black/40 border border-white/20 rounded-full p-0.5 text-[9px] font-bold">
            <button
              onClick={() => onSwitchVersion('A')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                abVersion === 'A'
                  ? 'bg-[#b22204] text-white shadow-xs font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Ver A
            </button>
            <button
              onClick={() => onSwitchVersion('B')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                abVersion === 'B'
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Ver B
            </button>
          </div>
        )}
      </div>

      {/* Goal description callout */}
      <p className="text-xs text-white/90 leading-snug font-medium mb-2.5">
        {tierGoalText}
      </p>

      {/* Progress Bar */}
      <div className="space-y-1 mb-3">
        <div className="flex justify-between text-[10px] text-orange-100 font-semibold">
          <span>Tier Progress</span>
          <span className="tabular-nums font-mono">{progressFraction}</span>
        </div>
        <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3 Rewards Section: Profile decoration, Small voucher, Priority access to flash deals */}
      <div className="pt-2.5 border-t border-white/15">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black uppercase text-orange-200 tracking-wider">
            Contributor Rewards
          </span>
          <span className="text-[9px] text-white/70">
            {unlockedRewardsCount === 0 ? 'Locked' : `${unlockedRewardsCount} of 3 Unlocked`}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center">
          {/* Reward 1: Profile decoration */}
          <div className={`p-2 rounded-xl border flex flex-col items-center justify-between transition-all ${
            isProfileDecorationUnlocked
              ? 'bg-white/15 border-amber-300/60 text-white'
              : 'bg-black/20 border-white/5 text-white/50'
          }`}>
            <span className={`material-symbols-outlined text-[18px] mb-0.5 ${
              isProfileDecorationUnlocked ? 'text-amber-300' : 'text-white/40'
            }`}>
              auto_awesome
            </span>
            <span className="text-[10px] font-bold leading-tight line-clamp-1">
              Profile Deco
            </span>
            <span className={`text-[8px] font-black px-1 py-0.2 rounded-full mt-1 ${
              isProfileDecorationUnlocked ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/50'
            }`}>
              {isProfileDecorationUnlocked ? 'Unlocked' : 'Silver Tier'}
            </span>
          </div>

          {/* Reward 2: Small voucher */}
          <div 
            onClick={() => isVoucherUnlocked && onOpenVouchers()}
            className={`p-2 rounded-xl border flex flex-col items-center justify-between transition-all ${
              isVoucherUnlocked
                ? 'bg-white/15 border-amber-300/60 text-white cursor-pointer hover:bg-white/20'
                : 'bg-black/20 border-white/5 text-white/50'
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] mb-0.5 ${
              isVoucherUnlocked ? 'text-amber-300' : 'text-white/40'
            }`}>
              confirmation_number
            </span>
            <span className="text-[10px] font-bold leading-tight line-clamp-1">
              $5 Voucher
            </span>
            <span className={`text-[8px] font-black px-1 py-0.2 rounded-full mt-1 ${
              isVoucherUnlocked ? 'bg-emerald-400 text-black' : 'bg-white/10 text-white/50'
            }`}>
              {isVoucherUnlocked ? 'Claimable' : 'Silver Tier'}
            </span>
          </div>

          {/* Reward 3: Priority access to flash deals */}
          <div className={`p-2 rounded-xl border flex flex-col items-center justify-between transition-all ${
            isPriorityAccessUnlocked
              ? 'bg-amber-400/20 border-amber-300/80 text-white shadow-xs'
              : 'bg-black/20 border-white/5 text-white/50'
          }`}>
            <span className={`material-symbols-outlined text-[18px] mb-0.5 ${
              isPriorityAccessUnlocked ? 'text-amber-300 animate-pulse' : 'text-white/40'
            }`}>
              bolt
            </span>
            <span className="text-[10px] font-bold leading-tight line-clamp-1">
              Flash Access
            </span>
            <span className={`text-[8px] font-black px-1 py-0.2 rounded-full mt-1 ${
              isPriorityAccessUnlocked ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/50'
            }`}>
              {isPriorityAccessUnlocked ? 'Active' : 'Silver Tier'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
