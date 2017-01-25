'use strict';

var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRm9yT3duLmpzIl0sIm5hbWVzIjpbImJhc2VGb3IiLCJyZXF1aXJlIiwia2V5cyIsImJhc2VGb3JPd24iLCJvYmplY3QiLCJpdGVyYXRlZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsVUFBVUMsUUFBUSxZQUFSLENBQWQ7QUFBQSxJQUNJQyxPQUFPRCxRQUFRLFFBQVIsQ0FEWDs7QUFHQTs7Ozs7Ozs7QUFRQSxTQUFTRSxVQUFULENBQW9CQyxNQUFwQixFQUE0QkMsUUFBNUIsRUFBc0M7QUFDcEMsU0FBT0QsVUFBVUosUUFBUUksTUFBUixFQUFnQkMsUUFBaEIsRUFBMEJILElBQTFCLENBQWpCO0FBQ0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJKLFVBQWpCIiwiZmlsZSI6Il9iYXNlRm9yT3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VGb3IgPSByZXF1aXJlKCcuL19iYXNlRm9yJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvck93bjtcbiJdfQ==