/**
 * Copyright 2014-present, Facebook, Inc.
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

var injected = false;

var ReactComponentEnvironment = {

  /**
   * Optionally injectable hook for swapping out mount images in the middle of
   * the tree.
   */
  replaceNodeWithMarkup: null,

  /**
   * Optionally injectable hook for processing a queue of child updates. Will
   * later move into MultiChildComponents.
   */
  processChildrenUpdates: null,

  injection: {
    injectEnvironment: function injectEnvironment(environment) {
      !!injected ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : _prodInvariant('104') : void 0;
      ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
      injected = true;
    }
  }

};

module.exports = ReactComponentEnvironment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50LmpzIl0sIm5hbWVzIjpbIl9wcm9kSW52YXJpYW50IiwicmVxdWlyZSIsImludmFyaWFudCIsImluamVjdGVkIiwiUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCIsInJlcGxhY2VOb2RlV2l0aE1hcmt1cCIsInByb2Nlc3NDaGlsZHJlblVwZGF0ZXMiLCJpbmplY3Rpb24iLCJpbmplY3RFbnZpcm9ubWVudCIsImVudmlyb25tZW50IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSUEsaUJBQWlCQyxRQUFRLHNCQUFSLENBQXJCOztBQUVBLElBQUlDLFlBQVlELFFBQVEsb0JBQVIsQ0FBaEI7O0FBRUEsSUFBSUUsV0FBVyxLQUFmOztBQUVBLElBQUlDLDRCQUE0Qjs7QUFFOUI7Ozs7QUFJQUMseUJBQXVCLElBTk87O0FBUTlCOzs7O0FBSUFDLDBCQUF3QixJQVpNOztBQWM5QkMsYUFBVztBQUNUQyx1QkFBbUIsMkJBQVVDLFdBQVYsRUFBdUI7QUFDeEMsT0FBQyxDQUFDTixRQUFGLEdBQWFPLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixHQUF3Q1YsVUFBVSxLQUFWLEVBQWlCLHVFQUFqQixDQUF4QyxHQUFvSUYsZUFBZSxLQUFmLENBQWpKLEdBQXlLLEtBQUssQ0FBOUs7QUFDQUksZ0NBQTBCQyxxQkFBMUIsR0FBa0RJLFlBQVlKLHFCQUE5RDtBQUNBRCxnQ0FBMEJFLHNCQUExQixHQUFtREcsWUFBWUgsc0JBQS9EO0FBQ0FILGlCQUFXLElBQVg7QUFDRDtBQU5ROztBQWRtQixDQUFoQzs7QUF5QkFVLE9BQU9DLE9BQVAsR0FBaUJWLHlCQUFqQiIsImZpbGUiOiJSZWFjdENvbXBvbmVudEVudmlyb25tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBpbmplY3RlZCA9IGZhbHNlO1xuXG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHtcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBpbmplY3RhYmxlIGhvb2sgZm9yIHN3YXBwaW5nIG91dCBtb3VudCBpbWFnZXMgaW4gdGhlIG1pZGRsZSBvZlxuICAgKiB0aGUgdHJlZS5cbiAgICovXG4gIHJlcGxhY2VOb2RlV2l0aE1hcmt1cDogbnVsbCxcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBpbmplY3RhYmxlIGhvb2sgZm9yIHByb2Nlc3NpbmcgYSBxdWV1ZSBvZiBjaGlsZCB1cGRhdGVzLiBXaWxsXG4gICAqIGxhdGVyIG1vdmUgaW50byBNdWx0aUNoaWxkQ29tcG9uZW50cy5cbiAgICovXG4gIHByb2Nlc3NDaGlsZHJlblVwZGF0ZXM6IG51bGwsXG5cbiAgaW5qZWN0aW9uOiB7XG4gICAgaW5qZWN0RW52aXJvbm1lbnQ6IGZ1bmN0aW9uIChlbnZpcm9ubWVudCkge1xuICAgICAgISFpbmplY3RlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudDogaW5qZWN0RW52aXJvbm1lbnQoKSBjYW4gb25seSBiZSBjYWxsZWQgb25jZS4nKSA6IF9wcm9kSW52YXJpYW50KCcxMDQnKSA6IHZvaWQgMDtcbiAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwID0gZW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwO1xuICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzID0gZW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcztcbiAgICAgIGluamVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudEVudmlyb25tZW50OyJdfQ==