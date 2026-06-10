import { useState, useEffect } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/decision/IrreversibleConfirm.tsx
function IrreversibleConfirm({
  isOpen,
  title = "Bu karar kaydedilecek",
  description = "Onaylad\u0131ktan sonra de\u011Fi\u015Ftirilemez.",
  confirmLabel = "Karar\u0131 Onayla",
  cancelLabel = "Geri D\xF6n",
  onConfirm,
  onCancel,
  pauseMs = 300
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setReady(false);
      return;
    }
    const id = setTimeout(() => setReady(true), pauseMs);
    return () => clearTimeout(id);
  }, [isOpen, pauseMs]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "irrev-title",
      className: "fixed inset-0 z-[var(--z-modal,300)] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4",
      children: /* @__PURE__ */ jsxs("div", { className: "bg-[var(--sim-surface-elevated)] rounded-xl p-6 max-w-sm w-full shadow-xl", children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            id: "irrev-title",
            className: "text-base font-semibold text-[var(--sim-text)] mb-2",
            children: title
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--sim-text-muted)] mb-6", children: description }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onCancel,
              className: "flex-1 py-2.5 rounded-lg border border-[var(--sim-border)] text-sm font-medium text-[var(--sim-text)] hover:bg-[var(--sim-surface)] transition-colors",
              children: cancelLabel
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onConfirm,
              disabled: !ready,
              className: "flex-1 py-2.5 rounded-lg text-sm font-semibold bg-[var(--sim-primary)] text-[var(--sim-text-inverse)] hover:bg-[var(--sim-primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150",
              children: confirmLabel
            }
          )
        ] })
      ] })
    }
  );
}

export { IrreversibleConfirm };
