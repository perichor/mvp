/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyComponentFactory;

var ReactEmptyComponentInjection = {
  injectEmptyComponentFactory: function injectEmptyComponentFactory(factory) {
    emptyComponentFactory = factory;
  }
};

var ReactEmptyComponent = {
  create: function create(instantiate) {
    return emptyComponentFactory(instantiate);
  }
};

ReactEmptyComponent.injection = ReactEmptyComponentInjection;

module.exports = ReactEmptyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEVtcHR5Q29tcG9uZW50LmpzIl0sIm5hbWVzIjpbImVtcHR5Q29tcG9uZW50RmFjdG9yeSIsIlJlYWN0RW1wdHlDb21wb25lbnRJbmplY3Rpb24iLCJpbmplY3RFbXB0eUNvbXBvbmVudEZhY3RvcnkiLCJmYWN0b3J5IiwiUmVhY3RFbXB0eUNvbXBvbmVudCIsImNyZWF0ZSIsImluc3RhbnRpYXRlIiwiaW5qZWN0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxxQkFBSjs7QUFFQSxJQUFJQywrQkFBK0I7QUFDakNDLCtCQUE2QixxQ0FBVUMsT0FBVixFQUFtQjtBQUM5Q0gsNEJBQXdCRyxPQUF4QjtBQUNEO0FBSGdDLENBQW5DOztBQU1BLElBQUlDLHNCQUFzQjtBQUN4QkMsVUFBUSxnQkFBVUMsV0FBVixFQUF1QjtBQUM3QixXQUFPTixzQkFBc0JNLFdBQXRCLENBQVA7QUFDRDtBQUh1QixDQUExQjs7QUFNQUYsb0JBQW9CRyxTQUFwQixHQUFnQ04sNEJBQWhDOztBQUVBTyxPQUFPQyxPQUFQLEdBQWlCTCxtQkFBakIiLCJmaWxlIjoiUmVhY3RFbXB0eUNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUNvbXBvbmVudEZhY3Rvcnk7XG5cbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50SW5qZWN0aW9uID0ge1xuICBpbmplY3RFbXB0eUNvbXBvbmVudEZhY3Rvcnk6IGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgZW1wdHlDb21wb25lbnRGYWN0b3J5ID0gZmFjdG9yeTtcbiAgfVxufTtcblxudmFyIFJlYWN0RW1wdHlDb21wb25lbnQgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24gKGluc3RhbnRpYXRlKSB7XG4gICAgcmV0dXJuIGVtcHR5Q29tcG9uZW50RmFjdG9yeShpbnN0YW50aWF0ZSk7XG4gIH1cbn07XG5cblJlYWN0RW1wdHlDb21wb25lbnQuaW5qZWN0aW9uID0gUmVhY3RFbXB0eUNvbXBvbmVudEluamVjdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVtcHR5Q29tcG9uZW50OyJdfQ==