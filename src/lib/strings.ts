export const site = {
  name: "Datago",
  legalName: "Datago Ltd",
  url: "https://datago.uk",
  email: "info@datago.uk",
  description:
    "Datago builds governed organisational intelligence products for enterprises.",
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
  { href: "/lab", label: "Agents & Pencils Lab" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const home = {
  hero: {
    eyebrow: "Datago Ltd",
    title: "Datago builds governed organisational intelligence products.",
    body:
      "We create enterprise platforms that connect work, decisions, systems, and AI impact into governed operating intelligence. Bridgly is our flagship platform.",
    primaryCta: "Explore Bridgly",
    secondaryCta: "Contact Datago",
  },
  thesis: {
    eyebrow: "Company thesis",
    title:
      "AI is becoming part of how work moves. Organisations need evidence, context, and control.",
    body:
      "Datago builds products for the operating layer where people, systems, decisions, and AI activity meet. The aim is not another isolated copilot. It is governed intelligence that can explain what changed, why it changed, and what should improve next.",
  },
  bridgly: {
    eyebrow: "Flagship platform",
    title: "Bridgly, by Datago",
    body:
      "Bridgly helps enterprises understand how work moves, measure how AI changes it, and govern every answer through a permission-aware organisational graph.",
    cta: "Visit bridgly.ai",
  },
  support: {
    eyebrow: "How Datago helps",
    title: "Product-led transformation, backed by implementation discipline.",
    items: [
      {
        title: "Product",
        body:
          "We build enterprise platforms for operating intelligence, governance, measurement, and change.",
      },
      {
        title: "Implementation",
        body:
          "We help connect systems, align stakeholders, and shape adoption around real organisational context.",
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
    title: "Agents & Pencils is Datago's experimental lab.",
    body:
      "The lab remains a quiet home for agent-native product ideas, prototypes, and applied AI research. Enterprise buyers should meet Datago first, then Bridgly.",
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
  title: "Bridgly is Datago's governed organisational intelligence platform.",
  body:
    "Bridgly connects company systems into a permission-aware graph, then uses agents, workflows, and analytics to help teams understand work, decisions, capability, AI impact, risk, and change.",
  promise: "Understand how work moves. Measure how AI changes it. Govern every answer.",
  cta: "Visit bridgly.ai",
  spine: [
    {
      title: "Learn",
      body:
        "Build a living picture of teams, work, tools, decisions, outcomes, and organisational capability.",
    },
    {
      title: "Connect",
      body:
        "Link systems and signals through a permission-aware graph that respects access, context, and evidence.",
    },
    {
      title: "Evolve",
      body:
        "Use agents, workflows, and analytics to recommend improvements, measure impact, and update playbooks.",
    },
  ],
  relationship: {
    title: "Built by Datago for enterprise transformation.",
    body:
      "Datago is the company behind Bridgly. The Datago site explains the product thesis and corporate identity; the Bridgly site remains focused on product interest, demos, and platform detail.",
  },
};

export const approachPage = {
  eyebrow: "Approach",
  title: "AI transformation is an operating model change, not a tooling rollout.",
  body:
    "Datago helps organisations connect context, measure outcomes, govern decisions, and improve through recursive learning loops.",
  pillars: [
    {
      title: "Connect the operating context",
      body:
        "Bring people, teams, capabilities, work items, tools, decisions, spend, and risk into a shared evidence layer.",
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
        "Use what the organisation learns to update recommendations, playbooks, workflows, and future interventions.",
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
    "Datago Ltd builds governed organisational intelligence products for enterprises, with Bridgly as the flagship platform.",
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
      body: "The UK limited company and corporate product studio.",
    },
    {
      title: "Bridgly",
      body: "Datago's flagship governed organisational intelligence platform.",
    },
    {
      title: "Agents & Pencils",
      body: "A de-emphasised lab for agent-native product ideas and applied AI research.",
    },
  ],
  founderNote:
    "Datago is founder-led and product-led, with implementation support focused on safe adoption of governed organisational intelligence products.",
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
  title: "Agents & Pencils is Datago's experimental lab.",
  body:
    "Agents & Pencils is retained as a quiet home for agent-native product ideas, prototypes, and applied AI research. It should not be the primary enterprise-facing path to Bridgly.",
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
