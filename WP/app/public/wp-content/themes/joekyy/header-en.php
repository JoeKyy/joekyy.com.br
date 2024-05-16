<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php joekyy_schema_type(); ?>>
    <head>
		<title>JoeKyy - IT and WEB Solutions | Jhomar Nando Portfolio | Front-end Developer & Designer</title>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="description" content="My name is Jhomar Nando, but you can call me Joe. I am a Front-end developer with over 15 years of experience in application development, known for meeting deadlines, time management, accurate research, and effectiveness in problem-solving solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

		<!-- Facebook Card data -->
		<meta property="og:title" content="JoeKyy - IT and WEB Solutions | Jhomar Nando Portfolio | Front-end Developer & Designer">
		<meta property="og:site_name" content="JoeKyy - IT and WEB Solutions">
		<meta property="og:description" content="My name is Jhomar Nando, but you can call me Joe. I am a Front-end developer with over 15 years of experience in application development, known for meeting deadlines, time management, accurate research, and effectiveness in problem-solving solutions.">
		<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/img-social-en-us.png">

		<!-- Twitter Card data -->
		<meta name="twitter:card" content="summary_large_image"/>
		<meta name="twitter:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/img-social-en-us.png">
		<meta name="twitter:card" content="JoeKyy - IT and WEB Solutions | Jhomar Nando Portfolio | Front-end Developer & Designer">
		<meta name="twitter:site" content="https://joekyy.com.br/">
		<meta name="twitter:title" content="JoeKyy - IT and WEB Solutions">
		<meta name="twitter:description" content="My name is Jhomar Nando, but you can call me Joe. I am a Front-end developer with over 15 years of experience in application development, known for meeting deadlines, time management, accurate research, and effectiveness in problem-solving solutions.">
		<meta name="twitter:creator" content="@JoeKyy">

		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="apple-touch-icon" sizes="57x57" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-57x57.png" />
		<link rel="apple-touch-icon" sizes="60x60" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-60x60.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-72x72.png" />
		<link rel="apple-touch-icon" sizes="76x76" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-76x76.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-114x114.png" />
		<link rel="apple-touch-icon" sizes="120x120" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-120x120.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-144x144.png" />
		<link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-152x152.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-180x180.png" />
		<link rel="icon" type="image/png" sizes="192x192" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/android-icon-192x192.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="96x96" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/favicon-96x96.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/favicon-16x16.png" />
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/apple-icon-144x144.png" />
		<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon/en-us/manifest.json" />
		<meta name="theme-color" content="#ffffff" />
		<meta name="msapplication-TileColor" content="#ffffff" />
		<link rel="preconnect" href="https://fonts.gstatic.com">
    	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
		<link href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" rel="stylesheet" type="text/css" />
		<link href="https://cdn.jsdelivr.net/npm/hamburgers@1.1.3/dist/hamburgers.css" rel="stylesheet" />

		<link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" type="text/css" />

		<?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <?php wp_body_open(); ?>
		<header>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-10 col-xl-12">
						<?php if (is_front_page() || is_home() || is_front_page() && is_home()) : ?>
							<h1 class="logo--en-us">
								<a href="<?php echo esc_url(home_url('/')); ?>"
									title="<?php echo esc_html(get_bloginfo('name')); ?>" rel="home">
									<?php echo esc_html(get_bloginfo('name')); ?>
								</a>
							</h1>
						<?php else: ?>
							<h6 class="logo--en-us">
								<a href="<?php echo esc_url(home_url('/')); ?>"
									title="<?php echo esc_html(get_bloginfo('name')); ?>" rel="home">
									<?php echo esc_html(get_bloginfo('name')); ?>
								</a>
							</h6>
						<?php endif; ?>
                    </div>
                    <div class="col-2 col-xl-12">
						<button class="nav-button hamburger hamburger--squeeze" type="button">
							<span class="hamburger-box">
								<span class="hamburger-inner"></span>
							</span>
						</button>
						<nav>
							<?php
								wp_nav_menu(
									array(
										'theme_location' =>
											'main-menu',
										'container' => 'ul',
										'depth' => 2
									)
								);
							?>
						</nav>
                    </div>
                </div>
            </div>
        </header>
        <main>