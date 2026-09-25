import { ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { config } from "../config";
import { ContactForm } from "./ContactForm";
import { LinkedInIcon } from "./icons";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function Contact() {
  const { email, socials, contact } = config;
  const hasForm = Boolean(contact.formEndpoint);

  return (
    <Section id="contact" className="border-t border-line">
      <div
        className={`grid gap-10 ${hasForm ? "lg:grid-cols-[1fr_1.2fr] lg:gap-16" : ""}`}
      >
        <div>
          <Reveal>
            <SectionHeading
              id="contact-heading"
              eyebrow="contact"
              title="Let’s build something."
              description="Hiring, collaborating, or just want to talk shop? My inbox is open — I usually reply within a day."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ul
              className={`grid gap-4 ${hasForm ? "" : "sm:grid-cols-2 lg:max-w-3xl"}`}
            >
              <li>
                <ContactCard
                  href={`mailto:${email}`}
                  label="Email"
                  value={email}
                  icon={<Mail size={20} aria-hidden="true" />}
                />
              </li>
              {socials.linkedin && (
                <li>
                  <ContactCard
                    href={socials.linkedin}
                    external
                    label="LinkedIn"
                    value="Connect with me"
                    icon={<LinkedInIcon size={20} />}
                  />
                </li>
              )}
            </ul>
          </Reveal>
        </div>

        {hasForm && contact.formEndpoint && (
          <Reveal delay={0.12}>
            <ContactForm endpoint={contact.formEndpoint} email={email} />
          </Reveal>
        )}
      </div>
    </Section>
  );
}

interface ContactCardProps {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
}

function ContactCard({ href, label, value, icon, external }: ContactCardProps) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime/40"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime transition-colors group-hover:bg-lime group-hover:text-bg">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-xs uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="block truncate text-base font-medium text-ink">
          {value}
        </span>
      </span>
      <ArrowUpRight
        size={20}
        aria-hidden="true"
        className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
      />
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}
