import { GraphQLClient } from "graphql-request";
import type { Project, Client, Skill, SiteConfig, Locale } from "@/types";

const endpoint =
  process.env.WORDPRESS_API_URL ?? "http://localhost:8888/wordpress/graphql";

const client = new GraphQLClient(endpoint);

// ============================================================
// Queries
// ============================================================

const PROJECTS_QUERY = `
  query GetProjects {
    projetos(first: 100) {
      nodes {
        id
        slug
        camposDoProjeto {
          tituloPt
          tituloEn
          descricaoPt
          descricaoEn
          imagem { node { sourceUrl } }
          tipo
          ordem
          link
          featured
        }
      }
    }
  }
`;

const CLIENTS_QUERY = `
  query GetClients {
    clientes(first: 100) {
      nodes {
        id
        title
        camposDoCliente {
          logo { node { sourceUrl } }
          url
          ordem
        }
      }
    }
  }
`;

const SKILLS_QUERY = `
  query GetSkills {
    habilidades(first: 100) {
      nodes {
        id
        title
        camposDaHabilidade {
          nomePt
          nomeEn
          categoria
        }
      }
    }
  }
`;

const SITE_CONFIG_QUERY = `
  query GetSiteConfig {
    configSites(first: 1) {
      nodes {
        configDoSite {
          bioPt
          bioEn
          emailPt
          emailEn
          whatsappUrl
          linkedinUrl
          githubUrl
          curriculoPtUrl
          curriculoEnUrl
          heroHtmlPt
          heroHtmlEn
          heroAvatarAltPt
          heroAvatarAltEn
          contactHeadingPt
          contactHeadingEn
          contactMessagePt
          contactMessageEn
          aboutBio1Pt
          aboutBio1En
          aboutBio2Pt
          aboutBio2En
          portfolioHeadingPt
          portfolioHeadingEn
          portfolioIntroPt
          portfolioIntroEn
          portfolioCtaPt
          portfolioCtaEn
          clientsHeadingPt
          clientsHeadingEn
          clientsDescriptionPt
          clientsDescriptionEn
        }
      }
    }
  }
`;

// ============================================================
// Tipos da resposta GraphQL
// ============================================================

interface WPProjectNode {
  id: string;
  slug: string;
  camposDoProjeto: {
    tituloPt: string;
    tituloEn: string;
    descricaoPt: string;
    descricaoEn: string;
    imagem: { node: { sourceUrl: string } } | null;
    tipo: string[] | string;
    ordem: number;
    link?: string;
    featured: boolean;
  };
}

interface WPClientNode {
  id: string;
  title: string;
  camposDoCliente: {
    logo: { node: { sourceUrl: string } } | null;
    url: string;
    ordem: number;
  };
}

interface WPSkillNode {
  id: string;
  title: string;
  camposDaHabilidade: {
    nomePt: string;
    nomeEn: string;
    categoria: ("technical" | "professional")[] | "technical" | "professional";
  };
}

interface WPSiteConfigNode {
  configDoSite: {
    bioPt: string;
    bioEn: string;
    emailPt: string;
    emailEn: string;
    whatsappUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    curriculoPtUrl: string;
    curriculoEnUrl: string;
    heroHtmlPt: string;
    heroHtmlEn: string;
    heroAvatarAltPt: string;
    heroAvatarAltEn: string;
    contactHeadingPt: string;
    contactHeadingEn: string;
    contactMessagePt: string;
    contactMessageEn: string;
    aboutBio1Pt: string;
    aboutBio1En: string;
    aboutBio2Pt: string;
    aboutBio2En: string;
    portfolioHeadingPt: string;
    portfolioHeadingEn: string;
    portfolioIntroPt: string;
    portfolioIntroEn: string;
    portfolioCtaPt: string;
    portfolioCtaEn: string;
    clientsHeadingPt: string;
    clientsHeadingEn: string;
    clientsDescriptionPt: string;
    clientsDescriptionEn: string;
  };
}

// ============================================================
// Funções de fetch tipadas
// ============================================================

export async function getProjectsWP(): Promise<Project[]> {
  const data = await client.request<{ projetos: { nodes: WPProjectNode[] } }>(
    PROJECTS_QUERY,
  );
  return data.projetos.nodes
    .map((node) => ({
      id: node.id,
      slug: node.slug,
      titlePt: node.camposDoProjeto.tituloPt,
      titleEn: node.camposDoProjeto.tituloEn,
      descriptionPt: node.camposDoProjeto.descricaoPt,
      descriptionEn: node.camposDoProjeto.descricaoEn,
      image: node.camposDoProjeto.imagem?.node?.sourceUrl ?? "",
      type: (Array.isArray(node.camposDoProjeto.tipo)
        ? node.camposDoProjeto.tipo[0]
        : node.camposDoProjeto.tipo) === "servico" ? "service" as const : "freelance" as const,
      order: node.camposDoProjeto.ordem ?? 0,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getClientsWP(): Promise<Client[]> {
  const data = await client.request<{ clientes: { nodes: WPClientNode[] } }>(
    CLIENTS_QUERY,
  );
  return data.clientes.nodes
    .map((node) => ({
      id: node.id,
      name: node.title,
      logo: node.camposDoCliente.logo?.node?.sourceUrl ?? "",
      order: node.camposDoCliente.ordem ?? 0,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getSkillsWP(): Promise<Skill[]> {
  const data = await client.request<{ habilidades: { nodes: WPSkillNode[] } }>(
    SKILLS_QUERY,
  );
  return data.habilidades.nodes.map((node) => ({
    name: node.title,
    namePt: node.camposDaHabilidade.nomePt,
    nameEn: node.camposDaHabilidade.nomeEn,
    category: (Array.isArray(node.camposDaHabilidade.categoria)
      ? node.camposDaHabilidade.categoria[0]
      : node.camposDaHabilidade.categoria) as "technical" | "professional",
  }));
}

export async function getSiteConfigWP(
  _locale: Locale,
): Promise<SiteConfig | null> {
  const data = await client.request<{
    configSites: { nodes: WPSiteConfigNode[] };
  }>(SITE_CONFIG_QUERY);
  const node = data.configSites.nodes[0];
  if (!node) return null;
  const c = node.configDoSite;
  return {
    emailPt: c.emailPt,
    emailEn: c.emailEn,
    whatsapp: c.whatsappUrl,
    socialLinks: [
      { platform: "linkedin", url: c.linkedinUrl, icon: "FaLinkedin" },
      { platform: "github", url: c.githubUrl, icon: "FaGithub" },
      { platform: "whatsapp", url: c.whatsappUrl, icon: "FaWhatsapp" },
    ],
    resumePtUrl: c.curriculoPtUrl,
    resumeEnUrl: c.curriculoEnUrl,
    heroHtmlPt: c.heroHtmlPt,
    heroHtmlEn: c.heroHtmlEn,
    heroAvatarAltPt: c.heroAvatarAltPt,
    heroAvatarAltEn: c.heroAvatarAltEn,
    contactHeadingPt: c.contactHeadingPt,
    contactHeadingEn: c.contactHeadingEn,
    contactMessagePt: c.contactMessagePt,
    contactMessageEn: c.contactMessageEn,
    aboutBio1Pt: c.aboutBio1Pt,
    aboutBio1En: c.aboutBio1En,
    aboutBio2Pt: c.aboutBio2Pt,
    aboutBio2En: c.aboutBio2En,
    portfolioHeadingPt: c.portfolioHeadingPt,
    portfolioHeadingEn: c.portfolioHeadingEn,
    portfolioIntroPt: c.portfolioIntroPt,
    portfolioIntroEn: c.portfolioIntroEn,
    portfolioCtaPt: c.portfolioCtaPt,
    portfolioCtaEn: c.portfolioCtaEn,
    clientsHeadingPt: c.clientsHeadingPt,
    clientsHeadingEn: c.clientsHeadingEn,
    clientsDescriptionPt: c.clientsDescriptionPt,
    clientsDescriptionEn: c.clientsDescriptionEn,
  };
}
