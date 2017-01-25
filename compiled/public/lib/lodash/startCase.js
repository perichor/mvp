'use strict';

var createCompounder = require('./_createCompounder'),
    upperFirst = require('./upperFirst');

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @memberOf _
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * _.startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * _.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * _.startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
var startCase = createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + upperFirst(word);
});

module.exports = startCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3N0YXJ0Q2FzZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDb21wb3VuZGVyIiwicmVxdWlyZSIsInVwcGVyRmlyc3QiLCJzdGFydENhc2UiLCJyZXN1bHQiLCJ3b3JkIiwiaW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLG1CQUFtQkMsUUFBUSxxQkFBUixDQUF2QjtBQUFBLElBQ0lDLGFBQWFELFFBQVEsY0FBUixDQURqQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLElBQUlFLFlBQVlILGlCQUFpQixVQUFTSSxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsS0FBdkIsRUFBOEI7QUFDN0QsU0FBT0YsVUFBVUUsUUFBUSxHQUFSLEdBQWMsRUFBeEIsSUFBOEJKLFdBQVdHLElBQVgsQ0FBckM7QUFDRCxDQUZlLENBQWhCOztBQUlBRSxPQUFPQyxPQUFQLEdBQWlCTCxTQUFqQiIsImZpbGUiOiJzdGFydENhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlQ29tcG91bmRlciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUNvbXBvdW5kZXInKSxcbiAgICB1cHBlckZpcnN0ID0gcmVxdWlyZSgnLi91cHBlckZpcnN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG9cbiAqIFtzdGFydCBjYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNTdHlsaXN0aWNfb3Jfc3BlY2lhbGlzZWRfdXNhZ2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4xLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdGFydCBjYXNlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc3RhcnRDYXNlKCctLWZvby1iYXItLScpO1xuICogLy8gPT4gJ0ZvbyBCYXInXG4gKlxuICogXy5zdGFydENhc2UoJ2Zvb0JhcicpO1xuICogLy8gPT4gJ0ZvbyBCYXInXG4gKlxuICogXy5zdGFydENhc2UoJ19fRk9PX0JBUl9fJyk7XG4gKiAvLyA9PiAnRk9PIEJBUidcbiAqL1xudmFyIHN0YXJ0Q2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gJyAnIDogJycpICsgdXBwZXJGaXJzdCh3b3JkKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0Q2FzZTtcbiJdfQ==