import React, { useState } from 'react';
import { Product, MallBrand } from '../types';
import { MALL_BRANDS, PRODUCTS } from '../data/mockData';

interface ShopeeMallScreenProps {
  onSelectProduct: (product: Product) => void;
  onOpenVouchers: () => void;
}

export const ShopeeMallScreen: React.FC<ShopeeMallScreenProps> = ({
  onSelectProduct,
  onOpenVouchers
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [followedBrands, setFollowedBrands] = useState<Record<string, boolean>>({
    'brand-apple': true,
    'brand-sony': false
  });

  const categories = ['All', 'Electronics', 'Beauty', 'Home & Living', 'Fashion & Sports'];

  const mallProducts = PRODUCTS.filter((p) => p.badge === 'Mall' || p.badge === 'Supermarket');

  const filtered = selectedCategory === 'All'
    ? mallProducts
    : mallProducts.filter((p) => p.category === selectedCategory);

  const toggleFollow = (brandId: string) => {
    setFollowedBrands((prev) => ({
      ...prev,
      [brandId]: !prev[brandId]
    }));
  };

  return (
    <div className="flex flex-col w-full bg-[#f5f3f3] pb-8 min-h-screen">
      {/* Mall Hero Banner */}
      <div className="bg-[#bb0017] text-white px-3 py-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-white text-[#bb0017] text-xs font-black px-1.5 py-0.5 rounded shadow">
              MALL
            </span>
            <h1 className="text-lg font-extrabold tracking-tight">SHOPEE MALL OFFICIAL</h1>
          </div>
          <span className="text-[11px] bg-red-800/80 px-2 py-0.5 rounded-full border border-red-400/40">
            100% Authentic Guaranteed
          </span>
        </div>
        <p className="text-xs text-red-100 mb-3">
          Direct from certified official brand flagships with 2x money-back guarantee and 15-day free returns.
        </p>

        {/* Mall Guarantees Strip */}
        <div className="grid grid-cols-3 gap-1 bg-red-950/40 rounded-lg p-2 text-center text-[10px] text-white font-medium border border-white/10">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[16px] text-amber-300">verified_user</span>
            <span className="mt-0.5">100% Authentic</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/20">
            <span className="material-symbols-outlined text-[16px] text-amber-300">published_with_changes</span>
            <span className="mt-0.5">15 Days Return</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[16px] text-amber-300">local_shipping</span>
            <span className="mt-0.5">Free Shipping</span>
          </div>
        </div>
      </div>

      {/* Exclusive Mall Vouchers Bar */}
      <div className="px-2 -mt-2 z-10">
        <div 
          onClick={onOpenVouchers}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-lg p-2.5 shadow-sm flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[24px]">
              stars
            </span>
            <div>
              <p className="text-xs font-extrabold text-[#1b1c1c]">Claim Official Brand Vouchers</p>
              <p className="text-[10px] text-amber-800">Extra up to $80 OFF today + 12% Coins Back</p>
            </div>
          </div>
          <button className="bg-[#bb0017] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm hover:bg-red-700 transition-colors">
            Claim
          </button>
        </div>
      </div>

      {/* Featured Official Brands Carousel */}
      <div className="mt-3 px-2">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-extrabold text-[#1b1c1c] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#bb0017] text-[18px]">verified</span>
              Featured Flagship Stores
            </h2>
            <span className="text-[11px] text-[#bb0017] font-bold">See All</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MALL_BRANDS.slice(0, 4).map((brand) => (
              <div 
                key={brand.id}
                className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-800 text-[22px]">
                      {brand.icon}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-[#1b1c1c] truncate">{brand.name}</h4>
                      <span className="material-symbols-outlined text-[#bb0017] text-[14px]">check_circle</span>
                    </div>
                    <p className="text-[9px] text-[#bb0017] font-semibold">{brand.tagline}</p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[9px] text-slate-500">{brand.followers} followers</span>
                  <button
                    onClick={() => toggleFollow(brand.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                      followedBrands[brand.id]
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-[#bb0017] text-white hover:bg-red-700'
                    }`}
                  >
                    {followedBrands[brand.id] ? 'Following' : '+ Follow'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-3 px-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shadow-sm ${
                selectedCategory === cat
                  ? 'bg-[#bb0017] text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mall Products Grid */}
      <div className="mt-2 px-2">
        <div className="grid grid-cols-2 gap-1.5">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer border border-slate-100 hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <div>
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-[#bb0017] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    Mall
                  </span>
                  <span className="absolute top-1.5 right-1.5 bg-[#ffdad6] text-[#410003] text-[9px] font-extrabold px-1 py-0.5 rounded">
                    -{product.discountPercentage}%
                  </span>
                </div>
                <div className="p-2">
                  <div className="text-[10px] text-[#bb0017] font-bold mb-0.5 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[11px]">verified</span>
                    <span>{product.brand || 'Official Store'}</span>
                  </div>
                  <h3 className="text-xs text-[#1b1c1c] font-medium line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="bg-red-50 text-[#bb0017] text-[8px] font-bold px-1 py-0.5 rounded border border-red-200">
                      100% Authentic
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-2 pb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[14px] text-[#bb0017] font-extrabold tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-400 line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 text-slate-500 text-[9px]">
                  <div className="flex items-center text-[#b22204] font-bold">
                    <span className="material-symbols-outlined text-[12px]">star</span>
                    <span className="ml-0.5">{product.rating.toFixed(1)}</span>
                  </div>
                  <span>{product.soldCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
