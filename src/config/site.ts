export const siteConfig = {
  name: "Yuni Solutions",
  shortName: "Yuni",
  description:
    "Yuni Solutions builds modern digital products — web, mobile, and cloud solutions engineered for growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yunisolutions.com",
  locale: "en_US",
  keywords: [
    "Yuni Solutions",
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
    { city: "Karachi", address: "Block 14, Gulistan-e-Johar, Karachi" },
    { city: "California", address: "abcd, abcd, California" },
  ],
  tagline:
    "Empowering businesses through innovative technology, creative design, and scalable digital solutions.",
  ogImage: "/images/og-image.png",
} as const;

export type SiteConfig = typeof siteConfig;
