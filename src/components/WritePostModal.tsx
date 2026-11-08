import React, { useState } from 'react';
import { DiscussionPost } from '../types';

interface WritePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  defaultCategory?: string;
  onSubmitPost: (newPost: DiscussionPost) => void;
}

export const WritePostModal: React.FC<WritePostModalProps> = ({
  isOpen,
  onClose,
  productId = 'prod-1',
  productName = 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
  defaultCategory = 'Electronics',
  onSubmitPost
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<string>(defaultCategory);
  const [targetProduct, setTargetProduct] = useState<string>(productName);
  const [rating, setRating] = useState<number>(5);
  const [matchedDescription, setMatchedDescription] = useState<string>('Yes, completely accurate');
  const [qualitySize, setQualitySize] = useState<string>('True to size & great quality');
  const [wouldBuyAgain, setWouldBuyAgain] = useState<string>('Yes, 100% recommend');
  const [content, setContent] = useState<string>('');

  const categories = ['Electronics', 'Beauty', 'Fashion', 'Home', 'Groceries'];

  const productPresets: Record<string, { id: string; name: string; image: string }> = {
    'Electronics': {
      id: 'prod-1',
      name: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei'
    },
    'Beauty': {
      id: 'prod-5',
      name: 'High-Tech Multi-Functional Air Styler & Blow Dryer Wand',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8nsUsllLGML_VugM2boqrbMr-YPVc-PjvS74wEw9aNGukvns0rBVBgSBpSrPjRDH_jNOOItpKJr7sdIIHt8AeosO_EnEu4PUWG6Bjt3a2A2iHYzOzEyxyfLDvhf9ONAaSstoBbmzQhLkZ_cjcG5t6uNVK0ClkEVynbmGBm4v5E4D5jDFhlV1XxqjFmI2zQXXK8RzRnH7uokidaHpeOdnjqhaeSFfoR3sLCC1kUYS_Z7iXZfvLa7s'
    },
    'Fashion': {
      id: 'prod-6',
      name: 'Korean Oversized Heavyweight Cotton Graphic Tee',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRfJnIT69gcv1NhVqlF2jVDFEK2pDVavVZCcn7Rj7j6Yu8doTOKz8ToaynDB8C1SUsKzZLPaTP1OoAwWtkuHHs-0fCT7c_C-ggjDaKp6NmwpOzf8qAEuHdLUwOcruS5vo5nJtSicRfJaykcNDcml0ZZXtyzcraSUNGZRaG_RaZ519p1FwDrVB6cbCW1M5G8WHkUr0C8LhnC4U0_VSmE0Mi7YyGRzPHuOxs7UN4SERE-54TACLicab3'
    },
    'Home': {
      id: 'prod-2',
      name: 'Ergonomic Mesh Office Chair with Lumbar Support High Back',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1SLqVlUxgncraEngFDmi1DwVxOR9YlUgUZx1J5uiLfnfFCniDLOrr_qyTFKP-yaO0anzYAMR0sCwflahrGgvZ4D2vSvM5zaqq4oJUZZpGp07zMsOvtmfo7tSGN5BLhQb0ZAsh1VMJfqhv1xgKtv3uOwj4I_ceCVoCB64f5wCp0C3Kn-EZA-nl3Dgym7UMNjIer-S117oRXc-3wBNDVEkHelZOFMBqA5UkJsLE27uFFXXvI04w3k_A'
    },
    'Groceries': {
      id: 'prod-4',
      name: 'Nissin Instant Cup Noodles Laksa Flavour Pack of 12',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4jskZmsb_8xRXboQI1Zkn0CEZ0T-Ym8Djj823KSEhsv9bABIcJzCth6dmPcLPv1RZuPPLHI4_9F1IZZqdx-rZ5oDBp9Ta3FTdodZ3emh2f-YeqSMJoMwZyFA-dxToZENk53TZe_E00jK8zN8eIbYRMhkR4t5A_NKAJe8f2tolAZ4AGECMdnhrHHM6iSur-NpQdFt6seSB4_nfp-7PxtkNhRFu7SnTyP05vfH5OCEH4t-XkoIJFpqx'
    }
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    if (productPresets[cat]) {
      setTargetProduct(productPresets[cat].name);
    }
  };

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
    const chosenProduct = productPresets[category] || {
      id: productId,
      name: targetProduct,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei'
    };

    const newPost: DiscussionPost = {
      id: `user-post-${Date.now()}`,
      productId: chosenProduct.id,
      productName: targetProduct,
      productImage: chosenProduct.image,
      category,
      authorName: 'wy19881018 (You)',
      authorAvatar: '👤',
      authorTier: 'Silver',
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
              <p className="text-[10px] text-orange-100">+20 Contributor Points on submit</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">
            +20 Pts
          </span>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Category Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Select Category:</span>
              <span className="text-[10px] text-[#b22204] font-semibold">Required</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    category === cat
                      ? 'border-[#b22204] bg-[#b22204] text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Name input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">
              Product Name:
            </label>
            <input
              type="text"
              value={targetProduct}
              onChange={(e) => setTargetProduct(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b22204]"
              placeholder="e.g. UGREEN 65W Charger"
            />
          </div>

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
              <strong>Demo simulation:</strong> Submitting awards <strong>+20 points</strong>. Your post will then automatically gain Agree votes until reaching 10 to become a <strong>Helpful Post (+30 points)</strong>!
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
            Submit Post &amp; Earn +20 Points
          </button>
        </div>
      </div>
    </div>
  );
};
