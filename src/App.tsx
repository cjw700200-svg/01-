import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { DailyDiscoverScreen } from './components/DailyDiscoverScreen';
import { ShopeeMallScreen } from './components/ShopeeMallScreen';
import { ShopeeLiveScreen } from './components/ShopeeLiveScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { MeProfileScreen } from './components/MeProfileScreen';

import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ScanPayModal } from './components/ScanPayModal';
import { VouchersModal } from './components/VouchersModal';
import { PrizesModal } from './components/PrizesModal';
import { ChatModal } from './components/ChatModal';
import { CameraSearchModal } from './components/CameraSearchModal';
import { OrderTrackModal } from './components/OrderTrackModal';

import { Product, CartItem, Voucher, DiscussionPost } from './types';
import { INITIAL_CART_ITEMS, VOUCHERS } from './data/mockData';
import { INITIAL_DISCUSSIONS } from './data/mockDiscussions';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('daily-discover');

  // A/B Version Logic controlled by ?v=A or ?v=B in URL or saved in localStorage
  const [abVersion, setAbVersion] = useState<'A' | 'B'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlV = params.get('v')?.toUpperCase();
      if (urlV === 'A' || urlV === 'B') {
        localStorage.setItem('shopee_ab_version', urlV);
        return urlV;
      }
      const saved = localStorage.getItem('shopee_ab_version');
      if (saved === 'A' || saved === 'B') {
        return saved;
      }
      const assigned = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('shopee_ab_version', assigned);
      return assigned;
    } catch {
      return 'A';
    }
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlV = params.get('v')?.toUpperCase();
      if (urlV === 'A' || urlV === 'B') {
        if (urlV !== abVersion) {
          setAbVersion(urlV as 'A' | 'B');
          localStorage.setItem('shopee_ab_version', urlV);
        }
      }
    } catch {
      // ignore
    }
  }, [abVersion]);

  const handleSwitchVersion = (v: 'A' | 'B') => {
    setAbVersion(v);
    try {
      localStorage.setItem('shopee_ab_version', v);
      const url = new URL(window.location.href);
      url.searchParams.set('v', v);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
    showToast(`Switched to Contributor Tier: Version ${v}`);
  };

  // Discussions & Contributor Tier state
  const [discussions, setDiscussions] = useState<Record<string, DiscussionPost[]>>(INITIAL_DISCUSSIONS);
  const [helpfulPostsCount, setHelpfulPostsCount] = useState<number>(0);

  // Wallet & Reward State
  const [shopeePayBalance, setShopeePayBalance] = useState<number>(48.50);
  const [coinsBalance, setCoinsBalance] = useState<number>(1240);
  const [hasClaimedDailyCoins, setHasClaimedDailyCoins] = useState<boolean>(false);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [vouchers, setVouchers] = useState<Voucher[]>(VOUCHERS);

  // Active Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isScanPayOpen, setIsScanPayOpen] = useState<boolean>(false);
  const [scanPayMode, setScanPayMode] = useState<'scan' | 'topup'>('scan');
  const [isVouchersOpen, setIsVouchersOpen] = useState<boolean>(false);
  const [isPrizesOpen, setIsPrizesOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isOrderTrackOpen, setIsOrderTrackOpen] = useState<boolean>(false);
  const [orderTrackFilter, setOrderTrackFilter] = useState<string>('All');

  // Interactive Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Discussion Handlers
  const handleVotePost = (productId: string, postId: string, type: 'agree' | 'disagree') => {
    setDiscussions((prev) => {
      const list = prev[productId] || [];
      let postJustTurnedHelpful = false;

      const updated = list.map((p) => {
        if (p.id !== postId) return p;

        let newAgree = p.agreeCount;
        let newDisagree = p.disagreeCount;
        const newVote: 'agree' | 'disagree' | null = p.userVoted === type ? null : type;

        if (p.userVoted === 'agree') {
          newAgree--;
        } else if (p.userVoted === 'disagree') {
          newDisagree--;
        }

        if (newVote === 'agree') {
          newAgree++;
        } else if (newVote === 'disagree') {
          newDisagree++;
        }

        const isNowHelpful = newAgree >= 10;
        if (isNowHelpful && !p.isHelpful && p.isCurrentUser) {
          postJustTurnedHelpful = true;
        }

        return {
          ...p,
          agreeCount: Math.max(0, newAgree),
          disagreeCount: Math.max(0, newDisagree),
          userVoted: newVote,
          isHelpful: isNowHelpful
        };
      });

      if (postJustTurnedHelpful) {
        setHelpfulPostsCount((cnt) => cnt + 1);
        showToast('🎉 Your post reached 10 agrees and became a Helpful Post! Contributor Tier updated.');
      }

      return {
        ...prev,
        [productId]: updated
      };
    });
  };

  const handleSubmitPost = (newPost: DiscussionPost) => {
    setDiscussions((prev) => {
      const existing = prev[newPost.productId] || [];
      return {
        ...prev,
        [newPost.productId]: [newPost, ...existing]
      };
    });
    showToast('Your post has been submitted! Community Agree review in progress...');
  };

  const handlePostBecameHelpful = (postId: string) => {
    setDiscussions((prev) => {
      const updatedState = { ...prev };
      let updatedUserPost = false;

      for (const prodId in updatedState) {
        updatedState[prodId] = updatedState[prodId].map((post) => {
          if (post.id === postId && !post.isHelpful) {
            updatedUserPost = true;
            return { ...post, isHelpful: true };
          }
          return post;
        });
      }

      if (updatedUserPost) {
        setHelpfulPostsCount((cnt) => cnt + 1);
        showToast('🎉 Your post reached 10 agrees and became a Helpful Post! Contributor Tier updated.');
      }
      return updatedState;
    });
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, option: string = 'Default', quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === option
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random()}`,
          product,
          quantity,
          selectedOption: option,
          selected: true
        };
        return [newItem, ...prev];
      }
    });
    showToast(`Added "${product.name.slice(0, 20)}..." to Cart!`);
  };

  const handleBuyNow = (product: Product, option: string = 'Default', quantity: number = 1) => {
    handleAddToCart(product, option, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const handleToggleSelect = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleSelectAll = (select: boolean) => {
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  // Order Placement
  const handlePlaceOrder = (total: number, orderId: string) => {
    setShopeePayBalance((prev) => Math.max(0, prev - total));
    setCartItems((prev) => prev.filter((item) => !item.selected));
    showToast(`Order #${orderId} confirmed via ShopeePay!`);
  };

  // Daily Coins Check-In
  const handleClaimDailyCoins = () => {
    if (hasClaimedDailyCoins) {
      showToast('You already checked in today! Come back tomorrow for +10 coins.');
      return;
    }
    setHasClaimedDailyCoins(true);
    setCoinsBalance((prev) => prev + 10);
    showToast('🎉 +10 Shopee Coins credited! Daily streak 1/7 days.');
  };

  // Earn Coins from Games or Live
  const handleRewardCoins = (amount: number) => {
    setCoinsBalance((prev) => prev + amount);
    showToast(`✨ Received +${amount} Shopee Coins!`);
  };

  // Top Up ShopeePay
  const handleTopUp = (amount: number) => {
    setShopeePayBalance((prev) => prev + amount);
    showToast(`ShopeePay: +$${amount.toFixed(2)} SGD credited successfully!`);
  };

  // Claim Voucher
  const handleClaimVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, claimed: true } : v))
    );
    showToast('🎟️ Voucher claimed and saved to your wallet!');
  };

  // Open Order Track modal
  const handleOpenOrderTrack = (filter: string = 'All') => {
    setOrderTrackFilter(filter);
    setIsOrderTrackOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1b1c1c] flex justify-center text-[#1b1c1c] antialiased">
      {/* Mobile Application Canvas Container */}
      <div className="w-full max-w-xl bg-[#f5f3f3] min-h-screen shadow-2xl relative flex flex-col overflow-x-hidden">
        {/* Sticky Header */}
        <Header
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          unreadNotifsCount={2}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenCamera={() => setIsCameraOpen(true)}
          onGoHome={() => setActiveTab('daily-discover')}
          onGoMe={() => setActiveTab('me')}
        />

        {/* Main Viewport Screen according to Active Tab */}
        <main className="flex-1 w-full pt-16 pb-16">
          {activeTab === 'daily-discover' && (
            <DailyDiscoverScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpenScanPay={() => {
                setScanPayMode('scan');
                setIsScanPayOpen(true);
              }}
              onOpenTopUp={() => {
                setScanPayMode('topup');
                setIsScanPayOpen(true);
              }}
              onOpenVouchers={() => setIsVouchersOpen(true)}
              onOpenPrizes={() => setIsPrizesOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              shopeePayBalance={shopeePayBalance}
              coinsBalance={coinsBalance}
              onClaimDailyCoins={handleClaimDailyCoins}
              hasClaimedDailyCoins={hasClaimedDailyCoins}
            />
          )}

          {activeTab === 'shopee-mall' && (
            <ShopeeMallScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpenVouchers={() => setIsVouchersOpen(true)}
            />
          )}

          {activeTab === 'shopee-live' && (
            <ShopeeLiveScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onEarnCoins={handleRewardCoins}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsScreen
              onOpenOrderTrack={() => handleOpenOrderTrack('To Receive')}
              onOpenVouchers={() => setIsVouchersOpen(true)}
              onOpenTopUp={() => {
                setScanPayMode('topup');
                setIsScanPayOpen(true);
              }}
            />
          )}

          {activeTab === 'me' && (
            <MeProfileScreen
              shopeePayBalance={shopeePayBalance}
              coinsBalance={coinsBalance}
              onOpenTopUp={() => {
                setScanPayMode('topup');
                setIsScanPayOpen(true);
              }}
              onOpenScanPay={() => {
                setScanPayMode('scan');
                setIsScanPayOpen(true);
              }}
              onOpenVouchers={() => setIsVouchersOpen(true)}
              onOpenOrderTrack={handleOpenOrderTrack}
              onOpenPrizes={() => setIsPrizesOpen(true)}
              abVersion={abVersion}
              helpfulPostsCount={helpfulPostsCount}
              onSwitchVersion={handleSwitchVersion}
            />
          )}
        </main>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-18 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c]/95 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150 border border-white/20">
            <span className="material-symbols-outlined text-[16px] text-amber-400">info</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sticky Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          unreadCount={2}
        />

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, opt, qty) => handleAddToCart(p, opt, qty)}
          onBuyNow={(p, opt, qty) => handleBuyNow(p, opt, qty)}
          onOpenChat={() => {
            setSelectedProduct(null);
            setIsChatOpen(true);
          }}
          onOpenVouchers={() => setIsVouchersOpen(true)}
          discussions={discussions}
          onVotePost={handleVotePost}
          onSubmitPost={handleSubmitPost}
          onPostBecameHelpful={handlePostBecameHelpful}
        />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          vouchers={vouchers}
          coinsBalance={coinsBalance}
          onPlaceOrder={handlePlaceOrder}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenCamera={() => setIsCameraOpen(true)}
        />

        {/* Scan & Pay & Top-Up Modal */}
        <ScanPayModal
          isOpen={isScanPayOpen}
          onClose={() => setIsScanPayOpen(false)}
          balance={shopeePayBalance}
          onTopUp={handleTopUp}
          initialMode={scanPayMode}
        />

        {/* Vouchers Modal */}
        <VouchersModal
          isOpen={isVouchersOpen}
          onClose={() => setIsVouchersOpen(false)}
          vouchers={vouchers}
          onClaimVoucher={handleClaimVoucher}
        />

        {/* Lucky Prizes Spin Modal */}
        <PrizesModal
          isOpen={isPrizesOpen}
          onClose={() => setIsPrizesOpen(false)}
          onRewardCoins={handleRewardCoins}
        />

        {/* Live Chat Modal */}
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

        {/* Visual Camera Search Modal */}
        <CameraSearchModal
          isOpen={isCameraOpen}
          onClose={() => setIsCameraOpen(false)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Order Tracking Modal */}
        <OrderTrackModal
          isOpen={isOrderTrackOpen}
          onClose={() => setIsOrderTrackOpen(false)}
          initialFilter={orderTrackFilter}
        />
      </div>
    </div>
  );
}
