import type {
  LoopStep as BridglyLoopStep,
  SupportCard as BridglySupportCard,
} from "@/components/bridgly-flagship-showcase";

export const site = {
  name: "DataGo",
  legalName: "DataGo Ltd",
  url: "https://datago.uk",
  email: "info@datago.uk",
  description:
    "DataGo Ltd is the legal company, Databricks partner, and contracting entity behind Bridgly. DataGo builds governed AI systems for organisations and routes product evaluation to Bridgly, an application being developed for governed, evidence-backed human and AI-assisted work.",
  assets: {
    hero: "/assets/datago-operating-intelligence.jpg",
  },
  bridgly: {
    name: "Bridgly",
    url: "https://bridgly.ai",
    attribution:
      "Bridgly is an application being developed by DataGo Ltd, founded on Databricks.",
    pages: {
      aiImpact: "https://bridgly.ai/ai-impact",
      connectors: "https://bridgly.ai/connectors",
      governance: "https://bridgly.ai/governance",
      demo: "https://bridgly.ai/demo",
      privacy: "https://bridgly.ai/privacy",
      terms: "https://bridgly.ai/terms",
    },
  },
  legal: {
    companyNumber: "14751587",
    registeredOffice: "2 Old Bath Road, Newbury, Berkshire, England, RG14 1QL",
  },
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/bridgly", label: "Bridgly" },
  { href: "/approach", label: "Approach" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/bridgly", label: "Bridgly" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const home = {
  hero: {
    eyebrow: "DataGo Ltd",
    title: "Governed AI systems for organisations learning with AI.",
    body:
      "DataGo Ltd is the legal company, Databricks partner, and contracting entity behind Bridgly. We build company trust, governed operating systems, and product direction that help organisations see, govern, and improve how AI changes work.",
    primaryCta: "See Bridgly",
    secondaryCta: "Talk to DataGo",
    nodes: [
      {
        title: "People",
        body:
          "AI adoption only matters if people can work with it safely, clearly, and with useful support.",
      },
      {
        title: "Work",
        body:
          "The real operating problem lives in projects, workflows, handovers, and the work that actually gets accepted.",
      },
      {
        title: "AI activity",
        body:
          "Useful systems show where AI is being used, not as theatre, but as part of real operating context.",
      },
      {
        title: "Decisions",
        body:
          "Governed AI systems should make decision paths, ownership, and evidence easier to inspect.",
      },
      {
        title: "Risk",
        body:
          "Risk should be visible early through permissions, provenance, boundaries, and practical review points.",
      },
      {
        title: "Outcomes",
        body:
          "What matters is measurable improvement: better delivery, better learning, and better organisational behaviour.",
      },
    ],
    visual: {
      label: "System builder",
      bridge: "Bridgly product surface",
      foot: "DataGo connects people, work, AI activity, decisions, risk, and outcomes into governed learning systems.",
    },
  },
  thesis: {
    eyebrow: "Company thesis",
    title:
      "AI transformation needs governed visibility, not another disconnected rollout.",
    body:
      "DataGo exists to help organisations learn with AI in a way that stays practical, inspectable, and useful. We care about visibility, ownership, evidence, and measurable improvement because AI changes work whether leaders can see it or not.",
  },
  buildLoop: {
    eyebrow: "What DataGo builds",
    title: "We build governed systems that improve in the open.",
    body:
      "DataGo is not a slideware company. We work through a practical loop: understand the operating problem, design the governed system, build the product surface, measure what changes, and improve from evidence.",
    phases: [
      {
        step: "01",
        title: "Sense the operating problem",
        body:
          "We start where work already happens: people, tools, workflows, decisions, gaps, and handovers.",
      },
      {
        step: "02",
        title: "Design the governed system",
        body:
          "We decide what needs structure, permissions, traceability, and clear boundaries before anything scales.",
      },
      {
        step: "03",
        title: "Build the product or workflow",
        body:
          "We turn the thesis into something usable: a product surface, workflow, interface, or operating layer people can work with.",
      },
      {
        step: "04",
        title: "Measure adoption and impact",
        body:
          "We look at whether behaviour changed, whether work improved, and whether the evidence supports the claim.",
      },
      {
        step: "05",
        title: "Improve the loop",
        body:
          "The system should learn from outcomes, not just report them, so the next cycle is more useful than the last.",
      },
    ],
  },
  bridgly: {
    eyebrow: "Flagship platform",
    title: "Bridgly is DataGo's flagship product for governed AI-enabled work.",
    body:
      "DataGo provides the company thesis, trust layer, Databricks partnership context, and contracting entity behind Bridgly. Bridgly is the application layer being developed for governed, evidence-backed human and AI-assisted work.",
    cta: "Visit bridgly.ai",
    lens: {
      eyebrow: "Operating lens",
      title: "A governed view across organisation, work, value, and governance.",
      body:
        "Bridgly connects the layers that usually stay fragmented: people, tools, AI agents, evidence, decisions, opportunities, and outcomes. The point is not another dashboard. The point is a clearer operating lens for how AI is changing work.",
    },
    path: [
      {
        title: "DataGo company thesis",
        body:
          "Why governed AI systems matter and why organisations need trust, context, and evidence.",
      },
      {
        title: "Bridgly platform",
        body:
          "The product layer being developed on Databricks to connect AI activity, work, governance, and measurable outcomes.",
      },
      {
        title: "Organisations learning with AI",
        body:
          "Teams gain visibility, better governance, and a clearer loop for measurable improvement.",
      },
    ],
  },
  principles: {
    eyebrow: "Principles",
    title: "How DataGo approaches serious AI systems.",
    body:
      "We want the site to feel human because the work is human. The systems still need to be disciplined, measurable, and worth trusting.",
    items: [
      {
        title: "Human-led AI",
        body:
          "People should stay able to question, inspect, and shape how AI changes their work.",
      },
      {
        title: "Governance before scale",
        body:
          "Permissions, provenance, review boundaries, and behaviour expectations should not be retrofitted later.",
      },
      {
        title: "Evidence over dashboards",
        body:
          "A claim is only useful if leaders can see the supporting work, decisions, and outcome traces behind it.",
      },
      {
        title: "Measurable improvement",
        body:
          "We care about whether work improves over time, not whether a chart merely looks active.",
      },
      {
        title: "Products over slideware",
        body:
          "The point is to build something organisations can use, learn from, and operationalise, not just describe.",
      },
    ],
  },
  contact: {
    title: "Talk to DataGo",
    body:
      "For company enquiries, partnerships, or Bridgly conversations, contact the company directly.",
    cta: "Email info@datago.uk",
  },
  answers: [
    {
      question: "What is DataGo?",
      answer:
        "DataGo Ltd is the legal company, Databricks partner, and contracting entity behind Bridgly. It sets the company trust layer, governed AI thesis, and product direction.",
    },
    {
      question: "What does DataGo build?",
      answer:
        "DataGo builds governed AI systems for organisations and routes product evaluation to Bridgly, an application being developed for governed, evidence-backed human and AI-assisted work.",
    },
    {
      question: "Where should product buyers go next?",
      answer:
        "Use datago.uk to verify the company and thesis, then move to bridgly.ai for product detail, governance, connectors, impact measurement, and demos.",
    },
  ],
};

export const bridglyPage = {
  eyebrow: "Flagship platform",
  title: "Bridgly is DataGo's flagship product for",
  titleAccent: "governed AI-enabled work",
  body:
    "Bridgly is an application being developed by DataGo Ltd for governed, evidence-backed human and AI-assisted work. It is founded on Databricks and is intended to connect human work, agent work, tools, evidence, decisions, governance, and outcomes into one operating layer.",
  note:
    "Questions about Bridgly, enterprise fit, or early product direction? Contact DataGo and we'll route the conversation to the right product or implementation discussion.",
  promise:
    "Understand how work moves. Measure how AI changes it. Govern the evidence. Learn from every outcome.",
  cta: "Visit bridgly.ai",
  secondaryCta: "Contact DataGo",
  loopLabel: "The loop · how a signal becomes learning",
  loop: [
    {
      number: "1",
      title: "Interaction",
      body:
        "A human, agent, tool, or workflow creates a meaningful work signal.",
      group: "work",
      dotClass: "bridgly-flagship__loop-dot--green",
    },
    {
      number: "2",
      title: "Evidence",
      body:
        "Bridgly links the signal to source context, citations, and provenance.",
      group: "govern",
      dotClass: "bridgly-flagship__loop-dot--amber",
    },
    {
      number: "3",
      title: "Govern",
      body:
        "Permissions, scope, agent authority, and approvals are evaluated.",
      group: "govern",
      dotClass: "bridgly-flagship__loop-dot--blue",
    },
    {
      number: "4",
      title: "Decide",
      body:
        "The system helps create a safe summary, decision prompt, or governed action.",
      group: "govern",
      dotClass: "bridgly-flagship__loop-dot--blue",
    },
    {
      number: "5",
      title: "Outcome",
      body:
        "Value, risk, cost, quality, and confidence are measured.",
      group: "learn",
      dotClass: "bridgly-flagship__loop-dot--amber",
    },
    {
      number: "6",
      title: "Learn",
      body:
        "Patterns feed back into institutional memory and future work.",
      group: "learn",
      dotClass: "bridgly-flagship__loop-dot--green",
    },
  ] satisfies BridglyLoopStep[],
  supporting: {
    title: "From scattered AI activity to measurable organisational learning.",
    body:
      "Bridgly is being developed to turn work signals into evidence-backed decisions, governed actions, measured outcomes, and reusable institutional memory. The aim is not another dashboard. The aim is a clearer operating layer for how AI changes work.",
    cards: [
      {
        title: "AI-enabled work visibility",
        body:
          "See where people, agents, projects, tools, decisions, and risks are changing how work gets done.",
        group: "work",
        icon: "visibility",
      },
      {
        title: "Governed evidence and authority",
        body:
          "Keep permissions, provenance, source context, agent scope, approvals, and audit receipts visible enough for enterprise use.",
        group: "govern",
        icon: "authority",
      },
      {
        title: "Measurable learning loops",
        body:
          "Connect recommendations and actions to outcomes so successful patterns can compound across the organisation.",
        group: "learn",
        icon: "learning",
      },
    ],
  } satisfies {
    title: string;
    body: string;
    cards: BridglySupportCard[];
  },
  routes: [
    {
      title: "AI impact measurement",
      body:
        "For the product view of measuring AI through accepted work, cycle time, quality, rework, cost, and throughput.",
      href: site.bridgly.pages.aiImpact,
    },
    {
      title: "Connectors",
      body:
        "For the product view of connecting GitHub, Linear, Google Workspace, AI providers, telemetry, and customer systems.",
      href: site.bridgly.pages.connectors,
    },
    {
      title: "Governance",
      body:
        "For the product view of permissions, policy boundaries, evidence, audit, identity, and access review.",
      href: site.bridgly.pages.governance,
    },
  ],
  relationship: {
    title: "DataGo is the provider company. Bridgly carries product detail.",
    body:
      "datago.uk should answer who is behind Bridgly, who contracts with buyers, what thesis guides the company, and how enterprises can contact the team. bridgly.ai should answer how the application is being developed, what it connects, how governance is handled, and how buyers request a demo.",
  },
  answers: [
    {
      question: "What is Bridgly?",
      answer:
        "Bridgly is an application being developed by DataGo Ltd for governed, evidence-backed human and AI-assisted work, founded on Databricks.",
    },
    {
      question: "How does Bridgly support enterprise AI readiness?",
      answer:
        "It helps organisations connect work signals, permissions, governance context, and outcome measurement so AI adoption can be understood and improved in operating context.",
    },
    {
      question: "Where should buyers go for product detail?",
      answer:
        "Detailed product journeys, connector coverage, governance detail, and demo requests belong on bridgly.ai.",
    },
  ],
};

export const approachPage = {
  eyebrow: "Approach",
  title: "Governed AI transformation needs an operating layer.",
  body:
    "DataGo builds and supports governed AI systems that connect operational context, measure outcomes, govern decisions, and improve through evidence rather than hype. Bridgly is the Databricks-founded application path for putting that approach into practice.",
  pillars: [
    {
      title: "Readiness as evidence",
      body:
        "Enterprise AI readiness should show where data, permissions, owners, processes, and risks are strong enough to support AI-assisted work.",
    },
    {
      title: "Measure AI impact against work",
      body:
        "Impact is not only usage or token spend. It should be visible in cycle time, rework, quality, capability gaps, decisions, and outcomes.",
    },
    {
      title: "Govern access and recommendations",
      body:
        "Governance belongs in the product surface: permissions, provenance, answer boundaries, policy context, and decision trails.",
    },
    {
      title: "Improve from outcomes",
      body:
        "Each question, recommendation, action, and result should improve future playbooks, workflows, and decisions.",
    },
  ],
  loop: [
    "Sense: connectors, chat, workflows, decisions, work items, AI-tool events, and performance signals.",
    "Understand: link people, teams, capabilities, work, tools, outcomes, spend, and risk into governed operating context.",
    "Recommend: agents suggest coaching, process fixes, knowledge gaps, and capability investments with evidence.",
    "Act: workflows, nudges, learning plans, connector changes, agent runs, and decision prompts move the work forward.",
    "Measure: cycle time, rework, quality, capability gaps, spend, and AI impact are evaluated against outcomes.",
    "Learn: future recommendations improve as the system sees more questions, corrections, actions, and results.",
  ],
  route: {
    title: "Translate the thesis into product evaluation on Bridgly.",
    body:
      "Use DataGo to explain why governed AI systems matter. Use Bridgly to show how the product measures AI impact, supports governance, and connects enterprise systems.",
    actions: [
      {
        title: "Measure AI impact",
        body:
          "See how Bridgly connects work accepted, cycle time, quality, rework, cost, and throughput into measurable AI outcomes.",
        href: site.bridgly.pages.aiImpact,
      },
      {
        title: "Review governance",
        body:
          "See how the product handles permissions, provenance, policy boundaries, and evidence trails in practice.",
        href: site.bridgly.pages.governance,
      },
    ],
  },
  answers: [
    {
      question: "What does enterprise AI readiness mean here?",
      answer:
        "It means the organisation can connect work systems, identify owners, respect permissions, understand risk boundaries, and measure whether AI is improving outcomes.",
    },
    {
      question: "What is AI impact measurement?",
      answer:
        "AI impact measurement means linking AI use to changes in accepted work, cycle time, quality, rework, spend, and operating outcomes rather than reporting usage alone.",
    },
    {
      question: "What makes a governed AI system?",
      answer:
        "A governed AI system keeps permissions, provenance, answer boundaries, evidence, and decision trails visible enough for enterprise use.",
    },
  ],
};

export const aboutPage = {
  eyebrow: "About",
  title: "DataGo Ltd is the legal company behind Bridgly.",
  body:
    "DataGo Ltd provides the company trust layer, Databricks partnership context, product thesis, and contracting entity behind Bridgly. Bridgly is the application being developed for governed, evidence-backed human and AI-assisted work.",
  facts: [
    { label: "Company", value: "DataGo" },
    { label: "Registered legal identity", value: site.legalName },
    { label: "Role", value: "Legal company and contracting entity behind Bridgly" },
    { label: "Databricks relationship", value: "Databricks partner" },
    { label: "Corporate contact", value: site.email },
    { label: "Flagship product", value: "Bridgly" },
    { label: "Company number", value: site.legal.companyNumber },
    { label: "Registered office", value: site.legal.registeredOffice },
  ],
  architecture: [
    {
      title: "DataGo",
      body:
        "The UK company context, Databricks partner relationship, operating thesis, and product studio for governed AI systems.",
    },
    {
      title: "Bridgly",
      body:
        "The application being developed by DataGo for governed, evidence-backed human and AI-assisted work, founded on Databricks.",
    },
  ],
  founderNote:
    "DataGo is founder-led and product-led. Implementation support exists to help enterprises adopt governed intelligence products safely, but Bridgly is the primary product route.",
  route: {
    title: "Where company trust ends and product evaluation begins.",
    body:
      "This page should help buyers verify the company behind Bridgly. Once that trust check is complete, the next step is to review the product's connectors, governance model, AI impact measurement, and demo path on Bridgly.",
    cta: "Review Bridgly",
  },
  answers: [
    {
      question: "Who is behind Bridgly?",
      answer:
        "DataGo Ltd is the UK legal company, Databricks partner, and contracting entity behind Bridgly.",
    },
    {
      question: "What is DataGo's role?",
      answer:
        "DataGo provides the company trust layer, the governed AI thesis, and the product direction behind Bridgly.",
    },
    {
      question: "What should a buyer do next?",
      answer:
        "After validating the company and thesis on datago.uk, move to bridgly.ai for product detail and demo evaluation.",
    },
  ],
};

export const insightsPage = {
  eyebrow: "Insights",
  title: "Company thinking on governed AI transformation.",
  body:
    "These notes frame how DataGo thinks about enterprise AI readiness, AI governance, adoption visibility, and measurable AI outcomes. Product-specific detail, demonstrations, security, and deployment detail belong on Bridgly.",
  briefs: [
    {
      title: "What should enterprise AI readiness prove?",
      body:
        "Readiness should prove that an organisation can connect the systems where work happens, understand who owns decisions, respect permissions, and measure whether AI changes outcomes. A slide deck saying teams are ready is not enough; governed AI systems need evidence of data quality, operating context, adoption patterns, and risk boundaries.",
    },
    {
      title: "Why AI impact measurement needs work context",
      body:
        "AI impact measurement becomes useful when leaders can connect AI activity to accepted work, cycle time, quality, rework, spend, and team capability. DataGo's thesis is that token counts and tool usage are inputs, not outcomes. Bridgly is the product expression of this thesis.",
    },
    {
      title: "How AI governance becomes practical",
      body:
        "AI governance is practical when permissions, provenance, policy context, and decision trails are visible in the flow of work. Governance should help teams act with confidence, not sit outside the operating system as a disconnected review process.",
    },
    {
      title: "Why organisational intelligence matters",
      body:
        "Organisational intelligence gives enterprises a clearer way to see how people, teams, projects, tools, decisions, risks, and outcomes relate. When AI is introduced, that context becomes the difference between scattered automation and measurable improvement.",
    },
  ],
  principles: [
    "DataGo writes at the company level: trust, thesis, governance, readiness, and product direction.",
    "Bridgly carries product promise, demo journeys, connectors, governance detail, and buyer workflows.",
  ],
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Contact DataGo",
  body:
    "For corporate enquiries, Databricks partnership conversations, contracting matters, or questions about Bridgly, email DataGo Ltd directly.",
  primary: "Email info@datago.uk",
  note:
    "This site is mailto-first and does not collect enquiry details through a web form.",
  route: {
    title: "Bring product conversations to Bridgly.",
    body:
      "Corporate and partnership contact belongs here. Buyers who already want product detail should move directly to Bridgly for governance, connectors, AI impact measurement, and demo flow.",
    cta: "Visit Bridgly demo path",
    href: site.bridgly.pages.demo,
  },
};

export const labPage = {
  eyebrow: "Lab/archive",
  title: "Agents & Pencils is a quiet DataGo lab/archive.",
  body:
    "Agents & Pencils is retained as optional background for agent-native product ideas, prototypes, and applied AI research. It is not the primary enterprise-facing path: DataGo is the company, and Bridgly is the flagship platform.",
  options: [
    "Keep lab/archive references small and clearly secondary.",
    "Route enterprise product interest to DataGo and Bridgly.",
    "Consider redirects or canonical handling later once the brand transition is settled.",
  ],
};

export const privacyPage = {
  eyebrow: "Privacy",
  title: "Corporate website privacy notice",
  body:
    "This notice explains how DataGo Ltd handles personal data in connection with the datago.uk corporate website. It does not govern use of Bridgly, which is covered by the Bridgly Privacy Policy.",
  updated: "19 July 2026",
  bridglyNotice:
    "Use of Bridgly is governed by the Bridgly Privacy Policy, not this corporate website notice.",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        `${site.legalName} operates datago.uk as the corporate website for the legal company, Databricks partner, and contracting entity behind Bridgly.`,
        `Our registered office is ${site.legal.registeredOffice}. Our company number is ${site.legal.companyNumber}. You can contact us about privacy matters at ${site.email}.`,
      ],
    },
    {
      title: "Scope of this notice",
      paragraphs: [
        "This notice applies to visits to datago.uk, technical website access data, and email enquiries sent to DataGo through the site.",
        "It does not apply to use of Bridgly, product demonstrations, or product services delivered through bridgly.ai. Those activities are governed by the Bridgly Privacy Policy and related Bridgly terms.",
      ],
    },
    {
      title: "Website access and technical logs",
      paragraphs: [
        "When you access datago.uk, our hosting and delivery providers may process technical data needed to serve the site, such as IP address, request metadata, browser details, device type, referring URL, timestamps, and basic delivery or security logs.",
        "We use this information to deliver the site, maintain availability, diagnose faults, detect abuse, and protect the website and its infrastructure. The site is intentionally analytics-free at this stage and does not run Google Analytics or similar visitor-tracking scripts.",
      ],
      bullets: [
        "server and CDN request logs",
        "basic device and browser data",
        "security and abuse-prevention records",
      ],
    },
    {
      title: "Email enquiries",
      paragraphs: [
        `If you contact us at ${site.email}, we will process the information you provide, which may include your name, email address, organisation, message contents, and any business context you choose to share.`,
        "We use this information to respond to your enquiry, manage prospective business relationships, handle contracting or partnership discussions, and keep relevant business records.",
      ],
    },
    {
      title: "Lawful bases",
      paragraphs: [
        "We rely on legitimate interests where processing is necessary to operate, secure, and improve the corporate website and to handle business enquiries.",
        "We may also process data where necessary to take steps at your request before entering into a contract, to perform a contract, or to comply with a legal obligation.",
      ],
      bullets: [
        "legitimate interests in running and securing the corporate website",
        "pre-contract steps and contract performance for business enquiries",
        "compliance with legal and regulatory obligations",
      ],
    },
    {
      title: "Service providers",
      paragraphs: [
        "We use service providers to host, secure, and support the website and our business communications. These providers process data on our behalf under appropriate contractual arrangements.",
        "Depending on the service involved, this may include website hosting, content delivery, email, productivity, and security providers.",
      ],
    },
    {
      title: "International transfers",
      paragraphs: [
        "Some service providers may process data outside the UK. Where this happens, we take steps intended to ensure appropriate safeguards are in place, such as adequacy regulations or contractual protections.",
      ],
    },
    {
      title: "Retention",
      paragraphs: [
        "We keep technical website logs for only as long as reasonably necessary for security, operational, and troubleshooting purposes.",
        "We keep business enquiries and related correspondence for as long as needed to respond, manage the relationship, assess opportunities, and meet legal, tax, accounting, or record-keeping obligations.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "Subject to applicable law, you may have rights to request access to your personal data, ask for correction or deletion, object to certain processing, ask us to restrict processing, or request portability where applicable.",
        `To exercise a privacy right, contact ${site.email}. We may need to verify your identity before responding.`,
      ],
    },
    {
      title: "Complaints",
      paragraphs: [
        "If you have a concern about how we handle personal data, please contact us first so we can try to resolve it.",
        "You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO). Details are available at https://ico.org.uk/.",
      ],
    },
    {
      title: "Changes to this notice",
      paragraphs: [
        "We may update this notice from time to time to reflect changes to the website, our legal obligations, or our processing practices. The latest version will be published on this page.",
      ],
    },
  ],
  relatedLinks: [
    {
      label: "Bridgly Privacy Policy",
      href: site.bridgly.pages.privacy,
    },
    {
      label: "DataGo website terms",
      href: "/terms",
    },
  ],
};

export const termsPage = {
  eyebrow: "Terms",
  title: "Corporate website terms of use",
  body:
    "These terms govern access to and use of the datago.uk corporate website. They do not govern use of Bridgly, which is subject to Bridgly product terms and policies.",
  updated: "19 July 2026",
  bridglyNotice:
    "Use of Bridgly, including product access, demonstrations, and product services, is governed by Bridgly-specific terms and policies.",
  sections: [
    {
      title: "Company identity",
      paragraphs: [
        `${site.legalName} operates datago.uk under the DataGo name. DataGo Ltd is the legal company, Databricks partner, and contracting entity behind Bridgly.`,
        `Our company number is ${site.legal.companyNumber} and our registered office is ${site.legal.registeredOffice}.`,
      ],
    },
    {
      title: "Ownership of the website",
      paragraphs: [
        "We own or control the website and its contents, including text, branding, layout, graphics, and other material, except where third-party rights apply.",
      ],
    },
    {
      title: "Acceptable use",
      paragraphs: [
        "You may use this website only for lawful purposes. You must not misuse the site, interfere with its operation, attempt unauthorised access, introduce malicious code, or use the site in a way that could damage DataGo, Bridgly, other users, or the underlying infrastructure.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "All intellectual property rights in this website and its content are reserved unless otherwise stated. You may view the site and print or save limited extracts for internal business reference, but you may not reproduce, distribute, adapt, publish, or exploit site content without permission except as allowed by law.",
      ],
    },
    {
      title: "No reliance",
      paragraphs: [
        "This website is provided for general corporate and product-orientation information only. It is not legal, technical, investment, security, or procurement advice, and it should not be relied on as a substitute for formal diligence or contractual documentation.",
        "Statements about Bridgly describe an application being developed by DataGo and should not be read as a promise of general availability, certification status, or completed marketplace approval unless we expressly state otherwise in writing.",
      ],
    },
    {
      title: "External links",
      paragraphs: [
        "This website may link to external sites, including bridgly.ai. Those sites are provided for convenience. We are not responsible for their content, availability, or terms, and linking does not by itself imply endorsement beyond the stated business relationship.",
      ],
    },
    {
      title: "Liability",
      paragraphs: [
        "To the fullest extent permitted by law, we exclude liability for loss or damage arising from use of, or inability to use, this website or reliance on its content.",
        "Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited under applicable law.",
      ],
    },
    {
      title: "Bridgly relationship",
      paragraphs: [
        "datago.uk exists to identify the provider company, company thesis, partnership posture, and contracting route behind Bridgly.",
        "Product capabilities, demonstrations, security detail, deployment detail, and product-specific legal terms should be reviewed on bridgly.ai and in Bridgly-specific documentation.",
      ],
    },
    {
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of England and Wales. The courts of England and Wales will have exclusive jurisdiction over any dispute arising from or connected with these terms or this website, unless applicable law requires otherwise.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        `Questions about this website or these terms can be sent to ${site.email}.`,
      ],
    },
  ],
  relatedLinks: [
    {
      label: "Bridgly terms",
      href: site.bridgly.pages.terms,
    },
    {
      label: "DataGo privacy notice",
      href: "/privacy",
    },
  ],
};
