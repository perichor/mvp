'use strict';

var baseExtremum = require('./_baseExtremum'),
    baseGt = require('./_baseGt'),
    baseIteratee = require('./_baseIteratee');

/**
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.maxBy(objects, function(o) { return o.n; });
 * // => { 'n': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.maxBy(objects, 'n');
 * // => { 'n': 2 }
 */
function maxBy(array, iteratee) {
    return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt) : undefined;
}

module.exports = maxBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21heEJ5LmpzIl0sIm5hbWVzIjpbImJhc2VFeHRyZW11bSIsInJlcXVpcmUiLCJiYXNlR3QiLCJiYXNlSXRlcmF0ZWUiLCJtYXhCeSIsImFycmF5IiwiaXRlcmF0ZWUiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGVBQWVDLFFBQVEsaUJBQVIsQ0FBbkI7QUFBQSxJQUNJQyxTQUFTRCxRQUFRLFdBQVIsQ0FEYjtBQUFBLElBRUlFLGVBQWVGLFFBQVEsaUJBQVIsQ0FGbkI7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLFNBQVNHLEtBQVQsQ0FBZUMsS0FBZixFQUFzQkMsUUFBdEIsRUFBZ0M7QUFDOUIsV0FBUUQsU0FBU0EsTUFBTUUsTUFBaEIsR0FDSFAsYUFBYUssS0FBYixFQUFvQkYsYUFBYUcsUUFBYixFQUF1QixDQUF2QixDQUFwQixFQUErQ0osTUFBL0MsQ0FERyxHQUVITSxTQUZKO0FBR0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJOLEtBQWpCIiwiZmlsZSI6Im1heEJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VFeHRyZW11bSA9IHJlcXVpcmUoJy4vX2Jhc2VFeHRyZW11bScpLFxuICAgIGJhc2VHdCA9IHJlcXVpcmUoJy4vX2Jhc2VHdCcpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8ubWF4YCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBpdGVyYXRlZWAgd2hpY2ggaXNcbiAqIGludm9rZWQgZm9yIGVhY2ggZWxlbWVudCBpbiBgYXJyYXlgIHRvIGdlbmVyYXRlIHRoZSBjcml0ZXJpb24gYnkgd2hpY2hcbiAqIHRoZSB2YWx1ZSBpcyByYW5rZWQuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiAodmFsdWUpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1heGltdW0gdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW3sgJ24nOiAxIH0sIHsgJ24nOiAyIH1dO1xuICpcbiAqIF8ubWF4Qnkob2JqZWN0cywgZnVuY3Rpb24obykgeyByZXR1cm4gby5uOyB9KTtcbiAqIC8vID0+IHsgJ24nOiAyIH1cbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8ubWF4Qnkob2JqZWN0cywgJ24nKTtcbiAqIC8vID0+IHsgJ24nOiAyIH1cbiAqL1xuZnVuY3Rpb24gbWF4QnkoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZUV4dHJlbXVtKGFycmF5LCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDIpLCBiYXNlR3QpXG4gICAgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWF4Qnk7XG4iXX0=