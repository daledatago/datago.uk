import { Confirms } from "@/components/confirm";
import { ContactForm } from "@/components/contact-form";
import { CONTACT_TOPICS, isContactConfigured } from "@/lib/contact";
import { contact, site } from "@/lib/strings";

type ContactSectionProps = {
  /** "h1" on the contact page, "h2" inside the home page. */
  heading: "h1" | "h2";
  eyebrow: string;
};

export function ContactSection({ heading: Heading, eyebrow }: ContactSectionProps) {
  const configured = isContactConfigured();
  const copy = {
    form: contact.form,
    notConnected: contact.notConnected,
    errors: contact.errors,
    status: contact.status,
  };

  return (
    <div className="shell contact">
      <div className="contact__aside" data-reveal="">
        <p className="eyebrow">{eyebrow}</p>
        <Heading id="contact-h">{contact.title}</Heading>
        <p className="lede">
          {contact.lede} <Confirms items={contact.ledeConfirms} />
        </p>
        <div className="contact__alt">
          <span>{contact.emailLabel}</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>
            <Confirms items={contact.emailConfirms} />
          </span>
        </div>
      </div>
      <ContactForm
        configured={configured}
        copy={copy}
        email={site.email}
        siteKey={configured ? (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "") : ""}
        topics={CONTACT_TOPICS}
      />
    </div>
  );
}
