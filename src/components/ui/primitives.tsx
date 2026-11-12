import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/* ==========================================================================
   CUTPOINT UI PRIMITIVES — "Signal" system
   Social platform for editors. Sans-only, one accent, soft-consistent radii.
   Accessibility is built into the primitives, not bolted on per-component:
   Modal owns focus trap + Escape + aria-modal. IconButton forces a label.
   ========================================================================== */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-ink-900 text-paper-0 hover:bg-ink-800 active:bg-ink-900',
  accent: 'bg-signal-600 text-paper-0 hover:bg-signal-500 active:bg-signal-700',
  secondary: 'bg-paper-100 text-ink-900 hover:bg-ink-100 border border-ink-100',
  ghost: 'bg-transparent text-ink-600 hover:bg-paper-100 hover:text-ink-900',
  outline: 'bg-transparent text-ink-900 border border-ink-200 hover:border-ink-400',
  danger: 'bg-transparent text-err-600 border border-err-600/30 hover:bg-err-100/60',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-xs gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-[15px] gap-2.5',
};

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

/** Icon-only button. `label` is mandatory so every icon button gets an
 * accessible name (WCAG 4.1.2) - it renders as both aria-label and a
 * native title tooltip, and meets the 44x44px minimum touch target. */
export const IconButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    variant?: 'ghost' | 'solid';
  }
> = ({ label, variant = 'ghost', className = '', children, ...props }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={`inline-flex items-center justify-center min-w-11 min-h-11 rounded-full transition-colors duration-150 active:scale-[0.96] cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${
      variant === 'ghost'
        ? 'text-ink-500 hover:text-ink-900 hover:bg-paper-100'
        : 'bg-ink-900 text-paper-0 hover:bg-ink-800'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

/** Screen-reader-only text: visible content that needs more spoken
 * context (e.g. an icon button's purpose) without changing the visual. */
export const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]">
    {children}
  </span>
);

export const Panel: React.FC<React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }> = ({
  className = '',
  hover = false,
  children,
  ...props
}) => (
  <div
    className={`bg-paper-0 border border-ink-100 rounded-lg ${
      hover ? 'transition-colors duration-200 hover:border-ink-300' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </div>
);

type BadgeTone = 'neutral' | 'accent' | 'ok' | 'warn' | 'err';

const badgeTones: Record<BadgeTone, string> = {
  neutral: 'bg-paper-100 text-ink-600 border-ink-100',
  accent: 'bg-signal-100 text-signal-700 border-signal-200',
  ok: 'bg-ok-100 text-ok-600 border-ok-600/15',
  warn: 'bg-warn-100 text-warn-600 border-warn-600/15',
  err: 'bg-err-100 text-err-600 border-err-600/15',
};

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }> = ({
  tone = 'neutral',
  className = '',
  children,
  ...props
}) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeTones[tone]} ${className}`}
    {...props}
  >
    {children}
  </span>
);

export const LevelPill: React.FC<{ level: number; className?: string }> = ({ level, className = '' }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full bg-paper-100 border border-ink-100 text-[11px] font-semibold text-ink-700 ${className}`}
  >
    Level {level}
  </span>
);

export const StatBlock: React.FC<{
  label: string;
  value: string | number;
  className?: string;
}> = ({ label, value, className = '' }) => (
  <div className={className}>
    <div className="font-semibold text-lg text-ink-900 tabular-num">{value}</div>
    <div className="text-[11px] uppercase tracking-wide text-ink-400 font-medium mt-0.5">{label}</div>
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => (
  <input
    className={`w-full h-11 px-4 rounded-md bg-paper-0 border border-ink-200 text-ink-900 placeholder:text-ink-400 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus:border-signal-500 transition-colors ${className}`}
    {...props}
  />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className = '',
  ...props
}) => (
  <textarea
    className={`w-full px-4 py-3 rounded-md bg-paper-0 border border-ink-200 text-ink-900 placeholder:text-ink-400 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus:border-signal-500 transition-colors resize-none ${className}`}
    {...props}
  />
);

/** Labeled field wrapper: guarantees every input has a real <label> tied
 * to it via htmlFor/id (WCAG 3.3.2, 1.3.1), plus optional error text
 * wired up with aria-describedby + aria-invalid (WCAG 3.3.1). */
export const Field: React.FC<{
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }>;
  className?: string;
}> = ({ id, label, error, hint, required, children, className = '' }) => {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-ink-700 mb-1.5">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-signal-600">
              {' '}
              *
            </span>
            <VisuallyHidden> required</VisuallyHidden>
          </>
        )}
      </label>
      {React.cloneElement(children, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': !!error,
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-400 mt-1.5">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-err-600 mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

/** Accessible modal shell: traps focus, closes on Escape, restores focus
 * to the trigger on close, locks body scroll, and exposes role="dialog"
 * + aria-modal + aria-labelledby. Every modal in the app should render
 * through this rather than hand-rolling its own overlay div. */
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  children: React.ReactNode;
  className?: string;
}> = ({ isOpen, onClose, titleId, children, className = '' }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full bg-paper-0 border border-ink-100 rounded-lg shadow-xl shadow-ink-900/10 animate-rise-in ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 min-w-11 min-h-11 inline-flex items-center justify-center rounded-full text-ink-400 hover:text-ink-900 hover:bg-paper-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
};

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ icon, title, description, action, className = '' }) => (
  <div className={`text-center py-16 px-6 ${className}`}>
    {icon && (
      <div className="w-12 h-12 rounded-full bg-paper-100 text-ink-400 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
        {icon}
      </div>
    )}
    <h3 className="text-base font-semibold text-ink-900">{title}</h3>
    {description && <p className="text-sm text-ink-500 mt-1.5 max-w-sm mx-auto leading-relaxed">{description}</p>}
    {action && <div className="mt-6 flex justify-center">{action}</div>}
  </div>
);
