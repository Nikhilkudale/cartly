import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, ShieldCheck, Box, Truck, ShieldAlert, BadgeCheck, Clock, CheckCircle2, ShoppingBag, Eye, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Status tracking phases
type OrderStatus = 'Ordered' | 'Processing' | 'Shipped' | 'Delivered';

export interface SavedOrder {
  id: number;
  date: string;
  items: {
    productId: number;
    title: string;
    brand: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  transactionId: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    pincode: string;
    street: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  status: OrderStatus;
  statusTimestamp: number; // system timestamp of order creation code
}

interface MyOrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: SavedOrder[];
  onUpdateOrderStatus: (orderId: number, status: OrderStatus) => void;
}

export default function MyOrdersDrawer({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus
}: MyOrdersDrawerProps) {
  const [ticks, setTicks] = useState(0);

  // Poll ticks to trigger dynamic timeline countdown updates in UI
  useEffect(() => {
    const interval = setInterval(() => {
      setTicks(t => t + 1);
    }, 5000); // refresh time benchmarks
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  // Render responsive status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'Ordered':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'Processing':
        return <Clock className="h-4 w-4 text-[#8B5CF6] animate-pulse" />;
      case 'Shipped':
        return <Truck className="h-4 w-4 text-cyan-400 animate-bounce" />;
      case 'Delivered':
        return <BadgeCheck className="h-4 w-4 text-[#D97706]" />;
    }
  };

  const getStatusStyle = (status: OrderStatus) => {
    switch(status) {
      case 'Ordered':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10';
      case 'Processing':
        return 'bg-violet-500/10 text-violet-400 border border-violet-500/10';
      case 'Shipped':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/10';
      case 'Delivered':
        return 'bg-amber-500/10 text-luxury-gold border border-luxury-gold/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Background scrim backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#070A13]/85 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#0D1220] border-l border-white/5 shadow-2xl flex flex-col h-full text-slate-200">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-luxury-gold/10 rounded-lg">
                <Box className="h-4.5 w-4.5 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-sm font-display font-extrabold tracking-wide text-white">My Orders Vault</h2>
                <p className="text-[10px] text-white/50 font-mono">Simulated database records active history</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body segment lists */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5 min-h-0 space-y-6">
            {orders.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5">
                  <ShoppingBag className="h-8 w-8 text-white/20 stroke-1" />
                </div>
                <h3 className="font-display font-medium text-white text-base mb-1">No Orders Logged</h3>
                <p className="text-white/45 text-xs max-w-xs leading-relaxed font-light mb-6">
                  Verify mock authorization contexts. Placed purchases will log transactions automatically right here.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white font-semibold text-xs transition-all cursor-pointer hover:bg-white/10"
                >
                  Explore boutique feed
                </button>
              </div>
            ) : (
              orders.map((order) => {
                // Calculate dynamic time progression benchmarks for visual timeline
                const secondsPassed = Math.floor((Date.now() - order.statusTimestamp) / 1000);
                
                // Timeline milestones mapping:
                // 0-15s -> Ordered
                // 15-35s -> Processing
                // 35-55s -> Shipped
                // >55s -> Delivered
                let currentProgression: OrderStatus = order.status;
                if (secondsPassed >= 55) {
                  currentProgression = 'Delivered';
                } else if (secondsPassed >= 35) {
                  currentProgression = 'Shipped';
                } else if (secondsPassed >= 15) {
                  currentProgression = 'Processing';
                } else {
                  currentProgression = 'Ordered';
                }

                const milestoneIndex = ['Ordered', 'Processing', 'Shipped', 'Delivered'].indexOf(currentProgression);

                return (
                  <div key={order.id} className="pt-6 first:pt-0 space-y-4">
                    {/* Order Meta Panel */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-white text-xs">Order #{order.id}</span>
                          <span className={`${getStatusStyle(currentProgression)} text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1`}>
                            {getStatusIcon(currentProgression)}
                            <span>{currentProgression}</span>
                          </span>
                        </div>
                        <span className="text-[9px] text-[#58647A] font-mono flex items-center gap-1 mt-0.5">
                          <Calendar className="h-3 w-3" /> {order.date}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-mono font-bold text-white">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                        <p className="text-[9px] text-white/30 font-mono">Invoice Committed</p>
                      </div>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="bg-[#070A12] border border-white/5 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center justify-between select-none">
                        <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-widest font-black flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> Logistic Dispatch Timeline
                        </span>
                        {currentProgression !== 'Delivered' ? (
                          <span className="text-[8px] font-mono text-emerald-400 animate-pulse">
                            Auto-Advancing Live ({55 - secondsPassed > 0 ? `${55 - secondsPassed}s left` : 'synced'})
                          </span>
                        ) : (
                          <span className="text-[8px] font-mono text-[#D97706] flex items-center gap-1 uppercase tracking-widest font-bold">
                            🔒 Fully Concluded
                          </span>
                        )}
                      </div>

                      {/* Timeline graphic tracks */}
                      <div className="relative pt-2 pb-6">
                        {/* Connecting track line background */}
                        <div className="absolute top-[18px] left-[15px] right-[15px] h-0.5 bg-[#1E293B]" />
                        {/* Progressive track line */}
                        <div 
                          className="absolute top-[18px] left-[15px] h-0.5 bg-gradient-to-r from-emerald-500 via-[#8B5CF6] to-[#D97706] transition-all duration-[1000ms]" 
                          style={{ width: `${(milestoneIndex / 3) * 100}%` }}
                        />

                        {/* Nodes */}
                        <div className="relative flex justify-between">
                          {['Ordered', 'Processing', 'Shipped', 'Delivered'].map((phase, idx) => {
                            const isPassed = idx <= milestoneIndex;
                            const isCurrent = idx === milestoneIndex;

                            return (
                              <div key={phase} className="flex flex-col items-center relative w-12 text-center pointer-events-auto">
                                <button
                                  onClick={() => onUpdateOrderStatus(order.id, phase as OrderStatus)}
                                  title={`Force override order status to: ${phase}`}
                                  className={`h-5 w-5 rounded-full flex items-center justify-center transition-all duration-500 z-10 border cursor-pointer ${
                                    isCurrent 
                                      ? 'bg-[#0D1221] border-luxury-gold scale-125' 
                                      : isPassed 
                                      ? 'bg-emerald-500 border-emerald-400 text-luxury-obsidian' 
                                      : 'bg-[#151B2A] border-[#27334F]'
                                  }`}
                                >
                                  {isCurrent ? (
                                    <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold animate-ping" />
                                  ) : isPassed ? (
                                    <Check className="h-3 w-3 stroke-[3]" />
                                  ) : (
                                    <span className="h-1 w-1 rounded-full bg-[#334155]" />
                                  )}
                                </button>
                                <span className={`absolute top-7 w-[64px] text-[8px] font-mono font-bold uppercase tracking-widest leading-none ${isCurrent ? 'text-luxury-gold font-extrabold scale-105' : isPassed ? 'text-slate-200' : 'text-slate-600'}`}>
                                  {phase}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Order details items display accordion */}
                    <div className="bg-white/[0.01] rounded-2xl border border-white/5 p-4 space-y-3">
                      <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Consigned Products Package</div>
                      <div className="space-y-2">
                        {order.items.map((it) => (
                          <div key={it.productId} className="flex gap-3 items-center text-xs justify-between">
                            <div className="flex gap-2.5 items-center min-w-0">
                              <img src={it.image} alt={it.title} referrerPolicy="no-referrer" className="h-8 w-8 object-contain bg-black/40 rounded p-0.5 border border-white/5 shrink-0" />
                              <div className="min-w-0">
                                <p className="text-white font-medium truncate max-w-[170px]">{it.title.replace(new RegExp(`^${it.brand}\\s*`, 'i'), '')}</p>
                                <p className="text-[9px] text-[#58647A] font-mono">Brand: {it.brand} &bull; Qty: {it.quantity}</p>
                              </div>
                            </div>
                            <span className="font-mono text-white/80">₹{(it.price * it.quantity).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping specifics detail drawer panel wrap */}
                    <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] space-y-1 text-white/50 leading-relaxed font-sans">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#22D3EE] font-extrabold mb-1.5 flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#22D3EE]" /> Shipping details profile
                      </p>
                      <p className="text-white font-semibold">Recipient: <span className="text-slate-300 font-normal">{order.shippingAddress.fullName}</span></p>
                      <p>Full Terminal Address: <span className="text-slate-300">{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</span></p>
                      <p>Settle Gate Method: <span className="text-white font-mono uppercase bg-white/5 px-2 py-0.5 border border-white/5 rounded text-[8px]">{order.paymentMethod}</span></p>
                      <p className="font-mono text-[9px] text-[#A1A1AA] pt-1">InnoDB Transaction Key: <span className="text-amber-400 font-bold select-all break-all">{order.transactionId}</span></p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
