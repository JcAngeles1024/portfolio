"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import { cn } from "cn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        buttonVariants({ size: "lg" }),
        "w-full rounded-full sm:w-auto",
      )}
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Send className="size-4" />
      )}
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <form
      action={formAction}
      noValidate
      className="glass-panel rounded-panel p-6 sm:p-8"
    >
      {/* Spam trap field (hidden visually and from screen readers) */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            maxLength={100}
            autoComplete="name"
            aria-invalid={!!state.fieldErrors?.name}
          />
          {state.fieldErrors?.name && (
            <p className="text-xs text-destructive">{state.fieldErrors.name[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            maxLength={200}
            autoComplete="email"
            aria-invalid={!!state.fieldErrors?.email}
          />
          {state.fieldErrors?.email && (
            <p className="text-xs text-destructive">{state.fieldErrors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Hi Jose, I have an opportunity regarding a backend role..."
          required
          rows={5}
          maxLength={5000}
          aria-invalid={!!state.fieldErrors?.message}
        />
        {state.fieldErrors?.message && (
          <p className="text-xs text-destructive">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <AnimatePresence mode="wait">
          {state.status !== "idle" && (
            <motion.p
              key={`${state.status}-${state.message ?? ""}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className={cn(
                "text-sm",
                state.status === "success" ? "text-brand-teal" : "text-destructive",
              )}
            >
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
