import React, { useState } from 'react';

interface PrizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins: (amount: number) => void;
}

export const PrizesModal: React.FC<PrizesModalProps> = ({
  isOpen,
  onClose,
  onRewardCoins
}) => {
  if (!isOpen) return null;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prizeWon, setPrizeWon] = useState<string | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(2);

  const prizes = [
    { label: '50 Coins', amount: 50 },
    { label: 'Free Ship', amount: 20 },
    { label: '100 Coins', amount: 100 },
    { label: '20 Coins', amount: 20 },
    { label: '80 Coins', amount: 80 },
    { label: '200 Coins', amount: 200 }
  ];

  const handleSpin = () => {
    if (isSpinning || spinsLeft <= 0) return;
    setIsSpinning(true);
    setPrizeWon(null);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];
    const segmentAngle = 360 / prizes.length;
    const targetRotation = rotation + 1800 + randomIndex * segmentAngle;

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinsLeft((s) => s - 1);
      setPrizeWon(selectedPrize.label);
      onRewardCoins(selectedPrize.amount);
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#b22204] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
        {/* Top Bar */}
        <div className="p-3 flex items-center justify-between border-b border-white/20">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="text-center">
            <h2 className="text-sm font-extrabold">Shopee Lucky Spin</h2>
            <p className="text-[10px] text-amber-300">Daily Free Chances: {spinsLeft}</p>
          </div>
          <div className="w-9" />
        </div>

        {/* Game Arena */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center mb-4">
            <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              Win up to 200 Coins!
            </span>
            <h1 className="text-xl font-black mt-1">Spin to Win Rewards</h1>
          </div>

          {/* Wheel Frame */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Pointer Indicator */}
            <div className="absolute -top-3 z-20 text-amber-300 text-3xl filter drop-shadow">
              ▼
            </div>

            {/* Rotating Wheel Container */}
            <div
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
              }}
              className="w-60 h-60 rounded-full border-4 border-amber-300 shadow-2xl overflow-hidden relative bg-gradient-to-tr from-amber-500 via-orange-400 to-red-500 flex items-center justify-center"
            >
              {prizes.map((p, i) => {
                const angle = (360 / prizes.length) * i;
                return (
                  <div
                    key={i}
                    style={{ transform: `rotate(${angle}deg)` }}
                    className="absolute w-full h-full flex justify-center pt-2 text-[10px] font-black uppercase text-white drop-shadow"
                  >
                    <span>{p.label}</span>
                  </div>
                );
              })}

              {/* Center Hub */}
              <div className="w-16 h-16 rounded-full bg-white text-[#b22204] font-black text-xs flex flex-col items-center justify-center shadow-lg border-2 border-amber-400 z-10">
                <span>SHOPEE</span>
                <span className="text-[8px]">PRIZES</span>
              </div>
            </div>
          </div>

          {/* Result Banner */}
          {prizeWon && (
            <div className="mt-4 bg-amber-400 text-black px-4 py-2 rounded-xl text-xs font-black shadow-lg animate-bounce flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">celebration</span>
              Congratulations! You won {prizeWon}!
            </div>
          )}

          {/* Spin CTA Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || spinsLeft <= 0}
            className={`mt-6 w-56 py-3 rounded-full text-sm font-black uppercase tracking-wider shadow-xl transition-all ${
              isSpinning || spinsLeft <= 0
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-amber-400 text-slate-900 hover:bg-amber-300 active:scale-95 shadow-amber-500/50'
            }`}
          >
            {isSpinning ? 'Spinning...' : spinsLeft > 0 ? `SPIN NOW (${spinsLeft} Left)` : 'No Spins Left Today'}
          </button>
        </div>
      </div>
    </div>
  );
};
