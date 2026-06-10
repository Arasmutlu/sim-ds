// @weevolution/sim-ds — Simülasyon Atmosfer Paketi
// Her simülasyonun temel renk tokenları.
// CSS custom property'lere karşılık gelir (sim-ds/css/themes/[sim].css).
//
// Kullanım:
//   import { themes } from '@weevolution/sim-ds/themes'
//   const t = themes['black-swan']
//   element.style.setProperty('--sim-primary', t.primary)

/** @typedef {'black-swan'|'hard-call'|'war-room'|'predator'|'allocation-game'|'fast-forward'|'org-surgery'} SimId */

/**
 * @typedef {Object} SimTheme
 * @property {string} primary
 * @property {string} primaryHover
 * @property {string} primarySubtle
 * @property {string} accent
 * @property {string} accentHover
 * @property {string} accentMuted
 * @property {string} surface
 * @property {string} surfaceElevated
 * @property {string} surfaceSunken
 * @property {string} text
 * @property {string} textMuted
 * @property {string} textInverse
 * @property {string} border
 * @property {string} borderStrong
 * @property {string} borderSubtle
 */

/** @type {Record<SimId, SimTheme>} */
export const themes = {
  'black-swan': {
    primary:         '#1A1A1A',
    primaryHover:    '#2D2D2D',
    primarySubtle:   '#F0EBE4',
    accent:          '#CC2200',
    accentHover:     '#A81C00',
    accentMuted:     '#FFF0EE',
    surface:         '#F0EBE4',
    surfaceElevated: '#FAF7F4',
    surfaceSunken:   '#E6DDD4',
    text:            '#1A1A1A',
    textMuted:       '#6B6B6B',
    textInverse:     '#FFFFFF',
    border:          '#D6CFC8',
    borderStrong:    '#1A1A1A',
    borderSubtle:    '#EDE8E2',
  },
  'hard-call': {
    primary:         '#1F4D3A',
    primaryHover:    '#173D2E',
    primarySubtle:   '#E8F0EC',
    accent:          '#478768',
    accentHover:     '#3A7057',
    accentMuted:     '#F0F7F3',
    surface:         '#F7F5EF',
    surfaceElevated: '#FFFFFF',
    surfaceSunken:   '#EDE9E0',
    text:            '#1A2E25',
    textMuted:       '#5F7368',
    textInverse:     '#FFFFFF',
    border:          '#D1E1D9',
    borderStrong:    '#1F4D3A',
    borderSubtle:    '#E8F0EC',
  },
  'war-room': {
    primary:         '#1C2B3A',
    primaryHover:    '#131F2A',
    primarySubtle:   '#EBF2FA',
    accent:          '#2D6A9F',
    accentHover:     '#245783',
    accentMuted:     '#EBF5FF',
    surface:         '#F1F3F5',
    surfaceElevated: '#FFFFFF',
    surfaceSunken:   '#E4E8ED',
    text:            '#1C2B3A',
    textMuted:       '#8899A6',
    textInverse:     '#FFFFFF',
    border:          '#CBD5E1',
    borderStrong:    '#1C2B3A',
    borderSubtle:    '#E2E8F0',
  },
  'predator': {
    primary:         '#0F1B2D',
    primaryHover:    '#1A2F47',
    primarySubtle:   '#E8EDF3',
    accent:          '#C2410C',
    accentHover:     '#9A340A',
    accentMuted:     '#FFF4EE',
    surface:         '#F5F6F8',
    surfaceElevated: '#FFFFFF',
    surfaceSunken:   '#1A2332',
    text:            '#0F1B2D',
    textMuted:       '#64748B',
    textInverse:     '#FFFFFF',
    border:          '#CBD5E1',
    borderStrong:    '#0F1B2D',
    borderSubtle:    '#E2E8F0',
  },
  'allocation-game': {
    primary:         '#1F2937',
    primaryHover:    '#111827',
    primarySubtle:   '#F9FAFB',
    accent:          '#D97706',
    accentHover:     '#B45309',
    accentMuted:     '#FFFBEB',
    surface:         '#FEFCE8',
    surfaceElevated: '#FFFFFF',
    surfaceSunken:   '#FEF9C3',
    text:            '#1F2937',
    textMuted:       '#6B7280',
    textInverse:     '#FFFFFF',
    border:          '#E5E7EB',
    borderStrong:    '#1F2937',
    borderSubtle:    '#F3F4F6',
  },
  'fast-forward': {
    primary:         '#2D1B4E',
    primaryHover:    '#1E1136',
    primarySubtle:   '#F3EEFF',
    accent:          '#7C3AED',
    accentHover:     '#6D28D9',
    accentMuted:     '#F5F3FF',
    surface:         '#FAFAFA',
    surfaceElevated: '#FFFFFF',
    surfaceSunken:   '#F0EDFB',
    text:            '#2D1B4E',
    textMuted:       '#6D6D7A',
    textInverse:     '#FFFFFF',
    border:          '#DDD6FE',
    borderStrong:    '#2D1B4E',
    borderSubtle:    '#EDE9FE',
  },
  'org-surgery': {
    primary:         '#334155',
    primaryHover:    '#243345',
    primarySubtle:   '#F1F5F9',
    accent:          '#0F766E',
    accentHover:     '#0C5E58',
    accentMuted:     '#F0FDFA',
    surface:         '#F8FAFC',
    surfaceElevated: '#FFFFFF',
    surfaceSunken:   '#EEF2F7',
    text:            '#334155',
    textMuted:       '#64748B',
    textInverse:     '#FFFFFF',
    border:          '#CBD5E1',
    borderStrong:    '#334155',
    borderSubtle:    '#E2E8F0',
  },
}

/** @type {SimId[]} */
export const simIds = /** @type {SimId[]} */ (Object.keys(themes))
