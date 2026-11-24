import type { Metadata } from "next";
import Link from "next/link";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { CreatorEntryShell } from "@/components/watermelon/onboarding-setup";

export const metadata: Metadata = { title: "Privacy Policy | IELTS GoGlobal" };

export default function PrivacyPage() {
  return (
    <CreatorEntryShell>
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <CreatorPageHero title="Privacy Policy">
          <p className="mt-3 text-sm text-muted-foreground">How the IELTS GoGlobal Creator Program handles information in this portal.</p>
        </CreatorPageHero>
        <div className="text-sm leading-relaxed text-muted-foreground">
          <div className="space-y-5">
            <CreatorPanel title="Information we collect and use">
              <ul className="list-disc space-y-2 pl-5">
                <li><strong className="text-foreground">Sign-in.</strong> We receive your name, verified email address, and account identifier from Google to create and recognize your account. The portal uses a session cookie to keep you signed in.</li>
                <li><strong className="text-foreground">Application.</strong> We use the contact details, location, age confirmation, social profiles, audience information, and answers you provide to review your application and administer the program.</li>
                <li><strong className="text-foreground">Referrals and payouts.</strong> We record assigned links, attributed subscriptions, wallet entries, and withdrawal decisions. We store the UPI ID or PayPal address you provide and copy it onto each new withdrawal request so the payout can be sent to the selected destination.</li>
              </ul>
            </CreatorPanel>
            <CreatorPanel title="Who can see information">
              <p>Google processes sign-in. UPI or PayPal may process payouts sent by the program. In this version of the portal, the Admin page can be reached without signing in. It displays selected application details and creator names on withdrawal requests. Pending withdrawals also show the saved payout destination.</p>
            </CreatorPanel>
            <CreatorPanel title="Your details and requests">
              <p>You can update your payout method in Wallet. An update applies to future requests. To ask about your information, request a correction or deletion, or raise a privacy concern, contact IELTS GoGlobal through the <a href="https://ieltsgoglobal.com/" className="underline underline-offset-4">main website</a>.</p>
            </CreatorPanel>
          </div>
        </div>
        <Link href="/terms" className="inline-flex font-mono text-xs underline underline-offset-4">Read the Terms &amp; Conditions</Link>
      </div>
    </CreatorEntryShell>
  );
}
