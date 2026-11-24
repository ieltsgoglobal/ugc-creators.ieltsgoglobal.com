"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutDashboard, PanelLeft, UserRound, X } from "lucide-react";
import { Dialog } from "radix-ui";
import LogoIcon from "@/assets/logo-icon";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./templates/landing-01/landing/navbar";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/application", label: "Application", icon: ClipboardList },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
];

const control = "grid size-9 shrink-0 place-items-center border border-foreground/15 bg-background/30 hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring";

type CreatorIdentity = { name: string; email: string };

export function CreatorAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => Array.from(part)[0]).join("");
  return (
    <span aria-hidden="true" className={cn("grid size-10 shrink-0 place-items-center border border-primary/25 bg-primary/10 font-mono font-medium uppercase text-foreground", className)}>
      {initials || <UserRound className="size-4" />}
    </span>
  );
}

function CreatorNavigation({ account, collapsed, onNavigate }: {
  account: CreatorIdentity;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("relative flex h-full min-h-0 flex-col overflow-y-auto p-3", collapsed && "items-center")}>
      <nav aria-label="Creator dashboard" className={cn("mt-3 grid gap-1", collapsed && "w-full")}>
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={pathname === href ? "page" : undefined}
            title={collapsed ? label : undefined}
            className="relative flex h-11 items-center gap-3 border border-transparent px-3 font-mono text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-ring aria-[current=page]:border-primary/25 aria-[current=page]:bg-primary/10 aria-[current=page]:text-foreground aria-[current=page]:[&>svg]:text-green-700 dark:aria-[current=page]:[&>svg]:text-primary"
          >
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            <span className={collapsed ? "sr-only" : undefined}>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-foreground/10 pt-3">
        <Link
          href="/dashboard/profile"
          onClick={onNavigate}
          title={collapsed ? account.name : undefined}
          className="flex items-center gap-3 border border-transparent p-1.5 hover:border-primary/25 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <CreatorAvatar name={account.name} />
          <span className={collapsed ? "sr-only" : "min-w-0"}>
            <span className="block truncate text-sm font-medium">{account.name}</span>
            <span className="block truncate text-xs text-muted-foreground">{account.email}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export function CreatorShell({ account, children }: { account: CreatorIdentity; children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPage = navigation.find(({ href }) => href === pathname)?.label ?? "Overview";

  return (
    <div className="min-h-svh bg-background text-foreground dark:bg-[#101010]">
      <header className="sticky top-0 z-30 border-b border-foreground/10 bg-background/85 backdrop-blur-xl dark:bg-[#101010]/85">
        <div className="mx-auto relative flex h-16 max-w-[100rem] items-center justify-between gap-3 px-4 sm:px-8">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <button
              type="button"
              className={cn(control, "hidden md:grid")}
              onClick={() => setCollapsed((value) => !value)}
              aria-expanded={!collapsed}
              aria-controls="creator-sidebar"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelLeft aria-hidden="true" className="size-4" />
            </button>
            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
              <Dialog.Trigger className={cn(control, "md:hidden")} aria-label="Open navigation">
                <PanelLeft aria-hidden="true" className="size-4" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55" />
                <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[19rem] max-w-full border-r border-foreground/10 bg-background text-foreground dark:bg-[#101010]">
                  <Dialog.Title className="sr-only">Creator dashboard navigation</Dialog.Title>
                  <Dialog.Description className="sr-only">Navigate between your dashboard pages.</Dialog.Description>
                  <Dialog.Close className={cn(control, "absolute top-4 right-3")} aria-label="Close navigation">
                    <X aria-hidden="true" className="size-4" />
                  </Dialog.Close>
                  <div className="h-full pt-14">
                    <CreatorNavigation account={account} onNavigate={() => setMobileOpen(false)} />
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <Link href="/" className="group flex min-w-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-ring">
              <LogoIcon className="h-8 w-8 shrink-0 text-green-700 transition-transform group-hover:scale-105 dark:text-primary" />
              <span className="truncate font-mono text-xs font-bold tracking-widest uppercase sm:text-sm">IELTS GoGlobal</span>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden border-l border-foreground/15 pl-4 font-mono text-xs text-muted-foreground sm:inline">
              Dashboard <span aria-hidden="true" className="mx-1 text-green-700 dark:text-primary">/</span> <span className="text-foreground">{currentPage}</span>
            </span>
            <ThemeToggle className="rounded-none border-foreground/15" />
          </div>
        </div>
      </header>

      <div className="relative isolate mx-auto flex min-h-[calc(100svh-4rem)] max-w-[100rem] border-foreground/10 xl:border-x">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_44rem)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_oklab,var(--color-primary)_8%,transparent),transparent_55%)]" />

        <aside id="creator-sidebar" className={cn("sticky top-16 hidden h-[calc(100svh-4rem)] shrink-0 border-r border-foreground/10 bg-background/55 md:block motion-safe:transition-[width]", collapsed ? "w-[4.5rem]" : "w-64")}>
          <CreatorNavigation account={account} collapsed={collapsed} />
        </aside>

        <main className="relative mx-auto min-w-0 max-w-6xl flex-1 px-4 py-7 sm:px-8 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
