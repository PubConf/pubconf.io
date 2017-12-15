$(document).ready(function(){

	"use strict";

	/* =================================
	LOADER
	=================================== */
	$(".loader").delay(400).fadeOut();
    $(".animationload").delay(400).fadeOut("fast");


	/* =================================
	SCROLLSPY
	=================================== */
	$('body').scrollspy({ target: '#navbar-example' });


	/* =================================
	STIKY NAVBAR
	=================================== */
	jQuery(window).scroll(function () {
	  var top = jQuery(document).scrollTop();
		var batas = $('.section').eq(1).offset().top;

	  if (top > batas) {
		jQuery('.navbar-main').addClass('stiky');
	  } else {
	   jQuery('.navbar-main').removeClass('stiky');
	  }
	});


	/* =================================
	SCROLL TO
	=================================== */
	var htmlbody = $('html,body');

	var button = $('.navbar-nav li a'),
		buy = $('.event-right a');

	button.on('click', function(e){
        var dataslide = $(this).attr('href');
		goToByScroll(dataslide);
    });

	buy.on('click', function(e){
        var dataslide = $(this).attr('href');
		goToByScroll(dataslide);
    });

	function goToByScroll(mc) {
		htmlbody = $('html,body');
		htmlbody.animate({
			scrollTop: $( mc ).offset().top
		}, 1000);
	}


	/* =================================
	MAGNIFIC POPUP
	=================================== */

	$('.popup-gallery').magnificPopup({
	  delegate: 'a',
	  type: 'image',
	  tLoading: 'Loading image #%curr%...',
	  mainClass: 'mfp-img-mobile',
	  gallery: {
		enabled: true,
		navigateByImgClick: true,
		preload: [0,1]
	  },
	  image: {
		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		titleSrc: function(item) {
		  return item.el.attr('title') + '';
		}
	  }
	});



	/* =================================
	OWL
	=================================== */
	var owl = $("#owl-comedian");
	owl.owlCarousel({
		autoPlay: 10000,
		items : 2,
		itemsDesktop : [1199,2],
		itemsMobile : [479,1],
		singleItem : false,
	});














});
