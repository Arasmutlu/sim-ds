import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

export type ToastVariant = 'info' | 'success' | 'warning' | 'critical'

export interface Toast {
  id: string
  variant: ToastVariant
  message: string
  durationMs?: number
}

interface ToastContextValue {
  show: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

const variantClasses: Record<ToastVariant, string> = {
  info:     'bg-[var(--toast-info-bg)]     text-[var(--toast-info-text)]     border-[var(--toast-info-border)]',
  success:  'bg-[var(--toast-success-bg)]  text-[var(--toast-success-text)]  border-[var(--toast-success-border)]',
  warning:  'bg-[var(--toast-warning-bg)]  text-[var(--toast-warning-text)]  border-[var(--toast-warning-border)]',
  critical: 'bg-[var(--toast-critical-bg)] text-[var(--toast-critical-text)] border-[var(--toast-critical-border)]',
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const ms = toast.durationMs ?? (toast.variant === 'critical' ? 8000 : 5000)
    const id = setTimeout(() => onDismiss(toast.id), ms)
    return () => clearTimeout(id)
  }, [toast, onDismiss])

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 px-4 py-3 rounded-lg border text-sm shadow-md max-w-sm transition-all duration-200 ${variantClasses[toast.variant]}`}
    >
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Kapat"
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counter = useRef(0)

  const show = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++counter.current}`
    setToasts(prev => [...prev, { ...toast, id }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <div
        aria-live="polite"
        className="fixed top-4 right-4 z-[var(--z-toast,400)] flex flex-col gap-2"
      >
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
