$(document).ready(function () {
  /*=========================*/
  /*====main navigation hover dropdown====*/
  /*==========================*/
  $('.js-activated').dropdownHover({
    instantlyCloseOthers: false,
    delay: 0
  }).dropdown();

  /*=========================*/
  /*====flex main slider====*/
  /*==========================*/
  $('.slider-main,.testimonials').flexslider({
    slideshowSpeed: 3000,
    directionNav: false,
    animation: "fade"
  });

  /*=========================*/
  /*========portfolio mix====*/
  /*==========================*/
  $('#grid').mixitup();

  /*=========================*/
  /*========tooltip and popovers====*/
  /*==========================*/
  $("[data-toggle=popover]").popover();

  $("[data-toggle=tooltip]").tooltip();

  /*=========================*/
  /*========flex-gallery slide====*/
  /*==========================*/
  $('.flexslider').flexslider({
    directionNav: false,
    slideshowSpeed: 3000,
    animation: "fade"
  });

  /* ==============================================
  WOW plugin triggers animation.css on scroll
  =============================================== */

  var wow = new WOW({
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       150,        // distance to the element when triggering the animation (default is 0)
      mobile:       false       // trigger animations on mobile devices (true is default)
    });
  wow.init();

  /*==============
  Custom
  ==============*/

  window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  // Fix the padding for the content so that the footer is always at the bottom
  requestAnimationFrame(function fixFooterPadding () {
    function getPadding ($el, dir) {
      if (!$el || !dir) return 0;
      return +($el.css('padding-'+dir).replace(/px/, ''));
    }

    var footer = $('#footer-defoult');
    var content = $('#latest-news');
    var contentPaddingBottom = getPadding(content, 'bottom');
    var footerHeight = footer.height();
    var footerPaddingTop = getPadding(footer, 'top');
    var footerPaddingBottom = getPadding(footer, 'bottom');
    var footerTotalHeight = footerPaddingTop + footerHeight + footerPaddingBottom;

    content.css('padding-bottom', (contentPaddingBottom + footerTotalHeight) + 'px');
  });
});
