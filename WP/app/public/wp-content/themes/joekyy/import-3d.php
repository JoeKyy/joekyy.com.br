<?php
require_once dirname( dirname( dirname( dirname( __FILE__ ) ) ) ) . '/wp-load.php';
if ( ! current_user_can('manage_options') ) { wp_redirect( wp_login_url($_SERVER['REQUEST_URI']) ); exit; }

$reels = [
    1  => 'https://www.instagram.com/joekyyltda/reel/DV3i9d_DTJr/',
    2  => 'https://www.instagram.com/joekyyltda/reel/DV1ijK-kaxo/',
    3  => 'https://www.instagram.com/joekyyltda/reel/DVzzGPfDZMu/',
    4  => 'https://www.instagram.com/joekyyltda/reel/DVwc-hMERBg/',
    5  => 'https://www.instagram.com/joekyyltda/reel/DVoJ_yvEV1J/',
    6  => 'https://www.instagram.com/joekyyltda/reel/DVm7m4IDacz/',
    7  => 'https://www.instagram.com/joekyyltda/reel/DVizxItjZrC/',
    8  => 'https://www.instagram.com/joekyyltda/reel/DVgMGGxjX_6/',
    9  => 'https://www.instagram.com/joekyyltda/reel/DVe-Y2ujYSE/',
    10 => 'https://www.instagram.com/joekyyltda/reel/DVeQ3loEXEQ/',
    11 => 'https://www.instagram.com/joekyyltda/reel/DVRM8ZMESLd/',
    12 => 'https://www.instagram.com/joekyyltda/reel/DVQ5lGGDbzQ/',
];

$results = [];

if ( isset($_GET['run']) ) {
    // Verificar se já existem posts para não duplicar
    $existing = get_posts(['post_type' => 'impressao_3d', 'posts_per_page' => -1, 'post_status' => 'any']);
    if ( count($existing) > 0 ) {
        $results[] = '⚠️ Já existem ' . count($existing) . ' projetos 3D cadastrados. Delete-os antes de reimportar.';
    } else {
        foreach ( $reels as $ordem => $url ) {
            $post_id = wp_insert_post([
                'post_title'  => "Projeto 3D #$ordem",
                'post_type'   => 'impressao_3d',
                'post_status' => 'publish',
            ]);

            if ( is_wp_error($post_id) ) {
                $results[] = "❌ Erro ao criar post $ordem: " . $post_id->get_error_message();
                continue;
            }

            update_field('reels_url', $url,     $post_id);
            update_field('ordem',     $ordem,    $post_id);
            update_field('titulo_pt', "Projeto 3D #$ordem", $post_id);
            update_field('titulo_en', "3D Project #$ordem", $post_id);

            $results[] = "✅ Post $ordem criado (ID $post_id) — <a href='/wordpress/wp-admin/post.php?post=$post_id&action=edit' target='_blank'>Editar</a>";
        }
        $results[] = '<br>🎉 ' . count($reels) . ' projetos importados! Agora edite cada um para adicionar título, descrição e thumbnail.';
    }
}
?>
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Importar Projetos 3D</title>
<style>body{font-family:monospace;max-width:800px;margin:40px auto;padding:20px;background:#f1f1f1}
.btn{display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:4px;cursor:pointer;border:0}
.result{background:#fff;padding:16px;border-radius:4px;margin-top:16px;line-height:2}
a{color:#0066cc}</style></head><body>
<h1>🖨️ Importar Projetos 3D (12 Reels)</h1>
<p>Cria os 12 posts do CPT <code>impressao_3d</code> com as URLs dos Reels já preenchidas.<br>
Você precisará editar cada um para adicionar <strong>título, descrição e thumbnail</strong>.</p>

<?php if ( !isset($_GET['run']) ): ?>
<a href="?run=1" class="btn">⚡ Importar os 12 Reels</a>
<?php endif; ?>

<?php if ($results): ?>
<div class="result">
<?php foreach($results as $r) echo $r . '<br>'; ?>
<br>⚠️ <strong>Delete este arquivo após usar!</strong>
</div>
<?php endif; ?>
</body></html>
