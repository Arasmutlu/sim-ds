import React from 'react'
import type { SimId, MaxWidth } from '../types'

const maxWidthClass: Record<MaxWidth, string> = {
  sm:   'max-w-[448px]',
  md:   'max-w-[512px]',
  lg:   'max-w-[768px]',
  xl:   'max-w-[896px]',
  full: 'max-w-full',
}

export interface ParticipantShellProps {
  sim: SimId
  maxWidth?: MaxWidth
  children: React.ReactNode
  className?: string
}

export function ParticipantShell({
  sim,
  maxWidth = 'lg',
  children,
  className = '',
}: ParticipantShellProps) {
  return (
    <div
      data-sim={sim}
      className={`min-h-screen bg-[var(--sim-surface)] text-[var(--sim-text)] ${maxWidthClass[maxWidth]} mx-auto px-4 py-6 ${className}`}
    >
      {children}
    </div>
  )
}
