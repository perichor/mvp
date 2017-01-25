'use strict';

var baseClamp = require('./_baseClamp'),
    baseToString = require('./_baseToString'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/**
 * Checks if `string` ends with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @example
 *
 * _.endsWith('abc', 'c');
 * // => true
 *
 * _.endsWith('abc', 'b');
 * // => false
 *
 * _.endsWith('abc', 'b', 2);
 * // => true
 */
function endsWith(string, target, position) {
  string = toString(string);
  target = baseToString(target);

  var length = string.length;
  position = position === undefined ? length : baseClamp(toInteger(position), 0, length);

  var end = position;
  position -= target.length;
  return position >= 0 && string.slice(position, end) == target;
}

module.exports = endsWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2VuZHNXaXRoLmpzIl0sIm5hbWVzIjpbImJhc2VDbGFtcCIsInJlcXVpcmUiLCJiYXNlVG9TdHJpbmciLCJ0b0ludGVnZXIiLCJ0b1N0cmluZyIsImVuZHNXaXRoIiwic3RyaW5nIiwidGFyZ2V0IiwicG9zaXRpb24iLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJlbmQiLCJzbGljZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxpQkFBUixDQURuQjtBQUFBLElBRUlFLFlBQVlGLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lHLFdBQVdILFFBQVEsWUFBUixDQUhmOztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxTQUFTSSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsTUFBMUIsRUFBa0NDLFFBQWxDLEVBQTRDO0FBQzFDRixXQUFTRixTQUFTRSxNQUFULENBQVQ7QUFDQUMsV0FBU0wsYUFBYUssTUFBYixDQUFUOztBQUVBLE1BQUlFLFNBQVNILE9BQU9HLE1BQXBCO0FBQ0FELGFBQVdBLGFBQWFFLFNBQWIsR0FDUEQsTUFETyxHQUVQVCxVQUFVRyxVQUFVSyxRQUFWLENBQVYsRUFBK0IsQ0FBL0IsRUFBa0NDLE1BQWxDLENBRko7O0FBSUEsTUFBSUUsTUFBTUgsUUFBVjtBQUNBQSxjQUFZRCxPQUFPRSxNQUFuQjtBQUNBLFNBQU9ELFlBQVksQ0FBWixJQUFpQkYsT0FBT00sS0FBUCxDQUFhSixRQUFiLEVBQXVCRyxHQUF2QixLQUErQkosTUFBdkQ7QUFDRDs7QUFFRE0sT0FBT0MsT0FBUCxHQUFpQlQsUUFBakIiLCJmaWxlIjoiZW5kc1dpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUNsYW1wID0gcmVxdWlyZSgnLi9fYmFzZUNsYW1wJyksXG4gICAgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVRvU3RyaW5nJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHN0cmluZ2AgZW5kcyB3aXRoIHRoZSBnaXZlbiB0YXJnZXQgc3RyaW5nLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3RhcmdldF0gVGhlIHN0cmluZyB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IFtwb3NpdGlvbj1zdHJpbmcubGVuZ3RoXSBUaGUgcG9zaXRpb24gdG8gc2VhcmNoIHVwIHRvLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBzdHJpbmdgIGVuZHMgd2l0aCBgdGFyZ2V0YCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZW5kc1dpdGgoJ2FiYycsICdjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lbmRzV2l0aCgnYWJjJywgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lbmRzV2l0aCgnYWJjJywgJ2InLCAyKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZW5kc1dpdGgoc3RyaW5nLCB0YXJnZXQsIHBvc2l0aW9uKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHRhcmdldCA9IGJhc2VUb1N0cmluZyh0YXJnZXQpO1xuXG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICBwb3NpdGlvbiA9IHBvc2l0aW9uID09PSB1bmRlZmluZWRcbiAgICA/IGxlbmd0aFxuICAgIDogYmFzZUNsYW1wKHRvSW50ZWdlcihwb3NpdGlvbiksIDAsIGxlbmd0aCk7XG5cbiAgdmFyIGVuZCA9IHBvc2l0aW9uO1xuICBwb3NpdGlvbiAtPSB0YXJnZXQubGVuZ3RoO1xuICByZXR1cm4gcG9zaXRpb24gPj0gMCAmJiBzdHJpbmcuc2xpY2UocG9zaXRpb24sIGVuZCkgPT0gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVuZHNXaXRoO1xuIl19