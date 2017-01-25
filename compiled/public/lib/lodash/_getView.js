'use strict';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the view, applying any `transforms` to the `start` and `end` positions.
 *
 * @private
 * @param {number} start The start of the view.
 * @param {number} end The end of the view.
 * @param {Array} transforms The transformations to apply to the view.
 * @returns {Object} Returns an object containing the `start` and `end`
 *  positions of the view.
 */
function getView(start, end, transforms) {
  var index = -1,
      length = transforms.length;

  while (++index < length) {
    var data = transforms[index],
        size = data.size;

    switch (data.type) {
      case 'drop':
        start += size;break;
      case 'dropRight':
        end -= size;break;
      case 'take':
        end = nativeMin(end, start + size);break;
      case 'takeRight':
        start = nativeMax(start, end - size);break;
    }
  }
  return { 'start': start, 'end': end };
}

module.exports = getView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19nZXRWaWV3LmpzIl0sIm5hbWVzIjpbIm5hdGl2ZU1heCIsIk1hdGgiLCJtYXgiLCJuYXRpdmVNaW4iLCJtaW4iLCJnZXRWaWV3Iiwic3RhcnQiLCJlbmQiLCJ0cmFuc2Zvcm1zIiwiaW5kZXgiLCJsZW5ndGgiLCJkYXRhIiwic2l6ZSIsInR5cGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsWUFBWUMsS0FBS0MsR0FBckI7QUFBQSxJQUNJQyxZQUFZRixLQUFLRyxHQURyQjs7QUFHQTs7Ozs7Ozs7OztBQVVBLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCQyxHQUF4QixFQUE2QkMsVUFBN0IsRUFBeUM7QUFDdkMsTUFBSUMsUUFBUSxDQUFDLENBQWI7QUFBQSxNQUNJQyxTQUFTRixXQUFXRSxNQUR4Qjs7QUFHQSxTQUFPLEVBQUVELEtBQUYsR0FBVUMsTUFBakIsRUFBeUI7QUFDdkIsUUFBSUMsT0FBT0gsV0FBV0MsS0FBWCxDQUFYO0FBQUEsUUFDSUcsT0FBT0QsS0FBS0MsSUFEaEI7O0FBR0EsWUFBUUQsS0FBS0UsSUFBYjtBQUNFLFdBQUssTUFBTDtBQUFrQlAsaUJBQVNNLElBQVQsQ0FBZTtBQUNqQyxXQUFLLFdBQUw7QUFBa0JMLGVBQU9LLElBQVAsQ0FBYTtBQUMvQixXQUFLLE1BQUw7QUFBa0JMLGNBQU1KLFVBQVVJLEdBQVYsRUFBZUQsUUFBUU0sSUFBdkIsQ0FBTixDQUFvQztBQUN0RCxXQUFLLFdBQUw7QUFBa0JOLGdCQUFRTixVQUFVTSxLQUFWLEVBQWlCQyxNQUFNSyxJQUF2QixDQUFSLENBQXNDO0FBSjFEO0FBTUQ7QUFDRCxTQUFPLEVBQUUsU0FBU04sS0FBWCxFQUFrQixPQUFPQyxHQUF6QixFQUFQO0FBQ0Q7O0FBRURPLE9BQU9DLE9BQVAsR0FBaUJWLE9BQWpCIiwiZmlsZSI6Il9nZXRWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHZpZXcsIGFwcGx5aW5nIGFueSBgdHJhbnNmb3Jtc2AgdG8gdGhlIGBzdGFydGAgYW5kIGBlbmRgIHBvc2l0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSBzdGFydCBvZiB0aGUgdmlldy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgVGhlIGVuZCBvZiB0aGUgdmlldy5cbiAqIEBwYXJhbSB7QXJyYXl9IHRyYW5zZm9ybXMgVGhlIHRyYW5zZm9ybWF0aW9ucyB0byBhcHBseSB0byB0aGUgdmlldy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGBzdGFydGAgYW5kIGBlbmRgXG4gKiAgcG9zaXRpb25zIG9mIHRoZSB2aWV3LlxuICovXG5mdW5jdGlvbiBnZXRWaWV3KHN0YXJ0LCBlbmQsIHRyYW5zZm9ybXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB0cmFuc2Zvcm1zLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBkYXRhID0gdHJhbnNmb3Jtc1tpbmRleF0sXG4gICAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgICBzd2l0Y2ggKGRhdGEudHlwZSkge1xuICAgICAgY2FzZSAnZHJvcCc6ICAgICAgc3RhcnQgKz0gc2l6ZTsgYnJlYWs7XG4gICAgICBjYXNlICdkcm9wUmlnaHQnOiBlbmQgLT0gc2l6ZTsgYnJlYWs7XG4gICAgICBjYXNlICd0YWtlJzogICAgICBlbmQgPSBuYXRpdmVNaW4oZW5kLCBzdGFydCArIHNpemUpOyBicmVhaztcbiAgICAgIGNhc2UgJ3Rha2VSaWdodCc6IHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0LCBlbmQgLSBzaXplKTsgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB7ICdzdGFydCc6IHN0YXJ0LCAnZW5kJzogZW5kIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmlldztcbiJdfQ==