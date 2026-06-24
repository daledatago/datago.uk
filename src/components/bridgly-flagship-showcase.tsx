"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/lib/strings";

type ActiveGroup = "work" | "govern" | "learn" | null;

export type LoopStep = {
  number: string;
  title: string;
  body: string;
  group: Exclude<ActiveGroup, null>;
  dotClass: string;
};

export type SupportCard = {
  title: string;
  body: string;
  group: Exclude<ActiveGroup, null>;
  icon: "visibility" | "authority" | "learning";
};

export type BridglyFlagshipShowcaseProps = {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    note: string;
    primaryCta: string;
    secondaryCta: string;
  };
  promise: string;
  loopLabel: string;
  loop: LoopStep[];
  supporting: {
    title: string;
    body: string;
    cards: SupportCard[];
  };
};

function SupportIcon({ icon }: { icon: SupportCard["icon"] }) {
  if (icon === "visibility") {
    return (
      <span className="bridgly-flagship__support-icon-shape bridgly-flagship__support-icon-shape--visibility" />
    );
  }

  if (icon === "authority") {
    return (
      <span className="bridgly-flagship__support-icon-shape bridgly-flagship__support-icon-shape--authority" />
    );
  }

  return (
    <span className="bridgly-flagship__support-icon-shape bridgly-flagship__support-icon-shape--learning" />
  );
}

export function BridglyFlagshipShowcase({
  hero,
  promise,
  loopLabel,
  loop,
  supporting,
}: BridglyFlagshipShowcaseProps) {
  const [activeGroup, setActiveGroup] = useState<ActiveGroup>(null);

  function getHighlightClass(group: Exclude<ActiveGroup, null>) {
    return activeGroup === group ? "is-active" : "";
  }

  return (
    <>
      <section className="bridgly-flagship">
        <div className="site-shell bridgly-flagship__hero">
          <div className="bridgly-flagship__eyebrow">
            <span className="bridgly-flagship__eyebrow-dot" />
            <span>{hero.eyebrow}</span>
          </div>
          <h1>
            {hero.title} <span>{hero.accent}</span>.
          </h1>
          <p className="bridgly-flagship__lede">{hero.body}</p>
          <div className="bridgly-flagship__actions">
            <ButtonLink href={site.bridgly.url}>{hero.primaryCta}</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
          <p className="bridgly-flagship__note">{hero.note}</p>
        </div>
      </section>

      <section className="bridgly-flagship__window-band">
        <div className="site-shell">
          <div className="bridgly-fabric">
            <div className="bridgly-fabric__ambient" />

            <div className="bridgly-fabric__chrome">
              <div className="bridgly-fabric__brand">
                <span className="bridgly-fabric__cube">B</span>
                <span className="bridgly-fabric__wordmark">bridgly</span>
                <span className="bridgly-fabric__chip">FABRIC</span>
              </div>
              <div className="bridgly-fabric__status">
                <span className="bridgly-fabric__status-dot" />
                <span>policy · evidence · memory</span>
              </div>
            </div>

            <div className="bridgly-fabric__body">
              <div className="bridgly-fabric__strand bridgly-fabric__strand--green">
                <span className="bridgly-fabric__travel-dot bridgly-fabric__travel-dot--green" />
              </div>
              <div className="bridgly-fabric__strand bridgly-fabric__strand--violet">
                <span className="bridgly-fabric__travel-dot bridgly-fabric__travel-dot--violet" />
              </div>
              <div className="bridgly-fabric__strand bridgly-fabric__strand--blue">
                <span className="bridgly-fabric__travel-dot bridgly-fabric__travel-dot--blue" />
              </div>
              <div className="bridgly-fabric__strand bridgly-fabric__strand--amber">
                <span className="bridgly-fabric__travel-dot bridgly-fabric__travel-dot--amber" />
              </div>

              <div className="bridgly-fabric__rails" aria-hidden="true">
                <span className="bridgly-fabric__rail bridgly-fabric__rail--left" />
                <span className="bridgly-fabric__rail bridgly-fabric__rail--center" />
                <span className="bridgly-fabric__rail bridgly-fabric__rail--right" />
                <span className="bridgly-fabric__rail-label bridgly-fabric__rail-label--left">
                  permissions
                </span>
                <span className="bridgly-fabric__rail-label bridgly-fabric__rail-label--center">
                  policy
                </span>
                <span className="bridgly-fabric__rail-label bridgly-fabric__rail-label--right">
                  approval
                </span>
              </div>

              <span className="bridgly-fabric__node bridgly-fabric__node--green" />
              <span className="bridgly-fabric__node bridgly-fabric__node--violet" />
              <span className="bridgly-fabric__node bridgly-fabric__node--blue" />
              <span className="bridgly-fabric__node bridgly-fabric__node--amber" />

              <div className="bridgly-fabric__grid">
                <div className="bridgly-fabric__column">
                  <p className="bridgly-fabric__column-label">INPUTS</p>
                  <article
                    className={`bridgly-fabric__card bridgly-fabric__card--work ${getHighlightClass("work")}`}
                    onMouseEnter={() => setActiveGroup("work")}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <div className="bridgly-fabric__card-title">
                      <span className="bridgly-fabric__card-dot bridgly-fabric__card-dot--green" />
                      <span>Human work</span>
                    </div>
                    <p>intent · judgement · decisions</p>
                  </article>
                  <article
                    className={`bridgly-fabric__card bridgly-fabric__card--work ${getHighlightClass("work")}`}
                    onMouseEnter={() => setActiveGroup("work")}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <div className="bridgly-fabric__card-title">
                      <span className="bridgly-fabric__card-dot bridgly-fabric__card-dot--violet" />
                      <span>Agent work</span>
                    </div>
                    <p>delegated actions · runs</p>
                  </article>
                  <article
                    className={`bridgly-fabric__card bridgly-fabric__card--work ${getHighlightClass("work")}`}
                    onMouseEnter={() => setActiveGroup("work")}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <div className="bridgly-fabric__card-title">
                      <span className="bridgly-fabric__card-dot bridgly-fabric__card-dot--blue" />
                      <span>Tools</span>
                    </div>
                    <p>Slack · GitHub · Linear · docs</p>
                  </article>
                </div>

                <div className="bridgly-fabric__center">
                  <div className="bridgly-fabric__ring" />
                  <div className="bridgly-fabric__center-card">
                    <div className="bridgly-fabric__center-brand">
                      <span className="bridgly-fabric__cube bridgly-fabric__cube--small">
                        B
                      </span>
                      <span>Bridgly fabric</span>
                    </div>
                    <p className="bridgly-fabric__center-meta">
                      policy · evidence · memory
                    </p>
                    <div className="bridgly-fabric__center-rule" />
                    <p className="bridgly-fabric__center-foot">
                      every action has a receipt
                    </p>
                  </div>
                  <span className="bridgly-fabric__micro bridgly-fabric__micro--decision">
                    decision
                  </span>
                  <span className="bridgly-fabric__micro bridgly-fabric__micro--evidence">
                    evidence
                  </span>
                </div>

                <div className="bridgly-fabric__column bridgly-fabric__column--outputs">
                  <p className="bridgly-fabric__column-label bridgly-fabric__column-label--right">
                    OUTPUTS
                  </p>
                  <article
                    className={`bridgly-fabric__card bridgly-fabric__card--govern ${getHighlightClass("govern")}`}
                    onMouseEnter={() => setActiveGroup("govern")}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <div className="bridgly-fabric__card-title">
                      <span className="bridgly-fabric__card-dot bridgly-fabric__card-dot--amber" />
                      <span>Evidence</span>
                    </div>
                    <p>citations · provenance · proof</p>
                  </article>
                  <article
                    className={`bridgly-fabric__card bridgly-fabric__card--learn ${getHighlightClass("learn")}`}
                    onMouseEnter={() => setActiveGroup("learn")}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <div className="bridgly-fabric__card-title">
                      <span className="bridgly-fabric__card-dot bridgly-fabric__card-dot--blue" />
                      <span>Outcomes</span>
                    </div>
                    <p>value · risk · cost · confidence</p>
                  </article>
                  <article
                    className={`bridgly-fabric__card bridgly-fabric__card--learn ${getHighlightClass("learn")}`}
                    onMouseEnter={() => setActiveGroup("learn")}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <div className="bridgly-fabric__card-title">
                      <span className="bridgly-fabric__card-dot bridgly-fabric__card-dot--green" />
                      <span>Learning</span>
                    </div>
                    <p>patterns reused in future work</p>
                  </article>
                </div>
              </div>

              <div className="bridgly-fabric__learning-loop">
                <div className="bridgly-fabric__learning-arc" />
                <p>
                  <span className="bridgly-fabric__learning-loop-dot" />
                  learning loop · outcomes feed memory
                </p>
              </div>

              <div className="bridgly-fabric__badges">
                <span>
                  <span className="bridgly-fabric__badge-dot bridgly-fabric__badge-dot--blue" />
                  governed
                </span>
                <span>
                  <span className="bridgly-fabric__badge-dot bridgly-fabric__badge-dot--blue" />
                  permission-aware
                </span>
                <span>
                  <span className="bridgly-fabric__badge-dot bridgly-fabric__badge-dot--violet" />
                  human + agent work
                </span>
                <span>
                  <span className="bridgly-fabric__badge-dot bridgly-fabric__badge-dot--amber" />
                  evidence-backed
                </span>
                <span>
                  <span className="bridgly-fabric__badge-dot bridgly-fabric__badge-dot--green" />
                  measurable learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-band content-band--light">
        <div className="site-shell promise-band promise-band--bridgly">
          <p>{promise}</p>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          <p className="bridgly-flagship__loop-label">{loopLabel}</p>
          <div className="bridgly-flagship__loop">
            {loop.map((step) => (
              <article
                className={`bridgly-flagship__loop-step bridgly-flagship__loop-step--${step.group} ${getHighlightClass(step.group)}`}
                key={step.number}
                onMouseEnter={() => setActiveGroup(step.group)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <div className="bridgly-flagship__loop-step-head">
                  <span className="bridgly-flagship__loop-number">
                    {step.number}
                  </span>
                  <span
                    className={`bridgly-flagship__loop-dot ${step.dotClass}`}
                  />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="site-shell">
          <div className="section-heading">
            <h2>{supporting.title}</h2>
            <p>{supporting.body}</p>
          </div>
          <div className="bridgly-flagship__support-grid">
            {supporting.cards.map((card) => (
              <article
                className={`bridgly-flagship__support-card bridgly-flagship__support-card--${card.group} ${getHighlightClass(card.group)}`}
                key={card.title}
                onMouseEnter={() => setActiveGroup(card.group)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <div className="bridgly-flagship__support-icon">
                  <SupportIcon icon={card.icon} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
