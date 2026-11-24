"use client";

import { useActionState } from "react";
import { resolveWithdrawal } from "./resolve-withdrawal";

export function WithdrawalControls({ id, amount }: { id: string; amount: string }) {
  const [result, submit, pending] = useActionState(resolveWithdrawal, null);

  return (
    <form
      action={submit}
      className="space-y-2"
      onSubmit={(event) => {
        const submitter = (event.nativeEvent as SubmitEvent).submitter;
        if (!(submitter instanceof HTMLButtonElement)) {
          event.preventDefault();
          return;
        }
        const question = submitter.value === "PAID"
          ? `Confirm that you have already paid ${amount} outside the app.`
          : `Reject this request and return ${amount} to the creator’s wallet?`;
        if (!window.confirm(question)) event.preventDefault();
      }}
    >
      <input type="hidden" name="withdrawalId" value={id} />
      <div className="flex flex-wrap gap-2">
        <button type="submit" name="status" value="PAID" disabled={pending} className="min-h-10 bg-primary px-3 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50">
          Mark paid
        </button>
        <button type="submit" name="status" value="REJECTED" disabled={pending} className="min-h-10 border border-border px-3 font-mono text-xs font-medium hover:border-destructive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50">
          Reject &amp; return funds
        </button>
      </div>
      <p role="status" className={result?.error ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
        {pending ? "Saving…" : result?.message}
      </p>
    </form>
  );
}
