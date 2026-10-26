import React, { useState } from 'react';
import { Product, DiscussionPost } from '../types';
import { ProductDiscussionTab } from './ProductDiscussionTab';
import { getFallbackDiscussions } from '../data/mockDiscussions';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, option: string, quantity: number) => void;
  onBuyNow: (product: Product, option: string, quantity: number) => void;
  onOpenChat: () => void;
  onOpenVouchers: () => void;
  discussions: Record<string, DiscussionPost[]>;
  onVotePost: (productId: string, postId: string, type: 'agree' | 'disagree') => void;
  onSubmitPost: (newPost: DiscussionPost) => void;
  onPostBecameHelpful: (postId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenChat,
  onOpenVouchers,
  discussions,
  onVotePost,
  onSubmitPost,
  onPostBecameHelpful
}) => {
  if (!product) return null;

  const defaultOption = product.options && product.options.length > 0 ? product.options[0] : 'Default';
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'details' | 'discussion'>('details');

  const handleAddToCart = () => {
    onAddToCart(product, selectedOption, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedOption, quantity);
  };

  const productDiscussions = discussions[product.id] || getFallbackDiscussions(product.id, product.name);

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
              <span className={`material-symbols-outlined text-[20px] ${isLiked ? 'text-red-500 fill-current' : ''}`}>
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

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
          {/* Main Product Showcase Photo */}
          <div className="relative aspect-square w-full bg-[#f5f3f3]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className={`absolute bottom-3 left-3 text-white text-[10px] font-black px-2 py-0.5 rounded shadow ${
                product.badge === 'Mall' ? 'bg-[#bb0017]' : 'bg-[#b22204]'
              }`}>
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              1/4 Photos
            </span>
          </div>

          {/* Pricing & Title Header */}
          <div className="p-3.5 bg-white border-b border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#b22204] tracking-tight tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="bg-[#ffdad6] text-[#410003] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                -{product.discountPercentage}% OFF
              </span>
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

          {/* Tab Navigation: Product Details vs Discussion */}
          <div className="sticky top-0 z-20 bg-white border-b border-slate-200 flex items-center justify-around text-xs font-bold shadow-xs">
            <button
              onClick={() => setModalTab('details')}
              className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                modalTab === 'details'
                  ? 'border-[#b22204] text-[#b22204]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span>Product Details</span>
            </button>

            <button
              onClick={() => setModalTab('discussion')}
              className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                modalTab === 'discussion'
                  ? 'border-[#b22204] text-[#b22204]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span>Discussion</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                modalTab === 'discussion' ? 'bg-[#b22204] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {productDiscussions.length}
              </span>
            </button>
          </div>

          {/* Conditional Body according to active tab */}
          {modalTab === 'details' ? (
            <div>
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

              {/* Merchant Info Banner */}
              <div className="p-3.5 bg-white border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border flex items-center justify-center text-slate-700 font-bold">
                    {product.brand?.slice(0, 2).toUpperCase() || 'SG'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1">
                      {product.brand || 'Official Partner SG'}
                      <span className="material-symbols-outlined text-[#bb0017] text-[14px]">verified</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">Active 5 mins ago · 99% Chat Response</p>
                  </div>
                </div>
                <button
                  onClick={onOpenChat}
                  className="px-2.5 py-1 text-xs font-bold text-[#b22204] border border-[#b22204] rounded-lg hover:bg-orange-50"
                >
                  Chat Seller
                </button>
              </div>

              {/* Product Description */}
              <div className="p-3.5 bg-white">
                <h3 className="text-xs font-extrabold uppercase text-[#1b1c1c] tracking-wider mb-2">
                  Product Description
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
                <div className="mt-3 bg-slate-50 rounded-lg p-2.5 text-[11px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Authenticity:</span>
                    <span className="font-semibold text-slate-800">100% Guaranteed</span>
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
          ) : (
            /* Discussion Tab */
            <ProductDiscussionTab
              product={product}
              discussions={productDiscussions}
              onVotePost={(postId, type) => onVotePost(product.id, postId, type)}
              onSubmitPost={onSubmitPost}
              onPostBecameHelpful={onPostBecameHelpful}
            />
          )}
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
          {/* Chat Icon Button */}
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
