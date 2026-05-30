import React from 'react';
import { X, Heart, ShoppingCart, Trash2, Tag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SavedItemsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onRemoveFromSaved: (id: number) => void;
  onMoveToCart: (product: Product) => void;
}

export default function SavedItemsDrawer({
  isOpen,
  onClose,
  savedProducts,
  onRemoveFromSaved,
  onMoveToCart
}: SavedItemsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Background overlay scrim */}
      <div 
        className="absolute inset-0 bg-[#070A13]/85 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#0D1220] border-l border-white/5 shadow-2xl flex flex-col h-full text-slate-200">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <Heart className="h-4.5 w-4.5 text-rose-400 fill-rose-500/20" />
              </div>
              <div>
                <h2 className="text-sm font-display font-extrabold tracking-wide text-white">Saved Curations</h2>
                <p className="text-[10px] text-white/50 font-mono">{savedProducts.length} items reserved</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List items block */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5 min-h-0">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center select-none">
                <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5">
                  <Heart className="h-8 w-8 text-white/20 stroke-1" />
                </div>
                <h3 className="font-display font-medium text-white text-sm mb-1 font-sans">Wishlist Empty</h3>
                <p className="text-white/45 text-xs max-w-xs mb-8 leading-relaxed font-light">
                  Hold premium curations in backup index without occupying allocations in your transaction cart.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-[10px] uppercase tracking-wider font-mono transition-all cursor-pointer"
                >
                  Explore boutique
                </button>
              </div>
            ) : (
              savedProducts.map((p) => (
                <div key={p.id} className="py-4.5 flex gap-4 first:pt-0 last:pb-0">
                  {/* Photo Thumbnail */}
                  <div className="h-16 w-14 bg-slate-950/50 border border-white/5 rounded-lg p-2.5 flex items-center justify-center shrink-0">
                    <img
                      src={p.image}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-110"
                    />
                  </div>

                  {/* Middle Description */}
                  <div className="flex-1 flex flex-col min-w-0 justify-between">
                    <div>
                      <h4 className="text-[11px] font-semibold text-white truncate hover:text-luxury-gold transition-colors duration-300 font-sans cursor-pointer">
                        {p.title.replace(new RegExp(`^${p.brand}\\s*`, 'i'), '')}
                      </h4>
                      <p className="text-[9px] text-luxury-gold font-mono uppercase tracking-widest mt-0.5">{p.brand}</p>
                    </div>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs font-bold text-white font-sans">
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                      {p.originalPrice > p.price && (
                        <span className="text-[10px] text-white/30 truncate line-through">
                          ₹{p.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Cart and Delete Interactions */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => onRemoveFromSaved(p.id)}
                      className="p-1 rounded text-white/30 hover:text-rose-400 hover:bg-white/5 transition-all cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => onMoveToCart(p)}
                      className="p-1.5 rounded-full bg-luxury-gold/5 border border-luxury-gold/25 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-obsidian transition-all cursor-pointer"
                      title="Move directly to Cart"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Secure assure tagline */}
          <div className="border-t border-white/5 bg-black/20 p-4 shrink-0 text-center text-[10px] text-white/30 flex items-center gap-1.5 justify-center">
            <Tag className="h-3.5 w-3.5 text-[#22D3EE]" />
            <span>Reserved items persist across login state</span>
          </div>

        </div>
      </div>
    </div>
  );
}
