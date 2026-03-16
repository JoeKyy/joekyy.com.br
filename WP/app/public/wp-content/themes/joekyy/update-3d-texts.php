<?php
require_once dirname( dirname( dirname( dirname( __FILE__ ) ) ) ) . '/wp-load.php';
if ( ! current_user_can('manage_options') ) { wp_redirect( wp_login_url($_SERVER['REQUEST_URI']) ); exit; }

// Dados dos projetos — indexados pela reels_url
$projetos = [
    'https://www.instagram.com/joekyyltda/reel/DV3i9d_DTJr/' => [
        'titulo_pt'    => 'Catbook — CEO aprovado',
        'titulo_en'    => 'Catbook — CEO approved',
        'descricao_pt' => 'Suporte estilo notebook impresso em 3D para gatos. Versão compacta, mais rápida de imprimir e igualmente aprovada pelo CEO da casa.',
        'descricao_en' => 'A compact 3D printed notebook-style stand for cats. Faster to print and fully approved by the house CEO.',
        'ordem'        => 1,
    ],
    'https://www.instagram.com/joekyyltda/reel/DV1ijK-kaxo/' => [
        'titulo_pt'    => 'Acessórios Skadis',
        'titulo_en'    => 'Skadis Accessories',
        'descricao_pt' => 'Acessórios personalizados para o painel perfurado Skadis da IKEA. Com impressão 3D, qualquer encaixe, qualquer formato.',
        'descricao_en' => 'Custom accessories for the IKEA Skadis perforated board. 3D printing means any fit, any shape.',
        'ordem'        => 2,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVzzGPfDZMu/' => [
        'titulo_pt'    => '5 upgrades impressos para a Bambu Lab A1',
        'titulo_en'    => '5 printed upgrades for the Bambu Lab A1',
        'descricao_pt' => 'Handles Allen, suporte PTFE do AMS lite, divisor Y, top mount e spool holder V2. Tudo gratuito no MakerWorld.',
        'descricao_en' => 'Allen handles, AMS lite PTFE holder, Y splitter, top mount and spool holder V2. All free on MakerWorld.',
        'ordem'        => 3,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVwc-hMERBg/' => [
        'titulo_pt'    => 'Guia de posicionamento — Bambu Lab A1',
        'titulo_en'    => 'Plate alignment guide — Bambu Lab A1',
        'descricao_pt' => 'Guia impresso para posicionar a plate da A1 sem erro. Simples, pequeno e resolve de vez o problema de calibração.',
        'descricao_en' => 'Printed guide to align the A1 plate perfectly every time. Small, simple, no more calibration guesswork.',
        'ordem'        => 4,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVoJ_yvEV1J/' => [
        'titulo_pt'    => 'Deck holder — Baldur\'s Gate 3',
        'titulo_en'    => 'Deck holder — Baldur\'s Gate 3',
        'descricao_pt' => 'Porta-deck temático de Baldur\'s Gate 3 em formato de caixão, inspirado no Astarion. Para guardar deck, dados e destacar uma carta na mesa.',
        'descricao_en' => 'Baldur\'s Gate 3 themed coffin deck holder inspired by Astarion. Holds cards, dice and displays a featured card.',
        'ordem'        => 5,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVm7m4IDacz/' => [
        'titulo_pt'    => 'Anel de leitura',
        'titulo_en'    => 'Book ring',
        'descricao_pt' => 'Anel impresso em 3D para segurar o livro com uma mão. Prático no sofá, na cama ou no transporte — e ainda vira fidget.',
        'descricao_en' => '3D printed ring to hold a book one-handed. Great for reading anywhere — doubles as a fidget too.',
        'ordem'        => 6,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVizxItjZrC/' => [
        'titulo_pt'    => 'Gaveteiro LEGO',
        'titulo_en'    => 'LEGO drawer',
        'descricao_pt' => 'Gaveteiro modular com visual de peças LEGO. Funcional, divertido e perfeito para organizar a mesa.',
        'descricao_en' => 'Modular drawer with classic LEGO brick aesthetics. Functional, fun and perfect for desk organization.',
        'ordem'        => 7,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVgMGGxjX_6/' => [
        'titulo_pt'    => 'Organizador de suplementos',
        'titulo_en'    => 'Supplement organizer',
        'descricao_pt' => 'Organizador portátil impresso em 3D para remédios e suplementos de treino. Pequeno, prático e fácil de carregar.',
        'descricao_en' => 'Portable 3D printed organizer for daily meds and gym supplements. Small and easy to carry.',
        'ordem'        => 8,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVe-Y2ujYSE/' => [
        'titulo_pt'    => 'Máscaras orientais — Demon Slayer',
        'titulo_en'    => 'Oriental masks — Demon Slayer',
        'descricao_pt' => 'Máscaras orientais impressas em 3D com teste de tipos de colagem. Destaque para a máscara Tengu de Kimetsu no Yaiba.',
        'descricao_en' => '3D printed oriental masks with glue type testing. Highlight: the Tengu mask from Demon Slayer.',
        'ordem'        => 9,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVeQ3loEXEQ/' => [
        'titulo_pt'    => 'Adaptador para fita métrica',
        'titulo_en'    => 'Tape measure adapter',
        'descricao_pt' => 'Adaptador impresso em 3D para guardar e usar a fita métrica com mais praticidade. Pequeno, simples, funcional.',
        'descricao_en' => '3D printed adapter to store and use a tape measure more practically. Small, simple, functional.',
        'ordem'        => 10,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVRM8ZMESLd/' => [
        'titulo_pt'    => 'Suporte de notebook',
        'titulo_en'    => 'Laptop stand',
        'descricao_pt' => 'Suporte impresso em 3D para melhorar a ventilação do notebook e organizar o espaço de trabalho.',
        'descricao_en' => '3D printed laptop stand for better ventilation and a cleaner workspace.',
        'ordem'        => 11,
    ],
    'https://www.instagram.com/joekyyltda/reel/DVQ5lGGDbzQ/' => [
        'titulo_pt'    => 'Catbook — o original',
        'titulo_en'    => 'Catbook — the original',
        'descricao_pt' => 'O Catbook original — o notebook de mentira impresso em 3D que deu origem a tudo. O gato adotou imediatamente.',
        'descricao_en' => 'The original Catbook — the fake 3D printed laptop that started it all. The cat adopted it immediately.',
        'ordem'        => 12,
    ],
];

$results = [];

if ( isset($_GET['run']) ) {
    $posts = get_posts(['post_type' => 'impressao_3d', 'posts_per_page' => -1, 'post_status' => 'publish']);

    if ( empty($posts) ) {
        $results[] = '❌ Nenhum post encontrado. Rode o import-3d.php primeiro.';
    } else {
        foreach ( $posts as $post ) {
            $reels_url = get_field('reels_url', $post->ID);
            if ( ! $reels_url || ! isset($projetos[$reels_url]) ) {
                $results[] = "⚠️ Post ID {$post->ID} sem URL mapeada: $reels_url";
                continue;
            }

            $dados = $projetos[$reels_url];
            update_field('titulo_pt',    $dados['titulo_pt'],    $post->ID);
            update_field('titulo_en',    $dados['titulo_en'],    $post->ID);
            update_field('descricao_pt', $dados['descricao_pt'], $post->ID);
            update_field('descricao_en', $dados['descricao_en'], $post->ID);
            update_field('ordem',        $dados['ordem'],        $post->ID);

            // Atualiza o post_title também
            wp_update_post(['ID' => $post->ID, 'post_title' => $dados['titulo_pt']]);

            $results[] = "✅ [{$dados['ordem']}] {$dados['titulo_pt']} — <a href='/wordpress/wp-admin/post.php?post={$post->ID}&action=edit' target='_blank'>Editar</a>";
        }
        $results[] = '<br>🎉 ' . count($posts) . ' posts atualizados!';
    }
}
?>
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Atualizar Projetos 3D</title>
<style>body{font-family:monospace;max-width:800px;margin:40px auto;padding:20px;background:#f1f1f1}
.btn{display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:4px;cursor:pointer;border:0}
.result{background:#fff;padding:16px;border-radius:4px;margin-top:16px;line-height:2}a{color:#0066cc}</style></head><body>
<h1>✏️ Atualizar textos dos Projetos 3D</h1>
<p>Atualiza título (PT/EN), descrição (PT/EN) e ordem dos 12 projetos com base na URL do Reels.</p>
<?php if ( !isset($_GET['run']) ): ?>
<a href="?run=1" class="btn">⚡ Atualizar todos os posts</a>
<?php endif; ?>
<?php if ($results): ?>
<div class="result">
<?php foreach($results as $r) echo $r . '<br>'; ?>
<br>⚠️ <strong>Delete este arquivo após usar!</strong>
</div>
<?php endif; ?>
</body></html>
