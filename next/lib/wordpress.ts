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
    projetos(first: 100, where: { orderby: { field: META_VALUE_NUM, order: ASC } }) {
      nodes {
        id
        slug
        acfProjeto {
          tituloPt
          tituloEn
          descricaoPt
          descricaoEn
          imagem
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
        acfCliente {
          logo
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
        acfHabilidade {
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
        acfConfigSite {
          bioPt
          bioEn
          avatar
          emailPt
          emailEn
          whatsappUrl
          linkedinUrl
          githubUrl
          curriculoPtUrl
          curriculoEnUrl
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
  acfProjeto: {
    tituloPt: string;
    tituloEn: string;
    descricaoPt: string;
    descricaoEn: string;
    imagem: string;
    tipo: "freelance" | "servico";
    ordem: number;
    link?: string;
    featured: boolean;
  };
}

interface WPClientNode {
  id: string;
  title: string;
  acfCliente: {
    logo: string;
    url: string;
    ordem: number;
  };
}

interface WPSkillNode {
  id: string;
  title: string;
  acfHabilidade: {
    nomePt: string;
    nomeEn: string;
    categoria: "technical" | "professional";
  };
}

interface WPSiteConfigNode {
  acfConfigSite: {
    bioPt: string;
    bioEn: string;
    avatar: string;
    emailPt: string;
    emailEn: string;
    whatsappUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    curriculoPtUrl: string;
    curriculoEnUrl: string;
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
      titlePt: node.acfProjeto.tituloPt,
      titleEn: node.acfProjeto.tituloEn,
      descriptionPt: node.acfProjeto.descricaoPt,
      descriptionEn: node.acfProjeto.descricaoEn,
      image: node.acfProjeto.imagem,
      type: (node.acfProjeto.tipo === "servico" ? "service" : "freelance") as "freelance" | "service",
      order: node.acfProjeto.ordem ?? 0,
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
      logo: node.acfCliente.logo,
      order: node.acfCliente.ordem ?? 0,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getSkillsWP(): Promise<Skill[]> {
  const data = await client.request<{ habilidades: { nodes: WPSkillNode[] } }>(
    SKILLS_QUERY,
  );
  return data.habilidades.nodes.map((node) => ({
    name: node.title,
    namePt: node.acfHabilidade.nomePt,
    nameEn: node.acfHabilidade.nomeEn,
    category: node.acfHabilidade.categoria,
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
  const c = node.acfConfigSite;
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
  };
}
