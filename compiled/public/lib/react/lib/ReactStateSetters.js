/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactStateSetters = {
  /**
   * Returns a function that calls the provided function, and uses the result
   * of that to set the component's state.
   *
   * @param {ReactCompositeComponent} component
   * @param {function} funcReturningState Returned callback uses this to
   *                                      determine how to update state.
   * @return {function} callback that when invoked uses funcReturningState to
   *                    determined the object literal to setState.
   */
  createStateSetter: function createStateSetter(component, funcReturningState) {
    return function (a, b, c, d, e, f) {
      var partialState = funcReturningState.call(component, a, b, c, d, e, f);
      if (partialState) {
        component.setState(partialState);
      }
    };
  },

  /**
   * Returns a single-argument callback that can be used to update a single
   * key in the component's state.
   *
   * Note: this is memoized function, which makes it inexpensive to call.
   *
   * @param {ReactCompositeComponent} component
   * @param {string} key The key in the state that you should update.
   * @return {function} callback of 1 argument which calls setState() with
   *                    the provided keyName and callback argument.
   */
  createStateKeySetter: function createStateKeySetter(component, key) {
    // Memoize the setters.
    var cache = component.__keySetters || (component.__keySetters = {});
    return cache[key] || (cache[key] = _createStateKeySetter(component, key));
  }
};

function _createStateKeySetter(component, key) {
  // Partial state is allocated outside of the function closure so it can be
  // reused with every call, avoiding memory allocation when this function
  // is called.
  var partialState = {};
  return function stateKeySetter(value) {
    partialState[key] = value;
    component.setState(partialState);
  };
}

ReactStateSetters.Mixin = {
  /**
   * Returns a function that calls the provided function, and uses the result
   * of that to set the component's state.
   *
   * For example, these statements are equivalent:
   *
   *   this.setState({x: 1});
   *   this.createStateSetter(function(xValue) {
   *     return {x: xValue};
   *   })(1);
   *
   * @param {function} funcReturningState Returned callback uses this to
   *                                      determine how to update state.
   * @return {function} callback that when invoked uses funcReturningState to
   *                    determined the object literal to setState.
   */
  createStateSetter: function createStateSetter(funcReturningState) {
    return ReactStateSetters.createStateSetter(this, funcReturningState);
  },

  /**
   * Returns a single-argument callback that can be used to update a single
   * key in the component's state.
   *
   * For example, these statements are equivalent:
   *
   *   this.setState({x: 1});
   *   this.createStateKeySetter('x')(1);
   *
   * Note: this is memoized function, which makes it inexpensive to call.
   *
   * @param {string} key The key in the state that you should update.
   * @return {function} callback of 1 argument which calls setState() with
   *                    the provided keyName and callback argument.
   */
  createStateKeySetter: function createStateKeySetter(key) {
    return ReactStateSetters.createStateKeySetter(this, key);
  }
};

module.exports = ReactStateSetters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL1JlYWN0U3RhdGVTZXR0ZXJzLmpzIl0sIm5hbWVzIjpbIlJlYWN0U3RhdGVTZXR0ZXJzIiwiY3JlYXRlU3RhdGVTZXR0ZXIiLCJjb21wb25lbnQiLCJmdW5jUmV0dXJuaW5nU3RhdGUiLCJhIiwiYiIsImMiLCJkIiwiZSIsImYiLCJwYXJ0aWFsU3RhdGUiLCJjYWxsIiwic2V0U3RhdGUiLCJjcmVhdGVTdGF0ZUtleVNldHRlciIsImtleSIsImNhY2hlIiwiX19rZXlTZXR0ZXJzIiwic3RhdGVLZXlTZXR0ZXIiLCJ2YWx1ZSIsIk1peGluIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxvQkFBb0I7QUFDdEI7Ozs7Ozs7Ozs7QUFVQUMscUJBQW1CLDJCQUFVQyxTQUFWLEVBQXFCQyxrQkFBckIsRUFBeUM7QUFDMUQsV0FBTyxVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkMsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCO0FBQ2pDLFVBQUlDLGVBQWVQLG1CQUFtQlEsSUFBbkIsQ0FBd0JULFNBQXhCLEVBQW1DRSxDQUFuQyxFQUFzQ0MsQ0FBdEMsRUFBeUNDLENBQXpDLEVBQTRDQyxDQUE1QyxFQUErQ0MsQ0FBL0MsRUFBa0RDLENBQWxELENBQW5CO0FBQ0EsVUFBSUMsWUFBSixFQUFrQjtBQUNoQlIsa0JBQVVVLFFBQVYsQ0FBbUJGLFlBQW5CO0FBQ0Q7QUFDRixLQUxEO0FBTUQsR0FsQnFCOztBQW9CdEI7Ozs7Ozs7Ozs7O0FBV0FHLHdCQUFzQiw4QkFBVVgsU0FBVixFQUFxQlksR0FBckIsRUFBMEI7QUFDOUM7QUFDQSxRQUFJQyxRQUFRYixVQUFVYyxZQUFWLEtBQTJCZCxVQUFVYyxZQUFWLEdBQXlCLEVBQXBELENBQVo7QUFDQSxXQUFPRCxNQUFNRCxHQUFOLE1BQWVDLE1BQU1ELEdBQU4sSUFBYUQsc0JBQXFCWCxTQUFyQixFQUFnQ1ksR0FBaEMsQ0FBNUIsQ0FBUDtBQUNEO0FBbkNxQixDQUF4Qjs7QUFzQ0EsU0FBU0QscUJBQVQsQ0FBOEJYLFNBQTlCLEVBQXlDWSxHQUF6QyxFQUE4QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxNQUFJSixlQUFlLEVBQW5CO0FBQ0EsU0FBTyxTQUFTTyxjQUFULENBQXdCQyxLQUF4QixFQUErQjtBQUNwQ1IsaUJBQWFJLEdBQWIsSUFBb0JJLEtBQXBCO0FBQ0FoQixjQUFVVSxRQUFWLENBQW1CRixZQUFuQjtBQUNELEdBSEQ7QUFJRDs7QUFFRFYsa0JBQWtCbUIsS0FBbEIsR0FBMEI7QUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkFsQixxQkFBbUIsMkJBQVVFLGtCQUFWLEVBQThCO0FBQy9DLFdBQU9ILGtCQUFrQkMsaUJBQWxCLENBQW9DLElBQXBDLEVBQTBDRSxrQkFBMUMsQ0FBUDtBQUNELEdBbkJ1Qjs7QUFxQnhCOzs7Ozs7Ozs7Ozs7Ozs7QUFlQVUsd0JBQXNCLDhCQUFVQyxHQUFWLEVBQWU7QUFDbkMsV0FBT2Qsa0JBQWtCYSxvQkFBbEIsQ0FBdUMsSUFBdkMsRUFBNkNDLEdBQTdDLENBQVA7QUFDRDtBQXRDdUIsQ0FBMUI7O0FBeUNBTSxPQUFPQyxPQUFQLEdBQWlCckIsaUJBQWpCIiwiZmlsZSI6IlJlYWN0U3RhdGVTZXR0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0U3RhdGVTZXR0ZXJzID0ge1xuICAvKipcbiAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCBhbmQgdXNlcyB0aGUgcmVzdWx0XG4gICAqIG9mIHRoYXQgdG8gc2V0IHRoZSBjb21wb25lbnQncyBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvc2l0ZUNvbXBvbmVudH0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNSZXR1cm5pbmdTdGF0ZSBSZXR1cm5lZCBjYWxsYmFjayB1c2VzIHRoaXMgdG9cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGVybWluZSBob3cgdG8gdXBkYXRlIHN0YXRlLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gY2FsbGJhY2sgdGhhdCB3aGVuIGludm9rZWQgdXNlcyBmdW5jUmV0dXJuaW5nU3RhdGUgdG9cbiAgICogICAgICAgICAgICAgICAgICAgIGRldGVybWluZWQgdGhlIG9iamVjdCBsaXRlcmFsIHRvIHNldFN0YXRlLlxuICAgKi9cbiAgY3JlYXRlU3RhdGVTZXR0ZXI6IGZ1bmN0aW9uIChjb21wb25lbnQsIGZ1bmNSZXR1cm5pbmdTdGF0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYywgZCwgZSwgZikge1xuICAgICAgdmFyIHBhcnRpYWxTdGF0ZSA9IGZ1bmNSZXR1cm5pbmdTdGF0ZS5jYWxsKGNvbXBvbmVudCwgYSwgYiwgYywgZCwgZSwgZik7XG4gICAgICBpZiAocGFydGlhbFN0YXRlKSB7XG4gICAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZShwYXJ0aWFsU3RhdGUpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzaW5nbGUtYXJndW1lbnQgY2FsbGJhY2sgdGhhdCBjYW4gYmUgdXNlZCB0byB1cGRhdGUgYSBzaW5nbGVcbiAgICoga2V5IGluIHRoZSBjb21wb25lbnQncyBzdGF0ZS5cbiAgICpcbiAgICogTm90ZTogdGhpcyBpcyBtZW1vaXplZCBmdW5jdGlvbiwgd2hpY2ggbWFrZXMgaXQgaW5leHBlbnNpdmUgdG8gY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvc2l0ZUNvbXBvbmVudH0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBpbiB0aGUgc3RhdGUgdGhhdCB5b3Ugc2hvdWxkIHVwZGF0ZS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IGNhbGxiYWNrIG9mIDEgYXJndW1lbnQgd2hpY2ggY2FsbHMgc2V0U3RhdGUoKSB3aXRoXG4gICAqICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQga2V5TmFtZSBhbmQgY2FsbGJhY2sgYXJndW1lbnQuXG4gICAqL1xuICBjcmVhdGVTdGF0ZUtleVNldHRlcjogZnVuY3Rpb24gKGNvbXBvbmVudCwga2V5KSB7XG4gICAgLy8gTWVtb2l6ZSB0aGUgc2V0dGVycy5cbiAgICB2YXIgY2FjaGUgPSBjb21wb25lbnQuX19rZXlTZXR0ZXJzIHx8IChjb21wb25lbnQuX19rZXlTZXR0ZXJzID0ge30pO1xuICAgIHJldHVybiBjYWNoZVtrZXldIHx8IChjYWNoZVtrZXldID0gY3JlYXRlU3RhdGVLZXlTZXR0ZXIoY29tcG9uZW50LCBrZXkpKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlU3RhdGVLZXlTZXR0ZXIoY29tcG9uZW50LCBrZXkpIHtcbiAgLy8gUGFydGlhbCBzdGF0ZSBpcyBhbGxvY2F0ZWQgb3V0c2lkZSBvZiB0aGUgZnVuY3Rpb24gY2xvc3VyZSBzbyBpdCBjYW4gYmVcbiAgLy8gcmV1c2VkIHdpdGggZXZlcnkgY2FsbCwgYXZvaWRpbmcgbWVtb3J5IGFsbG9jYXRpb24gd2hlbiB0aGlzIGZ1bmN0aW9uXG4gIC8vIGlzIGNhbGxlZC5cbiAgdmFyIHBhcnRpYWxTdGF0ZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gc3RhdGVLZXlTZXR0ZXIodmFsdWUpIHtcbiAgICBwYXJ0aWFsU3RhdGVba2V5XSA9IHZhbHVlO1xuICAgIGNvbXBvbmVudC5zZXRTdGF0ZShwYXJ0aWFsU3RhdGUpO1xuICB9O1xufVxuXG5SZWFjdFN0YXRlU2V0dGVycy5NaXhpbiA9IHtcbiAgLyoqXG4gICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgYW5kIHVzZXMgdGhlIHJlc3VsdFxuICAgKiBvZiB0aGF0IHRvIHNldCB0aGUgY29tcG9uZW50J3Mgc3RhdGUuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCB0aGVzZSBzdGF0ZW1lbnRzIGFyZSBlcXVpdmFsZW50OlxuICAgKlxuICAgKiAgIHRoaXMuc2V0U3RhdGUoe3g6IDF9KTtcbiAgICogICB0aGlzLmNyZWF0ZVN0YXRlU2V0dGVyKGZ1bmN0aW9uKHhWYWx1ZSkge1xuICAgKiAgICAgcmV0dXJuIHt4OiB4VmFsdWV9O1xuICAgKiAgIH0pKDEpO1xuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jUmV0dXJuaW5nU3RhdGUgUmV0dXJuZWQgY2FsbGJhY2sgdXNlcyB0aGlzIHRvXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmUgaG93IHRvIHVwZGF0ZSBzdGF0ZS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IGNhbGxiYWNrIHRoYXQgd2hlbiBpbnZva2VkIHVzZXMgZnVuY1JldHVybmluZ1N0YXRlIHRvXG4gICAqICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmVkIHRoZSBvYmplY3QgbGl0ZXJhbCB0byBzZXRTdGF0ZS5cbiAgICovXG4gIGNyZWF0ZVN0YXRlU2V0dGVyOiBmdW5jdGlvbiAoZnVuY1JldHVybmluZ1N0YXRlKSB7XG4gICAgcmV0dXJuIFJlYWN0U3RhdGVTZXR0ZXJzLmNyZWF0ZVN0YXRlU2V0dGVyKHRoaXMsIGZ1bmNSZXR1cm5pbmdTdGF0ZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzaW5nbGUtYXJndW1lbnQgY2FsbGJhY2sgdGhhdCBjYW4gYmUgdXNlZCB0byB1cGRhdGUgYSBzaW5nbGVcbiAgICoga2V5IGluIHRoZSBjb21wb25lbnQncyBzdGF0ZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHRoZXNlIHN0YXRlbWVudHMgYXJlIGVxdWl2YWxlbnQ6XG4gICAqXG4gICAqICAgdGhpcy5zZXRTdGF0ZSh7eDogMX0pO1xuICAgKiAgIHRoaXMuY3JlYXRlU3RhdGVLZXlTZXR0ZXIoJ3gnKSgxKTtcbiAgICpcbiAgICogTm90ZTogdGhpcyBpcyBtZW1vaXplZCBmdW5jdGlvbiwgd2hpY2ggbWFrZXMgaXQgaW5leHBlbnNpdmUgdG8gY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IGluIHRoZSBzdGF0ZSB0aGF0IHlvdSBzaG91bGQgdXBkYXRlLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gY2FsbGJhY2sgb2YgMSBhcmd1bWVudCB3aGljaCBjYWxscyBzZXRTdGF0ZSgpIHdpdGhcbiAgICogICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBrZXlOYW1lIGFuZCBjYWxsYmFjayBhcmd1bWVudC5cbiAgICovXG4gIGNyZWF0ZVN0YXRlS2V5U2V0dGVyOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIFJlYWN0U3RhdGVTZXR0ZXJzLmNyZWF0ZVN0YXRlS2V5U2V0dGVyKHRoaXMsIGtleSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RTdGF0ZVNldHRlcnM7Il19