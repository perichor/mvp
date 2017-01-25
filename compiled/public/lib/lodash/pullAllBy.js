'use strict';

var baseIteratee = require('./_baseIteratee'),
    basePullAll = require('./_basePullAll');

/**
 * This method is like `_.pullAll` except that it accepts `iteratee` which is
 * invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The iteratee is invoked with one argument: (value).
 *
 * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 *
 * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
 * console.log(array);
 * // => [{ 'x': 2 }]
 */
function pullAllBy(array, values, iteratee) {
    return array && array.length && values && values.length ? basePullAll(array, values, baseIteratee(iteratee, 2)) : array;
}

module.exports = pullAllBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3B1bGxBbGxCeS5qcyJdLCJuYW1lcyI6WyJiYXNlSXRlcmF0ZWUiLCJyZXF1aXJlIiwiYmFzZVB1bGxBbGwiLCJwdWxsQWxsQnkiLCJhcnJheSIsInZhbHVlcyIsIml0ZXJhdGVlIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxnQkFBUixDQURsQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsU0FBU0UsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxFQUE0QztBQUMxQyxXQUFRRixTQUFTQSxNQUFNRyxNQUFmLElBQXlCRixNQUF6QixJQUFtQ0EsT0FBT0UsTUFBM0MsR0FDSEwsWUFBWUUsS0FBWixFQUFtQkMsTUFBbkIsRUFBMkJMLGFBQWFNLFFBQWIsRUFBdUIsQ0FBdkIsQ0FBM0IsQ0FERyxHQUVIRixLQUZKO0FBR0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJOLFNBQWpCIiwiZmlsZSI6InB1bGxBbGxCeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBiYXNlUHVsbEFsbCA9IHJlcXVpcmUoJy4vX2Jhc2VQdWxsQWxsJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5wdWxsQWxsYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBpdGVyYXRlZWAgd2hpY2ggaXNcbiAqIGludm9rZWQgZm9yIGVhY2ggZWxlbWVudCBvZiBgYXJyYXlgIGFuZCBgdmFsdWVzYCB0byBnZW5lcmF0ZSB0aGUgY3JpdGVyaW9uXG4gKiBieSB3aGljaCB0aGV5J3JlIGNvbXBhcmVkLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogKHZhbHVlKS5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLmRpZmZlcmVuY2VCeWAsIHRoaXMgbWV0aG9kIG11dGF0ZXMgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byByZW1vdmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5ID0gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAzIH0sIHsgJ3gnOiAxIH1dO1xuICpcbiAqIF8ucHVsbEFsbEJ5KGFycmF5LCBbeyAneCc6IDEgfSwgeyAneCc6IDMgfV0sICd4Jyk7XG4gKiBjb25zb2xlLmxvZyhhcnJheSk7XG4gKiAvLyA9PiBbeyAneCc6IDIgfV1cbiAqL1xuZnVuY3Rpb24gcHVsbEFsbEJ5KGFycmF5LCB2YWx1ZXMsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoICYmIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoKVxuICAgID8gYmFzZVB1bGxBbGwoYXJyYXksIHZhbHVlcywgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCAyKSlcbiAgICA6IGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHB1bGxBbGxCeTtcbiJdfQ==