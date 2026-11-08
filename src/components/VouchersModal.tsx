import React from 'react';
import { Voucher } from '../types';

interface VouchersModalProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers: Voucher[];
  onClaimVoucher: (id: string) => void;
}

export const VouchersModal: React.FC<VouchersModalProps> = ({
  isOpen,
  onClose,
  vouchers,
  onClaimVoucher
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#f5f3f3] flex flex-col justify-start shadow-2xl">
        {/* Header */}
        <div className="bg-[#b22204] text-white p-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/20"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h2 className="text-base font-extrabold">Shopee Voucher Centre</h2>
          </div>
          <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
            Singapore Deals
          </span>
        </div>

        {/* Voucher List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
              <h3 className="text-xs font-black uppercase tracking-wider">Mega Sale Voucher Drop</h3>
            </div>
            <p className="text-xs text-orange-100">
              Claim daily vouchers to enjoy stacked savings on Free Shipping and Shopee Mall brands!
            </p>
          </div>

          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-100 flex items-center justify-between gap-3 relative overflow-hidden"
            >
              {/* Left indicator strip */}
              <div className={`absolute left-0 inset-y-0 w-1.5 ${
                voucher.type === 'shipping' ? 'bg-[#006859]' : 'bg-[#b22204]'
              }`} />

              <div className="flex-1 pl-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    voucher.type === 'shipping' 
                      ? 'bg-emerald-100 text-[#006859]' 
                      : 'bg-red-100 text-[#b22204]'
                  }`}>
                    {voucher.type.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {voucher.expiryDate}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#1b1c1c] leading-tight">
                  {voucher.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {voucher.description}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                  Code: {voucher.code}
                </span>
              </div>

              <div className="shrink-0 flex flex-col items-center">
                <button
                  onClick={() => onClaimVoucher(voucher.id)}
                  disabled={voucher.claimed}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                    voucher.claimed
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : 'bg-[#b22204] text-white hover:bg-orange-700 active:scale-95'
                  }`}
                >
                  {voucher.claimed ? 'Claimed' : 'Claim'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
