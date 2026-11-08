import React, { useState } from 'react';
import { Product, CourtCase } from '../types';

interface SellerChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onEscalateToCommunity: (courtCase: CourtCase) => void;
  onOpenCommunityCourt: () => void;
}

export const SellerChatModal: React.FC<SellerChatModalProps> = ({
  isOpen,
  onClose,
  product,
  onEscalateToCommunity,
  onOpenCommunityCourt
}) => {
  if (!isOpen) return null;

  const currentProduct = product || {
    id: 'prod-1',
    name: 'UGREEN 65W GaN Fast Charger USB C 3-Port Laptop Adapter',
    price: 32.90,
    originalPrice: 65.00,
    discountPercentage: 49,
    rating: 4.9,
    soldCount: '2.4k sold',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2dN2s8loa1JMOWczYIG-6OZLp_38szT7s3kQFkPSVv5cV6K6EbbpPD0FRpIqRuYrqpqYlWg93PuQojIozLN6fHWRWqSWsaNjzEMZjL4gWLMKECVFpE6h20MUbt2i6cv6-1lWBQmBj4TBTOPFkwYzjBewWn4vCNdT8Da-espiLVSoZ41JsB0GGdMYR9EBFRqEv_wVuO5YDdeXVeaEEMTzyiqO0YfWCtSfx_94cqtOOMeRNcWOY4Ei',
    category: 'Electronics',
    brand: 'UGREEN Official Store',
    description: 'UGREEN Nexode 65W GaN 3-Port Charger',
    stock: 248
  };

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'buyer' as const,
      senderName: 'Buyer (wy19881018)',
      text: `Hi seller, I received the ${currentProduct.name} yesterday. The unit gets burning hot within 10 minutes and Port C1 completely died and stopped outputting power! I requested a replacement or return.`,
      time: '10:02 AM'
    },
    {
      id: 'm2',
      sender: 'seller' as const,
      senderName: currentProduct.brand || 'Official Store',
      text: 'Hello buyer, thanks for contacting us. Fast-charging GaN adapters generate noticeable surface heat during high wattage negotiation—this is standard behavior noted on manual page 4. As per shop policy, opened accessories cannot be refunded or exchanged.',
      time: '10:14 AM'
    },
    {
      id: 'm3',
      sender: 'buyer' as const,
      senderName: 'Buyer (wy19881018)',
      text: 'Normal warmth does not shut down the device and burn the port! The port is totally dead—0.0V output on my USB multimeter. I tested 3 different certified cables. This is a severe quality defect.',
      time: '10:20 AM'
    },
    {
      id: 'm4',
      sender: 'seller' as const,
      senderName: currentProduct.brand || 'Official Store',
      text: 'All our units undergo strict factory QC and PSB safety mark verification. Warranty does not cover defect claims caused by improper third party cable voltage. We cannot accept return once seal is broken.',
      time: '10:28 AM'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [escalatedCaseId, setEscalatedCaseId] = useState<string | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'buyer' as const,
      senderName: 'Buyer (wy19881018)',
      text: inputText.trim(),
      time: 'Just now'
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const handleAskCommunity = () => {
    const caseId = `CC-${Math.floor(2000 + Math.random() * 7900)}`;

    const maskedBrand = currentProduct.brand
      ? `${currentProduct.brand.charAt(0)}*** Official Store`
      : 'U*** Official SG Store';

    // Build chat excerpt with masked identities, phone numbers, and addresses
    const maskedExcerpt = messages.map((m) => ({
      sender: m.sender,
      senderName: m.sender === 'buyer' ? 'Buyer (W***g - +65 9***-8219)' : maskedBrand,
      text: m.text,
      time: m.time
    }));

    const newCourtCase: CourtCase = {
      id: caseId,
      productId: currentProduct.id,
      productName: currentProduct.name,
      productImage: currentProduct.imageUrl,
      productPrice: currentProduct.price,
      category: currentProduct.category || 'Electronics',
      buyerName: 'W***g (+65 9***-8219)',
      sellerName: maskedBrand,
      shippingAddress: 'Blk *** Bedok Reservoir Rd, #**-142, Singapore',
      createdAt: 'Just now',
      closesInDays: 3,
      buyerClaim: `Item hardware failed after 10 minutes of standard charging: port completely died with 0.0V output and surface temperatures exceeded safety thresholds. Seller refuses return or replacement alleging opened box policy.`,
      photos: [
        currentProduct.imageUrl,
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDCqnzqbyLNG5eSK-wA-o3z38S6X_bhlgbVwi0FdvjCD-CLK71jbIzXTcvh5HhKDIbyjA3uhqzADYt80MiuPgAmmzO1x0zdB6KDaYrV85pG7G_Dniu61L6D4j9Nd_Jvy4_zFMuLymWm9S-V7mW2eC2iHZGhcdasZOfOuNOrvd8v-E4xL99OexXUN-NadNybt61cKjFHc_b-81VkvrSIwDWmgC2-Rwgw56DoB0O5iq5bro4SvQeRbHQv'
      ],
      chatExcerpt: maskedExcerpt,
      sellerStatement: {
        hasReplied: false // "Seller has been notified and has 48 hours to respond"
      },
      votes: {
        buyerRight: 1,
        sellerRight: 0,
        notEnoughInfo: 0
      },
      userVote: null,
      status: 'voting'
    };

    onEscalateToCommunity(newCourtCase);
    setEscalatedCaseId(caseId);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#f5f3f3] flex flex-col justify-between shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#b22204] text-white p-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/20 transition-colors"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div>
              <h2 className="text-sm font-bold flex items-center gap-1">
                {currentProduct.brand || 'Shopee Official Store'}
                <span className="material-symbols-outlined text-[14px] text-amber-300">verified</span>
              </h2>
              <span className="text-[10px] text-orange-200">Order #SG-98129013 · Dispute Active</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-white/80 hover:text-white px-2 py-1"
          >
            Close
          </button>
        </div>

        {/* Product Dispute Context Card */}
        <div className="bg-white p-2.5 border-b border-slate-200 flex items-center gap-2.5 shadow-xs shrink-0">
          <img
            src={currentProduct.imageUrl}
            alt={currentProduct.name}
            className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-800 truncate leading-snug">
              {currentProduct.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-black text-[#b22204]">
                ${currentProduct.price.toFixed(2)}
              </span>
              <span className="text-[10px] bg-red-50 text-red-700 font-bold px-1.5 py-0.2 rounded border border-red-200">
                Quality Dispute
              </span>
            </div>
          </div>
        </div>

        {/* Escalate "Ask the Community" Banner */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 p-3 border-b border-amber-200 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                Disagree on product quality?
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                Escalate to Community Court for impartial peer review.
              </p>
            </div>
          </div>

          <button
            onClick={handleAskCommunity}
            disabled={Boolean(escalatedCaseId)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm transition-all shrink-0 ${
              escalatedCaseId
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-[#b22204] to-orange-600 text-white hover:from-orange-700 hover:to-orange-800 active:scale-95'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {escalatedCaseId ? 'check_circle' : 'balance'}
            </span>
            {escalatedCaseId ? 'Submitted!' : 'Ask the Community'}
          </button>
        </div>

        {/* Case Created Success Banner */}
        {escalatedCaseId && (
          <div className="bg-emerald-50 border-b border-emerald-200 p-2.5 flex items-center justify-between px-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                verified
              </span>
              <div>
                <p className="text-xs font-black text-emerald-800">
                  Case #{escalatedCaseId} Created in Community Court!
                </p>
                <p className="text-[10px] text-emerald-700">
                  All personal data &amp; addresses masked.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenCommunityCourt();
              }}
              className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs hover:bg-emerald-800 transition-colors"
            >
              View Court Case →
            </button>
          </div>
        )}

        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'buyer' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] font-bold text-slate-500 mb-0.5 px-1">
                {m.senderName}
              </span>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                  m.sender === 'buyer'
                    ? 'bg-[#b22204] text-white rounded-br-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="bg-white p-2.5 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your reply to seller..."
            className="flex-1 text-xs bg-slate-100 rounded-full px-4 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#b22204]"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#b22204] text-white flex items-center justify-center hover:bg-orange-700 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
