import React, { useEffect, useState } from 'react'

export interface SimTimerProps {
  totalSeconds: number
  warningThreshold?: number   // saniye kala uyarıya geç
  criticalThreshold?: number  // saniye kala kritike geç
  onExpire?: () => void
  className?: string
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function SimTimer({
  totalSeconds,
  warningThreshold = 60,
  criticalThreshold = 30,
  onExpire,
  className = '',
}: SimTimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds)

  useEffect(() => {
    setRemaining(totalSeconds)
  }, [totalSeconds])

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.()
      return
    }
    const id = setTimeout(() => setRemaining(r => r - 1), 1000)
    return () => clearTimeout(id)
  }, [remaining, onExpire])

  const state =
    remaining <= criticalThreshold ? 'critical' :
    remaining <= warningThreshold  ? 'warning'  : 'normal'

  const stateClasses = {
    normal:   'bg-[var(--timer-normal-bg)]   text-[var(--timer-normal-text)]',
    warning:  'bg-[var(--timer-warning-bg)]  text-[var(--timer-warning-text)]',
    critical: 'bg-[var(--timer-critical-bg)] text-[var(--timer-critical-text)] animate-pulse',
  }

  return (
    <div
      role="timer"
      aria-live="polite"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono font-semibold tabular-nums transition-colors duration-300 ${stateClasses[state]} ${className}`}
    >
      {formatTime(remaining)}
    </div>
  )
}
