import React, { useEffect, useState } from 'react'

export interface ReconnectOverlayProps {
  isVisible: boolean
  onRetry?: () => void
}

export function ReconnectOverlay({ isVisible, onRetry }: ReconnectOverlayProps) {
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setAttempts(0)
      return
    }
    const id = setInterval(() => {
      setAttempts(a => a + 1)
      onRetry?.()
    }, 3000)
    return () => clearInterval(id)
  }, [isVisible, onRetry])

  if (!isVisible) return null

  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed inset-0 z-[var(--z-overlay,200)] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-[var(--sim-surface-elevated)] rounded-xl px-8 py-6 max-w-sm text-center shadow-xl">
        <div className="w-8 h-8 mx-auto mb-4 rounded-full border-2 border-[var(--sim-accent)] border-t-transparent animate-spin" />
        <p className="font-semibold text-[var(--sim-text)]">Bağlantı yeniden kuruluyor</p>
        <p className="mt-1 text-sm text-[var(--sim-text-muted)]">
          Verileriniz güvende. Deneme {attempts + 1}...
        </p>
      </div>
    </div>
  )
}
