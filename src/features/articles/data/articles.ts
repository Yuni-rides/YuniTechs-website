export type ArticleSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  filter: FilterId;
  author: string;
  readingMinutes: number;
  excerpt: string;
  image: string;
  /** ISO date, used for metadata and structured data */
  publishedAt: string;
  sections: ArticleSection[];
};

export const filters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "crm", label: "CRM" },
  { id: "design", label: "Design" },
  { id: "integrations", label: "Integrations" },
  { id: "marketing", label: "Marketing" },
  { id: "mobile-apps", label: "Mobile Apps" },
  { id: "news", label: "News" },
  { id: "seo", label: "SEO" },
  { id: "trends", label: "Trends" },
  { id: "tools", label: "Tools" },
  { id: "technology", label: "Technology" },
] as const;

export type FilterId = (typeof filters)[number]["id"];

// TODO: replace the body copy below with the real editorial content.
export const articles: Article[] = [
  {
    slug: "how-ai-is-transforming-modern-businesses-in-2026",
    title: "How AI Is Transforming Modern Businesses in 2026",
    category: "AI & Automation",
    filter: "ai",
    author: "Yuni Tech Team",
    readingMinutes: 6,
    excerpt:
      "From autonomous agents to predictive operations, AI has moved from pilot projects into the core of how modern companies run.",
    image: "/images/Articales-1.png",
    publishedAt: "2026-01-14",
    sections: [
      {
        heading: "The era of autonomous AI and intelligent websites",
        body: [
          "Artificial intelligence has shifted from a support tool to an operating layer. Websites now adapt their content, pricing and journeys in real time, and internal systems act on data without waiting for a human to press a button.",
          "For most businesses the practical win is not a single flagship model but a series of small, reliable automations that remove friction from everyday work.",
        ],
        bullets: [
          "Agents that triage support tickets and route them with context",
          "Content pipelines that draft, localise and publish under review",
          "Forecasting that updates as live data arrives, not once a quarter",
        ],
      },
      {
        heading: "Where the return actually comes from",
        body: [
          "Teams that measure well tend to start with one workflow, instrument it properly, and only then expand. The return shows up as reclaimed hours and shorter cycle times long before it shows up in headline revenue.",
        ],
      },
      {
        heading: "What to put in place first",
        body: [
          "Clean data access, a clear review step for anything customer-facing, and an owner for each automation. Without those three, AI projects stall at the proof-of-concept stage.",
        ],
      },
    ],
  },
  {
    slug: "top-technology-trends-every-business-should-watch",
    title: "Top Technology Trends Every Business Should Watch",
    category: "Technology",
    filter: "technology",
    author: "Michael Carter",
    readingMinutes: 5,
    excerpt:
      "The shifts worth planning around this year — and the ones that are safe to watch from a distance.",
    image: "/images/Articales-2.png",
    publishedAt: "2026-01-09",
    sections: [
      {
        heading: "The era of autonomous AI and intelligent websites",
        body: [
          "Interfaces are becoming conversational and adaptive. Instead of static pages, visitors increasingly meet systems that understand intent and respond with the next useful step.",
          "The businesses that benefit are the ones whose data and content are structured well enough for a machine to reason over.",
        ],
        bullets: [
          "Structured content that both people and agents can parse",
          "Real-time personalisation grounded in first-party data",
          "Clear guardrails and review for anything generated",
        ],
      },
      {
        heading:
          "Hyper-connected operations via industrial IoT and edge computing",
        body: [
          "Processing closer to where data is produced cuts latency and cost. In practice that means fewer round trips to a central cloud and faster decisions on the floor.",
          "Edge deployments also change how you think about reliability: the system has to keep working when the connection does not.",
        ],
      },
      {
        heading: "Planning around the trends",
        body: [
          "Pick the two shifts that touch your margin most directly and build a small, measurable pilot for each. Treat everything else as background reading.",
        ],
      },
    ],
  },
  {
    slug: "digital-marketing-strategies-that-actually-drive-growth",
    title: "Digital Marketing Strategies That Actually Drive Growth",
    category: "Marketing",
    filter: "marketing",
    author: "Sarah Wilson",
    readingMinutes: 7,
    excerpt:
      "Channel tactics change constantly. The underlying mechanics of compounding growth do not.",
    image: "/images/Articales-3.png",
    publishedAt: "2026-01-03",
    sections: [
      {
        heading: "Start with the offer, not the channel",
        body: [
          "Most campaigns underperform because the offer is unclear, not because the targeting was wrong. Sharpen what you are promising and to whom before spending on distribution.",
        ],
      },
      {
        heading: "Measure the whole journey",
        body: [
          "Attribution that stops at the click hides the work done by content, email and brand. Track assisted conversions and time-to-decision alongside last-touch numbers.",
        ],
        bullets: [
          "Define one primary conversion per funnel stage",
          "Instrument before launch, not after the first report",
          "Review cohorts monthly, creative weekly",
        ],
      },
      {
        heading: "Compound what works",
        body: [
          "Once a channel proves out, reinvest in depth rather than breadth. Three channels run well beat eight run occasionally.",
        ],
      },
    ],
  },
  {
    slug: "building-fast-scalable-modern-web-applications",
    title: "Building Fast, Scalable & Modern Web Applications",
    category: "Web Development",
    filter: "design",
    author: "David Brooks",
    readingMinutes: 6,
    excerpt:
      "Performance is a product feature. Here is how modern stacks keep applications quick as they grow.",
    image: "/images/Articales-4.png",
    publishedAt: "2025-12-19",
    sections: [
      {
        heading: "Render where it makes sense",
        body: [
          "Static where you can, server-rendered where you must, client-side only for genuinely interactive surfaces. Most slowness comes from sending work to the browser that never needed to go there.",
        ],
      },
      {
        heading: "Budget for Core Web Vitals",
        body: [
          "Set a page-weight and interaction budget early and fail the build when it is exceeded. Retrofitting performance after launch costs far more than protecting it during development.",
        ],
        bullets: [
          "Optimise and size images at build time",
          "Split bundles by route, not by convenience",
          "Cache aggressively at the edge, invalidate precisely",
        ],
      },
      {
        heading: "Scale the team, not just the servers",
        body: [
          "A modular, feature-based codebase lets several people work in parallel without stepping on each other. Architecture is as much about people as traffic.",
        ],
      },
    ],
  },
  {
    slug: "why-smart-crm-systems-are-essential-for-business-success",
    title: "Why Smart CRM Systems Are Essential for Business Success",
    category: "CRM",
    filter: "crm",
    author: "Emily Roberts",
    readingMinutes: 4,
    excerpt:
      "A CRM is only as useful as the process around it. What separates the systems teams actually use.",
    image: "/images/Articales-5.png",
    publishedAt: "2025-12-11",
    sections: [
      {
        heading: "One record, one truth",
        body: [
          "Fragmented customer data is the most common cause of slow sales cycles. Consolidating contact, billing and support history into a single record removes the guesswork.",
        ],
      },
      {
        heading: "Automate the follow-up, not the relationship",
        body: [
          "Reminders, handoffs and stage changes should be automatic. The conversation itself should not be.",
        ],
        bullets: [
          "Trigger tasks from real signals, not calendar dates",
          "Keep required fields to the minimum reps will actually fill",
          "Report on pipeline movement, not activity volume",
        ],
      },
      {
        heading: "Adoption is the real metric",
        body: [
          "A CRM nobody updates is worse than a spreadsheet. Design the workflow around how the team already sells.",
        ],
      },
    ],
  },
  {
    slug: "seo-in-2026-how-to-rank-in-google-and-ai-search",
    title: "SEO in 2026: How to Rank In Google & AI Search",
    category: "SEO",
    filter: "seo",
    author: "Daniel Smith",
    readingMinutes: 7,
    excerpt:
      "Search now happens in two places at once. Optimising for both starts with the same foundations.",
    image: "/images/Articales-6.png",
    publishedAt: "2025-12-02",
    sections: [
      {
        heading: "Answer engines read structure",
        body: [
          "Clear headings, structured data and concise, factual passages make content easy to quote — which is exactly what AI answers need.",
        ],
        bullets: [
          "Mark up articles, FAQs and products with schema.org",
          "Lead each section with the answer, then explain it",
          "Keep canonical URLs and internal links consistent",
        ],
      },
      {
        heading: "Technical health still decides visibility",
        body: [
          "Crawlability, speed and stable rendering remain the entry ticket. No amount of content strategy compensates for pages that cannot be indexed reliably.",
        ],
      },
      {
        heading: "Build topical depth",
        body: [
          "A cluster of thorough, interlinked pages on one subject outperforms scattered one-off posts across many.",
        ],
      },
    ],
  },
  {
    slug: "mobile-app-trends-that-will-shape-the-future",
    title: "Mobile App Trends That Will Shape the Future",
    category: "Mobile Apps",
    filter: "mobile-apps",
    author: "Olivia Johnson",
    readingMinutes: 5,
    excerpt:
      "What is changing in mobile product design, and what users have simply come to expect.",
    image: "/images/Articales-1.png",
    publishedAt: "2025-11-24",
    sections: [
      {
        heading: "Offline is a feature again",
        body: [
          "Users expect apps to keep working on a patchy connection. Local-first data and background sync have moved from nice-to-have to baseline.",
        ],
      },
      {
        heading: "Cross-platform has closed the gap",
        body: [
          "Modern cross-platform toolkits now ship near-native performance for most product categories, which changes the build-versus-buy maths for smaller teams.",
        ],
        bullets: [
          "Share business logic, keep platform-specific polish",
          "Test on low-end devices, not just the newest phone",
          "Instrument crashes and slow frames from day one",
        ],
      },
      {
        heading: "Privacy as a design constraint",
        body: [
          "Permission prompts are a moment of trust. Ask late, explain why, and degrade gracefully when the answer is no.",
        ],
      },
    ],
  },
  {
    slug: "cybersecurity-essentials-every-business-must-know",
    title: "Cybersecurity Essentials Every Business Must Know",
    category: "Cyber Security",
    filter: "tools",
    author: "James Anderson",
    readingMinutes: 6,
    excerpt:
      "Most breaches exploit ordinary gaps. Closing them is less about tooling than discipline.",
    image: "/images/Articales-2.png",
    publishedAt: "2025-11-15",
    sections: [
      {
        heading: "Identity is the perimeter",
        body: [
          "Multi-factor authentication, least-privilege access and prompt offboarding prevent a large share of real-world incidents.",
        ],
        bullets: [
          "Enforce MFA everywhere, including admin tooling",
          "Rotate and vault secrets — never commit them",
          "Review access quarterly and on every role change",
        ],
      },
      {
        heading: "Patch on a schedule you can keep",
        body: [
          "Automated dependency updates with a small, regular review window beat large, infrequent upgrade projects.",
        ],
      },
      {
        heading: "Rehearse the response",
        body: [
          "A written incident plan that nobody has practised will not survive a real event. Run a short tabletop exercise twice a year.",
        ],
      },
    ],
  },
  {
    slug: "content-strategy-that-compounds-organic-growth",
    title: "Content Strategy That Compounds Organic Growth",
    category: "SEO",
    filter: "seo",
    author: "Daniel Smith",
    readingMinutes: 7,
    excerpt:
      "Publishing more is not a strategy. Building a body of work that keeps earning is.",
    image: "/images/Articales-3.png",
    publishedAt: "2025-11-06",
    sections: [
      {
        heading: "Pick a territory you can own",
        body: [
          "Narrow topics with genuine expertise behind them outperform broad coverage. Depth is what earns links and citations.",
        ],
      },
      {
        heading: "Refresh before you replace",
        body: [
          "Updating an article that already ranks usually returns more than publishing a new one on the same subject.",
        ],
        bullets: [
          "Audit top pages twice a year",
          "Keep URLs stable when you update",
          "Track which pages earn links, not just traffic",
        ],
      },
      {
        heading: "Distribution is half the work",
        body: [
          "Plan how each piece will reach people before it is written. Content without a route to an audience compounds nothing.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = getArticleBySlug(slug);
  if (!current) return articles.slice(0, limit);

  const sameFilter = articles.filter(
    (a) => a.slug !== slug && a.filter === current.filter,
  );
  const rest = articles.filter(
    (a) => a.slug !== slug && a.filter !== current.filter,
  );
  return [...sameFilter, ...rest].slice(0, limit);
}

/** Label of the filter tab an article belongs to — shown as its "Topic". */
export function getFilterLabel(id: FilterId) {
  return filters.find((filter) => filter.id === id)?.label ?? id;
}
