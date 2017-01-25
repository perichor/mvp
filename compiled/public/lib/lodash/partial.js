'use strict';

var baseRest = require('./_baseRest'),
    createWrap = require('./_createWrap'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders');

/** Used to compose bitmasks for function metadata. */
var WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with `partials` prepended to the
 * arguments it receives. This method is like `_.bind` except it does **not**
 * alter the `this` binding.
 *
 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * **Note:** This method doesn't set the "length" property of partially
 * applied functions.
 *
 * @static
 * @memberOf _
 * @since 0.2.0
 * @category Function
 * @param {Function} func The function to partially apply arguments to.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 * @example
 *
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * var sayHelloTo = _.partial(greet, 'hello');
 * sayHelloTo('fred');
 * // => 'hello fred'
 *
 * // Partially applied with placeholders.
 * var greetFred = _.partial(greet, _, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 */
var partial = baseRest(function (func, partials) {
  var holders = replaceHolders(partials, getHolder(partial));
  return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
});

// Assign default placeholders.
partial.placeholder = {};

module.exports = partial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BhcnRpYWwuanMiXSwibmFtZXMiOlsiYmFzZVJlc3QiLCJyZXF1aXJlIiwiY3JlYXRlV3JhcCIsImdldEhvbGRlciIsInJlcGxhY2VIb2xkZXJzIiwiV1JBUF9QQVJUSUFMX0ZMQUciLCJwYXJ0aWFsIiwiZnVuYyIsInBhcnRpYWxzIiwiaG9sZGVycyIsInVuZGVmaW5lZCIsInBsYWNlaG9sZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLGFBQWFELFFBQVEsZUFBUixDQURqQjtBQUFBLElBRUlFLFlBQVlGLFFBQVEsY0FBUixDQUZoQjtBQUFBLElBR0lHLGlCQUFpQkgsUUFBUSxtQkFBUixDQUhyQjs7QUFLQTtBQUNBLElBQUlJLG9CQUFvQixFQUF4Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBLElBQUlDLFVBQVVOLFNBQVMsVUFBU08sSUFBVCxFQUFlQyxRQUFmLEVBQXlCO0FBQzlDLE1BQUlDLFVBQVVMLGVBQWVJLFFBQWYsRUFBeUJMLFVBQVVHLE9BQVYsQ0FBekIsQ0FBZDtBQUNBLFNBQU9KLFdBQVdLLElBQVgsRUFBaUJGLGlCQUFqQixFQUFvQ0ssU0FBcEMsRUFBK0NGLFFBQS9DLEVBQXlEQyxPQUF6RCxDQUFQO0FBQ0QsQ0FIYSxDQUFkOztBQUtBO0FBQ0FILFFBQVFLLFdBQVIsR0FBc0IsRUFBdEI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJQLE9BQWpCIiwiZmlsZSI6InBhcnRpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGNyZWF0ZVdyYXAgPSByZXF1aXJlKCcuL19jcmVhdGVXcmFwJyksXG4gICAgZ2V0SG9sZGVyID0gcmVxdWlyZSgnLi9fZ2V0SG9sZGVyJyksXG4gICAgcmVwbGFjZUhvbGRlcnMgPSByZXF1aXJlKCcuL19yZXBsYWNlSG9sZGVycycpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBmdW5jdGlvbiBtZXRhZGF0YS4gKi9cbnZhciBXUkFQX1BBUlRJQUxfRkxBRyA9IDMyO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggYHBhcnRpYWxzYCBwcmVwZW5kZWQgdG8gdGhlXG4gKiBhcmd1bWVudHMgaXQgcmVjZWl2ZXMuIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYmluZGAgZXhjZXB0IGl0IGRvZXMgKipub3QqKlxuICogYWx0ZXIgdGhlIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIFRoZSBgXy5wYXJ0aWFsLnBsYWNlaG9sZGVyYCB2YWx1ZSwgd2hpY2ggZGVmYXVsdHMgdG8gYF9gIGluIG1vbm9saXRoaWNcbiAqIGJ1aWxkcywgbWF5IGJlIHVzZWQgYXMgYSBwbGFjZWhvbGRlciBmb3IgcGFydGlhbGx5IGFwcGxpZWQgYXJndW1lbnRzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBkb2Vzbid0IHNldCB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSBvZiBwYXJ0aWFsbHlcbiAqIGFwcGxpZWQgZnVuY3Rpb25zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4yLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcGFydGlhbGx5IGFwcGx5IGFyZ3VtZW50cyB0by5cbiAqIEBwYXJhbSB7Li4uKn0gW3BhcnRpYWxzXSBUaGUgYXJndW1lbnRzIHRvIGJlIHBhcnRpYWxseSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcGFydGlhbGx5IGFwcGxpZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIGdyZWV0KGdyZWV0aW5nLCBuYW1lKSB7XG4gKiAgIHJldHVybiBncmVldGluZyArICcgJyArIG5hbWU7XG4gKiB9XG4gKlxuICogdmFyIHNheUhlbGxvVG8gPSBfLnBhcnRpYWwoZ3JlZXQsICdoZWxsbycpO1xuICogc2F5SGVsbG9UbygnZnJlZCcpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQnXG4gKlxuICogLy8gUGFydGlhbGx5IGFwcGxpZWQgd2l0aCBwbGFjZWhvbGRlcnMuXG4gKiB2YXIgZ3JlZXRGcmVkID0gXy5wYXJ0aWFsKGdyZWV0LCBfLCAnZnJlZCcpO1xuICogZ3JlZXRGcmVkKCdoaScpO1xuICogLy8gPT4gJ2hpIGZyZWQnXG4gKi9cbnZhciBwYXJ0aWFsID0gYmFzZVJlc3QoZnVuY3Rpb24oZnVuYywgcGFydGlhbHMpIHtcbiAgdmFyIGhvbGRlcnMgPSByZXBsYWNlSG9sZGVycyhwYXJ0aWFscywgZ2V0SG9sZGVyKHBhcnRpYWwpKTtcbiAgcmV0dXJuIGNyZWF0ZVdyYXAoZnVuYywgV1JBUF9QQVJUSUFMX0ZMQUcsIHVuZGVmaW5lZCwgcGFydGlhbHMsIGhvbGRlcnMpO1xufSk7XG5cbi8vIEFzc2lnbiBkZWZhdWx0IHBsYWNlaG9sZGVycy5cbnBhcnRpYWwucGxhY2Vob2xkZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJ0aWFsO1xuIl19