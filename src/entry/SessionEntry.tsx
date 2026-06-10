import React, { useState } from 'react'
import type { SimId } from '../types'

export type ParticipantRole = string

export interface SessionEntryProps {
  sim: SimId
  simLabel: string
  roles?: ParticipantRole[]
  onJoin: (params: { pin: string; displayName: string; role?: string }) => void | Promise<void>
  isLoading?: boolean
  error?: string | null
}

export function SessionEntry({
  sim,
  simLabel,
  roles,
  onJoin,
  isLoading = false,
  error = null,
}: SessionEntryProps) {
  const [pin, setPin] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState(roles?.[0] ?? '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!pin.trim() || !displayName.trim()) return
    await onJoin({ pin: pin.trim(), displayName: displayName.trim(), role: role || undefined })
  }

  return (
    <div
      data-sim={sim}
      className="min-h-screen bg-[var(--sim-surface)] flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-[var(--sim-text)] mb-1">{simLabel}</h1>
        <p className="text-sm text-[var(--sim-text-muted)] mb-8">Oturuma katıl</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PIN */}
          <div>
            <label className="block text-xs font-medium text-[var(--sim-text-muted)] mb-1.5">
              Oturum Kodu
            </label>
            <input
              type="text"
              value={pin}
              onChange={e => setPin(e.target.value.toUpperCase())}
              placeholder="XXXX"
              maxLength={8}
              required
              className="w-full px-3 py-2.5 rounded-lg border border-[var(--sim-border)] bg-[var(--sim-input-bg,#fff)] text-[var(--sim-text)] font-mono tracking-widest text-center text-lg placeholder:text-[var(--sim-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--sim-input-focus)] focus:border-transparent"
            />
          </div>

          {/* İsim */}
          <div>
            <label className="block text-xs font-medium text-[var(--sim-text-muted)] mb-1.5">
              Adınız
            </label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Adınızı girin"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-[var(--sim-border)] bg-[var(--sim-input-bg,#fff)] text-[var(--sim-text)] placeholder:text-[var(--sim-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--sim-input-focus)] focus:border-transparent"
            />
          </div>

          {/* Rol — varsa */}
          {roles && roles.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-[var(--sim-text-muted)] mb-1.5">
                Rol
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--sim-border)] bg-[var(--sim-input-bg,#fff)] text-[var(--sim-text)] focus:outline-none focus:ring-2 focus:ring-[var(--sim-input-focus)] focus:border-transparent"
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          )}

          {/* Hata */}
          {error && (
            <p className="text-sm text-[var(--toast-critical-text)] bg-[var(--toast-critical-bg)] border border-[var(--toast-critical-border)] px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !pin.trim() || !displayName.trim()}
            className="w-full py-3 rounded-lg font-semibold text-sm bg-[var(--sim-primary)] text-[var(--sim-text-inverse)] hover:bg-[var(--sim-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {isLoading ? 'Katılıyor...' : 'Katıl'}
          </button>
        </form>
      </div>
    </div>
  )
}
