'use strict';

var createCompounder = require('./_createCompounder');

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @example
 *
 * _.upperCase('--foo-bar');
 * // => 'FOO BAR'
 *
 * _.upperCase('fooBar');
 * // => 'FOO BAR'
 *
 * _.upperCase('__foo_bar__');
 * // => 'FOO BAR'
 */
var upperCase = createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + word.toUpperCase();
});

module.exports = upperCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3VwcGVyQ2FzZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDb21wb3VuZGVyIiwicmVxdWlyZSIsInVwcGVyQ2FzZSIsInJlc3VsdCIsIndvcmQiLCJpbmRleCIsInRvVXBwZXJDYXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxtQkFBbUJDLFFBQVEscUJBQVIsQ0FBdkI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLElBQUlDLFlBQVlGLGlCQUFpQixVQUFTRyxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsS0FBdkIsRUFBOEI7QUFDN0QsU0FBT0YsVUFBVUUsUUFBUSxHQUFSLEdBQWMsRUFBeEIsSUFBOEJELEtBQUtFLFdBQUwsRUFBckM7QUFDRCxDQUZlLENBQWhCOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCTixTQUFqQiIsImZpbGUiOiJ1cHBlckNhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlQ29tcG91bmRlciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUNvbXBvdW5kZXInKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCwgYXMgc3BhY2Ugc2VwYXJhdGVkIHdvcmRzLCB0byB1cHBlciBjYXNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB1cHBlciBjYXNlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udXBwZXJDYXNlKCctLWZvby1iYXInKTtcbiAqIC8vID0+ICdGT08gQkFSJ1xuICpcbiAqIF8udXBwZXJDYXNlKCdmb29CYXInKTtcbiAqIC8vID0+ICdGT08gQkFSJ1xuICpcbiAqIF8udXBwZXJDYXNlKCdfX2Zvb19iYXJfXycpO1xuICogLy8gPT4gJ0ZPTyBCQVInXG4gKi9cbnZhciB1cHBlckNhc2UgPSBjcmVhdGVDb21wb3VuZGVyKGZ1bmN0aW9uKHJlc3VsdCwgd29yZCwgaW5kZXgpIHtcbiAgcmV0dXJuIHJlc3VsdCArIChpbmRleCA/ICcgJyA6ICcnKSArIHdvcmQudG9VcHBlckNhc2UoKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVwcGVyQ2FzZTtcbiJdfQ==