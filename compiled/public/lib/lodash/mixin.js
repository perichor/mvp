'use strict';

var arrayEach = require('./_arrayEach'),
    arrayPush = require('./_arrayPush'),
    baseFunctions = require('./_baseFunctions'),
    copyArray = require('./_copyArray'),
    isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    keys = require('./keys');

/**
 * Adds all own enumerable string keyed function properties of a source
 * object to the destination object. If `object` is a function, then methods
 * are added to its prototype as well.
 *
 * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
 * avoid conflicts caused by modifying the original.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {Function|Object} [object=lodash] The destination object.
 * @param {Object} source The object of functions to add.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
 * @returns {Function|Object} Returns `object`.
 * @example
 *
 * function vowels(string) {
 *   return _.filter(string, function(v) {
 *     return /[aeiou]/i.test(v);
 *   });
 * }
 *
 * _.mixin({ 'vowels': vowels });
 * _.vowels('fred');
 * // => ['e']
 *
 * _('fred').vowels().value();
 * // => ['e']
 *
 * _.mixin({ 'vowels': vowels }, { 'chain': false });
 * _('fred').vowels();
 * // => ['e']
 */
function mixin(object, source, options) {
  var props = keys(source),
      methodNames = baseFunctions(source, props);

  var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
      isFunc = isFunction(object);

  arrayEach(methodNames, function (methodName) {
    var func = source[methodName];
    object[methodName] = func;
    if (isFunc) {
      object.prototype[methodName] = function () {
        var chainAll = this.__chain__;
        if (chain || chainAll) {
          var result = object(this.__wrapped__),
              actions = result.__actions__ = copyArray(this.__actions__);

          actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
          result.__chain__ = chainAll;
          return result;
        }
        return func.apply(object, arrayPush([this.value()], arguments));
      };
    }
  });

  return object;
}

module.exports = mixin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21peGluLmpzIl0sIm5hbWVzIjpbImFycmF5RWFjaCIsInJlcXVpcmUiLCJhcnJheVB1c2giLCJiYXNlRnVuY3Rpb25zIiwiY29weUFycmF5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0Iiwia2V5cyIsIm1peGluIiwib2JqZWN0Iiwic291cmNlIiwib3B0aW9ucyIsInByb3BzIiwibWV0aG9kTmFtZXMiLCJjaGFpbiIsImlzRnVuYyIsIm1ldGhvZE5hbWUiLCJmdW5jIiwicHJvdG90eXBlIiwiY2hhaW5BbGwiLCJfX2NoYWluX18iLCJyZXN1bHQiLCJfX3dyYXBwZWRfXyIsImFjdGlvbnMiLCJfX2FjdGlvbnNfXyIsInB1c2giLCJhcmd1bWVudHMiLCJhcHBseSIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxZQUFZQyxRQUFRLGNBQVIsQ0FBaEI7QUFBQSxJQUNJQyxZQUFZRCxRQUFRLGNBQVIsQ0FEaEI7QUFBQSxJQUVJRSxnQkFBZ0JGLFFBQVEsa0JBQVIsQ0FGcEI7QUFBQSxJQUdJRyxZQUFZSCxRQUFRLGNBQVIsQ0FIaEI7QUFBQSxJQUlJSSxhQUFhSixRQUFRLGNBQVIsQ0FKakI7QUFBQSxJQUtJSyxXQUFXTCxRQUFRLFlBQVIsQ0FMZjtBQUFBLElBTUlNLE9BQU9OLFFBQVEsUUFBUixDQU5YOztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ0EsU0FBU08sS0FBVCxDQUFlQyxNQUFmLEVBQXVCQyxNQUF2QixFQUErQkMsT0FBL0IsRUFBd0M7QUFDdEMsTUFBSUMsUUFBUUwsS0FBS0csTUFBTCxDQUFaO0FBQUEsTUFDSUcsY0FBY1YsY0FBY08sTUFBZCxFQUFzQkUsS0FBdEIsQ0FEbEI7O0FBR0EsTUFBSUUsUUFBUSxFQUFFUixTQUFTSyxPQUFULEtBQXFCLFdBQVdBLE9BQWxDLEtBQThDLENBQUMsQ0FBQ0EsUUFBUUcsS0FBcEU7QUFBQSxNQUNJQyxTQUFTVixXQUFXSSxNQUFYLENBRGI7O0FBR0FULFlBQVVhLFdBQVYsRUFBdUIsVUFBU0csVUFBVCxFQUFxQjtBQUMxQyxRQUFJQyxPQUFPUCxPQUFPTSxVQUFQLENBQVg7QUFDQVAsV0FBT08sVUFBUCxJQUFxQkMsSUFBckI7QUFDQSxRQUFJRixNQUFKLEVBQVk7QUFDVk4sYUFBT1MsU0FBUCxDQUFpQkYsVUFBakIsSUFBK0IsWUFBVztBQUN4QyxZQUFJRyxXQUFXLEtBQUtDLFNBQXBCO0FBQ0EsWUFBSU4sU0FBU0ssUUFBYixFQUF1QjtBQUNyQixjQUFJRSxTQUFTWixPQUFPLEtBQUthLFdBQVosQ0FBYjtBQUFBLGNBQ0lDLFVBQVVGLE9BQU9HLFdBQVAsR0FBcUJwQixVQUFVLEtBQUtvQixXQUFmLENBRG5DOztBQUdBRCxrQkFBUUUsSUFBUixDQUFhLEVBQUUsUUFBUVIsSUFBVixFQUFnQixRQUFRUyxTQUF4QixFQUFtQyxXQUFXakIsTUFBOUMsRUFBYjtBQUNBWSxpQkFBT0QsU0FBUCxHQUFtQkQsUUFBbkI7QUFDQSxpQkFBT0UsTUFBUDtBQUNEO0FBQ0QsZUFBT0osS0FBS1UsS0FBTCxDQUFXbEIsTUFBWCxFQUFtQlAsVUFBVSxDQUFDLEtBQUswQixLQUFMLEVBQUQsQ0FBVixFQUEwQkYsU0FBMUIsQ0FBbkIsQ0FBUDtBQUNELE9BWEQ7QUFZRDtBQUNGLEdBakJEOztBQW1CQSxTQUFPakIsTUFBUDtBQUNEOztBQUVEb0IsT0FBT0MsT0FBUCxHQUFpQnRCLEtBQWpCIiwiZmlsZSI6Im1peGluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5RWFjaCcpLFxuICAgIGFycmF5UHVzaCA9IHJlcXVpcmUoJy4vX2FycmF5UHVzaCcpLFxuICAgIGJhc2VGdW5jdGlvbnMgPSByZXF1aXJlKCcuL19iYXNlRnVuY3Rpb25zJyksXG4gICAgY29weUFycmF5ID0gcmVxdWlyZSgnLi9fY29weUFycmF5JyksXG4gICAgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBBZGRzIGFsbCBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgZnVuY3Rpb24gcHJvcGVydGllcyBvZiBhIHNvdXJjZVxuICogb2JqZWN0IHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuIElmIGBvYmplY3RgIGlzIGEgZnVuY3Rpb24sIHRoZW4gbWV0aG9kc1xuICogYXJlIGFkZGVkIHRvIGl0cyBwcm90b3R5cGUgYXMgd2VsbC5cbiAqXG4gKiAqKk5vdGU6KiogVXNlIGBfLnJ1bkluQ29udGV4dGAgdG8gY3JlYXRlIGEgcHJpc3RpbmUgYGxvZGFzaGAgZnVuY3Rpb24gdG9cbiAqIGF2b2lkIGNvbmZsaWN0cyBjYXVzZWQgYnkgbW9kaWZ5aW5nIHRoZSBvcmlnaW5hbC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IFtvYmplY3Q9bG9kYXNoXSBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIGZ1bmN0aW9ucyB0byBhZGQuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY2hhaW49dHJ1ZV0gU3BlY2lmeSB3aGV0aGVyIG1peGlucyBhcmUgY2hhaW5hYmxlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gdm93ZWxzKHN0cmluZykge1xuICogICByZXR1cm4gXy5maWx0ZXIoc3RyaW5nLCBmdW5jdGlvbih2KSB7XG4gKiAgICAgcmV0dXJuIC9bYWVpb3VdL2kudGVzdCh2KTtcbiAqICAgfSk7XG4gKiB9XG4gKlxuICogXy5taXhpbih7ICd2b3dlbHMnOiB2b3dlbHMgfSk7XG4gKiBfLnZvd2VscygnZnJlZCcpO1xuICogLy8gPT4gWydlJ11cbiAqXG4gKiBfKCdmcmVkJykudm93ZWxzKCkudmFsdWUoKTtcbiAqIC8vID0+IFsnZSddXG4gKlxuICogXy5taXhpbih7ICd2b3dlbHMnOiB2b3dlbHMgfSwgeyAnY2hhaW4nOiBmYWxzZSB9KTtcbiAqIF8oJ2ZyZWQnKS52b3dlbHMoKTtcbiAqIC8vID0+IFsnZSddXG4gKi9cbmZ1bmN0aW9uIG1peGluKG9iamVjdCwgc291cmNlLCBvcHRpb25zKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgIG1ldGhvZE5hbWVzID0gYmFzZUZ1bmN0aW9ucyhzb3VyY2UsIHByb3BzKTtcblxuICB2YXIgY2hhaW4gPSAhKGlzT2JqZWN0KG9wdGlvbnMpICYmICdjaGFpbicgaW4gb3B0aW9ucykgfHwgISFvcHRpb25zLmNoYWluLFxuICAgICAgaXNGdW5jID0gaXNGdW5jdGlvbihvYmplY3QpO1xuXG4gIGFycmF5RWFjaChtZXRob2ROYW1lcywgZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgIHZhciBmdW5jID0gc291cmNlW21ldGhvZE5hbWVdO1xuICAgIG9iamVjdFttZXRob2ROYW1lXSA9IGZ1bmM7XG4gICAgaWYgKGlzRnVuYykge1xuICAgICAgb2JqZWN0LnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hhaW5BbGwgPSB0aGlzLl9fY2hhaW5fXztcbiAgICAgICAgaWYgKGNoYWluIHx8IGNoYWluQWxsKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IG9iamVjdCh0aGlzLl9fd3JhcHBlZF9fKSxcbiAgICAgICAgICAgICAgYWN0aW9ucyA9IHJlc3VsdC5fX2FjdGlvbnNfXyA9IGNvcHlBcnJheSh0aGlzLl9fYWN0aW9uc19fKTtcblxuICAgICAgICAgIGFjdGlvbnMucHVzaCh7ICdmdW5jJzogZnVuYywgJ2FyZ3MnOiBhcmd1bWVudHMsICd0aGlzQXJnJzogb2JqZWN0IH0pO1xuICAgICAgICAgIHJlc3VsdC5fX2NoYWluX18gPSBjaGFpbkFsbDtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KG9iamVjdCwgYXJyYXlQdXNoKFt0aGlzLnZhbHVlKCldLCBhcmd1bWVudHMpKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1peGluO1xuIl19