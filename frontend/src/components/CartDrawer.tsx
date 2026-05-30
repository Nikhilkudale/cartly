import React from 'react';
import { X, Trash2, ShieldCheck, ShoppingCart, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: number, qty: number) => void;
  onCheckout: () => void;
  isOrdering: boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onCheckout,
  isOrdering
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalOriginal = cartItems.reduce((total, item) => total + (item.product.originalPrice * item.quantity), 0);
  const totalDiscounted = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const savings = totalOriginal - totalDiscounted;
  const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Background scrim backdrop overlay with blur */}
      <div 
        className="absolute inset-0 bg-[#070A13]/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D1220] border-l border-white/5 shadow-2xl flex flex-col h-full text-slate-200">
          
          {/* Header section with sophisticated design */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-luxury-gold/10 rounded-lg">
                <ShoppingBag className="h-4.5 w-4.5 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-sm font-display font-extrabold tracking-wide text-white">Your Cart</h2>
                <p className="text-[10px] text-white/50 font-mono">{itemsCount} curated unit{itemsCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5 min-h-0">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center select-none">
                <div className="p-4 bg-white/5 rounded-full mb-4">
                  <ShoppingCart className="h-8 w-8 text-white/20 stroke-1" />
                </div>
                <h3 className="font-display font-medium text-white text-sm mb-1">Your Cart is Empty</h3>
                <p className="text-white/45 text-xs max-w-xs mb-8 font-light leading-relaxed">
                  Collect products from our boutique gallery to test the real-time MySQL JPA logging engine.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  {/* Photo stage with deep backdrop */}
                  <div className="h-20 w-16 bg-slate-950/50 border border-white/5 rounded-lg p-2 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-110"
                    />
                  </div>

                  {/* Descriptions block */}
                  <div className="flex-1 flex flex-col min-w-0 justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white truncate hover:text-luxury-gold transition-colors duration-300 font-sans cursor-pointer">
                        {item.product.title.replace(new RegExp(`^${item.product.brand}\\s*`, 'i'), '')}
                      </h4>
                      <p className="text-[9px] text-luxury-gold font-mono uppercase tracking-widest mt-0.5">{item.product.brand}</p>
                    </div>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-xs font-bold text-white font-sans">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-[10px] text-white/30 line-through">
                          ₹{item.product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => onUpdateQty(item.product.id, 0)}
                      className="p-1 rounded text-white/30 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-center border border-white/10 rounded-full bg-black/25 overflow-hidden mt-2">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-0.5 text-white/50 text-xs font-black transition-colors hover:bg-white/5 cursor-pointer"
                        title="Reduce quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-[10px] font-bold text-white font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-0.5 text-white/50 text-xs font-black transition-colors hover:bg-white/5 cursor-pointer"
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pricing Ledger Spreadsheet */}
          {cartItems.length > 0 && (
            <div className="border-t border-white/5 bg-black/20 p-6 space-y-4 shrink-0">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#22D3EE] font-mono">Ledger Metrics</h3>
              
              <div className="space-y-2 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>Subtotal ({itemsCount} items)</span>
                  <span className="font-mono text-white">₹{totalOriginal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Boutique Savings</span>
                  <span className="text-[#34D399] font-mono">- ₹{savings.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Curated Delivery</span>
                  <span className="text-[#34D399]">COMPLIMENTARY</span>
                </div>

                <div className="pt-3 border-t border-white/5 flex justify-between font-bold text-sm text-slate-200">
                  <span className="font-display">Total Receivable</span>
                  <span className="font-mono text-sm text-white text-gold-gradient">₹{totalDiscounted.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Secure assurance text */}
              <div className="flex items-center gap-1.5 text-[9px] text-white/30 justify-center py-2 border-t border-white/5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/75" />
                <span>Encrypted secure transit &bull; MySQL ACID transaction persistent</span>
              </div>

              {/* CHECKOUT TRIGGERS */}
              <button
                onClick={onCheckout}
                disabled={isOrdering}
                className="w-full py-3 rounded-xl bg-gold-gradient hover:opacity-95 text-luxury-obsidian font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-luxury-gold/5 transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
              >
                {isOrdering ? (
                  <>
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-luxury-obsidian border-t-transparent animate-spin" />
                    <span className="font-mono">JPA Transaction Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
