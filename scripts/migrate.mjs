#!/usr/bin/env node
/**
 * Script de migração: JSON → WordPress via REST API
 * Uso: WP_USER=admin WP_PASSWORD="suasenha" node scripts/migrate.mjs
 *
 * Ambiente local: usa usuário e senha do WP Admin diretamente (só funciona local)
 * Produção: configure pretty permalinks e use Application Password
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WP_URL = process.env.WP_URL ?? "http://localhost:8888/wordpress";
const WP_USER = process.env.WP_USER ?? "admin";
const WP_PASSWORD = process.env.WP_PASSWORD ?? "";

if (!WP_PASSWORD) {
  console.error("❌ WP_PASSWORD não definido.");
  console.error("   Uso: WP_USER=admin WP_PASSWORD=suasenha node scripts/migrate.mjs");
  process.exit(1);
}

const auth = Buffer.from(`${WP_USER}:${WP_PASSWORD}`).toString("base64");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${auth}`,
};

async function wpRequest(path, body) {
  // Suporta WP com e sem pretty permalinks
  const base = WP_URL.replace(/\/$/, "");
  const url = `${base}/?rest_route=/wp/v2/${path}`;
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(`Erro ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function wpPost(endpoint, body) {
  return wpRequest(endpoint, body);
}

async function wpSetACF(postId, postType, fields) {
  return wpRequest(`${postType}/${postId}`, { acf: fields });
}

// ============================================================
// Migrar projetos
// ============================================================
async function migrateProjects() {
  const dataPath = join(__dirname, "../next/data/portfolio.json");
  const projects = JSON.parse(readFileSync(dataPath, "utf-8"));

  console.log(`\n📁 Migrando ${projects.length} projetos...`);

  for (const project of projects) {
    try {
      // Criar post
      const post = await wpPost("projeto", {
        title: project.titlePt,
        status: "publish",
        slug: project.slug,
      });

      // Atualizar campos ACF
      await wpSetACF(post.id, "projeto", {
        titulo_pt: project.titlePt,
        titulo_en: project.titleEn,
        descricao_pt: project.descriptionPt,
        descricao_en: project.descriptionEn,
        tipo: project.type === "service" ? "servico" : "freelance",
        ordem: project.order,
        featured: false,
      });

      console.log(`  ✅ ${project.titlePt} (id: ${post.id})`);
    } catch (err) {
      console.error(`  ❌ ${project.titlePt}: ${err.message}`);
    }
  }
}

// ============================================================
// Migrar clientes
// ============================================================
async function migrateClients() {
  const dataPath = join(__dirname, "../next/data/clients.json");
  const clients = JSON.parse(readFileSync(dataPath, "utf-8"));

  console.log(`\n👥 Migrando ${clients.length} clientes...`);

  for (const client of clients) {
    try {
      const post = await wpPost("cliente", {
        title: client.name,
        status: "publish",
      });

      await wpSetACF(post.id, "cliente", {
        ordem: client.order,
        // logo e url precisam ser preenchidos manualmente no WP Admin
        // pois os logos estão em /public/images/clients/ (arquivos locais)
      });

      console.log(
        `  ✅ ${client.name} (id: ${post.id}) — logo: ${client.logo}`,
      );
    } catch (err) {
      console.error(`  ❌ ${client.name}: ${err.message}`);
    }
  }

  console.log(
    "\n  ⚠️  Logos dos clientes precisam ser enviados manualmente no WP Admin.",
  );
  console.log(
    "     Faça upload de /next/public/images/clients/ → Mídia do WordPress.",
  );
}

// ============================================================
// Migrar habilidades
// ============================================================
async function migrateSkills() {
  const dataPath = join(__dirname, "../next/data/skills.json");
  const skills = JSON.parse(readFileSync(dataPath, "utf-8"));

  console.log(`\n🛠  Migrando ${skills.length} habilidades...`);

  for (const skill of skills) {
    try {
      const post = await wpPost("habilidade", {
        title: skill.namePt,
        status: "publish",
      });

      await wpSetACF(post.id, "habilidade", {
        nome_pt: skill.namePt,
        nome_en: skill.nameEn,
        categoria: skill.category,
      });

      console.log(`  ✅ ${skill.namePt} (${skill.category})`);
    } catch (err) {
      console.error(`  ❌ ${skill.namePt}: ${err.message}`);
    }
  }
}

// ============================================================
// Main
// ============================================================
const args = process.argv.slice(2);
const runAll = args.length === 0;

(async () => {
  console.log(`\n🚀 Migrando para WordPress em: ${WP_URL}`);
  console.log(`   Usuário: ${WP_USER}\n`);

  try {
    if (runAll || args.includes("projects")) await migrateProjects();
    if (runAll || args.includes("clients")) await migrateClients();
    if (runAll || args.includes("skills")) await migrateSkills();
    console.log("\n✅ Migração concluída!\n");
  } catch (err) {
    console.error("\n💥 Erro fatal:", err.message);
    process.exit(1);
  }
})();
