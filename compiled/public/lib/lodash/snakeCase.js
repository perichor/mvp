'use strict';

var createCompounder = require('./_createCompounder');

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @example
 *
 * _.snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * _.snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * _.snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 */
var snakeCase = createCompounder(function (result, word, index) {
  return result + (index ? '_' : '') + word.toLowerCase();
});

module.exports = snakeCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NuYWtlQ2FzZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDb21wb3VuZGVyIiwicmVxdWlyZSIsInNuYWtlQ2FzZSIsInJlc3VsdCIsIndvcmQiLCJpbmRleCIsInRvTG93ZXJDYXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxtQkFBbUJDLFFBQVEscUJBQVIsQ0FBdkI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFJQyxZQUFZRixpQkFBaUIsVUFBU0csTUFBVCxFQUFpQkMsSUFBakIsRUFBdUJDLEtBQXZCLEVBQThCO0FBQzdELFNBQU9GLFVBQVVFLFFBQVEsR0FBUixHQUFjLEVBQXhCLElBQThCRCxLQUFLRSxXQUFMLEVBQXJDO0FBQ0QsQ0FGZSxDQUFoQjs7QUFJQUMsT0FBT0MsT0FBUCxHQUFpQk4sU0FBakIiLCJmaWxlIjoic25ha2VDYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNyZWF0ZUNvbXBvdW5kZXIgPSByZXF1aXJlKCcuL19jcmVhdGVDb21wb3VuZGVyJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG9cbiAqIFtzbmFrZSBjYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TbmFrZV9jYXNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc25ha2UgY2FzZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnNuYWtlQ2FzZSgnRm9vIEJhcicpO1xuICogLy8gPT4gJ2Zvb19iYXInXG4gKlxuICogXy5zbmFrZUNhc2UoJ2Zvb0JhcicpO1xuICogLy8gPT4gJ2Zvb19iYXInXG4gKlxuICogXy5zbmFrZUNhc2UoJy0tRk9PLUJBUi0tJyk7XG4gKiAvLyA9PiAnZm9vX2JhcidcbiAqL1xudmFyIHNuYWtlQ2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gJ18nIDogJycpICsgd29yZC50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc25ha2VDYXNlO1xuIl19