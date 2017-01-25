'use strict';

var LodashWrapper = require('./_LodashWrapper'),
    flatRest = require('./_flatRest'),
    getData = require('./_getData'),
    getFuncName = require('./_getFuncName'),
    isArray = require('./isArray'),
    isLaziable = require('./_isLaziable');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return flatRest(function (funcs) {
    var length = funcs.length,
        index = length,
        prereq = LodashWrapper.prototype.thru;

    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      var func = funcs[index];
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
        var wrapper = new LodashWrapper([], true);
      }
    }
    index = wrapper ? index : length;
    while (++index < length) {
      func = funcs[index];

      var funcName = getFuncName(func),
          data = funcName == 'wrapper' ? getData(func) : undefined;

      if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
      } else {
        wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
      }
    }
    return function () {
      var args = arguments,
          value = args[0];

      if (wrapper && args.length == 1 && isArray(value)) {
        return wrapper.plant(value).value();
      }
      var index = 0,
          result = length ? funcs[index].apply(this, args) : value;

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  });
}

module.exports = createFlow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVGbG93LmpzIl0sIm5hbWVzIjpbIkxvZGFzaFdyYXBwZXIiLCJyZXF1aXJlIiwiZmxhdFJlc3QiLCJnZXREYXRhIiwiZ2V0RnVuY05hbWUiLCJpc0FycmF5IiwiaXNMYXppYWJsZSIsIkZVTkNfRVJST1JfVEVYVCIsIldSQVBfQ1VSUllfRkxBRyIsIldSQVBfUEFSVElBTF9GTEFHIiwiV1JBUF9BUllfRkxBRyIsIldSQVBfUkVBUkdfRkxBRyIsImNyZWF0ZUZsb3ciLCJmcm9tUmlnaHQiLCJmdW5jcyIsImxlbmd0aCIsImluZGV4IiwicHJlcmVxIiwicHJvdG90eXBlIiwidGhydSIsInJldmVyc2UiLCJmdW5jIiwiVHlwZUVycm9yIiwid3JhcHBlciIsImZ1bmNOYW1lIiwiZGF0YSIsInVuZGVmaW5lZCIsImFwcGx5IiwiYXJncyIsImFyZ3VtZW50cyIsInZhbHVlIiwicGxhbnQiLCJyZXN1bHQiLCJjYWxsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxnQkFBZ0JDLFFBQVEsa0JBQVIsQ0FBcEI7QUFBQSxJQUNJQyxXQUFXRCxRQUFRLGFBQVIsQ0FEZjtBQUFBLElBRUlFLFVBQVVGLFFBQVEsWUFBUixDQUZkO0FBQUEsSUFHSUcsY0FBY0gsUUFBUSxnQkFBUixDQUhsQjtBQUFBLElBSUlJLFVBQVVKLFFBQVEsV0FBUixDQUpkO0FBQUEsSUFLSUssYUFBYUwsUUFBUSxlQUFSLENBTGpCOztBQU9BO0FBQ0EsSUFBSU0sa0JBQWtCLHFCQUF0Qjs7QUFFQTtBQUNBLElBQUlDLGtCQUFrQixDQUF0QjtBQUFBLElBQ0lDLG9CQUFvQixFQUR4QjtBQUFBLElBRUlDLGdCQUFnQixHQUZwQjtBQUFBLElBR0lDLGtCQUFrQixHQUh0Qjs7QUFLQTs7Ozs7OztBQU9BLFNBQVNDLFVBQVQsQ0FBb0JDLFNBQXBCLEVBQStCO0FBQzdCLFNBQU9YLFNBQVMsVUFBU1ksS0FBVCxFQUFnQjtBQUM5QixRQUFJQyxTQUFTRCxNQUFNQyxNQUFuQjtBQUFBLFFBQ0lDLFFBQVFELE1BRFo7QUFBQSxRQUVJRSxTQUFTakIsY0FBY2tCLFNBQWQsQ0FBd0JDLElBRnJDOztBQUlBLFFBQUlOLFNBQUosRUFBZTtBQUNiQyxZQUFNTSxPQUFOO0FBQ0Q7QUFDRCxXQUFPSixPQUFQLEVBQWdCO0FBQ2QsVUFBSUssT0FBT1AsTUFBTUUsS0FBTixDQUFYO0FBQ0EsVUFBSSxPQUFPSyxJQUFQLElBQWUsVUFBbkIsRUFBK0I7QUFDN0IsY0FBTSxJQUFJQyxTQUFKLENBQWNmLGVBQWQsQ0FBTjtBQUNEO0FBQ0QsVUFBSVUsVUFBVSxDQUFDTSxPQUFYLElBQXNCbkIsWUFBWWlCLElBQVosS0FBcUIsU0FBL0MsRUFBMEQ7QUFDeEQsWUFBSUUsVUFBVSxJQUFJdkIsYUFBSixDQUFrQixFQUFsQixFQUFzQixJQUF0QixDQUFkO0FBQ0Q7QUFDRjtBQUNEZ0IsWUFBUU8sVUFBVVAsS0FBVixHQUFrQkQsTUFBMUI7QUFDQSxXQUFPLEVBQUVDLEtBQUYsR0FBVUQsTUFBakIsRUFBeUI7QUFDdkJNLGFBQU9QLE1BQU1FLEtBQU4sQ0FBUDs7QUFFQSxVQUFJUSxXQUFXcEIsWUFBWWlCLElBQVosQ0FBZjtBQUFBLFVBQ0lJLE9BQU9ELFlBQVksU0FBWixHQUF3QnJCLFFBQVFrQixJQUFSLENBQXhCLEdBQXdDSyxTQURuRDs7QUFHQSxVQUFJRCxRQUFRbkIsV0FBV21CLEtBQUssQ0FBTCxDQUFYLENBQVIsSUFDRUEsS0FBSyxDQUFMLE1BQVlmLGdCQUFnQkYsZUFBaEIsR0FBa0NDLGlCQUFsQyxHQUFzREUsZUFBbEUsQ0FERixJQUVFLENBQUNjLEtBQUssQ0FBTCxFQUFRVixNQUZYLElBRXFCVSxLQUFLLENBQUwsS0FBVyxDQUZwQyxFQUdNO0FBQ0pGLGtCQUFVQSxRQUFRbkIsWUFBWXFCLEtBQUssQ0FBTCxDQUFaLENBQVIsRUFBOEJFLEtBQTlCLENBQW9DSixPQUFwQyxFQUE2Q0UsS0FBSyxDQUFMLENBQTdDLENBQVY7QUFDRCxPQUxELE1BS087QUFDTEYsa0JBQVdGLEtBQUtOLE1BQUwsSUFBZSxDQUFmLElBQW9CVCxXQUFXZSxJQUFYLENBQXJCLEdBQ05FLFFBQVFDLFFBQVIsR0FETSxHQUVORCxRQUFRSixJQUFSLENBQWFFLElBQWIsQ0FGSjtBQUdEO0FBQ0Y7QUFDRCxXQUFPLFlBQVc7QUFDaEIsVUFBSU8sT0FBT0MsU0FBWDtBQUFBLFVBQ0lDLFFBQVFGLEtBQUssQ0FBTCxDQURaOztBQUdBLFVBQUlMLFdBQVdLLEtBQUtiLE1BQUwsSUFBZSxDQUExQixJQUErQlYsUUFBUXlCLEtBQVIsQ0FBbkMsRUFBbUQ7QUFDakQsZUFBT1AsUUFBUVEsS0FBUixDQUFjRCxLQUFkLEVBQXFCQSxLQUFyQixFQUFQO0FBQ0Q7QUFDRCxVQUFJZCxRQUFRLENBQVo7QUFBQSxVQUNJZ0IsU0FBU2pCLFNBQVNELE1BQU1FLEtBQU4sRUFBYVcsS0FBYixDQUFtQixJQUFuQixFQUF5QkMsSUFBekIsQ0FBVCxHQUEwQ0UsS0FEdkQ7O0FBR0EsYUFBTyxFQUFFZCxLQUFGLEdBQVVELE1BQWpCLEVBQXlCO0FBQ3ZCaUIsaUJBQVNsQixNQUFNRSxLQUFOLEVBQWFpQixJQUFiLENBQWtCLElBQWxCLEVBQXdCRCxNQUF4QixDQUFUO0FBQ0Q7QUFDRCxhQUFPQSxNQUFQO0FBQ0QsS0FkRDtBQWVELEdBbERNLENBQVA7QUFtREQ7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJ2QixVQUFqQiIsImZpbGUiOiJfY3JlYXRlRmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBMb2Rhc2hXcmFwcGVyID0gcmVxdWlyZSgnLi9fTG9kYXNoV3JhcHBlcicpLFxuICAgIGZsYXRSZXN0ID0gcmVxdWlyZSgnLi9fZmxhdFJlc3QnKSxcbiAgICBnZXREYXRhID0gcmVxdWlyZSgnLi9fZ2V0RGF0YScpLFxuICAgIGdldEZ1bmNOYW1lID0gcmVxdWlyZSgnLi9fZ2V0RnVuY05hbWUnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNMYXppYWJsZSA9IHJlcXVpcmUoJy4vX2lzTGF6aWFibGUnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgV1JBUF9DVVJSWV9GTEFHID0gOCxcbiAgICBXUkFQX1BBUlRJQUxfRkxBRyA9IDMyLFxuICAgIFdSQVBfQVJZX0ZMQUcgPSAxMjgsXG4gICAgV1JBUF9SRUFSR19GTEFHID0gMjU2O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5mbG93YCBvciBgXy5mbG93UmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZsb3cgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZsb3coZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmbGF0UmVzdChmdW5jdGlvbihmdW5jcykge1xuICAgIHZhciBsZW5ndGggPSBmdW5jcy5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gbGVuZ3RoLFxuICAgICAgICBwcmVyZXEgPSBMb2Rhc2hXcmFwcGVyLnByb3RvdHlwZS50aHJ1O1xuXG4gICAgaWYgKGZyb21SaWdodCkge1xuICAgICAgZnVuY3MucmV2ZXJzZSgpO1xuICAgIH1cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgdmFyIGZ1bmMgPSBmdW5jc1tpbmRleF07XG4gICAgICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gICAgICB9XG4gICAgICBpZiAocHJlcmVxICYmICF3cmFwcGVyICYmIGdldEZ1bmNOYW1lKGZ1bmMpID09ICd3cmFwcGVyJykge1xuICAgICAgICB2YXIgd3JhcHBlciA9IG5ldyBMb2Rhc2hXcmFwcGVyKFtdLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaW5kZXggPSB3cmFwcGVyID8gaW5kZXggOiBsZW5ndGg7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGZ1bmMgPSBmdW5jc1tpbmRleF07XG5cbiAgICAgIHZhciBmdW5jTmFtZSA9IGdldEZ1bmNOYW1lKGZ1bmMpLFxuICAgICAgICAgIGRhdGEgPSBmdW5jTmFtZSA9PSAnd3JhcHBlcicgPyBnZXREYXRhKGZ1bmMpIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoZGF0YSAmJiBpc0xhemlhYmxlKGRhdGFbMF0pICYmXG4gICAgICAgICAgICBkYXRhWzFdID09IChXUkFQX0FSWV9GTEFHIHwgV1JBUF9DVVJSWV9GTEFHIHwgV1JBUF9QQVJUSUFMX0ZMQUcgfCBXUkFQX1JFQVJHX0ZMQUcpICYmXG4gICAgICAgICAgICAhZGF0YVs0XS5sZW5ndGggJiYgZGF0YVs5XSA9PSAxXG4gICAgICAgICAgKSB7XG4gICAgICAgIHdyYXBwZXIgPSB3cmFwcGVyW2dldEZ1bmNOYW1lKGRhdGFbMF0pXS5hcHBseSh3cmFwcGVyLCBkYXRhWzNdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSAoZnVuYy5sZW5ndGggPT0gMSAmJiBpc0xhemlhYmxlKGZ1bmMpKVxuICAgICAgICAgID8gd3JhcHBlcltmdW5jTmFtZV0oKVxuICAgICAgICAgIDogd3JhcHBlci50aHJ1KGZ1bmMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICB2YWx1ZSA9IGFyZ3NbMF07XG5cbiAgICAgIGlmICh3cmFwcGVyICYmIGFyZ3MubGVuZ3RoID09IDEgJiYgaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXIucGxhbnQodmFsdWUpLnZhbHVlKCk7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgIHJlc3VsdCA9IGxlbmd0aCA/IGZ1bmNzW2luZGV4XS5hcHBseSh0aGlzLCBhcmdzKSA6IHZhbHVlO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBmdW5jc1tpbmRleF0uY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVGbG93O1xuIl19