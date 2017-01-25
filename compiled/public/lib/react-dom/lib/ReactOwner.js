/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var invariant = require('fbjs/lib/invariant');

/**
 * @param {?object} object
 * @return {boolean} True if `object` is a valid owner.
 * @final
 */
function isValidOwner(object) {
  return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
}

/**
 * ReactOwners are capable of storing references to owned components.
 *
 * All components are capable of //being// referenced by owner components, but
 * only ReactOwner components are capable of //referencing// owned components.
 * The named reference is known as a "ref".
 *
 * Refs are available when mounted and updated during reconciliation.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return (
 *         <div onClick={this.handleClick}>
 *           <CustomComponent ref="custom" />
 *         </div>
 *       );
 *     },
 *     handleClick: function() {
 *       this.refs.custom.handleClick();
 *     },
 *     componentDidMount: function() {
 *       this.refs.custom.initialize();
 *     }
 *   });
 *
 * Refs should rarely be used. When refs are used, they should only be done to
 * control data that is not handled by React's data flow.
 *
 * @class ReactOwner
 */
var ReactOwner = {
  /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */
  addComponentAsRefTo: function addComponentAsRefTo(component, ref, owner) {
    !isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('119') : void 0;
    owner.attachRef(ref, component);
  },

  /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */
  removeComponentAsRefFrom: function removeComponentAsRefFrom(component, ref, owner) {
    !isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might be removing a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('120') : void 0;
    var ownerPublicInstance = owner.getPublicInstance();
    // Check that `component`'s owner is still alive and that `component` is still the current ref
    // because we do not want to detach the ref if another component stole it.
    if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
      owner.detachRef(ref);
    }
  }

};

module.exports = ReactOwner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdE93bmVyLmpzIl0sIm5hbWVzIjpbIl9wcm9kSW52YXJpYW50IiwicmVxdWlyZSIsImludmFyaWFudCIsImlzVmFsaWRPd25lciIsIm9iamVjdCIsImF0dGFjaFJlZiIsImRldGFjaFJlZiIsIlJlYWN0T3duZXIiLCJhZGRDb21wb25lbnRBc1JlZlRvIiwiY29tcG9uZW50IiwicmVmIiwib3duZXIiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJyZW1vdmVDb21wb25lbnRBc1JlZkZyb20iLCJvd25lclB1YmxpY0luc3RhbmNlIiwiZ2V0UHVibGljSW5zdGFuY2UiLCJyZWZzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSUEsaUJBQWlCQyxRQUFRLHNCQUFSLENBQXJCOztBQUVBLElBQUlDLFlBQVlELFFBQVEsb0JBQVIsQ0FBaEI7O0FBRUE7Ozs7O0FBS0EsU0FBU0UsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDNUIsU0FBTyxDQUFDLEVBQUVBLFVBQVUsT0FBT0EsT0FBT0MsU0FBZCxLQUE0QixVQUF0QyxJQUFvRCxPQUFPRCxPQUFPRSxTQUFkLEtBQTRCLFVBQWxGLENBQVI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLElBQUlDLGFBQWE7QUFDZjs7Ozs7Ozs7O0FBU0FDLHVCQUFxQiw2QkFBVUMsU0FBVixFQUFxQkMsR0FBckIsRUFBMEJDLEtBQTFCLEVBQWlDO0FBQ3BELEtBQUNSLGFBQWFRLEtBQWIsQ0FBRCxHQUF1QkMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDWixVQUFVLEtBQVYsRUFBaUIsa1FBQWpCLENBQXhDLEdBQStURixlQUFlLEtBQWYsQ0FBdFYsR0FBOFcsS0FBSyxDQUFuWDtBQUNBVyxVQUFNTixTQUFOLENBQWdCSyxHQUFoQixFQUFxQkQsU0FBckI7QUFDRCxHQWJjOztBQWVmOzs7Ozs7Ozs7QUFTQU0sNEJBQTBCLGtDQUFVTixTQUFWLEVBQXFCQyxHQUFyQixFQUEwQkMsS0FBMUIsRUFBaUM7QUFDekQsS0FBQ1IsYUFBYVEsS0FBYixDQUFELEdBQXVCQyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBekIsR0FBd0NaLFVBQVUsS0FBVixFQUFpQix5UUFBakIsQ0FBeEMsR0FBc1VGLGVBQWUsS0FBZixDQUE3VixHQUFxWCxLQUFLLENBQTFYO0FBQ0EsUUFBSWdCLHNCQUFzQkwsTUFBTU0saUJBQU4sRUFBMUI7QUFDQTtBQUNBO0FBQ0EsUUFBSUQsdUJBQXVCQSxvQkFBb0JFLElBQXBCLENBQXlCUixHQUF6QixNQUFrQ0QsVUFBVVEsaUJBQVYsRUFBN0QsRUFBNEY7QUFDMUZOLFlBQU1MLFNBQU4sQ0FBZ0JJLEdBQWhCO0FBQ0Q7QUFDRjs7QUFoQ2MsQ0FBakI7O0FBb0NBUyxPQUFPQyxPQUFQLEdBQWlCYixVQUFqQiIsImZpbGUiOiJSZWFjdE93bmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBvd25lci5cbiAqIEBmaW5hbFxuICovXG5mdW5jdGlvbiBpc1ZhbGlkT3duZXIob2JqZWN0KSB7XG4gIHJldHVybiAhIShvYmplY3QgJiYgdHlwZW9mIG9iamVjdC5hdHRhY2hSZWYgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iamVjdC5kZXRhY2hSZWYgPT09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIFJlYWN0T3duZXJzIGFyZSBjYXBhYmxlIG9mIHN0b3JpbmcgcmVmZXJlbmNlcyB0byBvd25lZCBjb21wb25lbnRzLlxuICpcbiAqIEFsbCBjb21wb25lbnRzIGFyZSBjYXBhYmxlIG9mIC8vYmVpbmcvLyByZWZlcmVuY2VkIGJ5IG93bmVyIGNvbXBvbmVudHMsIGJ1dFxuICogb25seSBSZWFjdE93bmVyIGNvbXBvbmVudHMgYXJlIGNhcGFibGUgb2YgLy9yZWZlcmVuY2luZy8vIG93bmVkIGNvbXBvbmVudHMuXG4gKiBUaGUgbmFtZWQgcmVmZXJlbmNlIGlzIGtub3duIGFzIGEgXCJyZWZcIi5cbiAqXG4gKiBSZWZzIGFyZSBhdmFpbGFibGUgd2hlbiBtb3VudGVkIGFuZCB1cGRhdGVkIGR1cmluZyByZWNvbmNpbGlhdGlvbi5cbiAqXG4gKiAgIHZhciBNeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIChcbiAqICAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAqICAgICAgICAgICA8Q3VzdG9tQ29tcG9uZW50IHJlZj1cImN1c3RvbVwiIC8+XG4gKiAgICAgICAgIDwvZGl2PlxuICogICAgICAgKTtcbiAqICAgICB9LFxuICogICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHRoaXMucmVmcy5jdXN0b20uaGFuZGxlQ2xpY2soKTtcbiAqICAgICB9LFxuICogICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHRoaXMucmVmcy5jdXN0b20uaW5pdGlhbGl6ZSgpO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogUmVmcyBzaG91bGQgcmFyZWx5IGJlIHVzZWQuIFdoZW4gcmVmcyBhcmUgdXNlZCwgdGhleSBzaG91bGQgb25seSBiZSBkb25lIHRvXG4gKiBjb250cm9sIGRhdGEgdGhhdCBpcyBub3QgaGFuZGxlZCBieSBSZWFjdCdzIGRhdGEgZmxvdy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RPd25lclxuICovXG52YXIgUmVhY3RPd25lciA9IHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjb21wb25lbnQgYnkgcmVmIHRvIGFuIG93bmVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byByZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBieSB3aGljaCB0byByZWZlciB0byB0aGUgY29tcG9uZW50LlxuICAgKiBAcGFyYW0ge1JlYWN0T3duZXJ9IG93bmVyIENvbXBvbmVudCBvbiB3aGljaCB0byByZWNvcmQgdGhlIHJlZi5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgYWRkQ29tcG9uZW50QXNSZWZUbzogZnVuY3Rpb24gKGNvbXBvbmVudCwgcmVmLCBvd25lcikge1xuICAgICFpc1ZhbGlkT3duZXIob3duZXIpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2FkZENvbXBvbmVudEFzUmVmVG8oLi4uKTogT25seSBhIFJlYWN0T3duZXIgY2FuIGhhdmUgcmVmcy4gWW91IG1pZ2h0IGJlIGFkZGluZyBhIHJlZiB0byBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgY3JlYXRlZCBpbnNpZGUgYSBjb21wb25lbnRcXCdzIGByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAoZGV0YWlsczogaHR0cHM6Ly9mYi5tZS9yZWFjdC1yZWZzLW11c3QtaGF2ZS1vd25lcikuJykgOiBfcHJvZEludmFyaWFudCgnMTE5JykgOiB2b2lkIDA7XG4gICAgb3duZXIuYXR0YWNoUmVmKHJlZiwgY29tcG9uZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNvbXBvbmVudCBieSByZWYgZnJvbSBhbiBvd25lciBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gZGVyZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBvZiB0aGUgcmVmIHRvIHJlbW92ZS5cbiAgICogQHBhcmFtIHtSZWFjdE93bmVyfSBvd25lciBDb21wb25lbnQgb24gd2hpY2ggdGhlIHJlZiBpcyByZWNvcmRlZC5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVtb3ZlQ29tcG9uZW50QXNSZWZGcm9tOiBmdW5jdGlvbiAoY29tcG9uZW50LCByZWYsIG93bmVyKSB7XG4gICAgIWlzVmFsaWRPd25lcihvd25lcikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAncmVtb3ZlQ29tcG9uZW50QXNSZWZGcm9tKC4uLik6IE9ubHkgYSBSZWFjdE93bmVyIGNhbiBoYXZlIHJlZnMuIFlvdSBtaWdodCBiZSByZW1vdmluZyBhIHJlZiB0byBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgY3JlYXRlZCBpbnNpZGUgYSBjb21wb25lbnRcXCdzIGByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAoZGV0YWlsczogaHR0cHM6Ly9mYi5tZS9yZWFjdC1yZWZzLW11c3QtaGF2ZS1vd25lcikuJykgOiBfcHJvZEludmFyaWFudCgnMTIwJykgOiB2b2lkIDA7XG4gICAgdmFyIG93bmVyUHVibGljSW5zdGFuY2UgPSBvd25lci5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgIC8vIENoZWNrIHRoYXQgYGNvbXBvbmVudGAncyBvd25lciBpcyBzdGlsbCBhbGl2ZSBhbmQgdGhhdCBgY29tcG9uZW50YCBpcyBzdGlsbCB0aGUgY3VycmVudCByZWZcbiAgICAvLyBiZWNhdXNlIHdlIGRvIG5vdCB3YW50IHRvIGRldGFjaCB0aGUgcmVmIGlmIGFub3RoZXIgY29tcG9uZW50IHN0b2xlIGl0LlxuICAgIGlmIChvd25lclB1YmxpY0luc3RhbmNlICYmIG93bmVyUHVibGljSW5zdGFuY2UucmVmc1tyZWZdID09PSBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKSkge1xuICAgICAgb3duZXIuZGV0YWNoUmVmKHJlZik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RPd25lcjsiXX0=