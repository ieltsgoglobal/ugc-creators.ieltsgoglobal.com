import { createHash } from "node:crypto";
import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { getCreatorAccount } from "../_lib/creator-data";
import { ReferralCode } from "./referral-code";

export const metadata: Metadata = { title: "Referrals | IELTS GoGlobal" };

const sampleSubscriptionsSold = 12;

export default async function ReferralsPage() {
  const account = await getCreatorAccount();
  const codeSuffix = createHash("sha256").update(account.id).digest("hex").slice(0, 12).toUpperCase();
  const referralCode = `IELTS-${codeSuffix}`;

  return (
    <div className="space-y-5">
      <CreatorPageHero title="Referrals" />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <CreatorPanel title="Your referral code">
          <p className="mb-4 text-sm text-muted-foreground">Preview your personal referral code.</p>
          <ReferralCode code={referralCode} />
        </CreatorPanel>

        <CreatorPanel title="Subscriptions sold">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center border border-primary/25 bg-primary/10 text-green-700 dark:text-primary">
              <ShoppingBag aria-hidden="true" className="size-5" />
            </span>
            <p className="font-mono text-3xl font-bold tabular-nums">{sampleSubscriptionsSold}</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Sample data. Live sales tracking is not connected.</p>
        </CreatorPanel>
      </div>
    </div>
  );
}
