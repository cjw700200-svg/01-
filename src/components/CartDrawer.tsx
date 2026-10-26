import React, { useState } from 'react';
import { CartItem, Voucher } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: (select: boolean) => void;
  vouchers: Voucher[];
  coinsBalance: number;
  onPlaceOrder: (total: number, orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onToggleSelect,
  onSelectAll,
  vouchers,
  coinsBalance,
  onPlaceOrder
}) => {
  if (!isOpen) return null;

  const [useCoins, setUseCoins] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState<string>('v-1');
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const allSelected = items.length > 0 && items.every((item) => item.selected);
  const selectedItems = items.filter((item) => item.selected);

  // Subtotal
  const itemsSubtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Shipping fee
  const shippingFee = itemsSubtotal > 0 ? 1.99 : 0;
  
  // Voucher discount
  const activeVoucher = vouchers.find(
    (v) => v.id === selectedVoucherId && itemsSubtotal >= v.minSpend
  );
  const voucherDiscount = activeVoucher
    ? activeVoucher.type === 'shipping'
      ? Math.min(shippingFee, activeVoucher.discountAmount)
      : activeVoucher.isPercent
      ? (itemsSubtotal * activeVoucher.discountAmount) / 100
      : Math.min(itemsSubtotal, activeVoucher.discountAmount)
    : 0;

  // Coins discount (100 coins = $1.00, capped at $5 or coinsBalance)
  const maxCoinsToUse = Math.min(coinsBalance, Math.floor(itemsSubtotal * 100 * 0.25));
  const coinsDiscount = useCoins ? maxCoinsToUse / 100 : 0;

  const finalTotal = Math.max(0, itemsSubtotal + shippingFee - voucherDiscount - coinsDiscount);

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    const newOrderId = `SG${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccess(newOrderId);
    setTimeout(() => {
      onPlaceOrder(finalTotal, newOrderId);
      setOrderSuccess(null);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg h-full bg-[#f5f3f3] flex flex-col justify-between overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
              aria-label="Close cart"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h2 className="text-base font-extrabold text-[#1b1c1c]">
              Shopping Cart ({items.length})
            </h2>
          </div>
          <button
            onClick={() => onSelectAll(!allSelected)}
            className="text-xs text-[#b22204] font-bold"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl shadow-xs mt-4">
              <span className="material-symbols-outlined text-[54px] text-slate-300">remove_shopping_cart</span>
              <p className="text-sm font-bold text-slate-700 mt-2">Your shopping cart is empty</p>
              <p className="text-xs text-slate-400 mt-0.5">Explore Daily Discover deals to add items!</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-[#b22204] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 flex items-start gap-2.5"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => onToggleSelect(item.id)}
                  className="mt-2 w-4 h-4 rounded text-[#b22204] accent-[#b22204] cursor-pointer"
                />

                {/* Product Image */}
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                  {item.product.badge && (
                    <span className="absolute bottom-0 inset-x-0 bg-[#bb0017] text-white text-[8px] font-bold text-center">
                      {item.product.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-semibold text-[#1b1c1c] line-clamp-2 leading-tight">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-red-500 p-0.5"
                      title="Remove item"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>

                  {item.selectedOption && (
                    <span className="inline-block bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded mt-1 truncate max-w-[180px]">
                      {item.selectedOption}
                    </span>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-black text-[#b22204] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-300 rounded-md overflow-hidden bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Vouchers Selection Section */}
          {items.length > 0 && (
            <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 mt-2 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#1b1c1c]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#b22204] text-[18px]">
                    confirmation_number
                  </span>
                  <span>Shopee Voucher</span>
                </div>
                <span className="text-[11px] text-[#b22204]">
                  {activeVoucher ? activeVoucher.title : 'Select Voucher'}
                </span>
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                {vouchers.map((v) => {
                  const isUnderMinSpend = v.minSpend > itemsSubtotal;
                  const diff = v.minSpend - itemsSubtotal;
                  const formattedDiff = diff % 1 === 0 ? diff.toFixed(0) : diff.toFixed(2);
                  const isSelected = selectedVoucherId === v.id && !isUnderMinSpend;

                  return (
                    <button
                      key={v.id}
                      disabled={isUnderMinSpend}
                      onClick={() => {
                        if (!isUnderMinSpend) {
                          setSelectedVoucherId(isSelected ? '' : v.id);
                        }
                      }}
                      className={`px-2.5 py-1.5 rounded-lg border text-left shrink-0 transition-colors ${
                        isUnderMinSpend
                          ? 'border-slate-200 bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'border-[#b22204] bg-[#ffdad3]/40 text-[#b22204]'
                          : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <p className={`text-[11px] font-bold ${isUnderMinSpend ? 'text-slate-400' : isSelected ? 'text-[#b22204]' : 'text-slate-700'}`}>
                        {v.title}
                      </p>
                      <p className={`text-[9px] ${isUnderMinSpend ? 'text-slate-400' : 'text-slate-500'}`}>
                        {isUnderMinSpend ? `Spend $${formattedDiff} more to use` : `Min. $${v.minSpend}`}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Coins Redemption Checkbox */}
              {coinsBalance > 0 && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={useCoins}
                      onChange={(e) => setUseCoins(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                    />
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-amber-500 text-[18px]">
                        monetization_on
                      </span>
                      <span className="text-[#1b1c1c] font-medium">
                        Redeem {maxCoinsToUse} Shopee Coins
                      </span>
                    </div>
                  </label>
                  <span className="font-bold text-amber-600">
                    -${(maxCoinsToUse / 100).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Pricing Breakdown Summary */}
          {items.length > 0 && (
            <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Merchandise Subtotal:</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${itemsSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Subtotal:</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${shippingFee.toFixed(2)}
                </span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex justify-between text-[#006859]">
                  <span>Voucher Discount:</span>
                  <span className="font-bold tabular-nums">-${voucherDiscount.toFixed(2)}</span>
                </div>
              )}
              {coinsDiscount > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Coins Cashback Redemption:</span>
                  <span className="font-bold tabular-nums">-${coinsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black">
                <span className="text-slate-900">Total Payment:</span>
                <span className="text-base text-[#b22204] tabular-nums">
                  ${finalTotal.toFixed(2)} SGD
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Order Success Overlay Animation */}
        {orderSuccess && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow-lg">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Order Placed Successfully!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Order ID <span className="font-mono font-bold text-[#b22204]">#{orderSuccess}</span> has been confirmed.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Paid via ShopeePay with 100% Buyer Protection. Preparing parcel for dispatch...
            </p>
          </div>
        )}

        {/* Bottom Checkout Action Bar */}
        <div className="bg-white border-t border-slate-200 p-3 flex items-center justify-between gap-3 shadow-lg">
          <div className="leading-tight">
            <span className="text-[10px] text-slate-500 block">Total Payment</span>
            <span className="text-lg font-black text-[#b22204] tabular-nums">
              ${finalTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className={`px-6 h-11 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all ${
              selectedItems.length > 0
                ? 'bg-[#b22204] text-white hover:bg-orange-700 shadow-md active:scale-95'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Check Out ({selectedItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};
