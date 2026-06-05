import React from 'react';
import { CheckCircle2, Copy, Check, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';

interface OrderConfirmationModalProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
  isSandboxOpen: boolean;
  onOpenSandboxTab: () => void;
}

export default function OrderConfirmationModal({
  orderId,
  isOpen,
  onClose,
  isSandboxOpen,
  onOpenSandboxTab
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  const txnId = `TXN${Date.now()}`;
  const [copiedTxn, setCopiedTxn] = React.useState(false);

  const handleCopyTxn = () => {
    navigator.clipboard.writeText(txnId);
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-[#070A13]/85 backdrop-blur-md" onClick={onClose} />

      {/* Main Container */}
      <div className="bg-[#0D1221] text-slate-100 rounded-3xl p-6 md:p-8 text-center border border-white/10 max-w-md w-full relative z-10 space-y-5 shadow-2xl animate-luxury-fade">
        
        {/* Animated Check icon */}
        <div className="mx-auto h-16 w-16 text-emerald-400 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/25">
          <CheckCircle2 className="h-9 w-9 text-emerald-400" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-display font-extrabold tracking-normal text-white">Order Placed Successfully</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            Your order has been placed successfully and is being prepared for shipment.
          </p>
        </div>

        {/* Invoice specifications summary */}
        <div className="bg-black/25 border border-white/5 rounded-2xl p-4.5 text-xs text-left space-y-3 font-mono">
          <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
            <span className="text-white/50">Order Reference</span>
            <span className="font-mono font-extrabold text-luxury-gold bg-luxury-gold/10 px-2.5 py-0.5 rounded border border-luxury-gold/20 text-[10px]">
              #{orderId}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
            <span className="text-white/50">Transaction ID</span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/85">
              <span>{txnId.substring(0, 16)}...</span>
              <button
                onClick={handleCopyTxn}
                className="p-1 rounded hover:bg-white/5 text-white/40 hover:text-white transition-all cursor-pointer"
                title="Copy Transaction ID"
              >
                {copiedTxn ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/50">Payment Status</span>
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/15 leading-none">
              Success
            </span>
          </div>
        </div>

        {/* Database sandbox trigger helper */}
        {!import.meta.env.PROD && isSandboxOpen ? (
          <div className="p-4 bg-slate-950 text-xs leading-relaxed text-slate-300 text-left border border-white/5 rounded-2xl flex gap-3">
            <Terminal className="h-5 w-5 text-luxury-gold shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1.5">
              <p className="font-semibold text-slate-100 font-display">Inspect SQL execution logs</p>
              <p className="text-white/40 font-light text-[10px] leading-normal font-sans">
                Check Hibernate queries (e.g. <code className="text-amber-400 font-mono">INSERT INTO orders</code> and <code className="text-[#22D3EE] font-mono">UPDATE products Set stock = ...</code>) inside your mock terminal log tab below.
              </p>
              
              <button
                onClick={() => {
                  onOpenSandboxTab();
                  onClose();
                }}
                className="text-luxury-gold hover:text-amber-300 flex items-center gap-1 font-extrabold font-mono text-[9px] uppercase tracking-wider pt-1 cursor-pointer transition-all"
              >
                <span>Open Server Console</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white/[0.02] text-xs leading-relaxed text-slate-300 text-left border border-white/5 rounded-2xl flex items-center gap-3 select-none">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-slate-100 font-display text-[11px]">Secure SSL Encrypted Checkout</p>
              <p className="text-white/40 font-light text-[10px] leading-normal font-sans mt-0.5">
                Your payment and credentials have been processed securely. A confirmation email has been dispatched.
              </p>
            </div>
          </div>
        )}

        {/* Main controls */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gold-gradient text-luxury-obsidian font-display font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer hover:opacity-90 active:scale-98 shadow-md"
        >
          Close &amp; Continue
        </button>
      </div>
    </div>
  );
}
