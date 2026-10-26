import React, { useState, useEffect, useRef } from 'react';
import { Product, DiscussionPost } from '../types';
import { WritePostModal } from './WritePostModal';

interface ProductDiscussionTabProps {
  product: Product;
  discussions: DiscussionPost[];
  onVotePost: (postId: string, type: 'agree' | 'disagree') => void;
  onSubmitPost: (newPost: DiscussionPost) => void;
  onPostBecameHelpful: (postId: string) => void;
}

export const ProductDiscussionTab: React.FC<ProductDiscussionTabProps> = ({
  product,
  discussions,
  onVotePost,
  onSubmitPost,
  onPostBecameHelpful
}) => {
  const [filter, setFilter] = useState<'all' | 'disputes' | 'positive' | 'critical'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [recentlySubmittedId, setRecentlySubmittedId] = useState<string | null>(null);

  // Auto-increment Agree timer simulation for recently submitted post
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!recentlySubmittedId) return;

    // Find the target post
    const target = discussions.find((p) => p.id === recentlySubmittedId);
    if (!target) return;

    if (target.agreeCount < 10) {
      timerRef.current = setTimeout(() => {
        onVotePost(recentlySubmittedId, 'agree');
      }, 700);
    } else if (target.agreeCount >= 10 && !target.isHelpful) {
      onPostBecameHelpful(recentlySubmittedId);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [recentlySubmittedId, discussions, onVotePost, onPostBecameHelpful]);

  const handlePostSubmit = (newPost: DiscussionPost) => {
    onSubmitPost(newPost);
    setRecentlySubmittedId(newPost.id);
  };

  // Pinned Posts: most helpful positive and most helpful critical
  // Find highest agreeCount positive and critical posts
  const positivePosts = discussions.filter((p) => p.sentiment === 'positive');
  const criticalPosts = discussions.filter((p) => p.sentiment === 'critical');

  const topPositivePost = positivePosts.reduce<DiscussionPost | null>((prev, curr) => {
    if (!prev) return curr;
    return curr.agreeCount > prev.agreeCount ? curr : prev;
  }, null);

  const topCriticalPost = criticalPosts.reduce<DiscussionPost | null>((prev, curr) => {
    if (!prev) return curr;
    return curr.agreeCount > prev.agreeCount ? curr : prev;
  }, null);

  // Filtered discussions feed
  const filteredDiscussions = discussions.filter((post) => {
    if (filter === 'disputes') return !!post.isDispute;
    if (filter === 'positive') return post.sentiment === 'positive';
    if (filter === 'critical') return post.sentiment === 'critical';
    return true;
  });

  const disputesCount = discussions.filter((p) => p.isDispute).length;

  return (
    <div className="flex flex-col w-full bg-[#f5f3f3] space-y-3 pb-6">
      {/* Discussion Overview & Write CTA */}
      <div className="bg-white p-3.5 border-b border-slate-100 flex items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#b22204] text-[20px]">
              forum
            </span>
            <h3 className="text-sm font-extrabold text-[#1b1c1c]">Buyer Discussions</h3>
            <span className="bg-orange-100 text-[#b22204] text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {discussions.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Real SG buyer experiences, questions, and verified seller answers
          </p>
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="bg-[#b22204] hover:bg-orange-700 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">rate_review</span>
          <span>Write a post</span>
        </button>
      </div>

      {/* Side-by-Side Pinned Spotlight: Top Positive vs Top Critical */}
      {(topPositivePost || topCriticalPost) && (
        <div className="px-3 pt-1">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-orange-200/80 rounded-2xl p-3 shadow-xs">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-orange-200/50">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#b22204] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">push_pin</span>
                Community Pinned Highlights
              </span>
              <span className="text-[10px] text-slate-500">
                Most helpful positive vs critical
              </span>
            </div>

            {/* Side-by-side grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Top Positive Card */}
              {topPositivePost && (
                <div className="bg-white rounded-xl p-3 border-l-4 border-l-emerald-500 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">thumb_up</span>
                        Top Positive ({topPositivePost.agreeCount} Agrees)
                      </span>
                      {topPositivePost.agreeCount >= 10 && (
                        <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">verified</span>
                          Helpful
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 mb-1">
                      <span>{topPositivePost.authorAvatar || '👤'}</span>
                      <span className="truncate">{topPositivePost.authorName}</span>
                    </div>
                    <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed">
                      "{topPositivePost.content}"
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="text-emerald-600 font-semibold truncate">
                      ✓ {topPositivePost.answers.wouldBuyAgain}
                    </span>
                    <button
                      onClick={() => onVotePost(topPositivePost.id, 'agree')}
                      className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded transition-colors ${
                        topPositivePost.userVoted === 'agree'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span>👍</span>
                      <span>{topPositivePost.agreeCount}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Top Critical Card */}
              {topCriticalPost && (
                <div className="bg-white rounded-xl p-3 border-l-4 border-l-orange-500 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="bg-orange-50 text-orange-700 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">warning</span>
                        Top Critical ({topCriticalPost.agreeCount} Agrees)
                      </span>
                      {topCriticalPost.agreeCount >= 10 && (
                        <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">verified</span>
                          Helpful
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 mb-1">
                      <span>{topCriticalPost.authorAvatar || '👤'}</span>
                      <span className="truncate">{topCriticalPost.authorName}</span>
                    </div>
                    <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed">
                      "{topCriticalPost.content}"
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="text-orange-600 font-semibold truncate">
                      ⚠️ {topCriticalPost.answers.qualitySize}
                    </span>
                    <button
                      onClick={() => onVotePost(topCriticalPost.id, 'agree')}
                      className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded transition-colors ${
                        topCriticalPost.userVoted === 'agree'
                          ? 'bg-orange-100 text-orange-700'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span>👍</span>
                      <span>{topCriticalPost.agreeCount}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Chips Bar */}
      <div className="px-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              filter === 'all'
                ? 'bg-[#b22204] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All ({discussions.length})
          </button>

          {/* Disputes filter */}
          <button
            onClick={() => setFilter('disputes')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all shadow-xs ${
              filter === 'disputes'
                ? 'bg-[#bb0017] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] text-amber-500">gavel</span>
            <span>Disputes ({disputesCount})</span>
          </button>

          <button
            onClick={() => setFilter('positive')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              filter === 'positive'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Positive ({positivePosts.length})
          </button>

          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              filter === 'critical'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Critical ({criticalPosts.length})
          </button>
        </div>
      </div>

      {/* Discussion Posts Feed */}
      <div className="px-3 space-y-3">
        {filteredDiscussions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 shadow-xs border border-slate-100">
            <span className="material-symbols-outlined text-4xl text-slate-300">chat_bubble_outline</span>
            <p className="text-xs font-bold text-slate-700 mt-2">No posts found in this filter</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Try selecting "All" or write the first post!</p>
          </div>
        ) : (
          filteredDiscussions.map((post) => {
            const isHelpfulPost = post.agreeCount >= 10;
            const isTargetLive = recentlySubmittedId === post.id && post.agreeCount < 10;

            return (
              <div
                key={post.id}
                className={`bg-white rounded-2xl p-3.5 shadow-xs border transition-all ${
                  post.isCurrentUser
                    ? 'border-[#b22204]/40 bg-orange-50/20 ring-1 ring-[#b22204]/20'
                    : 'border-slate-100'
                }`}
              >
                {/* Author & Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center text-base shrink-0 shadow-xs">
                      {post.authorAvatar || '👤'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{post.authorName}</span>
                        {post.isCurrentUser && (
                          <span className="bg-[#b22204] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
                            Your Post
                          </span>
                        )}
                        {/* Rating Stars */}
                        <div className="flex text-amber-400 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`material-symbols-outlined text-[13px] ${
                                i < post.rating ? 'fill-current' : 'text-slate-200'
                              }`}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{post.date}</span>
                    </div>
                  </div>

                  {/* Badges: Helpful & Dispute */}
                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    {isHelpfulPost && (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs animate-in zoom-in-95">
                        <span className="material-symbols-outlined text-[12px] text-amber-600">
                          verified
                        </span>
                        Helpful ({post.agreeCount}+ Agrees)
                      </span>
                    )}

                    {post.isDispute && (
                      <span className="bg-red-50 text-red-700 border border-red-200 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">gavel</span>
                        Dispute
                      </span>
                    )}
                  </div>
                </div>

                {/* Live Agree Voting Animation Indicator */}
                {isTargetLive && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-2 text-[10px] font-bold flex items-center justify-between animate-pulse">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-amber-600 animate-spin">
                        sync
                      </span>
                      Community members are reviewing your post...
                    </span>
                    <span className="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded tabular-nums font-mono">
                      {post.agreeCount} / 10 Agrees
                    </span>
                  </div>
                )}

                {/* Guided Questions Summary Pills */}
                {post.answers && (
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1 text-[10px] bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <div className="truncate">
                      <span className="text-slate-400">Match: </span>
                      <span className="font-semibold text-slate-800">{post.answers.matchedDescription}</span>
                    </div>
                    <div className="truncate">
                      <span className="text-slate-400">Quality: </span>
                      <span className="font-semibold text-slate-800">{post.answers.qualitySize}</span>
                    </div>
                    <div className="truncate">
                      <span className="text-slate-400">Buy Again: </span>
                      <span className="font-semibold text-slate-800">{post.answers.wouldBuyAgain}</span>
                    </div>
                  </div>
                )}

                {/* Main Post Text Content */}
                <p className="mt-2.5 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Official Public Seller Reply (if any) */}
                {post.sellerReply && (
                  <div className="mt-3 bg-orange-50/70 border border-orange-200/60 rounded-xl p-2.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-[#b22204] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">storefront</span>
                        {post.sellerReply.sellerName}
                        {post.sellerReply.verified && (
                          <span className="material-symbols-outlined text-[12px] text-blue-600">verified</span>
                        )}
                        <span className="text-[9px] bg-[#bb0017] text-white px-1 rounded uppercase font-bold ml-1">
                          Official Reply
                        </span>
                      </span>
                      <span className="text-slate-400">{post.sellerReply.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      {post.sellerReply.content}
                    </p>
                  </div>
                )}

                {/* Agree / Disagree Actions Bottom Row */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Was this discussion helpful?
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Agree Button */}
                    <button
                      onClick={() => onVotePost(post.id, 'agree')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        post.userVoted === 'agree'
                          ? 'bg-emerald-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                      aria-label="Agree with post"
                    >
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      <span>Agree</span>
                      <span className="tabular-nums font-mono text-[11px] ml-0.5">
                        {post.agreeCount}
                      </span>
                    </button>

                    {/* Disagree Button */}
                    <button
                      onClick={() => onVotePost(post.id, 'disagree')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        post.userVoted === 'disagree'
                          ? 'bg-rose-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700'
                      }`}
                      aria-label="Disagree with post"
                    >
                      <span className="material-symbols-outlined text-[14px]">thumb_down</span>
                      <span>Disagree</span>
                      <span className="tabular-nums font-mono text-[11px] ml-0.5">
                        {post.disagreeCount}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Guided Write Post Modal */}
      <WritePostModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        productId={product.id}
        productName={product.name}
        onSubmitPost={handlePostSubmit}
      />
    </div>
  );
};
