/** A single headline metric in the results row on the detail page. */
export type ProjectStat = {
  value: string;
  label: string;
  description: string;
};

/** "The challenge" section. The side image differs per project. */
export type ProjectChallengeContent = {
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
};

/** "The outcome" closing section — headline figures plus a summary. */
export type ProjectOutcomeContent = {
  heading: string;
  body: string;
  stats: { value: string; label: string }[];
};

export type Project = {
  slug: string;
  /** Client / project name shown on the card */
  name: string;
  /** Small label under the name, e.g. "Website Development" */
  service: string;
  /** Badge shown over the thumbnail in the featured grid */
  category: string;
  /** Id of the filter tab this project belongs to */
  filter: ProjectFilterId;
  /** Full title used on the detail page */
  title: string;
  excerpt: string;
  // TODO: swap these placeholders for the real project screenshots.
  image: string;
  // TODO: replace with the real per-project figures.
  stats: ProjectStat[];
  challenge: ProjectChallengeContent;
  /** Four "How we did it" lines. The icons beside them are the same site-wide. */
  approach: string[];
  /** Device mockup for "A sample of what shipped" — differs per project. */
  sample: { image: string; imageAlt: string };
  outcome: ProjectOutcomeContent;
  /** Four SWOT notes. Titles and artwork are the same across projects. */
  swot: string[];
};

export const projectFilters = [
  { id: "website", label: "Website" },
  { id: "mobile-app", label: "Mobile App" },
  { id: "seo", label: "SEO" },
  { id: "integrations", label: "Integrations" },
  { id: "marketing", label: "Marketing" },
  { id: "branding", label: "Branding" },
] as const;

export type ProjectFilterId = (typeof projectFilters)[number]["id"];

// TODO: replace with each project's real measured results.
const defaultStats = (): ProjectStat[] => [
  {
    value: "40%",
    label: "Faster Booking Time",
    description:
      "Users can now book in less time with a simplified and intuitive flow.",
  },
  {
    value: "12K+",
    label: "App Downloads (First 3 Months)",
    description:
      "Streamlined access and a better experience led to a significant increase in completed bookings.",
  },
  {
    value: "4.7\u2605",
    label: "Average App Store Rating",
    description:
      "A clearer experience reduced confusion and cut support requests by more than half.",
  },
  {
    value: "65%",
    label: "Increase in Repeat Users",
    description:
      "Users rated the app highly for its ease of use, reliability, and overall experience.",
  },
];

// TODO: supply the real mockup per project; falls back to the cover image.
const defaultChallenge = (client: string, image: string): ProjectChallengeContent => ({
  heading: "Where things stood.",
  body: `${client}'s booking process was manual, relying on phone calls, spreadsheets, and back-and-forth coordination. This made it time-consuming for users, increased the risk of errors, and created operational inefficiencies for their team. As demand grew, it became clear they needed a modern, mobile-first solution to streamline the entire experience.`,
  image,
  imageAlt: `The ${client} app shown on two phones`,
});

// TODO: replace with each project's real delivery notes.
const defaultApproach = (): string[] => [
  "Designed a streamlined booking flow that reduced the process to three taps",
  "Built native iOS and Android apps for consistent performance across devices",
  "Integrated real-time availability and push notifications to cut missed appointments",
  "Ran continuous usability testing to refine the flow before and after launch",
];

// TODO: the designer will supply a mockup per project; shared for now.
const defaultSample = (client: string) => ({
  image: "/images/projectSample.png",
  imageAlt: `Screens from the ${client} project shown on desktop and tablet`,
});

// TODO: replace with each project's real measured outcome.
// TODO: replace with each project's real SWOT notes.
const defaultSwot = (): string[] => [
  "A clear customer need, an engaged stakeholder team, and a strong foundation of domain knowledge gave us a solid starting point for a successful build.",
  "The existing process was highly manual, with fragmented systems and limited real-time visibility, which created inefficiencies and a higher risk of errors.",
  "Growing demand and a shift towards digital adoption created an opportunity to deliver a modern, mobile-first solution that could scale across regions.",
  "Increasing competition, evolving customer expectations, and changing regulations posed external challenges that required a flexible and future-ready approach.",
];

const defaultOutcome = (): ProjectOutcomeContent => ({
  heading: "What changed.",
  body: "The new platform streamlined the entire experience, making it faster, easier, and more reliable for both users and the operations team. Bookings are now completed in minutes, real-time visibility has improved coordination, and manual work has been significantly reduced — allowing the team to focus on what matters most: delivering a better, more dependable service.",
  stats: [
    { value: "60%", label: "Faster booking time" },
    { value: "50%", label: "Reduction in manual work" },
    { value: "2X", label: "More completed trips" },
    { value: "95%", label: "User satisfaction" },
  ],
});

export const projects: Project[] = [
  {
    slug: "sterling-oak-partners",
    name: "Sterling Oak Partners",
    service: "Website Development",
    category: "Artificial Intelligence",
    filter: "website",
    title: "Sterling Oak Partners — Corporate Website Design & Development",
    excerpt:
      "A premium corporate website that positions Sterling Oak Partners as a trusted advisory firm.",
    image: "/images/Articales-1.png",
    stats: defaultStats(),
    challenge: defaultChallenge("Sterling Oak Partners", "/images/Articales-1.png"),
    approach: defaultApproach(),
    sample: defaultSample("Sterling Oak Partners"),
    outcome: defaultOutcome(),
    swot: defaultSwot(),
  },
  {
    slug: "bluepeak-solutions",
    name: "BluePeak Solutions",
    service: "Website Re-Design",
    category: "Web Development",
    filter: "website",
    title: "BluePeak Solutions — Corporate Website Re-Design",
    excerpt:
      "A full re-design that clarified BluePeak's services and modernised their brand online.",
    image: "/images/Articales-2.png",
    stats: defaultStats(),
    challenge: defaultChallenge("BluePeak Solutions", "/images/Articales-2.png"),
    approach: defaultApproach(),
    sample: defaultSample("BluePeak Solutions"),
    outcome: defaultOutcome(),
    swot: defaultSwot(),
  },
  {
    slug: "summit-ridge-consulting",
    name: "Summit Ridge Consulting",
    service: "Website Changes",
    category: "SaaS Development",
    filter: "website",
    title: "Summit Ridge Consulting — Corporate Website Design & Development",
    excerpt:
      "A sleek, conversion-focused corporate website for a multi-industry consulting practice.",
    image: "/images/Articales-3.png",
    stats: defaultStats(),
    challenge: defaultChallenge("Summit Ridge Consulting", "/images/Articales-3.png"),
    approach: defaultApproach(),
    sample: defaultSample("Summit Ridge Consulting"),
    outcome: defaultOutcome(),
    swot: defaultSwot(),
  },
  {
    slug: "horizon-bridge-group",
    name: "Horizon Bridge Group",
    service: "Website Development",
    category: "Artificial Intelligence",
    filter: "website",
    title: "Horizon Bridge Group — Corporate Website Design & Development",
    excerpt:
      "A structured, enterprise-ready site built around Horizon Bridge Group's service lines.",
    image: "/images/Articales-4.png",
    stats: defaultStats(),
    challenge: defaultChallenge("Horizon Bridge Group", "/images/Articales-4.png"),
    approach: defaultApproach(),
    sample: defaultSample("Horizon Bridge Group"),
    outcome: defaultOutcome(),
    swot: defaultSwot(),
  },
  {
    slug: "redwood-strategic-advisors",
    name: "Redwood Strategic Advisors",
    service: "Website Re-Design",
    category: "Web Development",
    filter: "website",
    title: "Redwood Strategic Advisors — Corporate Website Re-Design",
    excerpt:
      "A refreshed identity and information architecture for a strategic advisory firm.",
    image: "/images/Articales-5.png",
    stats: defaultStats(),
    challenge: defaultChallenge("Redwood Strategic Advisors", "/images/Articales-5.png"),
    approach: defaultApproach(),
    sample: defaultSample("Redwood Strategic Advisors"),
    outcome: defaultOutcome(),
    swot: defaultSwot(),
  },
  {
    slug: "northstar-business-systems",
    name: "NorthStar Business Systems",
    service: "Website Changes",
    category: "Cloud & DevOps",
    filter: "website",
    title: "NorthStar Business Systems — Corporate Website Improvements",
    excerpt:
      "Targeted changes that lifted clarity, performance, and conversion across the site.",
    image: "/images/Articales-6.png",
    stats: defaultStats(),
    challenge: defaultChallenge("NorthStar Business Systems", "/images/Articales-6.png"),
    approach: defaultApproach(),
    sample: defaultSample("NorthStar Business Systems"),
    outcome: defaultOutcome(),
    swot: defaultSwot(),
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3) {
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
}
