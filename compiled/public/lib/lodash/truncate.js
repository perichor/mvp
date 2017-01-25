'use strict';

var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    hasUnicode = require('./_hasUnicode'),
    isObject = require('./isObject'),
    isRegExp = require('./isRegExp'),
    stringSize = require('./_stringSize'),
    stringToArray = require('./_stringToArray'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/** Used as default options for `_.truncate`. */
var DEFAULT_TRUNC_LENGTH = 30,
    DEFAULT_TRUNC_OMISSION = '...';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to truncate.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.length=30] The maximum string length.
 * @param {string} [options.omission='...'] The string to indicate text is omitted.
 * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
 * @returns {string} Returns the truncated string.
 * @example
 *
 * _.truncate('hi-diddly-ho there, neighborino');
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': ' '
 * });
 * // => 'hi-diddly-ho there,...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': /,? +/
 * });
 * // => 'hi-diddly-ho there...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'omission': ' [...]'
 * });
 * // => 'hi-diddly-ho there, neig [...]'
 */
function truncate(string, options) {
  var length = DEFAULT_TRUNC_LENGTH,
      omission = DEFAULT_TRUNC_OMISSION;

  if (isObject(options)) {
    var separator = 'separator' in options ? options.separator : separator;
    length = 'length' in options ? toInteger(options.length) : length;
    omission = 'omission' in options ? baseToString(options.omission) : omission;
  }
  string = toString(string);

  var strLength = string.length;
  if (hasUnicode(string)) {
    var strSymbols = stringToArray(string);
    strLength = strSymbols.length;
  }
  if (length >= strLength) {
    return string;
  }
  var end = length - stringSize(omission);
  if (end < 1) {
    return omission;
  }
  var result = strSymbols ? castSlice(strSymbols, 0, end).join('') : string.slice(0, end);

  if (separator === undefined) {
    return result + omission;
  }
  if (strSymbols) {
    end += result.length - end;
  }
  if (isRegExp(separator)) {
    if (string.slice(end).search(separator)) {
      var match,
          substring = result;

      if (!separator.global) {
        separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
      }
      separator.lastIndex = 0;
      while (match = separator.exec(substring)) {
        var newEnd = match.index;
      }
      result = result.slice(0, newEnd === undefined ? end : newEnd);
    }
  } else if (string.indexOf(baseToString(separator), end) != end) {
    var index = result.lastIndexOf(separator);
    if (index > -1) {
      result = result.slice(0, index);
    }
  }
  return result + omission;
}

module.exports = truncate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RydW5jYXRlLmpzIl0sIm5hbWVzIjpbImJhc2VUb1N0cmluZyIsInJlcXVpcmUiLCJjYXN0U2xpY2UiLCJoYXNVbmljb2RlIiwiaXNPYmplY3QiLCJpc1JlZ0V4cCIsInN0cmluZ1NpemUiLCJzdHJpbmdUb0FycmF5IiwidG9JbnRlZ2VyIiwidG9TdHJpbmciLCJERUZBVUxUX1RSVU5DX0xFTkdUSCIsIkRFRkFVTFRfVFJVTkNfT01JU1NJT04iLCJyZUZsYWdzIiwidHJ1bmNhdGUiLCJzdHJpbmciLCJvcHRpb25zIiwibGVuZ3RoIiwib21pc3Npb24iLCJzZXBhcmF0b3IiLCJzdHJMZW5ndGgiLCJzdHJTeW1ib2xzIiwiZW5kIiwicmVzdWx0Iiwiam9pbiIsInNsaWNlIiwidW5kZWZpbmVkIiwic2VhcmNoIiwibWF0Y2giLCJzdWJzdHJpbmciLCJnbG9iYWwiLCJSZWdFeHAiLCJzb3VyY2UiLCJleGVjIiwibGFzdEluZGV4IiwibmV3RW5kIiwiaW5kZXgiLCJpbmRleE9mIiwibGFzdEluZGV4T2YiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGVBQWVDLFFBQVEsaUJBQVIsQ0FBbkI7QUFBQSxJQUNJQyxZQUFZRCxRQUFRLGNBQVIsQ0FEaEI7QUFBQSxJQUVJRSxhQUFhRixRQUFRLGVBQVIsQ0FGakI7QUFBQSxJQUdJRyxXQUFXSCxRQUFRLFlBQVIsQ0FIZjtBQUFBLElBSUlJLFdBQVdKLFFBQVEsWUFBUixDQUpmO0FBQUEsSUFLSUssYUFBYUwsUUFBUSxlQUFSLENBTGpCO0FBQUEsSUFNSU0sZ0JBQWdCTixRQUFRLGtCQUFSLENBTnBCO0FBQUEsSUFPSU8sWUFBWVAsUUFBUSxhQUFSLENBUGhCO0FBQUEsSUFRSVEsV0FBV1IsUUFBUSxZQUFSLENBUmY7O0FBVUE7QUFDQSxJQUFJUyx1QkFBdUIsRUFBM0I7QUFBQSxJQUNJQyx5QkFBeUIsS0FEN0I7O0FBR0E7QUFDQSxJQUFJQyxVQUFVLE1BQWQ7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQ0EsU0FBU0MsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEJDLE9BQTFCLEVBQW1DO0FBQ2pDLE1BQUlDLFNBQVNOLG9CQUFiO0FBQUEsTUFDSU8sV0FBV04sc0JBRGY7O0FBR0EsTUFBSVAsU0FBU1csT0FBVCxDQUFKLEVBQXVCO0FBQ3JCLFFBQUlHLFlBQVksZUFBZUgsT0FBZixHQUF5QkEsUUFBUUcsU0FBakMsR0FBNkNBLFNBQTdEO0FBQ0FGLGFBQVMsWUFBWUQsT0FBWixHQUFzQlAsVUFBVU8sUUFBUUMsTUFBbEIsQ0FBdEIsR0FBa0RBLE1BQTNEO0FBQ0FDLGVBQVcsY0FBY0YsT0FBZCxHQUF3QmYsYUFBYWUsUUFBUUUsUUFBckIsQ0FBeEIsR0FBeURBLFFBQXBFO0FBQ0Q7QUFDREgsV0FBU0wsU0FBU0ssTUFBVCxDQUFUOztBQUVBLE1BQUlLLFlBQVlMLE9BQU9FLE1BQXZCO0FBQ0EsTUFBSWIsV0FBV1csTUFBWCxDQUFKLEVBQXdCO0FBQ3RCLFFBQUlNLGFBQWFiLGNBQWNPLE1BQWQsQ0FBakI7QUFDQUssZ0JBQVlDLFdBQVdKLE1BQXZCO0FBQ0Q7QUFDRCxNQUFJQSxVQUFVRyxTQUFkLEVBQXlCO0FBQ3ZCLFdBQU9MLE1BQVA7QUFDRDtBQUNELE1BQUlPLE1BQU1MLFNBQVNWLFdBQVdXLFFBQVgsQ0FBbkI7QUFDQSxNQUFJSSxNQUFNLENBQVYsRUFBYTtBQUNYLFdBQU9KLFFBQVA7QUFDRDtBQUNELE1BQUlLLFNBQVNGLGFBQ1RsQixVQUFVa0IsVUFBVixFQUFzQixDQUF0QixFQUF5QkMsR0FBekIsRUFBOEJFLElBQTlCLENBQW1DLEVBQW5DLENBRFMsR0FFVFQsT0FBT1UsS0FBUCxDQUFhLENBQWIsRUFBZ0JILEdBQWhCLENBRko7O0FBSUEsTUFBSUgsY0FBY08sU0FBbEIsRUFBNkI7QUFDM0IsV0FBT0gsU0FBU0wsUUFBaEI7QUFDRDtBQUNELE1BQUlHLFVBQUosRUFBZ0I7QUFDZEMsV0FBUUMsT0FBT04sTUFBUCxHQUFnQkssR0FBeEI7QUFDRDtBQUNELE1BQUloQixTQUFTYSxTQUFULENBQUosRUFBeUI7QUFDdkIsUUFBSUosT0FBT1UsS0FBUCxDQUFhSCxHQUFiLEVBQWtCSyxNQUFsQixDQUF5QlIsU0FBekIsQ0FBSixFQUF5QztBQUN2QyxVQUFJUyxLQUFKO0FBQUEsVUFDSUMsWUFBWU4sTUFEaEI7O0FBR0EsVUFBSSxDQUFDSixVQUFVVyxNQUFmLEVBQXVCO0FBQ3JCWCxvQkFBWVksT0FBT1osVUFBVWEsTUFBakIsRUFBeUJ0QixTQUFTRyxRQUFRb0IsSUFBUixDQUFhZCxTQUFiLENBQVQsSUFBb0MsR0FBN0QsQ0FBWjtBQUNEO0FBQ0RBLGdCQUFVZSxTQUFWLEdBQXNCLENBQXRCO0FBQ0EsYUFBUU4sUUFBUVQsVUFBVWMsSUFBVixDQUFlSixTQUFmLENBQWhCLEVBQTRDO0FBQzFDLFlBQUlNLFNBQVNQLE1BQU1RLEtBQW5CO0FBQ0Q7QUFDRGIsZUFBU0EsT0FBT0UsS0FBUCxDQUFhLENBQWIsRUFBZ0JVLFdBQVdULFNBQVgsR0FBdUJKLEdBQXZCLEdBQTZCYSxNQUE3QyxDQUFUO0FBQ0Q7QUFDRixHQWRELE1BY08sSUFBSXBCLE9BQU9zQixPQUFQLENBQWVwQyxhQUFha0IsU0FBYixDQUFmLEVBQXdDRyxHQUF4QyxLQUFnREEsR0FBcEQsRUFBeUQ7QUFDOUQsUUFBSWMsUUFBUWIsT0FBT2UsV0FBUCxDQUFtQm5CLFNBQW5CLENBQVo7QUFDQSxRQUFJaUIsUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDZGIsZUFBU0EsT0FBT0UsS0FBUCxDQUFhLENBQWIsRUFBZ0JXLEtBQWhCLENBQVQ7QUFDRDtBQUNGO0FBQ0QsU0FBT2IsU0FBU0wsUUFBaEI7QUFDRDs7QUFFRHFCLE9BQU9DLE9BQVAsR0FBaUIxQixRQUFqQiIsImZpbGUiOiJ0cnVuY2F0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKSxcbiAgICBjYXN0U2xpY2UgPSByZXF1aXJlKCcuL19jYXN0U2xpY2UnKSxcbiAgICBoYXNVbmljb2RlID0gcmVxdWlyZSgnLi9faGFzVW5pY29kZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzUmVnRXhwID0gcmVxdWlyZSgnLi9pc1JlZ0V4cCcpLFxuICAgIHN0cmluZ1NpemUgPSByZXF1aXJlKCcuL19zdHJpbmdTaXplJyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpLFxuICAgIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG4vKiogVXNlZCBhcyBkZWZhdWx0IG9wdGlvbnMgZm9yIGBfLnRydW5jYXRlYC4gKi9cbnZhciBERUZBVUxUX1RSVU5DX0xFTkdUSCA9IDMwLFxuICAgIERFRkFVTFRfVFJVTkNfT01JU1NJT04gPSAnLi4uJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgZmxhZ3MgZnJvbSB0aGVpciBjb2VyY2VkIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVGbGFncyA9IC9cXHcqJC87XG5cbi8qKlxuICogVHJ1bmNhdGVzIGBzdHJpbmdgIGlmIGl0J3MgbG9uZ2VyIHRoYW4gdGhlIGdpdmVuIG1heGltdW0gc3RyaW5nIGxlbmd0aC5cbiAqIFRoZSBsYXN0IGNoYXJhY3RlcnMgb2YgdGhlIHRydW5jYXRlZCBzdHJpbmcgYXJlIHJlcGxhY2VkIHdpdGggdGhlIG9taXNzaW9uXG4gKiBzdHJpbmcgd2hpY2ggZGVmYXVsdHMgdG8gXCIuLi5cIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byB0cnVuY2F0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmxlbmd0aD0zMF0gVGhlIG1heGltdW0gc3RyaW5nIGxlbmd0aC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5vbWlzc2lvbj0nLi4uJ10gVGhlIHN0cmluZyB0byBpbmRpY2F0ZSB0ZXh0IGlzIG9taXR0ZWQuXG4gKiBAcGFyYW0ge1JlZ0V4cHxzdHJpbmd9IFtvcHRpb25zLnNlcGFyYXRvcl0gVGhlIHNlcGFyYXRvciBwYXR0ZXJuIHRvIHRydW5jYXRlIHRvLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgdHJ1bmNhdGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50cnVuY2F0ZSgnaGktZGlkZGx5LWhvIHRoZXJlLCBuZWlnaGJvcmlubycpO1xuICogLy8gPT4gJ2hpLWRpZGRseS1obyB0aGVyZSwgbmVpZ2hiby4uLidcbiAqXG4gKiBfLnRydW5jYXRlKCdoaS1kaWRkbHktaG8gdGhlcmUsIG5laWdoYm9yaW5vJywge1xuICogICAnbGVuZ3RoJzogMjQsXG4gKiAgICdzZXBhcmF0b3InOiAnICdcbiAqIH0pO1xuICogLy8gPT4gJ2hpLWRpZGRseS1obyB0aGVyZSwuLi4nXG4gKlxuICogXy50cnVuY2F0ZSgnaGktZGlkZGx5LWhvIHRoZXJlLCBuZWlnaGJvcmlubycsIHtcbiAqICAgJ2xlbmd0aCc6IDI0LFxuICogICAnc2VwYXJhdG9yJzogLyw/ICsvXG4gKiB9KTtcbiAqIC8vID0+ICdoaS1kaWRkbHktaG8gdGhlcmUuLi4nXG4gKlxuICogXy50cnVuY2F0ZSgnaGktZGlkZGx5LWhvIHRoZXJlLCBuZWlnaGJvcmlubycsIHtcbiAqICAgJ29taXNzaW9uJzogJyBbLi4uXSdcbiAqIH0pO1xuICogLy8gPT4gJ2hpLWRpZGRseS1obyB0aGVyZSwgbmVpZyBbLi4uXSdcbiAqL1xuZnVuY3Rpb24gdHJ1bmNhdGUoc3RyaW5nLCBvcHRpb25zKSB7XG4gIHZhciBsZW5ndGggPSBERUZBVUxUX1RSVU5DX0xFTkdUSCxcbiAgICAgIG9taXNzaW9uID0gREVGQVVMVF9UUlVOQ19PTUlTU0lPTjtcblxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICB2YXIgc2VwYXJhdG9yID0gJ3NlcGFyYXRvcicgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc2VwYXJhdG9yIDogc2VwYXJhdG9yO1xuICAgIGxlbmd0aCA9ICdsZW5ndGgnIGluIG9wdGlvbnMgPyB0b0ludGVnZXIob3B0aW9ucy5sZW5ndGgpIDogbGVuZ3RoO1xuICAgIG9taXNzaW9uID0gJ29taXNzaW9uJyBpbiBvcHRpb25zID8gYmFzZVRvU3RyaW5nKG9wdGlvbnMub21pc3Npb24pIDogb21pc3Npb247XG4gIH1cbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICB2YXIgc3RyTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgaWYgKGhhc1VuaWNvZGUoc3RyaW5nKSkge1xuICAgIHZhciBzdHJTeW1ib2xzID0gc3RyaW5nVG9BcnJheShzdHJpbmcpO1xuICAgIHN0ckxlbmd0aCA9IHN0clN5bWJvbHMubGVuZ3RoO1xuICB9XG4gIGlmIChsZW5ndGggPj0gc3RyTGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuICB2YXIgZW5kID0gbGVuZ3RoIC0gc3RyaW5nU2l6ZShvbWlzc2lvbik7XG4gIGlmIChlbmQgPCAxKSB7XG4gICAgcmV0dXJuIG9taXNzaW9uO1xuICB9XG4gIHZhciByZXN1bHQgPSBzdHJTeW1ib2xzXG4gICAgPyBjYXN0U2xpY2Uoc3RyU3ltYm9scywgMCwgZW5kKS5qb2luKCcnKVxuICAgIDogc3RyaW5nLnNsaWNlKDAsIGVuZCk7XG5cbiAgaWYgKHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlc3VsdCArIG9taXNzaW9uO1xuICB9XG4gIGlmIChzdHJTeW1ib2xzKSB7XG4gICAgZW5kICs9IChyZXN1bHQubGVuZ3RoIC0gZW5kKTtcbiAgfVxuICBpZiAoaXNSZWdFeHAoc2VwYXJhdG9yKSkge1xuICAgIGlmIChzdHJpbmcuc2xpY2UoZW5kKS5zZWFyY2goc2VwYXJhdG9yKSkge1xuICAgICAgdmFyIG1hdGNoLFxuICAgICAgICAgIHN1YnN0cmluZyA9IHJlc3VsdDtcblxuICAgICAgaWYgKCFzZXBhcmF0b3IuZ2xvYmFsKSB7XG4gICAgICAgIHNlcGFyYXRvciA9IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCB0b1N0cmluZyhyZUZsYWdzLmV4ZWMoc2VwYXJhdG9yKSkgKyAnZycpO1xuICAgICAgfVxuICAgICAgc2VwYXJhdG9yLmxhc3RJbmRleCA9IDA7XG4gICAgICB3aGlsZSAoKG1hdGNoID0gc2VwYXJhdG9yLmV4ZWMoc3Vic3RyaW5nKSkpIHtcbiAgICAgICAgdmFyIG5ld0VuZCA9IG1hdGNoLmluZGV4O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gcmVzdWx0LnNsaWNlKDAsIG5ld0VuZCA9PT0gdW5kZWZpbmVkID8gZW5kIDogbmV3RW5kKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc3RyaW5nLmluZGV4T2YoYmFzZVRvU3RyaW5nKHNlcGFyYXRvciksIGVuZCkgIT0gZW5kKSB7XG4gICAgdmFyIGluZGV4ID0gcmVzdWx0Lmxhc3RJbmRleE9mKHNlcGFyYXRvcik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5zbGljZSgwLCBpbmRleCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQgKyBvbWlzc2lvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cnVuY2F0ZTtcbiJdfQ==