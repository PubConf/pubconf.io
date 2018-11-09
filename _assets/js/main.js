/**
  * main.js
  * This is the main execution script for PubConf event pages.
  */

/* global $, gtag, util */

//= require jquery
//= require jquery.magnific
//= require bootstrap
//= require util.js

$(function() {
  'use strict';

  /**
    * Setup the navbar highlighting
    */
  $('body').scrollspy({ target: '#navbar-example' });


  /**
    * shrinkHeader
    * Setup the header to shrink once the user has scrolled down.
    */
  (function shrinkHeader() {
    if ($('.section').length < 2) { return; }

    var batas = $('.section').eq(1).offset().top;
    function checkHeaderStiky() {
      var top = $(document).scrollTop();
      if (top > batas) {
        $('.navbar-main').addClass('stiky');
      }
      else {
        $('.navbar-main').removeClass('stiky');
      }
    }

    $(window).scroll(checkHeaderStiky);
    checkHeaderStiky();
  })();


  /**
    * scrollNavigation
    * Setup the navigation links to scroll to their target.
    */
  (function scrollNavigation() {
    var htmlbody = $('html,body');
    $('.navbar-nav li a').on('click', function() {
      var target = $(this).attr('href');
      htmlbody.animate({
        scrollTop: $(target).offset().top - 30
      }, 1000);
    });
  })();

  /**
    * magnificPopup
    * Setup the gallery popup images.
    */
  (function magnificPopupSetup() {
    $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function(item) {
          return item.el.attr('title') + '';
        }
      }
    });
  })();

  (function attachClickAnalytics() {
    var categoryAttr = 'data-click-category';
    var actionAttr = 'data-click-action';
    var labelAttr = 'data-click-label';
    var elements = util.makeArray(document.querySelectorAll('[' + actionAttr + ']'));
    util.forEach(elements, function(element) {
      element.addEventListener('click', function(evt) {
        evt.preventDefault();
        var category = element.getAttribute(categoryAttr) || '';
        var action = element.getAttribute(actionAttr) || '';
        var label = element.getAttribute(labelAttr) || '';
        gtag('event', action, {
          'event_category': category,
          'event_label': label,
          'transport_type': 'beacon',
          'event_callback': gtag.createTimeoutFn(function() {
            if (element.tagName === 'A') {
              document.location = element.getAttribute('href');
            }
          })
        });
      });
    });
  })();

  (function attachVisibleAnalytics() {
    var categoryAttr = 'data-visible-category';
    var actionAttr = 'data-visible-action';
    var labelAttr = 'data-visible-label';
    var visibleEls = util.makeArray(document.querySelectorAll('[' + actionAttr + ']'));
    if (!visibleEls.length) { return; }

    window.addEventListener('scroll', (function() {
      var timeout;
      return function throttledOnScroll() {
        timeout = timeout || setTimeout(function() {
          util.forEach(visibleEls, function(el) {
            if (util.elementIsVisible(el) && el.hasAttribute(actionAttr)) {
              var category = el.getAttribute(categoryAttr) || '';
              var action = el.getAttribute(actionAttr) || '';
              var label = el.getAttribute(labelAttr) || '';
              gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'transport_type': 'beacon'
              });
              el.removeAttribute(actionAttr);
            }
          });
          timeout = null;
        }, 250);
      };
    })());
  })();

  /**
    * lazyLoadImages
    * @see https://davidwalsh.name/lazyload-image-fade
    * reduce the perceived load time by deferring some images to load later.
    */
  (function lazyLoadImages() {
    var attr1 = 'data-lazy-style';
    util.forEach(util.makeArray(document.querySelectorAll('[' + attr1 + ']')), function(el) {
      el.setAttribute('style', el.getAttribute(attr1));
      setTimeout(function() {
        el.removeAttribute(attr1);
      }, 500);
    });
    var attr2 = 'data-lazy-src';
    util.forEach(util.makeArray(document.querySelectorAll('[' + attr2 + ']')), function(el) {
      el.setAttribute('src', el.getAttribute(attr2));
      el.onload = function() {
        el.removeAttribute(attr2);
      };
    });
  })();

});
