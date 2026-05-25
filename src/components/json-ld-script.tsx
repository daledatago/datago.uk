import { jsonLd } from "@/lib/metadata";

type JsonLdScriptProps = {
  data: unknown;
};

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
