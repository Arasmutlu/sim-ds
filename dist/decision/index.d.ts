import React from 'react';

interface IrreversibleConfirmProps {
    isOpen: boolean;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    pauseMs?: number;
}
declare function IrreversibleConfirm({ isOpen, title, description, confirmLabel, cancelLabel, onConfirm, onCancel, pauseMs, }: IrreversibleConfirmProps): React.JSX.Element | null;

export { IrreversibleConfirm, type IrreversibleConfirmProps };
