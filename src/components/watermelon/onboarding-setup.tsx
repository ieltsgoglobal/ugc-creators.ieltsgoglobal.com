"use client";

import type { ComponentProps, ReactNode, Ref } from "react";
import Link from "next/link";
import LogoIcon from "@/assets/logo-icon";
import { ThemeToggle } from "./templates/landing-01/landing/navbar";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { CreatorFrameCorners, CreatorPageHero } from "./creator-panels";

interface OnboardingApplicationSetupProps {
  title: string;
  progress: ReactNode;
  children: ReactNode;
  formId?: string;
  action?: string;
  isSubmitting?: boolean;
  onBack?: () => void;
}

export function CreatorEntryShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-foreground/10 bg-background dark:bg-[#101010]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest uppercase focus-visible:outline-2 focus-visible:outline-ring sm:text-sm">
            <LogoIcon className="size-8 text-green-700 dark:text-primary" /> IELTS Go Global
          </Link>
          <ThemeToggle className="rounded-none border-foreground/15" />
        </div>
      </header>
      <main className="flex flex-1 flex-col bg-[radial-gradient(circle_at_center,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] px-4 py-8 sm:px-8 sm:py-12 dark:bg-[#101010]">
        {children}
      </main>
    </>
  );
}

export function OnboardingApplicationSetup({
  title, progress, children, formId, action, isSubmitting, onBack,
}: OnboardingApplicationSetupProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-5">
      <CreatorPageHero title={title} />
      <div className="relative border border-foreground/10 bg-background dark:bg-neutral-950">
        <CreatorFrameCorners />
        {action && <div className="border-b border-border bg-foreground/[0.025] px-5 py-4 sm:px-8">{progress}</div>}
        <div className="px-5 py-6 sm:px-8 sm:py-8">{children}</div>
        {action && formId && (
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border bg-foreground/[0.025] px-5 py-4 sm:px-8">
            {onBack && (
              <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 border border-foreground/15 px-4 font-mono text-xs hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-ring">
                <ChevronLeft aria-hidden="true" className="size-4" /> Back
              </button>
            )}
            <button type="submit" form={formId} disabled={isSubmitting} className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 font-mono text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50">
              {action} <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function OnboardingSetupInput(props: ComponentProps<"input">) {
  return <input {...props} className="min-h-11 w-full border border-foreground/15 bg-background px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring aria-invalid:border-destructive read-only:bg-muted/40" />;
}

export function OnboardingFields({ children }: { children: ReactNode }) {
  return <div className="space-y-6 text-left">{children}</div>;
}

export function OnboardingFieldLabel(props: ComponentProps<"label">) {
  return <label {...props} className="mb-2 block font-mono text-xs text-muted-foreground" />;
}

export function OnboardingFieldError(props: ComponentProps<"p">) {
  return <p {...props} className="mt-2 text-sm text-destructive" role="alert" />;
}

export function OnboardingStepHeading({ headingRef, title }: {
  headingRef: Ref<HTMLHeadingElement>;
  title: string;
}) {
  return <h2 ref={headingRef} tabIndex={-1} className="scroll-mt-24 font-heading text-2xl font-semibold tracking-tight">{title}</h2>;
}
