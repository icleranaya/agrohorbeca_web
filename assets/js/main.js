(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});
			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});

})(jQuery);

/* valores slider/carousel */
var valoresSwiper = new Swiper ('.main-slider', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	slidesPerView:'auto',
	// If we need pagination
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true
	},
	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	}
});

/* about slider/carousel */
var aboutSwiper = new Swiper ('.about-slider', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	slidesPerView:'auto',
	simulateTouch: false,
	speed: 700,
	touchRatio: 0,

	breakpoints: {
		736: {
			simulateTouch: true,
			touchRatio: 1,
		  	direction: "horizontal"
		}
	},
	// If we need pagination
	pagination: {
		el: '.about-slider .swiper-pagination',
		clickable: false
	},
	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-custom-next',
	  prevEl: '.swiper-button-custom-prev',
	}
});

/* about image slider/carousel */
var aboutImgSwiper = new Swiper ('.about-img-slider', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	slidesPerView:'auto',
	speed: 700,
	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-custom-next',
	  prevEl: '.swiper-button-custom-prev',
	}
});

/*nosotros panel functions */
$(".item-1").click(function(e) {
	e.preventDefault();
	$(".panel-item.active").removeClass("active");
	$(this).addClass("active");
	toggle(".text-1", "quote-active", ".quote-active");
  	toggle(".bg-who", "img-active", ".img-active");
});

$(".item-2").click(function(e) {
	e.preventDefault();
	$(".panel-item.active").removeClass("active");
	$(this).addClass("active");
	toggle(".text-2", "quote-active", ".quote-active");
  	toggle(".bg-principios", "img-active", ".img-active");
});

$(".item-3").click(function(e) {
	e.preventDefault();
	$(".panel-item.active").removeClass("active");
	$(this).addClass("active");
	toggle(".text-3", "quote-active", ".quote-active");
  	toggle(".bg-productos", "img-active", ".img-active");
});

function toggle(e, e2, e3) {
	if (!$(e).hasClass(e2)) {
		$(e3).removeClass(e2);
		$(e).addClass(e2);
	}
}