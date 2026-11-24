"use client";

import type { ComponentProps } from "react";

export default function Checkbox13({ label, checked, ...props }: Omit<ComponentProps<"input">, "type"> & { label: string }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 border p-3.5 transition-colors hover:border-primary/50 focus-within:outline-2 focus-within:outline-ring ${checked ? "border-primary/50 bg-primary/10" : "border-border/70 bg-background"}`}>
      <input {...props} type="checkbox" checked={checked} className="mt-0.5 size-4 shrink-0 accent-primary" />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
