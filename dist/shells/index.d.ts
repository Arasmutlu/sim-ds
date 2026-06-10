import React from 'react';
import { S as SimId, M as MaxWidth } from '../types-CdvG1jck.js';

interface ParticipantShellProps {
    sim: SimId;
    maxWidth?: MaxWidth;
    children: React.ReactNode;
    className?: string;
}
declare function ParticipantShell({ sim, maxWidth, children, className, }: ParticipantShellProps): React.JSX.Element;

interface FacilitatorShellProps {
    sim: SimId;
    simLabel: string;
    sessionCode: string;
    isLive: boolean;
    children: React.ReactNode;
}
declare function FacilitatorShell({ sim, simLabel, sessionCode, isLive, children, }: FacilitatorShellProps): React.JSX.Element;

interface StratejiBoardShellProps {
    sim: SimId;
    children: React.ReactNode;
    className?: string;
}
/**
 * War Room ve Predator'a özel tam genişlik shell.
 * Pazar verisi tablolarına ve yan yana panellere yer açar.
 */
declare function StratejiBoardShell({ sim, children, className, }: StratejiBoardShellProps): React.JSX.Element;

export { FacilitatorShell, type FacilitatorShellProps, ParticipantShell, type ParticipantShellProps, StratejiBoardShell, type StratejiBoardShellProps };
