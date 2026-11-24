import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { database } from "@/lib/database";
import Link from "next/link";
import LogoIcon from "@/assets/logo-icon";
import { ThemeToggle } from "@/components/watermelon/templates/landing-01/landing/navbar";
import OnboardingForm from "./_components/onboarding-form";

export const metadata: Metadata = {
  title: "Creator Onboarding | IELTS Go Global",
};

export default function OnboardingPage() {
  return (
    <>
      <header className="border-b border-foreground/10 bg-background dark:bg-[#101010]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest uppercase focus-visible:outline-2 focus-visible:outline-ring sm:text-sm">
            <LogoIcon className="size-8 text-green-700 dark:text-primary" /> IELTS Go Global
          </Link>
          <ThemeToggle className="rounded-none border-foreground/15" />
        </div>
      </header>
      <main className="flex flex-1 flex-col bg-[radial-gradient(circle_at_center,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] px-4 py-8 sm:px-8 sm:py-12 dark:bg-[#101010]">
        <Suspense fallback={<p role="status">Loading onboarding…</p>}>
          <AuthenticatedOnboarding />
        </Suspense>
      </main>
    </>
  );
}

async function AuthenticatedOnboarding() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/auth");
  const application = await database.creatorProfile.findFirst({
    where: { OR: [{ userId: user.id }, { userId: null, email: user.email }] },
    select: { id: true },
  });
  return <OnboardingForm
    fullName={user.name}
    email={user.email}
    hasApplication={Boolean(application)}
  />;
}
