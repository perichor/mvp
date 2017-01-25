'use strict';

var createCompounder = require('./_createCompounder');

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * _.lowerCase('--Foo-Bar--');
 * // => 'foo bar'
 *
 * _.lowerCase('fooBar');
 * // => 'foo bar'
 *
 * _.lowerCase('__FOO_BAR__');
 * // => 'foo bar'
 */
var lowerCase = createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + word.toLowerCase();
});

module.exports = lowerCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2xvd2VyQ2FzZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDb21wb3VuZGVyIiwicmVxdWlyZSIsImxvd2VyQ2FzZSIsInJlc3VsdCIsIndvcmQiLCJpbmRleCIsInRvTG93ZXJDYXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxtQkFBbUJDLFFBQVEscUJBQVIsQ0FBdkI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLElBQUlDLFlBQVlGLGlCQUFpQixVQUFTRyxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsS0FBdkIsRUFBOEI7QUFDN0QsU0FBT0YsVUFBVUUsUUFBUSxHQUFSLEdBQWMsRUFBeEIsSUFBOEJELEtBQUtFLFdBQUwsRUFBckM7QUFDRCxDQUZlLENBQWhCOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCTixTQUFqQiIsImZpbGUiOiJsb3dlckNhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlQ29tcG91bmRlciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUNvbXBvdW5kZXInKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCwgYXMgc3BhY2Ugc2VwYXJhdGVkIHdvcmRzLCB0byBsb3dlciBjYXNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBsb3dlciBjYXNlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubG93ZXJDYXNlKCctLUZvby1CYXItLScpO1xuICogLy8gPT4gJ2ZvbyBiYXInXG4gKlxuICogXy5sb3dlckNhc2UoJ2Zvb0JhcicpO1xuICogLy8gPT4gJ2ZvbyBiYXInXG4gKlxuICogXy5sb3dlckNhc2UoJ19fRk9PX0JBUl9fJyk7XG4gKiAvLyA9PiAnZm9vIGJhcidcbiAqL1xudmFyIGxvd2VyQ2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gJyAnIDogJycpICsgd29yZC50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbG93ZXJDYXNlO1xuIl19