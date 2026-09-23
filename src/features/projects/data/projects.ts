export type ProjectSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  /** Client / project name shown on the card */
  name: string;
  /** Small label under the name, e.g. "Website Development" */
  service: string;
  /** Id of the filter tab this project belongs to */
  filter: ProjectFilterId;
  /** Full title used on the detail page */
  title: string;
  excerpt: string;
  // TODO: swap these placeholders for the real project screenshots.
  image: string;
  sections: ProjectSection[];
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

const overview = (client: string, service: string): ProjectSection[] => [
  {
    heading: "Project overview",
    body: [
      `${client} approached Yuni Solutions to modernise their digital presence with a sleek, professional, and conversion-focused corporate website. Their existing online presence lacked clarity, modern branding, and a structured user experience that reflected their expertise.`,
      `The objective was to design a premium website that positioned ${client} as a trusted, forward-thinking partner for organisations across multiple industries.`,
    ],
  },
  {
    heading: "The challenge",
    body: [
      `${client} needed a website that could effectively communicate their value proposition while maintaining a strong corporate identity.`,
      "Some of the key challenges included:",
    ],
    bullets: [
      "Outdated visual appearance that did not reflect their professional standards",
      "Poor user navigation and unclear service presentation",
      "Lack of a built-in, specific positioning",
      "Limited engagement and weak call-to-action structure",
      "Inconsistent branding across digital touchpoints",
    ],
  },
  {
    heading: "Our approach",
    body: [
      `At Yuni Solutions, we focused on creating a modern, corporate, and highly professional digital experience built around ${service.toLowerCase()}.`,
    ],
  },
  {
    heading: "1. Brand & visual strategy",
    body: [
      "We designed a clean corporate interface using premium typography, modern layouts, and a minimal colour palette to create a trustworthy and executive-level feel.",
      "The design emphasised:",
    ],
    bullets: [
      "Professional credibility",
      "Enterprise trust",
      "Clean user experience",
      "Strong visual hierarchy",
      "Modern business aesthetics",
    ],
  },
  {
    heading: "2. Website architecture",
    body: [
      "We restructured the website to improve navigation and information flow. The new structure included a clear home page, service detail pages, an industries hub, an insights library, and a conversion-focused contact journey.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "sterling-oak-partners",
    name: "Sterling Oak Partners",
    service: "Website Development",
    filter: "website",
    title: "Sterling Oak Partners — Corporate Website Design & Development",
    excerpt:
      "A premium corporate website that positions Sterling Oak Partners as a trusted advisory firm.",
    image: "/images/Articales-1.png",
    sections: overview("Sterling Oak Partners", "Website Development"),
  },
  {
    slug: "bluepeak-solutions",
    name: "BluePeak Solutions",
    service: "Website Re-Design",
    filter: "website",
    title: "BluePeak Solutions — Corporate Website Re-Design",
    excerpt:
      "A full re-design that clarified BluePeak's services and modernised their brand online.",
    image: "/images/Articales-2.png",
    sections: overview("BluePeak Solutions", "Website Re-Design"),
  },
  {
    slug: "summit-ridge-consulting",
    name: "Summit Ridge Consulting",
    service: "Website Changes",
    filter: "website",
    title: "Summit Ridge Consulting — Corporate Website Design & Development",
    excerpt:
      "A sleek, conversion-focused corporate website for a multi-industry consulting practice.",
    image: "/images/Articales-3.png",
    sections: overview("Summit Ridge Consulting", "Website Changes"),
  },
  {
    slug: "horizon-bridge-group",
    name: "Horizon Bridge Group",
    service: "Website Development",
    filter: "website",
    title: "Horizon Bridge Group — Corporate Website Design & Development",
    excerpt:
      "A structured, enterprise-ready site built around Horizon Bridge Group's service lines.",
    image: "/images/Articales-4.png",
    sections: overview("Horizon Bridge Group", "Website Development"),
  },
  {
    slug: "redwood-strategic-advisors",
    name: "Redwood Strategic Advisors",
    service: "Website Re-Design",
    filter: "website",
    title: "Redwood Strategic Advisors — Corporate Website Re-Design",
    excerpt:
      "A refreshed identity and information architecture for a strategic advisory firm.",
    image: "/images/Articales-5.png",
    sections: overview("Redwood Strategic Advisors", "Website Re-Design"),
  },
  {
    slug: "northstar-business-systems",
    name: "NorthStar Business Systems",
    service: "Website Changes",
    filter: "website",
    title: "NorthStar Business Systems — Corporate Website Improvements",
    excerpt:
      "Targeted changes that lifted clarity, performance, and conversion across the site.",
    image: "/images/Articales-6.png",
    sections: overview("NorthStar Business Systems", "Website Changes"),
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3) {
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
}
