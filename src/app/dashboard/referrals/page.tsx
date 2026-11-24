import { createHash } from "node:crypto";
import type { Metadata } from "next";
import { ShoppingBag, Ticket } from "lucide-react";
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
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <CreatorPanel title="Your referral code" icon={<Ticket />}>
          <ReferralCode code={referralCode} />
        </CreatorPanel>

        <CreatorPanel title="Subscriptions sold" icon={<ShoppingBag />}>
          <div className="border-l-2 border-primary/50 bg-primary/5 px-4 py-3">
            <p className="font-mono text-3xl font-bold tabular-nums">{sampleSubscriptionsSold}</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Sample subscription count.</p>
        </CreatorPanel>
      </div>
    </div>
  );
}
