import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { database } from "@/lib/database";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import OnboardingForm from "./_components/onboarding-form";
import { getOnboardingPageDetails } from "./_lib/onboarding-server-functions";

export const metadata: Metadata = {
  title: "Creator Onboarding | IELTS Go Global",
};

export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col px-4 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-24">
        <Suspense fallback={<p role="status">Loading onboarding…</p>}>
          <AuthenticatedOnboarding />
        </Suspense>
      </main>
      <Footer />
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
    {...getOnboardingPageDetails()}
    fullName={user.name}
    email={user.email}
    hasApplication={Boolean(application)}
  />;
}
