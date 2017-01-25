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
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
        ++result;
    }
    return result;
}

module.exports = unicodeSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL191bmljb2RlU2l6ZS5qcyJdLCJuYW1lcyI6WyJyc0FzdHJhbFJhbmdlIiwicnNDb21ib01hcmtzUmFuZ2UiLCJyZUNvbWJvSGFsZk1hcmtzUmFuZ2UiLCJyc0NvbWJvU3ltYm9sc1JhbmdlIiwicnNDb21ib1JhbmdlIiwicnNWYXJSYW5nZSIsInJzQXN0cmFsIiwicnNDb21ibyIsInJzRml0eiIsInJzTW9kaWZpZXIiLCJyc05vbkFzdHJhbCIsInJzUmVnaW9uYWwiLCJyc1N1cnJQYWlyIiwicnNaV0oiLCJyZU9wdE1vZCIsInJzT3B0VmFyIiwicnNPcHRKb2luIiwiam9pbiIsInJzU2VxIiwicnNTeW1ib2wiLCJyZVVuaWNvZGUiLCJSZWdFeHAiLCJ1bmljb2RlU2l6ZSIsInN0cmluZyIsInJlc3VsdCIsImxhc3RJbmRleCIsInRlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsZ0JBQWdCLGlCQUFwQjtBQUFBLElBQ0lDLG9CQUFvQixpQkFEeEI7QUFBQSxJQUVJQyx3QkFBd0IsaUJBRjVCO0FBQUEsSUFHSUMsc0JBQXNCLGlCQUgxQjtBQUFBLElBSUlDLGVBQWVILG9CQUFvQkMscUJBQXBCLEdBQTRDQyxtQkFKL0Q7QUFBQSxJQUtJRSxhQUFhLGdCQUxqQjs7QUFPQTtBQUNBLElBQUlDLFdBQVcsTUFBTU4sYUFBTixHQUFzQixHQUFyQztBQUFBLElBQ0lPLFVBQVUsTUFBTUgsWUFBTixHQUFxQixHQURuQztBQUFBLElBRUlJLFNBQVMsMEJBRmI7QUFBQSxJQUdJQyxhQUFhLFFBQVFGLE9BQVIsR0FBa0IsR0FBbEIsR0FBd0JDLE1BQXhCLEdBQWlDLEdBSGxEO0FBQUEsSUFJSUUsY0FBYyxPQUFPVixhQUFQLEdBQXVCLEdBSnpDO0FBQUEsSUFLSVcsYUFBYSxpQ0FMakI7QUFBQSxJQU1JQyxhQUFhLG9DQU5qQjtBQUFBLElBT0lDLFFBQVEsU0FQWjs7QUFTQTtBQUNBLElBQUlDLFdBQVdMLGFBQWEsR0FBNUI7QUFBQSxJQUNJTSxXQUFXLE1BQU1WLFVBQU4sR0FBbUIsSUFEbEM7QUFBQSxJQUVJVyxZQUFZLFFBQVFILEtBQVIsR0FBZ0IsS0FBaEIsR0FBd0IsQ0FBQ0gsV0FBRCxFQUFjQyxVQUFkLEVBQTBCQyxVQUExQixFQUFzQ0ssSUFBdEMsQ0FBMkMsR0FBM0MsQ0FBeEIsR0FBMEUsR0FBMUUsR0FBZ0ZGLFFBQWhGLEdBQTJGRCxRQUEzRixHQUFzRyxJQUZ0SDtBQUFBLElBR0lJLFFBQVFILFdBQVdELFFBQVgsR0FBc0JFLFNBSGxDO0FBQUEsSUFJSUcsV0FBVyxRQUFRLENBQUNULGNBQWNILE9BQWQsR0FBd0IsR0FBekIsRUFBOEJBLE9BQTlCLEVBQXVDSSxVQUF2QyxFQUFtREMsVUFBbkQsRUFBK0ROLFFBQS9ELEVBQXlFVyxJQUF6RSxDQUE4RSxHQUE5RSxDQUFSLEdBQTZGLEdBSjVHOztBQU1BO0FBQ0EsSUFBSUcsWUFBWUMsT0FBT2IsU0FBUyxLQUFULEdBQWlCQSxNQUFqQixHQUEwQixJQUExQixHQUFpQ1csUUFBakMsR0FBNENELEtBQW5ELEVBQTBELEdBQTFELENBQWhCOztBQUVBOzs7Ozs7O0FBT0EsU0FBU0ksV0FBVCxDQUFxQkMsTUFBckIsRUFBNkI7QUFDM0IsUUFBSUMsU0FBU0osVUFBVUssU0FBVixHQUFzQixDQUFuQztBQUNBLFdBQU9MLFVBQVVNLElBQVYsQ0FBZUgsTUFBZixDQUFQLEVBQStCO0FBQzdCLFVBQUVDLE1BQUY7QUFDRDtBQUNELFdBQU9BLE1BQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQk4sV0FBakIiLCJmaWxlIjoiX3VuaWNvZGVTaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZicsXG4gICAgcmVDb21ib0hhbGZNYXJrc1JhbmdlID0gJ1xcXFx1ZmUyMC1cXFxcdWZlMmYnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmZicsXG4gICAgcnNDb21ib1JhbmdlID0gcnNDb21ib01hcmtzUmFuZ2UgKyByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXN0cmFsID0gJ1snICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib1JhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc1N5bWJvbCA9ICcoPzonICsgW3JzTm9uQXN0cmFsICsgcnNDb21ibyArICc/JywgcnNDb21ibywgcnNSZWdpb25hbCwgcnNTdXJyUGFpciwgcnNBc3RyYWxdLmpvaW4oJ3wnKSArICcpJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggW3N0cmluZyBzeW1ib2xzXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC11bmljb2RlKS4gKi9cbnZhciByZVVuaWNvZGUgPSBSZWdFeHAocnNGaXR6ICsgJyg/PScgKyByc0ZpdHogKyAnKXwnICsgcnNTeW1ib2wgKyByc1NlcSwgJ2cnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzaXplIG9mIGEgVW5pY29kZSBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzdHJpbmcgc2l6ZS5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVNpemUoc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSByZVVuaWNvZGUubGFzdEluZGV4ID0gMDtcbiAgd2hpbGUgKHJlVW5pY29kZS50ZXN0KHN0cmluZykpIHtcbiAgICArK3Jlc3VsdDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaWNvZGVTaXplO1xuIl19