import React from 'react';
import { ContributorTierCard } from './ContributorTierCard';

interface MeProfileScreenProps {
  shopeePayBalance: number;
  coinsBalance: number;
  onOpenTopUp: () => void;
  onOpenScanPay: () => void;
  onOpenVouchers: () => void;
  onOpenOrderTrack: (status?: string) => void;
  onOpenPrizes: () => void;
  abVersion: 'A' | 'B';
  helpfulPostsCount: number;
  onSwitchVersion: (version: 'A' | 'B') => void;
}

export const MeProfileScreen: React.FC<MeProfileScreenProps> = ({
  shopeePayBalance,
  coinsBalance,
  onOpenTopUp,
  onOpenScanPay,
  onOpenVouchers,
  onOpenOrderTrack,
  onOpenPrizes,
  abVersion,
  helpfulPostsCount,
  onSwitchVersion
}) => {
  const isSilverOrHigher = abVersion === 'B' || helpfulPostsCount >= 2;
  const isGold = helpfulPostsCount >= 10;
  const contributorTierLabel = isGold ? 'Gold Contributor' : isSilverOrHigher ? 'Silver Contributor' : 'Bronze Contributor';

  return (
    <div className="flex flex-col w-full bg-[#f5f3f3] min-h-screen pb-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#b22204] via-[#d63c1e] to-[#bb0017] text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold opacity-80">Shopee Singapore</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenScanPay}
              aria-label="Scan QR Code" 
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            </button>
            <button 
              aria-label="Account Settings" 
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-amber-300 p-0.5 shadow-md flex items-center justify-center text-[#b22204] font-black text-xl shrink-0">
            <span className="material-symbols-outlined text-[36px]">account_circle</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base font-extrabold truncate">wy19881018</h2>
              <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase flex items-center gap-0.5 shadow-sm">
                <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                {contributorTierLabel}
              </span>
            </div>
            <p className="text-xs text-orange-100 mt-0.5 font-medium">
              Shopee VIP Member · SG Singapore
            </p>
          </div>
        </div>

        {/* Contributor Tier Card (Replaces Platinum Tier box) */}
        <ContributorTierCard
          abVersion={abVersion}
          helpfulPostsCount={helpfulPostsCount}
          onSwitchVersion={onSwitchVersion}
          onOpenVouchers={onOpenVouchers}
        />
      </div>

      {/* My Purchases Section */}
      <div className="mt-2.5 px-2">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#b22204] text-[18px]">receipt_long</span>
              My Purchases
            </h3>
            <button 
              onClick={() => onOpenOrderTrack('All')}
              className="text-[11px] text-slate-500 hover:text-[#b22204] flex items-center font-medium"
            >
              View Purchase History
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          {/* 4 Order Status Tabs */}
          <div className="grid grid-cols-4 gap-1 pt-3 text-center">
            <button 
              onClick={() => onOpenOrderTrack('To Pay')}
              className="flex flex-col items-center group"
            >
              <div className="relative text-slate-700 group-hover:text-[#b22204] transition-colors">
                <span className="material-symbols-outlined text-[26px]">account_balance_wallet</span>
                <span className="absolute -top-1 -right-2 bg-[#b22204] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-700 mt-1">To Pay</span>
            </button>

            <button 
              onClick={() => onOpenOrderTrack('To Ship')}
              className="flex flex-col items-center group"
            >
              <div className="relative text-slate-700 group-hover:text-[#b22204] transition-colors">
                <span className="material-symbols-outlined text-[26px]">package_2</span>
                <span className="absolute -top-1 -right-2 bg-[#b22204] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-700 mt-1">To Ship</span>
            </button>

            <button 
              onClick={() => onOpenOrderTrack('To Receive')}
              className="flex flex-col items-center group"
            >
              <div className="relative text-slate-700 group-hover:text-[#b22204] transition-colors">
                <span className="material-symbols-outlined text-[26px]">local_shipping</span>
                <span className="absolute -top-1 -right-2 bg-[#b22204] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-700 mt-1">To Receive</span>
            </button>

            <button 
              onClick={() => onOpenOrderTrack('To Rate')}
              className="flex flex-col items-center group"
            >
              <div className="relative text-slate-700 group-hover:text-[#b22204] transition-colors">
                <span className="material-symbols-outlined text-[26px]">rate_review</span>
                <span className="absolute -top-1 -right-2 bg-[#b22204] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-700 mt-1">To Rate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Digital Wallet & Finances Section */}
      <div className="mt-2.5 px-2">
        <div className="bg-white rounded-xl p-3 shadow-sm divide-y divide-slate-100">
          <div className="pb-2.5 flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1">
              <span className="material-symbols-outlined text-amber-600 text-[18px]">account_balance_wallet</span>
              My Digital Wallet
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Verified User
            </span>
          </div>

          {/* ShopeePay Row */}
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#ffdad3] flex items-center justify-center text-[#b22204]">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#1b1c1c]">ShopeePay Balance</p>
                <p className="text-[10px] text-slate-500">PayNow &amp; Bank Transfer linked</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-[#1b1c1c] tabular-nums">
                ${shopeePayBalance.toFixed(2)}
              </span>
              <button
                onClick={onOpenTopUp}
                className="bg-[#b22204] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm hover:bg-orange-700"
              >
                Top Up
              </button>
            </div>
          </div>

          {/* Shopee Coins Row */}
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined text-[18px]">monetization_on</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#1b1c1c]">Shopee Coins</p>
                <p className="text-[10px] text-slate-500">Worth S${(coinsBalance / 100).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-amber-700 tabular-nums">
                {coinsBalance.toLocaleString()} Coins
              </span>
              <button
                onClick={onOpenPrizes}
                className="bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm hover:bg-amber-600"
              >
                Spin &amp; Earn
              </button>
            </div>
          </div>

          {/* SPayLater Row */}
          <div className="pt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined text-[18px]">credit_score</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#1b1c1c]">SPayLater (Buy Now Pay Later)</p>
                <p className="text-[10px] text-slate-500">Up to 12 months 0% instalment</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-700">
              $1,200.00 Limit
            </span>
          </div>
        </div>
      </div>

      {/* Utilities & Coupons */}
      <div className="mt-2.5 px-2">
        <div className="bg-white rounded-xl shadow-sm divide-y divide-slate-100 overflow-hidden">
          <button 
            onClick={onOpenVouchers}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b22204] text-[20px]">confirmation_number</span>
              <span className="text-xs font-medium text-[#1b1c1c]">My Voucher Wallet</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span className="text-xs text-[#b22204] font-bold">4 active vouchers</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </button>

          <button 
            onClick={onOpenPrizes}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-600 text-[20px]">featured_seasonal_and_gifts</span>
              <span className="text-xs font-medium text-[#1b1c1c]">Shopee Lucky Prizes &amp; Games</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span className="text-xs text-purple-600 font-bold">Free Daily Spin!</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </button>

          <div className="w-full p-3 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">support_agent</span>
              <span className="text-xs font-medium text-[#1b1c1c]">Help Centre &amp; Live Agent</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[16px]">chevron_right</span>
          </div>
        </div>
      </div>
    </div>
  );
};
