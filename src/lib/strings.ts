export const site = {
  name: "DataGo",
  legalName: "Datago Ltd",
  searchAlias: "DataGo Solutions Ltd",
  url: "https://datago.uk",
  email: "info@datago.uk",
  description:
    "DataGo builds governed AI systems for organisations. It is the UK company behind Bridgly, the flagship platform for organisational intelligence, AI adoption visibility, governance, and measurable AI outcomes.",
  assets: {
    hero: "/assets/datago-operating-intelligence.jpg",
  },
  bridgly: {
    name: "Bridgly",
    url: "https://bridgly.ai",
    attribution: "Bridgly is DataGo's flagship platform.",
    pages: {
      aiImpact: "https://bridgly.ai/ai-impact",
      connectors: "https://bridgly.ai/connectors",
      governance: "https://bridgly.ai/governance",
      demo: "https://bridgly.ai/demo",
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
  { href: "/lab", label: "Lab/archive" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const home = {
  hero: {
    eyebrow: "DataGo Ltd",
    title: "DataGo builds governed AI systems for organisations.",
    body:
      "We create product-led platforms that help enterprises see, measure, and improve how AI changes work across people, teams, projects, tools, decisions, spend, risk, and outcomes. Bridgly is the flagship platform.",
    primaryCta: "Understand Bridgly",
    secondaryCta: "Contact DataGo",
  },
  thesis: {
    eyebrow: "Company thesis",
    title:
      "Enterprise AI transformation needs governed visibility, not another disconnected rollout.",
    body:
      "DataGo exists to make AI adoption measurable, accountable, and useful at organisational scale. The thesis is simple: governed AI systems should connect operating context, expose evidence, respect permissions, and learn from outcomes so leaders can trust what changed and what should improve next.",
  },
  bridgly: {
    eyebrow: "Flagship platform",
    title: "Bridgly carries the product promise.",
    body:
      "Bridgly is DataGo's flagship organisational intelligence platform for AI adoption visibility, AI impact measurement, governance, connectors, and measurable improvement loops. This company site establishes trust and thesis; the Bridgly site carries the product journey.",
    cta: "Visit bridgly.ai",
  },
  support: {
    eyebrow: "Company role",
    title: "A governed AI product studio, not generic consulting first.",
    items: [
      {
        title: "Company trust",
        body:
          "DataGo provides the UK company context, corporate contact path, and enterprise trust layer behind Bridgly.",
      },
      {
        title: "Product thesis",
        body:
          "We focus on governed AI systems that turn disconnected AI activity into organisational intelligence and measurable outcomes.",
      },
      {
        title: "Enterprise adoption",
        body:
          "Services stay secondary and practical: aligning stakeholders, connecting systems, and helping teams adopt Bridgly around real operating context.",
      },
      {
        title: "Governed improvement",
        body:
          "We design for permissions, evidence, decision trails, risk visibility, spend context, and learning from outcomes from the start.",
      },
    ],
  },
  lab: {
    eyebrow: "Lab/archive",
    title: "Agents & Pencils is optional background.",
    body:
      "Agents & Pencils remains a quiet lab/archive for agent-native product ideas and prototypes. Enterprise buyers should meet DataGo as the company and Bridgly as the product.",
  },
  contact: {
    title: "Talk to DataGo",
    body:
      "For corporate enquiries, partnerships, or Bridgly adoption conversations, contact the company directly.",
    cta: "Email info@datago.uk",
  },
};

export const bridglyPage = {
  eyebrow: "Flagship platform",
  title: "Bridgly is the flagship organisational intelligence platform from DataGo.",
  body:
    "Bridgly helps organisations see, measure, and improve how AI changes work across people, teams, projects, tools, decisions, spend, risk, and outcomes. DataGo is the company behind it.",
  promise:
    "Understand how work moves. Measure how AI changes it. Govern the evidence. Learn from every outcome.",
  cta: "Visit bridgly.ai",
  spine: [
    {
      title: "AI adoption visibility",
      body:
        "Connect work signals, AI activity, projects, owners, spend, risk, and outcomes so leaders can see where AI is changing work.",
    },
    {
      title: "Governed organisational intelligence",
      body:
        "Keep permissions, context, provenance, and answer boundaries visible enough for enterprise use.",
    },
    {
      title: "Measurable AI outcomes",
      body:
        "Learn from questions, gaps, recommendations, actions, and results so future decisions and workflows improve.",
    },
  ],
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
    title: "DataGo establishes company trust. Bridgly carries product detail.",
    body:
      "datago.uk should answer who is behind Bridgly, what thesis guides the company, and how enterprises can contact the team. bridgly.ai should answer how the platform works, what it connects, how governance is handled, and how buyers request a demo.",
  },
};

export const approachPage = {
  eyebrow: "Approach",
  title: "Governed AI transformation needs an operating layer.",
  body:
    "DataGo builds and supports governed AI systems that connect operational context, measure outcomes, govern decisions, and improve through evidence rather than hype.",
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
};

export const aboutPage = {
  eyebrow: "About",
  title: "DataGo is the UK company behind Bridgly.",
  body:
    "DataGo provides the company trust layer, product thesis, and governed AI product studio behind Bridgly. Bridgly is the flagship platform for organisational intelligence and measurable AI outcomes.",
  facts: [
    { label: "Company", value: "DataGo" },
    { label: "Registered legal identity", value: site.legalName },
    { label: "Public/search alias", value: site.searchAlias },
    { label: "Corporate contact", value: site.email },
    { label: "Flagship product", value: "Bridgly" },
    { label: "Company number", value: site.legal.companyNumber },
    { label: "Registered office", value: site.legal.registeredOffice },
  ],
  architecture: [
    {
      title: "DataGo",
      body:
        "The UK company context, trust layer, operating thesis, and product studio for governed AI systems.",
    },
    {
      title: "Bridgly",
      body:
        "DataGo's flagship governed organisational intelligence platform for AI visibility, governance, and measurable outcomes.",
    },
    {
      title: "Agents & Pencils",
      body:
        "A de-emphasised lab/archive for agent-native product ideas and applied AI research.",
    },
  ],
  founderNote:
    "DataGo is founder-led and product-led. Implementation support exists to help enterprises adopt governed intelligence products safely, but Bridgly is the primary product route.",
};

export const insightsPage = {
  eyebrow: "Insights",
  title: "Company thinking on governed AI transformation.",
  body:
    "These notes frame how DataGo thinks about enterprise AI readiness, AI governance, adoption visibility, and measurable AI outcomes. Product-specific detail belongs on Bridgly.",
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
    "Agents & Pencils is retained only as lab/archive context.",
  ],
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Contact DataGo",
  body:
    "For corporate enquiries, partnerships, product adoption, or questions about Bridgly, email the company directly.",
  primary: "Email info@datago.uk",
  note:
    "This site is mailto-first and does not collect enquiry details through a web form.",
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
  title: "Privacy notice",
  body:
    "This privacy notice covers the public DataGo company website. It should be reviewed before adding analytics, forms, or additional tracking.",
  points: [
    "DataGo can be contacted at info@datago.uk for privacy-related enquiries.",
    "This site is currently mailto-first and does not collect enquiry details through a web form.",
    "If analytics, forms, or additional tracking are added later, this notice should be updated before those services go live.",
  ],
};

export const termsPage = {
  eyebrow: "Terms",
  title: "Legal notice",
  body:
    "This legal notice identifies the company operating datago.uk and the contact route for corporate enquiries.",
  points: [
    `${site.legalName} operates this website under the DataGo name.`,
    `Company number: ${site.legal.companyNumber}.`,
    `Registered office: ${site.legal.registeredOffice}.`,
    `Corporate contact: ${site.email}.`,
  ],
};
