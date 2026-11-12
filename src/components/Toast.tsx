import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { IconButton } from './ui/primitives';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-paper-0 border border-ink-100 rounded-lg shadow-lg shadow-ink-900/5 text-ink-800 text-sm animate-rise-in"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-err-600 shrink-0" aria-hidden="true" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-signal-500 shrink-0" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-ok-600 shrink-0" aria-hidden="true" />
            )}
            <span className="font-medium text-ink-800">{toast.title}</span>
          </div>
          <IconButton label="Dismiss notification" onClick={() => removeToast(toast.id)} className="min-w-8 min-h-8">
            <X className="w-4 h-4" aria-hidden="true" />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
