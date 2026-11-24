import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { database } from "@/lib/database";
import { CreatorEntryShell } from "@/components/watermelon/onboarding-setup";
import OnboardingForm from "./_components/onboarding-form";

export const metadata: Metadata = {
  title: "Creator Onboarding | IELTS Go Global",
};

export default function OnboardingPage() {
  return (
    <CreatorEntryShell>
      <Suspense fallback={<p role="status">Loading onboarding…</p>}>
        <AuthenticatedOnboarding />
      </Suspense>
    </CreatorEntryShell>
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
