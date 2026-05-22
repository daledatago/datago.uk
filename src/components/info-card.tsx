type InfoCardProps = {
  title: string;
  body: string;
  marker?: string;
};

export function InfoCard({ title, body, marker }: InfoCardProps) {
  return (
    <article className="info-card">
      {marker ? <p className="info-card__marker">{marker}</p> : null}
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

