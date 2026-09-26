export const siteConfig = {
  name: "Yuni Tech",
  shortName: "Yuni",
  description:
    "Yuni Tech builds modern digital products — web, mobile, and cloud solutions engineered for growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yunisolutions.com",
  locale: "en_US",
  keywords: [
    "Yuni Tech",
    "software development",
    "web development",
    "mobile app development",
    "digital solutions",
  ],
  links: {
    email: "hello@yunisolution.com",
    supportEmail: "support@yunisolution.com",
    linkedin: "https://linkedin.com/company/yuni-solution",
    instagram: "https://instagram.com/yunisolution",
    facebook: "https://facebook.com/yunisolution",
    youtube: "https://youtube.com/@yunisolution",
    phone: "+1 (416) 000-000",
  },
  offices: [
    { city: "California", address: "2261 Market St, Suite 2015 San Francisco, CA 94114" },
  ],
  tagline:
    "Empowering businesses through innovative technology, creative design, and scalable digital solutions.",
  ogImage: "/images/og-image.png",
} as const;

export type SiteConfig = typeof siteConfig;
