import React, { useState, useEffect, useRef } from 'react';
import { DiscussionPost, CourtCase, Product } from '../types';
import { WritePostModal } from './WritePostModal';

interface DiscussionScreenProps {
  discussions: Record<string, DiscussionPost[]>;
  courtCases: CourtCase[];
  onVotePost: (productId: string, postId: string, type: 'agree' | 'disagree') => void;
  onSubmitPost: (newPost: DiscussionPost) => void;
  onPostBecameHelpful: (postId: string) => void;
  onVoteCourtCase: (caseId: string, choice: 'buyerRight' | 'sellerRight' | 'notEnoughInfo') => void;
  onSelectProduct?: (product: Product) => void;
  initialSection?: 'discussions' | 'court';
}

export const DiscussionScreen: React.FC<DiscussionScreenProps> = ({
  discussions,
  courtCases,
  onVotePost,
  onSubmitPost,
  onPostBecameHelpful,
  onVoteCourtCase,
  initialSection = 'discussions'
}) => {
  // Navigation between the 2 main sections: Discussions vs Community Court
  const [activeSection, setActiveSection] = useState<'discussions' | 'court'>(initialSection);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'most_helpful' | 'newest'>('most_helpful');
  const [disputesOnly, setDisputesOnly] = useState(false);

  // Write modal state
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [recentlySubmittedId, setRecentlySubmittedId] = useState<string | null>(null);

  // Community Court Review Tracking: Track which case accordions have been expanded
  // A user must expand BOTH buyer claim and seller statement to unlock voting for that case
  const [expandedBuyerClaims, setExpandedBuyerClaims] = useState<Record<string, boolean>>({});
  const [expandedSellerStatements, setExpandedSellerStatements] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Electronics', 'Beauty', 'Fashion', 'Home', 'Groceries'];

  // Flatten all discussion posts across all products into a unified list
  const allPostsList = React.useMemo(() => {
    const list: DiscussionPost[] = [];
    Object.values(discussions).forEach((posts) => {
      list.push(...posts);
    });
    return list;
  }, [discussions]);

  // Auto-increment Agree timer simulation for recently submitted post
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!recentlySubmittedId) return;

    const target = allPostsList.find((p) => p.id === recentlySubmittedId);
    if (!target) return;

    if (target.agreeCount < 10) {
      timerRef.current = setTimeout(() => {
        onVotePost(target.productId, recentlySubmittedId, 'agree');
      }, 700);
    } else if (target.agreeCount >= 10 && !target.isHelpful) {
      onPostBecameHelpful(recentlySubmittedId);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [recentlySubmittedId, allPostsList, onVotePost, onPostBecameHelpful]);

  const handlePostSubmit = (newPost: DiscussionPost) => {
    onSubmitPost(newPost);
    setRecentlySubmittedId(newPost.id);
  };

  // Filter posts based on category, search query, and disputes
  const filteredPosts = React.useMemo(() => {
    return allPostsList.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All' && post.category && post.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Dispute filter
      if (disputesOnly && !post.isDispute) {
        return false;
      }
      // Search query filter (matches category, product name, or content)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inProductName = post.productName ? post.productName.toLowerCase().includes(query) : false;
        const inContent = post.content.toLowerCase().includes(query);
        const inCategory = post.category ? post.category.toLowerCase().includes(query) : false;
        const inAuthor = post.authorName.toLowerCase().includes(query);
        if (!inProductName && !inContent && !inCategory && !inAuthor) {
          return false;
        }
      }
      return true;
    });
  }, [allPostsList, selectedCategory, disputesOnly, searchQuery]);

  // Pinned Posts: most helpful positive and most helpful critical
  const positivePosts = filteredPosts.filter((p) => p.sentiment === 'positive');
  const criticalPosts = filteredPosts.filter((p) => p.sentiment === 'critical');

  const topPositivePost = positivePosts.reduce<DiscussionPost | null>((prev, curr) => {
    if (!prev) return curr;
    return curr.agreeCount > prev.agreeCount ? curr : prev;
  }, null);

  const topCriticalPost = criticalPosts.reduce<DiscussionPost | null>((prev, curr) => {
    if (!prev) return curr;
    return curr.agreeCount > prev.agreeCount ? curr : prev;
  }, null);

  // Sorted list excluding the pinned items (or sorted fully)
  const sortedPosts = React.useMemo(() => {
    const list = [...filteredPosts];
    if (sortBy === 'most_helpful') {
      return list.sort((a, b) => b.agreeCount - a.agreeCount);
    } else {
      // Newest
      return list.sort((a, b) => {
        if (a.date.includes('Just now')) return -1;
        if (b.date.includes('Just now')) return 1;
        return 0;
      });
    }
  }, [filteredPosts, sortBy]);

  // Filter court cases by category and search
  const filteredCourtCases = React.useMemo(() => {
    return courtCases.filter((c) => {
      if (selectedCategory !== 'All' && c.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inProduct = c.productName.toLowerCase().includes(q);
        const inClaim = c.buyerClaim.toLowerCase().includes(q);
        const inId = c.id.toLowerCase().includes(q);
        if (!inProduct && !inClaim && !inId) return false;
      }
      return true;
    });
  }, [courtCases, selectedCategory, searchQuery]);

  // Helper for Author Tier Badge
  const renderAuthorTierBadge = (tier?: 'Bronze' | 'Silver' | 'Gold') => {
    const t = tier || 'Bronze';
    if (t === 'Gold') {
      return (
        <span className="inline-flex items-center gap-0.5 bg-amber-400 text-amber-950 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
          <span className="material-symbols-outlined text-[11px]">workspace_premium</span>
          Gold
        </span>
      );
    }
    if (t === 'Silver') {
      return (
        <span className="inline-flex items-center gap-0.5 bg-slate-200 text-slate-800 text-[9px] font-black px-1.5 py-0.2 rounded-full">
          <span className="material-symbols-outlined text-[11px]">stars</span>
          Silver
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 bg-amber-700/20 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
        <span className="material-symbols-outlined text-[11px]">military_tech</span>
        Bronze
      </span>
    );
  };

  return (
    <div className="flex flex-col w-full bg-[#f5f3f3] min-h-screen pb-20">
      {/* Top Header */}
      <div className="bg-[#b22204] text-white p-3.5 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">forum</span>
            <div>
              <h1 className="text-base font-extrabold leading-tight">Shopee Community</h1>
              <p className="text-[10px] text-orange-200">Discussions, Buyer Reviews &amp; Dispute Court</p>
            </div>
          </div>
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-white text-[#b22204] hover:bg-orange-50 active:scale-95 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            Write Post
          </button>
        </div>

        {/* Search Bar: "Search a category or product" */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a category or product"
            className="w-full bg-white text-slate-900 text-xs rounded-full pl-9 pr-8 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Two Main Section Tabs: Discussions vs Community Court */}
      <div className="bg-white border-b border-slate-200 sticky top-[98px] z-20 shadow-xs">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveSection('discussions')}
            className={`flex-1 py-3 text-xs font-extrabold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeSection === 'discussions'
                ? 'border-[#b22204] text-[#b22204] bg-orange-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Discussions</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              activeSection === 'discussions' ? 'bg-[#b22204] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {filteredPosts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('court')}
            className={`flex-1 py-3 text-xs font-extrabold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeSection === 'court'
                ? 'border-[#b22204] text-[#b22204] bg-orange-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">balance</span>
            <span>Community Court</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              activeSection === 'court' ? 'bg-[#b22204] text-white' : 'bg-amber-100 text-amber-900'
            }`}>
              {courtCases.length} Cases
            </span>
          </button>
        </div>

        {/* Category Chips: Electronics, Beauty, Fashion, Home, Groceries */}
        <div className="px-3 py-2 border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-slate-50/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#b22204] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: DISCUSSIONS */}
      {activeSection === 'discussions' && (
        <div className="p-3 space-y-3">
          {/* Controls row: Disputes filter and Sort selector */}
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setDisputesOnly(!disputesOnly)}
              className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 transition-all ${
                disputesOnly
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">report_problem</span>
              Disputes Only {disputesOnly && '✓'}
            </button>

            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'most_helpful' | 'newest')}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="most_helpful">Most Helpful</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Pinned Posts: Side by Side (Most Helpful Positive & Critical) */}
          {topPositivePost && topCriticalPost && (
            <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-500 text-[16px]">push_pin</span>
                  Pinned Community Highlights
                </span>
                <span className="text-[10px] text-slate-400">Side-by-side comparison</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {/* Most Helpful Positive */}
                <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                        Most Helpful Positive
                      </span>
                      <div className="flex items-center text-amber-500 text-xs">
                        {'★'.repeat(topPositivePost.rating)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {topPositivePost.authorName}
                      </span>
                      {renderAuthorTierBadge(topPositivePost.authorTier)}
                    </div>

                    {topPositivePost.productName && (
                      <p className="text-[10px] text-slate-500 font-medium truncate mb-1">
                        📦 {topPositivePost.productName}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-700 leading-snug line-clamp-3">
                      "{topPositivePost.content}"
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-emerald-100 flex items-center justify-between text-[10px] text-emerald-800 font-bold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">thumb_up</span>
                      {topPositivePost.agreeCount} Agreed
                    </span>
                    <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded-full text-[9px]">
                      Helpful ✓
                    </span>
                  </div>
                </div>

                {/* Most Helpful Critical */}
                <div className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                        Most Helpful Critical
                      </span>
                      <div className="flex items-center text-amber-500 text-xs">
                        {'★'.repeat(topCriticalPost.rating)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {topCriticalPost.authorName}
                      </span>
                      {renderAuthorTierBadge(topCriticalPost.authorTier)}
                    </div>

                    {topCriticalPost.productName && (
                      <p className="text-[10px] text-slate-500 font-medium truncate mb-1">
                        📦 {topCriticalPost.productName}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-700 leading-snug line-clamp-3">
                      "{topCriticalPost.content}"
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-rose-100 flex items-center justify-between text-[10px] text-rose-800 font-bold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">thumb_up</span>
                      {topCriticalPost.agreeCount} Agreed
                    </span>
                    <span className="bg-rose-100 text-rose-900 px-1.5 py-0.2 rounded-full text-[9px]">
                      Helpful ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discussion Posts List */}
          <div className="space-y-3">
            {sortedPosts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-slate-500 shadow-xs">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                  search_off
                </span>
                <p className="text-xs font-bold">No posts match your filters</p>
                <p className="text-[11px] text-slate-400 mt-1">Try another category or clear search</p>
              </div>
            ) : (
              sortedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-2.5 transition-all hover:border-slate-300"
                >
                  {/* Post Header: Product info, Author + Tier Badge, Rating, Date */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm shadow-inner shrink-0">
                        {post.authorAvatar || '👤'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-extrabold text-slate-900">
                            {post.authorName}
                          </span>
                          {renderAuthorTierBadge(post.authorTier)}
                          {post.isHelpful && (
                            <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5 border border-amber-200">
                              <span className="material-symbols-outlined text-[11px] text-amber-600">verified</span>
                              Helpful
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{post.date}</span>
                          {post.category && (
                            <>
                              <span>•</span>
                              <span className="font-semibold text-slate-600">{post.category}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(post.rating)}
                        {'☆'.repeat(5 - post.rating)}
                      </div>
                      {post.isDispute && (
                        <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 mt-1">
                          Buyer/Seller Dispute
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Tag if available */}
                  {post.productName && (
                    <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-2 border border-slate-100">
                      {post.productImage && (
                        <img
                          src={post.productImage}
                          alt={post.productName}
                          className="w-8 h-8 rounded object-cover shrink-0"
                        />
                      )}
                      <p className="text-[11px] font-semibold text-slate-800 truncate flex-1">
                        {post.productName}
                      </p>
                    </div>
                  )}

                  {/* Guided QA Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[10px]">
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-400 block font-medium">Description:</span>
                      <span className="font-bold text-slate-700">{post.answers.matchedDescription}</span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-400 block font-medium">Quality/Size:</span>
                      <span className="font-bold text-slate-700">{post.answers.qualitySize}</span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-400 block font-medium">Buy Again:</span>
                      <span className="font-bold text-slate-700">{post.answers.wouldBuyAgain}</span>
                    </div>
                  </div>

                  {/* Main Post Content */}
                  <p className="text-xs text-slate-800 leading-relaxed font-normal">
                    {post.content}
                  </p>

                  {/* Seller Reply */}
                  {post.sellerReply && (
                    <div className="bg-slate-50/90 border-l-2 border-[#b22204] p-2.5 rounded-r-lg text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-900">
                        <span className="flex items-center gap-1 text-[#b22204]">
                          <span className="material-symbols-outlined text-[14px]">storefront</span>
                          {post.sellerReply.sellerName}
                          {post.sellerReply.verified && (
                            <span className="material-symbols-outlined text-[12px] text-blue-500">verified</span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">{post.sellerReply.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {post.sellerReply.content}
                      </p>
                    </div>
                  )}

                  {/* Post Footer: Agree / Disagree interactive buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {post.agreeCount >= 10 ? '⭐ Verified Community Helpful' : 'Help other shoppers by voting'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onVotePost(post.productId, post.id, 'agree')}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border transition-all ${
                          post.userVoted === 'agree'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {post.userVoted === 'agree' ? 'thumb_up' : 'thumb_up'}
                        </span>
                        <span>Agree ({post.agreeCount})</span>
                      </button>

                      <button
                        onClick={() => onVotePost(post.productId, post.id, 'disagree')}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border transition-all ${
                          post.userVoted === 'disagree'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">thumb_down</span>
                        <span>Disagree ({post.disagreeCount})</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: COMMUNITY COURT */}
      {activeSection === 'court' && (
        <div className="p-3 space-y-3">
          {/* Advisory Notice Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2.5 shadow-xs">
            <span className="material-symbols-outlined text-amber-700 text-[20px] shrink-0 mt-0.5">
              gavel
            </span>
            <div className="space-y-0.5">
              <p className="font-extrabold text-amber-900">
                Shopee Community Court · Peer Dispute Resolution
              </p>
              <p className="text-[11px] text-amber-800 leading-snug">
                Review masked evidence, buyer claims, and seller statements to cast your verdict. Earn <strong>+10 Contributor Points</strong> per vote.
              </p>
              <p className="text-[10px] text-amber-700/90 font-semibold italic pt-0.5">
                The community verdict is advisory. Refunds follow Shopee's official dispute process.
              </p>
            </div>
          </div>

          {/* List of Court Cases */}
          {filteredCourtCases.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-slate-500 shadow-xs">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                balance
              </span>
              <p className="text-xs font-bold">No dispute cases in this category</p>
              <p className="text-[11px] text-slate-400 mt-1">Check "All" categories or start a dispute from Seller Chat</p>
            </div>
          ) : (
            filteredCourtCases.map((courtCase) => {
              const isBuyerExpanded = expandedBuyerClaims[courtCase.id] || false;
              const isSellerExpanded = expandedSellerStatements[courtCase.id] || false;
              const canVote = isBuyerExpanded && isSellerExpanded;
              const hasVoted = Boolean(courtCase.userVote);

              // Calculate vote percentages
              const totalVotes = courtCase.votes.buyerRight + courtCase.votes.sellerRight + courtCase.votes.notEnoughInfo;
              const buyerPct = totalVotes > 0 ? Math.round((courtCase.votes.buyerRight / totalVotes) * 100) : 0;
              const sellerPct = totalVotes > 0 ? Math.round((courtCase.votes.sellerRight / totalVotes) * 100) : 0;
              const notEnoughPct = totalVotes > 0 ? Math.round((courtCase.votes.notEnoughInfo / totalVotes) * 100) : 0;

              return (
                <div
                  key={courtCase.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden space-y-0"
                >
                  {/* Case Header Badge & Countdown */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#b22204] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                        Case {courtCase.id}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {courtCase.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-amber-300 font-mono font-bold">
                      <span className="material-symbols-outlined text-[14px]">timer</span>
                      <span>Voting closes in 2d 18h</span>
                    </div>
                  </div>

                  {/* Product Row */}
                  <div className="p-3 border-b border-slate-100 flex items-center gap-3 bg-slate-50/40">
                    <img
                      src={courtCase.productImage}
                      alt={courtCase.productName}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-extrabold text-slate-900 truncate">
                        {courtCase.productName}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] mt-0.5">
                        <span className="text-[#b22204] font-black">${courtCase.productPrice.toFixed(2)}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 font-medium truncate">
                          Buyer: {courtCase.buyerName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 space-y-3">
                    {/* Collapsible Section 1: Buyer's Claim & Photos */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          setExpandedBuyerClaims((prev) => ({
                            ...prev,
                            [courtCase.id]: !prev[courtCase.id]
                          }))
                        }
                        className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-blue-600 text-[18px]">
                            person
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            Buyer's Claim &amp; Evidence
                          </span>
                          {isBuyerExpanded && (
                            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">
                              Reviewed ✓
                            </span>
                          )}
                        </div>
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                          {isBuyerExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isBuyerExpanded && (
                        <div className="p-3 bg-white space-y-2.5 border-t border-slate-100 animate-in fade-in duration-150">
                          <p className="text-xs text-slate-700 leading-relaxed font-normal">
                            {courtCase.buyerClaim}
                          </p>

                          {/* Evidence Photos */}
                          {courtCase.photos && courtCase.photos.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Photo Evidence ({courtCase.photos.length}):
                              </p>
                              <div className="flex gap-2 overflow-x-auto pb-1">
                                {courtCase.photos.map((url, idx) => (
                                  <img
                                    key={idx}
                                    src={url}
                                    alt={`Evidence ${idx + 1}`}
                                    className="w-16 h-16 rounded-lg object-cover border border-slate-200 shadow-xs shrink-0"
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Masked Chat Excerpt */}
                          {courtCase.chatExcerpt && (
                            <div className="mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1.5">
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                Masked Chat Excerpt (PII Hidden):
                              </p>
                              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                                {courtCase.chatExcerpt.map((msg, i) => (
                                  <div key={i} className="text-[11px] leading-relaxed">
                                    <span className={`font-bold ${msg.sender === 'buyer' ? 'text-blue-700' : 'text-[#b22204]'}`}>
                                      {msg.senderName}:
                                    </span>{' '}
                                    <span className="text-slate-700">{msg.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Collapsible Section 2: Seller's Statement */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          setExpandedSellerStatements((prev) => ({
                            ...prev,
                            [courtCase.id]: !prev[courtCase.id]
                          }))
                        }
                        className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#b22204] text-[18px]">
                            storefront
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            Seller's Statement
                          </span>
                          {courtCase.sellerStatement.hasReplied ? (
                            isSellerExpanded && (
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">
                                Reviewed ✓
                              </span>
                            )
                          ) : (
                            <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-1.5 py-0.2 rounded">
                              Pending (48h)
                            </span>
                          )}
                        </div>
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                          {isSellerExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isSellerExpanded && (
                        <div className="p-3 bg-white space-y-2 border-t border-slate-100 animate-in fade-in duration-150">
                          {courtCase.sellerStatement.hasReplied ? (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-bold text-slate-800">
                                  {courtCase.sellerName}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {courtCase.sellerStatement.repliedDate || 'Verified Rebuttal'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                                {courtCase.sellerStatement.statement}
                              </p>
                            </div>
                          ) : (
                            /* When seller has not replied yet */
                            <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200 flex items-center gap-2.5 text-amber-900">
                              <span className="material-symbols-outlined text-amber-600 text-[22px] animate-pulse">
                                schedule
                              </span>
                              <div className="text-xs">
                                <p className="font-extrabold">Seller has been notified and has 48 hours to respond.</p>
                                <p className="text-[11px] text-amber-800 mt-0.5">
                                  Community members may still vote based on currently submitted evidence.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Voting Section */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-800 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#b22204]">how_to_vote</span>
                          Community Verdict
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {totalVotes.toLocaleString()} votes cast · 1 vote per user
                        </span>
                      </div>

                      {/* Locked state explanation if not both expanded */}
                      {!canVote && !hasVoted && (
                        <div className="bg-slate-100 p-2 rounded-lg text-[11px] text-slate-600 flex items-center gap-1.5 border border-slate-200">
                          <span className="material-symbols-outlined text-slate-500 text-[16px]">lock</span>
                          <span>
                            Expand and review <strong>both Buyer's Claim and Seller's Statement</strong> above to unlock voting.
                          </span>
                        </div>
                      )}

                      {/* Voting Buttons */}
                      {!hasVoted ? (
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <button
                            disabled={!canVote}
                            onClick={() => onVoteCourtCase(courtCase.id, 'buyerRight')}
                            className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                              canVote
                                ? 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 active:scale-95 shadow-xs cursor-pointer'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">verified_user</span>
                            <span>Buyer is right</span>
                          </button>

                          <button
                            disabled={!canVote}
                            onClick={() => onVoteCourtCase(courtCase.id, 'sellerRight')}
                            className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                              canVote
                                ? 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100 active:scale-95 shadow-xs cursor-pointer'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">store</span>
                            <span>Seller is right</span>
                          </button>

                          <button
                            disabled={!canVote}
                            onClick={() => onVoteCourtCase(courtCase.id, 'notEnoughInfo')}
                            className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                              canVote
                                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 active:scale-95 shadow-xs cursor-pointer'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">help_outline</span>
                            <span>Not enough info</span>
                          </button>
                        </div>
                      ) : (
                        /* Result Bar after user has voted */
                        <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between text-xs font-black text-slate-800">
                            <span className="flex items-center gap-1 text-emerald-700">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              Your Vote: {courtCase.userVote === 'buyerRight' ? 'Buyer is right' : courtCase.userVote === 'sellerRight' ? 'Seller is right' : 'Not enough information'}
                            </span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                              +10 Pts Earned!
                            </span>
                          </div>

                          {/* Multi-segment Progress Bar */}
                          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex shadow-inner">
                            <div
                              style={{ width: `${buyerPct}%` }}
                              className="bg-blue-500 h-full transition-all duration-700"
                              title={`Buyer: ${buyerPct}%`}
                            />
                            <div
                              style={{ width: `${sellerPct}%` }}
                              className="bg-orange-500 h-full transition-all duration-700"
                              title={`Seller: ${sellerPct}%`}
                            />
                            <div
                              style={{ width: `${notEnoughPct}%` }}
                              className="bg-slate-400 h-full transition-all duration-700"
                              title={`Not enough info: ${notEnoughPct}%`}
                            />
                          </div>

                          {/* Percentages row */}
                          <div className="grid grid-cols-3 gap-1 text-center text-[10px] font-bold pt-1">
                            <div className="text-blue-700 bg-blue-50/80 p-1 rounded">
                              Buyer: {buyerPct}% ({courtCase.votes.buyerRight})
                            </div>
                            <div className="text-orange-700 bg-orange-50/80 p-1 rounded">
                              Seller: {sellerPct}% ({courtCase.votes.sellerRight})
                            </div>
                            <div className="text-slate-700 bg-slate-100 p-1 rounded">
                              Uncertain: {notEnoughPct}% ({courtCase.votes.notEnoughInfo})
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Write Post Modal */}
      <WritePostModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmitPost={handlePostSubmit}
        defaultCategory={selectedCategory === 'All' ? 'Electronics' : selectedCategory}
      />
    </div>
  );
};
