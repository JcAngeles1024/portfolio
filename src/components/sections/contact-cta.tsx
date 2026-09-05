"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/visuals/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

const SECONDARY_LINKS = [
  { label: "GitHub", href: "https://github.com/JcAngeles1024", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jose-carl-angeles-9104292b2/", icon: LinkedinIcon },
];

export function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jc.angelesmails@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="mesh-gradient relative py-24"
      style={{ "--mesh-a": "0.18", "--mesh-c": "0.14" } as CSSProperties}
    >
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-wider text-brand-teal uppercase">
            Get In Touch
          </p>
          <h2 className="mt-3 text-section font-heading font-semibold text-foreground">
            Let&apos;s connect and build something great.
          </h2>
          <p className="mt-4 text-muted-foreground">
            I&apos;m currently open to full-stack and backend software engineering
            roles. Whether you have an opportunity to discuss, a question about my
            projects, or just want to connect, feel free to send a message.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? <Check className="size-4 text-brand-teal" /> : <Mail className="size-4" />}
              {copied ? "Email copied!" : "jc.angelesmails@gmail.com"}
            </button>

            {SECONDARY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="size-4" />
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 text-left">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
