import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  const title = toast.title || toast.message;
  const subtitle = toast.subtitle;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0">
      <div
        className={`flex items-start gap-3.5 px-5 py-4 rounded-xl glass-panel shadow-2xl backdrop-blur-xl border transition-all ${
          isError
            ? 'bg-slate-900/95 border-rose-500/50 text-slate-100 shadow-rose-950/40'
            : isSuccess
            ? 'bg-slate-900/95 border-emerald-500/50 text-slate-100 shadow-emerald-950/40'
            : 'bg-slate-900/95 border-amber-500/40 text-slate-100 shadow-amber-950/30'
        }`}
      >
        <div className="mt-0.5 shrink-0">
          {isError ? (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <Info className="w-5 h-5 text-amber-400" />
          )}
        </div>

        <div className="flex-1 pr-2">
          <p
            className={`text-sm font-semibold tracking-tight ${
              isError
                ? 'text-rose-200'
                : isSuccess
                ? 'text-emerald-200'
                : 'text-slate-100'
            }`}
          >
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-100 transition-colors p-1 rounded-lg hover:bg-slate-800/60"
          aria-label="Close Toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
