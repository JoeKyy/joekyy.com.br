import type { Project, Client, Skill, Locale } from "@/types";
import portfolioData from "@/data/portfolio.json";
import clientsData from "@/data/clients.json";
import skillsData from "@/data/skills.json";
import ptBr from "@/data/pt-br.json";
import enUs from "@/data/en-us.json";

export function getProjects(): Project[] {
  return (portfolioData as Project[]).sort((a, b) => a.order - b.order);
}

export function getClients(): Client[] {
  return (clientsData as Client[]).sort((a, b) => a.order - b.order);
}

export function getSkills(): Skill[] {
  return skillsData as Skill[];
}

export function getMessages(locale: Locale) {
  return locale === "pt-br" ? ptBr : enUs;
}

export const siteConfig = {
  emailPt: "contato@joekyy.com.br",
  emailEn: "contact@joekyy.com.br",
  whatsapp:
    "https://wa.me/5511981753546?text=Vi+o+seu+site+e+estou+interessado.",
  socialLinks: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/jhomarnando/",
      icon: "FaLinkedin",
    },
    { platform: "github", url: "https://github.com/JoeKyy", icon: "FaGithub" },
    {
      platform: "whatsapp",
      url: "https://wa.me/5511981753546?text=Vi+o+seu+site+e+estou+interessado.",
      icon: "FaWhatsapp",
    },
  ],
  resumePtUrl: "/docs/resume-pt.docx",
  resumeEnUrl: "/docs/resume-en.docx",
};
