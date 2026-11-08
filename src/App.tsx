import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { DailyDiscoverScreen } from './components/DailyDiscoverScreen';
import { ShopeeMallScreen } from './components/ShopeeMallScreen';
import { ShopeeLiveScreen } from './components/ShopeeLiveScreen';
import { DiscussionScreen } from './components/DiscussionScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { MeProfileScreen } from './components/MeProfileScreen';
import { ConsentScreen } from './components/ConsentScreen';
import { DebriefScreen } from './components/DebriefScreen';

import { ProductDetailModal } from './components/ProductDetailModal';
import { SellerChatModal } from './components/SellerChatModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ScanPayModal } from './components/ScanPayModal';
import { VouchersModal } from './components/VouchersModal';
import { PrizesModal } from './components/PrizesModal';
import { ChatModal } from './components/ChatModal';
import { CameraSearchModal } from './components/CameraSearchModal';
import { OrderTrackModal } from './components/OrderTrackModal';

import { Product, CartItem, Voucher, DiscussionPost, CourtCase } from './types';
import { INITIAL_CART_ITEMS, VOUCHERS } from './data/mockData';
import { INITIAL_DISCUSSIONS } from './data/mockDiscussions';
import { INITIAL_COURT_CASES } from './data/mockCourtCases';

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

  // Study Consent State (remembered in localStorage)
  const [consentChoice, setConsentChoice] = useState<'agreed' | 'declined' | null>(() => {
    try {
      const saved = localStorage.getItem('study_consent_choice');
      if (saved === 'agreed' || saved === 'declined') {
        return saved;
      }
      return null;
    } catch {
      return null;
    }
  });

  const handleAgreeConsent = () => {
    setConsentChoice('agreed');
    try {
      localStorage.setItem('study_consent_choice', 'agreed');
    } catch {
      // ignore
    }
  };

  const handleDeclineConsent = () => {
    setConsentChoice('declined');
    try {
      localStorage.setItem('study_consent_choice', 'declined');
    } catch {
      // ignore
    }
  };

  // Contributor Tier State: Starts this month with 80 points (80 of 100).
  const [contributorPoints, setContributorPoints] = useState<number>(80);
  const [helpfulPostsCount, setHelpfulPostsCount] = useState<number>(0);
  const [hasCompletedTier, setHasCompletedTier] = useState<boolean>(false);

  // Debrief Screen Modal State
  const [isDebriefOpen, setIsDebriefOpen] = useState<boolean>(false);

  const handleResetStudy = () => {
    try {
      localStorage.removeItem('study_consent_choice');
      localStorage.removeItem('shopee_ab_version');
    } catch {
      // ignore
    }
    setConsentChoice(null);
    setIsDebriefOpen(false);
    setContributorPoints(80);
    setHelpfulPostsCount(0);
    setHasCompletedTier(false);
    showToast('Study session reset! Returned to Consent Screen.');
  };

  // Floating Points Award Animation State (+20, +30, +10)
  const [pointsAnimation, setPointsAnimation] = useState<{ points: number; text: string; id: number } | null>(null);

  const triggerPointsAnimation = (points: number, text: string) => {
    setContributorPoints((prev) => {
      const nextPoints = prev + points;
      // When reaching 100 points, show completion message and automatically open Debrief screen
      if (nextPoints >= 100 && !hasCompletedTier) {
        setHasCompletedTier(true);
        const completionMsg = abVersion === 'A'
          ? '🎉 You earned Silver!'
          : '🎉 You kept your Silver status for this month!';
        showToast(completionMsg);
        setTimeout(() => {
          setIsDebriefOpen(true);
        }, 2000);
      }
      return nextPoints;
    });
    setPointsAnimation({ points, text, id: Date.now() });
    setTimeout(() => {
      setPointsAnimation(null);
    }, 2400);
  };

  // Discussions & Community Court state
  const [discussions, setDiscussions] = useState<Record<string, DiscussionPost[]>>(INITIAL_DISCUSSIONS);
  const [courtCases, setCourtCases] = useState<CourtCase[]>(INITIAL_COURT_CASES);

  // Wallet & Reward State
  const [shopeePayBalance, setShopeePayBalance] = useState<number>(48.50);
  const [coinsBalance, setCoinsBalance] = useState<number>(1240);
  const [hasClaimedDailyCoins, setHasClaimedDailyCoins] = useState<boolean>(false);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [vouchers, setVouchers] = useState<Voucher[]>(VOUCHERS);

  // Active Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSellerChatOpen, setIsSellerChatOpen] = useState<boolean>(false);
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
    }, 3000);
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
        triggerPointsAnimation(30, 'Post became Helpful! ⭐');
        showToast('🎉 Your post reached 10 agrees and became a Helpful Post! +30 Points earned.');
      }

      return {
        ...prev,
        [productId]: updated
      };
    });
  };

  // Writing a post awards +20 points
  const handleSubmitPost = (newPost: DiscussionPost) => {
    setDiscussions((prev) => {
      const existing = prev[newPost.productId] || [];
      return {
        ...prev,
        [newPost.productId]: [newPost, ...existing]
      };
    });
    triggerPointsAnimation(20, 'Post Published! 📝');
    showToast('Your post has been submitted! +20 Points earned. Community Agree review in progress...');
  };

  // Post becoming Helpful awards +30 points
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
        triggerPointsAnimation(30, 'Post became Helpful! ⭐');
        showToast('🎉 Your post reached 10 agrees and became a Helpful Post! +30 Points earned.');
      }
      return updatedState;
    });
  };

  // Voting on a Community Court case awards +10 points
  const handleVoteCourtCase = (caseId: string, choice: 'buyerRight' | 'sellerRight' | 'notEnoughInfo') => {
    setCourtCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        if (c.userVote) return c; // 1 vote per user
        return {
          ...c,
          userVote: choice,
          votes: {
            ...c.votes,
            [choice]: c.votes[choice] + 1
          }
        };
      })
    );
    triggerPointsAnimation(10, 'Court Verdict Cast! ⚖️');
    showToast('Verdict recorded! +10 Contributor Points earned.');
  };

  // Escalating dispute from seller chat creates a new Court Case
  const handleEscalateToCommunity = (newCourtCase: CourtCase) => {
    setCourtCases((prev) => [newCourtCase, ...prev]);
    showToast(`Case #${newCourtCase.id} successfully escalated to Community Court!`);
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
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          product,
          quantity,
          selectedOption: option,
          selected: true
        }
      ];
    });
    showToast(`Added ${quantity}x ${product.name.slice(0, 22)}... to cart!`);
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

  const handleSelectAll = (selected: boolean) => {
    setCartItems((prev) => prev.map((item) => ({ ...item, selected })));
  };

  // Place Order Simulation
  const handlePlaceOrder = () => {
    const selectedCount = cartItems.filter((i) => i.selected).length;
    setCartItems((prev) => prev.filter((item) => !item.selected));
    setIsCartOpen(false);
    showToast(`🎉 Order placed successfully for ${selectedCount} items! Tracking ready.`);
    setTimeout(() => {
      setOrderTrackFilter('To Ship');
      setIsOrderTrackOpen(true);
    }, 600);
  };

  // Reward Coins Simulation
  const handleRewardCoins = (amount: number) => {
    setCoinsBalance((c) => c + amount);
    showToast(`🎉 You earned ${amount} Shopee Coins!`);
  };

  // Claim Daily Coins
  const handleClaimDailyCoins = () => {
    if (hasClaimedDailyCoins) {
      showToast('You already claimed your coins for today. Come back tomorrow!');
      return;
    }
    setCoinsBalance((c) => c + 100);
    setHasClaimedDailyCoins(true);
    showToast('🎉 +100 Daily Check-in Coins claimed!');
  };

  // Claim Voucher
  const handleClaimVoucher = (voucherId: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === voucherId ? { ...v, claimed: true } : v))
    );
    showToast('Voucher claimed successfully! Applied to your wallet.');
  };

  // Wallet Top-Up Simulation
  const handleTopUp = (amount: number) => {
    setShopeePayBalance((b) => b + amount);
    showToast(`$${amount.toFixed(2)} topped up to ShopeePay!`);
  };

  const handleOpenOrderTrack = (filter: string = 'All') => {
    setOrderTrackFilter(filter);
    setIsOrderTrackOpen(true);
  };

  // 1. Consent screen: shown on first visit before the app
  if (consentChoice !== 'agreed') {
    return (
      <ConsentScreen
        onAgree={handleAgreeConsent}
        onDecline={handleDeclineConsent}
        initialDeclined={consentChoice === 'declined'}
      />
    );
  }

  return (
    <div className="flex justify-center bg-slate-900 min-h-screen text-[#1b1c1c] antialiased select-none font-sans">
      <div className="w-full max-w-xl bg-[#f5f3f3] min-h-screen flex flex-col relative shadow-2xl overflow-x-hidden">
        {/* Fixed Top Header */}
        <Header
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          unreadNotifsCount={2}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenCamera={() => setIsCameraOpen(true)}
          onGoHome={() => setActiveTab('daily-discover')}
          onGoMe={() => setActiveTab('me')}
        />

        {/* Dynamic Main App Screens */}
        <main className="flex-1 w-full flex flex-col">
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

          {/* Discussion Main App Screen */}
          {activeTab === 'discussion' && (
            <DiscussionScreen
              discussions={discussions}
              courtCases={courtCases}
              onVotePost={handleVotePost}
              onSubmitPost={handleSubmitPost}
              onPostBecameHelpful={handlePostBecameHelpful}
              onVoteCourtCase={handleVoteCourtCase}
              onSelectProduct={(p) => setSelectedProduct(p)}
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
              onOpenDebrief={() => setIsDebriefOpen(true)}
              abVersion={abVersion}
              contributorPoints={contributorPoints}
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

        {/* Floating Animated Points Badge (+20, +30, +10) */}
        {pointsAnimation && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-60 pointer-events-none animate-bounce">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white ring-4 ring-amber-400/40 text-sm">
              <span className="material-symbols-outlined text-[20px] text-amber-900">
                stars
              </span>
              <span className="text-base font-black">+{pointsAnimation.points} Points!</span>
              <span className="text-xs font-bold text-slate-800">{pointsAnimation.text}</span>
            </div>
          </div>
        )}

        {/* Sticky Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          unreadCount={2}
        />

        {/* Product Detail Modal (Without Discussion Tab) */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, opt, qty) => handleAddToCart(p, opt, qty)}
          onBuyNow={(p, opt, qty) => handleBuyNow(p, opt, qty)}
          onOpenChat={() => {
            setIsSellerChatOpen(true);
          }}
          onOpenVouchers={() => setIsVouchersOpen(true)}
        />

        {/* Seller Dispute Chat Modal (With Ask the Community Button) */}
        <SellerChatModal
          isOpen={isSellerChatOpen}
          onClose={() => setIsSellerChatOpen(false)}
          product={selectedProduct}
          onEscalateToCommunity={handleEscalateToCommunity}
          onOpenCommunityCourt={() => {
            setIsSellerChatOpen(false);
            setSelectedProduct(null);
            setActiveTab('discussion');
          }}
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

        {/* Support Chat Modal */}
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

        {/* 2. Debrief Screen Modal */}
        {isDebriefOpen && (
          <DebriefScreen
            abVersion={abVersion}
            contributorPoints={contributorPoints}
            helpfulPostsCount={helpfulPostsCount}
            onClose={() => setIsDebriefOpen(false)}
            onResetStudy={handleResetStudy}
            onSwitchVersion={handleSwitchVersion}
          />
        )}
      </div>
    </div>
  );
}
