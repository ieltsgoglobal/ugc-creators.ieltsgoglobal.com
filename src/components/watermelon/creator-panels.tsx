import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, CircleCheck, ClipboardList, UsersRound, Video } from "lucide-react";
import Heading from "./templates/landing-01/landing/heading";

// Corner treatment used on the Watermelon landing page's stat cards.
export function CreatorFrameCorners() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute top-0 left-0 size-2 border-t border-l border-foreground/40" />
      <span className="absolute top-0 right-0 size-2 border-t border-r border-foreground/40" />
      <span className="absolute bottom-0 left-0 size-2 border-b border-l border-foreground/40" />
      <span className="absolute right-0 bottom-0 size-2 border-r border-b border-foreground/40" />
    </div>
  );
}

// Uses the landing hero's dot grid, glow, and concentric guide rings.
export function CreatorPageHero({ title, children, avatar }: {
  title: string;
  children?: ReactNode;
  avatar?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border border-foreground/10 bg-background dark:bg-[#101010]">
      <CreatorFrameCorners />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-primary)_9%,transparent),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 -z-10 grid size-[28rem] translate-x-1/3 -translate-y-1/2 place-items-center rounded-full border border-foreground/10">
        <div className="grid size-80 place-items-center rounded-full border border-dashed border-foreground/10">
          <div className="grid size-56 place-items-center rounded-full border border-foreground/10">
            <div className="size-32 rounded-full border border-dashed border-foreground/10" />
          </div>
        </div>
      </div>
      <div className="flex min-h-44 flex-col justify-center gap-5 px-6 py-8 sm:min-h-52 sm:flex-row sm:items-center sm:justify-start sm:px-9 lg:px-12">
        {avatar}
        <div className="min-w-0">
          <Heading as="h1" className="wrap-break-word text-4xl font-semibold sm:text-5xl lg:text-6xl">{title}</Heading>
          {children}
        </div>
      </div>
    </section>
  );
}

export function CreatorPanel({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="relative min-w-0 border border-foreground/10 bg-background text-foreground dark:bg-neutral-950">
      <CreatorFrameCorners />
      <Heading variant="small" className="flex items-center gap-2.5 border-b border-foreground/10 bg-foreground/[0.025] px-5 py-4 font-semibold">
        {icon && <span aria-hidden="true" className="shrink-0 text-green-700 dark:text-primary [&>svg]:size-4">{icon}</span>}
        {title}
      </Heading>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function CreatorFields({ fields }: { fields: [string, ReactNode][] }) {
  return (
    <dl className="divide-y divide-border">
      {fields.map(([label, value]) => (
        <div key={label} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(7rem,1fr)_minmax(0,2fr)] sm:gap-4">
          <dt className="font-mono text-xs text-muted-foreground">{label}</dt>
          <dd className="wrap-break-word text-sm font-medium">{value ?? "Not provided"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CreatorMetrics({ followers, weeklyVideos }: { followers: number | null; weeklyVideos: number | null }) {
  const metrics = [
    { label: "Reported followers", value: followers, icon: UsersRound },
    { label: "Videos per week", value: weeklyVideos, icon: Video },
  ];

  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {metrics.map(({ label, value, icon: Icon }) => (
        <div key={label} className="relative flex flex-col items-start border border-foreground/10 bg-background/45 p-4 sm:p-5">
          <CreatorFrameCorners />
          <dt className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-green-700 dark:text-primary" /> {label}
          </dt>
          <dd className="mt-3 font-mono text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
            {value?.toLocaleString("en") ?? "Not provided"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ApplicationStatus({ submittedDate, approvedDate, overview = false }: { submittedDate?: string; approvedDate?: string; overview?: boolean }) {
  const StatusIcon = submittedDate ? CircleCheck : ClipboardList;
  return (
    <section className="relative flex flex-col gap-4 border border-foreground/10 bg-background p-5 sm:flex-row sm:items-center sm:p-6 dark:bg-neutral-950">
      <CreatorFrameCorners />
      <span className="grid size-11 shrink-0 place-items-center border border-primary/25 bg-primary/10 text-green-700 dark:text-primary">
        <StatusIcon aria-hidden="true" className="size-5" />
      </span>
      <div className="flex-1">
        <h2 className="font-semibold">{approvedDate ? "Application approved" : submittedDate ? "Application submitted" : "Application not submitted"}</h2>
        <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
          {approvedDate ? `Approved on ${approvedDate}` : submittedDate ? `Submitted on ${submittedDate}` : "Complete onboarding to submit your creator application."}
        </p>
      </div>
      {(overview || !submittedDate) && (
        <Link href={submittedDate ? "/dashboard/application" : "/onboarding"} className="inline-flex w-fit items-center gap-2 bg-primary px-4 py-2.5 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          {submittedDate ? "View application" : "Continue onboarding"}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </section>
  );
}
