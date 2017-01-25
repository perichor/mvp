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

var React = require('react/lib/React');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactDOMSelect = require('./ReactDOMSelect');

var warning = require('fbjs/lib/warning');
var didWarnInvalidOptionChildren = false;

function flattenChildren(children) {
  var content = '';

  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  React.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    } else if (!didWarnInvalidOptionChildren) {
      didWarnInvalidOptionChildren = true;
      process.env.NODE_ENV !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : void 0;
    }
  });

  return content;
}

/**
 * Implements an <option> host component that warns when `selected` is set.
 */
var ReactDOMOption = {
  mountWrapper: function mountWrapper(inst, props, hostParent) {
    // TODO (yungsters): Remove support for `selected` in <option>.
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : void 0;
    }

    // Look up whether this option is 'selected'
    var selectValue = null;
    if (hostParent != null) {
      var selectParent = hostParent;

      if (selectParent._tag === 'optgroup') {
        selectParent = selectParent._hostParent;
      }

      if (selectParent != null && selectParent._tag === 'select') {
        selectValue = ReactDOMSelect.getSelectValueContext(selectParent);
      }
    }

    // If the value is null (e.g., no specified value or after initial mount)
    // or missing (e.g., for <datalist>), we don't change props.selected
    var selected = null;
    if (selectValue != null) {
      var value;
      if (props.value != null) {
        value = props.value + '';
      } else {
        value = flattenChildren(props.children);
      }
      selected = false;
      if (Array.isArray(selectValue)) {
        // multiple
        for (var i = 0; i < selectValue.length; i++) {
          if ('' + selectValue[i] === value) {
            selected = true;
            break;
          }
        }
      } else {
        selected = '' + selectValue === value;
      }
    }

    inst._wrapperState = { selected: selected };
  },

  postMountWrapper: function postMountWrapper(inst) {
    // value="" should make a value attribute (#6219)
    var props = inst._currentElement.props;
    if (props.value != null) {
      var node = ReactDOMComponentTree.getNodeFromInstance(inst);
      node.setAttribute('value', props.value);
    }
  },

  getHostProps: function getHostProps(inst, props) {
    var hostProps = _assign({ selected: undefined, children: undefined }, props);

    // Read state only from initial mount because <select> updates value
    // manually; we need the initial state only for server rendering
    if (inst._wrapperState.selected != null) {
      hostProps.selected = inst._wrapperState.selected;
    }

    var content = flattenChildren(props.children);

    if (content) {
      hostProps.children = content;
    }

    return hostProps;
  }

};

module.exports = ReactDOMOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdERPTU9wdGlvbi5qcyJdLCJuYW1lcyI6WyJfYXNzaWduIiwicmVxdWlyZSIsIlJlYWN0IiwiUmVhY3RET01Db21wb25lbnRUcmVlIiwiUmVhY3RET01TZWxlY3QiLCJ3YXJuaW5nIiwiZGlkV2FybkludmFsaWRPcHRpb25DaGlsZHJlbiIsImZsYXR0ZW5DaGlsZHJlbiIsImNoaWxkcmVuIiwiY29udGVudCIsIkNoaWxkcmVuIiwiZm9yRWFjaCIsImNoaWxkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiUmVhY3RET01PcHRpb24iLCJtb3VudFdyYXBwZXIiLCJpbnN0IiwicHJvcHMiLCJob3N0UGFyZW50Iiwic2VsZWN0ZWQiLCJzZWxlY3RWYWx1ZSIsInNlbGVjdFBhcmVudCIsIl90YWciLCJfaG9zdFBhcmVudCIsImdldFNlbGVjdFZhbHVlQ29udGV4dCIsInZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImxlbmd0aCIsIl93cmFwcGVyU3RhdGUiLCJwb3N0TW91bnRXcmFwcGVyIiwiX2N1cnJlbnRFbGVtZW50Iiwibm9kZSIsImdldE5vZGVGcm9tSW5zdGFuY2UiLCJzZXRBdHRyaWJ1dGUiLCJnZXRIb3N0UHJvcHMiLCJob3N0UHJvcHMiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLFVBQVVDLFFBQVEsZUFBUixDQUFkOztBQUVBLElBQUlDLFFBQVFELFFBQVEsaUJBQVIsQ0FBWjtBQUNBLElBQUlFLHdCQUF3QkYsUUFBUSx5QkFBUixDQUE1QjtBQUNBLElBQUlHLGlCQUFpQkgsUUFBUSxrQkFBUixDQUFyQjs7QUFFQSxJQUFJSSxVQUFVSixRQUFRLGtCQUFSLENBQWQ7QUFDQSxJQUFJSywrQkFBK0IsS0FBbkM7O0FBRUEsU0FBU0MsZUFBVCxDQUF5QkMsUUFBekIsRUFBbUM7QUFDakMsTUFBSUMsVUFBVSxFQUFkOztBQUVBO0FBQ0E7QUFDQVAsUUFBTVEsUUFBTixDQUFlQyxPQUFmLENBQXVCSCxRQUF2QixFQUFpQyxVQUFVSSxLQUFWLEVBQWlCO0FBQ2hELFFBQUlBLFNBQVMsSUFBYixFQUFtQjtBQUNqQjtBQUNEO0FBQ0QsUUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLElBQTZCLE9BQU9BLEtBQVAsS0FBaUIsUUFBbEQsRUFBNEQ7QUFDMURILGlCQUFXRyxLQUFYO0FBQ0QsS0FGRCxNQUVPLElBQUksQ0FBQ04sNEJBQUwsRUFBbUM7QUFDeENBLHFDQUErQixJQUEvQjtBQUNBTyxjQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBekIsR0FBd0NWLFFBQVEsS0FBUixFQUFlLDhEQUFmLENBQXhDLEdBQXlILEtBQUssQ0FBOUg7QUFDRDtBQUNGLEdBVkQ7O0FBWUEsU0FBT0ksT0FBUDtBQUNEOztBQUVEOzs7QUFHQSxJQUFJTyxpQkFBaUI7QUFDbkJDLGdCQUFjLHNCQUFVQyxJQUFWLEVBQWdCQyxLQUFoQixFQUF1QkMsVUFBdkIsRUFBbUM7QUFDL0M7QUFDQSxRQUFJUCxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNGLGNBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixHQUF3Q1YsUUFBUWMsTUFBTUUsUUFBTixJQUFrQixJQUExQixFQUFnQyxvRUFBb0UsaUNBQXBHLENBQXhDLEdBQWlMLEtBQUssQ0FBdEw7QUFDRDs7QUFFRDtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJRixjQUFjLElBQWxCLEVBQXdCO0FBQ3RCLFVBQUlHLGVBQWVILFVBQW5COztBQUVBLFVBQUlHLGFBQWFDLElBQWIsS0FBc0IsVUFBMUIsRUFBc0M7QUFDcENELHVCQUFlQSxhQUFhRSxXQUE1QjtBQUNEOztBQUVELFVBQUlGLGdCQUFnQixJQUFoQixJQUF3QkEsYUFBYUMsSUFBYixLQUFzQixRQUFsRCxFQUE0RDtBQUMxREYsc0JBQWNsQixlQUFlc0IscUJBQWYsQ0FBcUNILFlBQXJDLENBQWQ7QUFDRDtBQUNGOztBQUVEO0FBQ0E7QUFDQSxRQUFJRixXQUFXLElBQWY7QUFDQSxRQUFJQyxlQUFlLElBQW5CLEVBQXlCO0FBQ3ZCLFVBQUlLLEtBQUo7QUFDQSxVQUFJUixNQUFNUSxLQUFOLElBQWUsSUFBbkIsRUFBeUI7QUFDdkJBLGdCQUFRUixNQUFNUSxLQUFOLEdBQWMsRUFBdEI7QUFDRCxPQUZELE1BRU87QUFDTEEsZ0JBQVFwQixnQkFBZ0JZLE1BQU1YLFFBQXRCLENBQVI7QUFDRDtBQUNEYSxpQkFBVyxLQUFYO0FBQ0EsVUFBSU8sTUFBTUMsT0FBTixDQUFjUCxXQUFkLENBQUosRUFBZ0M7QUFDOUI7QUFDQSxhQUFLLElBQUlRLElBQUksQ0FBYixFQUFnQkEsSUFBSVIsWUFBWVMsTUFBaEMsRUFBd0NELEdBQXhDLEVBQTZDO0FBQzNDLGNBQUksS0FBS1IsWUFBWVEsQ0FBWixDQUFMLEtBQXdCSCxLQUE1QixFQUFtQztBQUNqQ04sdUJBQVcsSUFBWDtBQUNBO0FBQ0Q7QUFDRjtBQUNGLE9BUkQsTUFRTztBQUNMQSxtQkFBVyxLQUFLQyxXQUFMLEtBQXFCSyxLQUFoQztBQUNEO0FBQ0Y7O0FBRURULFNBQUtjLGFBQUwsR0FBcUIsRUFBRVgsVUFBVUEsUUFBWixFQUFyQjtBQUNELEdBOUNrQjs7QUFnRG5CWSxvQkFBa0IsMEJBQVVmLElBQVYsRUFBZ0I7QUFDaEM7QUFDQSxRQUFJQyxRQUFRRCxLQUFLZ0IsZUFBTCxDQUFxQmYsS0FBakM7QUFDQSxRQUFJQSxNQUFNUSxLQUFOLElBQWUsSUFBbkIsRUFBeUI7QUFDdkIsVUFBSVEsT0FBT2hDLHNCQUFzQmlDLG1CQUF0QixDQUEwQ2xCLElBQTFDLENBQVg7QUFDQWlCLFdBQUtFLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkJsQixNQUFNUSxLQUFqQztBQUNEO0FBQ0YsR0F2RGtCOztBQXlEbkJXLGdCQUFjLHNCQUFVcEIsSUFBVixFQUFnQkMsS0FBaEIsRUFBdUI7QUFDbkMsUUFBSW9CLFlBQVl2QyxRQUFRLEVBQUVxQixVQUFVbUIsU0FBWixFQUF1QmhDLFVBQVVnQyxTQUFqQyxFQUFSLEVBQXNEckIsS0FBdEQsQ0FBaEI7O0FBRUE7QUFDQTtBQUNBLFFBQUlELEtBQUtjLGFBQUwsQ0FBbUJYLFFBQW5CLElBQStCLElBQW5DLEVBQXlDO0FBQ3ZDa0IsZ0JBQVVsQixRQUFWLEdBQXFCSCxLQUFLYyxhQUFMLENBQW1CWCxRQUF4QztBQUNEOztBQUVELFFBQUlaLFVBQVVGLGdCQUFnQlksTUFBTVgsUUFBdEIsQ0FBZDs7QUFFQSxRQUFJQyxPQUFKLEVBQWE7QUFDWDhCLGdCQUFVL0IsUUFBVixHQUFxQkMsT0FBckI7QUFDRDs7QUFFRCxXQUFPOEIsU0FBUDtBQUNEOztBQXpFa0IsQ0FBckI7O0FBNkVBRSxPQUFPQyxPQUFQLEdBQWlCMUIsY0FBakIiLCJmaWxlIjoiUmVhY3RET01PcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Jyk7XG52YXIgUmVhY3RET01Db21wb25lbnRUcmVlID0gcmVxdWlyZSgnLi9SZWFjdERPTUNvbXBvbmVudFRyZWUnKTtcbnZhciBSZWFjdERPTVNlbGVjdCA9IHJlcXVpcmUoJy4vUmVhY3RET01TZWxlY3QnKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgZGlkV2FybkludmFsaWRPcHRpb25DaGlsZHJlbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgdmFyIGNvbnRlbnQgPSAnJztcblxuICAvLyBGbGF0dGVuIGNoaWxkcmVuIGFuZCB3YXJuIGlmIHRoZXkgYXJlbid0IHN0cmluZ3Mgb3IgbnVtYmVycztcbiAgLy8gaW52YWxpZCB0eXBlcyBhcmUgaWdub3JlZC5cbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09PSAnbnVtYmVyJykge1xuICAgICAgY29udGVudCArPSBjaGlsZDtcbiAgICB9IGVsc2UgaWYgKCFkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuKSB7XG4gICAgICBkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnT25seSBzdHJpbmdzIGFuZCBudW1iZXJzIGFyZSBzdXBwb3J0ZWQgYXMgPG9wdGlvbj4gY2hpbGRyZW4uJykgOiB2b2lkIDA7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbXBsZW1lbnRzIGFuIDxvcHRpb24+IGhvc3QgY29tcG9uZW50IHRoYXQgd2FybnMgd2hlbiBgc2VsZWN0ZWRgIGlzIHNldC5cbiAqL1xudmFyIFJlYWN0RE9NT3B0aW9uID0ge1xuICBtb3VudFdyYXBwZXI6IGZ1bmN0aW9uIChpbnN0LCBwcm9wcywgaG9zdFBhcmVudCkge1xuICAgIC8vIFRPRE8gKHl1bmdzdGVycyk6IFJlbW92ZSBzdXBwb3J0IGZvciBgc2VsZWN0ZWRgIGluIDxvcHRpb24+LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhwcm9wcy5zZWxlY3RlZCA9PSBudWxsLCAnVXNlIHRoZSBgZGVmYXVsdFZhbHVlYCBvciBgdmFsdWVgIHByb3BzIG9uIDxzZWxlY3Q+IGluc3RlYWQgb2YgJyArICdzZXR0aW5nIGBzZWxlY3RlZGAgb24gPG9wdGlvbj4uJykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gTG9vayB1cCB3aGV0aGVyIHRoaXMgb3B0aW9uIGlzICdzZWxlY3RlZCdcbiAgICB2YXIgc2VsZWN0VmFsdWUgPSBudWxsO1xuICAgIGlmIChob3N0UGFyZW50ICE9IG51bGwpIHtcbiAgICAgIHZhciBzZWxlY3RQYXJlbnQgPSBob3N0UGFyZW50O1xuXG4gICAgICBpZiAoc2VsZWN0UGFyZW50Ll90YWcgPT09ICdvcHRncm91cCcpIHtcbiAgICAgICAgc2VsZWN0UGFyZW50ID0gc2VsZWN0UGFyZW50Ll9ob3N0UGFyZW50O1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZWN0UGFyZW50ICE9IG51bGwgJiYgc2VsZWN0UGFyZW50Ll90YWcgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHNlbGVjdFZhbHVlID0gUmVhY3RET01TZWxlY3QuZ2V0U2VsZWN0VmFsdWVDb250ZXh0KHNlbGVjdFBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHZhbHVlIGlzIG51bGwgKGUuZy4sIG5vIHNwZWNpZmllZCB2YWx1ZSBvciBhZnRlciBpbml0aWFsIG1vdW50KVxuICAgIC8vIG9yIG1pc3NpbmcgKGUuZy4sIGZvciA8ZGF0YWxpc3Q+KSwgd2UgZG9uJ3QgY2hhbmdlIHByb3BzLnNlbGVjdGVkXG4gICAgdmFyIHNlbGVjdGVkID0gbnVsbDtcbiAgICBpZiAoc2VsZWN0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgaWYgKHByb3BzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSBwcm9wcy52YWx1ZSArICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBmbGF0dGVuQ2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdFZhbHVlKSkge1xuICAgICAgICAvLyBtdWx0aXBsZVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCcnICsgc2VsZWN0VmFsdWVbaV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGVjdGVkID0gJycgKyBzZWxlY3RWYWx1ZSA9PT0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zdC5fd3JhcHBlclN0YXRlID0geyBzZWxlY3RlZDogc2VsZWN0ZWQgfTtcbiAgfSxcblxuICBwb3N0TW91bnRXcmFwcGVyOiBmdW5jdGlvbiAoaW5zdCkge1xuICAgIC8vIHZhbHVlPVwiXCIgc2hvdWxkIG1ha2UgYSB2YWx1ZSBhdHRyaWJ1dGUgKCM2MjE5KVxuICAgIHZhciBwcm9wcyA9IGluc3QuX2N1cnJlbnRFbGVtZW50LnByb3BzO1xuICAgIGlmIChwcm9wcy52YWx1ZSAhPSBudWxsKSB7XG4gICAgICB2YXIgbm9kZSA9IFJlYWN0RE9NQ29tcG9uZW50VHJlZS5nZXROb2RlRnJvbUluc3RhbmNlKGluc3QpO1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcHJvcHMudmFsdWUpO1xuICAgIH1cbiAgfSxcblxuICBnZXRIb3N0UHJvcHM6IGZ1bmN0aW9uIChpbnN0LCBwcm9wcykge1xuICAgIHZhciBob3N0UHJvcHMgPSBfYXNzaWduKHsgc2VsZWN0ZWQ6IHVuZGVmaW5lZCwgY2hpbGRyZW46IHVuZGVmaW5lZCB9LCBwcm9wcyk7XG5cbiAgICAvLyBSZWFkIHN0YXRlIG9ubHkgZnJvbSBpbml0aWFsIG1vdW50IGJlY2F1c2UgPHNlbGVjdD4gdXBkYXRlcyB2YWx1ZVxuICAgIC8vIG1hbnVhbGx5OyB3ZSBuZWVkIHRoZSBpbml0aWFsIHN0YXRlIG9ubHkgZm9yIHNlcnZlciByZW5kZXJpbmdcbiAgICBpZiAoaW5zdC5fd3JhcHBlclN0YXRlLnNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgIGhvc3RQcm9wcy5zZWxlY3RlZCA9IGluc3QuX3dyYXBwZXJTdGF0ZS5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICB2YXIgY29udGVudCA9IGZsYXR0ZW5DaGlsZHJlbihwcm9wcy5jaGlsZHJlbik7XG5cbiAgICBpZiAoY29udGVudCkge1xuICAgICAgaG9zdFByb3BzLmNoaWxkcmVuID0gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gaG9zdFByb3BzO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01PcHRpb247Il19