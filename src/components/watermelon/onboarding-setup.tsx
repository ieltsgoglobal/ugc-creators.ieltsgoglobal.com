"use client";

import type { ComponentProps, ReactNode, Ref } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { CreatorFrameCorners, CreatorPageHero } from "./creator-panels";

interface OnboardingSetupProps {
  title: string;
  subtitle: string;
  progress: ReactNode;
  children: ReactNode;
  imageUrl: string;
  formId?: string;
  action?: string;
  isSubmitting?: boolean;
  onBack?: () => void;
}

const SPRING = { type: "spring", stiffness: 320, damping: 30, mass: 0.7 } as const;

export function OnboardingSetup({
  title, subtitle, progress, children, imageUrl, formId, action, isSubmitting, onBack,
}: OnboardingSetupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING}
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 rounded-[24px] border-2 border-[#EFEDF5] bg-[#F5F5F7] shadow-xl lg:grid-cols-[1.2fr_0.8fr] dark:border-[#1a1a1a] dark:bg-[#0A0A0A]"
      >
        <div className="order-2 flex min-w-0 flex-col lg:order-1">
          <div className="m-1.5 flex h-full flex-col rounded-[18px] bg-white p-5 shadow-sm sm:p-8 dark:bg-[#111]">
            <h1 className="text-[22px] font-medium text-[#111] sm:text-[24px] dark:text-[#EEE]">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <div className="my-5 border-t-[1.6px] border-dashed border-gray-200 dark:border-[#222]" />
            {children}
          </div>

          {action && formId && (
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 p-5 pt-2 sm:px-8 sm:pb-8">
              {progress}
              <div className="flex flex-wrap items-center gap-2">
                {onBack && <button type="button" onClick={onBack} className="flex h-10 items-center gap-1 rounded-full border border-border px-3 text-sm">
                  <ChevronLeft size={16} aria-hidden="true" /> Back
                </button>}
                <motion.button
                  type="submit" form={formId} disabled={isSubmitting}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  transition={SPRING}
                  className="h-10 rounded-full bg-[#0F0F0F] px-8 text-[13px] font-medium text-[#D7D7D7] shadow-lg active:shadow-sm dark:bg-[#EEE] dark:text-black"
                >
                  {action}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        <div className="relative order-1 h-48 overflow-hidden rounded-t-[24px] bg-[#FFF0E9] sm:h-64 lg:order-2 lg:h-auto lg:min-h-full lg:rounded-t-none lg:rounded-r-[24px] dark:bg-[#2A1A14]">
          <motion.img
            src={imageUrl}
            alt=""
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/5 dark:bg-black/20" />
        </div>
      </motion.div>
    </div>
  );
}

export function OnboardingApplicationSetup({
  title, progress, children, formId, action, isSubmitting, onBack,
}: Omit<OnboardingSetupProps, "imageUrl" | "subtitle">) {
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
