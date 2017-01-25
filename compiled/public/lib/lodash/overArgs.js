'use strict';

var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseFlatten = require('./_baseFlatten'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest'),
    baseUnary = require('./_baseUnary'),
    castRest = require('./_castRest'),
    isArray = require('./isArray');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Creates a function that invokes `func` with its arguments transformed.
 *
 * @static
 * @since 4.0.0
 * @memberOf _
 * @category Function
 * @param {Function} func The function to wrap.
 * @param {...(Function|Function[])} [transforms=[_.identity]]
 *  The argument transforms.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function doubled(n) {
 *   return n * 2;
 * }
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var func = _.overArgs(function(x, y) {
 *   return [x, y];
 * }, [square, doubled]);
 *
 * func(9, 3);
 * // => [81, 6]
 *
 * func(10, 5);
 * // => [100, 10]
 */
var overArgs = castRest(function (func, transforms) {
  transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(baseIteratee)) : arrayMap(baseFlatten(transforms, 1), baseUnary(baseIteratee));

  var funcsLength = transforms.length;
  return baseRest(function (args) {
    var index = -1,
        length = nativeMin(args.length, funcsLength);

    while (++index < length) {
      args[index] = transforms[index].call(this, args[index]);
    }
    return apply(func, this, args);
  });
});

module.exports = overArgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL292ZXJBcmdzLmpzIl0sIm5hbWVzIjpbImFwcGx5IiwicmVxdWlyZSIsImFycmF5TWFwIiwiYmFzZUZsYXR0ZW4iLCJiYXNlSXRlcmF0ZWUiLCJiYXNlUmVzdCIsImJhc2VVbmFyeSIsImNhc3RSZXN0IiwiaXNBcnJheSIsIm5hdGl2ZU1pbiIsIk1hdGgiLCJtaW4iLCJvdmVyQXJncyIsImZ1bmMiLCJ0cmFuc2Zvcm1zIiwibGVuZ3RoIiwiZnVuY3NMZW5ndGgiLCJhcmdzIiwiaW5kZXgiLCJjYWxsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmO0FBQUEsSUFFSUUsY0FBY0YsUUFBUSxnQkFBUixDQUZsQjtBQUFBLElBR0lHLGVBQWVILFFBQVEsaUJBQVIsQ0FIbkI7QUFBQSxJQUlJSSxXQUFXSixRQUFRLGFBQVIsQ0FKZjtBQUFBLElBS0lLLFlBQVlMLFFBQVEsY0FBUixDQUxoQjtBQUFBLElBTUlNLFdBQVdOLFFBQVEsYUFBUixDQU5mO0FBQUEsSUFPSU8sVUFBVVAsUUFBUSxXQUFSLENBUGQ7O0FBU0E7QUFDQSxJQUFJUSxZQUFZQyxLQUFLQyxHQUFyQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCQSxJQUFJQyxXQUFXTCxTQUFTLFVBQVNNLElBQVQsRUFBZUMsVUFBZixFQUEyQjtBQUNqREEsZUFBY0EsV0FBV0MsTUFBWCxJQUFxQixDQUFyQixJQUEwQlAsUUFBUU0sV0FBVyxDQUFYLENBQVIsQ0FBM0IsR0FDVFosU0FBU1ksV0FBVyxDQUFYLENBQVQsRUFBd0JSLFVBQVVGLFlBQVYsQ0FBeEIsQ0FEUyxHQUVURixTQUFTQyxZQUFZVyxVQUFaLEVBQXdCLENBQXhCLENBQVQsRUFBcUNSLFVBQVVGLFlBQVYsQ0FBckMsQ0FGSjs7QUFJQSxNQUFJWSxjQUFjRixXQUFXQyxNQUE3QjtBQUNBLFNBQU9WLFNBQVMsVUFBU1ksSUFBVCxFQUFlO0FBQzdCLFFBQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsUUFDSUgsU0FBU04sVUFBVVEsS0FBS0YsTUFBZixFQUF1QkMsV0FBdkIsQ0FEYjs7QUFHQSxXQUFPLEVBQUVFLEtBQUYsR0FBVUgsTUFBakIsRUFBeUI7QUFDdkJFLFdBQUtDLEtBQUwsSUFBY0osV0FBV0ksS0FBWCxFQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkJGLEtBQUtDLEtBQUwsQ0FBN0IsQ0FBZDtBQUNEO0FBQ0QsV0FBT2xCLE1BQU1hLElBQU4sRUFBWSxJQUFaLEVBQWtCSSxJQUFsQixDQUFQO0FBQ0QsR0FSTSxDQUFQO0FBU0QsQ0FmYyxDQUFmOztBQWlCQUcsT0FBT0MsT0FBUCxHQUFpQlQsUUFBakIiLCJmaWxlIjoib3ZlckFyZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpLFxuICAgIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIGNhc3RSZXN0ID0gcmVxdWlyZSgnLi9fY2FzdFJlc3QnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudHMgdHJhbnNmb3JtZWQuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDQuMC4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHsuLi4oRnVuY3Rpb258RnVuY3Rpb25bXSl9IFt0cmFuc2Zvcm1zPVtfLmlkZW50aXR5XV1cbiAqICBUaGUgYXJndW1lbnQgdHJhbnNmb3Jtcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBkb3VibGVkKG4pIHtcbiAqICAgcmV0dXJuIG4gKiAyO1xuICogfVxuICpcbiAqIGZ1bmN0aW9uIHNxdWFyZShuKSB7XG4gKiAgIHJldHVybiBuICogbjtcbiAqIH1cbiAqXG4gKiB2YXIgZnVuYyA9IF8ub3ZlckFyZ3MoZnVuY3Rpb24oeCwgeSkge1xuICogICByZXR1cm4gW3gsIHldO1xuICogfSwgW3NxdWFyZSwgZG91YmxlZF0pO1xuICpcbiAqIGZ1bmMoOSwgMyk7XG4gKiAvLyA9PiBbODEsIDZdXG4gKlxuICogZnVuYygxMCwgNSk7XG4gKiAvLyA9PiBbMTAwLCAxMF1cbiAqL1xudmFyIG92ZXJBcmdzID0gY2FzdFJlc3QoZnVuY3Rpb24oZnVuYywgdHJhbnNmb3Jtcykge1xuICB0cmFuc2Zvcm1zID0gKHRyYW5zZm9ybXMubGVuZ3RoID09IDEgJiYgaXNBcnJheSh0cmFuc2Zvcm1zWzBdKSlcbiAgICA/IGFycmF5TWFwKHRyYW5zZm9ybXNbMF0sIGJhc2VVbmFyeShiYXNlSXRlcmF0ZWUpKVxuICAgIDogYXJyYXlNYXAoYmFzZUZsYXR0ZW4odHJhbnNmb3JtcywgMSksIGJhc2VVbmFyeShiYXNlSXRlcmF0ZWUpKTtcblxuICB2YXIgZnVuY3NMZW5ndGggPSB0cmFuc2Zvcm1zLmxlbmd0aDtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWluKGFyZ3MubGVuZ3RoLCBmdW5jc0xlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJnc1tpbmRleF0gPSB0cmFuc2Zvcm1zW2luZGV4XS5jYWxsKHRoaXMsIGFyZ3NbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIGFyZ3MpO1xuICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmdzO1xuIl19