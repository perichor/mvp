'use strict';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = '[\'\u2019]',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
    rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL191bmljb2RlV29yZHMuanMiXSwibmFtZXMiOlsicnNBc3RyYWxSYW5nZSIsInJzQ29tYm9NYXJrc1JhbmdlIiwicmVDb21ib0hhbGZNYXJrc1JhbmdlIiwicnNDb21ib1N5bWJvbHNSYW5nZSIsInJzQ29tYm9SYW5nZSIsInJzRGluZ2JhdFJhbmdlIiwicnNMb3dlclJhbmdlIiwicnNNYXRoT3BSYW5nZSIsInJzTm9uQ2hhclJhbmdlIiwicnNQdW5jdHVhdGlvblJhbmdlIiwicnNTcGFjZVJhbmdlIiwicnNVcHBlclJhbmdlIiwicnNWYXJSYW5nZSIsInJzQnJlYWtSYW5nZSIsInJzQXBvcyIsInJzQnJlYWsiLCJyc0NvbWJvIiwicnNEaWdpdHMiLCJyc0RpbmdiYXQiLCJyc0xvd2VyIiwicnNNaXNjIiwicnNGaXR6IiwicnNNb2RpZmllciIsInJzTm9uQXN0cmFsIiwicnNSZWdpb25hbCIsInJzU3VyclBhaXIiLCJyc1VwcGVyIiwicnNaV0oiLCJyc01pc2NMb3dlciIsInJzTWlzY1VwcGVyIiwicnNPcHRDb250ckxvd2VyIiwicnNPcHRDb250clVwcGVyIiwicmVPcHRNb2QiLCJyc09wdFZhciIsInJzT3B0Sm9pbiIsImpvaW4iLCJyc09yZExvd2VyIiwicnNPcmRVcHBlciIsInJzU2VxIiwicnNFbW9qaSIsInJlVW5pY29kZVdvcmQiLCJSZWdFeHAiLCJ1bmljb2RlV29yZHMiLCJzdHJpbmciLCJtYXRjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFJQSxnQkFBZ0IsaUJBQXBCO0FBQUEsSUFDSUMsb0JBQW9CLGlCQUR4QjtBQUFBLElBRUlDLHdCQUF3QixpQkFGNUI7QUFBQSxJQUdJQyxzQkFBc0IsaUJBSDFCO0FBQUEsSUFJSUMsZUFBZUgsb0JBQW9CQyxxQkFBcEIsR0FBNENDLG1CQUovRDtBQUFBLElBS0lFLGlCQUFpQixpQkFMckI7QUFBQSxJQU1J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LGVBSlMsRUFLekJNLFVBTHlCLEVBTXpCRCxVQU55QixFQU96Qm5CLFFBUHlCLEVBUXpCc0IsT0FSeUIsRUFTekJKLElBVHlCLENBU3BCLEdBVG9CLENBQVAsRUFTUCxHQVRPLENBQXBCOztBQVdBOzs7Ozs7O0FBT0EsU0FBU08sWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDNUIsV0FBT0EsT0FBT0MsS0FBUCxDQUFhSixhQUFiLEtBQStCLEVBQXRDO0FBQ0Q7O0FBRURLLE9BQU9DLE9BQVAsR0FBaUJKLFlBQWpCIiwiZmlsZSI6Il91bmljb2RlV29yZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNEaW5nYmF0UmFuZ2UgPSAnXFxcXHUyNzAwLVxcXFx1MjdiZicsXG4gICAgcnNMb3dlclJhbmdlID0gJ2EtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZicsXG4gICAgcnNNYXRoT3BSYW5nZSA9ICdcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3JyxcbiAgICByc05vbkNoYXJSYW5nZSA9ICdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmYnLFxuICAgIHJzUHVuY3R1YXRpb25SYW5nZSA9ICdcXFxcdTIwMDAtXFxcXHUyMDZmJyxcbiAgICByc1NwYWNlUmFuZ2UgPSAnIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDAnLFxuICAgIHJzVXBwZXJSYW5nZSA9ICdBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGUnLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJyxcbiAgICByc0JyZWFrUmFuZ2UgPSByc01hdGhPcFJhbmdlICsgcnNOb25DaGFyUmFuZ2UgKyByc1B1bmN0dWF0aW9uUmFuZ2UgKyByc1NwYWNlUmFuZ2U7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0Fwb3MgPSBcIlsnXFx1MjAxOV1cIixcbiAgICByc0JyZWFrID0gJ1snICsgcnNCcmVha1JhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvUmFuZ2UgKyAnXScsXG4gICAgcnNEaWdpdHMgPSAnXFxcXGQrJyxcbiAgICByc0RpbmdiYXQgPSAnWycgKyByc0RpbmdiYXRSYW5nZSArICddJyxcbiAgICByc0xvd2VyID0gJ1snICsgcnNMb3dlclJhbmdlICsgJ10nLFxuICAgIHJzTWlzYyA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgcnNCcmVha1JhbmdlICsgcnNEaWdpdHMgKyByc0RpbmdiYXRSYW5nZSArIHJzTG93ZXJSYW5nZSArIHJzVXBwZXJSYW5nZSArICddJyxcbiAgICByc0ZpdHogPSAnXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdJyxcbiAgICByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknLFxuICAgIHJzTm9uQXN0cmFsID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNSZWdpb25hbCA9ICcoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9JyxcbiAgICByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXScsXG4gICAgcnNVcHBlciA9ICdbJyArIHJzVXBwZXJSYW5nZSArICddJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByc01pc2NMb3dlciA9ICcoPzonICsgcnNMb3dlciArICd8JyArIHJzTWlzYyArICcpJyxcbiAgICByc01pc2NVcHBlciA9ICcoPzonICsgcnNVcHBlciArICd8JyArIHJzTWlzYyArICcpJyxcbiAgICByc09wdENvbnRyTG93ZXIgPSAnKD86JyArIHJzQXBvcyArICcoPzpkfGxsfG18cmV8c3x0fHZlKSk/JyxcbiAgICByc09wdENvbnRyVXBwZXIgPSAnKD86JyArIHJzQXBvcyArICcoPzpEfExMfE18UkV8U3xUfFZFKSk/JyxcbiAgICByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzT3JkTG93ZXIgPSAnXFxcXGQqKD86KD86MXN0fDJuZHwzcmR8KD8hWzEyM10pXFxcXGR0aClcXFxcYiknLFxuICAgIHJzT3JkVXBwZXIgPSAnXFxcXGQqKD86KD86MVNUfDJORHwzUkR8KD8hWzEyM10pXFxcXGRUSClcXFxcYiknLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc0Vtb2ppID0gJyg/OicgKyBbcnNEaW5nYmF0LCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc1NlcTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggY29tcGxleCBvciBjb21wb3VuZCB3b3Jkcy4gKi9cbnZhciByZVVuaWNvZGVXb3JkID0gUmVnRXhwKFtcbiAgcnNVcHBlciArICc/JyArIHJzTG93ZXIgKyAnKycgKyByc09wdENvbnRyTG93ZXIgKyAnKD89JyArIFtyc0JyZWFrLCByc1VwcGVyLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNNaXNjVXBwZXIgKyAnKycgKyByc09wdENvbnRyVXBwZXIgKyAnKD89JyArIFtyc0JyZWFrLCByc1VwcGVyICsgcnNNaXNjTG93ZXIsICckJ10uam9pbignfCcpICsgJyknLFxuICByc1VwcGVyICsgJz8nICsgcnNNaXNjTG93ZXIgKyAnKycgKyByc09wdENvbnRyTG93ZXIsXG4gIHJzVXBwZXIgKyAnKycgKyByc09wdENvbnRyVXBwZXIsXG4gIHJzT3JkVXBwZXIsXG4gIHJzT3JkTG93ZXIsXG4gIHJzRGlnaXRzLFxuICByc0Vtb2ppXG5dLmpvaW4oJ3wnKSwgJ2cnKTtcblxuLyoqXG4gKiBTcGxpdHMgYSBVbmljb2RlIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVdvcmRzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZVdvcmQpIHx8IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaWNvZGVXb3JkcztcbiJdfQ==