import type { Metadata } from "next";
import Link from "next/link";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { CreatorEntryShell } from "@/components/watermelon/onboarding-setup";

export const metadata: Metadata = { title: "Terms & Conditions | IELTS GoGlobal" };

export default function TermsPage() {
  return (
    <CreatorEntryShell>
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <CreatorPageHero title="Terms & Conditions">
          <p className="mt-3 text-sm text-muted-foreground">Participation in the IELTS GoGlobal Creator Program.</p>
        </CreatorPageHero>
        <div className="space-y-5 text-sm leading-relaxed">
          <CreatorPanel title="Applying to the program">
            <p className="text-muted-foreground">You must be at least 18 and provide accurate application information. The program reviews applications before approval. Use your own sign-in and keep your account details private.</p>
          </CreatorPanel>
          <CreatorPanel title="Creating and promoting content">
            <p className="text-muted-foreground">Publish original content or obtain permission for the material you use. Clearly disclose your relationship with IELTS GoGlobal when promoting it or sharing a commission-earning link. Describe the service accurately and avoid promises about exam scores or earnings.</p>
          </CreatorPanel>
          <CreatorPanel title="Referral sales and earnings">
            <p className="text-muted-foreground">Share the referral link assigned to you. Eligible subscription purchases attributed to that link may earn commission under the program terms communicated to you. Referrals shows recorded subscription sales. Wallet shows amounts that have been credited and are available for withdrawal.</p>
          </CreatorPanel>
          <CreatorPanel title="Withdrawal requests">
            <p className="text-muted-foreground">Enter an accurate UPI ID or PayPal address and check it before requesting a withdrawal. The requested amount is reserved while the request is pending. Payouts are processed manually. If a request is rejected, the reserved amount returns to your available balance.</p>
          </CreatorPanel>
          <CreatorPanel title="Questions">
            <p className="text-muted-foreground">For questions about program participation, a sale, or a withdrawal, contact IELTS GoGlobal through the <a href="https://ieltsgoglobal.com/" className="underline underline-offset-4">main website</a>.</p>
          </CreatorPanel>
        </div>
        <Link href="/privacy" className="inline-flex font-mono text-xs underline underline-offset-4">Read the Privacy Policy</Link>
      </div>
    </CreatorEntryShell>
  );
}
