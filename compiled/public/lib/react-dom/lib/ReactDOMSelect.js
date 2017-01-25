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

var _assign = require('object-assign');

var LinkedValueUtils = require('./LinkedValueUtils');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactUpdates = require('./ReactUpdates');

var warning = require('fbjs/lib/warning');

var didWarnValueLink = false;
var didWarnValueDefaultValue = false;

function updateOptionsIfPendingUpdateAndMounted() {
  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
    this._wrapperState.pendingUpdate = false;

    var props = this._currentElement.props;
    var value = LinkedValueUtils.getValue(props);

    if (value != null) {
      updateOptions(this, Boolean(props.multiple), value);
    }
  }
}

function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

var valuePropNames = ['value', 'defaultValue'];

/**
 * Validation function for `value` and `defaultValue`.
 * @private
 */
function checkSelectPropTypes(inst, props) {
  var owner = inst._currentElement._owner;
  LinkedValueUtils.checkPropTypes('select', props, owner);

  if (props.valueLink !== undefined && !didWarnValueLink) {
    process.env.NODE_ENV !== 'production' ? warning(false, '`valueLink` prop on `select` is deprecated; set `value` and `onChange` instead.') : void 0;
    didWarnValueLink = true;
  }

  for (var i = 0; i < valuePropNames.length; i++) {
    var propName = valuePropNames[i];
    if (props[propName] == null) {
      continue;
    }
    var isArray = Array.isArray(props[propName]);
    if (props.multiple && !isArray) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum(owner)) : void 0;
    } else if (!props.multiple && isArray) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum(owner)) : void 0;
    }
  }
}

/**
 * @param {ReactDOMComponent} inst
 * @param {boolean} multiple
 * @param {*} propValue A stringable (with `multiple`, a list of stringables).
 * @private
 */
function updateOptions(inst, multiple, propValue) {
  var selectedValue, i;
  var options = ReactDOMComponentTree.getNodeFromInstance(inst).options;

  if (multiple) {
    selectedValue = {};
    for (i = 0; i < propValue.length; i++) {
      selectedValue['' + propValue[i]] = true;
    }
    for (i = 0; i < options.length; i++) {
      var selected = selectedValue.hasOwnProperty(options[i].value);
      if (options[i].selected !== selected) {
        options[i].selected = selected;
      }
    }
  } else {
    // Do not set `select.value` as exact behavior isn't consistent across all
    // browsers for all cases.
    selectedValue = '' + propValue;
    for (i = 0; i < options.length; i++) {
      if (options[i].value === selectedValue) {
        options[i].selected = true;
        return;
      }
    }
    if (options.length) {
      options[0].selected = true;
    }
  }
}

/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */
var ReactDOMSelect = {
  getHostProps: function getHostProps(inst, props) {
    return _assign({}, props, {
      onChange: inst._wrapperState.onChange,
      value: undefined
    });
  },

  mountWrapper: function mountWrapper(inst, props) {
    if (process.env.NODE_ENV !== 'production') {
      checkSelectPropTypes(inst, props);
    }

    var value = LinkedValueUtils.getValue(props);
    inst._wrapperState = {
      pendingUpdate: false,
      initialValue: value != null ? value : props.defaultValue,
      listeners: null,
      onChange: _handleChange.bind(inst),
      wasMultiple: Boolean(props.multiple)
    };

    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : void 0;
      didWarnValueDefaultValue = true;
    }
  },

  getSelectValueContext: function getSelectValueContext(inst) {
    // ReactDOMOption looks at this initial value so the initial generated
    // markup has correct `selected` attributes
    return inst._wrapperState.initialValue;
  },

  postUpdateWrapper: function postUpdateWrapper(inst) {
    var props = inst._currentElement.props;

    // After the initial mount, we control selected-ness manually so don't pass
    // this value down
    inst._wrapperState.initialValue = undefined;

    var wasMultiple = inst._wrapperState.wasMultiple;
    inst._wrapperState.wasMultiple = Boolean(props.multiple);

    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      inst._wrapperState.pendingUpdate = false;
      updateOptions(inst, Boolean(props.multiple), value);
    } else if (wasMultiple !== Boolean(props.multiple)) {
      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
      if (props.defaultValue != null) {
        updateOptions(inst, Boolean(props.multiple), props.defaultValue);
      } else {
        // Revert the select back to its default unselected state.
        updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
      }
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  if (this._rootNodeID) {
    this._wrapperState.pendingUpdate = true;
  }
  ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
  return returnValue;
}

module.exports = ReactDOMSelect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdERPTVNlbGVjdC5qcyJdLCJuYW1lcyI6WyJfYXNzaWduIiwicmVxdWlyZSIsIkxpbmtlZFZhbHVlVXRpbHMiLCJSZWFjdERPTUNvbXBvbmVudFRyZWUiLCJSZWFjdFVwZGF0ZXMiLCJ3YXJuaW5nIiwiZGlkV2FyblZhbHVlTGluayIsImRpZFdhcm5WYWx1ZURlZmF1bHRWYWx1ZSIsInVwZGF0ZU9wdGlvbnNJZlBlbmRpbmdVcGRhdGVBbmRNb3VudGVkIiwiX3Jvb3ROb2RlSUQiLCJfd3JhcHBlclN0YXRlIiwicGVuZGluZ1VwZGF0ZSIsInByb3BzIiwiX2N1cnJlbnRFbGVtZW50IiwidmFsdWUiLCJnZXRWYWx1ZSIsInVwZGF0ZU9wdGlvbnMiLCJCb29sZWFuIiwibXVsdGlwbGUiLCJnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0iLCJvd25lciIsIm5hbWUiLCJnZXROYW1lIiwidmFsdWVQcm9wTmFtZXMiLCJjaGVja1NlbGVjdFByb3BUeXBlcyIsImluc3QiLCJfb3duZXIiLCJjaGVja1Byb3BUeXBlcyIsInZhbHVlTGluayIsInVuZGVmaW5lZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImkiLCJsZW5ndGgiLCJwcm9wTmFtZSIsImlzQXJyYXkiLCJBcnJheSIsInByb3BWYWx1ZSIsInNlbGVjdGVkVmFsdWUiLCJvcHRpb25zIiwiZ2V0Tm9kZUZyb21JbnN0YW5jZSIsInNlbGVjdGVkIiwiaGFzT3duUHJvcGVydHkiLCJSZWFjdERPTVNlbGVjdCIsImdldEhvc3RQcm9wcyIsIm9uQ2hhbmdlIiwibW91bnRXcmFwcGVyIiwiaW5pdGlhbFZhbHVlIiwiZGVmYXVsdFZhbHVlIiwibGlzdGVuZXJzIiwiX2hhbmRsZUNoYW5nZSIsImJpbmQiLCJ3YXNNdWx0aXBsZSIsImdldFNlbGVjdFZhbHVlQ29udGV4dCIsInBvc3RVcGRhdGVXcmFwcGVyIiwiZXZlbnQiLCJyZXR1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Q0FBaUM5QyxLQUFqQyxFQUF3QzRDLEtBQXhDLENBQWxCOztBQUVBLE1BQUksS0FBSy9DLFdBQVQsRUFBc0I7QUFDcEIsU0FBS0MsYUFBTCxDQUFtQkMsYUFBbkIsR0FBbUMsSUFBbkM7QUFDRDtBQUNEUCxlQUFhdUQsSUFBYixDQUFrQm5ELHNDQUFsQixFQUEwRCxJQUExRDtBQUNBLFNBQU9pRCxXQUFQO0FBQ0Q7O0FBRURHLE9BQU9DLE9BQVAsR0FBaUJqQixjQUFqQiIsImZpbGUiOiJSZWFjdERPTVNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgTGlua2VkVmFsdWVVdGlscyA9IHJlcXVpcmUoJy4vTGlua2VkVmFsdWVVdGlscycpO1xudmFyIFJlYWN0RE9NQ29tcG9uZW50VHJlZSA9IHJlcXVpcmUoJy4vUmVhY3RET01Db21wb25lbnRUcmVlJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBkaWRXYXJuVmFsdWVMaW5rID0gZmFsc2U7XG52YXIgZGlkV2FyblZhbHVlRGVmYXVsdFZhbHVlID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHVwZGF0ZU9wdGlvbnNJZlBlbmRpbmdVcGRhdGVBbmRNb3VudGVkKCkge1xuICBpZiAodGhpcy5fcm9vdE5vZGVJRCAmJiB0aGlzLl93cmFwcGVyU3RhdGUucGVuZGluZ1VwZGF0ZSkge1xuICAgIHRoaXMuX3dyYXBwZXJTdGF0ZS5wZW5kaW5nVXBkYXRlID0gZmFsc2U7XG5cbiAgICB2YXIgcHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcbiAgICB2YXIgdmFsdWUgPSBMaW5rZWRWYWx1ZVV0aWxzLmdldFZhbHVlKHByb3BzKTtcblxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICB1cGRhdGVPcHRpb25zKHRoaXMsIEJvb2xlYW4ocHJvcHMubXVsdGlwbGUpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShvd25lcikge1xuICBpZiAob3duZXIpIHtcbiAgICB2YXIgbmFtZSA9IG93bmVyLmdldE5hbWUoKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG52YXIgdmFsdWVQcm9wTmFtZXMgPSBbJ3ZhbHVlJywgJ2RlZmF1bHRWYWx1ZSddO1xuXG4vKipcbiAqIFZhbGlkYXRpb24gZnVuY3Rpb24gZm9yIGB2YWx1ZWAgYW5kIGBkZWZhdWx0VmFsdWVgLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tTZWxlY3RQcm9wVHlwZXMoaW5zdCwgcHJvcHMpIHtcbiAgdmFyIG93bmVyID0gaW5zdC5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICBMaW5rZWRWYWx1ZVV0aWxzLmNoZWNrUHJvcFR5cGVzKCdzZWxlY3QnLCBwcm9wcywgb3duZXIpO1xuXG4gIGlmIChwcm9wcy52YWx1ZUxpbmsgIT09IHVuZGVmaW5lZCAmJiAhZGlkV2FyblZhbHVlTGluaykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYHZhbHVlTGlua2AgcHJvcCBvbiBgc2VsZWN0YCBpcyBkZXByZWNhdGVkOyBzZXQgYHZhbHVlYCBhbmQgYG9uQ2hhbmdlYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICAgIGRpZFdhcm5WYWx1ZUxpbmsgPSB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZVByb3BOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwcm9wTmFtZSA9IHZhbHVlUHJvcE5hbWVzW2ldO1xuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShwcm9wc1twcm9wTmFtZV0pO1xuICAgIGlmIChwcm9wcy5tdWx0aXBsZSAmJiAhaXNBcnJheSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdUaGUgYCVzYCBwcm9wIHN1cHBsaWVkIHRvIDxzZWxlY3Q+IG11c3QgYmUgYW4gYXJyYXkgaWYgJyArICdgbXVsdGlwbGVgIGlzIHRydWUuJXMnLCBwcm9wTmFtZSwgZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKG93bmVyKSkgOiB2b2lkIDA7XG4gICAgfSBlbHNlIGlmICghcHJvcHMubXVsdGlwbGUgJiYgaXNBcnJheSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdUaGUgYCVzYCBwcm9wIHN1cHBsaWVkIHRvIDxzZWxlY3Q+IG11c3QgYmUgYSBzY2FsYXIgJyArICd2YWx1ZSBpZiBgbXVsdGlwbGVgIGlzIGZhbHNlLiVzJywgcHJvcE5hbWUsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShvd25lcikpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3RET01Db21wb25lbnR9IGluc3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbXVsdGlwbGVcbiAqIEBwYXJhbSB7Kn0gcHJvcFZhbHVlIEEgc3RyaW5nYWJsZSAod2l0aCBgbXVsdGlwbGVgLCBhIGxpc3Qgb2Ygc3RyaW5nYWJsZXMpLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlT3B0aW9ucyhpbnN0LCBtdWx0aXBsZSwgcHJvcFZhbHVlKSB7XG4gIHZhciBzZWxlY3RlZFZhbHVlLCBpO1xuICB2YXIgb3B0aW9ucyA9IFJlYWN0RE9NQ29tcG9uZW50VHJlZS5nZXROb2RlRnJvbUluc3RhbmNlKGluc3QpLm9wdGlvbnM7XG5cbiAgaWYgKG11bHRpcGxlKSB7XG4gICAgc2VsZWN0ZWRWYWx1ZSA9IHt9O1xuICAgIGZvciAoaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNlbGVjdGVkVmFsdWVbJycgKyBwcm9wVmFsdWVbaV1dID0gdHJ1ZTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzZWxlY3RlZCA9IHNlbGVjdGVkVmFsdWUuaGFzT3duUHJvcGVydHkob3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgICBpZiAob3B0aW9uc1tpXS5zZWxlY3RlZCAhPT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBEbyBub3Qgc2V0IGBzZWxlY3QudmFsdWVgIGFzIGV4YWN0IGJlaGF2aW9yIGlzbid0IGNvbnNpc3RlbnQgYWNyb3NzIGFsbFxuICAgIC8vIGJyb3dzZXJzIGZvciBhbGwgY2FzZXMuXG4gICAgc2VsZWN0ZWRWYWx1ZSA9ICcnICsgcHJvcFZhbHVlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAob3B0aW9uc1tpXS52YWx1ZSA9PT0gc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbnNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEltcGxlbWVudHMgYSA8c2VsZWN0PiBob3N0IGNvbXBvbmVudCB0aGF0IGFsbG93cyBvcHRpb25hbGx5IHNldHRpbmcgdGhlXG4gKiBwcm9wcyBgdmFsdWVgIGFuZCBgZGVmYXVsdFZhbHVlYC4gSWYgYG11bHRpcGxlYCBpcyBmYWxzZSwgdGhlIHByb3AgbXVzdCBiZSBhXG4gKiBzdHJpbmdhYmxlLiBJZiBgbXVsdGlwbGVgIGlzIHRydWUsIHRoZSBwcm9wIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5nYWJsZXMuXG4gKlxuICogSWYgYHZhbHVlYCBpcyBub3Qgc3VwcGxpZWQgKG9yIG51bGwvdW5kZWZpbmVkKSwgdXNlciBhY3Rpb25zIHRoYXQgY2hhbmdlIHRoZVxuICogc2VsZWN0ZWQgb3B0aW9uIHdpbGwgdHJpZ2dlciB1cGRhdGVzIHRvIHRoZSByZW5kZXJlZCBvcHRpb25zLlxuICpcbiAqIElmIGl0IGlzIHN1cHBsaWVkIChhbmQgbm90IG51bGwvdW5kZWZpbmVkKSwgdGhlIHJlbmRlcmVkIG9wdGlvbnMgd2lsbCBub3RcbiAqIHVwZGF0ZSBpbiByZXNwb25zZSB0byB1c2VyIGFjdGlvbnMuIEluc3RlYWQsIHRoZSBgdmFsdWVgIHByb3AgbXVzdCBjaGFuZ2UgaW5cbiAqIG9yZGVyIGZvciB0aGUgcmVuZGVyZWQgb3B0aW9ucyB0byB1cGRhdGUuXG4gKlxuICogSWYgYGRlZmF1bHRWYWx1ZWAgaXMgcHJvdmlkZWQsIGFueSBvcHRpb25zIHdpdGggdGhlIHN1cHBsaWVkIHZhbHVlcyB3aWxsIGJlXG4gKiBzZWxlY3RlZC5cbiAqL1xudmFyIFJlYWN0RE9NU2VsZWN0ID0ge1xuICBnZXRIb3N0UHJvcHM6IGZ1bmN0aW9uIChpbnN0LCBwcm9wcykge1xuICAgIHJldHVybiBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgb25DaGFuZ2U6IGluc3QuX3dyYXBwZXJTdGF0ZS5vbkNoYW5nZSxcbiAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgfSxcblxuICBtb3VudFdyYXBwZXI6IGZ1bmN0aW9uIChpbnN0LCBwcm9wcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjaGVja1NlbGVjdFByb3BUeXBlcyhpbnN0LCBwcm9wcyk7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlID0gTGlua2VkVmFsdWVVdGlscy5nZXRWYWx1ZShwcm9wcyk7XG4gICAgaW5zdC5fd3JhcHBlclN0YXRlID0ge1xuICAgICAgcGVuZGluZ1VwZGF0ZTogZmFsc2UsXG4gICAgICBpbml0aWFsVmFsdWU6IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6IHByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgIGxpc3RlbmVyczogbnVsbCxcbiAgICAgIG9uQ2hhbmdlOiBfaGFuZGxlQ2hhbmdlLmJpbmQoaW5zdCksXG4gICAgICB3YXNNdWx0aXBsZTogQm9vbGVhbihwcm9wcy5tdWx0aXBsZSlcbiAgICB9O1xuXG4gICAgaWYgKHByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgcHJvcHMuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWRpZFdhcm5WYWx1ZURlZmF1bHRWYWx1ZSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdTZWxlY3QgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIHZhbHVlIHByb3AsIG9yIHRoZSBkZWZhdWx0VmFsdWUgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHNlbGVjdCAnICsgJ2VsZW1lbnQgYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycpIDogdm9pZCAwO1xuICAgICAgZGlkV2FyblZhbHVlRGVmYXVsdFZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0U2VsZWN0VmFsdWVDb250ZXh0OiBmdW5jdGlvbiAoaW5zdCkge1xuICAgIC8vIFJlYWN0RE9NT3B0aW9uIGxvb2tzIGF0IHRoaXMgaW5pdGlhbCB2YWx1ZSBzbyB0aGUgaW5pdGlhbCBnZW5lcmF0ZWRcbiAgICAvLyBtYXJrdXAgaGFzIGNvcnJlY3QgYHNlbGVjdGVkYCBhdHRyaWJ1dGVzXG4gICAgcmV0dXJuIGluc3QuX3dyYXBwZXJTdGF0ZS5pbml0aWFsVmFsdWU7XG4gIH0sXG5cbiAgcG9zdFVwZGF0ZVdyYXBwZXI6IGZ1bmN0aW9uIChpbnN0KSB7XG4gICAgdmFyIHByb3BzID0gaW5zdC5fY3VycmVudEVsZW1lbnQucHJvcHM7XG5cbiAgICAvLyBBZnRlciB0aGUgaW5pdGlhbCBtb3VudCwgd2UgY29udHJvbCBzZWxlY3RlZC1uZXNzIG1hbnVhbGx5IHNvIGRvbid0IHBhc3NcbiAgICAvLyB0aGlzIHZhbHVlIGRvd25cbiAgICBpbnN0Ll93cmFwcGVyU3RhdGUuaW5pdGlhbFZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgdmFyIHdhc011bHRpcGxlID0gaW5zdC5fd3JhcHBlclN0YXRlLndhc011bHRpcGxlO1xuICAgIGluc3QuX3dyYXBwZXJTdGF0ZS53YXNNdWx0aXBsZSA9IEJvb2xlYW4ocHJvcHMubXVsdGlwbGUpO1xuXG4gICAgdmFyIHZhbHVlID0gTGlua2VkVmFsdWVVdGlscy5nZXRWYWx1ZShwcm9wcyk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGluc3QuX3dyYXBwZXJTdGF0ZS5wZW5kaW5nVXBkYXRlID0gZmFsc2U7XG4gICAgICB1cGRhdGVPcHRpb25zKGluc3QsIEJvb2xlYW4ocHJvcHMubXVsdGlwbGUpLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh3YXNNdWx0aXBsZSAhPT0gQm9vbGVhbihwcm9wcy5tdWx0aXBsZSkpIHtcbiAgICAgIC8vIEZvciBzaW1wbGljaXR5LCByZWFwcGx5IGBkZWZhdWx0VmFsdWVgIGlmIGBtdWx0aXBsZWAgaXMgdG9nZ2xlZC5cbiAgICAgIGlmIChwcm9wcy5kZWZhdWx0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB1cGRhdGVPcHRpb25zKGluc3QsIEJvb2xlYW4ocHJvcHMubXVsdGlwbGUpLCBwcm9wcy5kZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV2ZXJ0IHRoZSBzZWxlY3QgYmFjayB0byBpdHMgZGVmYXVsdCB1bnNlbGVjdGVkIHN0YXRlLlxuICAgICAgICB1cGRhdGVPcHRpb25zKGluc3QsIEJvb2xlYW4ocHJvcHMubXVsdGlwbGUpLCBwcm9wcy5tdWx0aXBsZSA/IFtdIDogJycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gX2hhbmRsZUNoYW5nZShldmVudCkge1xuICB2YXIgcHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcbiAgdmFyIHJldHVyblZhbHVlID0gTGlua2VkVmFsdWVVdGlscy5leGVjdXRlT25DaGFuZ2UocHJvcHMsIGV2ZW50KTtcblxuICBpZiAodGhpcy5fcm9vdE5vZGVJRCkge1xuICAgIHRoaXMuX3dyYXBwZXJTdGF0ZS5wZW5kaW5nVXBkYXRlID0gdHJ1ZTtcbiAgfVxuICBSZWFjdFVwZGF0ZXMuYXNhcCh1cGRhdGVPcHRpb25zSWZQZW5kaW5nVXBkYXRlQW5kTW91bnRlZCwgdGhpcyk7XG4gIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTVNlbGVjdDsiXX0=