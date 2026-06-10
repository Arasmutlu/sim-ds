import { jsx, jsxs } from 'react/jsx-runtime';

// src/shells/ParticipantShell.tsx
var maxWidthClass = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  full: "max-w-full"
};
function ParticipantShell({
  sim,
  maxWidth = "lg",
  children,
  className = "",
  style
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-sim": sim,
      className: `w-full text-[var(--sim-text)] ${maxWidthClass[maxWidth]} mx-auto ${className}`,
      style,
      children
    }
  );
}
function FacilitatorShell({
  sim,
  simLabel,
  sessionCode,
  isLive,
  children
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-sim": sim,
      className: "min-h-screen bg-[var(--sim-surface)] text-[var(--sim-text)] flex flex-col",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "h-14 px-6 flex items-center justify-between border-b border-[var(--sim-border)] bg-[var(--sim-surface-elevated)] shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm text-[var(--sim-text)]", children: simLabel }),
            /* @__PURE__ */ jsx("span", { className: "text-[var(--sim-text-muted)] text-sm", children: "|" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-sm font-medium tracking-widest text-[var(--sim-text)]", children: sessionCode })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${isLive ? "bg-[var(--connection-live-bg)] text-[var(--connection-live-text)]" : "bg-[var(--connection-lost-bg)] text-[var(--connection-lost-text)]"}`, children: [
            /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${isLive ? "bg-[var(--connection-live-dot)]" : "bg-[var(--connection-lost-dot)]"}` }),
            isLive ? "Canl\u0131" : "Ba\u011Flant\u0131 yok"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 grid grid-cols-[65fr_35fr] overflow-hidden", children }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden fixed inset-0 z-50 flex items-center justify-center bg-[var(--sim-surface)] px-6 text-center", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-[var(--sim-text)]", children: "Facilitat\xF6r ekran\u0131" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[var(--sim-text-muted)]", children: "Bu ekran tablet veya masa\xFCst\xFC gerektirir." })
        ] }) })
      ]
    }
  );
}
function StratejiBoardShell({
  sim,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-sim": sim,
      className: `min-h-screen w-full bg-[var(--sim-surface)] text-[var(--sim-text)] flex flex-col ${className}`,
      children
    }
  );
}

export { FacilitatorShell, ParticipantShell, StratejiBoardShell };
