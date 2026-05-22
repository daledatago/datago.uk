import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, body, children }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="site-shell page-intro__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{body}</p>
        {children ? <div className="page-intro__actions">{children}</div> : null}
      </div>
    </section>
  );
}

