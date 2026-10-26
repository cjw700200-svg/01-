import React from 'react';

export type TabType = 'daily-discover' | 'shopee-mall' | 'shopee-live' | 'notifications' | 'me';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 2
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200/80 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-xl mx-auto flex justify-around items-center h-14 px-1.5">
        {/* Tab 1: Daily Discover */}
        <button
          onClick={() => onTabChange('daily-discover')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 gap-0.5 transition-colors ${
            activeTab === 'daily-discover' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Daily Discover"
        >
          <span className={`material-symbols-outlined text-[22px] ${activeTab === 'daily-discover' ? 'fill-current' : ''}`}>
            shopping_bag
          </span>
          <span className="text-[10px] tracking-tight leading-tight">Daily Discover</span>
        </button>

        {/* Tab 2: Shopee Mall */}
        <button
          onClick={() => onTabChange('shopee-mall')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 gap-0.5 transition-colors ${
            activeTab === 'shopee-mall' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Shopee Mall"
        >
          <span className="material-symbols-outlined text-[22px]">
            storefront
          </span>
          <span className="text-[10px] tracking-tight leading-tight">Shopee Mall</span>
        </button>

        {/* Tab 3: Shopee Live */}
        <button
          onClick={() => onTabChange('shopee-live')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 gap-0.5 relative transition-colors ${
            activeTab === 'shopee-live' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Shopee Live"
        >
          <span className="material-symbols-outlined text-[22px]">
            smart_display
          </span>
          <span className="text-[10px] tracking-tight leading-tight">Shopee Live</span>
          <span className="absolute -top-0.5 right-1.5 bg-[#b22204] text-white text-[8px] px-1 py-0.2 rounded-full font-extrabold animate-pulse">
            LIVE
          </span>
        </button>

        {/* Tab 4: Notifications */}
        <button
          onClick={() => onTabChange('notifications')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 gap-0.5 relative transition-colors ${
            activeTab === 'notifications' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">
            notifications
          </span>
          <span className="text-[10px] tracking-tight leading-tight">Notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-3.5 w-2 h-2 rounded-full bg-[#b22204] ring-2 ring-white"></span>
          )}
        </button>

        {/* Tab 5: Me */}
        <button
          onClick={() => onTabChange('me')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 gap-0.5 transition-colors ${
            activeTab === 'me' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="My Account"
        >
          <span className="material-symbols-outlined text-[22px]">
            account_circle
          </span>
          <span className="text-[10px] tracking-tight leading-tight">Me</span>
        </button>
      </div>
    </nav>
  );
};
