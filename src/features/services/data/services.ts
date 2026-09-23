import type { Service } from "@/types";

const serviceImage = (fileName: string, alt: string) => ({
  src: `/images/${fileName}.png`,
  width: 504,
  height: 355,
  alt,
});

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    items: [
      "Angular Website Development",
      "React Website Development",
      "Laravel Website Development",
      "Vue.js Website Development",
      "Node.js Website Development",
      "WordPress Website Development",
    ],
    image: serviceImage(
      "webService",
      "Collage of website designs built by Yuni Solution",
    ),
    href: "/services/website-development",
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    items: [
      "Logo & Visual Identity",
      "Brand Guidelines",
      "UI/UX Design",
      "Design Systems",
      "Marketing Collateral",
      "Social Media Creatives",
    ],
    image: serviceImage(
      "brandService",
      "Branding and design work by Yuni Solution",
    ),
    href: "/services/branding-design",
  },
  {
    slug: "crm-system",
    title: "CRM System",
    items: [
      "Custom CRM Development",
      "Salesforce Integration",
      "HubSpot Setup",
      "Sales Pipeline Automation",
      "Customer Data Management",
      "Reporting Dashboards",
    ],
    image: serviceImage("crmService", "CRM dashboards built by Yuni Solution"),
    href: "/services/crm-system",
  },
  {
    slug: "e-commerce",
    title: "E-Commerce",
    items: [
      "Shopify Development",
      "WooCommerce Development",
      "Custom Storefronts",
      "Payment Gateway Integration",
      "Inventory Management",
      "Conversion Optimisation",
    ],
    image: serviceImage(
      "ecommerceService",
      "E-commerce storefronts built by Yuni Solution",
    ),
    href: "/services/e-commerce",
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    items: [
      "High-Converting Landing Pages",
      "A/B Testing",
      "Campaign Pages",
      "Lead Capture Forms",
      "Performance Optimisation",
      "Analytics Integration",
    ],
    image: serviceImage(
      "landingPageService",
      "Landing pages designed by Yuni Solution",
    ),
    href: "/services/landing-page",
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    items: [
      "AI Chatbots & Assistants",
      "Workflow Automation",
      "Custom AI Agents",
      "Process Automation (RPA)",
      "LLM & API Integration",
      "AI Data Analysis & Reporting",
    ],
    image: serviceImage(
      "aiService",
      "AI automation solutions built by Yuni Solution",
    ),
    href: "/services/ai-automation",
  },
  {
    slug: "application-development",
    title: "Application Development",
    items: [
      "iOS App Development",
      "Android App Development",
      "React Native Apps",
      "Flutter Apps",
      "Progressive Web Apps",
      "API Development",
    ],
    image: serviceImage("appService", "Mobile apps developed by Yuni Solution"),
    href: "/services/application-development",
  },
  {
    slug: "search-engine-optimisation",
    title: "Search Engine Optimisation",
    items: [
      "Technical SEO",
      "On-Page SEO",
      "Keyword Research",
      "Link Building",
      "Local SEO",
      "SEO Audits & Reporting",
    ],
    image: serviceImage(
      "seoService",
      "SEO performance reports by Yuni Solution",
    ),
    href: "/services/search-engine-optimisation",
  },
];
