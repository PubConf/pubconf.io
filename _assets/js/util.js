/**
  * util.js
  * Utility functions
  */

var util = (function(document, window, undefined) {       // eslint-disable-line

  'use strict';

  var exports = {

    /**
      * makeArray
      * Attempt to make a thing that resembles an array into an Array.
      *
      * @param {*} thing Array-like object, such as arguments
      * @return {Array} Array version of the thing.
      */
    makeArray: function(thing) {
      return Array.prototype.slice.call(thing, 0);
    },

    /**
      * elementIsVisible
      * Whether an element is visible in the current viewport, in terms of position,
      * CSS display, and z-index.
      *
      * @param {HTMLElement} el Element to check.
      * @return {Boolean} true if el is visible.
      */
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

    /**
      * forEach
      * Compatibility wrapper for `Array.prototype.forEach`.
      *
      * @param {Array} array Array to iterate.
      * @param {Function} callback Function to call for each item.
      * @param {Object} context Function context.
      * @return {Null} Null
      */
    forEach: function(array, callback, context) {
      if (Array.prototype.forEach) {
        return Array.prototype.forEach.call(array, callback, context);
      }
      for (var i = 0; i < array.length; i++) {
        callback.call(context, array[i], i, array);
      }
    }

  };

  return exports;

})(document, window);
