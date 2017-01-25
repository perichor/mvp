'use strict';

var chain = require('./chain');

/**
 * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
 *
 * @name chain
 * @memberOf _
 * @since 0.1.0
 * @category Seq
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * // A sequence without explicit chaining.
 * _(users).head();
 * // => { 'user': 'barney', 'age': 36 }
 *
 * // A sequence with explicit chaining.
 * _(users)
 *   .chain()
 *   .head()
 *   .pick('user')
 *   .value();
 * // => { 'user': 'barney' }
 */
function wrapperChain() {
  return chain(this);
}

module.exports = wrapperChain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3dyYXBwZXJDaGFpbi5qcyJdLCJuYW1lcyI6WyJjaGFpbiIsInJlcXVpcmUiLCJ3cmFwcGVyQ2hhaW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLFFBQVEsU0FBUixDQUFaOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsU0FBU0MsWUFBVCxHQUF3QjtBQUN0QixTQUFPRixNQUFNLElBQU4sQ0FBUDtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCRixZQUFqQiIsImZpbGUiOiJ3cmFwcGVyQ2hhaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2hhaW4gPSByZXF1aXJlKCcuL2NoYWluJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBsb2Rhc2hgIHdyYXBwZXIgaW5zdGFuY2Ugd2l0aCBleHBsaWNpdCBtZXRob2QgY2hhaW4gc2VxdWVuY2VzIGVuYWJsZWQuXG4gKlxuICogQG5hbWUgY2hhaW5cbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBTZXFcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBgbG9kYXNoYCB3cmFwcGVyIGluc3RhbmNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FnZSc6IDQwIH1cbiAqIF07XG4gKlxuICogLy8gQSBzZXF1ZW5jZSB3aXRob3V0IGV4cGxpY2l0IGNoYWluaW5nLlxuICogXyh1c2VycykuaGVhZCgpO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICpcbiAqIC8vIEEgc2VxdWVuY2Ugd2l0aCBleHBsaWNpdCBjaGFpbmluZy5cbiAqIF8odXNlcnMpXG4gKiAgIC5jaGFpbigpXG4gKiAgIC5oZWFkKClcbiAqICAgLnBpY2soJ3VzZXInKVxuICogICAudmFsdWUoKTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JyB9XG4gKi9cbmZ1bmN0aW9uIHdyYXBwZXJDaGFpbigpIHtcbiAgcmV0dXJuIGNoYWluKHRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwZXJDaGFpbjtcbiJdfQ==