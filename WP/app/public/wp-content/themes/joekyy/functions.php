<?php

// ============================================================
// CPTs — Custom Post Types para headless (WPGraphQL)
// ============================================================

add_action('init', 'joekyy_register_post_types');
function joekyy_register_post_types() {

    // Projeto (portfólio)
    register_post_type('projeto', [
        'labels'                => [
            'name'          => 'Projetos',
            'singular_name' => 'Projeto',
            'add_new_item'  => 'Adicionar Projeto',
            'edit_item'     => 'Editar Projeto',
        ],
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'supports'              => ['title', 'thumbnail'],
        'menu_icon'             => 'dashicons-portfolio',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'projeto',
        'graphql_plural_name'   => 'projetos',
    ]);

    // Cliente
    register_post_type('cliente', [
        'labels'                => [
            'name'          => 'Clientes',
            'singular_name' => 'Cliente',
            'add_new_item'  => 'Adicionar Cliente',
            'edit_item'     => 'Editar Cliente',
        ],
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'supports'              => ['title'],
        'menu_icon'             => 'dashicons-groups',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'cliente',
        'graphql_plural_name'   => 'clientes',
    ]);

    // Habilidade
    register_post_type('habilidade', [
        'labels'                => [
            'name'          => 'Habilidades',
            'singular_name' => 'Habilidade',
            'add_new_item'  => 'Adicionar Habilidade',
            'edit_item'     => 'Editar Habilidade',
        ],
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'supports'              => ['title'],
        'menu_icon'             => 'dashicons-admin-tools',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'habilidade',
        'graphql_plural_name'   => 'habilidades',
    ]);

    // Config Site (singleton — um único post)
    register_post_type('config_site', [
        'labels'                => [
            'name'          => 'Configurações do Site',
            'singular_name' => 'Configuração do Site',
        ],
        'public'                => false,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_rest'          => true,
        'supports'              => ['title'],
        'menu_icon'             => 'dashicons-admin-settings',
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'configSite',
        'graphql_plural_name'   => 'configSites',
    ]);
}

// ============================================================
// CORS — permite requests do Next.js local e produção
// ============================================================

add_action('graphql_response_headers_to_send', 'joekyy_graphql_cors_headers');
function joekyy_graphql_cors_headers($headers) {
    $allowed_origins = [
        'http://localhost:3000',
        'https://joekyy.com.br',
        'https://dev.joekyy.com.br',
    ];
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    if (in_array($origin, $allowed_origins)) {
        $headers['Access-Control-Allow-Origin']  = $origin;
        $headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
        $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    }
    return $headers;
}

// ============================================================
// ACF — Configurações do Site registradas via PHP (imutável pelo admin)
// Registrar via código evita que o ACF sobrescreva as configs ao salvar
// ============================================================

add_action('acf/init', 'joekyy_register_config_site_fields');
function joekyy_register_config_site_fields() {
    if ( ! function_exists('acf_add_local_field_group') ) return;

    // Accordion: abre/fecha cada seção — tudo no mesmo metabox, sem problema de separação
    $acc_open  = ['type' => 'accordion', 'open' => 1, 'multi_expand' => 1, 'endpoint' => 0, 'show_in_graphql' => 0];
    $acc_close = ['type' => 'accordion', 'open' => 0, 'multi_expand' => 1, 'endpoint' => 1, 'show_in_graphql' => 0];

    acf_add_local_field_group([
        'key'              => 'group_config_site',
        'title'            => 'Configurações do Site',
        'graphql_field_name' => 'configDoSite',
        'position'         => 'normal',
        'style'            => 'default',
        'label_placement'  => 'top',
        'active'           => true,
        'location'         => [[ ['param' => 'post_type', 'operator' => '==', 'value' => 'config_site'] ]],
        'fields' => [
            // ── Hero ──────────────────────────────────────────────
            array_merge($acc_open,  ['key' => 'acc_hero',  'name' => 'acc_hero',  'label' => '🏠 Hero']),
            ['key'=>'field_config_hero_html_pt',      'name'=>'hero_html_pt',      'label'=>'Texto HTML (PT-BR)', 'type'=>'textarea','rows'=>4,'show_in_graphql'=>1,
             'instructions'=>'HTML: <strong>, <br />. Ex: <strong>Olá!</strong><br />Eu sou o<br /><strong>Joe</strong>'],
            ['key'=>'field_config_hero_html_en',      'name'=>'hero_html_en',      'label'=>'Texto HTML (EN-US)', 'type'=>'textarea','rows'=>4,'show_in_graphql'=>1],
            ['key'=>'field_config_hero_alt_pt',       'name'=>'hero_avatar_alt_pt','label'=>'Alt do Avatar (PT-BR)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_hero_alt_en',       'name'=>'hero_avatar_alt_en','label'=>'Alt do Avatar (EN-US)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_avatar',            'name'=>'avatar',            'label'=>'Avatar','type'=>'image','return_format'=>'url','show_in_graphql'=>1],
            array_merge($acc_close, ['key' => 'acc_hero_end', 'name' => 'acc_hero_end', 'label' => 'Hero End']),

            // ── Sobre ─────────────────────────────────────────────
            array_merge($acc_open,  ['key' => 'acc_about', 'name' => 'acc_about', 'label' => '👤 Sobre']),
            ['key'=>'field_config_about_bio1_pt','name'=>'about_bio1_pt','label'=>'Bio 1 (PT-BR)','type'=>'textarea','rows'=>4,'show_in_graphql'=>1,
             'instructions'=>'HTML: <span> para destacar. Ex: Meu nome é <span>Joe</span>.'],
            ['key'=>'field_config_about_bio1_en','name'=>'about_bio1_en','label'=>'Bio 1 (EN-US)','type'=>'textarea','rows'=>4,'show_in_graphql'=>1],
            ['key'=>'field_config_about_bio2_pt','name'=>'about_bio2_pt','label'=>'Bio 2 (PT-BR)','type'=>'textarea','rows'=>4,'show_in_graphql'=>1],
            ['key'=>'field_config_about_bio2_en','name'=>'about_bio2_en','label'=>'Bio 2 (EN-US)','type'=>'textarea','rows'=>4,'show_in_graphql'=>1],
            ['key'=>'field_config_cv_pt','name'=>'curriculo_pt_url','label'=>'URL Currículo (PT-BR)','type'=>'url','show_in_graphql'=>1],
            ['key'=>'field_config_cv_en','name'=>'curriculo_en_url','label'=>'URL Currículo (EN-US)','type'=>'url','show_in_graphql'=>1],
            array_merge($acc_close, ['key' => 'acc_about_end', 'name' => 'acc_about_end', 'label' => 'Sobre End']),

            // ── Portfólio ─────────────────────────────────────────
            array_merge($acc_open,  ['key' => 'acc_portfolio', 'name' => 'acc_portfolio', 'label' => '💼 Portfólio']),
            ['key'=>'field_config_portfolio_heading_pt','name'=>'portfolio_heading_pt','label'=>'Título (PT-BR)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_portfolio_heading_en','name'=>'portfolio_heading_en','label'=>'Título (EN-US)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_portfolio_intro_pt',  'name'=>'portfolio_intro_pt',  'label'=>'Introdução (PT-BR)','type'=>'textarea','rows'=>3,'show_in_graphql'=>1],
            ['key'=>'field_config_portfolio_intro_en',  'name'=>'portfolio_intro_en',  'label'=>'Introdução (EN-US)','type'=>'textarea','rows'=>3,'show_in_graphql'=>1],
            ['key'=>'field_config_portfolio_cta_pt',    'name'=>'portfolio_cta_pt',    'label'=>'CTA (PT-BR)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_portfolio_cta_en',    'name'=>'portfolio_cta_en',    'label'=>'CTA (EN-US)','type'=>'text','show_in_graphql'=>1],
            array_merge($acc_close, ['key' => 'acc_portfolio_end', 'name' => 'acc_portfolio_end', 'label' => 'Portfolio End']),

            // ── Clientes ──────────────────────────────────────────
            array_merge($acc_open,  ['key' => 'acc_clients', 'name' => 'acc_clients', 'label' => '🤝 Clientes']),
            ['key'=>'field_config_clients_heading_pt','name'=>'clients_heading_pt','label'=>'Título (PT-BR)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_clients_heading_en','name'=>'clients_heading_en','label'=>'Título (EN-US)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_clients_desc_pt',   'name'=>'clients_description_pt','label'=>'Descrição (PT-BR)','type'=>'textarea','rows'=>3,'show_in_graphql'=>1],
            ['key'=>'field_config_clients_desc_en',   'name'=>'clients_description_en','label'=>'Descrição (EN-US)','type'=>'textarea','rows'=>3,'show_in_graphql'=>1],
            array_merge($acc_close, ['key' => 'acc_clients_end', 'name' => 'acc_clients_end', 'label' => 'Clients End']),

            // ── Contato ───────────────────────────────────────────
            array_merge($acc_open,  ['key' => 'acc_contact', 'name' => 'acc_contact', 'label' => '📬 Contato']),
            ['key'=>'field_config_contact_heading_pt','name'=>'contact_heading_pt','label'=>'Título (PT-BR)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_contact_heading_en','name'=>'contact_heading_en','label'=>'Título (EN-US)','type'=>'text','show_in_graphql'=>1],
            ['key'=>'field_config_contact_msg_pt',    'name'=>'contact_message_pt','label'=>'Mensagem (PT-BR)','type'=>'textarea','rows'=>3,'show_in_graphql'=>1],
            ['key'=>'field_config_contact_msg_en',    'name'=>'contact_message_en','label'=>'Mensagem (EN-US)','type'=>'textarea','rows'=>3,'show_in_graphql'=>1],
            ['key'=>'field_config_email_pt',  'name'=>'email_pt',  'label'=>'E-mail (PT-BR)','type'=>'email','show_in_graphql'=>1],
            ['key'=>'field_config_email_en',  'name'=>'email_en',  'label'=>'E-mail (EN-US)','type'=>'email','show_in_graphql'=>1],
            ['key'=>'field_config_whatsapp',  'name'=>'whatsapp_url',  'label'=>'WhatsApp URL','type'=>'url','show_in_graphql'=>1],
            ['key'=>'field_config_linkedin',  'name'=>'linkedin_url',  'label'=>'LinkedIn URL','type'=>'url','show_in_graphql'=>1],
            ['key'=>'field_config_github',    'name'=>'github_url',    'label'=>'GitHub URL','type'=>'url','show_in_graphql'=>1],
            array_merge($acc_close, ['key' => 'acc_contact_end', 'name' => 'acc_contact_end', 'label' => 'Contato End']),
        ],
    ]);
}

// ============================================================
// Basic Auth para REST API — APENAS em ambiente local/dev
// Permite que scripts de migração usem usuário e senha diretamente
// ============================================================

if ( in_array( wp_get_environment_type(), [ 'local', 'development' ] ) ) {
    add_filter( 'rest_authentication_errors', 'joekyy_rest_basic_auth' );
    function joekyy_rest_basic_auth( $result ) {
        if ( ! empty( $result ) ) return $result;
        if ( is_user_logged_in() ) return $result;

        // PHP_AUTH_USER (mod_php) ou HTTP_AUTHORIZATION (CGI/FastCGI)
        $user_login = $_SERVER['PHP_AUTH_USER'] ?? null;
        $user_pass  = $_SERVER['PHP_AUTH_PW'] ?? null;

        if ( ! $user_login ) {
            $auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
            if ( str_starts_with( $auth_header, 'Basic ' ) ) {
                $decoded = base64_decode( substr( $auth_header, 6 ) );
                [ $user_login, $user_pass ] = array_pad( explode( ':', $decoded, 2 ), 2, '' );
            }
        }

        if ( $user_login ) {
            $user = wp_authenticate( $user_login, $user_pass );
            if ( ! is_wp_error( $user ) ) {
                wp_set_current_user( $user->ID );
                return true;
            }
        }
        return $result;
    }
}

// ============================================================
// Theme setup
// ============================================================

add_action("after_setup_theme", "joekyy_setup");
function joekyy_setup()
{
    load_theme_textdomain(
        "joekyy",
        get_template_directory() . "/languages"
    );
    add_theme_support("title-tag");
    add_theme_support("post-thumbnails");
    add_theme_support("responsive-embeds");
    add_theme_support("automatic-feed-links");
    add_theme_support("html5", ["search-form", "navigation-widgets"]);
    add_theme_support("woocommerce");
    global $content_width;
    if (!isset($content_width)) {
        $content_width = 1920;
    }
    register_nav_menus([
        "main-menu" => esc_html__("Menu Principal", "joekyy"),
    ]);
}
add_action("admin_notices", "joekyy_notice");
function joekyy_notice()
{
    $user_id = get_current_user_id();
    $admin_url =
        (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] === "on"
            ? "https"
            : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $param = count($_GET) ? "&" : "?";
    if (
        !get_user_meta($user_id, "joekyy_notice_dismissed_10") &&
        current_user_can("manage_options")
    ) {
        echo '<div class="notice notice-info"><p><a href="' .
        esc_url($admin_url),
            esc_html($param) .
                'dismiss" class="alignright" style="text-decoration:none"><big>' .
                esc_html__("Ⓧ", "joekyy") .
                "</big></a>" .
                wp_kses_post(
                    __(
                        "<big><strong>🏆 Obrigado por usar joekyy!</strong></big>",
                        "joekyy"
                    )
                ) .
                "<p>" .
                esc_html__(
                    "Alimentando mais de 10 mil sites! Compre-me um sanduíche! 🥪",
                    "joekyy"
                ) .
                '</p><a href="https://github.com/bhadaway/joekyy/issues/57" class="button-primary" target="_blank"><strong>' .
                esc_html__(
                    "Como você usa joekyy?",
                    "joekyy"
                ) .
                '</strong></a> <a href="https://opencollective.com/joekyy" class="button-primary" style="background-color:green;border-color:green" target="_blank"><strong>' .
                esc_html__("Doar", "joekyy") .
                '</strong></a> <a href="https://wordpress.org/support/theme/joekyy/reviews/#new-post" class="button-primary" style="background-color:purple;border-color:purple" target="_blank"><strong>' .
                esc_html__("Revisão", "joekyy") .
                '</strong></a> <a href="https://github.com/bhadaway/joekyy/issues" class="button-primary" style="background-color:orange;border-color:orange" target="_blank"><strong>' .
                esc_html__("Suporte", "joekyy") .
                "</strong></a></p></div>";
    }
}
add_action("admin_init", "joekyy_notice_dismissed");
function joekyy_notice_dismissed()
{
    $user_id = get_current_user_id();
    if (isset($_GET["dismiss"])) {
        add_user_meta(
            $user_id,
            "joekyy_notice_dismissed_10",
            "true",
            true
        );
    }
}
add_action("wp_enqueue_scripts", "joekyy_enqueue");
function joekyy_enqueue()
{
    wp_enqueue_script("jquery");
}
add_action("wp_footer", "joekyy_footer");
function joekyy_footer()
{
    ?>
<script>
jQuery(document).ready(function($) {
var deviceAgent = navigator.userAgent.toLowerCase();
if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
$("html").addClass("ios");
$("html").addClass("mobile");
}
if (deviceAgent.match(/(Android)/)) {
$("html").addClass("android");
$("html").addClass("mobile");
}
if (navigator.userAgent.search("MSIE") >= 0) {
$("html").addClass("ie");
}
else if (navigator.userAgent.search("Chrome") >= 0) {
$("html").addClass("chrome");
}
else if (navigator.userAgent.search("Firefox") >= 0) {
$("html").addClass("firefox");
}
else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
$("html").addClass("safari");
}
else if (navigator.userAgent.search("Opera") >= 0) {
$("html").addClass("opera");
}
});
</script>
<?php
}
add_filter(
    "document_title_separator",
    "joekyy_document_title_separator"
);
function joekyy_document_title_separator($sep)
{
    $sep = esc_html("|");
    return $sep;
}
add_filter("the_title", "joekyy_title");
function joekyy_title($title)
{
    if ($title == "") {
        return esc_html("...");
    } else {
        return wp_kses_post($title);
    }
}
function joekyy_schema_type()
{
    $schema = "https://schema.org/";
    if (is_single()) {
        $type = "Article";
    } elseif (is_author()) {
        $type = "ProfilePage";
    } elseif (is_search()) {
        $type = "SearchResultsPage";
    } else {
        $type = "WebPage";
    }
    echo 'itemscope itemtype="' . esc_url($schema) . esc_attr($type) . '"';
}
add_filter("nav_menu_link_attributes", "joekyy_schema_url", 10);
function joekyy_schema_url($atts)
{
    $atts["itemprop"] = "url";
    return $atts;
}
if (!function_exists("joekyy_wp_body_open")) {
    function joekyy_wp_body_open()
    {
        do_action("wp_body_open");
    }
}
add_action("wp_body_open", "joekyy_skip_link", 5);
function joekyy_skip_link()
{
    echo '<a href="#content" class="skip-link screen-reader-text">' .
        esc_html__("Ir para o conteúdo", "joekyy") .
        "</a>";
}
add_filter("the_content_more_link", "joekyy_read_more_link");
function joekyy_read_more_link()
{
    if (!is_admin()) {
        return ' <a href="' .
            esc_url(get_permalink()) .
            '" class="more-link">' .
            sprintf(
                __("...%s", "joekyy"),
                '<span class="screen-reader-text">  ' .
                    esc_html(get_the_title()) .
                    "</span>"
            ) .
            "</a>";
    }
}
add_filter("excerpt_more", "joekyy_excerpt_read_more_link");
function joekyy_excerpt_read_more_link($more)
{
    if (!is_admin()) {
        global $post;
        return ' <a href="' .
            esc_url(get_permalink($post->ID)) .
            '" class="more-link">' .
            sprintf(
                __("...%s", "joekyy"),
                '<span class="screen-reader-text">  ' .
                    esc_html(get_the_title()) .
                    "</span>"
            ) .
            "</a>";
    }
}
add_filter("big_image_size_threshold", "__return_false");
add_filter(
    "intermediate_image_sizes_advanced",
    "joekyy_image_insert_override"
);
function joekyy_image_insert_override($sizes)
{
    unset($sizes["medium_large"]);
    unset($sizes["1536x1536"]);
    unset($sizes["2048x2048"]);
    return $sizes;
}
add_action("widgets_init", "joekyy_widgets_init");
function joekyy_widgets_init()
{
    register_sidebar([
        "name" => esc_html__("Área de Widget da Barra Lateral", "joekyy"),
        "id" => "primary-widget-area",
        "before_widget" => '<li id="%1$s" class="widget-container %2$s">',
        "after_widget" => "</li>",
        "before_title" => '<h3 class="widget-title">',
        "after_title" => "</h3>",
    ]);
}
add_action("wp_head", "joekyy_pingback_header");
function joekyy_pingback_header()
{
    if (is_singular() && pings_open()) {
        printf(
            '<link rel="pingback" href="%s">' . "\n",
            esc_url(get_bloginfo("pingback_url"))
        );
    }
}
add_action(
    "comment_form_before",
    "joekyy_enqueue_comment_reply_script"
);
function joekyy_enqueue_comment_reply_script()
{
    if (get_option("thread_comments")) {
        wp_enqueue_script("comment-reply");
    }
}
function joekyy_custom_pings($comment)
{
    ?>
<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo esc_url(comment_author_link()); ?></li>
<?php
}
add_filter("get_comments_number", "joekyy_comment_count", 0);
function joekyy_comment_count($count)
{
    if (!is_admin()) {
        global $id;
        $get_comments = get_comments("status=approve&post_id=" . $id);
        $comments_by_type = separate_comments($get_comments);
        return count($comments_by_type["comment"]);
    } else {
        return $count;
    }
}

function redirect_all_except_home_and_pages() {
    // Verifica se não é a página inicial, não é uma página, e não é a área de administração
    if (!is_front_page() && !is_page() && !is_admin()) {
        // Redireciona para a página inicial
        wp_redirect(home_url(), 301);
        exit;
    }
}
add_action('template_redirect', 'redirect_all_except_home_and_pages');


// Desativa suporte a comentários em todos os tipos de post
function disable_comments_support() {
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
    remove_post_type_support('attachment', 'comments');
    remove_post_type_support('custom_post_type', 'comments'); // Adicione suporte para outros tipos de post conforme necessário
}
add_action('admin_init', 'disable_comments_support');

// Redireciona qualquer usuário tentando acessar a página de comentários
function redirect_comment_link() {
    global $pagenow;
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url()); exit;
    }
}
add_action('admin_init', 'redirect_comment_link');

// Remove a seção de comentários do dashboard
function remove_comments_from_dashboard() {
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
}
add_action('admin_init', 'remove_comments_from_dashboard');

// ============================================================
// Admin UI — mostrar apenas o necessário para administrar o site
// ============================================================

// Remove itens do menu lateral desnecessários
add_action('admin_menu', 'joekyy_clean_admin_menu', 999);
function joekyy_clean_admin_menu() {
    remove_menu_page('index.php');              // Dashboard
    remove_menu_page('edit.php');              // Posts
    remove_menu_page('edit-comments.php');     // Comentários
    remove_menu_page('tools.php');             // Ferramentas
    remove_menu_page('edit.php?post_type=page'); // Páginas
}

// Remove widgets desnecessários do dashboard
add_action('wp_dashboard_setup', 'joekyy_clean_dashboard', 999);
function joekyy_clean_dashboard() {
    global $wp_meta_boxes;
    $wp_meta_boxes['dashboard'] = [];
}

// Redireciona o login direto para os Projetos (primeira coisa útil)
add_filter('login_redirect', 'joekyy_login_redirect', 10, 3);
function joekyy_login_redirect($redirect_to, $request, $user) {
    if ( isset($user->roles) && in_array('administrator', $user->roles) ) {
        return admin_url('edit.php?post_type=projeto');
    }
    return $redirect_to;
}

// Remove metaboxes desnecessárias das telas de edição dos CPTs
add_action('add_meta_boxes', 'joekyy_remove_metaboxes', 999);
function joekyy_remove_metaboxes() {
    $cpts = ['projeto', 'cliente', 'habilidade', 'config_site'];
    foreach ($cpts as $cpt) {
        remove_meta_box('slugdiv',         $cpt, 'normal'); // Slug
        remove_meta_box('authordiv',       $cpt, 'normal'); // Autor
        remove_meta_box('commentstatusdiv',$cpt, 'normal'); // Comentários
        remove_meta_box('commentsdiv',     $cpt, 'normal');
        remove_meta_box('trackbacksdiv',   $cpt, 'normal');
        remove_meta_box('revisionsdiv',    $cpt, 'normal'); // Revisões
        remove_meta_box('postcustom',      $cpt, 'normal'); // Campos customizados (raw)
        remove_meta_box('postexcerpt',     $cpt, 'normal'); // Resumo
        remove_meta_box('tagsdiv-post_tag',$cpt, 'side' );  // Tags padrão
        remove_meta_box('wpseo_meta',      $cpt, 'normal'); // Yoast SEO
    }
}

// Remove colunas desnecessárias nas listas dos CPTs
add_filter('manage_projeto_posts_columns',    'joekyy_projeto_columns');
add_filter('manage_cliente_posts_columns',    'joekyy_cliente_columns');
add_filter('manage_habilidade_posts_columns', 'joekyy_habilidade_columns');

function joekyy_projeto_columns($cols) {
    return [
        'cb'    => $cols['cb'],
        'title' => 'Projeto',
        'ordem' => 'Ordem',
        'tipo'  => 'Tipo',
        'date'  => 'Atualizado',
    ];
}
function joekyy_cliente_columns($cols) {
    return [
        'cb'    => $cols['cb'],
        'title' => 'Cliente',
        'ordem' => 'Ordem',
        'date'  => 'Atualizado',
    ];
}
function joekyy_habilidade_columns($cols) {
    return [
        'cb'        => $cols['cb'],
        'title'     => 'Habilidade',
        'categoria' => 'Categoria',
        'date'      => 'Atualizado',
    ];
}

// Preenche os valores das colunas customizadas
add_action('manage_projeto_posts_custom_column',    'joekyy_projeto_column_value', 10, 2);
add_action('manage_cliente_posts_custom_column',    'joekyy_cliente_column_value', 10, 2);
add_action('manage_habilidade_posts_custom_column', 'joekyy_habilidade_column_value', 10, 2);

function joekyy_projeto_column_value($col, $post_id) {
    if ($col === 'ordem') echo get_field('ordem', $post_id) ?: '—';
    if ($col === 'tipo') {
        $tipo = get_field('tipo', $post_id);
        echo $tipo ? ucfirst(implode(', ', (array)$tipo)) : '—';
    }
}
function joekyy_cliente_column_value($col, $post_id) {
    if ($col === 'ordem') echo get_field('ordem', $post_id) ?: '—';
}
function joekyy_habilidade_column_value($col, $post_id) {
    if ($col === 'categoria') {
        $cat = get_field('categoria', $post_id);
        $map = ['technical' => 'Técnica', 'professional' => 'Profissional'];
        $val = is_array($cat) ? $cat[0] : $cat;
        echo $map[$val] ?? '—';
    }
}

// Torna a coluna "Ordem" ordenável nos projetos e clientes
add_filter('manage_edit-projeto_sortable_columns',    'joekyy_sortable_ordem');
add_filter('manage_edit-cliente_sortable_columns',    'joekyy_sortable_ordem');
function joekyy_sortable_ordem($cols) {
    $cols['ordem'] = 'ordem';
    return $cols;
}

// Remove itens da barra superior (toolbar)
add_action('admin_bar_menu', 'joekyy_clean_toolbar', 999);
function joekyy_clean_toolbar($wp_admin_bar) {
    $wp_admin_bar->remove_node('wp-logo');
    $wp_admin_bar->remove_node('comments');
    $wp_admin_bar->remove_node('new-content');
}

// ============================================================
// CSS personalizado no admin — melhorar layout da edição
// ============================================================

add_action('admin_head', 'joekyy_admin_css');
function joekyy_admin_css() {
    ?>
    <style>
        /* Margem e espaçamento no formulário de edição dos CPTs */
        .post-type-config_site #poststuff,
        .post-type-projeto #poststuff,
        .post-type-cliente #poststuff,
        .post-type-habilidade #poststuff {
            padding-top: 20px;
        }
        .post-type-config_site #post-body,
        .post-type-projeto #post-body,
        .post-type-cliente #post-body,
        .post-type-habilidade #post-body {
            margin-top: 10px;
        }
        /* Abas ACF — garantir que fiquem todas juntas */
        .acf-tab-group {
            margin: 0 0 20px !important;
            padding: 0 !important;
            border-bottom: 2px solid #1d2327 !important;
        }
        .acf-tab-group li a {
            padding: 8px 16px !important;
            font-size: 13px !important;
        }
        .acf-tab-group li.active a {
            background: #1d2327 !important;
            color: #fff !important;
        }
        /* Espaçamento entre campos do formulário */
        .acf-field {
            padding: 12px 12px !important;
        }
    </style>
    <?php
}

?>
