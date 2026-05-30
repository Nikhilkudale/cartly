import React from 'react';
import { Star, ShoppingCart, Sparkles, AlertCircle, Heart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: number;
  product: Product;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  isSaved?: boolean;
  onToggleSaved?: (p: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
  onBuyNow,
  isSaved = false,
  onToggleSaved
}: ProductCardProps) {
  // Brand name parser
  const displayName = product.title.replace(new RegExp(`^${product.brand}\\s*`, 'i'), '');

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="glass-card flex flex-col rounded-2xl overflow-hidden group h-full relative cursor-pointer"
    >
      {/* Product Image Stage with smooth zoom micro-interaction */}
      <div className="w-full h-56 bg-slate-950/40 relative overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
        <div className="w-full h-full flex items-center justify-center relative transition-transform duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105">
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all duration-300"
          />
        </div>

        {/* Wishlist Heart Icon floating at top-left */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleSaved) {
                onToggleSaved(product);
              }
            }}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
              isSaved
                ? 'bg-rose-500/20 border-rose-500/30 text-rose-400'
                : 'bg-[#000000]/40 border-white/10 hover:border-white/20 text-white/60 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current text-rose-500' : ''}`} />
          </motion.button>
        </div>

        {/* Premium Gold Accented Badge */}
        {product.rating >= 4.4 && (
          <div className="absolute top-3.5 right-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-luxury-obsidian font-display font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-lg">
            Curated
          </div>
        )}

        {/* Dynamic stock alert */}
        {product.stock <= 5 && (
          <div className="absolute bottom-3 left-3 bg-red-950/80 text-rose-300 px-2 py-1 rounded-full text-[9px] font-mono font-medium border border-red-800/20 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-rose-400 animate-pulse" />
            <span>{product.stock} units left</span>
          </div>
        )}
      </div>

      {/* Content Details Segment */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Brand label */}
        <p className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest mb-1.5 font-mono select-none">
          {product.brand}
        </p>

        {/* Product title heading */}
        <h3 className="font-display font-medium text-slate-100 text-sm leading-snug tracking-normal mb-2 line-clamp-2 min-h-[40px] group-hover:text-luxury-gold transition-colors duration-300">
          {displayName}
        </h3>

        {/* Ratings Review System */}
        <div className="flex items-center gap-2 mb-4 select-none">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {product.rating} &bull; ({product.reviewsCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Financial Price Segments */}
        <div className="flex items-center gap-2.5 mb-5 mt-auto">
          <span className="text-sm font-sans font-extrabold text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-550 line-through font-light">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* CTA Actions */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="grid grid-cols-2 gap-2 text-xs"
        >
          <button
            onClick={() => onAddToCart(product)}
            className="py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 hover:bg-white/5 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Collect</span>
          </button>
          
          <button
            onClick={() => onBuyNow(product)}
            className="py-2.5 rounded-xl bg-gold-gradient text-luxury-obsidian font-display font-extrabold transition-all duration-300 hover:opacity-90 active:scale-95 shadow-md hover:shadow-luxury-gold/10 cursor-pointer text-center tracking-wide text-[10px] uppercase font-black"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
