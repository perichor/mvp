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

var ARIADOMPropertyConfig = {
  Properties: {
    // Global States and Properties
    'aria-current': 0, // state
    'aria-details': 0,
    'aria-disabled': 0, // state
    'aria-hidden': 0, // state
    'aria-invalid': 0, // state
    'aria-keyshortcuts': 0,
    'aria-label': 0,
    'aria-roledescription': 0,
    // Widget Attributes
    'aria-autocomplete': 0,
    'aria-checked': 0,
    'aria-expanded': 0,
    'aria-haspopup': 0,
    'aria-level': 0,
    'aria-modal': 0,
    'aria-multiline': 0,
    'aria-multiselectable': 0,
    'aria-orientation': 0,
    'aria-placeholder': 0,
    'aria-pressed': 0,
    'aria-readonly': 0,
    'aria-required': 0,
    'aria-selected': 0,
    'aria-sort': 0,
    'aria-valuemax': 0,
    'aria-valuemin': 0,
    'aria-valuenow': 0,
    'aria-valuetext': 0,
    // Live Region Attributes
    'aria-atomic': 0,
    'aria-busy': 0,
    'aria-live': 0,
    'aria-relevant': 0,
    // Drag-and-Drop Attributes
    'aria-dropeffect': 0,
    'aria-grabbed': 0,
    // Relationship Attributes
    'aria-activedescendant': 0,
    'aria-colcount': 0,
    'aria-colindex': 0,
    'aria-colspan': 0,
    'aria-controls': 0,
    'aria-describedby': 0,
    'aria-errormessage': 0,
    'aria-flowto': 0,
    'aria-labelledby': 0,
    'aria-owns': 0,
    'aria-posinset': 0,
    'aria-rowcount': 0,
    'aria-rowindex': 0,
    'aria-rowspan': 0,
    'aria-setsize': 0
  },
  DOMAttributeNames: {},
  DOMPropertyNames: {}
};

module.exports = ARIADOMPropertyConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9BUklBRE9NUHJvcGVydHlDb25maWcuanMiXSwibmFtZXMiOlsiQVJJQURPTVByb3BlcnR5Q29uZmlnIiwiUHJvcGVydGllcyIsIkRPTUF0dHJpYnV0ZU5hbWVzIiwiRE9NUHJvcGVydHlOYW1lcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsd0JBQXdCO0FBQzFCQyxjQUFZO0FBQ1Y7QUFDQSxvQkFBZ0IsQ0FGTixFQUVTO0FBQ25CLG9CQUFnQixDQUhOO0FBSVYscUJBQWlCLENBSlAsRUFJVTtBQUNwQixtQkFBZSxDQUxMLEVBS1E7QUFDbEIsb0JBQWdCLENBTk4sRUFNUztBQUNuQix5QkFBcUIsQ0FQWDtBQVFWLGtCQUFjLENBUko7QUFTViw0QkFBd0IsQ0FUZDtBQVVWO0FBQ0EseUJBQXFCLENBWFg7QUFZVixvQkFBZ0IsQ0FaTjtBQWFWLHFCQUFpQixDQWJQO0FBY1YscUJBQWlCLENBZFA7QUFlVixrQkFBYyxDQWZKO0FBZ0JWLGtCQUFjLENBaEJKO0FBaUJWLHNCQUFrQixDQWpCUjtBQWtCViw0QkFBd0IsQ0FsQmQ7QUFtQlYsd0JBQW9CLENBbkJWO0FBb0JWLHdCQUFvQixDQXBCVjtBQXFCVixvQkFBZ0IsQ0FyQk47QUFzQlYscUJBQWlCLENBdEJQO0FBdUJWLHFCQUFpQixDQXZCUDtBQXdCVixxQkFBaUIsQ0F4QlA7QUF5QlYsaUJBQWEsQ0F6Qkg7QUEwQlYscUJBQWlCLENBMUJQO0FBMkJWLHFCQUFpQixDQTNCUDtBQTRCVixxQkFBaUIsQ0E1QlA7QUE2QlYsc0JBQWtCLENBN0JSO0FBOEJWO0FBQ0EsbUJBQWUsQ0EvQkw7QUFnQ1YsaUJBQWEsQ0FoQ0g7QUFpQ1YsaUJBQWEsQ0FqQ0g7QUFrQ1YscUJBQWlCLENBbENQO0FBbUNWO0FBQ0EsdUJBQW1CLENBcENUO0FBcUNWLG9CQUFnQixDQXJDTjtBQXNDVjtBQUNBLDZCQUF5QixDQXZDZjtBQXdDVixxQkFBaUIsQ0F4Q1A7QUF5Q1YscUJBQWlCLENBekNQO0FBMENWLG9CQUFnQixDQTFDTjtBQTJDVixxQkFBaUIsQ0EzQ1A7QUE0Q1Ysd0JBQW9CLENBNUNWO0FBNkNWLHlCQUFxQixDQTdDWDtBQThDVixtQkFBZSxDQTlDTDtBQStDVix1QkFBbUIsQ0EvQ1Q7QUFnRFYsaUJBQWEsQ0FoREg7QUFpRFYscUJBQWlCLENBakRQO0FBa0RWLHFCQUFpQixDQWxEUDtBQW1EVixxQkFBaUIsQ0FuRFA7QUFvRFYsb0JBQWdCLENBcEROO0FBcURWLG9CQUFnQjtBQXJETixHQURjO0FBd0QxQkMscUJBQW1CLEVBeERPO0FBeUQxQkMsb0JBQWtCO0FBekRRLENBQTVCOztBQTREQUMsT0FBT0MsT0FBUCxHQUFpQkwscUJBQWpCIiwiZmlsZSI6IkFSSUFET01Qcm9wZXJ0eUNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBUklBRE9NUHJvcGVydHlDb25maWcgPSB7XG4gIFByb3BlcnRpZXM6IHtcbiAgICAvLyBHbG9iYWwgU3RhdGVzIGFuZCBQcm9wZXJ0aWVzXG4gICAgJ2FyaWEtY3VycmVudCc6IDAsIC8vIHN0YXRlXG4gICAgJ2FyaWEtZGV0YWlscyc6IDAsXG4gICAgJ2FyaWEtZGlzYWJsZWQnOiAwLCAvLyBzdGF0ZVxuICAgICdhcmlhLWhpZGRlbic6IDAsIC8vIHN0YXRlXG4gICAgJ2FyaWEtaW52YWxpZCc6IDAsIC8vIHN0YXRlXG4gICAgJ2FyaWEta2V5c2hvcnRjdXRzJzogMCxcbiAgICAnYXJpYS1sYWJlbCc6IDAsXG4gICAgJ2FyaWEtcm9sZWRlc2NyaXB0aW9uJzogMCxcbiAgICAvLyBXaWRnZXQgQXR0cmlidXRlc1xuICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IDAsXG4gICAgJ2FyaWEtY2hlY2tlZCc6IDAsXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiAwLFxuICAgICdhcmlhLWhhc3BvcHVwJzogMCxcbiAgICAnYXJpYS1sZXZlbCc6IDAsXG4gICAgJ2FyaWEtbW9kYWwnOiAwLFxuICAgICdhcmlhLW11bHRpbGluZSc6IDAsXG4gICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogMCxcbiAgICAnYXJpYS1vcmllbnRhdGlvbic6IDAsXG4gICAgJ2FyaWEtcGxhY2Vob2xkZXInOiAwLFxuICAgICdhcmlhLXByZXNzZWQnOiAwLFxuICAgICdhcmlhLXJlYWRvbmx5JzogMCxcbiAgICAnYXJpYS1yZXF1aXJlZCc6IDAsXG4gICAgJ2FyaWEtc2VsZWN0ZWQnOiAwLFxuICAgICdhcmlhLXNvcnQnOiAwLFxuICAgICdhcmlhLXZhbHVlbWF4JzogMCxcbiAgICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICAgJ2FyaWEtdmFsdWVub3cnOiAwLFxuICAgICdhcmlhLXZhbHVldGV4dCc6IDAsXG4gICAgLy8gTGl2ZSBSZWdpb24gQXR0cmlidXRlc1xuICAgICdhcmlhLWF0b21pYyc6IDAsXG4gICAgJ2FyaWEtYnVzeSc6IDAsXG4gICAgJ2FyaWEtbGl2ZSc6IDAsXG4gICAgJ2FyaWEtcmVsZXZhbnQnOiAwLFxuICAgIC8vIERyYWctYW5kLURyb3AgQXR0cmlidXRlc1xuICAgICdhcmlhLWRyb3BlZmZlY3QnOiAwLFxuICAgICdhcmlhLWdyYWJiZWQnOiAwLFxuICAgIC8vIFJlbGF0aW9uc2hpcCBBdHRyaWJ1dGVzXG4gICAgJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IDAsXG4gICAgJ2FyaWEtY29sY291bnQnOiAwLFxuICAgICdhcmlhLWNvbGluZGV4JzogMCxcbiAgICAnYXJpYS1jb2xzcGFuJzogMCxcbiAgICAnYXJpYS1jb250cm9scyc6IDAsXG4gICAgJ2FyaWEtZGVzY3JpYmVkYnknOiAwLFxuICAgICdhcmlhLWVycm9ybWVzc2FnZSc6IDAsXG4gICAgJ2FyaWEtZmxvd3RvJzogMCxcbiAgICAnYXJpYS1sYWJlbGxlZGJ5JzogMCxcbiAgICAnYXJpYS1vd25zJzogMCxcbiAgICAnYXJpYS1wb3NpbnNldCc6IDAsXG4gICAgJ2FyaWEtcm93Y291bnQnOiAwLFxuICAgICdhcmlhLXJvd2luZGV4JzogMCxcbiAgICAnYXJpYS1yb3dzcGFuJzogMCxcbiAgICAnYXJpYS1zZXRzaXplJzogMFxuICB9LFxuICBET01BdHRyaWJ1dGVOYW1lczoge30sXG4gIERPTVByb3BlcnR5TmFtZXM6IHt9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFSSUFET01Qcm9wZXJ0eUNvbmZpZzsiXX0=