import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface CameraSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CameraSearchModal: React.FC<CameraSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [analyzing, setAnalyzing] = useState(false);
  const [detectedProduct, setDetectedProduct] = useState<Product | null>(null);

  const simulateSnap = (product: Product) => {
    setAnalyzing(true);
    setDetectedProduct(null);
    setTimeout(() => {
      setAnalyzing(false);
      setDetectedProduct(product);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#1b1c1c] text-white flex flex-col justify-between shadow-2xl relative">
        {/* Header */}
        <div className="p-3 flex items-center justify-between border-b border-white/10">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold">Shopee Visual Search</h2>
            <p className="text-[10px] text-slate-400">Snap an item to find matching SG listings</p>
          </div>
          <div className="w-9" />
        </div>

        {/* Viewfinder */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="relative w-64 h-64 border-2 border-white/50 rounded-2xl flex items-center justify-center bg-black/40 overflow-hidden shadow-2xl">
            {/* Viewfinder borders */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#b22204]" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#b22204]" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#b22204]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#b22204]" />

            {analyzing ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-[#b22204] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-amber-300 font-bold">Analyzing image...</span>
              </div>
            ) : detectedProduct ? (
              <img
                src={detectedProduct.imageUrl}
                alt={detectedProduct.name}
                className="w-full h-full object-cover animate-in zoom-in-95"
              />
            ) : (
              <span className="material-symbols-outlined text-5xl text-white/30">
                photo_camera
              </span>
            )}
          </div>

          {detectedProduct ? (
            <div className="mt-4 bg-white text-slate-900 rounded-xl p-3 max-w-sm w-full shadow-xl flex items-center justify-between gap-3 animate-in fade-in">
              <div className="flex-1 min-w-0">
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  98% Visual Match
                </span>
                <h4 className="text-xs font-bold truncate mt-1">{detectedProduct.name}</h4>
                <p className="text-sm font-black text-[#b22204]">${detectedProduct.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => {
                  onSelectProduct(detectedProduct);
                  onClose();
                }}
                className="px-3 py-1.5 bg-[#b22204] text-white text-xs font-bold rounded-lg hover:bg-orange-700"
              >
                View Deal
              </button>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-300 mb-2 font-medium">
                Try scanning sample items below:
              </p>
              <div className="flex gap-2 justify-center">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => simulateSnap(p)}
                    className="flex flex-col items-center bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors border border-white/10"
                  >
                    <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded" />
                    <span className="text-[9px] text-slate-300 mt-1 max-w-[60px] truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
