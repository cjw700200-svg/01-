import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { LIVE_STREAMS } from '../data/mockData';

interface ShopeeLiveScreenProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, option?: string) => void;
  onEarnCoins: (amount: number) => void;
}

interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  color?: string;
}

export const ShopeeLiveScreen: React.FC<ShopeeLiveScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  onEarnCoins
}) => {
  const [activeStreamIndex, setActiveStreamIndex] = useState(0);
  const stream = LIVE_STREAMS[activeStreamIndex];
  
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);
  const [likeCount, setLikeCount] = useState(stream.likes);
  const [coinBoxClaimed, setCoinBoxClaimed] = useState(false);
  const [coinCountdown, setCoinCountdown] = useState(25);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Rachel_Tan', avatar: '🌸', text: 'Does it come with SG 3-pin safety mark?' },
    { id: '2', user: 'Bryan_Lee', avatar: '⚡', text: 'Just claimed the $80 voucher!! Checkout now!' },
    { id: '3', user: 'ShopeeBot', avatar: '🤖', text: '🔥 Flash voucher: LIVE80 applied for all viewers!', color: 'text-amber-300 font-bold' },
    { id: '4', user: 'Chloe_99', avatar: '✨', text: 'Are the replacement attachments included?' }
  ]);
  const [myInputMessage, setMyInputMessage] = useState('');

  // Floating hearts generator
  const triggerLike = () => {
    setLikeCount((prev) => prev + 1);
    const newHeart = {
      id: Date.now() + Math.random(),
      left: 60 + Math.random() * 30
    };
    setHearts((prev) => [...prev.slice(-15), newHeart]);
  };

  // Simulate incoming live chats
  useEffect(() => {
    const mockUsers = ['Sarah_Lim', 'Kenneth_W', 'MeiMei_SG', 'TechGeek88', 'Joyce_K'];
    const mockTexts = [
      'Wah so cheap today!',
      'Ordered 2 sets already!',
      'How long is delivery to Jurong?',
      'Can use Shopee Coins?',
      'Support local SG sellers!'
    ];

    const interval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: randomUser,
        avatar: '🛍️',
        text: randomText
      };
      setChatMessages((prev) => [...prev.slice(-10), newMsg]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Coin box timer
  useEffect(() => {
    if (coinCountdown > 0 && !coinBoxClaimed) {
      const timer = setTimeout(() => setCoinCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [coinCountdown, coinBoxClaimed]);

  const handleClaimLiveCoins = () => {
    if (coinCountdown === 0 && !coinBoxClaimed) {
      setCoinBoxClaimed(true);
      onEarnCoins(50);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myInputMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'You',
        avatar: '👤',
        text: myInputMessage.trim(),
        color: 'text-orange-300 font-bold'
      }
    ]);
    setMyInputMessage('');
  };

  return (
    <div className="relative w-full h-[calc(100vh-120px)] bg-black text-white overflow-hidden flex flex-col justify-between">
      {/* Stream Background Mockup with Host Video Backdrop */}
      <div className="absolute inset-0 z-0">
        <img 
          src={stream.coverImage} 
          alt={stream.title}
          className="w-full h-full object-cover filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {hearts.map((h) => (
          <div
            key={h.id}
            style={{ right: `${100 - h.left}%` }}
            className="absolute bottom-28 text-2xl animate-ping text-red-500 opacity-90 transition-all duration-1000"
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Top Stream Header */}
      <div className="relative z-10 px-3 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full pl-1 pr-3 py-1 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#bb0017] flex items-center justify-center font-bold text-xs">
            {stream.hostName.slice(0, 2).toUpperCase()}
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold truncate max-w-[110px]">{stream.hostName}</span>
              <span className="bg-[#bb0017] text-[8px] font-black px-1 rounded uppercase">LIVE</span>
            </div>
            <span className="text-[10px] text-slate-300 flex items-center gap-1">
              <span className="material-symbols-outlined text-[11px]">visibility</span>
              {stream.viewers} viewers
            </span>
          </div>
          <button className="ml-1 bg-[#b22204] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            + Follow
          </button>
        </div>

        {/* Live Channel Selector */}
        <div className="flex items-center gap-1.5">
          {LIVE_STREAMS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStreamIndex(idx)}
              className={`w-7 h-7 rounded-full text-xs font-bold border transition-all ${
                activeStreamIndex === idx
                  ? 'border-white bg-[#b22204] scale-110 shadow-lg'
                  : 'border-white/40 bg-black/40 text-slate-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Stream Title & Badge */}
      <div className="relative z-10 px-3 mt-2">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 max-w-[85%] border border-white/10">
          <span className="text-[9px] bg-amber-500 text-black font-extrabold px-1.5 py-0.5 rounded mr-1.5">
            {stream.badge}
          </span>
          <span className="text-xs font-bold leading-snug">{stream.title}</span>
        </div>
      </div>

      {/* Middle Interactive Coin Drop Box */}
      <div className="relative z-10 px-3 flex justify-end">
        <button
          onClick={handleClaimLiveCoins}
          className={`flex flex-col items-center p-2 rounded-xl border backdrop-blur-md transition-transform active:scale-95 ${
            coinBoxClaimed
              ? 'bg-slate-800/80 border-slate-700 text-slate-400'
              : coinCountdown === 0
              ? 'bg-amber-500 border-amber-300 text-black animate-bounce shadow-lg shadow-amber-500/50'
              : 'bg-black/60 border-amber-400/40 text-amber-300'
          }`}
        >
          <span className="material-symbols-outlined text-[26px]">
            monetization_on
          </span>
          <span className="text-[10px] font-extrabold uppercase mt-0.5">
            {coinBoxClaimed ? 'Claimed' : coinCountdown === 0 ? 'Claim 50 Coins!' : `${coinCountdown}s`}
          </span>
        </button>
      </div>

      {/* Bottom Live Area: Chat & Featured Pin Card */}
      <div className="relative z-10 px-3 pb-3 flex flex-col gap-2">
        {/* Chat Feed */}
        <div className="h-28 overflow-y-auto no-scrollbar flex flex-col gap-1.5 justify-end">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs max-w-[85%] inline-flex items-center gap-1.5 border border-white/5"
            >
              <span>{msg.avatar}</span>
              <span className="font-bold text-slate-300 text-[11px]">{msg.user}:</span>
              <span className={`text-[11px] ${msg.color || 'text-white'}`}>{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Pinned Featured Item Card */}
        <div className="bg-white text-slate-900 rounded-xl p-2 shadow-2xl flex items-center justify-between gap-2 border border-orange-200">
          <div 
            onClick={() => onSelectProduct(stream.featuredProduct)}
            className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
              <img
                src={stream.featuredProduct.imageUrl}
                alt={stream.featuredProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-0 right-0 bg-[#bb0017] text-white text-[8px] font-bold px-1 rounded-bl">
                LIVE
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold truncate leading-tight">
                {stream.featuredProduct.name}
              </h4>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-extrabold text-[#b22204] tabular-nums">
                  ${stream.featuredProduct.price.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400 line-through tabular-nums">
                  ${stream.featuredProduct.originalPrice.toFixed(2)}
                </span>
                <span className="text-[9px] bg-red-100 text-[#bb0017] font-bold px-1 rounded">
                  {stream.liveDiscountText}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onAddToCart(stream.featuredProduct)}
              className="bg-orange-50 text-[#b22204] border border-[#b22204] p-2 rounded-lg font-bold hover:bg-orange-100 transition-colors"
              title="Add to cart"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            </button>
            <button
              onClick={() => onSelectProduct(stream.featuredProduct)}
              className="bg-[#b22204] text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-orange-700 shadow-md transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Live Chat Input Bar */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
            <input
              type="text"
              value={myInputMessage}
              onChange={(e) => setMyInputMessage(e.target.value)}
              placeholder="Say something to host..."
              className="bg-transparent text-xs text-white placeholder-slate-400 flex-1 focus:outline-none"
            />
            <button type="submit" className="text-white hover:text-orange-400 transition-colors">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>

          {/* Like Heart Button */}
          <button
            onClick={triggerLike}
            className="w-10 h-10 rounded-full bg-red-600/90 text-white flex flex-col items-center justify-center shadow-lg active:scale-90 transition-transform"
            aria-label="Send Hearts"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            <span className="text-[8px] font-extrabold leading-none">{likeCount > 9999 ? `${(likeCount/1000).toFixed(1)}k` : likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
