
<section>
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col-xl-12">
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <div class="row mb-3">
                        <div class="col-xl-12">
                            <header>
                                <?php if ( is_singular() ) { echo '<h1 class="entry-title" itemprop="headline">'; } else { echo '<h2 class="entry-title">'; } ?>
                                <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" rel="bookmark"><?php the_title(); ?></a>
                                <?php if ( is_singular() ) { echo '</h1>'; } else { echo '</h2>'; } ?>
                                <?php edit_post_link(); ?>
                                <?php if ( !is_search() ) { get_template_part( 'entry', 'meta' ); } ?>
                            </header>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-12">
                            <?php get_template_part( 'entry', ( is_front_page() || is_home() || is_front_page() && is_home() || is_archive() || is_search() ? 'summary' : 'content' ) ); ?>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-xl-12">
                            <?php if ( is_singular() ) { get_template_part( 'entry-footer' ); } ?>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</section>