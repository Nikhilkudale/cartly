import React, { useState } from 'react';
import { Search, ShoppingCart, Terminal, Shield, LogOut, Key, Sparkles, User, Badge, Heart, Box, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnyxHeaderProps {
  onSearch: (query: string) => void;
  searchVal: string;
  cartCount: number;
  onOpenCart: () => void;
  isSandboxOpen: boolean;
  onToggleSandbox: () => void;
  sandboxActiveTab: 'terminal' | 'database' | 'code';
  setSandboxActiveTab: (tab: 'terminal' | 'database' | 'code') => void;
  currentUser: { id?: number; username: string; email: string; role: 'CUSTOMER' | 'ADMIN'; token?: string; fullName: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenOrders: () => void;
}

export default function OnyxHeader({
  onSearch,
  searchVal,
  cartCount,
  onOpenCart,
  isSandboxOpen,
  onToggleSandbox,
  sandboxActiveTab,
  setSandboxActiveTab,
  currentUser,
  onOpenLogin,
  onLogout,
  savedCount,
  onOpenSaved,
  onOpenOrders
}: OnyxHeaderProps) {
  const [isHoveredUser, setIsHoveredUser] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav shadow-lg transition-all border-b border-white/5 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Mobile Quick Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-8 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <div className="relative group">
              <span className="font-display font-extrabold text-2xl tracking-normal text-white">
                C<span className="text-luxury-gold text-gold-gradient">A</span>RTLY
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-gradient transition-all duration-300 group-hover:w-full" />
            </div>
            <span className="text-[9px] uppercase tracking-widest bg-white/5 text-white/50 border border-white/10 px-2 py-0.5 rounded-full font-mono">
              Luxe
            </span>
          </div>

          {/* Quick triggers for mobile/tablet responsive layout */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onOpenSaved}
              className="relative p-2 bg-white/5 hover:bg-white/10 text-rose-400 rounded-full cursor-pointer transition-all border border-white/5"
            >
              <Heart className={`h-4 w-4 ${savedCount > 0 ? 'fill-current' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-505 bg-rose-600 text-white font-mono text-[8.5px] h-4 w-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenOrders}
              className="p-2 bg-white/5 hover:bg-white/10 text-cyan-400 rounded-full cursor-pointer transition-all border border-white/5"
              title="My Orders Vault"
            >
              <Box className="h-4 w-4" />
            </button>

            {currentUser ? (
              <button
                onClick={onLogout}
                className="px-2 py-1 bg-rose-950/80 hover:bg-rose-900/90 text-rose-300 font-mono text-[10px] rounded border border-rose-800/40 flex items-center gap-1 cursor-pointer transition-all"
              >
                <LogOut className="h-3 w-3" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-2.5 py-1 bg-white hover:bg-slate-50 text-luxury-obsidian font-sans font-semibold text-xs rounded shadow transition-all cursor-pointer"
              >
                Login
              </button>
            )}
            
            {!import.meta.env.PROD && (
              <button
                onClick={onToggleSandbox}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  isSandboxOpen ? 'bg-luxury-gold/20 text-luxury-gold' : 'bg-white/5 text-white/70'
                }`}
              >
                <Terminal className="h-4.5 w-4.5" />
              </button>
            )}

            <button onClick={onOpenCart} className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 text-white cursor-pointer transition-all">
              <ShoppingCart className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-gradient text-luxury-obsidian font-display font-extrabold text-[9px] h-4.5 w-4.5 rounded-full flex items-center justify-center border border-luxury-obsidian">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Minimal Search Input - elegant floating appearance */}
        <div className="w-full md:max-w-md lg:max-w-lg relative flex items-center">
          <div className="absolute left-3.5 text-white/40 pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search our luxury collections..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-luxury-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-luxury-gold/20 transition-all font-sans placeholder:text-white/35"
          />
        </div>

        {/* Action controls items for Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0 select-none">
          
          {/* USER CONTEXT POPUP TRIGGER */}
          {currentUser ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsHoveredUser(true)}
              onMouseLeave={() => setIsHoveredUser(false)}
            >
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-sans font-medium text-xs px-3.5 py-2 rounded-full border border-white/10 transition-all cursor-pointer">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[90px] truncate">{currentUser.fullName}</span>
                <span className={`text-[9px] font-mono rounded px-1.5 py-0.2 uppercase font-extrabold tracking-wider ${
                  currentUser.role === 'ADMIN' ? 'bg-luxury-gold text-luxury-obsidian' : 'bg-luxury-violet text-white'
                }`}>
                  {currentUser.role}
                </span>
              </button>
              
              {/* Luxury context popover content */}
              <AnimatePresence>
                {isHoveredUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 bg-[#111622] rounded-xl border border-white/10 text-slate-200 shadow-2xl overflow-hidden font-sans z-50 backdrop-blur-xl"
                  >
                    <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-luxury-gold mb-1 flex items-center gap-1">
                        <User className="h-3 w-3" /> Account Profile
                      </p>
                      <p className="text-xs font-semibold text-white">{currentUser.fullName}</p>
                      <p className="text-[10px] text-white/50 font-mono truncate">{currentUser.email}</p>
                    </div>
                    
                    <div className="px-4 py-3.5 border-b border-white/5 bg-black/30 text-slate-400 text-[10px] space-y-2 select-none">
                      <div className="flex items-center justify-between">
                        <span>Account Status</span>
                        <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Connection</span>
                        <span className="text-luxury-gold font-mono font-medium flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-luxury-gold" />
                          Encrypted
                        </span>
                      </div>
                    </div>

                    <div className="p-2 gap-1 flex flex-col bg-[#151B2A] border-b border-white/5">
                      <button
                        onClick={onOpenOrders}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer border border-transparent hover:border-white/5"
                      >
                        <Box className="h-3.5 w-3.5 text-cyan-400" />
                        <span>My Orders Vault</span>
                      </button>
                    </div>

                    <div className="p-1 bg-[#151B2A]">
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 text-xs text-rose-450 hover:text-rose-400 hover:bg-rose-950/10 rounded-lg font-sans font-semibold transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>Sign Out</span>
                        <LogOut className="h-3.5 w-3.5 text-rose-400" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-5 py-2 bg-white hover:bg-zinc-150 text-luxury-obsidian font-sans font-bold text-xs rounded-full shadow transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Saved Items Link with real-time badges */}
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 text-xs font-sans font-bold text-white hover:text-rose-400 py-1 cursor-pointer transition-colors group"
          >
            <Heart className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-white/70'}`} />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="bg-rose-600 text-white font-mono text-[9px] h-4.5 w-4.5 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Orders Tracking Link */}
          <button
            onClick={onOpenOrders}
            className="flex items-center gap-1.5 text-xs font-sans font-bold text-white/80 hover:text-cyan-400 py-1 cursor-pointer transition-colors group"
          >
            <Box className="h-4 w-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span>My Orders</span>
          </button>

          {/* Cart triggers with animated bounce */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 text-xs font-sans font-bold text-white hover:text-luxury-gold py-1 cursor-pointer transition-colors group"
          >
            <div className="relative">
              <ShoppingCart className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-gradient text-luxury-obsidian font-display font-extrabold text-[9px] h-4.5 w-4.5 rounded-full flex items-center justify-center border border-luxury-obsidian scale-100 hover:scale-115 transition-transform">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </button>

          {/* CODER TERMINAL BUTTON CONSTRUCT - luxury styling */}
          {!import.meta.env.PROD && (
            <button
              onClick={onToggleSandbox}
              className={`px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-mono font-semibold transition-all border shadow-sm cursor-pointer ${
                isSandboxOpen
                  ? 'bg-luxury-gold/10 border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/20'
                  : 'bg-white/5 border-white/10 text-white/80 hover:text-white hover:border-white/20'
              }`}
            >
              <Terminal className="h-3.5 w-3.5 text-luxury-gold" />
              <span>{isSandboxOpen ? "Close DevSandbox" : "Developer Sandbox"}</span>
            </button>
          )}
        </div>
      </div>

      {/* QUICK STATUS TICKER FOR SANDBOX CHEVRONS */}
      {!import.meta.env.PROD && isSandboxOpen && (
        <div className="hidden md:flex bg-[#070A12] border-t border-white/5 px-6 py-2.5 text-xs text-white/50 select-none items-center justify-center gap-8 font-mono font-light leading-none">
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> 
            Dialect: <strong className="text-emerald-400 font-medium">MySQL J/Connector</strong>
          </span>
          <span className="text-white/10">|</span>
          <button
            onClick={() => setSandboxActiveTab('terminal')}
            className={`text-[10px] hover:text-white transition-all cursor-pointer ${sandboxActiveTab === 'terminal' ? 'text-luxury-gold font-semibold' : ''}`}
          >
            [1] Spring Boot Log Trace
          </button>
          <button
            onClick={() => setSandboxActiveTab('database')}
            className={`text-[10px] hover:text-white transition-all cursor-pointer ${sandboxActiveTab === 'database' ? 'text-luxury-gold font-semibold' : ''}`}
          >
            [2] MySQL Tables Workbench
          </button>
          <button
            onClick={() => setSandboxActiveTab('code')}
            className={`text-[10px] hover:text-white transition-all cursor-pointer ${sandboxActiveTab === 'code' ? 'text-luxury-gold font-semibold' : ''}`}
          >
            [3] Spring Java Model Source
          </button>
        </div>
      )}
    </header>
  );
}
