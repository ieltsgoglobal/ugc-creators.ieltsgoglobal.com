"use client";

import { useActionState, useState } from "react";
import { assignReferral } from "./assign-referral";

type CreatorOption = { id: string; name: string; url: string | null; code: string | null };

const fieldClass = "min-h-11 w-full min-w-0 border border-foreground/15 bg-background/60 px-3 font-mono text-sm focus-visible:outline-2 focus-visible:outline-ring";

export function ReferralAssignmentForm({ creators }: { creators: CreatorOption[] }) {
  const [selectedId, setSelectedId] = useState("");
  const [result, submit, pending] = useActionState(assignReferral, null);
  const selected = creators.find(({ id }) => id === selectedId);

  return (
    <form action={submit} className="space-y-3">
      <div className="grid items-end gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 font-mono text-xs text-muted-foreground">
          Creator
          <select name="userId" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} required className={fieldClass}>
            <option value="" disabled>Select a creator</option>
            {creators.map(({ id, name, code }) => (
              <option key={id} value={id}>{name}{code ? " · Assigned" : ""}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 font-mono text-xs text-muted-foreground">
          Referral code
          <input key={selectedId} name="code" defaultValue={selected?.code ?? ""} required
            maxLength={128} spellCheck={false} className={fieldClass} />
        </label>
        <button type="submit" disabled={pending} className="min-h-11 bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50">
          {pending ? "Saving…" : selected?.code ? "Update link" : "Create link"}
        </button>
      </div>
      {selected?.code && selected.url && (
        <p className="break-all font-mono text-xs text-muted-foreground">{selected.url}</p>
      )}
      <p role="status" className={result?.error ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>{result?.message}</p>
    </form>
  );
}
