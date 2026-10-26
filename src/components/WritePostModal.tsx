import React, { useState } from 'react';
import { DiscussionPost } from '../types';

interface WritePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  onSubmitPost: (newPost: DiscussionPost) => void;
}

export const WritePostModal: React.FC<WritePostModalProps> = ({
  isOpen,
  onClose,
  productId,
  productName,
  onSubmitPost
}) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState<number>(5);
  const [matchedDescription, setMatchedDescription] = useState<string>('Yes, completely accurate');
  const [qualitySize, setQualitySize] = useState<string>('True to size & great quality');
  const [wouldBuyAgain, setWouldBuyAgain] = useState<string>('Yes, 100% recommend');
  const [content, setContent] = useState<string>('');

  const descriptionOptions = [
    'Yes, completely accurate',
    'Mostly, minor differences',
    'No, inaccurate'
  ];

  const qualityOptions = [
    'True to size & great quality',
    'Standard quality',
    'Smaller / larger than expected',
    'Poor / flawed quality'
  ];

  const buyAgainOptions = [
    'Yes, 100% recommend',
    'Maybe on discount',
    'No, would not recommend'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const sentiment: 'positive' | 'critical' = rating >= 4 ? 'positive' : 'critical';

    const newPost: DiscussionPost = {
      id: `user-post-${Date.now()}`,
      productId,
      authorName: 'wy19881018 (You)',
      authorAvatar: '👤',
      isCurrentUser: true,
      date: 'Just now',
      sentiment,
      rating,
      answers: {
        matchedDescription,
        qualitySize,
        wouldBuyAgain
      },
      content: content.trim(),
      agreeCount: 2, // Starts at 2, will increment to 10 in demo!
      disagreeCount: 0,
      isHelpful: false
    };

    onSubmitPost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-white flex flex-col justify-between shadow-2xl relative">
        {/* Top App Bar */}
        <div className="bg-[#b22204] text-white p-3.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/20 transition-colors"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div>
              <h2 className="text-sm font-bold">Write a Discussion Post</h2>
              <p className="text-[10px] text-orange-100 truncate max-w-[260px]">{productName}</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">
            Earn Tier Points
          </span>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Star Rating */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Overall Experience:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {star <= rating ? 'star' : 'star_outline'}
                  </span>
                </button>
              ))}
              <span className="ml-1 text-xs font-extrabold text-[#b22204]">{rating}/5</span>
            </div>
          </div>

          {/* Guided Question 1: Did it match the description? */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#b22204] flex items-center justify-center text-[10px] font-black">
                1
              </span>
              Did it match the description?
            </label>
            <div className="grid grid-cols-1 gap-1.5 pt-0.5">
              {descriptionOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setMatchedDescription(opt)}
                  className={`py-2 px-3 rounded-lg text-xs text-left border transition-all ${
                    matchedDescription === opt
                      ? 'border-[#b22204] bg-[#ffdad3]/40 text-[#b22204] font-bold shadow-xs'
                      : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                  }`}
                >
                  {matchedDescription === opt && '✓ '} {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Guided Question 2: Quality / size? */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#b22204] flex items-center justify-center text-[10px] font-black">
                2
              </span>
              Quality / size?
            </label>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              {qualityOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setQualitySize(opt)}
                  className={`py-2 px-2.5 rounded-lg text-xs text-left border transition-all ${
                    qualitySize === opt
                      ? 'border-[#b22204] bg-[#ffdad3]/40 text-[#b22204] font-bold shadow-xs'
                      : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                  }`}
                >
                  {qualitySize === opt && '✓ '} {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Guided Question 3: Would you buy again? */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#b22204] flex items-center justify-center text-[10px] font-black">
                3
              </span>
              Would you buy again?
            </label>
            <div className="grid grid-cols-1 gap-1.5 pt-0.5">
              {buyAgainOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setWouldBuyAgain(opt)}
                  className={`py-2 px-3 rounded-lg text-xs text-left border transition-all ${
                    wouldBuyAgain === opt
                      ? 'border-[#b22204] bg-[#ffdad3]/40 text-[#b22204] font-bold shadow-xs'
                      : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                  }`}
                >
                  {wouldBuyAgain === opt && '✓ '} {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Experience Text Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#b22204] flex items-center justify-center text-[10px] font-black">
                  4
                </span>
                Detailed Review &amp; Discussion
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Min. 10 characters</span>
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell other Singapore shoppers about real usage, pros, cons, and tips for this item..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#b22204] focus:border-[#b22204] leading-relaxed resize-none"
            />
          </div>

          {/* Demo Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">
              bolt
            </span>
            <span>
              <strong>Demo simulation:</strong> Once submitted, your post will automatically receive community Agree votes over a few seconds until reaching 10 and qualifying as a <strong>Helpful Post</strong>!
            </span>
          </div>
        </form>

        {/* Bottom CTA Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shadow-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!content.trim()}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md ${
              content.trim()
                ? 'bg-[#b22204] text-white hover:bg-orange-700 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Post &amp; Share with SG Shoppers
          </button>
        </div>
      </div>
    </div>
  );
};
