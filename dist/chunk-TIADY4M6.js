import { createContext, useState, useEffect, useContext, useRef, useCallback } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/feedback/SimTimer.tsx
function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
function SimTimer({
  totalSeconds,
  warningThreshold = 60,
  criticalThreshold = 30,
  onExpire,
  className = ""
}) {
  const [remaining, setRemaining] = useState(totalSeconds);
  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);
  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1e3);
    return () => clearTimeout(id);
  }, [remaining, onExpire]);
  const state = remaining <= criticalThreshold ? "critical" : remaining <= warningThreshold ? "warning" : "normal";
  const stateClasses = {
    normal: "bg-[var(--timer-normal-bg)]   text-[var(--timer-normal-text)]",
    warning: "bg-[var(--timer-warning-bg)]  text-[var(--timer-warning-text)]",
    critical: "bg-[var(--timer-critical-bg)] text-[var(--timer-critical-text)] animate-pulse"
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "timer",
      "aria-live": "polite",
      className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono font-semibold tabular-nums transition-colors duration-300 ${stateClasses[state]} ${className}`,
      children: formatTime(remaining)
    }
  );
}
var ToastContext = createContext(null);
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
var variantClasses = {
  info: "bg-[var(--toast-info-bg)]     text-[var(--toast-info-text)]     border-[var(--toast-info-border)]",
  success: "bg-[var(--toast-success-bg)]  text-[var(--toast-success-text)]  border-[var(--toast-success-border)]",
  warning: "bg-[var(--toast-warning-bg)]  text-[var(--toast-warning-text)]  border-[var(--toast-warning-border)]",
  critical: "bg-[var(--toast-critical-bg)] text-[var(--toast-critical-text)] border-[var(--toast-critical-border)]"
};
function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const ms = toast.durationMs ?? (toast.variant === "critical" ? 8e3 : 5e3);
    const id = setTimeout(() => onDismiss(toast.id), ms);
    return () => clearTimeout(id);
  }, [toast, onDismiss]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "alert",
      className: `flex items-start gap-3 px-4 py-3 rounded-lg border text-sm shadow-md max-w-sm transition-all duration-200 ${variantClasses[toast.variant]}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "flex-1", children: toast.message }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onDismiss(toast.id),
            "aria-label": "Kapat",
            className: "shrink-0 opacity-60 hover:opacity-100 transition-opacity text-lg leading-none",
            children: "\xD7"
          }
        )
      ]
    }
  );
}
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);
  const show = useCallback((toast) => {
    const id = `toast-${++counter.current}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { show, dismiss }, children: [
    children,
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-live": "polite",
        className: "fixed top-4 right-4 z-[var(--z-toast,400)] flex flex-col gap-2",
        children: toasts.map((t) => /* @__PURE__ */ jsx(ToastItem, { toast: t, onDismiss: dismiss }, t.id))
      }
    )
  ] });
}
function ReconnectOverlay({ isVisible, onRetry }) {
  const [attempts, setAttempts] = useState(0);
  useEffect(() => {
    if (!isVisible) {
      setAttempts(0);
      return;
    }
    const id = setInterval(() => {
      setAttempts((a) => a + 1);
      onRetry?.();
    }, 3e3);
    return () => clearInterval(id);
  }, [isVisible, onRetry]);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "status",
      "aria-live": "assertive",
      className: "fixed inset-0 z-[var(--z-overlay,200)] flex items-center justify-center bg-black/60 backdrop-blur-sm",
      children: /* @__PURE__ */ jsxs("div", { className: "bg-[var(--sim-surface-elevated)] rounded-xl px-8 py-6 max-w-sm text-center shadow-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 mx-auto mb-4 rounded-full border-2 border-[var(--sim-accent)] border-t-transparent animate-spin" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-[var(--sim-text)]", children: "Ba\u011Flant\u0131 yeniden kuruluyor" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-[var(--sim-text-muted)]", children: [
          "Verileriniz g\xFCvende. Deneme ",
          attempts + 1,
          "..."
        ] })
      ] })
    }
  );
}
function LobbyScreen({
  sim,
  simLabel,
  sessionCode,
  participants,
  onStart,
  minParticipants = 2
}) {
  const canStart = participants.length >= minParticipants;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-sim": sim,
      className: "min-h-screen bg-[var(--sim-primary)] text-[var(--sim-text-inverse)] flex flex-col items-center justify-center px-6 py-12",
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-widest opacity-70 mb-3", children: simLabel }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-60 mb-2", children: "Oturum Kodu" }),
          /* @__PURE__ */ jsx("p", { className: "text-7xl font-bold font-mono tracking-[0.15em]", children: sessionCode })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm opacity-70", children: "Kat\u0131l\u0131mc\u0131lar" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: participants.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: [
            participants.map((p) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/10",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--connection-live-dot)]" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: p.name })
                ]
              },
              p.id
            )),
            participants.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm opacity-50 text-center py-4", children: "Kat\u0131l\u0131mc\u0131lar bekleniyor..." })
          ] })
        ] }),
        onStart && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onStart,
            disabled: !canStart,
            className: "mt-10 px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-150 bg-white text-[var(--sim-primary)] hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed",
            children: canStart ? "Sim\xFClasyonu Ba\u015Flat" : `En az ${minParticipants} kat\u0131l\u0131mc\u0131 gerekli`
          }
        )
      ]
    }
  );
}

export { LobbyScreen, ReconnectOverlay, SimTimer, ToastProvider, useToast };
