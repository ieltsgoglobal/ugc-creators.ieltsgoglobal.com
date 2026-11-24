"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function ReferralLink({ url }: { url: string }) {
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  const copied = feedback === "copied";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setFeedback("copied");
    } catch {
      setFeedback("failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-2">
        <code className="grid min-h-11 min-w-0 flex-1 select-all place-items-center wrap-anywhere border border-primary/25 bg-primary/5 px-3 text-center font-mono text-sm sm:text-lg font-semibold tracking-wide">
          {url}
        </code>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p role="status" className={feedback === "failed" ? "mt-2 text-sm text-muted-foreground" : "sr-only"}>
        {copied ? "Referral link copied." : feedback === "failed" ? "Couldn't copy automatically. Select the link to copy it manually." : ""}
      </p>
    </div>
  );
}
