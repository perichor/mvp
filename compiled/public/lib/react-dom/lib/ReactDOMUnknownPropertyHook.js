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

var DOMProperty = require('./DOMProperty');
var EventPluginRegistry = require('./EventPluginRegistry');
var ReactComponentTreeHook = require('react/lib/ReactComponentTreeHook');

var warning = require('fbjs/lib/warning');

if (process.env.NODE_ENV !== 'production') {
  var reactProps = {
    children: true,
    dangerouslySetInnerHTML: true,
    key: true,
    ref: true,

    autoFocus: true,
    defaultValue: true,
    valueLink: true,
    defaultChecked: true,
    checkedLink: true,
    innerHTML: true,
    suppressContentEditableWarning: true,
    onFocusIn: true,
    onFocusOut: true
  };
  var warnedProperties = {};

  var validateProperty = function validateProperty(tagName, name, debugID) {
    if (DOMProperty.properties.hasOwnProperty(name) || DOMProperty.isCustomAttribute(name)) {
      return true;
    }
    if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
      return true;
    }
    if (EventPluginRegistry.registrationNameModules.hasOwnProperty(name)) {
      return true;
    }
    warnedProperties[name] = true;
    var lowerCasedName = name.toLowerCase();

    // data-* attributes should be lowercase; suggest the lowercase version
    var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;

    var registrationName = EventPluginRegistry.possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? EventPluginRegistry.possibleRegistrationNames[lowerCasedName] : null;

    if (standardName != null) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown DOM property %s. Did you mean %s?%s', name, standardName, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
      return true;
    } else if (registrationName != null) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown event handler property %s. Did you mean `%s`?%s', name, registrationName, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
      return true;
    } else {
      // We were unable to guess which prop the user intended.
      // It is likely that the user was just blindly spreading/forwarding props
      // Components should be careful to only render valid props/attributes.
      // Warning will be invoked in warnUnknownProperties to allow grouping.
      return false;
    }
  };
}

var warnUnknownProperties = function warnUnknownProperties(debugID, element) {
  var unknownProps = [];
  for (var key in element.props) {
    var isValid = validateProperty(element.type, key, debugID);
    if (!isValid) {
      unknownProps.push(key);
    }
  }

  var unknownPropString = unknownProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');

  if (unknownProps.length === 1) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown prop %s on <%s> tag. Remove this prop from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
  } else if (unknownProps.length > 1) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown props %s on <%s> tag. Remove these props from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
  }
};

function handleElement(debugID, element) {
  if (element == null || typeof element.type !== 'string') {
    return;
  }
  if (element.type.indexOf('-') >= 0 || element.props.is) {
    return;
  }
  warnUnknownProperties(debugID, element);
}

var ReactDOMUnknownPropertyHook = {
  onBeforeMountComponent: function onBeforeMountComponent(debugID, element) {
    handleElement(debugID, element);
  },
  onBeforeUpdateComponent: function onBeforeUpdateComponent(debugID, element) {
    handleElement(debugID, element);
  }
};

module.exports = ReactDOMUnknownPropertyHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdERPTVVua25vd25Qcm9wZXJ0eUhvb2suanMiXSwibmFtZXMiOlsiRE9NUHJvcGVydHkiLCJyZXF1aXJlIiwiRXZlbnRQbHVnaW5SZWdpc3RyeSIsIlJlYWN0Q29tcG9uZW50VHJlZUhvb2siLCJ3YXJuaW5nIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicmVhY3RQcm9wcyIsImNoaWxkcmVuIiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJrZXkiLCJyZWYiLCJhdXRvRm9jdXMiLCJkZWZhdWx0VmFsdWUiLCJ2YWx1ZUxpbmsiLCJkZWZhdWx0Q2hlY2tlZCIsImNoZWNrZWRMaW5rIiwiaW5uZXJIVE1MIiwic3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nIiwib25Gb2N1c0luIiwib25Gb2N1c091dCIsIndhcm5lZFByb3BlcnRpZXMiLCJ2YWxpZGF0ZVByb3BlcnR5IiwidGFnTmFtZSIsIm5hbWUiLCJkZWJ1Z0lEIiwicHJvcGVydGllcyIsImhhc093blByb3BlcnR5IiwiaXNDdXN0b21BdHRyaWJ1dGUiLCJyZWdpc3RyYXRpb25OYW1lTW9kdWxlcyIsImxvd2VyQ2FzZWROYW1lIiwidG9Mb3dlckNhc2UiLCJzdGFuZGFyZE5hbWUiLCJnZXRQb3NzaWJsZVN0YW5kYXJkTmFtZSIsInJlZ2lzdHJhdGlvbk5hbWUiLCJwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzIiwiZ2V0U3RhY2tBZGRlbmR1bUJ5SUQiLCJ3YXJuVW5rbm93blByb3BlcnRpZXMiLCJlbGVtZW50IiwidW5rbm93blByb3BzIiwicHJvcHMiLCJpc1ZhbGlkIiwidHlwZSIsInB1c2giLCJ1bmtub3duUHJvcFN0cmluZyIsIm1hcCIsInByb3AiLCJqb2luIiwibGVuZ3RoIiwiaGFuZGxlRWxlbWVudCIsImluZGV4T2YiLCJpcyIsIlJlYWN0RE9NVW5rbm93blByb3BlcnR5SG9vayIsIm9uQmVmb3JlTW91bnRDb21wb25lbnQiLCJvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsY0FBY0MsUUFBUSxlQUFSLENBQWxCO0FBQ0EsSUFBSUMsc0JBQXNCRCxRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSUUseUJBQXlCRixRQUFRLGtDQUFSLENBQTdCOztBQUVBLElBQUlHLFVBQVVILFFBQVEsa0JBQVIsQ0FBZDs7QUFFQSxJQUFJSSxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsTUFBSUMsYUFBYTtBQUNmQyxjQUFVLElBREs7QUFFZkMsNkJBQXlCLElBRlY7QUFHZkMsU0FBSyxJQUhVO0FBSWZDLFNBQUssSUFKVTs7QUFNZkMsZUFBVyxJQU5JO0FBT2ZDLGtCQUFjLElBUEM7QUFRZkMsZUFBVyxJQVJJO0FBU2ZDLG9CQUFnQixJQVREO0FBVWZDLGlCQUFhLElBVkU7QUFXZkMsZUFBVyxJQVhJO0FBWWZDLG9DQUFnQyxJQVpqQjtBQWFmQyxlQUFXLElBYkk7QUFjZkMsZ0JBQVk7QUFkRyxHQUFqQjtBQWdCQSxNQUFJQyxtQkFBbUIsRUFBdkI7O0FBRUEsTUFBSUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBVUMsT0FBVixFQUFtQkMsSUFBbkIsRUFBeUJDLE9BQXpCLEVBQWtDO0FBQ3ZELFFBQUkxQixZQUFZMkIsVUFBWixDQUF1QkMsY0FBdkIsQ0FBc0NILElBQXRDLEtBQStDekIsWUFBWTZCLGlCQUFaLENBQThCSixJQUE5QixDQUFuRCxFQUF3RjtBQUN0RixhQUFPLElBQVA7QUFDRDtBQUNELFFBQUlqQixXQUFXb0IsY0FBWCxDQUEwQkgsSUFBMUIsS0FBbUNqQixXQUFXaUIsSUFBWCxDQUFuQyxJQUF1REgsaUJBQWlCTSxjQUFqQixDQUFnQ0gsSUFBaEMsS0FBeUNILGlCQUFpQkcsSUFBakIsQ0FBcEcsRUFBNEg7QUFDMUgsYUFBTyxJQUFQO0FBQ0Q7QUFD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QUFvQkEsU0FBU3dCLGFBQVQsQ0FBdUJ4QixPQUF2QixFQUFnQ2EsT0FBaEMsRUFBeUM7QUFDdkMsTUFBSUEsV0FBVyxJQUFYLElBQW1CLE9BQU9BLFFBQVFJLElBQWYsS0FBd0IsUUFBL0MsRUFBeUQ7QUFDdkQ7QUFDRDtBQUNELE1BQUlKLFFBQVFJLElBQVIsQ0FBYVEsT0FBYixDQUFxQixHQUFyQixLQUE2QixDQUE3QixJQUFrQ1osUUFBUUUsS0FBUixDQUFjVyxFQUFwRCxFQUF3RDtBQUN0RDtBQUNEO0FBQ0RkLHdCQUFzQlosT0FBdEIsRUFBK0JhLE9BQS9CO0FBQ0Q7O0FBRUQsSUFBSWMsOEJBQThCO0FBQ2hDQywwQkFBd0IsZ0NBQVU1QixPQUFWLEVBQW1CYSxPQUFuQixFQUE0QjtBQUNsRFcsa0JBQWN4QixPQUFkLEVBQXVCYSxPQUF2QjtBQUNELEdBSCtCO0FBSWhDZ0IsMkJBQXlCLGlDQUFVN0IsT0FBVixFQUFtQmEsT0FBbkIsRUFBNEI7QUFDbkRXLGtCQUFjeEIsT0FBZCxFQUF1QmEsT0FBdkI7QUFDRDtBQU4rQixDQUFsQzs7QUFTQWlCLE9BQU9DLE9BQVAsR0FBaUJKLDJCQUFqQiIsImZpbGUiOiJSZWFjdERPTVVua25vd25Qcm9wZXJ0eUhvb2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRE9NUHJvcGVydHkgPSByZXF1aXJlKCcuL0RPTVByb3BlcnR5Jyk7XG52YXIgRXZlbnRQbHVnaW5SZWdpc3RyeSA9IHJlcXVpcmUoJy4vRXZlbnRQbHVnaW5SZWdpc3RyeScpO1xudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHJlYWN0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46IHRydWUsXG4gICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHRydWUsXG4gICAga2V5OiB0cnVlLFxuICAgIHJlZjogdHJ1ZSxcblxuICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgdmFsdWVMaW5rOiB0cnVlLFxuICAgIGRlZmF1bHRDaGVja2VkOiB0cnVlLFxuICAgIGNoZWNrZWRMaW5rOiB0cnVlLFxuICAgIGlubmVySFRNTDogdHJ1ZSxcbiAgICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmc6IHRydWUsXG4gICAgb25Gb2N1c0luOiB0cnVlLFxuICAgIG9uRm9jdXNPdXQ6IHRydWVcbiAgfTtcbiAgdmFyIHdhcm5lZFByb3BlcnRpZXMgPSB7fTtcblxuICB2YXIgdmFsaWRhdGVQcm9wZXJ0eSA9IGZ1bmN0aW9uICh0YWdOYW1lLCBuYW1lLCBkZWJ1Z0lEKSB7XG4gICAgaWYgKERPTVByb3BlcnR5LnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobmFtZSkgfHwgRE9NUHJvcGVydHkuaXNDdXN0b21BdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAocmVhY3RQcm9wcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiByZWFjdFByb3BzW25hbWVdIHx8IHdhcm5lZFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgd2FybmVkUHJvcGVydGllc1tuYW1lXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgd2FybmVkUHJvcGVydGllc1tuYW1lXSA9IHRydWU7XG4gICAgdmFyIGxvd2VyQ2FzZWROYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gZGF0YS0qIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGxvd2VyY2FzZTsgc3VnZ2VzdCB0aGUgbG93ZXJjYXNlIHZlcnNpb25cbiAgICB2YXIgc3RhbmRhcmROYW1lID0gRE9NUHJvcGVydHkuaXNDdXN0b21BdHRyaWJ1dGUobG93ZXJDYXNlZE5hbWUpID8gbG93ZXJDYXNlZE5hbWUgOiBET01Qcm9wZXJ0eS5nZXRQb3NzaWJsZVN0YW5kYXJkTmFtZS5oYXNPd25Qcm9wZXJ0eShsb3dlckNhc2VkTmFtZSkgPyBET01Qcm9wZXJ0eS5nZXRQb3NzaWJsZVN0YW5kYXJkTmFtZVtsb3dlckNhc2VkTmFtZV0gOiBudWxsO1xuXG4gICAgdmFyIHJlZ2lzdHJhdGlvbk5hbWUgPSBFdmVudFBsdWdpblJlZ2lzdHJ5LnBvc3NpYmxlUmVnaXN0cmF0aW9uTmFtZXMuaGFzT3duUHJvcGVydHkobG93ZXJDYXNlZE5hbWUpID8gRXZlbnRQbHVnaW5SZWdpc3RyeS5wb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzW2xvd2VyQ2FzZWROYW1lXSA6IG51bGw7XG5cbiAgICBpZiAoc3RhbmRhcmROYW1lICE9IG51bGwpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnVW5rbm93biBET00gcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiAlcz8lcycsIG5hbWUsIHN0YW5kYXJkTmFtZSwgUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChkZWJ1Z0lEKSkgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHJlZ2lzdHJhdGlvbk5hbWUgIT0gbnVsbCkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdVbmtub3duIGV2ZW50IGhhbmRsZXIgcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiBgJXNgPyVzJywgbmFtZSwgcmVnaXN0cmF0aW9uTmFtZSwgUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChkZWJ1Z0lEKSkgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2Ugd2VyZSB1bmFibGUgdG8gZ3Vlc3Mgd2hpY2ggcHJvcCB0aGUgdXNlciBpbnRlbmRlZC5cbiAgICAgIC8vIEl0IGlzIGxpa2VseSB0aGF0IHRoZSB1c2VyIHdhcyBqdXN0IGJsaW5kbHkgc3ByZWFkaW5nL2ZvcndhcmRpbmcgcHJvcHNcbiAgICAgIC8vIENvbXBvbmVudHMgc2hvdWxkIGJlIGNhcmVmdWwgdG8gb25seSByZW5kZXIgdmFsaWQgcHJvcHMvYXR0cmlidXRlcy5cbiAgICAgIC8vIFdhcm5pbmcgd2lsbCBiZSBpbnZva2VkIGluIHdhcm5Vbmtub3duUHJvcGVydGllcyB0byBhbGxvdyBncm91cGluZy5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59XG5cbnZhciB3YXJuVW5rbm93blByb3BlcnRpZXMgPSBmdW5jdGlvbiAoZGVidWdJRCwgZWxlbWVudCkge1xuICB2YXIgdW5rbm93blByb3BzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBlbGVtZW50LnByb3BzKSB7XG4gICAgdmFyIGlzVmFsaWQgPSB2YWxpZGF0ZVByb3BlcnR5KGVsZW1lbnQudHlwZSwga2V5LCBkZWJ1Z0lEKTtcbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgIHVua25vd25Qcm9wcy5wdXNoKGtleSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHVua25vd25Qcm9wU3RyaW5nID0gdW5rbm93blByb3BzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgIHJldHVybiAnYCcgKyBwcm9wICsgJ2AnO1xuICB9KS5qb2luKCcsICcpO1xuXG4gIGlmICh1bmtub3duUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdVbmtub3duIHByb3AgJXMgb24gPCVzPiB0YWcuIFJlbW92ZSB0aGlzIHByb3AgZnJvbSB0aGUgZWxlbWVudC4gJyArICdGb3IgZGV0YWlscywgc2VlIGh0dHBzOi8vZmIubWUvcmVhY3QtdW5rbm93bi1wcm9wJXMnLCB1bmtub3duUHJvcFN0cmluZywgZWxlbWVudC50eXBlLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGRlYnVnSUQpKSA6IHZvaWQgMDtcbiAgfSBlbHNlIGlmICh1bmtub3duUHJvcHMubGVuZ3RoID4gMSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnVW5rbm93biBwcm9wcyAlcyBvbiA8JXM+IHRhZy4gUmVtb3ZlIHRoZXNlIHByb3BzIGZyb20gdGhlIGVsZW1lbnQuICcgKyAnRm9yIGRldGFpbHMsIHNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXVua25vd24tcHJvcCVzJywgdW5rbm93blByb3BTdHJpbmcsIGVsZW1lbnQudHlwZSwgUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChkZWJ1Z0lEKSkgOiB2b2lkIDA7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGhhbmRsZUVsZW1lbnQoZGVidWdJRCwgZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PSBudWxsIHx8IHR5cGVvZiBlbGVtZW50LnR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbGVtZW50LnR5cGUuaW5kZXhPZignLScpID49IDAgfHwgZWxlbWVudC5wcm9wcy5pcykge1xuICAgIHJldHVybjtcbiAgfVxuICB3YXJuVW5rbm93blByb3BlcnRpZXMoZGVidWdJRCwgZWxlbWVudCk7XG59XG5cbnZhciBSZWFjdERPTVVua25vd25Qcm9wZXJ0eUhvb2sgPSB7XG4gIG9uQmVmb3JlTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChkZWJ1Z0lELCBlbGVtZW50KSB7XG4gICAgaGFuZGxlRWxlbWVudChkZWJ1Z0lELCBlbGVtZW50KTtcbiAgfSxcbiAgb25CZWZvcmVVcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChkZWJ1Z0lELCBlbGVtZW50KSB7XG4gICAgaGFuZGxlRWxlbWVudChkZWJ1Z0lELCBlbGVtZW50KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTVVua25vd25Qcm9wZXJ0eUhvb2s7Il19