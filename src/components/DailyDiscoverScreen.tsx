import React, { useState, useEffect, useRef } from 'react';
import { Product, FlashDealItem } from '../types';
import { FLASH_DEALS, PRODUCTS, MALL_BRANDS } from '../data/mockData';

interface DailyDiscoverScreenProps {
  onSelectProduct: (product: Product) => void;
  onOpenScanPay: () => void;
  onOpenTopUp: () => void;
  onOpenVouchers: () => void;
  onOpenPrizes: () => void;
  onNavigateTab: (tab: 'daily-discover' | 'shopee-mall' | 'shopee-live' | 'notifications' | 'me') => void;
  shopeePayBalance: number;
  coinsBalance: number;
  onClaimDailyCoins: () => void;
  hasClaimedDailyCoins: boolean;
}

export const DailyDiscoverScreen: React.FC<DailyDiscoverScreenProps> = ({
  onSelectProduct,
  onOpenScanPay,
  onOpenTopUp,
  onOpenVouchers,
  onOpenPrizes,
  onNavigateTab,
  shopeePayBalance,
  coinsBalance,
  onClaimDailyCoins,
  hasClaimedDailyCoins
}) => {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  // Flash Deals Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 33 });

  // Tab Filtering for Daily Discover
  const [activeSubTab, setActiveSubTab] = useState<'daily' | 'top' | 'sg' | 'trending'>('daily');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Extra loaded items simulation
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const flashDealsRef = useRef<HTMLDivElement>(null);

  // Auto carousel slide timer
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [totalSlides]);

  // Flash deals countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num: number) => num.toString().padStart(2, '0');

  // Handle flash deal item click
  const handleFlashItemClick = (flashItem: FlashDealItem) => {
    // Look up or construct a Product from FlashDealItem
    const matched = PRODUCTS.find((p) => p.name.includes(flashItem.name.slice(0, 10))) || {
      id: flashItem.id,
      name: flashItem.name,
      price: flashItem.price,
      originalPrice: flashItem.originalPrice,
      discountPercentage: flashItem.discountPercentage,
      rating: 4.9,
      soldCount: `${flashItem.soldPercent * 10} sold`,
      imageUrl: flashItem.imageUrl,
      badge: 'Mall',
      tag: 'Flash Deal Exclusive',
      brand: 'Shopee Official Store',
      category: flashItem.category,
      description: `Limited-time Flash Deal for ${flashItem.name}. Authentic guarantee with rapid local dispatch across Singapore.`,
      stock: 50,
      options: ['Standard SG Edition'],
      reviewsCount: 420,
      shippingInfo: 'Next Day Express Delivery Available'
    };
    onSelectProduct(matched);
  };

  // Filter products based on active sub tab and category filter
  let filteredProducts = PRODUCTS;
  if (selectedCategoryFilter) {
    filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase()));
  } else if (activeSubTab === 'top') {
    filteredProducts = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
  } else if (activeSubTab === 'sg') {
    filteredProducts = PRODUCTS.filter((p) => p.badge === 'SG Local' || p.badge === 'SG In Stock');
  } else if (activeSubTab === 'trending') {
    filteredProducts = [...PRODUCTS].reverse();
  }

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 4, 12));
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full bg-[#f5f3f3] pb-6">
      {/* 1. Top Hero Promotional Carousel & Banner */}
      <div className="relative w-full overflow-hidden bg-[#b22204] px-2 pt-1 pb-2">
        <div className="relative w-full rounded-lg overflow-hidden shadow-sm">
          {/* Slides Container */}
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1: Tech & Mega Vouchers */}
            <div 
              onClick={onOpenVouchers}
              className="min-w-full relative rounded-lg overflow-hidden bg-gradient-to-r from-[#b22204] via-[#d63c1e] to-[#bb0017] p-3 text-white flex items-center justify-between min-h-[142px] cursor-pointer"
            >
              <div className="flex flex-col max-w-[62%] z-10">
                <div className="flex items-center gap-1 mb-1 flex-wrap">
                  <span className="bg-white text-[#b22204] text-[9px] uppercase px-1 py-0.5 rounded font-extrabold tracking-wider shadow-sm">
                    MEGA SALE
                  </span>
                  <span className="bg-[#008471] text-[#f4fffa] text-[9px] px-1 py-0.5 rounded font-bold">
                    SG EXCLUSIVE
                  </span>
                </div>
                <h2 className="text-[15px] leading-tight text-white font-extrabold tracking-tight">
                  Super Tech Sale &amp; Mega SG Vouchers
                </h2>
                <p className="text-[12px] text-[#fffbff] opacity-95 mt-0.5 font-medium">
                  Up to 70% Off • $80 Cashback
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="bg-white text-[#bb0017] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    Min. $0 Spend
                  </span>
                  <span className="bg-[#ffdad6] text-[#410003] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    12% Coins Back
                  </span>
                </div>
              </div>
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <img 
                  className="w-full h-full object-contain filter drop-shadow-md" 
                  alt="Super Tech Sale Banner" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPrqA2NSwm_CviH5nvm8gmIomXUSar53R20FYfeikOkFke67O02EoaBxjV20JfYx6p06ZEq0DvaR0ILcfKxqBTnnbezbqiCDH_TfWghl7reKY0naE_S1Sy7apceGhj95fYqBdE7iqV7SJXl6e_BX5wKNWJ_qbiS_mS3rr-41m-Me6P99IMYOzpeGRVQfPkJLWzSwa1Wg1zQMTdsdpoIidmrPAdxs1JHltkFCvrvc766iQkG_VtpV0e" 
                />
              </div>
            </div>

            {/* Slide 2: Supermarket Fest */}
            <div 
              onClick={() => {
                setSelectedCategoryFilter('Supermarket');
                setActiveSubTab('daily');
              }}
              className="min-w-full relative rounded-lg overflow-hidden bg-gradient-to-r from-[#006859] via-[#008471] to-[#b22204] p-3 text-white flex items-center justify-between min-h-[142px] cursor-pointer"
            >
              <div className="flex flex-col max-w-[62%] z-10">
                <span className="bg-[#68fadd] text-[#00201a] text-[9px] uppercase px-1 py-0.5 rounded font-extrabold w-max mb-1">
                  FRESH &amp; PANTRY
                </span>
                <h2 className="text-[15px] leading-tight text-white font-extrabold tracking-tight">
                  Shopee Supermarket 24H Delivery
                </h2>
                <p className="text-[12px] text-[#f4fffa] mt-0.5 font-medium">
                  Save on Daily Essentials &amp; Groceries
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="bg-white text-[#006859] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    Buy 1 Free 1
                  </span>
                  <span className="bg-[#ffdad6] text-[#410003] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Free SG Shipping
                  </span>
                </div>
              </div>
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <img 
                  className="w-full h-full object-contain filter drop-shadow-md" 
                  alt="Supermarket 24H Delivery" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDojlkWzaarUNIoKV-UCRgjEwWOIkwlyVRI-58-DBVRW72BSs9WtVTi5oF6NNN8B9LpkH6cRlDnzH2xHTFh0XUYeHI6Wl8gRiWWlgw5KacVCR8_faQHBKwrH1PYvgd-vPkVqD0D_H7yo8hXumi4s323rZ4azDjPxbAPxe9P-6wDsGGlA5INUfY7GYr0F7Q_E1p4wvjg8fguKHgL1CpnbZwze263Z8BMwQG5OnwZRPtOqeVEfmTlkE5P" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. ShopeePay & Coin Balance Ribbon Bar */}
      <div className="px-2 -mt-1 z-10">
        <div className="bg-white rounded-lg shadow-sm px-3 py-2 flex items-center justify-between divide-x divide-slate-100">
          {/* ShopeePay Balance */}
          <div 
            onClick={onOpenTopUp}
            className="flex items-center gap-2 pr-2 flex-1 min-w-0 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-[#ffdad3] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[#b22204] text-[18px]">
                account_balance_wallet
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-[#5b403b] uppercase font-bold">ShopeePay</span>
                <span className="text-[#b22204] text-[10px] font-extrabold group-hover:underline">Top Up</span>
              </div>
              <span className="text-[15px] text-[#1b1c1c] font-bold truncate tracking-tight tabular-nums">
                ${shopeePayBalance.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Coins Balance */}
          <div 
            onClick={onClaimDailyCoins}
            className="flex items-center gap-2 px-2 flex-1 min-w-0 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-[#ffdad6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[#bb0017] text-[18px]">
                monetization_on
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-[#5b403b] font-bold truncate">Coins</span>
                <span className={`text-[8px] px-1 rounded font-bold transition-all ${
                  hasClaimedDailyCoins ? 'bg-slate-100 text-slate-500' : 'bg-[#ffdad6] text-[#410003] animate-pulse'
                }`}>
                  {hasClaimedDailyCoins ? 'Claimed' : '+10'}
                </span>
              </div>
              <span className="text-[15px] text-[#1b1c1c] font-bold truncate tracking-tight tabular-nums">
                {coinsBalance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Scan & Pay QR CTA */}
          <button 
            onClick={onOpenScanPay}
            className="pl-2 flex items-center gap-1 text-[#1b1c1c] shrink-0 hover:text-[#b22204] transition-colors py-0.5 active:scale-95"
            aria-label="Scan & Pay QR"
          >
            <span className="material-symbols-outlined text-[#b22204] text-[22px]">
              qr_code_scanner
            </span>
            <span className="text-[10px] font-bold leading-tight text-left">
              Scan<br />&amp; Pay
            </span>
          </button>
        </div>
      </div>

      {/* 3. Quick Action / Service Hub (5x2 Grid) */}
      <div className="px-2 pt-2.5 pb-1">
        <div className="grid grid-cols-5 gap-y-3 gap-x-1 bg-white rounded-lg p-2 shadow-sm">
          {/* 1: Shopee Mall */}
          <button 
            onClick={() => onNavigateTab('shopee-mall')}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#bb0017] text-[22px]">verified</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Shopee Mall</span>
          </button>

          {/* 2: Daily Vouchers */}
          <button 
            onClick={onOpenVouchers}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffdad3] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#b22204] text-[22px]">confirmation_number</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Vouchers</span>
          </button>

          {/* 3: Free Shipping */}
          <button 
            onClick={onOpenVouchers}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#68fadd] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#006859] text-[22px]">local_shipping</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Free Shipping</span>
          </button>

          {/* 4: Supermarket */}
          <button 
            onClick={() => {
              setSelectedCategoryFilter('Supermarket');
              setActiveSubTab('daily');
            }}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e9e8e7] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#d63c1e] text-[22px]">storefront</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Supermarket</span>
          </button>

          {/* 5: Shopee Prizes */}
          <button 
            onClick={onOpenPrizes}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffb3ac] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#410003] text-[22px]">featured_seasonal_and_gifts</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Prizes</span>
          </button>

          {/* 6: Flash Deals */}
          <button 
            onClick={() => flashDealsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#d63c1e] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[22px]">bolt</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Flash Deals</span>
          </button>

          {/* 7: Shopee Live */}
          <button 
            onClick={() => onNavigateTab('shopee-live')}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e51d27] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[22px]">podcasts</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Shopee Live</span>
          </button>

          {/* 8: Electronics Zone */}
          <button 
            onClick={() => {
              setSelectedCategoryFilter('Electronics');
              setActiveSubTab('daily');
            }}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3e2e2] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#b22204] text-[22px]">devices</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Electronics</span>
          </button>

          {/* 9: Beauty & Fashion */}
          <button 
            onClick={() => {
              setSelectedCategoryFilter('Beauty');
              setActiveSubTab('daily');
            }}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#bb0017] text-[22px]">styler</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Beauty</span>
          </button>

          {/* 10: Global Deals */}
          <button 
            onClick={() => {
              setSelectedCategoryFilter(null);
              setActiveSubTab('sg');
            }}
            className="flex flex-col items-center text-center group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#008471] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#f4fffa] text-[22px]">flight_takeoff</span>
            </div>
            <span className="text-[10px] font-bold text-[#1b1c1c] mt-1 line-clamp-1">Global Deals</span>
          </button>
        </div>
      </div>

      {/* 4. Flash Deals Section */}
      <div ref={flashDealsRef} className="mt-1 px-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden py-2">
          {/* Flash Header */}
          <div className="flex items-center justify-between px-3 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-[#b22204] text-[15px] font-bold italic tracking-tighter">
                <span className="material-symbols-outlined text-[#b22204] text-[20px] not-italic mr-0.5">bolt</span>
                FLASH DEALS
              </div>
              {/* Countdown Blocks */}
              <div className="flex items-center gap-0.5 text-[#1b1c1c] ml-1 text-[11px] font-extrabold tabular-nums">
                <span className="bg-[#303031] text-white rounded px-1 py-0.5">
                  {format2Digits(timeLeft.hours)}
                </span>
                <span className="text-[#b22204] font-bold">:</span>
                <span className="bg-[#303031] text-white rounded px-1 py-0.5">
                  {format2Digits(timeLeft.minutes)}
                </span>
                <span className="text-[#b22204] font-bold">:</span>
                <span className="bg-[#303031] text-white rounded px-1 py-0.5">
                  {format2Digits(timeLeft.seconds)}
                </span>
              </div>
            </div>
            <button 
              onClick={() => flashDealsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center text-[#5b403b] text-[10px] font-bold hover:text-[#b22204] transition-colors"
            >
              See All
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          {/* Flash horizontal scroll item row */}
          <div className="flex gap-2 overflow-x-auto px-3 pb-1 no-scrollbar">
            {FLASH_DEALS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleFlashItemClick(item)}
                className="min-w-[110px] w-[110px] shrink-0 flex flex-col group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative aspect-square w-full rounded-md overflow-hidden bg-[#f5f3f3] mb-1.5 shadow-inner">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-0 right-0 bg-[#bb0017] text-white text-[9px] px-1 py-0.5 rounded-bl font-extrabold">
                    -{item.discountPercentage}%
                  </span>
                </div>
                <span className="text-[14px] text-[#b22204] font-extrabold leading-none tabular-nums">
                  ${item.price.toFixed(2)}
                </span>
                {/* Urgency Progress Bar */}
                <div className="w-full bg-[#ffdad6] rounded-full h-3 mt-1.5 relative overflow-hidden flex items-center justify-center">
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-[#b22204] rounded-full" 
                    style={{ width: `${item.soldPercent}%` }}
                  />
                  <span className="relative z-10 text-white text-[8px] uppercase tracking-tighter font-extrabold">
                    {item.soldLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Shopee Mall Official Stores Carousel */}
      <div className="mt-2.5 px-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden py-2">
          <div className="flex items-center justify-between px-3 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#bb0017] text-white text-[9px] font-extrabold uppercase px-1 py-0.5 rounded">
                MALL
              </span>
              <span className="text-[15px] text-[#1b1c1c] font-extrabold">
                SHOPEE MALL
              </span>
            </div>
            <button 
              onClick={() => onNavigateTab('shopee-mall')}
              className="flex items-center text-[#bb0017] text-[10px] font-bold hover:underline"
            >
              Shop More
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          {/* Trust Badges Strip */}
          <div className="flex items-center gap-3 px-3 pb-2 text-[#5b403b] text-[9px]">
            <div className="flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[#bb0017] text-[13px]">verified_user</span>
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[#bb0017] text-[13px]">published_with_changes</span>
              <span>15-Day Return</span>
            </div>
            <div className="flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[#bb0017] text-[13px]">local_shipping</span>
              <span>Free Shipping</span>
            </div>
          </div>

          {/* Brand Logos & Featured Discount Cards */}
          <div className="flex gap-2 overflow-x-auto px-3 pb-1 no-scrollbar">
            {MALL_BRANDS.map((brand) => (
              <div
                key={brand.id}
                onClick={() => onNavigateTab('shopee-mall')}
                className="min-w-[100px] w-[100px] shrink-0 flex flex-col items-center bg-[#f5f3f3] rounded-lg p-2 text-center group cursor-pointer hover:bg-slate-100 transition-colors active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-sm mb-1.5">
                  <span className="material-symbols-outlined text-[28px] text-[#1b1c1c]">
                    {brand.icon}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold text-[#1b1c1c] line-clamp-1">
                  {brand.name}
                </span>
                <span className="text-[9px] text-[#bb0017] font-bold mt-0.5">
                  {brand.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Daily Discover / Product Grid */}
      <div className="mt-2.5 w-full">
        {/* Sticky Tabs Navigation */}
        <div className="sticky top-16 z-30 bg-white shadow-sm flex items-center justify-around border-b-2 border-[#b22204]">
          <button 
            onClick={() => {
              setActiveSubTab('daily');
              setSelectedCategoryFilter(null);
            }}
            className={`py-2 px-1 text-[13px] font-bold flex flex-col items-center relative transition-colors ${
              activeSubTab === 'daily' && !selectedCategoryFilter ? 'text-[#b22204]' : 'text-[#5b403b] hover:text-[#1b1c1c]'
            }`}
          >
            <span>DAILY DISCOVER</span>
            {activeSubTab === 'daily' && !selectedCategoryFilter && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-[#b22204] rounded-full" />
            )}
          </button>
          
          <button 
            onClick={() => {
              setActiveSubTab('top');
              setSelectedCategoryFilter(null);
            }}
            className={`py-2 px-1 text-[13px] font-bold flex flex-col items-center relative transition-colors ${
              activeSubTab === 'top' ? 'text-[#b22204]' : 'text-[#5b403b] hover:text-[#1b1c1c]'
            }`}
          >
            <span>Top Products</span>
            {activeSubTab === 'top' && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-[#b22204] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => {
              setActiveSubTab('sg');
              setSelectedCategoryFilter(null);
            }}
            className={`py-2 px-1 text-[13px] font-bold flex flex-col items-center relative transition-colors ${
              activeSubTab === 'sg' ? 'text-[#b22204]' : 'text-[#5b403b] hover:text-[#1b1c1c]'
            }`}
          >
            <span>SG Sellers</span>
            {activeSubTab === 'sg' && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-[#b22204] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => {
              setActiveSubTab('trending');
              setSelectedCategoryFilter(null);
            }}
            className={`py-2 px-1 text-[13px] font-bold flex flex-col items-center relative transition-colors ${
              activeSubTab === 'trending' ? 'text-[#b22204]' : 'text-[#5b403b] hover:text-[#1b1c1c]'
            }`}
          >
            <span>Trending</span>
            {activeSubTab === 'trending' && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-[#b22204] rounded-full" />
            )}
          </button>
        </div>

        {/* Category Filter Pills (if active) */}
        {selectedCategoryFilter && (
          <div className="bg-[#ffdad3]/50 px-3 py-1.5 flex items-center justify-between text-xs text-[#b22204]">
            <span className="font-semibold">Showing: {selectedCategoryFilter}</span>
            <button 
              onClick={() => setSelectedCategoryFilter(null)}
              className="text-[10px] font-bold uppercase underline"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* 2-Column Responsive Product Feed */}
        <div className="p-2 grid grid-cols-2 gap-1.5">
          {filteredProducts.slice(0, displayCount).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer border border-slate-100 hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <div>
                <div className="relative aspect-square w-full bg-[#f5f3f3] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span className={`absolute top-1.5 left-1.5 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm ${
                      product.badge === 'Mall' 
                        ? 'bg-[#bb0017]' 
                        : product.badge === 'Supermarket' 
                        ? 'bg-[#006859]' 
                        : 'bg-[#b22204]'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {/* Discount Badge */}
                  <span className="absolute top-1.5 right-1.5 bg-[#ffdad6] text-[#410003] text-[9px] font-extrabold px-1 py-0.5 rounded tabular-nums">
                    -{product.discountPercentage}%
                  </span>
                </div>

                <div className="p-2">
                  <h3 className="text-[13px] text-[#1b1c1c] font-medium line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  {/* Mini Tags */}
                  {product.tag && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="bg-[#68fadd]/60 text-[#005145] text-[9px] px-1 py-0.5 rounded font-bold">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-2 pb-2 pt-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-[14px] text-[#b22204] font-extrabold tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-[#5b403b] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[#5b403b] text-[9px]">
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

        {/* Infinite Scroll / Loading Trigger */}
        <div className="w-full py-4 flex flex-col items-center justify-center gap-1 text-[#5b403b] text-[12px]">
          {isLoadingMore ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-[#b22204] border-t-transparent rounded-full animate-spin" />
              <span className="text-[11px]">Finding more great SG deals...</span>
            </div>
          ) : (
            <button
              onClick={handleLoadMore}
              className="px-4 py-1.5 bg-white border border-slate-200 text-[#b22204] font-bold text-xs rounded-full hover:bg-orange-50 shadow-sm transition-colors"
            >
              Tap to see more deals
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
