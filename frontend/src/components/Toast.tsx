import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'warn' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none select-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
            className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 w-full transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/25 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-955/80 border-rose-500/25 text-rose-200'
                : toast.type === 'warn'
                ? 'bg-amber-955/80 border-amber-500/25 text-amber-200'
                : 'bg-slate-900/90 border-white/10 text-slate-200'
            }`}
          >
            {/* Visual indicator icon */}
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />}
              {toast.type === 'error' && <AlertTriangle className="h-4.5 w-4.5 text-rose-400" />}
              {toast.type === 'warn' && <AlertTriangle className="h-4.5 w-4.5 text-amber-400" />}
              {toast.type === 'info' && <Info className="h-4.5 w-4.5 text-sky-400" />}
            </div>

            {/* Content text */}
            <div className="flex-1 text-xs">
              <p className="font-sans font-medium leading-relaxed">{toast.message}</p>
            </div>

            {/* Dismiss trigger */}
            <button
              onClick={() => onRemove(toast.id)}
              className="shrink-0 p-0.5 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
