import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ListChecks, Play, Wallet } from "lucide-react";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { getCreatorAccount } from "../_lib/creator-data";

export const metadata: Metadata = { title: "Creator Guide | IELTS GoGlobal" };

const creatorSteps = [
  { title: "Apply for the program", description: "Complete your creator application and check its status in the dashboard.", href: "/dashboard/application", linkLabel: "View application" },
  { title: "Get your referral link", description: "Once your link is assigned, copy it from Referrals and share it wherever your audience can find it.", href: "/dashboard/referrals", linkLabel: "Open referrals" },
  { title: "Make original IELTS content", description: "Film an exam-day POV, a skit about a speaking-test moment, a reaction, or a story from your prep. Tips and demos work too. Disclose your relationship when sharing your referral link." },
  { title: "Earn from eligible sales", description: "An eligible subscription bought through your assigned link can earn a commission. Recorded sales appear in Referrals, and credited earnings appear in Wallet." },
];

const inspirationProfiles = [
  { handle: "ieltsgoglobal", url: "https://www.instagram.com/ieltsgoglobal/" },
  { handle: "ieltsmanager99", url: "https://www.instagram.com/ieltsmanager99/" },
  { handle: "ieltswithrizza", url: "https://www.instagram.com/ieltswithrizza/" },
];

const textLink = "inline-flex items-center gap-1.5 font-mono text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default async function CreatorGuidePage() {
  await getCreatorAccount();

  return (
    <div className="space-y-5">
      <CreatorPageHero title="Creator guide">
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">How to promote IELTS GoGlobal, track referral sales, and withdraw earnings.</p>
      </CreatorPageHero>
      <CreatorPanel title="How it works" icon={<ListChecks />}>
        <ol className="grid gap-3 sm:grid-cols-2">
          {creatorSteps.map((step, index) => (
            <li key={step.title} className="border border-foreground/10 bg-foreground/[0.025] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <span className="font-mono text-xs text-green-700 dark:text-primary">{index + 1}.</span> {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              {step.href && <Link href={step.href} className={`mt-3 ${textLink}`}>{step.linkLabel} <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>}
            </li>
          ))}
        </ol>
      </CreatorPanel>
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <CreatorPanel title="Instagram inspiration" icon={<Play />}>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">Look at how creators hook viewers, set up a relatable moment, and land a punchline or takeaway. Use the format as inspiration and make the story your own.</p>
          <ul className="divide-y divide-border border-y border-border">
            {inspirationProfiles.map(({ handle, url }) => (
              <li key={handle}>
                <a href={url} className="flex min-h-11 items-center justify-between gap-3 px-2 font-mono text-sm hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-ring">
                  @{handle}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-green-700 dark:text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </CreatorPanel>
        <CreatorPanel title="Withdraw earnings" icon={<Wallet />}>
          <p className="text-sm leading-relaxed text-muted-foreground">Save a UPI ID or PayPal address in Wallet and request a withdrawal from your available balance. The amount is reserved while Admin processes the payout manually.</p>
          <Link href="/dashboard/wallet" className={`mt-3 ${textLink}`}>Open wallet <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>
        </CreatorPanel>
      </div>
    </div>
  );
}
