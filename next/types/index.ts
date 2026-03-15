export interface Project {
  id: string;
  slug: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  image: string;
  type: "freelance" | "service";
  order: number;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  order: number;
}

export interface Skill {
  name: string;
  namePt: string;
  nameEn: string;
  category: "technical" | "professional";
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  emailPt: string;
  emailEn: string;
  whatsapp: string;
  socialLinks: SocialLink[];
  resumePtUrl: string;
  resumeEnUrl: string;
  // Hero
  heroHtmlPt?: string;
  heroHtmlEn?: string;
  heroAvatarAltPt?: string;
  heroAvatarAltEn?: string;
  // Contact
  contactHeadingPt?: string;
  contactHeadingEn?: string;
  contactMessagePt?: string;
  contactMessageEn?: string;
}

export type Locale = "pt-br" | "en-us";
