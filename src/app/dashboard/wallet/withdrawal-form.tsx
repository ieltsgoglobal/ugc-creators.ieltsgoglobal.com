"use client";

import { useActionState } from "react";
import { requestWithdrawal } from "./request-withdrawal";

export function WithdrawalForm({ requestId, availableBalancePaise, payoutVersion }: {
  requestId: string;
  availableBalancePaise: number;
  payoutVersion: string;
}) {
  const [result, submit, pending] = useActionState(requestWithdrawal, null);
  const activeRequestId = result && "nextRequestId" in result ? result.nextRequestId : requestId;
  const error = result && "error" in result ? result.error : null;

  return (
    <form action={submit} className="space-y-3">
      <input name="requestId" type="hidden" value={activeRequestId} />
      <input name="payoutVersion" type="hidden" value={payoutVersion} />
      <label className="grid gap-1.5 font-mono text-xs text-muted-foreground">
        Amount (INR)
        <input
          name="amount"
          type="number"
          inputMode="decimal"
          min="0.01"
          max={(availableBalancePaise / 100).toFixed(2)}
          step="0.01"
          required
          disabled={pending || availableBalancePaise === 0}
          placeholder="0.00"
          className="h-11 border border-foreground/15 bg-background/60 px-3 font-mono text-sm focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"
        />
      </label>
      <button type="submit" disabled={pending || availableBalancePaise === 0} className="min-h-10 bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50">
        {pending ? "Submitting…" : "Request withdrawal"}
      </button>
      <p role="status" className={error ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
        {error ?? (result && "message" in result ? result.message : availableBalancePaise === 0 ? "Your available balance is ₹0.00." : "")}
      </p>
    </form>
  );
}
