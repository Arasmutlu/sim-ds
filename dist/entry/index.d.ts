import React from 'react';
import { S as SimId } from '../types-DTBlN4Z7.js';

type ParticipantRole = string;
interface SessionEntryProps {
    sim: SimId;
    simLabel: string;
    roles?: ParticipantRole[];
    onJoin: (params: {
        pin: string;
        displayName: string;
        role?: string;
    }) => void | Promise<void>;
    isLoading?: boolean;
    error?: string | null;
}
declare function SessionEntry({ sim, simLabel, roles, onJoin, isLoading, error, }: SessionEntryProps): React.JSX.Element;

export { type ParticipantRole, SessionEntry, type SessionEntryProps };
