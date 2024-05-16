<?php get_header(); ?>
    <main>
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-xl-12">
                    <h1 class="entry-title" itemprop="name">
                        <?php esc_html_e("Não Encontrado", "joekyy"); ?>
                    </h1>
                    <p>
                        <?php esc_html_e(
                            "Nada encontrado para a página solicitada. Que tal fazer uma busca?",
                            "joekyy"
                        ); ?>
                    </p>
                </div>
            </div>
        </div>
    </main>
<?php get_footer(); ?>
