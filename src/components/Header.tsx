import React from 'react';

interface HeaderProps {
  cartCount: number;
  unreadNotifsCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenCamera: () => void;
  onGoHome: () => void;
  onGoMe: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  unreadNotifsCount,
  onOpenSearch,
  onOpenCart,
  onOpenChat,
  onOpenCamera,
  onGoHome,
  onGoMe
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#b22204] text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="max-w-xl mx-auto h-16 px-2 flex items-center gap-1">
        {/* Shopee SG Logo & SG Badge */}
        <button 
          onClick={onGoHome}
          className="flex items-center gap-1 shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-1 transition-transform active:scale-95"
          aria-label="Shopee SG Home"
        >
          <img 
            alt="Shopee SG Logo" 
            className="h-8 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAceSxVxa356OCmqzwuMfhZMP_RxuGn8jogfU8pGweeMe8thjpz9Qnj-rOlgAVjDnBX4R5pDSE6Nh1oO8Vdl9xnrY370w-9dqQcn0zfrS88DwNkguEAAjcJyDk5dPSxwh8urULIHJZJO3PabSSsSbL4LP-EdWr_DxF1Jyh7_YVTsGU4akovhBFX0svS9I2P2gt_UXawKUEojTvfWO2_EsB2QjCEUNMitywgbEEoN3PRhfbveWs_3T0x" 
          />
          <span className="bg-white text-[#b22204] text-[10px] font-bold px-1 py-0.5 rounded-full uppercase leading-none shadow-sm">
            SG
          </span>
          <span className="sr-only">Daily Discover</span>
        </button>

        {/* Search Bar Container */}
        <div 
          onClick={onOpenSearch}
          className="flex-1 flex items-center h-10 bg-white text-[#1b1c1c] rounded-full px-3 gap-1.5 mx-1 cursor-pointer shadow-inner hover:bg-slate-50 transition-colors"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenSearch()}
          aria-label="Search Shopee SG"
        >
          <span className="material-symbols-outlined text-[#b22204] text-[20px] shrink-0">
            search
          </span>
          <span className="flex-1 text-[12px] text-[#5b403b] truncate select-none">
            Search Shopee SG or paste link
          </span>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCamera();
            }}
            aria-label="Search with Camera" 
            className="w-7 h-7 flex items-center justify-center text-[#5b403b] hover:text-[#b22204] shrink-0 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            aria-label={`Shopping Cart with ${cartCount} items`} 
            className="w-10 h-10 relative flex items-center justify-center text-white hover:text-orange-200 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1 min-w-[16px] h-4 bg-white text-[#b22204] text-[9px] rounded-full flex items-center justify-center px-1 font-extrabold shadow-sm">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* Chat Icon */}
          <button 
            onClick={onOpenChat}
            aria-label={`Chat Messages with ${unreadNotifsCount} updates`} 
            className="w-10 h-10 relative flex items-center justify-center text-white hover:text-orange-200 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">chat</span>
            <span className="absolute top-1.5 right-1 min-w-[16px] h-4 bg-[#ffdad6] text-[#410003] text-[9px] rounded-full flex items-center justify-center px-1 font-extrabold shadow-sm">
              5
            </span>
          </button>

          {/* Me Icon */}
          <button 
            onClick={onGoMe}
            aria-label="My Account" 
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center ml-0.5 text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
