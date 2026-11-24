import type { Metadata } from "next";
import { ChartColumn, Clock3, ShoppingBag, Ticket } from "lucide-react";
import { CreatorPageHero, CreatorPanel } from "@/components/watermelon/creator-panels";
import { database } from "@/lib/database";
import { getCreatorAccount } from "../_lib/creator-data";
import { ReferralLink } from "./referral-link";

export const metadata: Metadata = { title: "Referrals | IELTS GoGlobal" };

const activityLimit = 20;
const chartDays = 7;
const dayInMilliseconds = 86_400_000;
const chartTimeZone = "Asia/Kolkata";
const chartDayKey = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: chartTimeZone,
});
const chartDayLabel = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
  timeZone: chartTimeZone,
});
const activityDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: chartTimeZone,
});

export default async function ReferralsPage() {
  const account = await getCreatorAccount();
  const referral = await database.creatorReferral.findUnique({
    where: { userId: account.id },
    select: {
      id: true,
      url: true,
      _count: { select: { subscriptions: true } },
      subscriptions: {
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        take: activityLimit,
        select: { id: true, subscribedAt: true, createdAt: true },
      },
    },
  });

  const subscriptionsSold = referral?._count.subscriptions ?? 0;
  const activity = referral?.subscriptions ?? [];
  const today = new Date(`${chartDayKey.format(new Date())}T00:00:00+05:30`);
  const chartStart = new Date(today.getTime() - (chartDays - 1) * dayInMilliseconds);
  const chartEnd = new Date(today.getTime() + dayInMilliseconds);
  const recentSubscriptions = referral ? await database.subscription.findMany({
    where: { creatorReferralId: referral.id, createdAt: { gte: chartStart, lt: chartEnd } },
    select: { createdAt: true },
  }) : [];
  const countsByDay = new Map<string, number>();
  for (const { createdAt } of recentSubscriptions) {
    const key = chartDayKey.format(createdAt);
    countsByDay.set(key, (countsByDay.get(key) ?? 0) + 1);
  }

  const days = Array.from({ length: chartDays }, (_, index) => {
    const date = new Date(chartStart.getTime() + index * dayInMilliseconds);
    const key = chartDayKey.format(date);
    return { key, label: chartDayLabel.format(date), count: countsByDay.get(key) ?? 0 };
  });
  const peak = Math.max(1, ...days.map(({ count }) => count));

  return (
    <div className="space-y-5">
      <CreatorPageHero title="Referrals" />
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <CreatorPanel title="Your referral link" icon={<Ticket />}>
          {referral ? <ReferralLink url={referral.url} /> : (
            <p className="text-sm text-muted-foreground">Your referral link hasn’t been assigned yet.</p>
          )}
        </CreatorPanel>

        <CreatorPanel title="Subscriptions sold" icon={<ShoppingBag />}>
          <div className="border-l-2 border-primary/50 bg-primary/5 px-4 py-3">
            <p className="font-mono text-3xl font-bold tabular-nums">{subscriptionsSold.toLocaleString("en-IN")}</p>
          </div>
        </CreatorPanel>
      </div>

      <CreatorPanel title="Subscriptions added per day" icon={<ChartColumn />}>
        <p className="mb-4 font-mono text-xs text-muted-foreground">Last 7 days · IST</p>
        {recentSubscriptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No subscriptions were added in this period.</p>
        ) : (
          <ol aria-label="Daily subscription counts" className="grid grid-cols-7 gap-1 sm:gap-3">
            {days.map(({ key, label, count }) => (
              <li key={key} className="min-w-0 text-center font-mono text-[10px] sm:text-xs">
                <div className="relative flex h-32 items-end justify-center border-b border-foreground/15 bg-[repeating-linear-gradient(to_top,transparent_0,transparent_calc(25%_-_1px),var(--color-border)_calc(25%_-_1px),var(--color-border)_25%)] px-1 sm:h-40 sm:px-3">
                  <div
                    aria-hidden="true"
                    className="w-full max-w-16 border-t border-primary/70 bg-primary/25"
                    style={{ height: count > 0 ? `${(count / peak) * 85}%` : "0", borderTopWidth: count > 0 ? undefined : 0 }}
                  />
                  <span className="absolute inset-x-0 text-foreground tabular-nums" style={{ bottom: `calc(${(count / peak) * 85}% + 4px)` }}>
                    {count}<span className="sr-only"> subscriptions</span>
                  </span>
                </div>
                <time className="mt-2 block text-muted-foreground" dateTime={key}>{label}</time>
              </li>
            ))}
          </ol>
        )}
      </CreatorPanel>

      <CreatorPanel title="Subscription activity" icon={<Clock3 />}>
        {activity.length === 0 ? (
          <p className="text-sm text-muted-foreground">No referred subscriptions have been added yet.</p>
        ) : (
          <>
            <p className="mb-3 font-mono text-xs text-muted-foreground">
              {subscriptionsSold > activityLimit ? `Latest ${activityLimit} subscriptions · ` : ""}Times shown in IST
            </p>
            <ul className="divide-y divide-border border-y border-border">
              {activity.map(({ id, subscribedAt, createdAt }) => (
                <li key={id} className="grid gap-3 py-3 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Added</p>
                    <time className="mt-1 block text-sm font-medium" dateTime={createdAt.toISOString()}>{activityDate.format(createdAt)}</time>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Sold</p>
                    <time className="mt-1 block text-sm" dateTime={subscribedAt.toISOString()}>{activityDate.format(subscribedAt)}</time>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </CreatorPanel>
    </div>
  );
}
