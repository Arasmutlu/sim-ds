import React, { useEffect, useState } from 'react'

export interface IrreversibleConfirmProps {
  isOpen: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  pauseMs?: number  // micro-pause before confirm button activates
}

export function IrreversibleConfirm({
  isOpen,
  title = 'Bu karar kaydedilecek',
  description = 'Onayladıktan sonra değiştirilemez.',
  confirmLabel = 'Kararı Onayla',
  cancelLabel = 'Geri Dön',
  onConfirm,
  onCancel,
  pauseMs = 300,
}: IrreversibleConfirmProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isOpen) { setReady(false); return }
    const id = setTimeout(() => setReady(true), pauseMs)
    return () => clearTimeout(id)
  }, [isOpen, pauseMs])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="irrev-title"
      className="fixed inset-0 z-[var(--z-modal,300)] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div className="bg-[var(--sim-surface-elevated)] rounded-xl p-6 max-w-sm w-full shadow-xl">
        <h2
          id="irrev-title"
          className="text-base font-semibold text-[var(--sim-text)] mb-2"
        >
          {title}
        </h2>
        <p className="text-sm text-[var(--sim-text-muted)] mb-6">{description}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-[var(--sim-border)] text-sm font-medium text-[var(--sim-text)] hover:bg-[var(--sim-surface)] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={!ready}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-[var(--sim-primary)] text-[var(--sim-text-inverse)] hover:bg-[var(--sim-primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
