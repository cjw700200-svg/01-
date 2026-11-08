import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, option: string, quantity: number) => void;
  onBuyNow: (product: Product, option: string, quantity: number) => void;
  onOpenChat: () => void;
  onOpenVouchers: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenChat,
  onOpenVouchers
}) => {
  if (!product) return null;

  const defaultOption = product.options && product.options.length > 0 ? product.options[0] : 'Default';
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedOption, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedOption, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-white flex flex-col justify-between overflow-hidden shadow-2xl relative">
        {/* Top Floating App Bar */}
        <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent text-white">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="Like product"
            >
              <span className={`material-symbols-outlined text-[20px] ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`}>
                favorite
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
          {/* Main Product Hero Image */}
          <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute bottom-3 left-3 bg-[#b22204] text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2 py-0.5 rounded-full font-mono">
              1 / 5
            </span>
          </div>

          {/* Pricing & Title Info */}
          <div className="p-4 bg-white border-b border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#b22204]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xs text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-extrabold text-[#b22204] bg-[#ffdad3]/40 px-1 rounded">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <h1 className="text-base font-bold text-[#1b1c1c] mt-2 leading-snug">
              {product.name}
            </h1>

            {/* Rating & Sold Row */}
            <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-600">
              <div className="flex items-center text-[#b22204] font-bold">
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400 ml-1">({product.reviewsCount || 820})</span>
              </div>
              <span className="text-slate-300">|</span>
              <span>{product.soldCount}</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                SG In Stock
              </span>
            </div>
          </div>

          {/* Shopee Guarantee & Voucher Strip */}
          <div className="p-3 bg-orange-50/50 border-b border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b22204] text-[20px]">
                confirmation_number
              </span>
              <div>
                <p className="text-xs font-bold text-[#1b1c1c]">Shop Vouchers Available</p>
                <p className="text-[10px] text-[#b22204]">Claim up to 12% Coins Cashback &amp; Free Shipping</p>
              </div>
            </div>
            <button
              onClick={onOpenVouchers}
              className="text-xs font-bold text-[#b22204] underline"
            >
              Claim
            </button>
          </div>

          {/* Shipping & Delivery Info */}
          <div className="p-3 bg-white border-b border-slate-100">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#006859] text-[20px] mt-0.5">
                local_shipping
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[#1b1c1c]">Standard Delivery (Singapore)</p>
                  <span className="text-xs font-bold text-[#006859]">FREE</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Guaranteed delivery within 1-2 working days. Trackable in Shopee app.
                </p>
              </div>
            </div>
          </div>

          {/* Variants / Options */}
          {product.options && product.options.length > 0 && (
            <div className="p-3.5 bg-white border-b border-slate-100">
              <p className="text-xs font-bold text-[#1b1c1c] mb-2">Select Variant / Option:</p>
              <div className="flex flex-wrap gap-2">
                {product.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedOption === opt
                        ? 'border-[#b22204] bg-[#ffdad3]/40 text-[#b22204] font-bold shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Quantity */}
              <div className="mt-3.5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1b1c1c]">Quantity</span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Brand & Store Profile Strip */}
          <div className="p-3 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-[#b22204]">
                {product.brand ? product.brand.charAt(0) : 'S'}
              </div>
              <div>
                <p className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1">
                  {product.brand || 'Official Shopee Store'}
                  <span className="material-symbols-outlined text-[14px] text-blue-500">verified</span>
                </p>
                <p className="text-[10px] text-slate-400">Preferred+ · 99% Positive Feedback</p>
              </div>
            </div>
            <button className="text-xs text-[#b22204] border border-[#b22204] px-2.5 py-1 rounded-md font-semibold hover:bg-orange-50 transition-colors">
              View Shop
            </button>
          </div>

          {/* Detailed Specifications */}
          <div className="p-3.5 bg-white border-b border-slate-100">
            <h3 className="text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-2">
              Product Description
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-slate-800">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Stock Availability:</span>
                <span className="font-semibold text-slate-800">{product.stock} units remaining</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ships From:</span>
                <span className="font-semibold text-slate-800">Tampines, Singapore</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Warranty:</span>
                <span className="font-semibold text-slate-800">12 Months SG Local Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Added Toast Notification */}
        {addedToast && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/85 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl animate-bounce z-40">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
            Added to Cart successfully!
          </div>
        )}

        {/* Sticky Purchase Footer */}
        <div className="absolute bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 p-2 flex items-center gap-2">
          {/* Chat Icon Button (opens Buyer-Seller Dispute Chat) */}
          <button
            onClick={onOpenChat}
            className="flex flex-col items-center justify-center w-12 h-11 text-slate-600 hover:text-[#b22204] transition-colors"
            aria-label="Chat"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span className="text-[9px]">Chat</span>
          </button>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 h-11 bg-orange-50 border border-[#b22204] text-[#b22204] rounded-lg font-bold text-xs flex items-center justify-center gap-1 hover:bg-orange-100 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            Add to Cart
          </button>

          {/* Buy Now CTA */}
          <button
            onClick={handleBuyNow}
            className="flex-1 h-11 bg-[#b22204] text-white rounded-lg font-bold text-xs flex items-center justify-center hover:bg-orange-700 shadow-md transition-colors active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
