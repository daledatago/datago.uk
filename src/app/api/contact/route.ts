import {
  clientIp,
  handleContact,
  MAX_BODY_BYTES,
  type ContactResult,
} from "@/lib/contact";

function respond(result: ContactResult) {
  const body = result.ok
    ? { ok: true }
    : { ok: false, code: result.code, fields: result.fields };

  return Response.json(body, {
    status: result.status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  let body: unknown = null;

  try {
    const raw = await request.text();

    if (raw.length > MAX_BODY_BYTES) {
      return respond({ ok: false, status: 400, code: "bad_request" });
    }

    body = JSON.parse(raw);
  } catch {
    body = null;
  }

  return respond(
    await handleContact({ body, ip: clientIp(request.headers) }),
  );
}
