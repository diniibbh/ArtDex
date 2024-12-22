(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	})

	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
		var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);

function openModal() {

	var myModal = new bootstrap.Modal(document.getElementById('imageModal'))
	myModal.show()
}

const toggleSwitch = document.querySelector('.switch__input');

function switchTheme(e) {
	if (!(e.target.checked)) {
		console.log(" not Checked")
		document.body.classList.add('dark-mode');
	} else {
		console.log(" Checked")

		document.body.classList.remove('dark-mode');
	}
}

toggleSwitch.addEventListener('change', switchTheme);


$(document).ready(function () {
	$('#navbarDefault').on('show.bs.collapse', function () {
		console.log('Navbar is expanding');
	});

	$('#navbarDefault').on('hide.bs.collapse', function () {
		console.log('Navbar is collapsing');
	});
});


$(window).on('load', function () {
	initSmoothScrolling('.block', 'smoothscroll');
});

function initSmoothScrolling(container, logoAnimation) {

	var sliderWidth = 0;
	var animationWidth = 0;
	var sliderHeight = $('>div>div:first-of-type', container).outerHeight(false);

	$('>div>div', container).each(function () {
		animationWidth += $(this).outerWidth(false);
	});

	var slidesVisible = $(container).width() / $('>div>div:first-of-type', container).outerWidth(false);
	slidesVisible = Math.ceil(slidesVisible);

	var slidesNumber = $('>div>div', container).length;
	var speed = slidesNumber * 2;

	$('>div>div', container).slice(0, slidesVisible).clone().appendTo($('>div', container));

	$('>div>div', container).each(function () {
		sliderWidth += $(this).outerWidth(false);
	});

	$('>div', container).css({ 'width': sliderWidth, 'height': sliderHeight });

	$("<style type='text/css'>@keyframes " + animation + " { 0% { margin-left: 0px; } 100% { margin-left: -" + animationWidth + "px; } } " + $('>div>div:first-of-type', container).selector + " { -webkit-animation: " + animation + " " + speed + "s linear infinite; -moz-animation: " + animation + " " + speed + "s linear infinite; -ms-animation: " + animation + " " + speed + "s linear infinite; -o-animation: " + animation + " " + speed + "s linear infinite; animation: " + animation + " " + speed + "s linear infinite; }</style>").appendTo("head");

	var cl = $(container).attr("class");
	$(container).removeClass(cl).animate({ 'nothing': null }, 1, function () {
		$(this).addClass(cl);
	});
}
// Function to check if an element is in the viewport
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
	  rect.top >= 0 &&
	  rect.left >= 0 &&
	  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	  rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
  }
  
  // Function to animate the progress bars
  function animateProgressBars() {
	const progressBars = document.querySelectorAll('.progress-bar');
	progressBars.forEach(bar => {
	  if (isInViewport(bar)) {
		const percentage = bar.getAttribute('data-percentage');
		bar.style.width = percentage + '%';
	  }
	});
  }
  
  // Add a scroll event listener to animate bars when they come into view
  window.addEventListener('scroll', animateProgressBars);
  
  // Trigger animation when the page is loaded
  window.addEventListener('load', animateProgressBars);
  
