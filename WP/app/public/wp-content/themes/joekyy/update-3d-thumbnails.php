<?php
require_once dirname( dirname( dirname( dirname( __FILE__ ) ) ) ) . '/wp-load.php';
if ( ! current_user_can('manage_options') ) { wp_redirect( wp_login_url($_SERVER['REQUEST_URI']) ); exit; }

// Thumbnails indexados pela ordem do post
$thumbnails = [
    1  => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/652116880_818616947235930_834637973916118261_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=109&ig_cache_key=Mzg1MjcwMTc2MzkwNDU0OTQ4Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=Tw98f_ugdHMQ7kNvwHUwUQF&_nc_oc=Adk8zCOKY3gpxakTqhjurN9LnsZwZLmy3fwdLD9HMDj01K6QlUcPU5lj5oT-AGH3yGkdSZnSwI2hHZRcqKxZ2w9_&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=-1&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfwokwYjl6zM9VubcX9Y-SckOYyb6pT5FoCfL3J02dTeUw&oe=69BD40A2',
    2  => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/651511463_1812862116058816_2701170526951495526_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=109&ig_cache_key=Mzg1MjEzNzAwNjgzNTU0MzE0NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=J5gy5MvoDA4Q7kNvwEe5Gtu&_nc_oc=AdlmOw_tYLu4ea8blczLaXryRek1h5LCaspZ1AdBIXOmRqpIgD3PzP-gzmMJjuThDSB_mkvfm-cXPEiAgu6y14vX&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=-1&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfwcypH0JB-qmNL42EX3gjCsP0SrRya6SLz9XSARftBUlQ&oe=69BD3F7C',
    3  => 'https://instagram.fcgh10-1.fna.fbcdn.net/v/t51.71878-15/649640997_1844983962830144_5587092243568157712_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=102&ig_cache_key=Mzg1MTY0NjgzNTY0Nzk0MzQ3MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=my-dG4B9BbsQ7kNvwEZFSNj&_nc_oc=AdmQjNkLeFFItzDhmaxhqROLWm8rbinK1o72E1n-47ZSJWsZCdhpSRnyJU7qS8zbO5tqAlurFzWKlCPsb_Kp2Emw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=-1&_nc_ht=instagram.fcgh10-1.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_Afy2YzlYsTIuMW638zEAEMcZt2QF1CKn8vltfyqvuh0J4Q&oe=69BD355E',
    4  => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/649234508_2467415640360105_6558069606199305629_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=105&ig_cache_key=Mzg1MDcwNTEyMjk0NzU2NzcxMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=IGXtPJpKknkQ7kNvwFNOo56&_nc_oc=AdkwHol4oemcxsye6RdE9RJufM-_EoS_-KPpl1M1YrsLkhVeVQcd3ZHIP6bUWAMCGd_UOguj47r8g9IgdCT-1YO5&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_Afw9k6hpALE1EvsKJ-lRNzSsgCABF1mrBGg8gQ1Q7uxQ4Q&oe=69BD29CB',
    5  => 'https://instagram.fcgh10-1.fna.fbcdn.net/v/t51.71878-15/649227293_1547947452935708_9187172777290376684_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=108&ig_cache_key=Mzg0ODAyNTA4Nzk4MzU5MzI2Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=FhAWJlIC7tQQ7kNvwEulmau&_nc_oc=AdmpC3FlEN9-SO1mT4FhX9YTAHfxlqmxC_PKnhHTSL8mR1SHvAXEWa35xx9cUcYYIzorwGNIVYY5piuwavHmqt9u&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=-1&_nc_ht=instagram.fcgh10-1.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfzOBKtIdeaW-mMCfHvbZFo7uWMmv4sIugDg-FMrwg7BFA&oe=69BD3CAA',
    6  => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/648286157_894683306798651_7458756273043742959_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ig_cache_key=Mzg0ODM2OTg0NzgxMDQ4MTQ4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=d2myQaqUlEYQ7kNvwHR02tq&_nc_oc=Adl0IVvA1LQP3pAhGHdknSJGsdqBV11TnAJwl9glhP6Md2R9DvPt0aTI98JrvP39WfB2OBfuEHqJ_iL-13Pi_cEJ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfzOekcYfZNzx77ussG_BiM0ZLErhBZNnAdlNtKfbsXv2g&oe=69BD2403',
    7  => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/648308791_1907183556574143_7761993315968231672_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=101&ig_cache_key=Mzg0Njg2NDcwODcwODQ0MDc3MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=0rmFdfq95osQ7kNvwGVq_Gq&_nc_oc=AdnBTx6foc0_rFTUa3wWIgMw88VpxJc0KiZVZjjNRSRvnAqTDzoau1uBezSgJhwEYSJ_8FUlLQ9ObWLhE-qbGCNu&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=-1&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfzvHRAvreZ-b1_BT1jVVWBjKiKicMjXJcXqs2tDo48kvA&oe=69BD1C61',
    8  => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/643623969_1206134174924510_5958347549615852746_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=103&ig_cache_key=Mzg0NjEyNzI3NzkyMzIwNTExNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=qx2l_vPpjlgQ7kNvwFyrKSm&_nc_oc=AdmRkTslnXFz2bBvJrXy83o6mljfCTtuPrBztNNKeTIhaq031gbnNH52QiUIomnD6Z7UDmv4Pk1rMBBJeyuRS6G6&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=-1&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfwljHTb3jO6mH2xyuHUyVukMSuDRUwP29dbj7Abv6E2hw&oe=69BD43CF',
    9  => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/641834961_1442984207291903_1591742604738131990_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=106&ig_cache_key=Mzg0NTc4NTUxODczNTE5NzMxNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=vvXeSEwP8REQ7kNvwFzITE6&_nc_oc=Adm2jTBuCmdVPUMbjnLtUEamXmZQhyZj0H3fggTx66l9f2fH5FN6yLmCQlb2mbi3ES0LPpQ34JSN2DkOLwuDdfmw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&se=-1&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfzijX_k3rOnbLmBfna83k0bJUh6K1Ol-CuEeolvm8PupQ&oe=69BD470A',
    10 => 'https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.71878-15/640817291_1242758487446643_2659128142409034690_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=103&ig_cache_key=Mzg0NTU4NTMyMDUzNzA1OTYwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=Sv3np2O2ujIQ7kNvwFeOqOn&_nc_oc=AdmgFuNdw1KLqBclJcCMfnaYFcUx_njI6mpKmunBYNNed01CoEbYT8ka_ozwoldLzYDZL6Oa1ssoKqXQ8jR0Nsd9&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgh10-2.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_Afx0OWEL-W6MVm3-Um1LobA5Bo4TKTWQqFP-jHiBGCKphA&oe=69BD1C74',
    11 => 'https://instagram.fcgh10-1.fna.fbcdn.net/v/t51.71878-15/641243075_1844816822901867_2798075928590844678_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ig_cache_key=Mzg0MTkwODg4Mzg5NjQ3NjM4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=JTFyghUJqPIQ7kNvwEUIJZI&_nc_oc=AdlHU0Ww0cimTZXrDA8tMy_tVjykmkBYhIEtVHPg1kasSrAYSHTdLkzvsTbHJc854AfY5Beq6kxFra6Lz0n8aiQJ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgh10-1.fna&_nc_gid=aGukUB7zJKDZ6xRnOGR7RA&_nc_ss=8&oh=00_AfxwwmnmotUNmYw6knj9eUG0xZ7tID_i2oZp479OuRR63w&oe=69BD478C',
    12 => 'https://instagram.fcgh10-1.fna.fbcdn.net/v/t51.71878-15/640300209_1251253290350863_2094654985183437124_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=110&ig_cache_key=Mzg0MTgyMzcxOTk2MjgxOTc5Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=ueQUXTZqz-oQ7kNvwHKyQk2&_nc_oc=AdnTnRNywPmAsIJjSufe-Fny1_qEC1hvHr4pvJFIu7FsypCpqn0SN0uZeDPCe71rhotnIavrWftKt65Zn-8rPqrp&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcgh10-1.fna&_nc_gid=8ENHq6cUdAlM8Vn4xlJLhg&_nc_ss=8&oh=00_AfzDmmWamAuWBIbTyD8CFQiy7xkGlCcCdORyAgXSSAkxlA&oe=69BD3564',
];

$results = [];

function download_and_attach( $url, $post_id, $filename ) {
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';

    $tmp = download_url( $url );
    if ( is_wp_error($tmp) ) return '❌ Download falhou: ' . $tmp->get_error_message();

    $file_array = [
        'name'     => $filename . '.jpg',
        'tmp_name' => $tmp,
        'type'     => 'image/jpeg',
        'error'    => 0,
        'size'     => filesize($tmp),
    ];

    $attachment_id = media_handle_sideload( $file_array, $post_id );
    @unlink($tmp);

    if ( is_wp_error($attachment_id) ) return '❌ Upload falhou: ' . $attachment_id->get_error_message();
    return $attachment_id;
}

if ( isset($_GET['run']) ) {
    $posts = get_posts(['post_type' => 'impressao_3d', 'posts_per_page' => -1, 'post_status' => 'publish']);

    if ( empty($posts) ) {
        $results[] = '❌ Nenhum post encontrado.';
    } else {
        // Indexar posts por ordem
        $posts_by_ordem = [];
        foreach ( $posts as $post ) {
            $ordem = (int) get_field('ordem', $post->ID);
            $posts_by_ordem[$ordem] = $post;
        }

        foreach ( $thumbnails as $ordem => $url ) {
            if ( ! isset($posts_by_ordem[$ordem]) ) {
                $results[] = "⚠️ Post com ordem $ordem não encontrado.";
                continue;
            }

            $post    = $posts_by_ordem[$ordem];
            $titulo  = get_field('titulo_pt', $post->ID) ?: "projeto-3d-$ordem";
            $slug    = sanitize_title($titulo);

            $attachment_id = download_and_attach($url, $post->ID, "3d-$ordem-$slug");

            if ( ! is_int($attachment_id) ) {
                $results[] = "[$ordem] $attachment_id";
                continue;
            }

            // ACF image field espera array com 'ID'
            update_field('thumbnail', $attachment_id, $post->ID);
            $results[] = "✅ [$ordem] {$titulo} → thumbnail id $attachment_id";
        }
        $results[] = '<br>🎉 Concluído! Todos os 12 projetos foram processados.';
    }
}
?>
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Atualizar Thumbnails 3D</title>
<style>body{font-family:monospace;max-width:900px;margin:40px auto;padding:20px;background:#f1f1f1}
.btn{display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:4px;cursor:pointer;border:0}
.result{background:#fff;padding:16px;border-radius:4px;margin-top:16px;line-height:2}a{color:#0066cc}</style></head><body>
<h1>🖼️ Atualizar Thumbnails dos Projetos 3D</h1>
<p>Baixa as 12 imagens do Instagram e associa ao campo <code>thumbnail</code> de cada post (pela ordem).</p>
<?php if ( !isset($_GET['run']) ): ?>
<a href="?run=1" class="btn">⚡ Baixar e associar thumbnails</a>
<?php endif; ?>
<?php if ($results): ?>
<div class="result">
<?php foreach($results as $r) echo $r . '<br>'; ?>
<br>⚠️ <strong>Delete este arquivo após usar!</strong>
</div>
<?php endif; ?>
</body></html>
