/**
* main.js
* This is the main execution script for PubConf event pages.
*/

var util = {
    makeArray: function(thing) {
        return Array.prototype.slice.call(thing, 0);
    },

    elementIsVisible: function(el) {
        var rect = el.getBoundingClientRect();
        var vWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var vHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // Return false if it's not in the viewport
        if (rect.right < 0 ||
            rect.bottom < 0 ||
            rect.left > vWidth ||
            rect.top > vHeight) { return false; }

        // Return true if all of its four corners are visible
        return (el.contains(document.elementFromPoint(rect.left + 1,  rect.top + 1)) &&
        el.contains(document.elementFromPoint(rect.right - 1, rect.top + 1)) &&
        el.contains(document.elementFromPoint(rect.right - 1, rect.bottom - 1)) &&
        el.contains(document.elementFromPoint(rect.left + 1,  rect.bottom - 1)));
    },

    forEach: function(array, callback, context) {
        if (Array.prototype.forEach) {
            return Array.prototype.forEach.call(array, callback, context);
        }
        for (var i = 0; i < array.length; i++) {
            callback.call(context, array[i], i, array);
        }
    }
},

(function (ready) {
    if (document.readyState === "complete") { ready(); }
    else { document.addEventListener("DOMContentLoaded", ready); }
})(function () { /* the document is now ready. */

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
