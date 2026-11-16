import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_CONTACT_TO_EMAIL,
  RATE_LIMIT_MAX,
  resetRateLimit,
} from "@/lib/contact";
import { POST } from "./route";

const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_URL = "https://api.resend.com/emails";

const ENV = {
  RESEND_API_KEY: "test-resend-key",
  CONTACT_TO_EMAIL: "inbox@example.org",
  CONTACT_FROM_EMAIL: "DataGo website <website@send.example.org>",
  TURNSTILE_SECRET_KEY: "test-turnstile-secret",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test-site-key",
};

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Test Person",
    email: "test.person@example.org",
    organisation: "Example Council",
    message: "We would like to discuss a reporting project.",
    website: "",
    startedAt: Date.now() - 10_000,
    turnstileToken: "token-from-widget",
    ...overrides,
  };
}

function post(body: unknown, ip = "203.0.113.10") {
  return POST(
    new Request("https://datago.uk/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

function mockFetch({ turnstile = true, resendStatus = 200 } = {}) {
  const mock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    void init;
    const url = String(input);

    if (url === TURNSTILE_URL) {
      return Response.json({ success: turnstile });
    }

    if (url === RESEND_URL) {
      return Response.json({ id: "email-id" }, { status: resendStatus });
    }

    throw new Error(`Unexpected request to ${url}`);
  });

  vi.stubGlobal("fetch", mock);
  return mock;
}

function callsTo(mock: ReturnType<typeof mockFetch>, url: string) {
  return mock.mock.calls.filter(([input]) => String(input) === url);
}

beforeEach(() => {
  resetRateLimit();
  for (const [name, value] of Object.entries(ENV)) {
    vi.stubEnv(name, value);
  }
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("sends a valid enquiry with the enquirer as reply-to", async () => {
    const fetchMock = mockFetch();
    const response = await post(validBody());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(response.headers.get("Cache-Control")).toBe("no-store");

    const [verify] = callsTo(fetchMock, TURNSTILE_URL);
    const verifyBody = (verify[1] as RequestInit).body as URLSearchParams;
    expect(verifyBody.get("secret")).toBe(ENV.TURNSTILE_SECRET_KEY);
    expect(verifyBody.get("response")).toBe("token-from-widget");

    const sends = callsTo(fetchMock, RESEND_URL);
    expect(sends).toHaveLength(1);
    const init = sends[0][1] as RequestInit;
    const email = JSON.parse(init.body as string);
    expect(init.headers).toMatchObject({
      Authorization: `Bearer ${ENV.RESEND_API_KEY}`,
    });
    expect(email.from).toBe(ENV.CONTACT_FROM_EMAIL);
    expect(email.to).toEqual([ENV.CONTACT_TO_EMAIL]);
    expect(email.reply_to).toBe("test.person@example.org");
    expect(email.subject).toBe("Website enquiry from Test Person");
    expect(email.text).toContain("We would like to discuss a reporting project.");
  });

  it("rejects missing fields and sends nothing", async () => {
    const fetchMock = mockFetch();
    const response = await post(validBody({ name: "", email: "not-an-email", message: "" }));
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body.code).toBe("invalid");
    expect(Object.keys(body.fields).sort()).toEqual(["email", "message", "name"]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a filled honeypot and sends nothing", async () => {
    const fetchMock = mockFetch();
    const response = await post(validBody({ website: "https://spam.example" }));

    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("rejected");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a form submitted too fast", async () => {
    const fetchMock = mockFetch();
    const response = await post(validBody({ startedAt: Date.now() - 500 }));

    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("too_fast");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a missing or stale start time", async () => {
    mockFetch();
    const missing = await post(validBody({ startedAt: undefined }));
    const stale = await post(validBody({ startedAt: Date.now() - 48 * 60 * 60 * 1000 }));

    expect((await missing.json()).code).toBe("bad_request");
    expect((await stale.json()).code).toBe("bad_request");
  });

  it("rejects a failed Turnstile check and does not send", async () => {
    const fetchMock = mockFetch({ turnstile: false });
    const response = await post(validBody());

    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("turnstile_failed");
    expect(callsTo(fetchMock, TURNSTILE_URL)).toHaveLength(1);
    expect(callsTo(fetchMock, RESEND_URL)).toHaveLength(0);
  });

  it("rejects a missing Turnstile token without calling Cloudflare", async () => {
    const fetchMock = mockFetch();
    const response = await post(validBody({ turnstileToken: "" }));

    expect((await response.json()).code).toBe("turnstile_failed");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("limits requests per IP address", async () => {
    mockFetch();

    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect((await post(validBody(), "198.51.100.7")).status).toBe(200);
    }

    const limited = await post(validBody(), "198.51.100.7");
    expect(limited.status).toBe(429);
    expect((await limited.json()).code).toBe("rate_limited");

    const otherAddress = await post(validBody(), "198.51.100.8");
    expect(otherAddress.status).toBe(200);
  });

  it("falls back to the default recipient when CONTACT_TO_EMAIL is unset", async () => {
    const fetchMock = mockFetch();
    vi.stubEnv("CONTACT_TO_EMAIL", "");
    const response = await post(validBody());

    expect(response.status).toBe(200);
    const [send] = callsTo(fetchMock, RESEND_URL);
    const email = JSON.parse((send[1] as RequestInit).body as string);
    expect(email.to).toEqual([DEFAULT_CONTACT_TO_EMAIL]);
  });

  it("says it is not configured when a variable is missing", async () => {
    const fetchMock = mockFetch();
    vi.stubEnv("RESEND_API_KEY", "");
    const response = await post(validBody());

    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("not_configured");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a provider failure and does not log the message", async () => {
    mockFetch({ resendStatus: 500 });
    const response = await post(validBody());

    expect(response.status).toBe(502);
    expect((await response.json()).code).toBe("send_failed");
    const logged = vi.mocked(console.error).mock.calls.flat().join(" ");
    expect(logged).not.toContain("reporting project");
    expect(logged).not.toContain("test.person@example.org");
  });

  it("rejects a body that is not JSON", async () => {
    mockFetch();
    const response = await post("not json");

    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("bad_request");
  });
});
