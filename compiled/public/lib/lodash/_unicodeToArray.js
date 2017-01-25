'use strict';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
    return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL191bmljb2RlVG9BcnJheS5qcyJdLCJuYW1lcyI6WyJyc0FzdHJhbFJhbmdlIiwicnNDb21ib01hcmtzUmFuZ2UiLCJyZUNvbWJvSGFsZk1hcmtzUmFuZ2UiLCJyc0NvbWJvU3ltYm9sc1JhbmdlIiwicnNDb21ib1JhbmdlIiwicnNWYXJSYW5nZSIsInJzQXN0cmFsIiwicnNDb21ibyIsInJzRml0eiIsInJzTW9kaWZpZXIiLCJyc05vbkFzdHJhbCIsInJzUmVnaW9uYWwiLCJyc1N1cnJQYWlyIiwicnNaV0oiLCJyZU9wdE1vZCIsInJzT3B0VmFyIiwicnNPcHRKb2luIiwiam9pbiIsInJzU2VxIiwicnNTeW1ib2wiLCJyZVVuaWNvZGUiLCJSZWdFeHAiLCJ1bmljb2RlVG9BcnJheSIsInN0cmluZyIsIm1hdGNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLGdCQUFnQixpQkFBcEI7QUFBQSxJQUNJQyxvQkFBb0IsaUJBRHhCO0FBQUEsSUFFSUMsd0JBQXdCLGlCQUY1QjtBQUFBLElBR0lDLHNCQUFzQixpQkFIMUI7QUFBQSxJQUlJQyxlQUFlSCxvQkFBb0JDLHFCQUFwQixHQUE0Q0MsbUJBSi9EO0FBQUEsSUFLSUUsYUFBYSxnQkFMakI7O0FBT0E7QUFDQSxJQUFJQyxXQUFXLE1BQU1OLGFBQU4sR0FBc0IsR0FBckM7QUFBQSxJQUNJTyxVQUFVLE1BQU1ILFlBQU4sR0FBcUIsR0FEbkM7QUFBQSxJQUVJSSxTQUFTLDBCQUZiO0FBQUEsSUFHSUMsYUFBYSxRQUFRRixPQUFSLEdBQWtCLEdBQWxCLEdBQXdCQyxNQUF4QixHQUFpQyxHQUhsRDtBQUFBLElBSUlFLGNBQWMsT0FBT1YsYUFBUCxHQUF1QixHQUp6QztBQUFBLElBS0lXLGFBQWEsaUNBTGpCO0FBQUEsSUFNSUMsYUFBYSxvQ0FOakI7QUFBQSxJQU9JQyxRQUFRLFNBUFo7O0FBU0E7QUFDQSxJQUFJQyxXQUFXTCxhQUFhLEdBQTVCO0FBQUEsSUFDSU0sV0FBVyxNQUFNVixVQUFOLEdBQW1CLElBRGxDO0FBQUEsSUFFSVcsWUFBWSxRQUFRSCxLQUFSLEdBQWdCLEtBQWhCLEdBQXdCLENBQUNILFdBQUQsRUFBY0MsVUFBZCxFQUEwQkMsVUFBMUIsRUFBc0NLLElBQXRDLENBQTJDLEdBQTNDLENBQXhCLEdBQTBFLEdBQTFFLEdBQWdGRixRQUFoRixHQUEyRkQsUUFBM0YsR0FBc0csSUFGdEg7QUFBQSxJQUdJSSxRQUFRSCxXQUFXRCxRQUFYLEdBQXNCRSxTQUhsQztBQUFBLElBSUlHLFdBQVcsUUFBUSxDQUFDVCxjQUFjSCxPQUFkLEdBQXdCLEdBQXpCLEVBQThCQSxPQUE5QixFQUF1Q0ksVUFBdkMsRUFBbURDLFVBQW5ELEVBQStETixRQUEvRCxFQUF5RVcsSUFBekUsQ0FBOEUsR0FBOUUsQ0FBUixHQUE2RixHQUo1Rzs7QUFNQTtBQUNBLElBQUlHLFlBQVlDLE9BQU9iLFNBQVMsS0FBVCxHQUFpQkEsTUFBakIsR0FBMEIsSUFBMUIsR0FBaUNXLFFBQWpDLEdBQTRDRCxLQUFuRCxFQUEwRCxHQUExRCxDQUFoQjs7QUFFQTs7Ozs7OztBQU9BLFNBQVNJLGNBQVQsQ0FBd0JDLE1BQXhCLEVBQWdDO0FBQzlCLFdBQU9BLE9BQU9DLEtBQVAsQ0FBYUosU0FBYixLQUEyQixFQUFsQztBQUNEOztBQUVESyxPQUFPQyxPQUFQLEdBQWlCSixjQUFqQiIsImZpbGUiOiJfdW5pY29kZVRvQXJyYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzU3ltYm9sID0gJyg/OicgKyBbcnNOb25Bc3RyYWwgKyByc0NvbWJvICsgJz8nLCByc0NvbWJvLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyLCByc0FzdHJhbF0uam9pbignfCcpICsgJyknO1xuXG4vKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xudmFyIHJlVW5pY29kZSA9IFJlZ0V4cChyc0ZpdHogKyAnKD89JyArIHJzRml0eiArICcpfCcgKyByc1N5bWJvbCArIHJzU2VxLCAnZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmljb2RlVG9BcnJheTtcbiJdfQ==