"use client";

import type { ComponentProps } from "react";

export default function Checkbox13({ label, checked, ...props }: Omit<ComponentProps<"input">, "type"> & { label: string }) {
  return (
    <label className={`hover:bg-accent/40 flex items-start gap-3 rounded-2xl border p-3.5 shadow-xs transition-colors ${checked ? "border-emerald-600/70 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950" : "border-border/70 bg-background"}`}>
      <input {...props} type="checkbox" checked={checked} className="mt-0.5 size-4 shrink-0 accent-emerald-600" />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
