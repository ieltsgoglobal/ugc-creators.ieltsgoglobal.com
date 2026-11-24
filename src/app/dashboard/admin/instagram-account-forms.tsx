"use client";

import { useActionState } from "react";
import { assignInstagramAccount, createInstagramAccount } from "./instagram-account-actions";

const fieldClass = "h-10 w-full min-w-0 border border-foreground/15 bg-background/60 px-3 font-mono text-sm focus-visible:outline-2 focus-visible:outline-ring";
const buttonClass = "h-10 w-fit bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50";

function ActionFeedback({ result }: { result: { message: string; error?: true } | null }) {
  return (
    <p aria-live="polite" className={result?.error ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
      {result?.message}
    </p>
  );
}

export function AddInstagramAccountForm() {
  const [result, submit, pending] = useActionState(createInstagramAccount, null);

  return (
    <form action={submit} className="space-y-3">
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="grid gap-1.5 text-sm font-medium">
          Instagram username
          <input name="username" className={fieldClass} required maxLength={31} autoCapitalize="none" autoComplete="off" spellCheck={false} placeholder="@username" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Password
          <input name="password" type="password" className={fieldClass} required maxLength={256} autoComplete="new-password" />
        </label>
        <button type="submit" disabled={pending} className={buttonClass}>{pending ? "Adding…" : "Add account"}</button>
      </div>
      <ActionFeedback result={result} />
    </form>
  );
}

type AssignmentOption = { id: string; label: string };

export function AssignInstagramAccountForm({ accounts, creators }: {
  accounts: AssignmentOption[];
  creators: AssignmentOption[];
}) {
  const [result, submit, pending] = useActionState(assignInstagramAccount, null);
  const canAssign = accounts.length > 0 && creators.length > 0;

  return (
    <form action={submit} className="space-y-3">
      {canAssign ? (
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label className="grid gap-1.5 text-sm font-medium">
            Available account
            <select name="accountId" className={fieldClass} defaultValue="" required>
              <option value="" disabled>Select an account</option>
              {accounts.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Approved creator
            <select name="creatorId" className={fieldClass} defaultValue="" required>
              <option value="" disabled>Select a creator</option>
              {creators.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <button type="submit" disabled={pending} className={buttonClass}>{pending ? "Assigning…" : "Assign account"}</button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {accounts.length === 0 ? "Add an available Instagram account to assign it." : "No approved creators with a linked user account are waiting for an assignment."}
        </p>
      )}
      <ActionFeedback result={result} />
    </form>
  );
}
