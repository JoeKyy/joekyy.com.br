jQuery(document).ready(function($) {
    $('.nav-button').click(function(){
		if (!$(this).hasClass('is-active')) {
			$(this).addClass('is-active');
			$('.menu nav').addClass('nav-menu--open');
			$('.menu nav').removeClass('nav-menu--close');
		} else {
			$(this).removeClass('is-active');
			$('.menu nav').removeClass('nav-menu--open');
			$('.menu nav').addClass('nav-menu--close');
		}
	});

	$('header .menu nav ul li a').click(function(){
		if ($('.nav-button').hasClass('is-active')) {
			$('.nav-button').removeClass('is-active');
			$('.menu nav').removeClass('nav-menu--open');
			$('.menu nav').addClass('nav-menu--close');
		}
	});

    $('.tratamentos--slide > div').slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 1
				}
			}
		]
	});

    $('.procedimentos--slide > div').slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1
				}
			}
		]
	});

    $('.depoimentos--box > div').slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1
				}
			}
		]
	});

	$('.estrutura--slider > div').slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
});