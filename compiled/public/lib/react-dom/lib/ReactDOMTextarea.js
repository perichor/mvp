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

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var LinkedValueUtils = require('./LinkedValueUtils');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactUpdates = require('./ReactUpdates');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var didWarnValueLink = false;
var didWarnValDefaultVal = false;

function forceUpdateIfMounted() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMTextarea.updateWrapper(this);
  }
}

/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea = {
  getHostProps: function getHostProps(inst, props) {
    !(props.dangerouslySetInnerHTML == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : _prodInvariant('91') : void 0;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.  We could add a check in setTextContent
    // to only set the value if/when the value differs from the node value (which would
    // completely solve this IE9 bug), but Sebastian+Ben seemed to like this solution.
    // The value can be a boolean or object so that's why it's forced to be a string.
    var hostProps = _assign({}, props, {
      value: undefined,
      defaultValue: undefined,
      children: '' + inst._wrapperState.initialValue,
      onChange: inst._wrapperState.onChange
    });

    return hostProps;
  },

  mountWrapper: function mountWrapper(inst, props) {
    if (process.env.NODE_ENV !== 'production') {
      LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
      if (props.valueLink !== undefined && !didWarnValueLink) {
        process.env.NODE_ENV !== 'production' ? warning(false, '`valueLink` prop on `textarea` is deprecated; set `value` and `onChange` instead.') : void 0;
        didWarnValueLink = true;
      }
      if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : void 0;
        didWarnValDefaultVal = true;
      }
    }

    var value = LinkedValueUtils.getValue(props);
    var initialValue = value;

    // Only bother fetching default value if we're going to use it
    if (value == null) {
      var defaultValue = props.defaultValue;
      // TODO (yungsters): Remove support for children content in <textarea>.
      var children = props.children;
      if (children != null) {
        if (process.env.NODE_ENV !== 'production') {
          process.env.NODE_ENV !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : void 0;
        }
        !(defaultValue == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : _prodInvariant('92') : void 0;
        if (Array.isArray(children)) {
          !(children.length <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : _prodInvariant('93') : void 0;
          children = children[0];
        }

        defaultValue = '' + children;
      }
      if (defaultValue == null) {
        defaultValue = '';
      }
      initialValue = defaultValue;
    }

    inst._wrapperState = {
      initialValue: '' + initialValue,
      listeners: null,
      onChange: _handleChange.bind(inst)
    };
  },

  updateWrapper: function updateWrapper(inst) {
    var props = inst._currentElement.props;

    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      var newValue = '' + value;

      // To avoid side effects (such as losing text selection), only set value if changed
      if (newValue !== node.value) {
        node.value = newValue;
      }
      if (props.defaultValue == null) {
        node.defaultValue = newValue;
      }
    }
    if (props.defaultValue != null) {
      node.defaultValue = props.defaultValue;
    }
  },

  postMountWrapper: function postMountWrapper(inst) {
    // This is in postMount because we need access to the DOM node, which is not
    // available until after the component has mounted.
    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
    var textContent = node.textContent;

    // Only set node.value if textContent is equal to the expected
    // initial value. In IE10/IE11 there is a bug where the placeholder attribute
    // will populate textContent as well.
    // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
    if (textContent === inst._wrapperState.initialValue) {
      node.value = textContent;
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);
  ReactUpdates.asap(forceUpdateIfMounted, this);
  return returnValue;
}

module.exports = ReactDOMTextarea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdERPTVRleHRhcmVhLmpzIl0sIm5hbWVzIjpbIl9wcm9kSW52YXJpYW50IiwicmVxdWlyZSIsIl9hc3NpZ24iLCJMaW5rZWRWYWx1ZVV0aWxzIiwiUmVhY3RET01Db21wb25lbnRUcmVlIiwiUmVhY3RVcGRhdGVzIiwiaW52YXJpYW50Iiwid2FybmluZyIsImRpZFdhcm5WYWx1ZUxpbmsiLCJkaWRXYXJuVmFsRGVmYXVsdFZhbCIsImZvcmNlVXBkYXRlSWZNb3VudGVkIiwiX3Jvb3ROb2RlSUQiLCJSZWFjdERPTVRleHRhcmVhIiwidXBkYXRlV3JhcHBlciIsImdldEhvc3RQcm9wcyIsImluc3QiLCJwcm9wcyIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiaG9zdFByb3BzIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJkZWZhdWx0VmFsdWUiLCJjaGlsZHJlbiIsIl93cmFwcGVyU3RhdGUiLCJpbml0aWFsVmFsdWUiLCJvbkNoYW5nZSIsIm1vdW50V3JhcHBlciIsImNoZWNrUHJvcFR5cGVzIiwiX2N1cnJlbnRFbGVtZW50IiwiX293bmVyIiwidmFsdWVMaW5rIiwiZ2V0VmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJsaXN0ZW5lcnMiLCJfaGFuZGxlQ2hhbmdlIiwiYmluZCIsIm5vZGUiLCJnZXROb2RlRnJvbUluc3RhbmNlIiwibmV3VmFsdWUiLCJwb3N0TW91bnRXcmFwcGVyIiwidGV4dENvbnRlbnQiLCJldmVudCIsInJldHVyblZhbHVlIiwiZXhlY3V0ZU9uQ2hhbmdlIiwiYXNhcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsaUJBQWlCQyxRQUFRLHNCQUFSLENBQXJCO0FBQUEsSUFDSUMsVUFBVUQsUUFBUSxlQUFSLENBRGQ7O0FBR0Es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QUNELFVBQUkzQixNQUFNUSxZQUFOLElBQXNCLElBQTFCLEVBQWdDO0FBQzlCaUIsYUFBS2pCLFlBQUwsR0FBb0JtQixRQUFwQjtBQUNEO0FBQ0Y7QUFDRCxRQUFJM0IsTUFBTVEsWUFBTixJQUFzQixJQUExQixFQUFnQztBQUM5QmlCLFdBQUtqQixZQUFMLEdBQW9CUixNQUFNUSxZQUExQjtBQUNEO0FBQ0YsR0F0Rm9COztBQXdGckJvQixvQkFBa0IsMEJBQVU3QixJQUFWLEVBQWdCO0FBQ2hDO0FBQ0E7QUFDQSxRQUFJMEIsT0FBT3JDLHNCQUFzQnNDLG1CQUF0QixDQUEwQzNCLElBQTFDLENBQVg7QUFDQSxRQUFJOEIsY0FBY0osS0FBS0ksV0FBdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFJQSxnQkFBZ0I5QixLQUFLVyxhQUFMLENBQW1CQyxZQUF2QyxFQUFxRDtBQUNuRGMsV0FBS25CLEtBQUwsR0FBYXVCLFdBQWI7QUFDRDtBQUNGO0FBckdvQixDQUF2Qjs7QUF3R0EsU0FBU04sYUFBVCxDQUF1Qk8sS0FBdkIsRUFBOEI7QUFDNUIsTUFBSTlCLFFBQVEsS0FBS2UsZUFBTCxDQUFxQmYsS0FBakM7QUFDQSxNQUFJK0IsY0FBYzVDLGlCQUFpQjZDLGVBQWpCLENBQWlDaEMsS0FBakMsRUFBd0M4QixLQUF4QyxDQUFsQjtBQUNBekMsZUFBYTRDLElBQWIsQ0FBa0J2QyxvQkFBbEIsRUFBd0MsSUFBeEM7QUFDQSxTQUFPcUMsV0FBUDtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCdkMsZ0JBQWpCIiwiZmlsZSI6IlJlYWN0RE9NVGV4dGFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpLFxuICAgIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBMaW5rZWRWYWx1ZVV0aWxzID0gcmVxdWlyZSgnLi9MaW5rZWRWYWx1ZVV0aWxzJyk7XG52YXIgUmVhY3RET01Db21wb25lbnRUcmVlID0gcmVxdWlyZSgnLi9SZWFjdERPTUNvbXBvbmVudFRyZWUnKTtcbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlcycpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGRpZFdhcm5WYWx1ZUxpbmsgPSBmYWxzZTtcbnZhciBkaWRXYXJuVmFsRGVmYXVsdFZhbCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBmb3JjZVVwZGF0ZUlmTW91bnRlZCgpIHtcbiAgaWYgKHRoaXMuX3Jvb3ROb2RlSUQpIHtcbiAgICAvLyBET00gY29tcG9uZW50IGlzIHN0aWxsIG1vdW50ZWQ7IHVwZGF0ZVxuICAgIFJlYWN0RE9NVGV4dGFyZWEudXBkYXRlV3JhcHBlcih0aGlzKTtcbiAgfVxufVxuXG4vKipcbiAqIEltcGxlbWVudHMgYSA8dGV4dGFyZWE+IGhvc3QgY29tcG9uZW50IHRoYXQgYWxsb3dzIHNldHRpbmcgYHZhbHVlYCwgYW5kXG4gKiBgZGVmYXVsdFZhbHVlYC4gVGhpcyBkaWZmZXJzIGZyb20gdGhlIHRyYWRpdGlvbmFsIERPTSBBUEkgYmVjYXVzZSB2YWx1ZSBpc1xuICogdXN1YWxseSBzZXQgYXMgUENEQVRBIGNoaWxkcmVuLlxuICpcbiAqIElmIGB2YWx1ZWAgaXMgbm90IHN1cHBsaWVkIChvciBudWxsL3VuZGVmaW5lZCksIHVzZXIgYWN0aW9ucyB0aGF0IGFmZmVjdCB0aGVcbiAqIHZhbHVlIHdpbGwgdHJpZ2dlciB1cGRhdGVzIHRvIHRoZSBlbGVtZW50LlxuICpcbiAqIElmIGB2YWx1ZWAgaXMgc3VwcGxpZWQgKGFuZCBub3QgbnVsbC91bmRlZmluZWQpLCB0aGUgcmVuZGVyZWQgZWxlbWVudCB3aWxsXG4gKiBub3QgdHJpZ2dlciB1cGRhdGVzIHRvIHRoZSBlbGVtZW50LiBJbnN0ZWFkLCB0aGUgYHZhbHVlYCBwcm9wIG11c3QgY2hhbmdlIGluXG4gKiBvcmRlciBmb3IgdGhlIHJlbmRlcmVkIGVsZW1lbnQgdG8gYmUgdXBkYXRlZC5cbiAqXG4gKiBUaGUgcmVuZGVyZWQgZWxlbWVudCB3aWxsIGJlIGluaXRpYWxpemVkIHdpdGggYW4gZW1wdHkgdmFsdWUsIHRoZSBwcm9wXG4gKiBgZGVmYXVsdFZhbHVlYCBpZiBzcGVjaWZpZWQsIG9yIHRoZSBjaGlsZHJlbiBjb250ZW50IChkZXByZWNhdGVkKS5cbiAqL1xudmFyIFJlYWN0RE9NVGV4dGFyZWEgPSB7XG4gIGdldEhvc3RQcm9wczogZnVuY3Rpb24gKGluc3QsIHByb3BzKSB7XG4gICAgIShwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgIGRvZXMgbm90IG1ha2Ugc2Vuc2Ugb24gPHRleHRhcmVhPi4nKSA6IF9wcm9kSW52YXJpYW50KCc5MScpIDogdm9pZCAwO1xuXG4gICAgLy8gQWx3YXlzIHNldCBjaGlsZHJlbiB0byB0aGUgc2FtZSB0aGluZy4gSW4gSUU5LCB0aGUgc2VsZWN0aW9uIHJhbmdlIHdpbGxcbiAgICAvLyBnZXQgcmVzZXQgaWYgYHRleHRDb250ZW50YCBpcyBtdXRhdGVkLiAgV2UgY291bGQgYWRkIGEgY2hlY2sgaW4gc2V0VGV4dENvbnRlbnRcbiAgICAvLyB0byBvbmx5IHNldCB0aGUgdmFsdWUgaWYvd2hlbiB0aGUgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBub2RlIHZhbHVlICh3aGljaCB3b3VsZFxuICAgIC8vIGNvbXBsZXRlbHkgc29sdmUgdGhpcyBJRTkgYnVnKSwgYnV0IFNlYmFzdGlhbitCZW4gc2VlbWVkIHRvIGxpa2UgdGhpcyBzb2x1dGlvbi5cbiAgICAvLyBUaGUgdmFsdWUgY2FuIGJlIGEgYm9vbGVhbiBvciBvYmplY3Qgc28gdGhhdCdzIHdoeSBpdCdzIGZvcmNlZCB0byBiZSBhIHN0cmluZy5cbiAgICB2YXIgaG9zdFByb3BzID0gX2Fzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGNoaWxkcmVuOiAnJyArIGluc3QuX3dyYXBwZXJTdGF0ZS5pbml0aWFsVmFsdWUsXG4gICAgICBvbkNoYW5nZTogaW5zdC5fd3JhcHBlclN0YXRlLm9uQ2hhbmdlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaG9zdFByb3BzO1xuICB9LFxuXG4gIG1vdW50V3JhcHBlcjogZnVuY3Rpb24gKGluc3QsIHByb3BzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIExpbmtlZFZhbHVlVXRpbHMuY2hlY2tQcm9wVHlwZXMoJ3RleHRhcmVhJywgcHJvcHMsIGluc3QuX2N1cnJlbnRFbGVtZW50Ll9vd25lcik7XG4gICAgICBpZiAocHJvcHMudmFsdWVMaW5rICE9PSB1bmRlZmluZWQgJiYgIWRpZFdhcm5WYWx1ZUxpbmspIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdgdmFsdWVMaW5rYCBwcm9wIG9uIGB0ZXh0YXJlYWAgaXMgZGVwcmVjYXRlZDsgc2V0IGB2YWx1ZWAgYW5kIGBvbkNoYW5nZWAgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgICAgICAgZGlkV2FyblZhbHVlTGluayA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZGlkV2FyblZhbERlZmF1bHRWYWwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdUZXh0YXJlYSBlbGVtZW50cyBtdXN0IGJlIGVpdGhlciBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCAnICsgJyhzcGVjaWZ5IGVpdGhlciB0aGUgdmFsdWUgcHJvcCwgb3IgdGhlIGRlZmF1bHRWYWx1ZSBwcm9wLCBidXQgbm90ICcgKyAnYm90aCkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdGV4dGFyZWEgJyArICdhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJykgOiB2b2lkIDA7XG4gICAgICAgIGRpZFdhcm5WYWxEZWZhdWx0VmFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSBMaW5rZWRWYWx1ZVV0aWxzLmdldFZhbHVlKHByb3BzKTtcbiAgICB2YXIgaW5pdGlhbFZhbHVlID0gdmFsdWU7XG5cbiAgICAvLyBPbmx5IGJvdGhlciBmZXRjaGluZyBkZWZhdWx0IHZhbHVlIGlmIHdlJ3JlIGdvaW5nIHRvIHVzZSBpdFxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YXIgZGVmYXVsdFZhbHVlID0gcHJvcHMuZGVmYXVsdFZhbHVlO1xuICAgICAgLy8gVE9ETyAoeXVuZ3N0ZXJzKTogUmVtb3ZlIHN1cHBvcnQgZm9yIGNoaWxkcmVuIGNvbnRlbnQgaW4gPHRleHRhcmVhPi5cbiAgICAgIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuO1xuICAgICAgaWYgKGNoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1VzZSB0aGUgYGRlZmF1bHRWYWx1ZWAgb3IgYHZhbHVlYCBwcm9wcyBpbnN0ZWFkIG9mIHNldHRpbmcgJyArICdjaGlsZHJlbiBvbiA8dGV4dGFyZWE+LicpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgICEoZGVmYXVsdFZhbHVlID09IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0lmIHlvdSBzdXBwbHkgYGRlZmF1bHRWYWx1ZWAgb24gYSA8dGV4dGFyZWE+LCBkbyBub3QgcGFzcyBjaGlsZHJlbi4nKSA6IF9wcm9kSW52YXJpYW50KCc5MicpIDogdm9pZCAwO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgICAhKGNoaWxkcmVuLmxlbmd0aCA8PSAxKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICc8dGV4dGFyZWE+IGNhbiBvbmx5IGhhdmUgYXQgbW9zdCBvbmUgY2hpbGQuJykgOiBfcHJvZEludmFyaWFudCgnOTMnKSA6IHZvaWQgMDtcbiAgICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdFZhbHVlID0gJycgKyBjaGlsZHJlbjtcbiAgICAgIH1cbiAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBkZWZhdWx0VmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICAgIGluaXRpYWxWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICBpbnN0Ll93cmFwcGVyU3RhdGUgPSB7XG4gICAgICBpbml0aWFsVmFsdWU6ICcnICsgaW5pdGlhbFZhbHVlLFxuICAgICAgbGlzdGVuZXJzOiBudWxsLFxuICAgICAgb25DaGFuZ2U6IF9oYW5kbGVDaGFuZ2UuYmluZChpbnN0KVxuICAgIH07XG4gIH0sXG5cbiAgdXBkYXRlV3JhcHBlcjogZnVuY3Rpb24gKGluc3QpIHtcbiAgICB2YXIgcHJvcHMgPSBpbnN0Ll9jdXJyZW50RWxlbWVudC5wcm9wcztcblxuICAgIHZhciBub2RlID0gUmVhY3RET01Db21wb25lbnRUcmVlLmdldE5vZGVGcm9tSW5zdGFuY2UoaW5zdCk7XG4gICAgdmFyIHZhbHVlID0gTGlua2VkVmFsdWVVdGlscy5nZXRWYWx1ZShwcm9wcyk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIC8vIENhc3QgYHZhbHVlYCB0byBhIHN0cmluZyB0byBlbnN1cmUgdGhlIHZhbHVlIGlzIHNldCBjb3JyZWN0bHkuIFdoaWxlXG4gICAgICAvLyBicm93c2VycyB0eXBpY2FsbHkgZG8gdGhpcyBhcyBuZWNlc3NhcnksIGpzZG9tIGRvZXNuJ3QuXG4gICAgICB2YXIgbmV3VmFsdWUgPSAnJyArIHZhbHVlO1xuXG4gICAgICAvLyBUbyBhdm9pZCBzaWRlIGVmZmVjdHMgKHN1Y2ggYXMgbG9zaW5nIHRleHQgc2VsZWN0aW9uKSwgb25seSBzZXQgdmFsdWUgaWYgY2hhbmdlZFxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBub2RlLnZhbHVlKSB7XG4gICAgICAgIG5vZGUudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcy5kZWZhdWx0VmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBub2RlLmRlZmF1bHRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcHMuZGVmYXVsdFZhbHVlICE9IG51bGwpIHtcbiAgICAgIG5vZGUuZGVmYXVsdFZhbHVlID0gcHJvcHMuZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgfSxcblxuICBwb3N0TW91bnRXcmFwcGVyOiBmdW5jdGlvbiAoaW5zdCkge1xuICAgIC8vIFRoaXMgaXMgaW4gcG9zdE1vdW50IGJlY2F1c2Ugd2UgbmVlZCBhY2Nlc3MgdG8gdGhlIERPTSBub2RlLCB3aGljaCBpcyBub3RcbiAgICAvLyBhdmFpbGFibGUgdW50aWwgYWZ0ZXIgdGhlIGNvbXBvbmVudCBoYXMgbW91bnRlZC5cbiAgICB2YXIgbm9kZSA9IFJlYWN0RE9NQ29tcG9uZW50VHJlZS5nZXROb2RlRnJvbUluc3RhbmNlKGluc3QpO1xuICAgIHZhciB0ZXh0Q29udGVudCA9IG5vZGUudGV4dENvbnRlbnQ7XG5cbiAgICAvLyBPbmx5IHNldCBub2RlLnZhbHVlIGlmIHRleHRDb250ZW50IGlzIGVxdWFsIHRvIHRoZSBleHBlY3RlZFxuICAgIC8vIGluaXRpYWwgdmFsdWUuIEluIElFMTAvSUUxMSB0aGVyZSBpcyBhIGJ1ZyB3aGVyZSB0aGUgcGxhY2Vob2xkZXIgYXR0cmlidXRlXG4gICAgLy8gd2lsbCBwb3B1bGF0ZSB0ZXh0Q29udGVudCBhcyB3ZWxsLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzEwMTUyNS9cbiAgICBpZiAodGV4dENvbnRlbnQgPT09IGluc3QuX3dyYXBwZXJTdGF0ZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgIG5vZGUudmFsdWUgPSB0ZXh0Q29udGVudDtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9oYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgdmFyIHByb3BzID0gdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHM7XG4gIHZhciByZXR1cm5WYWx1ZSA9IExpbmtlZFZhbHVlVXRpbHMuZXhlY3V0ZU9uQ2hhbmdlKHByb3BzLCBldmVudCk7XG4gIFJlYWN0VXBkYXRlcy5hc2FwKGZvcmNlVXBkYXRlSWZNb3VudGVkLCB0aGlzKTtcbiAgcmV0dXJuIHJldHVyblZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NVGV4dGFyZWE7Il19