export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  /** Sub-services listed inside the expanded panel */
  items: string[];
  image: { src: string; width: number; height: number; alt: string };
  href: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
};
