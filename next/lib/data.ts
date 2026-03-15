import type { Project, Client, Skill, SiteConfig, Locale } from "@/types";
import portfolioData from "@/data/portfolio.json";
import clientsData from "@/data/clients.json";
import skillsData from "@/data/skills.json";
import ptBr from "@/data/pt-br.json";
import enUs from "@/data/en-us.json";
import { getProjectsWP, getClientsWP, getSkillsWP, getSiteConfigWP } from "@/lib/wordpress";

const useWordPress = process.env.NEXT_PUBLIC_DATA_SOURCE === "wordpress";

// JSON fallbacks (sync)
function getProjectsJSON(): Project[] {
  return (portfolioData as Project[]).sort((a, b) => a.order - b.order);
}
function getClientsJSON(): Client[] {
  return (clientsData as Client[]).sort((a, b) => a.order - b.order);
}
function getSkillsJSON(): Skill[] {
  return skillsData as Skill[];
}

// Public API — transparente para os componentes
export async function getProjects(): Promise<Project[]> {
  if (useWordPress) return getProjectsWP();
  return getProjectsJSON();
}

export async function getClients(): Promise<Client[]> {
  if (useWordPress) return getClientsWP();
  return getClientsJSON();
}

export async function getSkills(): Promise<Skill[]> {
  if (useWordPress) return getSkillsWP();
  return getSkillsJSON();
}

export async function getSiteConfig(locale: Locale): Promise<SiteConfig> {
  if (useWordPress) {
    const wpConfig = await getSiteConfigWP(locale);
    if (wpConfig) return wpConfig;
  }
  // Fallback para os valores estáticos
  const messages = locale === "pt-br" ? ptBr : enUs;
  return {
    emailPt: "contato@joekyy.com.br",
    emailEn: "contact@joekyy.com.br",
    whatsapp: "https://wa.me/5511981753546?text=Vi+o+seu+site+e+estou+interessado.",
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/jhomarnando/", icon: "FaLinkedin" },
      { platform: "github", url: "https://github.com/JoeKyy", icon: "FaGithub" },
      { platform: "whatsapp", url: "https://wa.me/5511981753546?text=Vi+o+seu+site+e+estou+interessado.", icon: "FaWhatsapp" },
    ],
    resumePtUrl: "/docs/resume-pt.docx",
    resumeEnUrl: "/docs/resume-en.docx",
    heroHtmlPt: (messages as typeof ptBr).hero.html,
    heroHtmlEn: (messages as typeof enUs).hero.html,
    heroAvatarAltPt: (messages as typeof ptBr).hero.avatarAlt,
    heroAvatarAltEn: (messages as typeof enUs).hero.avatarAlt,
    contactHeadingPt: (messages as typeof ptBr).contact.heading,
    contactHeadingEn: (messages as typeof enUs).contact.heading,
    contactMessagePt: (messages as typeof ptBr).contact.message,
    contactMessageEn: (messages as typeof enUs).contact.message,
  };
}

export function getMessages(locale: Locale) {
  return locale === "pt-br" ? ptBr : enUs;
}

// Mantido para retrocompatibilidade — usar getSiteConfig(locale) nos novos componentes
export const siteConfig = {
  emailPt: "contato@joekyy.com.br",
  emailEn: "contact@joekyy.com.br",
  whatsapp: "https://wa.me/5511981753546?text=Vi+o+seu+site+e+estou+interessado.",
  socialLinks: [
    { platform: "linkedin", url: "https://www.linkedin.com/in/jhomarnando/", icon: "FaLinkedin" },
    { platform: "github", url: "https://github.com/JoeKyy", icon: "FaGithub" },
    { platform: "whatsapp", url: "https://wa.me/5511981753546?text=Vi+o+seu+site+e+estou+interessado.", icon: "FaWhatsapp" },
  ],
  resumePtUrl: "/docs/resume-pt.docx",
  resumeEnUrl: "/docs/resume-en.docx",
};
