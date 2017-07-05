/**
  * main.js
  * This is the main execution script for PubConf event pages.
  */

/* global ga, util */
//= require util.js

(function(document, window, undefined) {                  // eslint-disable-line
  'use strict';

  if (!document.querySelector || !window.addEventListener) { return; }

  // Metadata gathered from the document.
  var meta = {
    city: document.querySelector('meta[name=city]').content,
    eventId: document.querySelector('meta[name=eventId]').content
  };

  (function toggleNewsletterModal() {
    var toggleEls = document.querySelectorAll(".js-waitlist-toggle");
    var wrapEl = document.querySelector(".js-waitlist-wrap");
    var closeEl = document.querySelector(".js-modal-close");
    if (!toggleEls.length || !wrapEl || !closeEl) return;

    for(var i = 0; i < toggleEls.length; i++) {
      toggleEls[i].href = "javascript:void(0);";
      toggleEls[i].addEventListener("click", function () {
        wrapEl.classList.toggle("visible");
      });
    }

    window.addEventListener("keyup", function (evt) {
      if (evt.keyCode == 27) {
        wrapEl.classList.remove("visible");
      }
    });
    closeEl.addEventListener("click", function () {
      wrapEl.classList.remove("visible");
    });
  })();

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
                'eventAction': 'visible',
                'eventLabel': meta.eventId
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
          'eventAction': 'click',
          'eventLabel': meta.eventId
        };
        console.info('send element click event', el, event);
        ga('send', event);
        el.removeAttribute(attribute);
      });
    });

  })();

})(document, window);
