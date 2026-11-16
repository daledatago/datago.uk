"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/arrow";

type FieldName = "name" | "email" | "message";

export type ContactFormCopy = {
  form: {
    name: string;
    email: string;
    organisation: string;
    optional: string;
    message: string;
    messageHint: string;
    honeypot: string;
    check: string;
    checkHint: string;
    legalBefore: string;
    legalLink: string;
    legalAfter: string;
    submit: string;
    sending: string;
    noscript: string;
  };
  errors: {
    name: string;
    email: string;
    message: string;
    messageLong: string;
    one: string;
    many: string;
  };
  status: {
    success: string;
    checkPending: string;
    not_configured: string;
    rate_limited: string;
    too_fast: string;
    turnstile_failed: string;
    generic: string;
  };
};

type ContactFormProps = {
  /** True when the sending and security-check variables are set. */
  configured: boolean;
  siteKey: string;
  /** Shown as plain, selectable text when the form cannot send. */
  email: string;
  copy: ContactFormCopy;
};

type Status = { kind: "ok" | "error"; text: string; offerEmail: boolean } | null;

type Turnstile = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme: "light" | "dark";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({ configured, siteKey, email, copy }: ContactFormProps) {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef("");
  const widgetRef = useRef<string | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!configured || !siteKey) {
      return;
    }

    let cancelled = false;

    const render = () => {
      if (cancelled || !window.turnstile || !checkRef.current || widgetRef.current) {
        return;
      }

      widgetRef.current = window.turnstile.render(checkRef.current, {
        sitekey: siteKey,
        theme:
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light",
        callback: (token) => {
          tokenRef.current = token;
        },
        "expired-callback": () => {
          tokenRef.current = "";
        },
        "error-callback": () => {
          tokenRef.current = "";
        },
      });
    };

    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${TURNSTILE_SRC}"]`,
      );
      if (!script) {
        script = document.createElement("script");
        script.src = TURNSTILE_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }

    return () => {
      cancelled = true;
      if (widgetRef.current && window.turnstile) {
        window.turnstile.remove(widgetRef.current);
      }
      widgetRef.current = null;
      tokenRef.current = "";
    };
  }, [configured, siteKey]);

  function show(next: Status) {
    setStatus(next);
    // Focus moves to the message so it is read out and seen.
    window.setTimeout(() => statusRef.current?.focus(), 0);
  }

  function resetCheck() {
    tokenRef.current = "";
    if (widgetRef.current && window.turnstile) {
      window.turnstile.reset(widgetRef.current);
    }
  }

  function validate(data: FormData) {
    const found: Partial<Record<FieldName, string>> = {};
    const name = String(data.get("name") ?? "").trim();
    const address = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) found.name = copy.errors.name;
    if (!EMAIL_PATTERN.test(address)) found.email = copy.errors.email;
    if (message.length < 10) found.message = copy.errors.message;
    else if (message.length > 5000) found.message = copy.errors.messageLong;

    return found;
  }

  function showFieldErrors(found: Partial<Record<FieldName, string>>) {
    const names = Object.keys(found) as FieldName[];
    setErrors(found);
    setStatus({
      kind: "error",
      text:
        names.length === 1
          ? copy.errors.one
          : copy.errors.many.replace("{count}", String(names.length)),
      offerEmail: false,
    });
    const order: FieldName[] = ["name", "email", "message"];
    const first = order.find((field) => found[field]);
    formRef.current
      ?.querySelector<HTMLElement>(`[name="${first}"]`)
      ?.focus();
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);

    if (Object.keys(found).length > 0) {
      showFieldErrors(found);
      return;
    }

    setErrors({});

    // Without a site key the server answers "not connected" in words.
    if (configured && !tokenRef.current) {
      show({ kind: "error", text: copy.status.checkPending, offerEmail: true });
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          message: data.get("message"),
          website: data.get("website"),
          startedAt: startedAt.current,
          turnstileToken: tokenRef.current,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        fields?: Partial<Record<FieldName, string>>;
      } | null;

      if (response.ok && result?.ok) {
        form.reset();
        startedAt.current = Date.now();
        resetCheck();
        show({ kind: "ok", text: copy.status.success, offerEmail: false });
        return;
      }

      resetCheck();

      if (result?.code === "invalid" && result.fields) {
        showFieldErrors(result.fields);
      } else if (result?.code === "not_configured") {
        show({ kind: "error", text: copy.status.not_configured, offerEmail: true });
      } else if (
        result?.code === "rate_limited" ||
        result?.code === "too_fast" ||
        result?.code === "turnstile_failed"
      ) {
        show({ kind: "error", text: copy.status[result.code], offerEmail: true });
      } else {
        show({ kind: "error", text: copy.status.generic, offerEmail: true });
      }
    } catch {
      resetCheck();
      show({ kind: "error", text: copy.status.generic, offerEmail: true });
    } finally {
      setSending(false);
    }
  }

  const statusBox = (
    <div
      className={status?.kind === "error" ? "form__status is-error" : "form__status"}
      hidden={!status}
      id="form-status"
      ref={statusRef}
      role="status"
      tabIndex={-1}
    >
      {status?.text}
      {status?.offerEmail ? (
        <>
          {" "}
          <span className="contact__address">{email}</span>
        </>
      ) : null}
    </div>
  );

  return (
    <form
      className="form"
      data-reveal=""
      data-state={configured ? "connected" : "not-connected"}
      id="form"
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
    >
      {statusBox}
      <noscript>
        <p className="form__status is-error">
          {copy.form.noscript} <span className="contact__address">{email}</span>
        </p>
      </noscript>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">{copy.form.name}</label>
          <input
            aria-describedby="e-name"
            aria-invalid={errors.name ? true : undefined}
            autoComplete="name"
            id="f-name"
            maxLength={100}
            name="name"
            required
            type="text"
          />
          <span className="err" id="e-name">
            {errors.name}
          </span>
        </div>
        <div className="field">
          <label htmlFor="f-email">{copy.form.email}</label>
          <input
            aria-describedby="e-email"
            aria-invalid={errors.email ? true : undefined}
            autoComplete="email"
            id="f-email"
            maxLength={254}
            name="email"
            required
            type="email"
          />
          <span className="err" id="e-email">
            {errors.email}
          </span>
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-org">
          {copy.form.organisation} <span className="hint">{copy.form.optional}</span>
        </label>
        <input
          autoComplete="organization"
          id="f-org"
          maxLength={150}
          name="organisation"
          type="text"
        />
      </div>
      <div className="field">
        <label htmlFor="f-msg">{copy.form.message}</label>
        <span className="hint" id="h-msg">
          {copy.form.messageHint}
        </span>
        <textarea
          aria-describedby="h-msg e-msg"
          aria-invalid={errors.message ? true : undefined}
          id="f-msg"
          name="message"
          required
        />
        <span className="err" id="e-msg">
          {errors.message}
        </span>
      </div>
      <div aria-hidden="true" className="hp">
        <label htmlFor="f-web">{copy.form.honeypot}</label>
        <input autoComplete="off" id="f-web" name="website" tabIndex={-1} type="text" />
      </div>
      {configured ? (
        <div className="form__check">
          <b>{copy.form.check}</b>
          <span className="hint">{copy.form.checkHint}</span>
          <div ref={checkRef} />
        </div>
      ) : null}
      <p className="form__legal">
        {copy.form.legalBefore}
        <Link href="/privacy">{copy.form.legalLink}</Link>
        {copy.form.legalAfter}
      </p>
      <div>
        <button className="btn" disabled={sending} type="submit">
          {sending ? copy.form.sending : copy.form.submit} <Arrow />
        </button>
      </div>
    </form>
  );
}
