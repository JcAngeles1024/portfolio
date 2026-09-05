"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionDivider } from "@/components/visuals/section-divider";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

const SECTION_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Approach", href: "/#approach" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const ELSEWHERE_LINKS = [
  { label: "GitHub", href: "https://github.com/JcAngeles1024", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jose-carl-angeles-9104292b2/", icon: LinkedinIcon },
];

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jc.angelesmails@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative mt-32">
      <SectionDivider tone="card" />
      <div className="bg-card">
        <Container className="grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-brand font-mono text-xs font-bold text-white shadow-xs">
                JC
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Jose Carl Angeles
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Full stack software engineer passionate about database architecture,
              backend performance, and building reliable tools for the web.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Sections
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SECTION_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Elsewhere
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {copied ? <Check className="size-3.5 text-brand-teal" /> : <Mail className="size-3.5" />}
                  {copied ? "Email copied!" : "Email"}
                </button>
              </li>
              {ELSEWHERE_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <item.icon className="size-3.5" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Resume
            </h3>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              Download PDF
            </a>
          </div>
        </Container>

        <div className="border-t border-border">
          <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
            <p>&copy; {new Date().getFullYear()} — built with Next.js, Tailwind, and way too much coffee.</p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
