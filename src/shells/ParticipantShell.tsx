import React from 'react'
import type { SimId, MaxWidth } from '../types'

const maxWidthClass: Record<MaxWidth, string> = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  full: 'max-w-full',
}

export interface ParticipantShellProps {
  sim: SimId
  maxWidth?: MaxWidth
  children: React.ReactNode
  className?: string
  /** Background override — use for atmosphere/pressure effects */
  style?: React.CSSProperties
}

export function ParticipantShell({
  sim,
  maxWidth = 'lg',
  children,
  className = '',
  style,
}: ParticipantShellProps) {
  return (
    <div
      data-sim={sim}
      className={`w-full text-[var(--sim-text)] ${maxWidthClass[maxWidth]} mx-auto px-4 py-6 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
