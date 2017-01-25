'use strict';

var baseRandom = require('./_baseRandom');

/**
 * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @param {number} [size=array.length] The size of `array`.
 * @returns {Array} Returns `array`.
 */
function shuffleSelf(array, size) {
    var index = -1,
        length = array.length,
        lastIndex = length - 1;

    size = size === undefined ? length : size;
    while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
    }
    array.length = size;
    return array;
}

module.exports = shuffleSelf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19zaHVmZmxlU2VsZi5qcyJdLCJuYW1lcyI6WyJiYXNlUmFuZG9tIiwicmVxdWlyZSIsInNodWZmbGVTZWxmIiwiYXJyYXkiLCJzaXplIiwiaW5kZXgiLCJsZW5ndGgiLCJsYXN0SW5kZXgiLCJ1bmRlZmluZWQiLCJyYW5kIiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWFDLFFBQVEsZUFBUixDQUFqQjs7QUFFQTs7Ozs7Ozs7QUFRQSxTQUFTQyxXQUFULENBQXFCQyxLQUFyQixFQUE0QkMsSUFBNUIsRUFBa0M7QUFDaEMsUUFBSUMsUUFBUSxDQUFDLENBQWI7QUFBQSxRQUNJQyxTQUFTSCxNQUFNRyxNQURuQjtBQUFBLFFBRUlDLFlBQVlELFNBQVMsQ0FGekI7O0FBSUFGLFdBQU9BLFNBQVNJLFNBQVQsR0FBcUJGLE1BQXJCLEdBQThCRixJQUFyQztBQUNBLFdBQU8sRUFBRUMsS0FBRixHQUFVRCxJQUFqQixFQUF1QjtBQUNyQixZQUFJSyxPQUFPVCxXQUFXSyxLQUFYLEVBQWtCRSxTQUFsQixDQUFYO0FBQUEsWUFDSUcsUUFBUVAsTUFBTU0sSUFBTixDQURaOztBQUdBTixjQUFNTSxJQUFOLElBQWNOLE1BQU1FLEtBQU4sQ0FBZDtBQUNBRixjQUFNRSxLQUFOLElBQWVLLEtBQWY7QUFDRDtBQUNEUCxVQUFNRyxNQUFOLEdBQWVGLElBQWY7QUFDQSxXQUFPRCxLQUFQO0FBQ0Q7O0FBRURRLE9BQU9DLE9BQVAsR0FBaUJWLFdBQWpCIiwiZmlsZSI6Il9zaHVmZmxlU2VsZi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlUmFuZG9tID0gcmVxdWlyZSgnLi9fYmFzZVJhbmRvbScpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zaHVmZmxlYCB3aGljaCBtdXRhdGVzIGFuZCBzZXRzIHRoZSBzaXplIG9mIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzaHVmZmxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPWFycmF5Lmxlbmd0aF0gVGhlIHNpemUgb2YgYGFycmF5YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBzaHVmZmxlU2VsZihhcnJheSwgc2l6ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDE7XG5cbiAgc2l6ZSA9IHNpemUgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHNpemU7XG4gIHdoaWxlICgrK2luZGV4IDwgc2l6ZSkge1xuICAgIHZhciByYW5kID0gYmFzZVJhbmRvbShpbmRleCwgbGFzdEluZGV4KSxcbiAgICAgICAgdmFsdWUgPSBhcnJheVtyYW5kXTtcblxuICAgIGFycmF5W3JhbmRdID0gYXJyYXlbaW5kZXhdO1xuICAgIGFycmF5W2luZGV4XSA9IHZhbHVlO1xuICB9XG4gIGFycmF5Lmxlbmd0aCA9IHNpemU7XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaHVmZmxlU2VsZjtcbiJdfQ==