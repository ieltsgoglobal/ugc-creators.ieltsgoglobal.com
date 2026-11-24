"use client";

import { useState } from "react";
import { ChevronRightIcon, FolderIcon, FolderOpenIcon, HomeIcon } from "lucide-react";
import { DropdownMenu } from "radix-ui";

const MENU_OPTIONS = ["Updates", "Changelog", "Archive"];

export default function Breadcrumb7() {
  const [isOpen, setIsOpen] = useState(false);
  const SectionIcon = isOpen ? FolderOpenIcon : FolderIcon;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li><a href="#" aria-label="Home"><HomeIcon className="size-3.5 text-muted-foreground" /></a></li>
        <li aria-hidden="true"><ChevronRightIcon className="size-3.5 text-muted-foreground" /></li>
        <li>
          <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger aria-label="Open section menu" className="rounded-sm px-1 py-0.5 text-muted-foreground hover:text-foreground">
              <SectionIcon className="size-3.5" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="start" sideOffset={4} className="z-50 rounded-md border bg-popover p-1 text-sm text-popover-foreground shadow-md">
                {MENU_OPTIONS.map((option) => (
                  <DropdownMenu.Item key={option} className="rounded-sm px-2 py-1 outline-none data-highlighted:bg-accent">{option}</DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </li>
        <li aria-hidden="true"><ChevronRightIcon className="size-3.5 text-muted-foreground" /></li>
        <li aria-current="page" className="rounded-sm px-1 py-0.5 font-medium">Release Notes</li>
      </ol>
    </nav>
  );
}
