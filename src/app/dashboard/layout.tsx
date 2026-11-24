import { Suspense, type ReactNode } from "react";
import { CreatorShell } from "@/components/watermelon/creator-shell";
import { getAuthenticatedUser } from "@/lib/auth";

async function DashboardShell({ children }: { children: ReactNode }) {
  const user = await getAuthenticatedUser();
  return <CreatorShell account={user ? { name: user.name, email: user.email } : null}>{children}</CreatorShell>;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p role="status" className="p-8 text-sm text-muted-foreground">Loading dashboard…</p>}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
