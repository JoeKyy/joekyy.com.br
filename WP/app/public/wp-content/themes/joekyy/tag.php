<?php get_header(); ?>
<main>
    <section>
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-xl-12">
                    <h1 class="entry-title" itemprop="name"><?php single_term_title(); ?></h1>
                    <div class="archive-meta" itemprop="description"><?php if ( '' != get_the_archive_description() ) { echo esc_html( get_the_archive_description() ); } ?></div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-xl-12">
                    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                        <?php get_template_part( 'entry' ); ?>
                        <?php endwhile; endif; ?>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-xl-12">
                    <?php get_template_part( 'nav', 'below' ); ?>
                </div>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>
