import React from 'react';
import { S as SimId } from '../types-DTBlN4Z7.js';

interface SimTimerProps {
    totalSeconds: number;
    warningThreshold?: number;
    criticalThreshold?: number;
    onExpire?: () => void;
    className?: string;
}
declare function SimTimer({ totalSeconds, warningThreshold, criticalThreshold, onExpire, className, }: SimTimerProps): React.JSX.Element;

type ToastVariant = 'info' | 'success' | 'warning' | 'critical';
interface Toast {
    id: string;
    variant: ToastVariant;
    message: string;
    durationMs?: number;
}
interface ToastContextValue {
    show: (toast: Omit<Toast, 'id'>) => void;
    dismiss: (id: string) => void;
}
declare function useToast(): ToastContextValue;
declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;

interface ReconnectOverlayProps {
    isVisible: boolean;
    onRetry?: () => void;
}
declare function ReconnectOverlay({ isVisible, onRetry }: ReconnectOverlayProps): React.JSX.Element | null;

interface Participant {
    id: string;
    name: string;
    joinedAt?: number;
}
interface LobbyScreenProps {
    sim: SimId;
    simLabel: string;
    sessionCode: string;
    participants: Participant[];
    onStart?: () => void;
    minParticipants?: number;
}
declare function LobbyScreen({ sim, simLabel, sessionCode, participants, onStart, minParticipants, }: LobbyScreenProps): React.JSX.Element;

export { LobbyScreen, type LobbyScreenProps, type Participant, ReconnectOverlay, type ReconnectOverlayProps, SimTimer, type SimTimerProps, type Toast, ToastProvider, type ToastVariant, useToast };
