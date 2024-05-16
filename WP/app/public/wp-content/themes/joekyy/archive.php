<?php get_header(); ?>
    <main>
        <section>
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-xl-12">
                        <h1 class="entry-title" itemprop="name"><?php the_archive_title(); ?></h1>
                        <p>
                            <?php
                                if ("" != get_the_archive_description()) {
                                    echo esc_html(get_the_archive_description());
                                }
                            ?>
                        </p>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-xl-12">
                        <?php
                            if (have_posts()):
                                while (have_posts()):
                                    the_post();
                                    get_template_part("entry");
                                endwhile;
                            endif;
                        ?>
                    </div>
                </div>
            </div>
        </section>
    </main>
<?php get_footer(); ?>
