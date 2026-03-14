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
}

export type Locale = "pt-br" | "en-us";
