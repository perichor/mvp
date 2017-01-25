'use strict';

var baseRest = require('./_baseRest'),
    createWrap = require('./_createWrap'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes the method at `object[key]` with `partials`
 * prepended to the arguments it receives.
 *
 * This method differs from `_.bind` by allowing bound functions to reference
 * methods that may be redefined or don't yet exist. See
 * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
 * for more details.
 *
 * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Function
 * @param {Object} object The object to invoke the method on.
 * @param {string} key The key of the method.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var object = {
 *   'user': 'fred',
 *   'greet': function(greeting, punctuation) {
 *     return greeting + ' ' + this.user + punctuation;
 *   }
 * };
 *
 * var bound = _.bindKey(object, 'greet', 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * object.greet = function(greeting, punctuation) {
 *   return greeting + 'ya ' + this.user + punctuation;
 * };
 *
 * bound('!');
 * // => 'hiya fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bindKey(object, 'greet', _, '!');
 * bound('hi');
 * // => 'hiya fred!'
 */
var bindKey = baseRest(function (object, key, partials) {
    var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
    if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
    }
    return createWrap(key, bitmask, object, partials, holders);
});

// Assign default placeholders.
bindKey.placeholder = {};

module.exports = bindKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2JpbmRLZXkuanMiXSwibmFtZXMiOlsiYmFzZVJlc3QiLCJyZXF1aXJlIiwiY3JlYXRlV3JhcCIsImdldEhvbGRlciIsInJlcGxhY2VIb2xkZXJzIiwiV1JBUF9CSU5EX0ZMQUciLCJXUkFQX0JJTkRfS0VZX0ZMQUciLCJXUkFQX1BBUlRJQUxfRkxBRyIsImJpbmRLZXkiLCJvYmplY3QiLCJrZXkiLCJwYXJ0aWFscyIsImJpdG1hc2siLCJsZW5ndGgiLCJob2xkZXJzIiwicGxhY2Vob2xkZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCO0FBQUEsSUFFSUUsWUFBWUYsUUFBUSxjQUFSLENBRmhCO0FBQUEsSUFHSUcsaUJBQWlCSCxRQUFRLG1CQUFSLENBSHJCOztBQUtBO0FBQ0EsSUFBSUksaUJBQWlCLENBQXJCO0FBQUEsSUFDSUMscUJBQXFCLENBRHpCO0FBQUEsSUFFSUMsb0JBQW9CLEVBRnhCOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Q0EsSUFBSUMsVUFBVVIsU0FBUyxVQUFTUyxNQUFULEVBQWlCQyxHQUFqQixFQUFzQkMsUUFBdEIsRUFBZ0M7QUFDckQsUUFBSUMsVUFBVVAsaUJBQWlCQyxrQkFBL0I7QUFDQSxRQUFJSyxTQUFTRSxNQUFiLEVBQXFCO0FBQ25CLFlBQUlDLFVBQVVWLGVBQWVPLFFBQWYsRUFBeUJSLFVBQVVLLE9BQVYsQ0FBekIsQ0FBZDtBQUNBSSxtQkFBV0wsaUJBQVg7QUFDRDtBQUNELFdBQU9MLFdBQVdRLEdBQVgsRUFBZ0JFLE9BQWhCLEVBQXlCSCxNQUF6QixFQUFpQ0UsUUFBakMsRUFBMkNHLE9BQTNDLENBQVA7QUFDRCxDQVBhLENBQWQ7O0FBU0E7QUFDQU4sUUFBUU8sV0FBUixHQUFzQixFQUF0Qjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQlQsT0FBakIiLCJmaWxlIjoiYmluZEtleS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlUmVzdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXN0JyksXG4gICAgY3JlYXRlV3JhcCA9IHJlcXVpcmUoJy4vX2NyZWF0ZVdyYXAnKSxcbiAgICBnZXRIb2xkZXIgPSByZXF1aXJlKCcuL19nZXRIb2xkZXInKSxcbiAgICByZXBsYWNlSG9sZGVycyA9IHJlcXVpcmUoJy4vX3JlcGxhY2VIb2xkZXJzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGZ1bmN0aW9uIG1ldGFkYXRhLiAqL1xudmFyIFdSQVBfQklORF9GTEFHID0gMSxcbiAgICBXUkFQX0JJTkRfS0VZX0ZMQUcgPSAyLFxuICAgIFdSQVBfUEFSVElBTF9GTEFHID0gMzI7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgbWV0aG9kIGF0IGBvYmplY3Rba2V5XWAgd2l0aCBgcGFydGlhbHNgXG4gKiBwcmVwZW5kZWQgdG8gdGhlIGFyZ3VtZW50cyBpdCByZWNlaXZlcy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBkaWZmZXJzIGZyb20gYF8uYmluZGAgYnkgYWxsb3dpbmcgYm91bmQgZnVuY3Rpb25zIHRvIHJlZmVyZW5jZVxuICogbWV0aG9kcyB0aGF0IG1heSBiZSByZWRlZmluZWQgb3IgZG9uJ3QgeWV0IGV4aXN0LiBTZWVcbiAqIFtQZXRlciBNaWNoYXV4J3MgYXJ0aWNsZV0oaHR0cDovL3BldGVyLm1pY2hhdXguY2EvYXJ0aWNsZXMvbGF6eS1mdW5jdGlvbi1kZWZpbml0aW9uLXBhdHRlcm4pXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFRoZSBgXy5iaW5kS2V5LnBsYWNlaG9sZGVyYCB2YWx1ZSwgd2hpY2ggZGVmYXVsdHMgdG8gYF9gIGluIG1vbm9saXRoaWNcbiAqIGJ1aWxkcywgbWF5IGJlIHVzZWQgYXMgYSBwbGFjZWhvbGRlciBmb3IgcGFydGlhbGx5IGFwcGxpZWQgYXJndW1lbnRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnZva2UgdGhlIG1ldGhvZCBvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kLlxuICogQHBhcmFtIHsuLi4qfSBbcGFydGlhbHNdIFRoZSBhcmd1bWVudHMgdG8gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBib3VuZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ3VzZXInOiAnZnJlZCcsXG4gKiAgICdncmVldCc6IGZ1bmN0aW9uKGdyZWV0aW5nLCBwdW5jdHVhdGlvbikge1xuICogICAgIHJldHVybiBncmVldGluZyArICcgJyArIHRoaXMudXNlciArIHB1bmN0dWF0aW9uO1xuICogICB9XG4gKiB9O1xuICpcbiAqIHZhciBib3VuZCA9IF8uYmluZEtleShvYmplY3QsICdncmVldCcsICdoaScpO1xuICogYm91bmQoJyEnKTtcbiAqIC8vID0+ICdoaSBmcmVkISdcbiAqXG4gKiBvYmplY3QuZ3JlZXQgPSBmdW5jdGlvbihncmVldGluZywgcHVuY3R1YXRpb24pIHtcbiAqICAgcmV0dXJuIGdyZWV0aW5nICsgJ3lhICcgKyB0aGlzLnVzZXIgKyBwdW5jdHVhdGlvbjtcbiAqIH07XG4gKlxuICogYm91bmQoJyEnKTtcbiAqIC8vID0+ICdoaXlhIGZyZWQhJ1xuICpcbiAqIC8vIEJvdW5kIHdpdGggcGxhY2Vob2xkZXJzLlxuICogdmFyIGJvdW5kID0gXy5iaW5kS2V5KG9iamVjdCwgJ2dyZWV0JywgXywgJyEnKTtcbiAqIGJvdW5kKCdoaScpO1xuICogLy8gPT4gJ2hpeWEgZnJlZCEnXG4gKi9cbnZhciBiaW5kS2V5ID0gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBrZXksIHBhcnRpYWxzKSB7XG4gIHZhciBiaXRtYXNrID0gV1JBUF9CSU5EX0ZMQUcgfCBXUkFQX0JJTkRfS0VZX0ZMQUc7XG4gIGlmIChwYXJ0aWFscy5sZW5ndGgpIHtcbiAgICB2YXIgaG9sZGVycyA9IHJlcGxhY2VIb2xkZXJzKHBhcnRpYWxzLCBnZXRIb2xkZXIoYmluZEtleSkpO1xuICAgIGJpdG1hc2sgfD0gV1JBUF9QQVJUSUFMX0ZMQUc7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVdyYXAoa2V5LCBiaXRtYXNrLCBvYmplY3QsIHBhcnRpYWxzLCBob2xkZXJzKTtcbn0pO1xuXG4vLyBBc3NpZ24gZGVmYXVsdCBwbGFjZWhvbGRlcnMuXG5iaW5kS2V5LnBsYWNlaG9sZGVyID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZEtleTtcbiJdfQ==