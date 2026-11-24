import { Suspense, type ReactNode } from "react";
import { CreatorShell } from "@/components/watermelon/creator-shell";
import { getCreatorAccount } from "./_lib/creator-data";

async function SignedInDashboard({ children }: { children: ReactNode }) {
  const { name, email } = await getCreatorAccount();
  return <CreatorShell account={{ name, email }}>{children}</CreatorShell>;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p role="status" className="p-8 text-sm text-muted-foreground">Loading dashboard…</p>}>
      <SignedInDashboard>{children}</SignedInDashboard>
    </Suspense>
  );
}
