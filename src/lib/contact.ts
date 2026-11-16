/**
 * Contact enquiry handling for /api/contact.
 *
 * Nothing is stored. A valid enquiry becomes one email, sent through the
 * Resend HTTP API to CONTACT_TO_EMAIL (or the default recipient below when
 * that variable is unset) with the enquirer as reply-to.
 * Message contents are never logged.
 */

/** The form cannot send until all four of these are set. */
export const CONTACT_ENV_NAMES = [
  "RESEND_API_KEY",
  "CONTACT_FROM_EMAIL",
  "TURNSTILE_SECRET_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
] as const;

/** Where enquiries go when CONTACT_TO_EMAIL is not set. Not a secret. */
export const DEFAULT_CONTACT_TO_EMAIL = "dale.harrison@datago.uk";

/** A person takes longer than this to fill the form in. */
export const MIN_SUBMIT_MS = 3_000;
/** A form left open longer than this must be reloaded. */
export const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;
export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
export const MAX_BODY_BYTES = 20_000;

const LIMITS = { name: 100, email: 254, organisation: 150, message: 5_000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactConfig = {
  resendApiKey: string;
  toEmail: string;
  fromEmail: string;
  turnstileSecret: string;
};

export type ContactFields = {
  name: string;
  email: string;
  organisation: string;
  message: string;
};

export type ContactErrorCode =
  | "not_configured"
  | "rate_limited"
  | "bad_request"
  | "rejected"
  | "too_fast"
  | "invalid"
  | "turnstile_failed"
  | "send_failed";

export type ContactResult =
  | { ok: true; status: 200 }
  | {
      ok: false;
      status: number;
      code: ContactErrorCode;
      fields?: Partial<Record<keyof ContactFields, string>>;
    };

type Env = Record<string, string | undefined>;

/** True only when all four required variables are present. */
export function isContactConfigured(env: Env = process.env): boolean {
  return CONTACT_ENV_NAMES.every((name) => Boolean(env[name]?.trim()));
}

export function readContactConfig(env: Env = process.env): ContactConfig | null {
  if (!isContactConfigured(env)) {
    return null;
  }

  return {
    resendApiKey: env.RESEND_API_KEY!.trim(),
    toEmail: env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_TO_EMAIL,
    fromEmail: env.CONTACT_FROM_EMAIL!.trim(),
    turnstileSecret: env.TURNSTILE_SECRET_KEY!.trim(),
  };
}

/* Rate limit: a small in-memory counter per IP address. It is per server
   instance, so it is a basic brake, not a guarantee. Turnstile is the main
   check; a Vercel Firewall rule can be added on top. */
const hits = new Map<string, number[]>();

export function resetRateLimit() {
  hits.clear();
}

export function isRateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        hits.delete(key);
      }
    }
  }

  return false;
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || headers.get("x-real-ip")?.trim() || "unknown";
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** One line only: stops a value from adding lines to a subject or header. */
function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");
}

export function validateFields(body: Record<string, unknown>): {
  fields: ContactFields;
  errors: Partial<Record<keyof ContactFields, string>>;
} {
  const fields: ContactFields = {
    name: oneLine(text(body.name)),
    email: text(body.email),
    organisation: oneLine(text(body.organisation)),
    message: text(body.message),
  };
  const errors: Partial<Record<keyof ContactFields, string>> = {};

  if (fields.name.length < 2 || fields.name.length > LIMITS.name) {
    errors.name = "Enter your name.";
  }

  if (!EMAIL_PATTERN.test(fields.email) || fields.email.length > LIMITS.email) {
    errors.email =
      "Enter an email address we can reply to, like name@example.org.";
  }

  if (fields.organisation.length > LIMITS.organisation) {
    errors.organisation = "Organisation must be 150 characters or fewer.";
  }

  if (fields.message.length < 10) {
    errors.message = "Enter a message of at least a few words.";
  } else if (fields.message.length > LIMITS.message) {
    errors.message = "Message must be 5,000 characters or fewer.";
  }

  return { fields, errors };
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string,
  fetchImpl: typeof fetch,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") {
      form.set("remoteip", ip);
    }

    const response = await fetchImpl(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

async function sendEmail(
  fields: ContactFields,
  config: ContactConfig,
  fetchImpl: typeof fetch,
): Promise<boolean> {
  const lines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Organisation: ${fields.organisation || "(not given)"}`,
    "",
    fields.message,
    "",
    "Sent from the contact form on datago.uk. Reply to this email to answer the enquirer.",
  ];

  try {
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [config.toEmail],
        reply_to: fields.email,
        subject: `Website enquiry from ${fields.name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      // The status only. Never the message or the enquirer's details.
      console.error(`contact: email provider returned ${response.status}`);
    }

    return response.ok;
  } catch {
    console.error("contact: email provider could not be reached");
    return false;
  }
}

type HandleOptions = {
  body: unknown;
  ip: string;
  now?: number;
  env?: Env;
  fetchImpl?: typeof fetch;
};

export async function handleContact({
  body,
  ip,
  now = Date.now(),
  env = process.env,
  fetchImpl = fetch,
}: HandleOptions): Promise<ContactResult> {
  const config = readContactConfig(env);

  if (!config) {
    return { ok: false, status: 503, code: "not_configured" };
  }

  if (isRateLimited(ip, now)) {
    return { ok: false, status: 429, code: "rate_limited" };
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, code: "bad_request" };
  }

  const data = body as Record<string, unknown>;

  // Honeypot: a field people cannot see. Anything in it means a script.
  if (text(data.website) !== "") {
    return { ok: false, status: 400, code: "rejected" };
  }

  const startedAt = Number(data.startedAt);
  const elapsed = now - startedAt;

  if (!Number.isFinite(startedAt) || elapsed > MAX_FORM_AGE_MS) {
    return { ok: false, status: 400, code: "bad_request" };
  }

  if (elapsed < MIN_SUBMIT_MS) {
    return { ok: false, status: 400, code: "too_fast" };
  }

  const { fields, errors } = validateFields(data);

  if (Object.keys(errors).length > 0) {
    return { ok: false, status: 422, code: "invalid", fields: errors };
  }

  const human = await verifyTurnstile(
    text(data.turnstileToken),
    config.turnstileSecret,
    ip,
    fetchImpl,
  );

  if (!human) {
    return { ok: false, status: 400, code: "turnstile_failed" };
  }

  const sent = await sendEmail(fields, config, fetchImpl);

  if (!sent) {
    return { ok: false, status: 502, code: "send_failed" };
  }

  return { ok: true, status: 200 };
}
