import { ArrowUpRight01Icon } from 'hugeicons-react';
import { Globe } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import LogoIcon from '@/assets/logo-icon';

function Crosshair({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  
  return (
    <div className={cn(
      "pointer-events-none absolute h-8 w-8",
      isTop ? "top-0" : "bottom-0",
      isLeft ? "left-0" : "right-0"
    )}>
      <div className={cn("absolute h-full w-px bg-foreground/10", isTop ? "top-0" : "bottom-0", isLeft ? "left-4" : "right-4")} />
      <div className={cn("absolute h-px w-full bg-foreground/10", isTop ? "top-4" : "bottom-4", isLeft ? "left-0" : "right-0")} />
    </div>
  );
}

function FooterLinkColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-primary mb-2 flex gap-2 font-mono text-xs tracking-widest">
        {title}
      </div>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
      {children}
    </Link>
  );
}

function SocialLink({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center border border-foreground/10 bg-foreground/2 text-foreground/50 transition-all hover:border-foreground/30 hover:text-foreground"
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background text-foreground relative mt-24 overflow-hidden border-t border-foreground/5 font-mono">
      {/* Decorative Technical Crosshairs at the very edges */}
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 md:px-8 lg:px-12 xl:px-16">
        {/* Top Grid */}
        <div className="relative grid grid-cols-1 gap-12 border-b border-foreground/5 pb-16 lg:grid-cols-12 lg:gap-8">
          {/* Left Side: Brand & Newsletter (span 5) */}
          <div className="flex flex-col items-start pr-0 lg:col-span-5 lg:pr-8">
            <div className="text-primary mb-6 flex items-center gap-2 font-mono text-xs tracking-widest">
              IELTS GOGLOBAL
            </div>
            <h3 className="mb-6 font-sans text-3xl tracking-tight text-balance md:text-5xl">
              Make IELTS content <br className="hidden lg:block" /> in your own voice
            </h3>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-pretty text-foreground/50">
              Apply to become a creator, share your referral link, and track eligible subscription sales in your dashboard.
            </p>

            <a
              href="/auth"
              className="text-background bg-primary hover:bg-primary/90 inline-flex w-fit items-center justify-center px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors active:scale-[0.96]"
            >
              Get Started <ArrowUpRight01Icon className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Right Side: Links (span 7) */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-7 lg:pl-8">
            <FooterLinkColumn title="PROGRAM">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/auth">Sign in</FooterLink>
              <FooterLink href="/onboarding">Apply to join</FooterLink>
            </FooterLinkColumn>

            <FooterLinkColumn title="DASHBOARD">
              <FooterLink href="/dashboard">Overview</FooterLink>
              <FooterLink href="/dashboard/application">Application</FooterLink>
              <FooterLink href="/dashboard/profile">Profile</FooterLink>
              <FooterLink href="/dashboard/referrals">Referrals</FooterLink>
              <FooterLink href="/dashboard/wallet">Wallet</FooterLink>
            </FooterLinkColumn>

            <FooterLinkColumn title="CREATOR HELP">
              <FooterLink href="/dashboard/creator-guide">Creator Guide</FooterLink>
              <FooterLink href="/dashboard/faq">FAQ</FooterLink>
              <FooterLink href="https://ieltsgoglobal.com/">Main website</FooterLink>
              <FooterLink href="https://www.instagram.com/ieltsgoglobal/">Instagram</FooterLink>
            </FooterLinkColumn>

            <FooterLinkColumn title="POLICIES">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
            </FooterLinkColumn>
          </div>

          {/* Vertical divider line for desktop */}
          <div className="absolute top-0 bottom-0 left-[41.666%] hidden w-px bg-foreground/5 lg:block" />
        </div>

        {/* Middle Section (Strip) */}
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden border-b border-foreground/5 py-6 md:flex-row">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[16px_16px]" />
          <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 px-2 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full shadow-[0_0_8px_rgba(163,255,18,0.6)]" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">
                For IELTS creators
              </span>
            </div>

            {/* Cool loading bar graphic */}
            <div className="hidden items-center gap-[2px] opacity-80 lg:flex">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-4 w-1.5 transition-colors',
                    i < 12 ? 'bg-primary' : 'bg-foreground/10',
                  )}
                />
              ))}
            </div>

            <div className="text-primary font-mono text-xs tracking-widest">
              {'[ IELTS GOGLOBAL ]'}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start justify-between gap-8 pt-12 xl:flex-row xl:items-center">
          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:gap-12 xl:w-auto">
            {/* Logo / Left */}
            <div className="flex items-center gap-3">
              <div className="group relative flex h-8 w-8 items-center justify-center">
                <LogoIcon className="text-primary h-full w-full" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-foreground/90">
                IELTS GoGlobal
              </span>
            </div>

            <div className="hidden flex-col border-l border-foreground/10 pl-8 md:flex">
              <span className="text-xs tracking-widest text-foreground/40">
                IELTS GoGlobal Creator Program
              </span>
              <span className="text-xs tracking-widest text-foreground/40">
                Create, share, and earn.
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-4 text-xs tracking-widest text-foreground/40 uppercase md:flex-row md:items-center md:gap-16 xl:w-auto xl:justify-end">
            <div className="flex flex-col gap-1">
              <span>&copy; 2026 IELTS GoGlobal.</span>
              <span>All rights reserved.</span>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 xl:w-auto xl:items-end">
            <div className="text-primary flex items-center gap-2 font-mono text-xs tracking-widest">
              CONNECT
            </div>
            <div className="flex items-center gap-4">
              <SocialLink href="https://ieltsgoglobal.com/" label="IELTS GoGlobal website" icon={Globe} />
              <SocialLink href="https://www.instagram.com/ieltsgoglobal/" label="IELTS GoGlobal on Instagram" icon={FaInstagram} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Crosshairs */}
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />
    </footer>
  );
}
