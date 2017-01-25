'use strict';

var isSymbol = require('./isSymbol');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeMin = Math.min;

/**
 * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value);

  var low = 0,
      high = array == null ? 0 : array.length,
      valIsNaN = value !== value,
      valIsNull = value === null,
      valIsSymbol = isSymbol(value),
      valIsUndefined = value === undefined;

  while (low < high) {
    var mid = nativeFloor((low + high) / 2),
        computed = iteratee(array[mid]),
        othIsDefined = computed !== undefined,
        othIsNull = computed === null,
        othIsReflexive = computed === computed,
        othIsSymbol = isSymbol(computed);

    if (valIsNaN) {
      var setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? computed <= value : computed < value;
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

module.exports = baseSortedIndexBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlU29ydGVkSW5kZXhCeS5qcyJdLCJuYW1lcyI6WyJpc1N5bWJvbCIsInJlcXVpcmUiLCJNQVhfQVJSQVlfTEVOR1RIIiwiTUFYX0FSUkFZX0lOREVYIiwibmF0aXZlRmxvb3IiLCJNYXRoIiwiZmxvb3IiLCJuYXRpdmVNaW4iLCJtaW4iLCJiYXNlU29ydGVkSW5kZXhCeSIsImFycmF5IiwidmFsdWUiLCJpdGVyYXRlZSIsInJldEhpZ2hlc3QiLCJsb3ciLCJoaWdoIiwibGVuZ3RoIiwidmFsSXNOYU4iLCJ2YWxJc051bGwiLCJ2YWxJc1N5bWJvbCIsInZhbElzVW5kZWZpbmVkIiwidW5kZWZpbmVkIiwibWlkIiwiY29tcHV0ZWQiLCJvdGhJc0RlZmluZWQiLCJvdGhJc051bGwiLCJvdGhJc1JlZmxleGl2ZSIsIm90aElzU3ltYm9sIiwic2V0TG93IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLFlBQVIsQ0FBZjs7QUFFQTtBQUNBLElBQUlDLG1CQUFtQixVQUF2QjtBQUFBLElBQ0lDLGtCQUFrQkQsbUJBQW1CLENBRHpDOztBQUdBO0FBQ0EsSUFBSUUsY0FBY0MsS0FBS0MsS0FBdkI7QUFBQSxJQUNJQyxZQUFZRixLQUFLRyxHQURyQjs7QUFHQTs7Ozs7Ozs7Ozs7OztBQWFBLFNBQVNDLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUNDLFFBQXpDLEVBQW1EQyxVQUFuRCxFQUErRDtBQUM3REYsVUFBUUMsU0FBU0QsS0FBVCxDQUFSOztBQUVBLE1BQUlHLE1BQU0sQ0FBVjtBQUFBLE1BQ0lDLE9BQU9MLFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTU0sTUFEckM7QUFBQSxNQUVJQyxXQUFXTixVQUFVQSxLQUZ6QjtBQUFBLE1BR0lPLFlBQVlQLFVBQVUsSUFIMUI7QUFBQSxNQUlJUSxjQUFjbkIsU0FBU1csS0FBVCxDQUpsQjtBQUFBLE1BS0lTLGlCQUFpQlQsVUFBVVUsU0FML0I7O0FBT0EsU0FBT1AsTUFBTUMsSUFBYixFQUFtQjtBQUNqQixRQUFJTyxNQUFNbEIsWUFBWSxDQUFDVSxNQUFNQyxJQUFQLElBQWUsQ0FBM0IsQ0FBVjtBQUFBLFFBQ0lRLFdBQVdYLFNBQVNGLE1BQU1ZLEdBQU4sQ0FBVCxDQURmO0FBQUEsUUFFSUUsZUFBZUQsYUFBYUYsU0FGaEM7QUFBQSxRQUdJSSxZQUFZRixhQUFhLElBSDdCO0FBQUEsUUFJSUcsaUJBQWlCSCxhQUFhQSxRQUpsQztBQUFBLFFBS0lJLGNBQWMzQixTQUFTdUIsUUFBVCxDQUxsQjs7QUFPQSxRQUFJTixRQUFKLEVBQWM7QUFDWixVQUFJVyxTQUFTZixjQUFjYSxjQUEzQjtBQUNELEtBRkQsTUFFTyxJQUFJTixjQUFKLEVBQW9CO0FBQ3pCUSxlQUFTRixtQkFBbUJiLGNBQWNXLFlBQWpDLENBQVQ7QUFDRCxLQUZNLE1BRUEsSUFBSU4sU0FBSixFQUFlO0FBQ3BCVSxlQUFTRixrQkFBa0JGLFlBQWxCLEtBQW1DWCxjQUFjLENBQUNZLFNBQWxELENBQVQ7QUFDRCxLQUZNLE1BRUEsSUFBSU4sV0FBSixFQUFpQjtBQUN0QlMsZUFBU0Ysa0JBQWtCRixZQUFsQixJQUFrQyxDQUFDQyxTQUFuQyxLQUFpRFosY0FBYyxDQUFDYyxXQUFoRSxDQUFUO0FBQ0QsS0FGTSxNQUVBLElBQUlGLGFBQWFFLFdBQWpCLEVBQThCO0FBQ25DQyxlQUFTLEtBQVQ7QUFDRCxLQUZNLE1BRUE7QUFDTEEsZUFBU2YsYUFBY1UsWUFBWVosS0FBMUIsR0FBb0NZLFdBQVdaLEtBQXhEO0FBQ0Q7QUFDRCxRQUFJaUIsTUFBSixFQUFZO0FBQ1ZkLFlBQU1RLE1BQU0sQ0FBWjtBQUNELEtBRkQsTUFFTztBQUNMUCxhQUFPTyxHQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU9mLFVBQVVRLElBQVYsRUFBZ0JaLGVBQWhCLENBQVA7QUFDRDs7QUFFRDBCLE9BQU9DLE9BQVAsR0FBaUJyQixpQkFBakIiLCJmaWxlIjoiX2Jhc2VTb3J0ZWRJbmRleEJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB0aGUgbWF4aW11bSBsZW5ndGggYW5kIGluZGV4IG9mIGFuIGFycmF5LiAqL1xudmFyIE1BWF9BUlJBWV9MRU5HVEggPSA0Mjk0OTY3Mjk1LFxuICAgIE1BWF9BUlJBWV9JTkRFWCA9IE1BWF9BUlJBWV9MRU5HVEggLSAxO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlRmxvb3IgPSBNYXRoLmZsb29yLFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNvcnRlZEluZGV4QnlgIGFuZCBgXy5zb3J0ZWRMYXN0SW5kZXhCeWBcbiAqIHdoaWNoIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgYHZhbHVlYCBhbmQgZWFjaCBlbGVtZW50IG9mIGBhcnJheWAgdG8gY29tcHV0ZVxuICogdGhlaXIgc29ydCByYW5raW5nLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDsgKHZhbHVlKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIHNvcnRlZCBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gZXZhbHVhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JldEhpZ2hlc3RdIFNwZWNpZnkgcmV0dXJuaW5nIHRoZSBoaWdoZXN0IHF1YWxpZmllZCBpbmRleC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IGF0IHdoaWNoIGB2YWx1ZWAgc2hvdWxkIGJlIGluc2VydGVkXG4gKiAgaW50byBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU29ydGVkSW5kZXhCeShhcnJheSwgdmFsdWUsIGl0ZXJhdGVlLCByZXRIaWdoZXN0KSB7XG4gIHZhbHVlID0gaXRlcmF0ZWUodmFsdWUpO1xuXG4gIHZhciBsb3cgPSAwLFxuICAgICAgaGlnaCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgdmFsSXNOYU4gPSB2YWx1ZSAhPT0gdmFsdWUsXG4gICAgICB2YWxJc051bGwgPSB2YWx1ZSA9PT0gbnVsbCxcbiAgICAgIHZhbElzU3ltYm9sID0gaXNTeW1ib2wodmFsdWUpLFxuICAgICAgdmFsSXNVbmRlZmluZWQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgdmFyIG1pZCA9IG5hdGl2ZUZsb29yKChsb3cgKyBoaWdoKSAvIDIpLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKGFycmF5W21pZF0pLFxuICAgICAgICBvdGhJc0RlZmluZWQgPSBjb21wdXRlZCAhPT0gdW5kZWZpbmVkLFxuICAgICAgICBvdGhJc051bGwgPSBjb21wdXRlZCA9PT0gbnVsbCxcbiAgICAgICAgb3RoSXNSZWZsZXhpdmUgPSBjb21wdXRlZCA9PT0gY29tcHV0ZWQsXG4gICAgICAgIG90aElzU3ltYm9sID0gaXNTeW1ib2woY29tcHV0ZWQpO1xuXG4gICAgaWYgKHZhbElzTmFOKSB7XG4gICAgICB2YXIgc2V0TG93ID0gcmV0SGlnaGVzdCB8fCBvdGhJc1JlZmxleGl2ZTtcbiAgICB9IGVsc2UgaWYgKHZhbElzVW5kZWZpbmVkKSB7XG4gICAgICBzZXRMb3cgPSBvdGhJc1JlZmxleGl2ZSAmJiAocmV0SGlnaGVzdCB8fCBvdGhJc0RlZmluZWQpO1xuICAgIH0gZWxzZSBpZiAodmFsSXNOdWxsKSB7XG4gICAgICBzZXRMb3cgPSBvdGhJc1JlZmxleGl2ZSAmJiBvdGhJc0RlZmluZWQgJiYgKHJldEhpZ2hlc3QgfHwgIW90aElzTnVsbCk7XG4gICAgfSBlbHNlIGlmICh2YWxJc1N5bWJvbCkge1xuICAgICAgc2V0TG93ID0gb3RoSXNSZWZsZXhpdmUgJiYgb3RoSXNEZWZpbmVkICYmICFvdGhJc051bGwgJiYgKHJldEhpZ2hlc3QgfHwgIW90aElzU3ltYm9sKTtcbiAgICB9IGVsc2UgaWYgKG90aElzTnVsbCB8fCBvdGhJc1N5bWJvbCkge1xuICAgICAgc2V0TG93ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldExvdyA9IHJldEhpZ2hlc3QgPyAoY29tcHV0ZWQgPD0gdmFsdWUpIDogKGNvbXB1dGVkIDwgdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoc2V0TG93KSB7XG4gICAgICBsb3cgPSBtaWQgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWdoID0gbWlkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmF0aXZlTWluKGhpZ2gsIE1BWF9BUlJBWV9JTkRFWCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVNvcnRlZEluZGV4Qnk7XG4iXX0=