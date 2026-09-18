import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 animate-bounce">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl glass-panel shadow-2xl border border-accent/40 text-slate-100 bg-slate-900/90 backdrop-blur-xl">
        <CheckCircle className="w-5 h-5 text-accent shrink-0" />
        <p className="text-sm font-medium text-slate-200">{toast.message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-slate-100 transition-colors p-1"
          aria-label="Close Toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
