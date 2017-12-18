/**
  * main.js
  * This is the main execution script for PubConf event pages.
  */

/* global $, ga, util */

//= require jquery
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
    var batas = $('.section').eq(1).offset().top;
    $(window).scroll(function() {
      var top = $(document).scrollTop();
      if (top > batas) {
        $('.navbar-main').addClass('stiky');
      }
      else {
        $('.navbar-main').removeClass('stiky');
      }
    });
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
        scrollTop: $(target).offset().top - 50
      }, 1000);
    });
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

(function(document, window, undefined) {                  // eslint-disable-line

  if (!document.querySelector || !window.addEventListener) { return; }


  /**
    * addVisibleElementAnalytics
    * IIFE that will find annotated elements and attach event listeners for
    * when the element is visible in the viewport.
    *
    * `data-visible-event="{category}"` will send ga event {category}:visible:{eventId}
    */
  (function addVisibleElementAnalytics() {
    var attribute = 'data-visible-event';

    var visibleEls = util.makeArray(document.querySelectorAll('[' + attribute + ']'));
    if (!visibleEls.length) { return; }

    window.addEventListener('scroll', (function() {
      var timeout;

      return function throttledOnScroll() {
        timeout = timeout || setTimeout(function() {
          util.forEach(visibleEls, function(el) {
            if (util.elementIsVisible(el) && el.hasAttribute(attribute)) {
              var category = el.getAttribute(attribute);
              var event = {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': 'visible'
              };
              console.info('send element visible event', el, event);
              ga('send', event);
              el.removeAttribute(attribute);
            }
          });
          timeout = null;
        }, 250);
      };
    })());

  })();

  /**
    * addClickElementAnalytics
    * IIFE that will find annotated elements and attach event listeners for
    * when the element is clicked.
    *
    * `data-click-event="{category}"` will send ga event {category}:click:{eventId}
    */
  (function addClickElementAnalytics() {
    var attribute = 'data-click-event';

    util.forEach(document.querySelectorAll('[' + attribute + ']'), function(el) {
      el.addEventListener('click', function() {
        var category = el.getAttribute(attribute);
        var event = {
          'hitType': 'event',
          'eventCategory': category,
          'eventAction': 'click'
        };
        console.info('send element click event', el, event);
        ga('send', event);
        el.removeAttribute(attribute);
      });
    });

  })();

})(document, window);
