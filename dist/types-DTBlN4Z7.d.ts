type SimId = 'black-swan' | 'hard-call' | 'war-room' | 'predator' | 'allocation-game' | 'fast-forward' | 'org-surgery';
interface SimTheme {
    primary: string;
    primaryHover: string;
    primarySubtle: string;
    accent: string;
    accentHover: string;
    accentMuted: string;
    surface: string;
    surfaceElevated: string;
    surfaceSunken: string;
    text: string;
    textMuted: string;
    textInverse: string;
    border: string;
    borderStrong: string;
    borderSubtle: string;
}
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export type { MaxWidth as M, SimId as S, SimTheme as a };
