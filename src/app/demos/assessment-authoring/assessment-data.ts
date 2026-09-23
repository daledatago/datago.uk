export type ReviewEntry = {
  revision: number;
  question: string;
  decision: "pending" | "returned" | "approved";
  reason: string;
};

type DraftItem = {
  number: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  key: number;
  rationales: [string, string, string, string];
  page: number;
};

export const criterion = "Identify fragile roof surfaces and the controls associated with work on or near them (illustrative criterion).";
export const specialistReview = "Outstanding: construction accuracy, source match, single defensible answer, distractor quality and accessibility. No expert approval or live use.";

export const bankItems: DraftItem[] = [
  {
    number: "01", topic: "Old roof lights", page: 1,
    question: "Why should someone avoid stepping onto a fragile roof surface?",
    options: ["The surface is safe if the task is brief", "The surface may break under a person's weight", "The surface is safe when it looks dry", "The surface is safe if only one person crosses it"],
    key: 1,
    rationales: ["A short task does not remove fragility.", "Fragile material may not support a person.", "Dry appearance does not establish strength.", "A single person can still fall through."],
  },
  {
    number: "02", topic: "Fibre cement sheets", page: 1,
    question: "Which roof covering should be treated as potentially fragile?",
    options: ["Only visibly broken sheets", "Only sheets with standing water", "Non-reinforced fibre cement sheets", "Only newly installed sheets"],
    key: 2,
    rationales: ["Visible damage is not the only indicator.", "Water is not required for fragility.", "This material is identified in GEIS5.", "Age alone cannot establish safety."],
  },
  {
    number: "03", topic: "Corroded metal sheets", page: 1,
    question: "What concern should a reviewer flag about corroded metal roof sheets?",
    options: ["They may be fragile", "They are safe if painted", "They are safe during short tasks", "They need only a weather check"],
    key: 0,
    rationales: ["Corrosion can leave a fragile surface.", "Paint does not prove load capacity.", "Task duration does not prove strength.", "Weather alone cannot establish safety."],
  },
  {
    number: "04", topic: "Slates and tiles", page: 1,
    question: "Which statement about a tiled roof needs to inform the work plan?",
    options: ["Tiles are always safe to walk on", "A dry tiled roof needs no assessment", "Only glass roof lights can be fragile", "Slates and tiles may be fragile"],
    key: 3,
    rationales: ["A familiar covering is not proof of safety.", "Dry conditions do not establish strength.", "Other materials can also be fragile.", "Both appear in the source's risk list."],
  },
  {
    number: "05", topic: "Roof assessment", page: 2,
    question: "Who should assess a roof before work starts?",
    options: ["Anyone who can see it from the road", "A competent person using a safe system", "Only the person who booked the work", "The first worker to step onto it"],
    key: 1,
    rationales: ["A distant glance is not an adequate assessment.", "Competence and a safe assessment method are required.", "Booking work does not establish competence.", "Stepping onto it is not a safe test."],
  },
  {
    number: "06", topic: "Avoiding roof access", page: 2,
    question: "Which approach should be considered first for work on a fragile roof?",
    options: ["Walk carefully across it", "Keep the job under five minutes", "Use a method that avoids going onto it", "Rely on a colleague to watch"],
    key: 2,
    rationales: ["Careful walking does not remove the hazard.", "Short exposure still carries risk.", "Avoiding access is the first approach in GEIS5.", "Observation does not prevent a fall through."],
  },
  {
    number: "07", topic: "Using a work platform", page: 2,
    question: "How can a suitable mobile elevating work platform reduce roof access?",
    options: ["It lets the worker stay in the basket", "It proves the roof can carry a person", "It removes the need to plan the work", "It makes every roof surface non-fragile"],
    key: 0,
    rationales: ["Work can be done without standing on the roof.", "A platform does not prove roof strength.", "Planning is still needed.", "The roof material remains unchanged."],
  },
  {
    number: "08", topic: "Safe access", page: 2,
    question: "What protection does GEIS5 describe for work and access stagings?",
    options: ["Paint alone", "A time limit alone", "A verbal warning alone", "Guard rails"],
    key: 3,
    rationales: ["Paint does not prevent a fall.", "A time limit is not physical protection.", "A warning alone is not sufficient protection.", "The source specifies guard rails on stagings or platforms."],
  },
  {
    number: "09", topic: "Remaining fall risk", page: 2,
    question: "What must a plan address when a harness system is used?",
    options: ["Only the colour of the harness", "Suitable anchorage and correct use", "Only the worker's preferred route", "Only the length of the task"],
    key: 1,
    rationales: ["Colour does not establish a safe system.", "Anchorage and proper use are essential considerations.", "Route preference cannot replace safety planning.", "Duration alone cannot control a fall."],
  },
  {
    number: "10", topic: "Warning signs", page: 2,
    question: "Why is a warning sign alone insufficient for work near a fragile roof light?",
    options: ["It makes the roof light stronger", "It replaces a safe system of work", "It does not physically prevent a fall through", "It removes the need for supervision"],
    key: 2,
    rationales: ["A sign does not change the material.", "A warning cannot replace planned controls.", "The source describes physical protection such as covers.", "Supervision and planning still matter."],
  },
];

export function initialEntry(item: DraftItem): ReviewEntry {
  return { revision: 1, question: item.question, decision: "pending", reason: "Illustrative draft created; specialist review required." };
}

export function runDraftChecks(item: DraftItem) {
  const wordCount = (text: string) => text.trim() ? text.trim().split(/\s+/u).length : 0;
  const stemWords = wordCount(item.question);
  const optionWords = item.options.map(wordCount);
  return [
    {
      passed: item.options.length === 4 && item.options.every(option => option.trim()) && new Set(item.options.map(option => option.trim().toLowerCase())).size === 4 && Number.isInteger(item.key) && item.key >= 0 && item.key < 4,
      detail: "Four non-empty, distinct options and one proposed key (structure only).",
    },
    {
      passed: stemWords >= 1 && stemWords <= 30 && optionWords.every(count => count >= 1 && count <= 15),
      detail: `Length screen: stem ${stemWords}/30 words; options ${optionWords.join(", ")}/15 words each. Minimum one word. This does not assess reading level.`,
    },
    {
      passed: Number.isInteger(item.page) && item.page >= 1 && item.page <= 5,
      detail: `Source metadata attached: HSE GEIS5, page ${item.page}. Source match needs specialist review.`,
    },
  ];
}

export function exportFields(item: DraftItem, history: ReviewEntry[], checks: ReturnType<typeof runDraftChecks> | null) {
  const current = history[history.length - 1];
  return {
    "Question number": item.number,
    Topic: item.topic,
    Criterion: criterion,
    "Source reference": `HSE GEIS5 (11/12), page ${item.page}; https://www.hse.gov.uk/pubns/geis5.pdf`,
    Stem: current.question,
    "Option A": item.options[0],
    "Option B": item.options[1],
    "Option C": item.options[2],
    "Option D": item.options[3],
    "Proposed key": String.fromCharCode(65 + item.key),
    "Proposed rationales": item.rationales.map((reason, index) => `${String.fromCharCode(65 + index)}: ${reason}`).join("\n"),
    Confidence: "Unassessed; illustrative draft only",
    Decision: current.decision === "approved" ? "Sample approval only" : current.decision,
    "Decision reason": current.reason,
    Reviewer: current.decision === "pending" ? "Unassigned" : "Demonstration user (not a specialist sign-off)",
    Version: `0.${current.revision}`,
    "Automated checks": checks ? checks.map(check => `${check.passed ? "Pass" : "Needs revision"}: ${check.detail}`).join("\n") : "Not run for this revision",
    "Specialist review": specialistReview,
    "Audit trail": history.map((entry, index) => `${index + 1}. v0.${entry.revision} | ${entry.decision === "approved" ? "sample approval" : entry.decision} | ${entry.reason} | Stem: ${entry.question}`).join("\n"),
  };
}
