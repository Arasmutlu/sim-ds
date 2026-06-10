export type SimId =
  | 'black-swan'
  | 'hard-call'
  | 'war-room'
  | 'predator'
  | 'allocation-game'
  | 'fast-forward'
  | 'org-surgery'

export interface SimTheme {
  primary:         string
  primaryHover:    string
  primarySubtle:   string
  accent:          string
  accentHover:     string
  accentMuted:     string
  surface:         string
  surfaceElevated: string
  surfaceSunken:   string
  text:            string
  textMuted:       string
  textInverse:     string
  border:          string
  borderStrong:    string
  borderSubtle:    string
}

export type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full'
