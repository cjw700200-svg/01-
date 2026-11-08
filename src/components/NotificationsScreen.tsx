import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { NOTIFICATIONS } from '../data/mockData';

interface NotificationsScreenProps {
  onOpenOrderTrack?: () => void;
  onOpenVouchers?: () => void;
  onOpenTopUp?: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onOpenOrderTrack,
  onOpenVouchers,
  onOpenTopUp
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'order' | 'promo' | 'wallet'>('all');

  const filtered = filter === 'all'
    ? notifications
    : notifications.filter((n) => n.type === filter);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleAction = (notif: NotificationItem) => {
    markAsRead(notif.id);
    if (notif.type === 'order' && onOpenOrderTrack) {
      onOpenOrderTrack();
    } else if (notif.type === 'promo' && onOpenVouchers) {
      onOpenVouchers();
    } else if (notif.type === 'wallet' && onOpenTopUp) {
      onOpenTopUp();
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#f5f3f3] min-h-screen pb-16">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-3 py-3 flex items-center justify-between sticky top-16 z-20">
        <h1 className="text-base font-extrabold text-[#1b1c1c]">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="text-xs text-[#b22204] font-bold hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-2 py-2 flex items-center gap-1.5 border-b border-slate-100 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
            filter === 'all'
              ? 'bg-[#b22204] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('order')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
            filter === 'order'
              ? 'bg-[#b22204] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Order Updates
        </button>
        <button
          onClick={() => setFilter('promo')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
            filter === 'promo'
              ? 'bg-[#b22204] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Promotions
        </button>
        <button
          onClick={() => setFilter('wallet')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
            filter === 'wallet'
              ? 'bg-[#b22204] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          ShopeePay
        </button>
      </div>

      {/* Notification List */}
      <div className="divide-y divide-slate-200/80 bg-white">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleAction(item)}
            className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-slate-50 ${
              !item.read ? 'bg-orange-50/40' : ''
            }`}
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              item.type === 'order'
                ? 'bg-blue-100 text-blue-600'
                : item.type === 'promo'
                ? 'bg-orange-100 text-[#b22204]'
                : item.type === 'wallet'
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-purple-100 text-purple-600'
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h3 className={`text-xs font-bold truncate ${!item.read ? 'text-[#1b1c1c]' : 'text-slate-700'}`}>
                  {item.title}
                </h3>
                <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.message}
              </p>

              {item.actionText && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#b22204] flex items-center gap-0.5 hover:underline">
                    {item.actionText}
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-[#b22204]" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
