"use client";

import { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Projects", href: "/#projects" },
  { label: "Approach", href: "/#approach" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={cn(
          "flex w-full max-w-4xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300",
          "border border-border bg-card shadow-lg backdrop-blur-md dark:bg-card/95 dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)]",
          scrolled ? "border-border shadow-xl ring-1 ring-border/50" : "",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-xs font-bold text-white shadow-xs">
            JC
          </span>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Jose Carl Angeles
            </span>
            <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline-block">
              Full Stack Engineer
            </span>
          </div>
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm", className: "rounded-full px-4 text-xs font-semibold" })}
          >
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                "flex size-9 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              )}
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-border bg-card">
              <SheetHeader>
                <SheetTitle className="text-left font-sans font-semibold">
                  Jose Carl Angeles
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <SheetFooter>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={buttonVariants({ className: "w-full rounded-full font-semibold" })}
                >
                  Resume
                </a>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
