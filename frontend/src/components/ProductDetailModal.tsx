import React from 'react';
import { X, Star, Sparkles, AlertCircle, ShoppingCart, KeyRound, Shield } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  relatedProducts?: Product[];
  onSelectRelated?: (p: Product) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  relatedProducts = [],
  onSelectRelated
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans flex items-center justify-center p-4">
      {/* Immersive blur backdrop scrim overlay */}
      <div 
        className="absolute inset-0 bg-[#070A13]/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Main glassmorphic center modal card */}
      <div 
        id="product-detail-scroll-container"
        className="bg-[#0D1221] text-slate-100 rounded-3xl border border-white/10 shadow-2xl relative max-w-3xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh] flex flex-col gap-6 transform transition-all z-10"
      >
        
        {/* Close Button with premium circle border */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer z-20"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Top Content: Columns wrapper */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left pane: Display stage and Actions */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full h-72 md:h-80 bg-slate-950/40 border border-white/5 rounded-2xl p-5 flex items-center justify-center mb-6 relative">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter brightness-105 duration-500 hover:scale-103"
              />
              {product.rating >= 4.5 && (
                <span className="absolute top-3 left-3 bg-gold-gradient text-luxury-obsidian text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-md font-mono">
                  Boutique Curated
                </span>
              )}
            </div>

            {/* Luxury CTA panel */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 text-white hover:bg-white/5 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4 text-white/70" />
                <span>Collect Item</span>
              </button>
              <button
                onClick={() => {
                  onBuyNow(product);
                  onClose();
                }}
                className="py-3 px-4 rounded-xl bg-gold-gradient text-luxury-obsidian hover:opacity-90 font-display font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-luxury-gold/5 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-luxury-obsidian fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Right pane: Specific lists and entity mapping */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold mb-1 font-mono">{product.brand}</p>
              <h2 className="text-lg md:text-xl font-display font-extrabold text-white leading-snug mb-3.5">
                {product.title}
              </h2>

              {/* Ratings segment */}
              <div className="flex items-center gap-2 mb-4 select-none">
                <div className="flex bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full items-center gap-1">
                  <span className="text-[10px] font-bold text-amber-400">{product.rating}</span>
                  <Star className="h-2.5 w-2.5 text-amber-400 fill-current" />
                </div>
                <span className="text-xs text-white/50 font-mono">
                  {product.reviewsCount.toLocaleString()} real active sessions review
                </span>
              </div>

              {/* Price section with glowing elements */}
              <div className="flex items-baseline gap-2.5 mb-5 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <span className="text-lg font-extrabold text-white">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xs text-white/30 line-through font-light font-mono">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-widest ml-auto">
                      {product.discount}% Off Applied
                    </span>
                  </>
                )}
              </div>

              {/* Elegant Spring Boot Entity Diagnostic Card */}
              <div className="mb-5 bg-slate-950/75 text-white/70 p-3.5 rounded-xl border border-white/5 text-[9px] font-mono leading-relaxed select-none space-y-1">
                <div className="text-luxury-gold font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <KeyRound className="h-3 w-3 text-luxury-gold" />
                  <span>Spring MVC Hibernate Mapping</span>
                </div>
                <div className="text-[#8B5CF6] font-semibold font-mono">@Entity @Table(name = "products")</div>
                <div>Primary key &bull; <span className="text-white">id: Long = {product.id}</span></div>
                <div>Database sync &bull; <span className="text-[#34D399]">stock: Integer = {product.stock} units</span></div>
                <div>BigDecimal Price &bull; <span className="text-[#06B6D4]">price: value = {product.price}</span></div>
              </div>

              {/* Specifications summary */}
              {Object.keys(product.specifications).length > 0 && (
                <div className="mb-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#22D3EE] font-mono mb-2">Specifications Panel</h4>
                  <div className="border border-white/5 rounded-xl overflow-hidden text-xs">
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex py-2.5 px-3.5 ${
                          idx % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
                        } border-b border-white/5 last:border-b-0`}
                      >
                        <span className="w-1/3 text-white/50 font-medium shrink-0 font-sans">{key}</span>
                        <span className="w-2/3 text-white leading-snug font-sans pl-2.5">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description line summary */}
            {product.description && (
              <div className="text-xs text-white/45 leading-relaxed bg-black/10 p-3 rounded-xl border border-white/5">
                <h4 className="font-bold text-white/70 mb-1">Descriptor</h4>
                <p className="font-light">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Related Masterpieces Container */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="w-full mt-4 pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-luxury-gold">
                <Sparkles className="h-3.5 w-3.5 fill-current text-luxury-gold animate-pulse" />
                <h3 className="text-[10px] font-extrabold uppercase tracking-widest font-mono">
                  More Masterpieces from {product.category}
                </h3>
              </div>
              <span className="text-[9px] text-white/30 font-mono uppercase tracking-wider">
                CURATED IN-STOCK ({relatedProducts.length})
              </span>
            </div>

            {/* Horizontally scrolling tray of beautiful item cards */}
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 -mx-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  onClick={() => {
                    if (onSelectRelated) {
                      onSelectRelated(related);
                      // Smoothly auto-scroll modal container back to the top!
                      const modalContainer = document.getElementById('product-detail-scroll-container');
                      if (modalContainer) {
                        modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  }}
                  className="w-44 shrink-0 bg-[#111625]/40 hover:bg-[#111625]/80 border border-white/5 hover:border-luxury-gold/30 rounded-2xl p-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="h-28 bg-slate-950/30 border border-white/5 rounded-xl flex items-center justify-center p-2 mb-2 w-full relative overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter brightness-105 duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/60 border border-white/10 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-amber-400 font-mono select-none">
                      <span>{related.rating}</span>
                      <Star className="h-2 w-2 text-amber-400 fill-current" />
                    </div>
                  </div>

                  <p className="text-[8px] font-mono text-luxury-gold uppercase tracking-widest font-bold truncate mb-0.5">{related.brand}</p>
                  <h4 className="text-[11px] text-white/70 group-hover:text-white font-sans font-medium line-clamp-1 mb-1.5">
                    {related.title.replace(new RegExp('^' + related.brand + '\\s*', 'i'), '')}
                  </h4>
                  <p className="text-xs font-bold text-white font-sans">
                    ₹{related.price.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
