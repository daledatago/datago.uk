import Image from "next/image";
import { credentials } from "@/lib/strings";

/**
 * Partner and certification marks, as text badges. The list in
 * `credentials.items` (src/lib/strings.ts) is the single switch: each entry is
 * shown exactly as written, and an empty list renders nothing at all.
 */
export function CredentialsBand() {
  if (credentials.items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="credentials-h" className="creds">
      <div className="shell creds__in" data-reveal="">
        <h2 className="label" id="credentials-h">
          {credentials.title}
        </h2>
        <ul>
          {credentials.items.map((item) => (
            <li key={item.name}>
              {item.logo ? (
                <Image alt="" height={40} src={item.logo} unoptimized width={120} />
              ) : null}
              <b>{item.name}</b>
              {item.kind ? <span>{item.kind}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
