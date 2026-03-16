<?php
/**
 * Plugin Name: JoeKyy Auto Deploy
 * Description: Dispara rebuild automático do site via GitHub Actions quando conteúdo é salvo no WordPress.
 * Version: 1.0
 * Author: JoeKyy
 *
 * Instruções:
 * 1. Copie este arquivo para wp-content/mu-plugins/joekyy-auto-deploy.php
 * 2. No wp-config.php, adicione:
 *    define('JOEKYY_GITHUB_TOKEN', 'ghp_seuTokenAqui');
 *
 * O token precisa da permissão "repo" (ou fine-grained: Actions write).
 * Gere em: https://github.com/settings/tokens
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// CPTs que disparam o rebuild
define( 'JOEKYY_DEPLOY_POST_TYPES', [
    'projeto',
    'cliente',
    'habilidade',
    'config_site',
    'projeto_3d',
] );

define( 'JOEKYY_GITHUB_REPO', 'JoeKyy/joekyy.com.br' );

/**
 * Dispara o GitHub Actions workflow via repository_dispatch
 */
function joekyy_trigger_deploy( $post_id, $post ) {
    // Ignorar revisões e autosaves
    if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
        return;
    }

    // Só dispara para os CPTs configurados
    if ( ! in_array( $post->post_type, JOEKYY_DEPLOY_POST_TYPES, true ) ) {
        return;
    }

    // Só dispara quando publicado
    if ( $post->post_status !== 'publish' ) {
        return;
    }

    $token = defined( 'JOEKYY_GITHUB_TOKEN' ) ? JOEKYY_GITHUB_TOKEN : '';
    if ( empty( $token ) ) {
        error_log( '[JoeKyy Deploy] JOEKYY_GITHUB_TOKEN não definido no wp-config.php' );
        return;
    }

    // Debounce: evita múltiplos dispatches em sequência (1 min)
    $transient_key = 'joekyy_deploy_cooldown';
    if ( get_transient( $transient_key ) ) {
        return;
    }
    set_transient( $transient_key, true, 60 );

    $url = sprintf(
        'https://api.github.com/repos/%s/dispatches',
        JOEKYY_GITHUB_REPO
    );

    $response = wp_remote_post( $url, [
        'headers' => [
            'Authorization' => 'Bearer ' . $token,
            'Accept'        => 'application/vnd.github+json',
            'Content-Type'  => 'application/json',
        ],
        'body'    => wp_json_encode( [
            'event_type'     => 'wordpress_content_updated',
            'client_payload' => [
                'post_type' => $post->post_type,
                'post_id'   => $post_id,
                'timestamp' => current_time( 'c' ),
            ],
        ] ),
        'timeout' => 10,
    ] );

    if ( is_wp_error( $response ) ) {
        error_log( '[JoeKyy Deploy] Erro: ' . $response->get_error_message() );
    } else {
        $code = wp_remote_retrieve_response_code( $response );
        if ( $code === 204 ) {
            error_log( '[JoeKyy Deploy] ✅ Rebuild disparado com sucesso!' );
        } else {
            error_log( '[JoeKyy Deploy] ⚠️ GitHub retornou HTTP ' . $code );
        }
    }
}

add_action( 'save_post', 'joekyy_trigger_deploy', 20, 2 );

/**
 * Mostra aviso no admin se o token não está configurado
 */
function joekyy_deploy_admin_notice() {
    if ( ! defined( 'JOEKYY_GITHUB_TOKEN' ) || empty( JOEKYY_GITHUB_TOKEN ) ) {
        echo '<div class="notice notice-warning"><p>';
        echo '<strong>JoeKyy Auto Deploy:</strong> Token do GitHub não configurado. ';
        echo 'Adicione <code>define(\'JOEKYY_GITHUB_TOKEN\', \'ghp_...\');</code> no wp-config.php';
        echo '</p></div>';
    }
}

add_action( 'admin_notices', 'joekyy_deploy_admin_notice' );
