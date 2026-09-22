import type { Service } from "@/types";

// TODO: swap per-service images once the designer provides them.
const placeholderImage = {
  src: "/images/webService.png",
  width: 504,
  height: 355,
  alt: "Collage of website designs built by Yuni Solution",
};

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
    image: placeholderImage,
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
    image: placeholderImage,
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
    image: placeholderImage,
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
    image: placeholderImage,
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
    image: placeholderImage,
    href: "/services/landing-page",
  },
  {
    slug: "redesign",
    title: "Redesign",
    items: [
      "UX Audit",
      "Visual Refresh",
      "Information Architecture",
      "Performance Upgrade",
      "Accessibility Improvements",
      "Content Migration",
    ],
    image: placeholderImage,
    href: "/services/redesign",
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
    image: placeholderImage,
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
    image: placeholderImage,
    href: "/services/search-engine-optimisation",
  },
];
