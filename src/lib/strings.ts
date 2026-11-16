/**
 * All site copy lives here. Components carry no English of their own.
 *
 * Claims rules (owner's review, 16 November 2026):
 * - Outcome first, technology second. Technology is named only as tools we
 *   work with. The one partnership statement is the entry in `credentials`,
 *   shown as written; no tier, and nothing about it anywhere else.
 * - Nothing is claimed that is not established: no track record, no target
 *   market, no accreditations or listings. An unknown is left out, not shown.
 * - Bridgly is described only with the approved claims in `site.bridgly`.
 */

export const site = {
  name: "DataGo",
  legalName: "DataGo Ltd",
  url: "https://datago.uk",
  email: "dale.harrison@datago.uk",
  tagline: "AI, built on trusted data.",
  description:
    "DataGo is a UK data and AI consultancy. We bring trusted data foundations, practical governance and AI together to help organisations make better decisions and improve how they work.",
  assets: {
    hero: "/assets/datago-operating-intelligence.jpg",
  },
  bridgly: {
    name: "Bridgly",
    url: "https://bridgly.ai",
    urlLabel: "bridgly.ai",
    tag: "A DataGo product",
    line: "People decide. Agents act within the rules you sign. Bridgly proves both.",
    claims: [
      "It turns your organisation's standards into rules that a named person signs.",
      "It enforces them where agents act: at each enforcement point you connect, an agent's action goes ahead, is held for a person, or is stopped.",
      "It keeps a record that proves each decision: the rule, the clauses it serves, the version in force and who signed it.",
    ],
    cta: "Visit bridgly.ai",
    pages: {
      privacy: "https://bridgly.ai/privacy",
    },
  },
  legal: {
    companyNumber: "14751587",
    registeredIn: "England and Wales",
    registeredOffice: "2 Old Bath Road, Newbury, Berkshire, England, RG14 1QL",
    vatNumber: "GB 444 6881 64",
  },
};

export const ui = {
  skip: "Skip to main content",
  homeLabel: "DataGo home",
  wordmark: "datago",
  primaryNav: "Primary",
  mobileNav: "Primary, mobile",
  menu: "Menu",
  theme: "Dark theme",
  cta: "Discuss a project",
  newTab: "(opens in a new tab)",
  breadcrumb: "Breadcrumb",
  home: "Home",
};

export const navItems = [
  { href: "/services", label: "What we do" },
  { href: "/#how", label: "How we work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* The five kinds of work, in order of emphasis.                       */
/*                                                                     */
/* They are also the five layers of the field, top to bottom: the      */
/* first is what people use, the last is what everything runs on.      */
/* `layer` counts from the bottom, as the 3D scene does.               */
/* ------------------------------------------------------------------ */

export type Service = {
  /** Anchor on /services, so each panel can be linked to. */
  slug: string;
  n: string;
  layer: number;
  name: string;
  short: string;
  /** The outcome, in one line. Always shown first. */
  outcome: string;
  /** How we get there, in one line. */
  how: string;
  problem: string;
  changes: string[];
};

export const services: Service[] = [
  {
    slug: "practical-ai",
    n: "01",
    layer: 4,
    name: "Practical AI applications",
    short: "Practical AI",
    outcome: "People ask in plain words and get answers that show their sources.",
    how: "AI enablement and development: assistants and agents, search and retrieval, and decision support, built into the tools people already use.",
    problem:
      "The organisation already knows the answer. Nobody can find it, and the AI pilot never became something people rely on.",
    changes: [
      "One place to ask, across everything a person is allowed to see.",
      "Every answer shows where it came from, and says so when the sources fall short.",
      "A person stays in the loop for anything that matters.",
    ],
  },
  {
    slug: "analytics",
    n: "02",
    layer: 3,
    name: "Analytics and decision support",
    short: "Analytics",
    outcome: "One agreed set of figures, ready when a decision is due.",
    how: "Shared definitions, reusable datasets and reporting that people can question.",
    problem:
      "Every report gives a different number, and the time goes on reconciling spreadsheets instead of deciding.",
    changes: [
      "Each measure is defined once and used everywhere.",
      "Figures trace back to the records they came from.",
      "Time moves from producing the numbers to acting on them.",
    ],
  },
  {
    slug: "governance",
    n: "03",
    layer: 2,
    name: "Governance and assurance",
    short: "Governance",
    outcome: "AI and data you can trust and explain, with controls built in.",
    how: "Access controls, human review and a clear record, designed in from the start.",
    problem:
      "Nobody can say with confidence what the data means, who may see it, or why the AI gave the answer it did.",
    changes: [
      "Each dataset and each use of AI is documented, so its purpose is clear.",
      "People see only what they are allowed to see.",
      "Decisions leave a record that can be checked later.",
    ],
  },
  {
    slug: "data-platforms",
    n: "04",
    layer: 1,
    name: "Data platforms and integration",
    short: "Data platforms",
    outcome: "Systems connected, quality checked, data ready to use.",
    how: "Scalable, secure platforms, pipelines and data models, sized to the need and ready for AI.",
    problem:
      "Systems do not talk to each other. Joining them is manual, slow and different every time.",
    changes: [
      "Sources are connected once and kept up to date.",
      "Quality is measured, not assumed.",
      "New reports and applications start from data that is already modelled.",
    ],
  },
  {
    slug: "secure-delivery",
    n: "05",
    layer: 0,
    name: "Secure production delivery",
    short: "Secure delivery",
    outcome: "A working service in your environment, ready for the people who run it.",
    how: "Secure by design, tested and monitored, then handed over or operated with you.",
    problem: "The prototype worked. The dependable service never arrived.",
    changes: [
      "It runs inside your environment, behind your sign-on and permissions.",
      "It is tested and monitored before anyone depends on it.",
      "Your team gets the documentation and training to run it.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const home = {
  title: "DataGo | AI, built on trusted data.",
  hero: {
    eyebrow: "UK data and AI consultancy",
    /* The owner's line, sharpened to lead with AI. The full sentence is on the About page. */
    titleLines: ["AI, built on"],
    titleEmphasis: "trusted data.",
    body: "We build secure, scalable data platforms with AI at the core, so organisations make better decisions and improve how they work.",
    secondary: { label: "See what we do", href: "/#work" },
  },
  /* The scroll story. The 3D field shows each chapter as the visitor scrolls. */
  story: {
    label: "From a trusted data foundation to AI run in production",
    cue: "Scroll",
    chapters: [
      {
        name: "A trusted data foundation.",
        body: "Scattered sources, connected, checked and modelled once.",
      },
      {
        name: "A secure, scalable platform.",
        body: "Built to grow with you, with security designed in.",
      },
      {
        name: "AI built in from the start.",
        body: "Assistants, agents, search and decision support, working on data you trust.",
      },
      {
        name: "Governed, and run in production.",
        body: "Controls built in, a person in the loop, and a service that is monitored and improved.",
      },
    ],
  },
  work: {
    eyebrow: "What we do",
    title: "Five layers. One system.",
    lede: "AI leads. The data platform, security and governance beneath it are what make it work.",
    tabsLabel: "The five kinds of work",
    labels: { outcome: "The outcome", how: "How" },
    more: "More on this",
    all: { label: "All five in detail", href: "/services" },
    tech: {
      title: "Outcome first, technology second.",
      body: "We choose technology to fit the need, including what you already run. We work with Azure, AWS, Databricks and Microsoft Fabric.",
    },
  },
  how: {
    eyebrow: "How we work",
    title: "Start small. Build in phases. Keep it running.",
    steps: [
      {
        name: "Discover",
        body: "A short discovery and assessment: what you need, what you have, and what stands in the way.",
      },
      {
        name: "Build",
        body: "Phased and iterative, secure by design. Something working early, then widened.",
      },
      {
        name: "Run",
        body: "Handed over to your team, or operated with you: monitored, optimised and improved.",
      },
    ],
  },
  product: {
    eyebrow: "Our product",
    lede: "Bridgly governs AI agents.",
    demoNote: "An illustration of the three outcomes. It is not the product interface.",
    demoLabel: "Choose an outcome",
    options: [
      {
        key: "ok",
        label: "Goes ahead",
        title: "The action goes ahead.",
        body: "It is within a rule a named person signed.",
      },
      {
        key: "hold",
        label: "Held for a person",
        title: "The action is held for a person.",
        body: "The rule says a person must decide. The agent waits.",
      },
      {
        key: "stop",
        label: "Stopped",
        title: "The action is stopped.",
        body: "The rule does not allow it.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Credentials slot.                                                   */
/*                                                                     */
/* `items` is the single switch: each entry is shown exactly as        */
/* written, and an empty list renders no band at all. Add an entry     */
/* only once it is achieved and the owner of the mark permits its use. */
/*                                                                     */
/* Owner decision, 16 November 2026: the band starts with one entry,   */
/* the two words "Databricks partner". No tier, no logo, no other      */
/* badge, and partnership is claimed nowhere else on the site.         */
/*                                                                     */
/* `kind` (a small label under the name) and `logo` (an image path)    */
/* are optional, for later entries, for example:                       */
/*   { name: "Cyber Essentials", kind: "Certification" }               */
/* ------------------------------------------------------------------ */

export type Credential = { name: string; kind?: string; logo?: string };

export const credentials: { title: string; items: Credential[] } = {
  title: "Credentials",
  items: [{ name: "Databricks partner" }],
};

/* ------------------------------------------------------------------ */
/* Services page                                                       */
/* ------------------------------------------------------------------ */

export const servicesPage = {
  eyebrow: "What we do",
  title: "Five kinds of work.",
  body: "AI leads. The data platform, security and governance beneath it are what make it work.",
  navLabel: "The five kinds of work",
  labels: { problem: "The problem", changes: "What changes", how: "How" },
  layerCaption: (n: string, name: string) => `Layer ${n} of 05 · ${name}`,
  cta: {
    title: "Tell us the problem you are trying to solve.",
    lede: "A few lines is enough to start.",
  },
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "Contact",
  pageEyebrow: "Contact",
  title: "Bring us the problem.",
  lede: "A few lines is enough. We read every message and reply by email.",
  emailLabel: "Or email us at",
  form: {
    name: "Your name",
    email: "Email",
    organisation: "Organisation",
    optional: "(optional)",
    message: "Message",
    messageHint: "A few lines is enough. Please do not include sensitive personal data.",
    honeypot: "Leave this empty",
    check: "Security check",
    checkHint: "A short automatic check that you are a person. It uses no advertising cookies.",
    legalBefore:
      "DataGo Ltd uses what you send only to reply to your enquiry. We do not add you to a mailing list. See our ",
    legalLink: "privacy notice",
    legalAfter: ".",
    submit: "Send message",
    sending: "Sending…",
    noscript:
      "This form needs JavaScript for its security check. If JavaScript is off, please email us instead:",
  },
  errors: {
    name: "Enter your name.",
    email: "Enter an email address we can reply to, like name@example.org.",
    message: "Enter a message of at least a few words.",
    messageLong: "Message must be 5,000 characters or fewer.",
    one: "There is 1 thing to fix before you can send.",
    /* {count} is replaced with the number of fields. */
    many: "There are {count} things to fix before you can send.",
  },
  status: {
    success:
      "Thank you. Your message has been sent to DataGo. We will reply by email to the address you gave.",
    checkPending:
      "The security check has not finished. Wait a moment, complete it if it asks you to, then send again.",
    not_configured:
      "This form is not yet connected, so your message was not sent. Please email us instead:",
    rate_limited:
      "Too many messages have come from your connection in a short time, so this one was not sent. Please wait ten minutes, or email us:",
    too_fast:
      "That was sent sooner than we expected, so it was not accepted. Please wait a few seconds and send again, or email us:",
    turnstile_failed:
      "We could not confirm the security check, so your message was not sent. Please try again, or email us:",
    generic:
      "We could not send your message. What you wrote is still on this page. Please try again, or email us:",
  },
};

/* ------------------------------------------------------------------ */
/* Other pages                                                         */
/* ------------------------------------------------------------------ */

export const aboutPage = {
  eyebrow: "About",
  title: "About DataGo",
  body: "DataGo is a UK data and AI consultancy.",
  /* The owner's overarching message, word for word. */
  belief:
    "We bring trusted data foundations, practical governance and AI together to help organisations make better decisions and improve how they work.",
  twoWays: {
    title: "Two things we do",
    consulting: {
      title: "Consulting",
      body: "AI enablement and development, on the data platform, security and governance that make it work.",
      link: { label: "What we do", href: "/services" },
    },
    product: {
      title: "Our own software",
      body: "Bridgly governs AI agents. It has its own site.",
    },
  },
  company: {
    title: "The company",
    facts: [
      { label: "Legal name", value: site.legalName },
      { label: "Company number", value: site.legal.companyNumber },
      { label: "Registered in", value: site.legal.registeredIn },
      { label: "Registered office", value: site.legal.registeredOffice },
    ],
  },
};

export const accessibilityPage = {
  eyebrow: "Accessibility",
  title: "Accessibility statement",
  body: "This statement covers the datago.uk website, run by DataGo Ltd. We want as many people as possible to be able to use it.",
  updated: "16 November 2026",
  sections: [
    {
      title: "What we aim for",
      paragraphs: [
        "We built this site to meet the Web Content Accessibility Guidelines (WCAG) version 2.2 at level AA.",
        "You should be able to:",
      ],
      bullets: [
        "use the whole site with a keyboard, with a visible focus outline on every control",
        "skip to the main content from the top of each page",
        "read the site at phone width without scrolling sideways",
        "choose a light or dark theme, or let the site follow your device setting",
        "stop the moving diagram on the home page with its Pause button; if your device asks for reduced motion, nothing moves",
        "read the diagrams as ordinary text: no diagram puts text inside an image",
        "fill in the contact form with labelled fields and with error messages in words",
      ],
    },
    {
      title: "How we tested it",
      paragraphs: [
        "We tested the site on 16 November 2026 with automated measurements in the Chromium browser at desktop width (1440 pixels) and phone width (390 pixels), in the light and dark themes.",
        "We measured text contrast, the focus outline on every keyboard stop, heading order, the size of links and buttons, sideways scrolling, reduced motion and the behaviour of the contact form.",
      ],
    },
    {
      title: "What we have not yet tested",
      paragraphs: [
        "We would rather say this than claim more than we know.",
      ],
      bullets: [
        "screen readers such as NVDA, JAWS and VoiceOver",
        "browsers other than Chromium, and real phones and tablets",
        "text enlarged to 200%, and Windows high-contrast mode",
        "the security check on the contact form, which Cloudflare Turnstile provides",
        "the unlisted demonstration pages under /demos, which were built separately and are not covered by this statement",
      ],
    },
    {
      title: "If something does not work for you",
      paragraphs: [
        `Email ${site.email} and tell us the page and what went wrong. We will reply, and we can give you the information another way, for example in an email.`,
        "The contact form has an email address below it, so you never have to use the form.",
      ],
    },
  ],
};

export const privacyPage = {
  eyebrow: "Privacy",
  title: "Website privacy notice",
  body: "This notice explains how DataGo Ltd handles personal data on the datago.uk website, including the contact form. It does not cover Bridgly, which has its own privacy policy.",
  updated: "16 November 2026",
  bridglyNotice:
    "Use of Bridgly is covered by the Bridgly Privacy Policy, not by this notice.",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        `${site.legalName} runs datago.uk and is the controller of the personal data described here. Our registered details are in the footer of every page.`,
        `You can contact us about privacy at ${site.email}.`,
      ],
    },
    {
      title: "What this notice covers",
      paragraphs: [
        "It covers visits to datago.uk, the contact form on this site, and emails you send us about an enquiry.",
        "It does not cover Bridgly or bridgly.ai, or data we handle for an organisation during a project. Those are covered by the Bridgly Privacy Policy and by our contract with that organisation.",
      ],
    },
    {
      title: "The contact form",
      paragraphs: [
        "If you use the contact form we collect what you type: your name, your email address, your organisation if you give it, and your message. Please do not include sensitive personal data.",
        "We use this only to reply to your enquiry. We do not add you to a mailing list.",
        "The website does not store your message. The form turns it into one email to our inbox, with your address as the reply-to address. That email is the only record.",
        "To keep automated spam out, the form runs a security check from Cloudflare Turnstile, and our server counts requests from each IP address for a few minutes. The check uses no advertising cookies. The count is held in memory and is not written anywhere.",
      ],
    },
    {
      title: "Emails you send us",
      paragraphs: [
        `If you email ${site.email} we handle what you send: your name, email address, organisation, message and anything else you choose to tell us.`,
        "We use it to reply, to discuss and agree work with you, and to keep the business records we need.",
      ],
    },
    {
      title: "Visiting the site",
      paragraphs: [
        "When you visit, our hosting provider processes the technical data needed to serve the page and keep the site secure: IP address, browser and device details, the page requested, the referring page and the time.",
        "The site runs no analytics and no advertising or tracking scripts. Its fonts are served from our own domain, so your browser makes no request to a font provider.",
        "If you choose the light or dark theme, your browser remembers the choice in its local storage. It is not sent to us.",
      ],
    },
    {
      title: "Our lawful basis",
      paragraphs: [
        "We rely on our legitimate interests: answering an enquiry you chose to send, and running and securing this website. We do not ask for consent to reply to you, because you asked us to.",
        "Where an enquiry leads towards a contract, we also process data to take steps at your request before entering into it, and to meet our legal obligations.",
      ],
    },
    {
      title: "Who else handles the data",
      paragraphs: [
        "We use these providers. Each processes data on our behalf under its own terms.",
      ],
      bullets: [
        "Vercel: hosts the website and runs the contact form",
        "Cloudflare: provides the Turnstile security check on the form",
        "Resend: delivers the enquiry email to our inbox",
        "Google Workspace: provides our email",
      ],
    },
    {
      title: "Transfers outside the UK",
      paragraphs: [
        "Some of these providers process data outside the UK. Where that happens we rely on the safeguards UK law allows, such as adequacy regulations or contractual protections.",
      ],
    },
    {
      title: "How long we keep it",
      paragraphs: [
        "The website keeps nothing from the contact form. The enquiry email stays in our inbox for as long as we need it to reply, to manage the relationship and to keep the records the law requires.",
        "Our hosting provider keeps technical logs for a limited period for security and fault-finding.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "You can ask us for a copy of your personal data, ask us to correct or delete it, object to how we use it, or ask us to restrict its use.",
        `To use any of these rights, email ${site.email}. We may need to check who you are before we reply.`,
      ],
    },
    {
      title: "Complaints",
      paragraphs: [
        "If you are unhappy with how we have handled your data, please tell us first so we can try to put it right.",
        "You also have the right to complain to the Information Commissioner's Office (ICO). See https://ico.org.uk/.",
      ],
    },
    {
      title: "Changes to this notice",
      paragraphs: [
        "We will update this page when the website or the way we handle data changes. The date at the top shows the latest version.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Bridgly Privacy Policy", href: site.bridgly.pages.privacy },
    { label: "Website terms", href: "/terms" },
    { label: "Accessibility statement", href: "/accessibility" },
  ],
};

export const termsPage = {
  eyebrow: "Terms",
  title: "Website terms of use",
  body: "These terms govern access to and use of the datago.uk website. They do not govern use of Bridgly, which has its own terms and policies.",
  updated: "16 November 2026",
  bridglyNotice:
    "Use of Bridgly, including product access, demonstrations and product services, is governed by Bridgly's own terms and policies.",
  sections: [
    {
      title: "Company identity",
      paragraphs: [
        `${site.legalName} runs datago.uk under the DataGo name. DataGo Ltd is a UK data and AI consultancy and the company behind Bridgly.`,
        "Our registered details are in the footer of every page.",
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
        "This website gives general information about DataGo and its services. It is not legal, technical, investment, security, or procurement advice, and it should not be relied on as a substitute for formal diligence or contractual documentation.",
        "Statements about Bridgly should not be read as a promise of general availability or of any certification unless we expressly say so in writing.",
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
      title: "Bridgly",
      paragraphs: [
        "Bridgly is a DataGo product with its own site. Product information, demonstrations and product-specific legal terms are on bridgly.ai.",
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
    { label: "Website privacy notice", href: "/privacy" },
    { label: "Accessibility statement", href: "/accessibility" },
  ],
};

export const legalPages = {
  updatedLabel: "Updated",
  relatedTitle: "Related pages",
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  columns: [
    {
      title: "What we do",
      label: "What we do",
      links: services.map((service) => ({
        href: `/services#${service.slug}`,
        label: service.name
      })),
    },
    {
      title: "Company",
      label: "Company and product",
      links: [
        { href: "/about", label: "About" },
        { href: "/#how", label: "How we work" },
        { href: "/contact", label: "Contact" },
        { href: site.bridgly.url, label: site.bridgly.name },
      ],
    },
    {
      title: "Legal",
      label: "Legal",
      links: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/accessibility", label: "Accessibility" },
      ],
    },
  ],
  legalLine: (year: number) =>
    `© ${year} ${site.legalName}. Registered in ${site.legal.registeredIn}, company number ${site.legal.companyNumber}. Registered office: ${site.legal.registeredOffice}. VAT registration number: ${site.legal.vatNumber}.`,
  productLine: "Bridgly is a DataGo product.",
};
