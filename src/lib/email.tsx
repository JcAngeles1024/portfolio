import { Resend } from "resend";
import type { ContactFormInput } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

function ContactEmail({ name, email, message }: ContactFormInput) {
  return (
    <div>
      <p>
        New portfolio contact form submission from <strong>{name}</strong> (
        {email}).
      </p>
      <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
    </div>
  );
}

export async function sendContactEmail(input: ContactFormInput) {
  const to = process.env.CONTACT_TO_EMAIL || "jc.angelesmails@gmail.com";

  return resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: input.email,
    subject: `New portfolio message from ${input.name}`,
    react: <ContactEmail {...input} />,
  });
}
