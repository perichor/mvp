'use strict';

var baseForOwnRight = require('./_baseForOwnRight'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEachRight` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEachRight = createBaseEach(baseForOwnRight, true);

module.exports = baseEachRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRWFjaFJpZ2h0LmpzIl0sIm5hbWVzIjpbImJhc2VGb3JPd25SaWdodCIsInJlcXVpcmUiLCJjcmVhdGVCYXNlRWFjaCIsImJhc2VFYWNoUmlnaHQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGtCQUFrQkMsUUFBUSxvQkFBUixDQUF0QjtBQUFBLElBQ0lDLGlCQUFpQkQsUUFBUSxtQkFBUixDQURyQjs7QUFHQTs7Ozs7Ozs7QUFRQSxJQUFJRSxnQkFBZ0JELGVBQWVGLGVBQWYsRUFBZ0MsSUFBaEMsQ0FBcEI7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUJGLGFBQWpCIiwiZmlsZSI6Il9iYXNlRWFjaFJpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VGb3JPd25SaWdodCA9IHJlcXVpcmUoJy4vX2Jhc2VGb3JPd25SaWdodCcpLFxuICAgIGNyZWF0ZUJhc2VFYWNoID0gcmVxdWlyZSgnLi9fY3JlYXRlQmFzZUVhY2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoUmlnaHRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2hSaWdodCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd25SaWdodCwgdHJ1ZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUVhY2hSaWdodDtcbiJdfQ==