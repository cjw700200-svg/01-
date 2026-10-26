import React, { useState } from 'react';

interface ScanPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onTopUp: (amount: number) => void;
  initialMode?: 'scan' | 'topup';
}

export const ScanPayModal: React.FC<ScanPayModalProps> = ({
  isOpen,
  onClose,
  balance,
  onTopUp,
  initialMode = 'scan'
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'scan' | 'code' | 'topup'>(initialMode);
  const [selectedTopUpAmount, setSelectedTopUpAmount] = useState<number>(20);
  const [topUpSuccess, setTopUpSuccess] = useState<boolean>(false);

  const handleExecuteTopUp = () => {
    onTopUp(selectedTopUpAmount);
    setTopUpSuccess(true);
    setTimeout(() => {
      setTopUpSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#1b1c1c] text-white flex flex-col justify-between shadow-2xl relative">
        {/* Top App Bar */}
        <div className="p-3 flex items-center justify-between border-b border-white/10">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="text-center">
            <h2 className="text-sm font-extrabold">ShopeePay Singapore</h2>
            <p className="text-[10px] text-amber-300">Balance: ${balance.toFixed(2)} SGD</p>
          </div>
          <button
            onClick={() => setActiveTab('topup')}
            className="text-xs font-bold text-[#b22204] bg-white px-2.5 py-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            Top Up
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-black/40">
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'scan' ? 'border-[#b22204] text-[#b22204]' : 'border-transparent text-slate-400'
            }`}
          >
            Scan QR
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'code' ? 'border-[#b22204] text-[#b22204]' : 'border-transparent text-slate-400'
            }`}
          >
            Pay / QR Code
          </button>
          <button
            onClick={() => setActiveTab('topup')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'topup' ? 'border-[#b22204] text-[#b22204]' : 'border-transparent text-slate-400'
            }`}
          >
            Top Up Wallet
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
          {activeTab === 'scan' && (
            <div className="w-full flex flex-col items-center">
              {/* Camera Scanner Viewport Mock */}
              <div className="relative w-64 h-64 border-2 border-white/40 rounded-2xl overflow-hidden flex items-center justify-center bg-black/60 shadow-2xl">
                {/* Corner reticles */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#b22204]" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#b22204]" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#b22204]" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#b22204]" />

                {/* Laser animation */}
                <div className="absolute inset-x-0 h-1 bg-[#b22204] shadow-[0_0_12px_#b22204] animate-bounce" />

                <span className="material-symbols-outlined text-4xl text-white/30">
                  qr_code_scanner
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-4 text-center max-w-xs">
                Align SGQR / ShopeePay QR code within the frame to pay at merchants or transfer to friends.
              </p>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="w-full max-w-sm bg-white text-slate-900 rounded-2xl p-5 shadow-2xl flex flex-col items-center text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                ShopeePay Merchant Payment Code
              </span>

              {/* Barcode mockup */}
              <div className="w-full h-14 bg-slate-100 rounded flex items-center justify-center my-3 px-2">
                <div className="w-full flex justify-between tracking-widest text-[9px] font-mono text-slate-700">
                  ||||| | |||| ||| |||||| | |||||||| |||| | ||||
                </div>
              </div>
              <p className="font-mono text-xs text-slate-600 mb-2">9881 0182 4432 09</p>

              {/* QR Code mockup */}
              <div className="w-36 h-36 bg-slate-50 border-2 border-slate-200 rounded-xl p-2 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-7xl text-slate-800">
                  qr_code_2
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 font-medium">
                Present this QR code to the cashier to pay automatically from your ShopeePay wallet.
              </p>
            </div>
          )}

          {activeTab === 'topup' && (
            <div className="w-full max-w-sm bg-white text-slate-900 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdad3] flex items-center justify-center text-[#b22204]">
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold">Top Up ShopeePay</h3>
                  <p className="text-[10px] text-slate-500">Instant via PayNow / FAST Bank Transfer</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3">
                {[10, 20, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedTopUpAmount(amt)}
                    className={`py-2.5 rounded-xl border text-sm font-extrabold transition-all ${
                      selectedTopUpAmount === amt
                        ? 'border-[#b22204] bg-[#ffdad3]/40 text-[#b22204] scale-102 shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    ${amt}.00 SGD
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 space-y-1 my-3">
                <div className="flex justify-between">
                  <span>Current Balance:</span>
                  <span className="font-bold text-slate-900">${balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#b22204] font-bold">
                  <span>New Balance after Top Up:</span>
                  <span>${(balance + selectedTopUpAmount).toFixed(2)}</span>
                </div>
              </div>

              {topUpSuccess ? (
                <div className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Top Up of ${selectedTopUpAmount} Successful!
                </div>
              ) : (
                <button
                  onClick={handleExecuteTopUp}
                  className="w-full py-2.5 bg-[#b22204] text-white rounded-xl text-xs font-bold hover:bg-orange-700 shadow-md transition-colors"
                >
                  Confirm PayNow Top Up (${selectedTopUpAmount}.00)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
