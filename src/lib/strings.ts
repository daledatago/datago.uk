export const site = {
  name: "Datago",
  legalName: "Datago Ltd",
  url: "https://datago.uk",
  email: "info@datago.uk",
  description:
    "Datago is the UK company behind Bridgly, building product-led, governed AI transformation platforms that connect work, decisions, systems, and AI activity into organisational intelligence.",
  assets: {
    hero: "/assets/datago-operating-intelligence.jpg",
  },
  bridgly: {
    name: "Bridgly",
    url: "https://bridgly.ai",
    attribution: "Bridgly is a Datago product.",
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
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/bridgly", label: "Bridgly" },
  { href: "/lab", label: "Lab/archive" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const home = {
  hero: {
    eyebrow: "Datago Ltd",
    title: "Datago builds product-led, governed AI transformation.",
    body:
      "We create enterprise platforms that connect work, decisions, systems, and AI activity into governed organisational intelligence. Bridgly is the flagship proof point.",
    primaryCta: "Explore Bridgly",
    secondaryCta: "Contact Datago",
  },
  thesis: {
    eyebrow: "Company thesis",
    title:
      "AI transformation will be won by organisations that can govern how intelligence learns from work.",
    body:
      "Datago is the company behind product-led AI transformation: trusted systems that connect operational context, expose evidence, govern recommendations, and improve from outcomes. The point is a governed product layer that can explain what changed, why it changed, and what should improve next.",
  },
  bridgly: {
    eyebrow: "Flagship platform",
    title: "Bridgly, by Datago",
    body:
      "Bridgly is Datago's flagship platform and proof point: a self-improving organisational intelligence layer that connects work, decisions, systems, and AI activity into a governed graph.",
    cta: "Visit bridgly.ai",
  },
  support: {
    eyebrow: "Company role",
    title: "Product-led transformation, backed by implementation discipline.",
    items: [
      {
        title: "Product studio",
        body:
          "We build governed intelligence products with Bridgly as the flagship platform and proof of the thesis.",
      },
      {
        title: "Enterprise adoption",
        body:
          "We help teams connect systems, align stakeholders, and adopt the product around real organisational context.",
      },
      {
        title: "Governance",
        body:
          "We make access, evidence, permissions, and decision trails part of the product surface from the start.",
      },
      {
        title: "Measurement",
        body:
          "We track AI impact against work outcomes such as cycle time, rework, capability gaps, risk, and spend.",
      },
    ],
  },
  lab: {
    eyebrow: "Lab",
    title: "Agents & Pencils is optional background.",
    body:
      "The lab remains a quiet archive for agent-native product ideas, prototypes, and applied AI research. Enterprise buyers should meet Datago first, then Bridgly.",
  },
  contact: {
    title: "Talk to Datago",
    body:
      "For corporate enquiries, product partnerships, or Bridgly adoption conversations, contact the company directly.",
    cta: "Email info@datago.uk",
  },
};

export const bridglyPage = {
  eyebrow: "Flagship platform",
  title: "Bridgly is the self-improving organisational intelligence platform from Datago.",
  body:
    "Bridgly connects work, decisions, systems, and AI activity into a permission-aware governed graph, then learns from every question, gap, recommendation, action, and outcome.",
  promise: "Understand how work moves. Measure how AI changes it. Govern every answer. Learn from every outcome.",
  cta: "Visit bridgly.ai",
  spine: [
    {
      title: "Connectors",
      body:
        "Connect the systems where work, decisions, AI activity, risk, spend, and outcomes already live.",
    },
    {
      title: "Governed graph",
      body:
        "Link those signals through a permission-aware graph that respects access, context, provenance, and evidence.",
    },
    {
      title: "Recursive learning",
      body:
        "Use every question, gap, recommendation, action, and result to improve future answers, workflows, and playbooks.",
    },
  ],
  relationship: {
    title: "Built by Datago for enterprise transformation.",
    body:
      "Datago is the company behind Bridgly. The Datago site establishes company trust, thesis, and product studio intent; the Bridgly site carries the product promise, connectors, governance model, recursive learning loop, and demo journey.",
  },
};

export const approachPage = {
  eyebrow: "Approach",
  title: "Governed AI transformation needs a product layer, not a tooling rollout.",
  body:
    "Datago builds and supports products that connect operational context, measure outcomes, govern decisions, and improve through recursive learning loops.",
  pillars: [
    {
      title: "Connect the operating context",
      body:
        "Bring people, teams, capabilities, work items, tools, decisions, AI activity, spend, and risk into a shared evidence layer.",
    },
    {
      title: "Measure AI impact against work outcomes",
      body:
        "Move beyond activity metrics and inspect changes in cycle time, rework, learning gaps, decision quality, and operational drag.",
    },
    {
      title: "Govern access, evidence, and decisions",
      body:
        "Make permissions, provenance, answer boundaries, and decision trails visible enough for enterprise use.",
    },
    {
      title: "Improve through recursive learning loops",
      body:
        "Use each question, gap, recommendation, action, and outcome to update future answers, playbooks, workflows, and interventions.",
    },
  ],
  loop: [
    "Sense: connectors, chat, workflows, decisions, work items, AI-tool events, and performance signals.",
    "Understand: graph links people, teams, capabilities, work, tools, outcomes, spend, and risk.",
    "Recommend: agents suggest coaching, process fixes, knowledge gaps, and capability investments.",
    "Act: workflows, nudges, learning plans, connector changes, agent runs, and decision prompts.",
    "Measure: cycle time, rework, learning gaps, and AI impact.",
    "Learn: graph updates beliefs, confidence, playbooks, and future recommendations.",
  ],
};

export const companyPage = {
  eyebrow: "Company",
  title: "Datago is the UK company behind Bridgly.",
  body:
    "Datago Ltd builds product-led, governed AI transformation platforms for enterprises, with Bridgly as the flagship platform.",
  facts: [
    { label: "Legal identity", value: "Datago Ltd" },
    { label: "Corporate contact", value: site.email },
    { label: "Flagship product", value: "Bridgly" },
    { label: "Company number", value: site.legal.companyNumber },
    { label: "Registered office", value: site.legal.registeredOffice },
  ],
  architecture: [
    {
      title: "Datago",
      body:
        "The UK limited company, trust layer, company thesis, and corporate product studio.",
    },
    {
      title: "Bridgly",
      body:
        "Datago's flagship governed organisational intelligence platform and proof of the product thesis.",
    },
    {
      title: "Agents & Pencils",
      body:
        "An optional lab/archive for agent-native product ideas and applied AI research.",
    },
  ],
  founderNote:
    "Datago is founder-led and product-led. Implementation support exists to help enterprises adopt governed intelligence products safely and productively.",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Contact Datago",
  body:
    "For corporate enquiries, partnerships, product adoption, or questions about Bridgly, email the company directly.",
  primary: "Email info@datago.uk",
  note:
    "This site is currently mailto-first and does not collect enquiry details through a web form.",
};

export const labPage = {
  eyebrow: "Lab",
  title: "Agents & Pencils is a quiet Datago lab/archive.",
  body:
    "Agents & Pencils is retained as optional background for agent-native product ideas, prototypes, and applied AI research. It is not the primary enterprise-facing path: Datago is the company, and Bridgly is the flagship platform.",
  options: [
    "Keep a one-page lab/archive explaining the relationship.",
    "Link to Datago and Bridgly from any retained Agents & Pencils surface.",
    "Consider redirects or canonical handling later once the brand transition is settled.",
  ],
};

export const privacyPage = {
  eyebrow: "Privacy",
  title: "Privacy notice",
  body:
    "This placeholder privacy notice is included for the first build and should be reviewed before production use.",
  points: [
    "Datago can be contacted at info@datago.uk for privacy-related enquiries.",
    "This site is currently mailto-first and does not collect enquiry details through a web form.",
    "If analytics, forms, or additional tracking are added later, this notice should be updated before those services go live.",
  ],
};

export const termsPage = {
  eyebrow: "Terms",
  title: "Legal notice",
  body:
    "This placeholder legal notice is included for the first build and should be reviewed before production use.",
  points: [
    "Datago Ltd is the company operating this website.",
    `Company number: ${site.legal.companyNumber}.`,
    `Registered office: ${site.legal.registeredOffice}.`,
    "This page is a concise legal notice for the corporate website.",
  ],
};
