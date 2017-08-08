// This document ready syntax supports use of the $ alias in $ no conflict mode. See README.md for more info and alternatives.
jQuery( document ).ready( function( $ ) {


/*******************************
Flex Content - Image Slider
********************************/

var slider = $('.slider-contain .slider').slick({
	accessibility:false,
	adaptiveHeight: true,
	arrows: true,
	autoplay: false,
	dots: false,
	fade: true,
	swipe: true,
	responsive: [
		{
			breakpoint: 990,
			settings: {
				dots: false,
				arrows: true
			}
		}
	]
}).on('swipe', function(event, slick, direction){
	$(window).scroll();
});


/*   needed for IE, flexbox   */

$('.slider-contain').each(function(){
	var sliderHeight = $(this).find(".slider").height();
	var tempheight = sliderHeight;
	$(this).find('.slick-slide').each(function(){
		tempheight = $(this).outerHeight();
		if(sliderHeight > tempheight){ tempheight = sliderHeight;}
		$(this).find(".slider-image, .slider-video").css("height",tempheight);
	});
});


/*   parallax videos   */

window.addEventListener("scroll", function(e) {
	$(".slider-video iframe").css("top",$(window).scrollTop()-0);
});

/*   move to next or previous slide based on arrow keyup event   */
$(document.documentElement).on('keyup',function(event) {
	var tempSliderSelector  = $('.slider-contain .slider:hover').first();
	if(tempSliderSelector.length){
		if (event.keyCode == 37) {
			tempSliderSelector.slick("slickPrev");
		} else if (event.keyCode == 39) {
			tempSliderSelector.slick("slickNext");
		}
	}
});


} ); // end no-conflict document ready
