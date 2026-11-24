import type { Metadata } from "next";
import Auth11 from "@/components/ui/auth-11";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import { getOnboardingPageDetails } from "../onboarding/_lib/onboarding-server-functions";

export const metadata: Metadata = {
  title: "Creator Sign In | IELTS Go Global",
};

export default function AuthPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col px-4 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-24">
        <Auth11 {...getOnboardingPageDetails()} />
      </main>
      <Footer />
    </>
  );
}
