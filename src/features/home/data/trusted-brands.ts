export type TrustedBrand = {
  /** Public path under /public */
  src: string;
  /** Accessible name — update with the real brand name per icon. */
  name: string;
  width: number;
  height: number;
};

export const trustedBrands: TrustedBrand[] = [
  { src: "/images/trustedIcon1.png", name: "Sony", width: 131, height: 22 },
  { src: "/images/trustedIcon2.png", name: "Partner 2", width: 106, height: 71 },
  { src: "/images/trustedIcon3.png", name: "Partner 3", width: 85, height: 66 },
  { src: "/images/trustedIcon4.png", name: "Partner 4", width: 116, height: 46 },
  { src: "/images/trustedIcon5.png", name: "Partner 5", width: 112, height: 29 },
  { src: "/images/trustedIcon6.png", name: "Partner 6", width: 155, height: 31 },
  { src: "/images/trustedIcon7.png", name: "Partner 7", width: 136, height: 11 },
  { src: "/images/trustedIcon8.png", name: "Partner 8", width: 106, height: 64 },
  { src: "/images/trustedIcon9.png", name: "Partner 9", width: 130, height: 27 },
  { src: "/images/trustedIcon10.png", name: "Partner 10", width: 105, height: 36 },
];
