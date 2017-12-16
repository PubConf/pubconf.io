/**
  * main.js
  * This is the main execution script for PubConf event pages.
  */

/* global ga, util */
//= require util.js

(function(document, window, undefined) {                  // eslint-disable-line
  'use strict';

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
