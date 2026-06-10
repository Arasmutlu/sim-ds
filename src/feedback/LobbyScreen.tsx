import React from 'react'
import type { SimId } from '../types'

export interface Participant {
  id: string
  name: string
  joinedAt?: number
}

export interface LobbyScreenProps {
  sim: SimId
  simLabel: string
  sessionCode: string
  participants: Participant[]
  onStart?: () => void
  minParticipants?: number
}

export function LobbyScreen({
  sim,
  simLabel,
  sessionCode,
  participants,
  onStart,
  minParticipants = 2,
}: LobbyScreenProps) {
  const canStart = participants.length >= minParticipants

  return (
    <div
      data-sim={sim}
      className="min-h-screen bg-[var(--sim-primary)] text-[var(--sim-text-inverse)] flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Simülasyon başlığı */}
      <p className="text-sm font-medium uppercase tracking-widest opacity-70 mb-3">
        {simLabel}
      </p>

      {/* Oturum kodu — projeksiyon için büyük */}
      <div className="text-center mb-10">
        <p className="text-sm opacity-60 mb-2">Oturum Kodu</p>
        <p className="text-7xl font-bold font-mono tracking-[0.15em]">{sessionCode}</p>
      </div>

      {/* Katılımcı listesi */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm opacity-70">Katılımcılar</span>
          <span className="text-sm font-semibold">{participants.length}</span>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {participants.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--connection-live-dot)]" />
              <span className="text-sm font-medium">{p.name}</span>
            </div>
          ))}
          {participants.length === 0 && (
            <p className="text-sm opacity-50 text-center py-4">
              Katılımcılar bekleniyor...
            </p>
          )}
        </div>
      </div>

      {/* Başlat butonu — facilitatör için */}
      {onStart && (
        <button
          onClick={onStart}
          disabled={!canStart}
          className="mt-10 px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-150 bg-white text-[var(--sim-primary)] hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {canStart ? 'Simülasyonu Başlat' : `En az ${minParticipants} katılımcı gerekli`}
        </button>
      )}
    </div>
  )
}
