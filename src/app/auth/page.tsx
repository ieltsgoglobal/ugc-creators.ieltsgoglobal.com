import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import Auth11 from "@/components/ui/auth-11";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { CreatorEntryShell } from "@/components/watermelon/onboarding-setup";
import { getAuthenticatedUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Creator Sign In | IELTS Go Global",
};

export default function AuthPage() {
  return (
    <CreatorEntryShell>
      <Suspense fallback={<p role="status" className="mx-auto text-sm text-muted-foreground">Checking sign-in…</p>}>
        <SignInContent />
      </Suspense>
    </CreatorEntryShell>
  );
}

async function SignInContent() {
  const user = await getAuthenticatedUser();
  if (!user) return <Auth11 />;

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-5">
      <CreatorPageHero title={`Welcome back, ${user.name}`} />
      <CreatorPanel title="You’re signed in">
        <Link href="/dashboard" className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          Go to dashboard <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </CreatorPanel>
    </div>
  );
}
