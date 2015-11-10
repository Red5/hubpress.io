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

  /* Custom */

  window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  function affixFooterToBottomIfNecessary () {
    var totalHeight = window.innerHeight;
    var footer = $('#footer-defoult');
    var currentScroll = window.scrollY || 0;
    var footerTop = footer.offset().top || 0;
    var footerHeight = footer.height();
    var clzz = 'footer-default--affix-bottom';

    if (footerTop + footerHeight < totalHeight) {
      footer.addClass(clzz);
      // footer.css('bottom', Math.min(0, -currentScroll));
    } else if (footer.hasClass(clzz)) {
      footer.removeClass(clzz);
    }

    requestAnimationFrame(affixFooterToBottomIfNecessary);
  }

  affixFooterToBottomIfNecessary();
});
