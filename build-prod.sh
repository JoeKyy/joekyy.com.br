#!/usr/bin/env bash
# build-prod.sh — Gera o build estático apontando para o WordPress de produção
# Uso: ./build-prod.sh
# Output: next/site.zip (fazer upload para public_html/ no cPanel)

set -e

WP_PROD_URL="https://joekyy.com.br/wp/graphql"

echo "🔧 Build para produção"
echo "   WordPress: $WP_PROD_URL"
echo ""

# Copiar currículos para public/docs
mkdir -p next/public/docs
cp "docs/Jhomar Nando - Resume Portuguese.docx" next/public/docs/resume-pt.docx 2>/dev/null && echo "✅ Currículo PT copiado" || echo "⚠️  Currículo PT não encontrado"
cp "docs/Jhomar Nando - Resume English.docx" next/public/docs/resume-en.docx 2>/dev/null && echo "✅ Currículo EN copiado" || echo "⚠️  Currículo EN não encontrado"

echo ""
echo "📦 Buildando Next.js..."

# Limpar fetch cache para garantir dados frescos do WP
rm -rf next/.next/cache/fetch-cache

# Exportar variáveis diretamente no processo — tem prioridade sobre qualquer .env.*
export NEXT_PUBLIC_DATA_SOURCE=wordpress
export WORDPRESS_API_URL="$WP_PROD_URL"

cd next && npm run build

echo ""
echo "🗜  Gerando site.zip..."
cd out && zip -r ../site.zip . -x "*.DS_Store"
cd ..

echo ""
echo "✅ Pronto! Arquivo gerado: next/site.zip"
echo ""
echo "📋 Próximos passos:"
echo "   1. No cPanel: File Manager → public_html/ → Upload e extraia site.zip"
echo "   2. Confirme que joekyy.com.br redireciona para /pt-br/"
echo ""
