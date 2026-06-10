/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {

      colors: {

        // ── Simülasyon Atmosfer Renkleri ────────────────────────
        // CSS değişkeninden gelir → themes/[sim].css tarafından set edilir
        sim: {
          primary:          'var(--sim-primary)',
          'primary-hover':  'var(--sim-primary-hover)',
          'primary-subtle': 'var(--sim-primary-subtle)',

          accent:           'var(--sim-accent)',
          'accent-hover':   'var(--sim-accent-hover)',
          'accent-muted':   'var(--sim-accent-muted)',

          surface:           'var(--sim-surface)',
          'surface-elevated':'var(--sim-surface-elevated)',
          'surface-sunken':  'var(--sim-surface-sunken)',

          text:              'var(--sim-text)',
          'text-muted':      'var(--sim-text-muted)',
          'text-placeholder':'var(--sim-text-placeholder)',
          'text-inverse':    'var(--sim-text-inverse)',

          border:            'var(--sim-border)',
          'border-strong':   'var(--sim-border-strong)',
          'border-subtle':   'var(--sim-border-subtle)',

          'chaos-bg':        'var(--sim-chaos-bg)',
          'chaos-border':    'var(--sim-chaos-border)',
          'chaos-text':      'var(--sim-chaos-text)',
        },

        // ── Zamanlayıcı ─────────────────────────────────────────
        // shared.css tarafından set edilir, tüm simlerde aynı
        timer: {
          'normal-bg':     'var(--timer-normal-bg)',
          'normal-text':   'var(--timer-normal-text)',
          'warning-bg':    'var(--timer-warning-bg)',
          'warning-text':  'var(--timer-warning-text)',
          'critical-bg':   'var(--timer-critical-bg)',
          'critical-text': 'var(--timer-critical-text)',
        },

        // ── Toast Bildirimleri ───────────────────────────────────
        toast: {
          'info-bg':        'var(--toast-info-bg)',
          'info-text':      'var(--toast-info-text)',
          'info-border':    'var(--toast-info-border)',
          'success-bg':     'var(--toast-success-bg)',
          'success-text':   'var(--toast-success-text)',
          'success-border': 'var(--toast-success-border)',
          'warning-bg':     'var(--toast-warning-bg)',
          'warning-text':   'var(--toast-warning-text)',
          'warning-border': 'var(--toast-warning-border)',
          'critical-bg':    'var(--toast-critical-bg)',
          'critical-text':  'var(--toast-critical-text)',
          'critical-border':'var(--toast-critical-border)',
        },

        // ── Katılımcı Durum ──────────────────────────────────────
        status: {
          'active-bg':      'var(--status-active-bg)',
          'active-text':    'var(--status-active-text)',
          'completed-bg':   'var(--status-completed-bg)',
          'completed-text': 'var(--status-completed-text)',
          'stuck-bg':       'var(--status-stuck-bg)',
          'stuck-text':     'var(--status-stuck-text)',
          'waiting-bg':     'var(--status-waiting-bg)',
          'waiting-text':   'var(--status-waiting-text)',
        },

        // ── Bağlantı Göstergesi ──────────────────────────────────
        conn: {
          'live-bg':   'var(--connection-live-bg)',
          'live-text': 'var(--connection-live-text)',
          'live-dot':  'var(--connection-live-dot)',
          'lost-bg':   'var(--connection-lost-bg)',
          'lost-text': 'var(--connection-lost-text)',
          'lost-dot':  'var(--connection-lost-dot)',
        },
      },

      // ── Shell Genişlikleri ─────────────────────────────────────
      maxWidth: {
        'shell-sm': '448px',
        'shell-md': '512px',
        'shell-lg': '768px',
        'shell-xl': '896px',
      },

      // ── Border Radius ──────────────────────────────────────────
      borderRadius: {
        'sim-sm':  '4px',
        'sim-md':  '8px',
        'sim-lg':  '12px',
        'sim-xl':  '16px',
      },

      // ── Animasyon Süreleri ─────────────────────────────────────
      transitionDuration: {
        'fast':   '150ms',
        'normal': '250ms',
        'slow':   '400ms',
      },

      // ── Gölge ─────────────────────────────────────────────────
      boxShadow: {
        'sim-sm':  '0 1px 3px rgba(0,0,0,0.08)',
        'sim-md':  '0 2px 8px rgba(0,0,0,0.10)',
        'sim-lg':  '0 4px 16px rgba(0,0,0,0.12)',
        'sim-card':'var(--sim-card-shadow)',
      },

    },
  },
}
