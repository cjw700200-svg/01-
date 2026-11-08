import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCamera: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenCamera
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'UGREEN GaN Charger',
    'Sony headphones',
    'Laksa cup noodles'
  ]);

  const trendingKeywords = [
    'UGREEN 65W GaN',
    'Sony WH-1000XM5',
    'Air Fryer paper',
    'Xiaomi Smart Band',
    'Logitech MX Master',
    'Dyson Supersonic',
    'Nissin Laksa',
    'Thermal Tumbler 500ml'
  ];

  const searchResults = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSearchClick = (keyword: string) => {
    setQuery(keyword);
    if (!recentSearches.includes(keyword)) {
      setRecentSearches((prev) => [keyword, ...prev.slice(0, 4)]);
    }
  };

  const handleProductClick = (product: Product) => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches((prev) => [query.trim(), ...prev.slice(0, 4)]);
    }
    onSelectProduct(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#f5f3f3] flex flex-col justify-start shadow-2xl">
        {/* Search Header */}
        <div className="bg-[#b22204] p-3 flex items-center gap-2 text-white">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/20"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>

          <div className="flex-1 flex items-center h-10 bg-white text-[#1b1c1c] rounded-full px-3 gap-2">
            <span className="material-symbols-outlined text-[#b22204] text-[20px]">search</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, or deals..."
              className="flex-1 text-xs text-[#1b1c1c] placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {query ? (
              <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenCamera();
                }}
                className="text-slate-500 hover:text-[#b22204]"
                title="Camera search"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </button>
            )}
          </div>

          <button
            onClick={() => query && handleSearchClick(query)}
            className="text-xs font-bold text-white px-2 py-1 rounded"
          >
            Search
          </button>
        </div>

        {/* Results or Discovery Sections */}
        <div className="flex-1 overflow-y-auto p-3 no-scrollbar space-y-4">
          {query.trim() ? (
            /* Live Search Results */
            <div>
              <p className="text-xs font-bold text-slate-500 mb-2">
                Found {searchResults.length} results for "{query}":
              </p>
              {searchResults.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-slate-500 shadow-xs">
                  <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
                  <p className="text-xs font-bold text-slate-700 mt-2">No matching products found</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Try searching "charger", "Sony", or "noodles"</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="bg-white rounded-xl p-2.5 shadow-xs flex items-center gap-3 cursor-pointer hover:bg-slate-50 border border-slate-100"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          {product.badge && (
                            <span className="bg-[#bb0017] text-white text-[8px] font-bold px-1 rounded">
                              {product.badge}
                            </span>
                          )}
                          <h4 className="text-xs font-medium text-[#1b1c1c] truncate">
                            {product.name}
                          </h4>
                        </div>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-sm font-extrabold text-[#b22204] tabular-nums">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through tabular-nums">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Recent Searches & Trending */
            <>
              {recentSearches.length > 0 && (
                <div className="bg-white rounded-xl p-3 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#1b1c1c]">Recent Searches</span>
                    <button
                      onClick={() => setRecentSearches([])}
                      className="text-[11px] text-slate-400 hover:text-red-500"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchClick(item)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px] text-slate-400">history</span>
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div className="bg-white rounded-xl p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#b22204] mb-2.5">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span>Trending on Shopee SG</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {trendingKeywords.map((kw, idx) => (
                    <button
                      key={kw}
                      onClick={() => handleSearchClick(kw)}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-orange-50 border border-slate-100 text-left transition-colors"
                    >
                      <span className={`text-[10px] font-black w-4 text-center ${
                        idx < 3 ? 'text-[#b22204]' : 'text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-800 truncate">
                        {kw}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
