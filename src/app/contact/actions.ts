"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { checkContactRateLimit } from "@/lib/rate-limit";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string[]>>;
}

const SUCCESS_MESSAGE = "Message sent — I'll get back to you within a day or two.";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Spam trap: Real users won't see this field. If it's filled out, silently accept to fool bots.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    hdrs.get("x-real-ip") ??
    "unknown";

  const { success: withinLimit } = await checkContactRateLimit(ip);
  if (!withinLimit) {
    return {
      status: "error",
      message: "Too many messages sent — please try again in a few minutes.",
    };
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    console.error("[contact] failed to send email", error);
    return {
      status: "error",
      message:
        "Something went wrong on my end — feel free to email me directly instead.",
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
