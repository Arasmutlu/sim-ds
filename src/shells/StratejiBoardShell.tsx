import React from 'react'
import type { SimId } from '../types'

export interface StratejiBoardShellProps {
  sim: SimId
  children: React.ReactNode
  className?: string
}

/**
 * War Room ve Predator'a özel tam genişlik shell.
 * Pazar verisi tablolarına ve yan yana panellere yer açar.
 */
export function StratejiBoardShell({
  sim,
  children,
  className = '',
}: StratejiBoardShellProps) {
  return (
    <div
      data-sim={sim}
      className={`min-h-screen w-full bg-[var(--sim-surface)] text-[var(--sim-text)] flex flex-col ${className}`}
    >
      {children}
    </div>
  )
}
