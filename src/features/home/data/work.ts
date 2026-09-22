export const workCategories = [
  { id: "website", label: "Website" },
  { id: "mobile-app", label: "Mobile App" },
  { id: "seo", label: "SEO" },
  { id: "smm", label: "SMM" },
  { id: "marketing", label: "Marketing" },
  { id: "branding", label: "Branding" },
] as const;

export type WorkCategoryId = (typeof workCategories)[number]["id"];

export type WorkItem = {
  id: string;
  category: WorkCategoryId;
  /** Small label above the title, e.g. "Corporate website" */
  eyebrow: string;
  title: string;
  description: string;
  image: { src: string; width: number; height: number; alt: string };
  /** Spans both columns on desktop */
  wide?: boolean;
  /** Show the green "VIEW CASE STUDY" badge */
  caseStudyHref?: string;
};

export const workItems: WorkItem[] = [
  {
    id: "modern-business-websites",
    category: "website",
    eyebrow: "Corporate website",
    title: "Modern business websites",
    description:
      "We build fast, responsive, and conversion-focused websites that strengthen your online presence, establish credibility, and help your business attract and engage more customers.",
    image: {
      src: "/images/webWork1.png",
      width: 248,
      height: 237,
      alt: "Crypto wallet marketing website",
    },
    caseStudyHref: "/projects",
  },
  {
    id: "powerful-digital-platforms",
    category: "website",
    eyebrow: "Custom web applications",
    title: "Powerful digital platforms",
    description:
      "We develop custom web applications tailored to your unique business needs, combining intuitive user experiences, advanced functionality, and scalable architecture to support long-term growth.",
    image: {
      src: "/images/webWork2.png",
      width: 248,
      height: 237,
      alt: "Beauty brand e-commerce website",
    },
  },
  {
    id: "online-stores-that-sell",
    category: "website",
    eyebrow: "E-Commerce development",
    title: "Online stores that sell",
    description:
      "From product catalogs to secure payment integrations, we create scalable e-commerce platforms designed to deliver seamless shopping experiences and maximize online sales.",
    image: {
      src: "/images/webWork3.png",
      width: 758,
      height: 241,
      alt: "Fresh juice online store on desktop and mobile",
    },
    wide: true,
  },
];
