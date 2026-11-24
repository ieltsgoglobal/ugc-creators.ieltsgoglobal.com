import { Activity, ArrowUpRight, ShoppingBag, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationStatus, CreatorMetrics, CreatorPanel, CreatorPageHero } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { formatSubmissionDate, getCreatorAccount, getCreatorProfile } from "./_lib/creator-data";

export const metadata: Metadata = { title: "Creator Dashboard | IELTS GoGlobal" };

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
const overviewLink = "mt-4 inline-flex items-center gap-2 border-t border-foreground/10 pt-3 font-mono text-xs font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default async function DashboardPage() {
  const [account, profile] = await Promise.all([getCreatorAccount(), getCreatorProfile()]);
  const where = { userId: account.id };
  const [referral, balance, pendingWithdrawals] = await database.$transaction([
    database.creatorReferral.findUnique({
      where,
      select: { _count: { select: { subscriptions: true } } },
    }),
    database.creatorWalletTransaction.aggregate({
      where,
      _sum: { amountPaise: true },
    }),
    database.creatorWithdrawalRequest.count({ where: { ...where, status: "PENDING" } }),
  ]);

  return (
    <div className="space-y-5">
      <CreatorPageHero title={`Welcome, ${profile?.fullName || account.name}`} />
      <ApplicationStatus
        overview
        submittedDate={profile ? formatSubmissionDate(profile.submittedAt) : undefined}
        approvedDate={profile?.approvedAt ? formatSubmissionDate(profile.approvedAt) : undefined}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <CreatorPanel title="Referral subscriptions" icon={<ShoppingBag />}>
          <p className="font-mono text-3xl font-bold tracking-tight tabular-nums">
            {(referral?._count.subscriptions ?? 0).toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {referral ? "Subscriptions sold through your referral link." : "A referral link hasn’t been assigned yet."}
          </p>
          <Link href="/dashboard/referrals" className={overviewLink}>
            View referrals <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </CreatorPanel>

        <CreatorPanel title="Available wallet balance" icon={<Wallet />}>
          <p className="wrap-break-word font-mono text-3xl font-bold tracking-tight tabular-nums">
            {currency.format((balance._sum.amountPaise ?? 0) / 100)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {pendingWithdrawals === 0
              ? "No pending withdrawals."
              : `${pendingWithdrawals} pending ${pendingWithdrawals === 1 ? "withdrawal" : "withdrawals"}.`}
          </p>
          <Link href="/dashboard/wallet" className={overviewLink}>
            View wallet <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </CreatorPanel>
      </div>

      {profile && (
        <CreatorPanel title="Creator snapshot" icon={<Activity />}>
          <CreatorMetrics followers={profile.followers} weeklyVideos={profile.weeklyVideos} />
        </CreatorPanel>
      )}
    </div>
  );
}
