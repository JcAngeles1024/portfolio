"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SchemaGraph } from "@/components/visuals/schema-graph";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const [avatarError, setAvatarError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jc.angelesmails@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="mesh-gradient relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20"
      style={{ "--mesh-a": "0.22", "--mesh-b": "0.18" } as CSSProperties}
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Status Pill */}
          <motion.div variants={item} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1 text-xs font-medium text-foreground shadow-xs backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
              </span>
              Available for full-time engineering roles
            </span>
          </motion.div>

          {/* Name & Title with Avatar / Photo support */}
          <motion.div variants={item} className="mt-5 flex items-center gap-4 sm:gap-5">
            <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-brand/40 bg-linear-to-br from-brand/20 to-brand-teal/20 shadow-md sm:size-20">
              {!avatarError && (
                <Image
                  src="/avatar.jpg"
                  alt="Jose Carl Angeles"
                  fill
                  sizes="80px"
                  onError={() => setAvatarError(true)}
                  className="object-cover"
                />
              )}
              <span className="font-mono text-lg font-bold text-brand sm:text-xl">
                JC
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Jose Carl Angeles
              </h1>
              <p className="mt-1.5 flex items-center gap-2 font-mono text-xs font-medium text-brand sm:text-sm md:text-base">
                Full Stack Software Engineer
              </p>
            </div>
          </motion.div>

          {/* Humane Bio */}
          <motion.p
            variants={item}
            className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I&apos;m a full stack software engineer who enjoys building practical,
            dependable applications and scalable backends. I specialize in backend
            architecture, relational database design, and crafting responsive user
            experiences across web, mobile, and desktop.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 text-sm leading-relaxed text-muted-foreground"
          >
            I build end-to-end with Laravel, NestJS, Node.js, MySQL, Angular, Vue,
            and Next.js, with a strong focus on maintainable architecture and clear
            code patterns that teammates can easily understand and extend.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group rounded-full px-6 font-medium shadow-sm transition-all hover:shadow-md",
              )}
            >
              View Featured Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "cursor-pointer rounded-full px-6 font-medium transition-colors hover:text-foreground",
              )}
            >
              {copied ? <Check className="size-4 text-brand-teal" /> : <Mail className="size-4" />}
              {copied ? "Email copied!" : "jc.angelesmails@gmail.com"}
            </button>
          </motion.div>
        </motion.div>

        {/* Visual Graph with live metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <SchemaGraph />
        </motion.div>
      </Container>
    </section>
  );
}
