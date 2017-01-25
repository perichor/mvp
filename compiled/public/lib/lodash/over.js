'use strict';

var arrayMap = require('./_arrayMap'),
    createOver = require('./_createOver');

/**
 * Creates a function that invokes `iteratees` with the arguments it receives
 * and returns their results.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var func = _.over([Math.max, Math.min]);
 *
 * func(1, 2, 3, 4);
 * // => [4, 1]
 */
var over = createOver(arrayMap);

module.exports = over;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL292ZXIuanMiXSwibmFtZXMiOlsiYXJyYXlNYXAiLCJyZXF1aXJlIiwiY3JlYXRlT3ZlciIsIm92ZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBSUUsT0FBT0QsV0FBV0YsUUFBWCxDQUFYOztBQUVBSSxPQUFPQyxPQUFQLEdBQWlCRixJQUFqQiIsImZpbGUiOiJvdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBjcmVhdGVPdmVyID0gcmVxdWlyZSgnLi9fY3JlYXRlT3ZlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGl0ZXJhdGVlc2Agd2l0aCB0aGUgYXJndW1lbnRzIGl0IHJlY2VpdmVzXG4gKiBhbmQgcmV0dXJucyB0aGVpciByZXN1bHRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0gey4uLihGdW5jdGlvbnxGdW5jdGlvbltdKX0gW2l0ZXJhdGVlcz1bXy5pZGVudGl0eV1dXG4gKiAgVGhlIGl0ZXJhdGVlcyB0byBpbnZva2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGZ1bmMgPSBfLm92ZXIoW01hdGgubWF4LCBNYXRoLm1pbl0pO1xuICpcbiAqIGZ1bmMoMSwgMiwgMywgNCk7XG4gKiAvLyA9PiBbNCwgMV1cbiAqL1xudmFyIG92ZXIgPSBjcmVhdGVPdmVyKGFycmF5TWFwKTtcblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyO1xuIl19