import React from 'react';

export type TabType = 'daily-discover' | 'shopee-mall' | 'discussion' | 'shopee-live' | 'notifications' | 'me';

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
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-xl mx-auto flex justify-between items-center h-14 px-1">
        {/* Tab 1: Daily Discover */}
        <button
          onClick={() => onTabChange('daily-discover')}
          className={`flex-1 flex flex-col items-center justify-center min-w-[48px] h-12 gap-0.5 transition-colors ${
            activeTab === 'daily-discover' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Daily Discover"
        >
          <span className={`material-symbols-outlined text-[20px] ${activeTab === 'daily-discover' ? 'fill-current' : ''}`}>
            shopping_bag
          </span>
          <span className="text-[9px] tracking-tight leading-tight">Daily Discover</span>
        </button>

        {/* Tab 2: Shopee Mall */}
        <button
          onClick={() => onTabChange('shopee-mall')}
          className={`flex-1 flex flex-col items-center justify-center min-w-[48px] h-12 gap-0.5 transition-colors ${
            activeTab === 'shopee-mall' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Shopee Mall"
        >
          <span className="material-symbols-outlined text-[20px]">
            storefront
          </span>
          <span className="text-[9px] tracking-tight leading-tight">Shopee Mall</span>
        </button>

        {/* Tab 3: Discussion (New Main App Tab) */}
        <button
          onClick={() => onTabChange('discussion')}
          className={`flex-1 flex flex-col items-center justify-center min-w-[48px] h-12 gap-0.5 relative transition-colors ${
            activeTab === 'discussion' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Discussion"
        >
          <span className={`material-symbols-outlined text-[20px] ${activeTab === 'discussion' ? 'fill-current' : ''}`}>
            forum
          </span>
          <span className="text-[9px] tracking-tight leading-tight">Discussion</span>
          <span className="absolute -top-0.5 right-2 w-1.5 h-1.5 rounded-full bg-[#b22204]" />
        </button>

        {/* Tab 4: Shopee Live */}
        <button
          onClick={() => onTabChange('shopee-live')}
          className={`flex-1 flex flex-col items-center justify-center min-w-[48px] h-12 gap-0.5 relative transition-colors ${
            activeTab === 'shopee-live' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Shopee Live"
        >
          <span className="material-symbols-outlined text-[20px]">
            smart_display
          </span>
          <span className="text-[9px] tracking-tight leading-tight">Shopee Live</span>
          <span className="absolute -top-0.5 right-1.5 bg-[#b22204] text-white text-[7px] px-1 py-0.1 rounded-full font-extrabold animate-pulse">
            LIVE
          </span>
        </button>

        {/* Tab 5: Notifications */}
        <button
          onClick={() => onTabChange('notifications')}
          className={`flex-1 flex flex-col items-center justify-center min-w-[48px] h-12 gap-0.5 relative transition-colors ${
            activeTab === 'notifications' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">
            notifications
          </span>
          <span className="text-[9px] tracking-tight leading-tight">Notifs</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-3 w-1.5 h-1.5 rounded-full bg-[#b22204] ring-2 ring-white"></span>
          )}
        </button>

        {/* Tab 6: Me */}
        <button
          onClick={() => onTabChange('me')}
          className={`flex-1 flex flex-col items-center justify-center min-w-[48px] h-12 gap-0.5 transition-colors ${
            activeTab === 'me' ? 'text-[#b22204] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="My Account"
        >
          <span className="material-symbols-outlined text-[20px]">
            account_circle
          </span>
          <span className="text-[9px] tracking-tight leading-tight">Me</span>
        </button>
      </div>
    </nav>
  );
};
