'use strict';

var arrayEvery = require('./_arrayEvery'),
    createOver = require('./_createOver');

/**
 * Creates a function that checks if **all** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {...(Function|Function[])} [predicates=[_.identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var func = _.overEvery([Boolean, isFinite]);
 *
 * func('1');
 * // => true
 *
 * func(null);
 * // => false
 *
 * func(NaN);
 * // => false
 */
var overEvery = createOver(arrayEvery);

module.exports = overEvery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL292ZXJFdmVyeS5qcyJdLCJuYW1lcyI6WyJhcnJheUV2ZXJ5IiwicmVxdWlyZSIsImNyZWF0ZU92ZXIiLCJvdmVyRXZlcnkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWFDLFFBQVEsZUFBUixDQUFqQjtBQUFBLElBQ0lDLGFBQWFELFFBQVEsZUFBUixDQURqQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQUlFLFlBQVlELFdBQVdGLFVBQVgsQ0FBaEI7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUJGLFNBQWpCIiwiZmlsZSI6Im92ZXJFdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheUV2ZXJ5ID0gcmVxdWlyZSgnLi9fYXJyYXlFdmVyeScpLFxuICAgIGNyZWF0ZU92ZXIgPSByZXF1aXJlKCcuL19jcmVhdGVPdmVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmICoqYWxsKiogb2YgdGhlIGBwcmVkaWNhdGVzYCByZXR1cm5cbiAqIHRydXRoeSB3aGVuIGludm9rZWQgd2l0aCB0aGUgYXJndW1lbnRzIGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0gey4uLihGdW5jdGlvbnxGdW5jdGlvbltdKX0gW3ByZWRpY2F0ZXM9W18uaWRlbnRpdHldXVxuICogIFRoZSBwcmVkaWNhdGVzIHRvIGNoZWNrLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBmdW5jID0gXy5vdmVyRXZlcnkoW0Jvb2xlYW4sIGlzRmluaXRlXSk7XG4gKlxuICogZnVuYygnMScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIGZ1bmMobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIGZ1bmMoTmFOKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBvdmVyRXZlcnkgPSBjcmVhdGVPdmVyKGFycmF5RXZlcnkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJFdmVyeTtcbiJdfQ==