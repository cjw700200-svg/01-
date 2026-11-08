import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: string;
}

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({
  isOpen,
  onClose,
  initialFilter = 'All'
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<string>(initialFilter);

  const mockOrders = [
    {
      id: 'SG992341',
      product: PRODUCTS[0], // UGREEN GaN
      status: 'To Receive',
      statusText: 'Parcel is out for delivery',
      courier: 'J&T Express SG (Tracking: JT992834102SG)',
      date: 'Today, 28 Sep 2026',
      total: 32.90,
      steps: [
        { label: 'Order Placed', time: '26 Sep 14:20', done: true },
        { label: 'Shipped by Seller', time: '27 Sep 09:15', done: true },
        { label: 'Arrived at SG Sorting Hub', time: '28 Sep 02:40', done: true },
        { label: 'Out for Delivery', time: '28 Sep 08:30', done: true }
      ]
    },
    {
      id: 'SG883912',
      product: PRODUCTS[2], // Sony XM5
      status: 'To Ship',
      statusText: 'Seller is preparing your order',
      courier: 'Shopee Express (Tracking: SPXSG0019284)',
      date: '27 Sep 2026',
      total: 399.00,
      steps: [
        { label: 'Order Placed', time: '27 Sep 18:30', done: true },
        { label: 'Payment Confirmed', time: '27 Sep 18:32', done: true },
        { label: 'Preparing Parcel', time: 'Pending', done: true },
        { label: 'Handover to Courier', time: 'Expected tomorrow', done: false }
      ]
    },
    {
      id: 'SG772109',
      product: PRODUCTS[3], // Nissin Laksa
      status: 'To Rate',
      statusText: 'Delivered successfully',
      courier: 'Shopee Supermarket Delivery',
      date: '25 Sep 2026',
      total: 16.50,
      steps: [
        { label: 'Order Placed', time: '24 Sep', done: true },
        { label: 'Delivered', time: '25 Sep 11:20', done: true }
      ]
    }
  ];

  const filteredOrders = activeTab === 'All'
    ? mockOrders
    : mockOrders.filter((o) => o.status === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#f5f3f3] flex flex-col justify-start shadow-2xl">
        {/* Header */}
        <div className="bg-[#b22204] text-white p-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/20"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h2 className="text-base font-extrabold">My Purchases &amp; Orders</h2>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="bg-white flex items-center justify-around border-b border-slate-200 text-xs font-bold text-slate-600">
          {['All', 'To Pay', 'To Ship', 'To Receive', 'To Rate'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#b22204] text-[#b22204]'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-slate-500 shadow-xs">
              <span className="material-symbols-outlined text-4xl text-slate-300">inventory_2</span>
              <p className="text-xs font-bold text-slate-700 mt-2">No orders found in "{activeTab}"</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-100 space-y-3"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">Order #{order.id}</span>
                    <span className="text-[10px] text-slate-400">({order.date})</span>
                  </div>
                  <span className="text-[11px] font-black text-[#b22204] uppercase">
                    {order.status}
                  </span>
                </div>

                {/* Product Detail */}
                <div className="flex items-center gap-3">
                  <img
                    src={order.product.imageUrl}
                    alt={order.product.name}
                    className="w-14 h-14 object-cover rounded-lg bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#1b1c1c] truncate">
                      {order.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{order.courier}</p>
                    <p className="text-xs font-bold text-[#b22204] mt-1">
                      Total: ${order.total.toFixed(2)} SGD
                    </p>
                  </div>
                </div>

                {/* Timeline status */}
                <div className="bg-slate-50 rounded-lg p-2.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    <span>{order.statusText}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    {order.steps.map((st, i) => (
                      <span key={i} className={st.done ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        {st.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="flex justify-end gap-2 pt-1">
                  <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    Contact Seller
                  </button>
                  {order.status === 'To Receive' && (
                    <button className="px-3 py-1.5 rounded-lg bg-[#b22204] text-white text-xs font-bold hover:bg-orange-700">
                      Order Received
                    </button>
                  )}
                  {order.status === 'To Rate' && (
                    <button className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-900 text-xs font-bold hover:bg-amber-400">
                      Rate 5 Stars (+5 Coins)
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
