<?php
    /*
        Template Name: PTBR
    */
?>
<?php get_template_part( 'header', 'ptbr' ); ?>

    <?php

    $page_slugs = array(
        'ola',
        'sobre',
        'portifolio',
        'clientes',
        'contato'
    );

    $args = array(
        'post_type' => 'page',
        'post_name__in' => $page_slugs,
        'orderby' => 'post_name__in'
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) :
        while ($query->have_posts()) :
            $query->the_post();
    ?>
            <?php the_content(); ?>
    <?php
        endwhile;
        wp_reset_postdata();
    else :
        echo '<p>Nenhuma página encontrada.</p>';
    endif;
    ?>
<?php get_footer(); ?>
