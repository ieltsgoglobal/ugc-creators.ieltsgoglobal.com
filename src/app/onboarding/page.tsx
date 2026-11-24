import type { Metadata } from "next";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import CreatorOnboarding from "./creator-onboarding";

export const metadata: Metadata = {
  title: "Creator Onboarding | IELTS Go Global",
};

export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col px-4 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-24">
        <CreatorOnboarding />
      </main>
      <Footer />
    </>
  );
}
