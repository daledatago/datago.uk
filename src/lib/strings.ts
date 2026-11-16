/**
 * All site copy lives here. Components carry no English of their own.
 *
 * Claims rules (owner's review, 16 November 2026):
 * - Outcome first, technology second. Technology is named only as tools we
 *   work with, never as a partnership or tier.
 * - Nothing is claimed that is not established: no track record, no target
 *   market, no accreditations or listings. An unknown is left out, not shown.
 * - Bridgly is described only with the approved claims in `site.bridgly`.
 */

export const site = {
  name: "DataGo",
  legalName: "DataGo Ltd",
  url: "https://datago.uk",
  email: "dale.harrison@datago.uk",
  tagline: "A UK data and AI consultancy, and the company behind Bridgly.",
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
  { href: "/#work", label: "What we deliver" },
  { href: "/#delivery", label: "How we deliver" },
  { href: "/#products", label: "Products" },
  { href: "/#contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* Services: the five focus areas, in display order.                   */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  anchor: string;
  n: string;
  name: string;
  mapLabel: string;
  mapCaption: string;
  problem: string;
  outcome: string;
  how: string;
  page: {
    description: string;
    summary: string;
    problemsTitle: string;
    problems: { title: string; body: string; change: string }[];
    outcomesTitle: string;
    outcomes: string[];
    phases: { name: string; plain: string; body: string }[];
    technical: { term: string; detail: string }[];
    showDataClasses: boolean;
  };
};

const whereItRuns =
  "Inside your approved environment, using the identity, data, integration and operational services you select. We work on Azure and AWS.";

export const services: Service[] = [
  {
    slug: "practical-ai-applications",
    anchor: "a-ai",
    n: "01",
    name: "Practical AI applications",
    mapLabel: "Practical AI",
    mapCaption:
      "Search across your information, answers that show their sources, and assistance inside the services you already run.",
    problem:
      "Staff cannot find what the organisation already knows. Policies, reports and records sit in separate stores, and the AI pilot that looked promising never became something people could rely on.",
    outcome:
      "People ask a question in plain words and get an answer that shows its sources. Assistance sits inside the services they already use, and a person approves anything that matters.",
    how: "Search and retrieval across your information, evidence-backed answers, workflow assistance and integration into existing services. Answers are tested against agreed questions before release.",
    page: {
      description:
        "Search across your information, answers that show their sources, and assistance inside the services you already run, delivered in your approved environment.",
      summary:
        "We help people find and use what your organisation already knows. They ask a question in plain words and get an answer that shows its sources, inside the services they already use, with a person approving anything that matters.",
      problemsTitle: "The information exists. People cannot get to it.",
      problems: [
        {
          title: "Knowledge nobody can find",
          body: "Policies, reports, guidance and records sit in separate stores. Staff ask a colleague, or go without.",
          change:
            "One place to ask, across the sources each person is allowed to see.",
        },
        {
          title: "Answers nobody can check",
          body: "A general-purpose assistant gives a confident answer with no source. Nobody can tell whether to rely on it.",
          change:
            "Every answer cites the documents it came from. Where the sources do not support an answer, it says so.",
        },
        {
          title: "A pilot that never went live",
          body: "The demonstration impressed people, but it sat outside your sign-on, your permissions and your support model.",
          change:
            "A service in your approved environment, tested, monitored and owned by a named team.",
        },
      ],
      outcomesTitle: "A working service, not a demonstration.",
      outcomes: [
        "Search and retrieval across the information sources you choose",
        "Answers that show their sources, so a person can check them",
        "Assistance inside existing workflows: drafting, summarising, finding the relevant case or clause",
        "Integration into the services and sign-on your staff already use",
        "Human approval before anything with consequences is sent, published or decided",
        "A set of test questions and expected answers, so quality can be measured and re-measured",
        "Documentation, runbooks and handover to the team that will run it",
      ],
      phases: [
        {
          name: "Discovery",
          plain: "Is the information there, and may we use it?",
          body: "We look at the sources, who owns them, how they are classified and who may see what. We agree the questions the service must answer well.",
        },
        {
          name: "Alpha",
          plain: "Does it answer well enough?",
          body: "A prototype on a sample of your information, scored against the agreed questions. You see where it is right, where it is wrong and why.",
        },
        {
          name: "Beta",
          plain: "Build it properly",
          body: "The service in your environment, with sign-on, permissions, logging and monitoring, released to a small group first.",
        },
        {
          name: "Live",
          plain: "Run it and keep it honest",
          body: "Handover, with the test questions re-run when sources or models change, so quality does not drift unnoticed.",
        },
      ],
      technical: [
        { term: "Where it runs", detail: whereItRuns },
        {
          term: "Retrieval",
          detail:
            "Sources are indexed with their permissions. A person's question retrieves only what that person is allowed to see. Retrieved content is treated as data, never as instructions.",
        },
        {
          term: "Evidence",
          detail:
            "The service keeps source evidence, a user's own assumptions, generated text and approved decisions apart, and shows which is which.",
        },
        {
          term: "Models",
          detail:
            "The model sits behind the application and can be replaced. The route is set by policy and by the class of data, not chosen by a prompt or an end user.",
        },
        {
          term: "Evaluation",
          detail:
            "A maintained set of questions with expected answers and sources. We test for unsupported citations, prompt injection, malicious files and data leakage before release and after changes.",
        },
        {
          term: "Interfaces",
          detail:
            "A web application, your existing portal or an approved enterprise assistant. Each uses the same permissions, data controls and audit record.",
        },
        {
          term: "Operations",
          detail:
            "Secrets management, dependency and vulnerability management, monitoring, backups and incident response, sized to the delivery phase.",
        },
      ],
      showDataClasses: true,
    },
  },
  {
    slug: "analytics-decision-support",
    anchor: "a-analytics",
    n: "02",
    name: "Analytics and decision support",
    mapLabel: "Analytics",
    mapCaption:
      "One agreed set of figures, and dashboards and applications that help people act on them.",
    problem:
      "Two reports give two different numbers. Analysts spend the week reconciling spreadsheets and have no time left to explain what the figures mean.",
    outcome:
      "One agreed set of figures, with dashboards and applications that help people interpret information and act on it.",
    how: "Reusable datasets with agreed definitions, reporting and dashboards built on them, and small applications where a dashboard is not enough.",
    page: {
      description:
        "One agreed set of figures, with reusable datasets, reporting and small applications that help people interpret information and act on it.",
      summary:
        "We give people one agreed set of figures and the means to act on them: reusable datasets with agreed definitions, reporting and dashboards built on them, and small applications where a dashboard is not enough.",
      problemsTitle: "Two reports, two different numbers.",
      problems: [
        {
          title: "Figures that do not agree",
          body: "Each team counts in its own way, from its own extract. Meetings are spent deciding which number is right.",
          change:
            "One written definition for each measure, with an owner, used by every report.",
        },
        {
          title: "Analysts tied up in reconciliation",
          body: "Skilled people spend the week joining spreadsheets by hand and have no time left to explain what the figures mean.",
          change:
            "Reusable datasets refreshed on a schedule, so the time goes on interpretation.",
        },
        {
          title: "Reports nobody acts on",
          body: "A report shows what happened but not what to do next, and the people who need it cannot find it.",
          change:
            "Reporting designed around the decisions people make, with a small application where a dashboard is not enough.",
        },
      ],
      outcomesTitle: "Figures people agree on and can act on.",
      outcomes: [
        "A written definition for each measure, with a named owner",
        "Reusable datasets that reports and applications share",
        "Dashboards and reports built on those datasets",
        "Small applications for the decisions a dashboard does not support",
        "Access that follows your permissions, so people see what they are allowed to see",
        "Checks that flag when data is late, incomplete or out of range",
        "Documentation and handover to the team that will maintain it",
      ],
      phases: [
        {
          name: "Discovery",
          plain: "Which decisions, and which figures?",
          body: "We find the decisions the reporting must support, the measures behind them, where the data comes from and how good it is.",
        },
        {
          name: "Alpha",
          plain: "Does one agreed figure hold up?",
          body: "We build a small number of measures end to end on real or representative data and compare them with the reports you use today. You see where they differ and why.",
        },
        {
          name: "Beta",
          plain: "Build it properly",
          body: "The datasets, reports and applications in your environment, with access controls, refresh schedules and data-quality checks, released to a small group first.",
        },
        {
          name: "Live",
          plain: "Run it and keep it trusted",
          body: "Handover, with the definitions and checks maintained as sources change, so the figures stay agreed.",
        },
      ],
      technical: [
        { term: "Where it runs", detail: whereItRuns },
        {
          term: "Definitions",
          detail:
            "Each measure has one written definition, an owner and a tested calculation, kept with the dataset and not inside individual reports.",
        },
        {
          term: "Datasets",
          detail:
            "Shared, modelled datasets sit between the source systems and the reports, so a change is made once.",
        },
        {
          term: "Reporting tools",
          detail:
            "We build on the reporting tool you already use where it fits, and choose one against the requirement where you have none.",
        },
        {
          term: "Data quality",
          detail:
            "Automated checks for completeness, timeliness and consistency run with each refresh. Failures are reported, not hidden.",
        },
        {
          term: "Access",
          detail:
            "Row-level and role-based access follow your identity and permissions model.",
        },
        {
          term: "Operations",
          detail:
            "Scheduled refreshes, monitoring, version control and a documented release process, sized to the delivery phase.",
        },
      ],
      showDataClasses: false,
    },
  },
  {
    slug: "governance-assurance",
    anchor: "a-governance",
    n: "03",
    name: "Governance and assurance",
    mapLabel: "Governance and assurance",
    mapCaption:
      "Ownership, permissions, traceability, human approval and audit evidence, designed in from the start.",
    problem:
      "Nobody can say who owns a dataset, who may see it, or how an AI-assisted answer was reached. Assurance is asked for after the build, when it is expensive to add.",
    outcome:
      "Clear ownership, permissions that match your policy, and a record a reviewer can follow from a result back to its source.",
    how: "Data ownership, permissions, traceability, human approval points, audit evidence and controls around AI use, set out in discovery and built in each phase.",
    page: {
      description:
        "Data ownership, permissions, traceability, human approval and audit evidence, with controls around AI use, set out in discovery and built in each phase.",
      summary:
        "We make it clear who owns the data, who may see it, who approved a decision and how a result was reached. We build that into the service from discovery, so the evidence is there when a reviewer asks.",
      problemsTitle: "Assurance is asked for after the build.",
      problems: [
        {
          title: "Nobody owns the data",
          body: "A dataset is used across the organisation, but no one is named as responsible for its quality or for who may use it.",
          change:
            "A named owner for each dataset, with the duties written down.",
        },
        {
          title: "Permissions nobody can explain",
          body: "Access has grown by exception. Nobody can say who can see what, or why.",
          change:
            "Permissions that match your policy, defined by role and reviewed.",
        },
        {
          title: "AI answers with no trail",
          body: "An AI-assisted answer or decision cannot be traced to its sources or to the person who approved it.",
          change:
            "A record a reviewer can follow from a result back to its source, with the approval shown.",
        },
      ],
      outcomesTitle: "Evidence a reviewer can follow.",
      outcomes: [
        "Data ownership recorded: who is responsible for each dataset and each decision",
        "A permissions model that matches your policy, by role",
        "Traceability from a result back to its sources",
        "Human approval points where content or decisions have consequences",
        "Audit evidence kept as the service runs, not assembled afterwards",
        "Controls around AI use: which model, for which class of data, under which approval",
        "Documentation your information-management and security teams can review",
      ],
      phases: [
        {
          name: "Discovery",
          plain: "What must be shown, and to whom?",
          body: "We read your policies and assurance requirements, map the data, its owners and its classification, and agree what evidence a reviewer will expect.",
        },
        {
          name: "Alpha",
          plain: "Do the controls work in practice?",
          body: "We try the ownership, permission and approval model on one real workflow and test whether the record answers a reviewer's questions.",
        },
        {
          name: "Beta",
          plain: "Build the controls in",
          body: "Permissions, approval points and audit records built into the service in your environment, and tested before release.",
        },
        {
          name: "Live",
          plain: "Keep the evidence current",
          body: "Handover of the control set, with reviews when sources, models or policies change.",
        },
      ],
      technical: [
        { term: "Where it runs", detail: whereItRuns },
        {
          term: "Ownership",
          detail:
            "Each dataset and each approval point has a named owner in your organisation, recorded where the data is governed and not in a separate document.",
        },
        {
          term: "Permissions",
          detail:
            "Access is granted by role, follows your identity model and is applied at the data, not only in the application.",
        },
        {
          term: "Traceability",
          detail:
            "Source version, model and configuration, edits and reviews are recorded, so a result can be followed back.",
        },
        {
          term: "Human approval",
          detail:
            "High-impact content cannot move to approved or published without an authorised person.",
        },
        {
          term: "Audit evidence",
          detail:
            "Edits, reviews, exports and access events are recorded as the service runs.",
        },
        {
          term: "Controls around AI",
          detail:
            "The route to a model is set by policy and by the class of data. We test for prompt injection, data leakage and unsupported citations.",
        },
      ],
      showDataClasses: true,
    },
  },
  {
    slug: "data-platforms-integration",
    anchor: "a-data",
    n: "04",
    name: "Data platforms and integration",
    mapLabel: "Data platforms",
    mapCaption:
      "Systems connected, data checked and modelled once, legacy reporting modernised.",
    problem:
      "Systems do not talk to each other. Data is exported and re-keyed by hand, its quality is unknown, and the legacy reports are costly to change.",
    outcome:
      "Data from your systems arrives in one governed place, checked and modelled once, ready for reporting, analytics and AI.",
    how: "We connect systems, build ingestion and transformation pipelines, improve data quality, develop shared models and modernise legacy reporting.",
    page: {
      description:
        "Systems connected, ingestion and transformation pipelines, measured data quality, shared models and legacy reporting modernised, in one governed place.",
      summary:
        "We connect your systems and bring their data into one governed place, checked and modelled once, so reporting, analytics and AI all start from the same foundation.",
      problemsTitle: "Systems that do not talk to each other.",
      problems: [
        {
          title: "Data moved by hand",
          body: "Information is exported from one system and re-keyed or pasted into another. It is slow, and errors go unnoticed.",
          change:
            "Pipelines that move the data on a schedule and report when something fails.",
        },
        {
          title: "Quality nobody has measured",
          body: "People suspect the data is incomplete or inconsistent, but nobody knows by how much.",
          change:
            "Quality measured and reported, against rules agreed with the people who own the data.",
        },
        {
          title: "Legacy reporting that is costly to change",
          body: "Reports depend on old extracts and on logic that one person understands.",
          change:
            "Shared models, documented and tested, that new reports can build on.",
        },
      ],
      outcomesTitle: "One governed place for your data.",
      outcomes: [
        "Connections to the source systems you choose",
        "Ingestion and transformation pipelines that run on a schedule and report failures",
        "Data-quality rules, measured and reported",
        "Shared data models, documented and tested",
        "Access controls and a catalogue, so people can find data and see who owns it",
        "Legacy reports moved onto the new foundation, or retired",
        "Documentation, runbooks and handover",
      ],
      phases: [
        {
          name: "Discovery",
          plain: "What is there, and can we reach it?",
          body: "We establish which sources are available, who grants access, how good the data is and what the platform must connect to.",
        },
        {
          name: "Alpha",
          plain: "Does one source work end to end?",
          body: "We take one or two sources through ingestion, quality checks and modelling, and test the riskiest integration first.",
        },
        {
          name: "Beta",
          plain: "Build the platform",
          body: "The pipelines, models and controls in your environment, with monitoring in place, brought into use one source at a time.",
        },
        {
          name: "Live",
          plain: "Run it and add to it",
          body: "Handover, with documented ways to add sources and change models safely.",
        },
      ],
      technical: [
        { term: "Where it runs", detail: whereItRuns },
        {
          term: "Platforms",
          detail:
            "We work with Databricks, Microsoft Fabric and Azure data services, and choose against the requirement, including what you already run.",
        },
        {
          term: "Ingestion",
          detail:
            "Batch and incremental loads from databases, files and interfaces, with schema changes detected and failures reported.",
        },
        {
          term: "Modelling",
          detail:
            "Layered models from raw to curated, kept in version control, with automated tests.",
        },
        {
          term: "Data quality",
          detail:
            "Rules for completeness, validity and consistency run with each load. Results are visible to the data owners.",
        },
        {
          term: "Governance",
          detail:
            "A catalogue, ownership and access control applied at the platform. This includes catalogue migration, such as a move to Unity Catalog, and master data management where the requirement calls for it.",
        },
        {
          term: "Operations",
          detail:
            "Infrastructure as code, monitoring, cost reporting, backups and a documented release process.",
        },
      ],
      showDataClasses: false,
    },
  },
  {
    slug: "secure-production-delivery",
    anchor: "a-secure",
    n: "05",
    name: "Secure production delivery",
    mapLabel: "Secure delivery",
    mapCaption:
      "A service running in your approved environment, tested, monitored and handed over.",
    problem:
      "The prototype works on a laptop but not inside your security model. Nobody has planned for sign-on, testing, monitoring, or who runs it afterwards.",
    outcome:
      "A service running in your approved environment, under your identity and access model, monitored, documented and handed over.",
    how: "Cloud architecture, identity integration, DevSecOps, testing, deployment, monitoring and handover.",
    page: {
      description:
        "Cloud architecture, identity integration, DevSecOps, testing, deployment, monitoring and handover, so a prototype becomes a service you can run.",
      summary:
        "We take a service from a working prototype to something your organisation can run: in your approved environment, under your identity and access model, tested, monitored, documented and handed over.",
      problemsTitle: "It works on a laptop, but not in your estate.",
      problems: [
        {
          title: "A prototype outside the security model",
          body: "The demonstration sits outside your sign-on, your network and your data controls, so it cannot go further.",
          change:
            "The service built inside your approved environment, under your identity and access model.",
        },
        {
          title: "No plan for running it",
          body: "Nobody has decided how it is tested, deployed, monitored or supported, or what it will cost to run.",
          change:
            "Testing, deployment, monitoring and running costs settled before go-live.",
        },
        {
          title: "Knowledge held by the people who built it",
          body: "Only the original team understands how the service works.",
          change: "Documentation, runbooks and handover to a named team.",
        },
      ],
      outcomesTitle: "A service your team can run.",
      outcomes: [
        "Cloud architecture agreed with your technical and security teams",
        "Integration with your identity provider and access model",
        "Automated build, test and deployment",
        "Security testing appropriate to the delivery phase",
        "Monitoring, alerting, backups and an incident process",
        "An estimate of running costs, and cost reporting once live",
        "Documentation, runbooks and handover",
      ],
      phases: [
        {
          name: "Discovery",
          plain: "What does your estate require?",
          body: "We establish your security model, assurance requirements, hosting constraints and who will run the service, and we estimate running costs.",
        },
        {
          name: "Alpha",
          plain: "Prove the risky parts",
          body: "We test the hardest integration points first: sign-on, network access and deployment into your environment.",
        },
        {
          name: "Beta",
          plain: "Build and harden",
          body: "The service in your environment with automated deployment, testing and monitoring, released to a small group, then widened.",
        },
        {
          name: "Live",
          plain: "Hand over",
          body: "Runbooks, documentation and the training your team needs to run the service. Support after go-live is agreed separately.",
        },
      ],
      technical: [
        { term: "Where it runs", detail: whereItRuns },
        {
          term: "Identity",
          detail:
            "Single sign-on through your identity provider where it fits, multi-factor authentication and role-based access.",
        },
        {
          term: "Architecture",
          detail:
            "Designed with your technical and security teams, written down and reviewed before the build.",
        },
        {
          term: "Delivery pipeline",
          detail:
            "Version control, automated build and test, and controlled releases, with security checks in the pipeline.",
        },
        {
          term: "Testing",
          detail:
            "Automated tests and security testing, with independent testing where the delivery phase calls for it.",
        },
        {
          term: "Operations",
          detail:
            "Secrets management, dependency and vulnerability management, monitoring, backups and incident response, sized to the delivery phase.",
        },
        {
          term: "Handover",
          detail:
            "Runbooks, architecture documents and the access your team needs, so the service can be run without us.",
        },
      ],
      showDataClasses: false,
    },
  },
];

/** Copy shared by all five service pages. */
export const servicePage = {
  eyebrow: (n: string) => `Service ${n} of 05`,
  parent: { label: "What we deliver", href: "/#work" },
  secondaryCta: "Problems we solve",
  jump: {
    label: "On this page, by role",
    items: [
      { href: "#problems", who: "Service owners and programme directors", what: "Problems and outcomes" },
      { href: "#outcomes", who: "Analysts and reporting teams", what: "What you get" },
      { href: "#technical", who: "Digital, technology and data leaders", what: "Technical approach" },
      { href: "#controls", who: "Security, governance and information management", what: "Controls" },
      { href: "#buying", who: "Procurement and commercial", what: "Scope and deliverables" },
    ],
  },
  problems: {
    eyebrow: "01 · Problems we solve",
    changeLabel: "What changes",
  },
  outcomes: {
    eyebrow: "02 · What you get",
    lede: "We agree in discovery how you will judge the result.",
  },
  delivery: {
    eyebrow: "03 · How we deliver it",
    title: "Four phases, each with a decision at the end.",
  },
  technical: {
    eyebrow: "04 · Technical approach",
    title: "For the people who will evaluate the engineering.",
    lede: "This is our default approach. Discovery confirms or changes it against your requirement and your estate.",
    classesTitle: "The class of data decides the model route",
    classes: [
      { name: "Public or synthetic", route: "An approved managed model may be suitable." },
      { name: "Internal", route: "A managed deployment you approve, with agreed region, logging and retention." },
      {
        name: "Commercially confidential or restricted",
        route: "A private or dedicated deployment, or a self-hosted model, after a risk assessment.",
      },
      {
        name: "Personal or special-category",
        route:
          "Left out of a first proof of concept. Later use needs a documented lawful purpose, a data protection impact assessment and security approval.",
      },
      { name: "Not yet approved", route: "No model. The workflow continues with fixed calculations or a person." },
    ],
  },
  controls: {
    eyebrow: "05 · Controls",
    title: "For security, governance and information management.",
    lede: "The controls we expect to put in place. Your policies decide the final set.",
    items: [
      {
        name: "Identity and roles",
        detail:
          "Single sign-on where it fits, multi-factor authentication, and separate administrator, author, reviewer and read-only roles.",
      },
      { name: "Least privilege", detail: "Each component and each connector receives only the data needed for the task in hand." },
      { name: "Human approval", detail: "High-impact content cannot be approved or published without an authorised person." },
      {
        name: "Audit history",
        detail: "Source version, configuration, edits, reviews, exports and access events are recorded.",
      },
      {
        name: "Data lifecycle",
        detail: "Collection, encryption, retention, export and deletion are defined before any of your data is accepted.",
      },
      {
        name: "Sovereignty evidence",
        detail:
          "The approved service configuration, region, retention settings and sub-processors are kept on record for each model route.",
      },
    ],
    bridgly: {
      title: "Governing AI agents",
      body: `If your organisation is putting AI agents to work, Bridgly is the DataGo product for that. ${site.bridgly.line}`,
    },
  },
  buying: {
    eyebrow: "06 · Scope",
    title: "For procurement and commercial teams.",
    lede: "Each phase is a separate piece of work with a written scope, named deliverables and acceptance criteria. You are not committed to the next phase by buying this one.",
    receiveLabel: "You receive",
    phases: [
      {
        name: "Discovery",
        body: "A findings report, a source and data-quality assessment, the agreed acceptance tests, a security and data-classification note, an estimate of running costs, and a scope for alpha.",
      },
      {
        name: "Alpha",
        body: "A working prototype, its results against the acceptance tests, the risks found, and a scope and estimate for beta.",
      },
      {
        name: "Beta to live",
        body: "The service in your environment, test evidence, documentation, runbooks and handover.",
      },
    ],
  },
  cta: {
    eyebrow: "Next",
    title: "Tell us the problem you are trying to solve.",
    lede: "A few lines is enough to start. We will say plainly whether it is work we are suited to.",
    secondary: { label: "The other four services", href: "/#work" },
  },
};

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const home = {
  title: "DataGo | Data, governance and AI delivery",
  hero: {
    eyebrow: "UK data and AI consultancy",
    /* The owner's overarching message, word for word. The middle part is emphasised. */
    titleBefore: "We bring ",
    titleEmphasis: "trusted data foundations, practical governance and AI",
    titleAfter:
      " together to help organisations make better decisions and improve how they work.",
    body: "We connect fragmented data, build useful applications and analytics, and introduce AI with clear ownership, practical controls and evidence you can trust. We also build our own products. The first is Bridgly.",
    secondary: [
      { label: "What we deliver", href: "/#work" },
      { label: "Products", href: "/#products" },
    ],
  },
  map: {
    label: "How DataGo is organised",
    pause: "Pause",
    play: "Play",
    root: "datago",
    consulting: { label: "Consulting", note: "data and AI delivery" },
    products: { label: "Products", note: "our own software" },
    productLeaves: [
      {
        id: "l6",
        label: "Bridgly",
        note: "bridgly.ai",
        href: "/#products",
        captionTitle: "Bridgly.",
        caption: site.bridgly.line,
      },
    ],
    captionTitle: "One company, two ways to work with us.",
    caption: "Point at or tab to an item to see what it is.",
  },
  work: {
    eyebrow: "01 · What we deliver",
    title: "Five kinds of work, each starting from a problem.",
    lede: "Typical needs are disconnected systems, inconsistent reporting, manual reconciliation, information people cannot reach, and a promising prototype that never became a dependable service. Our value is in connecting the data, application and operational work needed to deliver something people can use.",
    labels: { problem: "The problem", outcome: "The outcome", how: "How we deliver" },
    more: "Read the service page",
    tech: {
      title: "Outcome first, technology second",
      body: "We choose technology against the requirement, including what you already run. We work with Azure, AWS, Databricks and Microsoft Fabric.",
    },
  },
  delivery: {
    eyebrow: "02 · How we deliver",
    title: "Clear discovery, phased delivery.",
    lede: "We work in four phases. Each phase has a written scope and ends with a decision you make: go on, change direction, or stop.",
    phases: [
      {
        name: "Discovery",
        plain: "Find out what is really needed",
        body: "We check what decides whether the project will work: the data, the systems, security, and what it will cost to run. You get a written scope for the next phase.",
      },
      {
        name: "Alpha",
        plain: "Try it on a small scale",
        body: "We build prototypes on real or representative data and test the riskiest parts first. You see something working before you commit to the full build.",
      },
      {
        name: "Beta",
        plain: "Build the real service",
        body: "We build it in your environment, with testing, security and monitoring in place, release it to a small group, then widen it.",
      },
      {
        name: "Live",
        plain: "Run it and keep improving it",
        body: "We hand over with documentation and the training your team needs to run the service. Support after go-live is agreed separately.",
      },
    ],
    settle: {
      title: "What we settle before you commit to a programme",
      items: [
        { name: "Source availability", detail: "Which systems and data we can reach, and who grants access." },
        { name: "Data quality", detail: "How complete and consistent the data is, measured, not assumed." },
        { name: "Integrations", detail: "What the service must connect to, and how." },
        { name: "Security", detail: "Your access model, data classification and assurance requirements." },
        { name: "Acceptance criteria", detail: "How you will judge that each phase has done its job." },
        { name: "Operating costs", detail: "What the service will cost to run once it is live." },
      ],
    },
  },
  products: {
    eyebrow: "03 · Products",
    title: "Products we build and stand behind.",
    lede: "Alongside consulting, DataGo builds its own software. Each product has its own proposition and its own site. DataGo Ltd is the company you contract with.",
    more: { label: "About Bridgly", href: "/bridgly" },
  },
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "04 · Contact",
  pageEyebrow: "Contact",
  title: "Discuss a project",
  lede: "Tell us the problem you are trying to solve. A few lines is enough. We read every message and reply by email.",
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

export const bridglyPage = {
  eyebrow: site.bridgly.tag,
  title: "Bridgly",
  body: "Bridgly is DataGo's product for governing AI agents. It has its own proposition and its own site. This page is a short introduction.",
  whatTitle: "What Bridgly does",
  demo: {
    note: "Illustration of the three outcomes. This is not the product interface.",
    groupLabel: "Choose an outcome",
    options: [
      {
        key: "ok",
        label: "Goes ahead",
        title: "The action goes ahead.",
        body: "It is within a rule a named person signed. The record shows the rule, the clauses it serves, the version in force and who signed it.",
      },
      {
        key: "hold",
        label: "Held for a person",
        title: "The action is held for a person.",
        body: "The rule says a person must decide. The agent waits. The record shows the rule and, once made, the decision.",
      },
      {
        key: "stop",
        label: "Stopped",
        title: "The action is stopped.",
        body: "The rule does not allow it. The record shows which rule, the clauses it serves, the version in force and who signed it.",
      },
    ],
  },
  moreTitle: "Everything else is on bridgly.ai",
  more: "Product detail, demonstrations and Bridgly's own terms and privacy policy are on its site. The demonstrations there use BridgeRock, a fictional company.",
  companyTitle: "Who you contract with",
  company: "Bridgly is built by DataGo Ltd, which is the contracting company. Company details are in the footer of this page.",
};

export const aboutPage = {
  eyebrow: "About",
  title: "About DataGo",
  body: "DataGo is a UK data and AI consultancy. We connect fragmented data, build useful applications and analytics, and introduce AI with clear ownership, practical controls and evidence you can trust. We also build our own products. The first is Bridgly.",
  facts: [
    { label: "Company", value: site.legalName },
    { label: "What we do", value: "Data, analytics, AI and governance delivery" },
    { label: "Technology we work with", value: "Azure, AWS, Databricks and Microsoft Fabric" },
    { label: "Products", value: "Bridgly" },
    { label: "Contact", value: site.email },
    { label: "Company details", value: "In the footer of every page" },
  ],
  twoWays: {
    title: "One company, two ways to work with us",
    items: [
      {
        title: "Consulting",
        body: "Work in five areas: practical AI, analytics, governance and assurance, data platforms, and secure production delivery.",
        link: { label: "What we deliver", href: "/#work" },
      },
      {
        title: "Products",
        body: "Software we build and stand behind. Each product has its own proposition and its own site.",
        link: { label: "Products", href: "/#products" },
      },
    ],
  },
  approach: {
    title: "How we work",
    body: "We favour clear discovery and phased delivery. We establish source availability, data quality, integrations, security, acceptance criteria and operating costs before committing to a programme.",
    link: { label: "How we deliver", href: "/#delivery" },
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
      title: "What we deliver",
      label: "What we deliver",
      links: services.map((service) => ({
        href: `/services/${service.slug}`,
        label: service.name,
      })),
    },
    {
      title: "Company",
      label: "Company and products",
      links: [
        { href: "/about", label: "About" },
        { href: "/#delivery", label: "How we deliver" },
        { href: "/bridgly", label: "Bridgly" },
      ],
    },
    {
      title: "Legal",
      label: "Legal",
      links: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/accessibility", label: "Accessibility" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ],
  legalLine: (year: number) =>
    `© ${year} ${site.legalName}. Registered in ${site.legal.registeredIn}, company number ${site.legal.companyNumber}. Registered office: ${site.legal.registeredOffice}. VAT registration number: ${site.legal.vatNumber}.`,
  productLine: "Bridgly is a DataGo product.",
};
