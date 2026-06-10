import React from 'react'
import type { SimId } from '../types'

export interface FacilitatorShellProps {
  sim: SimId
  simLabel: string
  sessionCode: string
  isLive: boolean
  children: React.ReactNode
}

export function FacilitatorShell({
  sim,
  simLabel,
  sessionCode,
  isLive,
  children,
}: FacilitatorShellProps) {
  return (
    <div
      data-sim={sim}
      className="min-h-screen bg-[var(--sim-surface)] text-[var(--sim-text)] flex flex-col"
    >
      {/* Header */}
      <header className="h-14 px-6 flex items-center justify-between border-b border-[var(--sim-border)] bg-[var(--sim-surface-elevated)] shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-[var(--sim-text)]">{simLabel}</span>
          <span className="text-[var(--sim-text-muted)] text-sm">|</span>
          <span className="font-mono text-sm font-medium tracking-widest text-[var(--sim-text)]">
            {sessionCode}
          </span>
        </div>

        {/* Canlı bağlantı göstergesi */}
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${
          isLive
            ? 'bg-[var(--connection-live-bg)] text-[var(--connection-live-text)]'
            : 'bg-[var(--connection-lost-bg)] text-[var(--connection-lost-text)]'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            isLive ? 'bg-[var(--connection-live-dot)]' : 'bg-[var(--connection-lost-dot)]'
          }`} />
          {isLive ? 'Canlı' : 'Bağlantı yok'}
        </div>
      </header>

      {/* 65/35 grid */}
      <div className="flex-1 grid grid-cols-[65fr_35fr] overflow-hidden">
        {children}
      </div>

      {/* Mobile engeli */}
      <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-[var(--sim-surface)] px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-[var(--sim-text)]">Facilitatör ekranı</p>
          <p className="mt-2 text-sm text-[var(--sim-text-muted)]">
            Bu ekran tablet veya masaüstü gerektirir.
          </p>
        </div>
      </div>
    </div>
  )
}
