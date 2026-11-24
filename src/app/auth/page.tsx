import type { Metadata } from "next";
import Auth11 from "@/components/ui/auth-11";
import { CreatorEntryShell } from "@/components/watermelon/onboarding-setup";

export const metadata: Metadata = {
  title: "Creator Sign In | IELTS Go Global",
};

export default function AuthPage() {
  return (
    <CreatorEntryShell>
      <Auth11 />
    </CreatorEntryShell>
  );
}
