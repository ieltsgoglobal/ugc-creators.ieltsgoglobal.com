import type { Metadata } from "next";
import { ChevronDown, CircleHelp } from "lucide-react";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { getCreatorAccount } from "../_lib/creator-data";

export const metadata: Metadata = { title: "Creator FAQ | IELTS GoGlobal" };

const questions = [
  { question: "How do I earn as an IELTS GoGlobal creator?", answer: "Share your assigned referral link in your original content. Eligible subscription sales through that link can earn commission. A sale in Referrals and a credit in Wallet are tracked separately." },
  { question: "Where do I find my referral link?", answer: "Open Referrals to view and copy your assigned link. If the page says a link hasn’t been assigned, check your application status in the dashboard." },
  { question: "How much do I earn per subscription?", answer: "A commission rate isn’t shown in the dashboard yet. Use Wallet to see earnings that have actually been credited to you." },
  { question: "Why is a subscription missing from my dashboard?", answer: "Referrals shows sales once they have been recorded for your link. A click or a signup by itself won’t appear as a subscription sale." },
  { question: "What kind of videos should I make?", answer: "Focus on one practical IELTS topic per video. For example, walk through a speaking answer or explain a common writing mistake. Use the Creator Guide for inspiration and put the idea in your own words." },
  { question: "How do I request a withdrawal?", answer: "In Wallet, save your UPI ID or PayPal address, then enter an amount up to your available balance. Check the destination shown before submitting." },
  { question: "What happens to a pending or rejected withdrawal?", answer: "A pending request reserves the amount while Admin reviews it. If the request is paid, it appears as Paid in Wallet. If it’s rejected, the reserved funds return to your available balance." },
];

export default async function CreatorFaqPage() {
  await getCreatorAccount();

  return (
    <div className="space-y-5">
      <CreatorPageHero title="Creator FAQ" />
      <CreatorPanel title="Common questions" icon={<CircleHelp />}>
        <div className="divide-y divide-border border-y border-border">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-sm font-semibold hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-green-700 group-open:rotate-180 dark:text-primary" />
              </summary>
              <p className="max-w-2xl px-3 pb-4 text-sm leading-relaxed text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </CreatorPanel>
    </div>
  );
}
