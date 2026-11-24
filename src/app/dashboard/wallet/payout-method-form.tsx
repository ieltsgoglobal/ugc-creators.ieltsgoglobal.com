"use client";

import { useActionState, useState } from "react";
import { AtSign, Check, Smartphone } from "lucide-react";
import { CreatorFrameCorners } from "@/components/watermelon/creator-panels";
import { savePayoutMethod } from "./save-payout-method";

type PayoutMethod = "UPI" | "PAYPAL";

const fieldClass = "min-h-11 w-full border border-foreground/15 bg-background/60 px-3 font-mono text-sm hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-ring";
const destinationLabels = { UPI: "UPI ID", PAYPAL: "PayPal email" };

export function PayoutMethodForm({ saved }: {
  saved: { payoutMethod: PayoutMethod; payoutDestination: string } | null;
}) {
  const [method, setMethod] = useState<PayoutMethod>(saved?.payoutMethod === "PAYPAL" ? "PAYPAL" : "UPI");
  const [result, submit, pending] = useActionState(savePayoutMethod, null);

  return (
    <form action={submit} className="space-y-3">
      <fieldset className="min-w-0 space-y-2">
        <legend className="font-mono text-xs text-muted-foreground">Payout provider</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["UPI", "PAYPAL"] as const).map((option) => {
            const Icon = option === "UPI" ? Smartphone : AtSign;
            return (
              <label key={option} className="relative min-w-0 cursor-pointer">
                <input type="radio" name="method" value={option} checked={method === option}
                  onChange={() => setMethod(option)} className="peer sr-only" />
                <span className="flex min-h-14 items-center gap-2 border border-foreground/15 px-3 font-mono text-sm hover:border-primary/50 peer-checked:border-primary/50 peer-checked:bg-primary/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-green-700 dark:text-primary" />
                  {option === "UPI" ? "UPI" : "PayPal"}
                  {method === option && <Check aria-hidden="true" className="ml-auto size-4 shrink-0 text-green-700 dark:text-primary" />}
                </span>
                <CreatorFrameCorners />
              </label>
            );
          })}
        </div>
      </fieldset>
      <label className="grid gap-1.5 font-mono text-xs text-muted-foreground">
        {destinationLabels[method]}
        <input key={method} name="destination" type={method === "PAYPAL" ? "email" : "text"} required maxLength={180}
          defaultValue={method === saved?.payoutMethod ? saved.payoutDestination : ""}
          placeholder={method === "UPI" ? "name@provider" : "name@example.com"} className={fieldClass} />
      </label>
      <button type="submit" disabled={pending} className="min-h-10 bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50">
        {pending ? "Saving…" : "Save payout method"}
      </button>
      <p role="status" className={result?.error ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>{result?.message}</p>
    </form>
  );
}
