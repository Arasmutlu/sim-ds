import { useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/entry/SessionEntry.tsx
function SessionEntry({
  sim,
  simLabel,
  roles,
  onJoin,
  isLoading = false,
  error = null
}) {
  const [pin, setPin] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState(roles?.[0] ?? "");
  async function handleSubmit(e) {
    e.preventDefault();
    if (!pin.trim() || !displayName.trim()) return;
    await onJoin({ pin: pin.trim(), displayName: displayName.trim(), role: role || void 0 });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-sim": sim,
      className: "min-h-screen bg-[var(--sim-surface)] flex items-center justify-center px-4",
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-[var(--sim-text)] mb-1", children: simLabel }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--sim-text-muted)] mb-8", children: "Oturuma kat\u0131l" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-[var(--sim-text-muted)] mb-1.5", children: "Oturum Kodu" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: pin,
                onChange: (e) => setPin(e.target.value.toUpperCase()),
                placeholder: "XXXX",
                maxLength: 8,
                required: true,
                className: "w-full px-3 py-2.5 rounded-lg border border-[var(--sim-border)] bg-[var(--sim-input-bg,#fff)] text-[var(--sim-text)] font-mono tracking-widest text-center text-lg placeholder:text-[var(--sim-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--sim-input-focus)] focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-[var(--sim-text-muted)] mb-1.5", children: "Ad\u0131n\u0131z" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: displayName,
                onChange: (e) => setDisplayName(e.target.value),
                placeholder: "Ad\u0131n\u0131z\u0131 girin",
                required: true,
                className: "w-full px-3 py-2.5 rounded-lg border border-[var(--sim-border)] bg-[var(--sim-input-bg,#fff)] text-[var(--sim-text)] placeholder:text-[var(--sim-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--sim-input-focus)] focus:border-transparent"
              }
            )
          ] }),
          roles && roles.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-[var(--sim-text-muted)] mb-1.5", children: "Rol" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: role,
                onChange: (e) => setRole(e.target.value),
                className: "w-full px-3 py-2.5 rounded-lg border border-[var(--sim-border)] bg-[var(--sim-input-bg,#fff)] text-[var(--sim-text)] focus:outline-none focus:ring-2 focus:ring-[var(--sim-input-focus)] focus:border-transparent",
                children: roles.map((r) => /* @__PURE__ */ jsx("option", { value: r, children: r }, r))
              }
            )
          ] }),
          error && /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--toast-critical-text)] bg-[var(--toast-critical-bg)] border border-[var(--toast-critical-border)] px-3 py-2 rounded-lg", children: error }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: isLoading || !pin.trim() || !displayName.trim(),
              className: "w-full py-3 rounded-lg font-semibold text-sm bg-[var(--sim-primary)] text-[var(--sim-text-inverse)] hover:bg-[var(--sim-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150",
              children: isLoading ? "Kat\u0131l\u0131yor..." : "Kat\u0131l"
            }
          )
        ] })
      ] })
    }
  );
}

export { SessionEntry };
