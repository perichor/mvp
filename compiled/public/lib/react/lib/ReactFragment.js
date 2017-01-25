/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _prodInvariant = require('./reactProdInvariant');

var ReactChildren = require('./ReactChildren');
var ReactElement = require('./ReactElement');

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * We used to allow keyed objects to serve as a collection of ReactElements,
 * or nested sets. This allowed us a way to explicitly key a set or fragment of
 * components. This is now being replaced with an opaque data structure.
 * The upgrade path is to call React.addons.createFragment({ key: value }) to
 * create a keyed fragment. The resulting data structure is an array.
 */

var numericPropertyRegex = /^\d+$/;

var warnedAboutNumeric = false;

var ReactFragment = {
  /**
   * Wrap a keyed object in an opaque proxy that warns you if you access any
   * of its properties.
   * See https://facebook.github.io/react/docs/create-fragment.html
   */
  create: function create(object) {
    if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object' || !object || Array.isArray(object)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'React.addons.createFragment only accepts a single object. Got: %s', object) : void 0;
      return object;
    }
    if (ReactElement.isValidElement(object)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'React.addons.createFragment does not accept a ReactElement ' + 'without a wrapper object.') : void 0;
      return object;
    }

    !(object.nodeType !== 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.addons.createFragment(...): Encountered an invalid child; DOM elements are not valid children of React components.') : _prodInvariant('0') : void 0;

    var result = [];

    for (var key in object) {
      if (process.env.NODE_ENV !== 'production') {
        if (!warnedAboutNumeric && numericPropertyRegex.test(key)) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'React.addons.createFragment(...): Child objects should have ' + 'non-numeric keys so ordering is preserved.') : void 0;
          warnedAboutNumeric = true;
        }
      }
      ReactChildren.mapIntoWithKeyPrefixInternal(object[key], result, key, emptyFunction.thatReturnsArgument);
    }

    return result;
  }
};

module.exports = ReactFragment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL1JlYWN0RnJhZ21lbnQuanMiXSwibmFtZXMiOlsiX3Byb2RJbnZhcmlhbnQiLCJyZXF1aXJlIiwiUmVhY3RDaGlsZHJlbiIsIlJlYWN0RWxlbWVudCIsImVtcHR5RnVuY3Rpb24iLCJpbnZhcmlhbnQiLCJ3YXJuaW5nIiwibnVtZXJpY1Byb3BlcnR5UmVnZXgiLCJ3YXJuZWRBYm91dE51bWVyaWMiLCJSZWFjdEZyYWdtZW50IiwiY3JlYXRlIiwib2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiaXNWYWxpZEVsZW1lbnQiLCJub2RlVHlwZSIsInJlc3VsdCIsImtleSIsInRlc3QiLCJtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsIiwidGhhdFJldHVybnNBcmd1bWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7Ozs7QUFFQSxJQUFJQSxpQkFBaUJDLFFBQVEsc0JBQVIsQ0FBckI7O0FBRUEsSUFBSUMsZ0JBQWdCRCxRQUFRLGlCQUFSLENBQXBCO0FBQ0EsSUFBSUUsZUFBZUYsUUFBUSxnQkFBUixDQUFuQjs7QUFFQSxJQUFJRyxnQkFBZ0JILFFBQVEsd0JBQVIsQ0FBcEI7QUFDQSxJQUFJSSxZQUFZSixRQUFRLG9CQUFSLENBQWhCO0FBQ0EsSUFBSUssVUFBVUwsUUFBUSxrQkFBUixDQUFkOztBQUVBOzs7Ozs7OztBQVFBLElBQUlNLHVCQUF1QixPQUEzQjs7QUFFQSxJQUFJQyxxQkFBcUIsS0FBekI7O0FBRUEsSUFBSUMsZ0JBQWdCO0FBQ2xCOzs7OztBQUtBQyxVQUFRLGdCQUFVQyxNQUFWLEVBQWtCO0FBQ3hCLFFBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QixDQUFDQSxNQUEvQixJQUF5Q0MsTUFBTUMsT0FBTixDQUFjRixNQUFkLENBQTdDLEVBQW9FO0FBQ2xFRyxjQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBekIsR0FBd0NWLFFBQVEsS0FBUixFQUFlLG1FQUFmLEVBQW9GSyxNQUFwRixDQUF4QyxHQUFzSSxLQUFLLENBQTNJO0FBQ0EsYUFBT0EsTUFBUDtBQUNEO0FBQ0QsUUFBSVIsYUFBYWMsY0FBYixDQUE0Qk4sTUFBNUIsQ0FBSixFQUF5QztBQUN2Q0csY0FBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDVixRQUFRLEtBQVIsRUFBZSxnRUFBZ0UsMkJBQS9FLENBQXhDLEdBQXNKLEtBQUssQ0FBM0o7QUFDQSxhQUFPSyxNQUFQO0FBQ0Q7O0FBRUQsTUFBRUEsT0FBT08sUUFBUCxLQUFvQixDQUF0QixJQUEyQkosUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDWCxVQUFVLEtBQVYsRUFBaUIsMEhBQWpCLENBQXhDLEdBQXVMTCxlQUFlLEdBQWYsQ0FBbE4sR0FBd08sS0FBSyxDQUE3Tzs7QUFFQSxRQUFJbUIsU0FBUyxFQUFiOztBQUVBLFNBQUssSUFBSUMsR0FBVCxJQUFnQlQsTUFBaEIsRUFBd0I7QUFDdEIsVUFBSUcsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDLFlBQUksQ0FBQ1Isa0JBQUQsSUFBdUJELHFCQUFxQmMsSUFBckIsQ0FBMEJELEdBQTFCLENBQTNCLEVBQTJEO0FBQ3pETixrQkFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDVixRQUFRLEtBQVIsRUFBZSxpRUFBaUUsNENBQWhGLENBQXhDLEdBQXdLLEtBQUssQ0FBN0s7QUFDQUUsK0JBQXFCLElBQXJCO0FBQ0Q7QUFDRjtBQUNETixvQkFBY29CLDRCQUFkLENBQTJDWCxPQUFPUyxHQUFQLENBQTNDLEVBQXdERCxNQUF4RCxFQUFnRUMsR0FBaEUsRUFBcUVoQixjQUFjbUIsbUJBQW5GO0FBQ0Q7O0FBRUQsV0FBT0osTUFBUDtBQUNEO0FBL0JpQixDQUFwQjs7QUFrQ0FLLE9BQU9DLE9BQVAsR0FBaUJoQixhQUFqQiIsImZpbGUiOiJSZWFjdEZyYWdtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRyZW4nKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIFdlIHVzZWQgdG8gYWxsb3cga2V5ZWQgb2JqZWN0cyB0byBzZXJ2ZSBhcyBhIGNvbGxlY3Rpb24gb2YgUmVhY3RFbGVtZW50cyxcbiAqIG9yIG5lc3RlZCBzZXRzLiBUaGlzIGFsbG93ZWQgdXMgYSB3YXkgdG8gZXhwbGljaXRseSBrZXkgYSBzZXQgb3IgZnJhZ21lbnQgb2ZcbiAqIGNvbXBvbmVudHMuIFRoaXMgaXMgbm93IGJlaW5nIHJlcGxhY2VkIHdpdGggYW4gb3BhcXVlIGRhdGEgc3RydWN0dXJlLlxuICogVGhlIHVwZ3JhZGUgcGF0aCBpcyB0byBjYWxsIFJlYWN0LmFkZG9ucy5jcmVhdGVGcmFnbWVudCh7IGtleTogdmFsdWUgfSkgdG9cbiAqIGNyZWF0ZSBhIGtleWVkIGZyYWdtZW50LiBUaGUgcmVzdWx0aW5nIGRhdGEgc3RydWN0dXJlIGlzIGFuIGFycmF5LlxuICovXG5cbnZhciBudW1lcmljUHJvcGVydHlSZWdleCA9IC9eXFxkKyQvO1xuXG52YXIgd2FybmVkQWJvdXROdW1lcmljID0gZmFsc2U7XG5cbnZhciBSZWFjdEZyYWdtZW50ID0ge1xuICAvKipcbiAgICogV3JhcCBhIGtleWVkIG9iamVjdCBpbiBhbiBvcGFxdWUgcHJveHkgdGhhdCB3YXJucyB5b3UgaWYgeW91IGFjY2VzcyBhbnlcbiAgICogb2YgaXRzIHByb3BlcnRpZXMuXG4gICAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2NyZWF0ZS1mcmFnbWVudC5odG1sXG4gICAqL1xuICBjcmVhdGU6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgIW9iamVjdCB8fCBBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuYWRkb25zLmNyZWF0ZUZyYWdtZW50IG9ubHkgYWNjZXB0cyBhIHNpbmdsZSBvYmplY3QuIEdvdDogJXMnLCBvYmplY3QpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChvYmplY3QpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1JlYWN0LmFkZG9ucy5jcmVhdGVGcmFnbWVudCBkb2VzIG5vdCBhY2NlcHQgYSBSZWFjdEVsZW1lbnQgJyArICd3aXRob3V0IGEgd3JhcHBlciBvYmplY3QuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgICEob2JqZWN0Lm5vZGVUeXBlICE9PSAxKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5hZGRvbnMuY3JlYXRlRnJhZ21lbnQoLi4uKTogRW5jb3VudGVyZWQgYW4gaW52YWxpZCBjaGlsZDsgRE9NIGVsZW1lbnRzIGFyZSBub3QgdmFsaWQgY2hpbGRyZW4gb2YgUmVhY3QgY29tcG9uZW50cy4nKSA6IF9wcm9kSW52YXJpYW50KCcwJykgOiB2b2lkIDA7XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoIXdhcm5lZEFib3V0TnVtZXJpYyAmJiBudW1lcmljUHJvcGVydHlSZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1JlYWN0LmFkZG9ucy5jcmVhdGVGcmFnbWVudCguLi4pOiBDaGlsZCBvYmplY3RzIHNob3VsZCBoYXZlICcgKyAnbm9uLW51bWVyaWMga2V5cyBzbyBvcmRlcmluZyBpcyBwcmVzZXJ2ZWQuJykgOiB2b2lkIDA7XG4gICAgICAgICAgd2FybmVkQWJvdXROdW1lcmljID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgUmVhY3RDaGlsZHJlbi5tYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG9iamVjdFtrZXldLCByZXN1bHQsIGtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RnJhZ21lbnQ7Il19