'use strict';

var baseClamp = require('./_baseClamp'),
    baseToString = require('./_baseToString'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/**
 * Checks if `string` starts with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * _.startsWith('abc', 'a');
 * // => true
 *
 * _.startsWith('abc', 'b');
 * // => false
 *
 * _.startsWith('abc', 'b', 1);
 * // => true
 */
function startsWith(string, target, position) {
  string = toString(string);
  position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);

  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}

module.exports = startsWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3N0YXJ0c1dpdGguanMiXSwibmFtZXMiOlsiYmFzZUNsYW1wIiwicmVxdWlyZSIsImJhc2VUb1N0cmluZyIsInRvSW50ZWdlciIsInRvU3RyaW5nIiwic3RhcnRzV2l0aCIsInN0cmluZyIsInRhcmdldCIsInBvc2l0aW9uIiwibGVuZ3RoIiwic2xpY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ0lDLGVBQWVELFFBQVEsaUJBQVIsQ0FEbkI7QUFBQSxJQUVJRSxZQUFZRixRQUFRLGFBQVIsQ0FGaEI7QUFBQSxJQUdJRyxXQUFXSCxRQUFRLFlBQVIsQ0FIZjs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsU0FBU0ksVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEJDLE1BQTVCLEVBQW9DQyxRQUFwQyxFQUE4QztBQUM1Q0YsV0FBU0YsU0FBU0UsTUFBVCxDQUFUO0FBQ0FFLGFBQVdBLFlBQVksSUFBWixHQUNQLENBRE8sR0FFUFIsVUFBVUcsVUFBVUssUUFBVixDQUFWLEVBQStCLENBQS9CLEVBQWtDRixPQUFPRyxNQUF6QyxDQUZKOztBQUlBRixXQUFTTCxhQUFhSyxNQUFiLENBQVQ7QUFDQSxTQUFPRCxPQUFPSSxLQUFQLENBQWFGLFFBQWIsRUFBdUJBLFdBQVdELE9BQU9FLE1BQXpDLEtBQW9ERixNQUEzRDtBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCUCxVQUFqQiIsImZpbGUiOiJzdGFydHNXaXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VDbGFtcCA9IHJlcXVpcmUoJy4vX2Jhc2VDbGFtcCcpLFxuICAgIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VUb1N0cmluZycpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIHN0YXJ0cyB3aXRoIHRoZSBnaXZlbiB0YXJnZXQgc3RyaW5nLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3RhcmdldF0gVGhlIHN0cmluZyB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IFtwb3NpdGlvbj0wXSBUaGUgcG9zaXRpb24gdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHN0cmluZ2Agc3RhcnRzIHdpdGggYHRhcmdldGAsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnN0YXJ0c1dpdGgoJ2FiYycsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5zdGFydHNXaXRoKCdhYmMnLCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLnN0YXJ0c1dpdGgoJ2FiYycsICdiJywgMSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyaW5nLCB0YXJnZXQsIHBvc2l0aW9uKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHBvc2l0aW9uID0gcG9zaXRpb24gPT0gbnVsbFxuICAgID8gMFxuICAgIDogYmFzZUNsYW1wKHRvSW50ZWdlcihwb3NpdGlvbiksIDAsIHN0cmluZy5sZW5ndGgpO1xuXG4gIHRhcmdldCA9IGJhc2VUb1N0cmluZyh0YXJnZXQpO1xuICByZXR1cm4gc3RyaW5nLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIHRhcmdldC5sZW5ndGgpID09IHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydHNXaXRoO1xuIl19