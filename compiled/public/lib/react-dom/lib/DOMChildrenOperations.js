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

var DOMLazyTree = require('./DOMLazyTree');
var Danger = require('./Danger');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactInstrumentation = require('./ReactInstrumentation');

var createMicrosoftUnsafeLocalFunction = require('./createMicrosoftUnsafeLocalFunction');
var setInnerHTML = require('./setInnerHTML');
var setTextContent = require('./setTextContent');

function getNodeAfter(parentNode, node) {
  // Special case for text components, which return [open, close] comments
  // from getHostNode.
  if (Array.isArray(node)) {
    node = node[1];
  }
  return node ? node.nextSibling : parentNode.firstChild;
}

/**
 * Inserts `childNode` as a child of `parentNode` at the `index`.
 *
 * @param {DOMElement} parentNode Parent node in which to insert.
 * @param {DOMElement} childNode Child node to insert.
 * @param {number} index Index at which to insert the child.
 * @internal
 */
var insertChildAt = createMicrosoftUnsafeLocalFunction(function (parentNode, childNode, referenceNode) {
  // We rely exclusively on `insertBefore(node, null)` instead of also using
  // `appendChild(node)`. (Using `undefined` is not allowed by all browsers so
  // we are careful to use `null`.)
  parentNode.insertBefore(childNode, referenceNode);
});

function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
  DOMLazyTree.insertTreeBefore(parentNode, childTree, referenceNode);
}

function moveChild(parentNode, childNode, referenceNode) {
  if (Array.isArray(childNode)) {
    moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
  } else {
    insertChildAt(parentNode, childNode, referenceNode);
  }
}

function removeChild(parentNode, childNode) {
  if (Array.isArray(childNode)) {
    var closingComment = childNode[1];
    childNode = childNode[0];
    removeDelimitedText(parentNode, childNode, closingComment);
    parentNode.removeChild(closingComment);
  }
  parentNode.removeChild(childNode);
}

function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
  var node = openingComment;
  while (true) {
    var nextNode = node.nextSibling;
    insertChildAt(parentNode, node, referenceNode);
    if (node === closingComment) {
      break;
    }
    node = nextNode;
  }
}

function removeDelimitedText(parentNode, startNode, closingComment) {
  while (true) {
    var node = startNode.nextSibling;
    if (node === closingComment) {
      // The closing comment is removed by ReactMultiChild.
      break;
    } else {
      parentNode.removeChild(node);
    }
  }
}

function replaceDelimitedText(openingComment, closingComment, stringText) {
  var parentNode = openingComment.parentNode;
  var nodeAfterComment = openingComment.nextSibling;
  if (nodeAfterComment === closingComment) {
    // There are no text nodes between the opening and closing comments; insert
    // a new one if stringText isn't empty.
    if (stringText) {
      insertChildAt(parentNode, document.createTextNode(stringText), nodeAfterComment);
    }
  } else {
    if (stringText) {
      // Set the text content of the first node after the opening comment, and
      // remove all following nodes up until the closing comment.
      setTextContent(nodeAfterComment, stringText);
      removeDelimitedText(parentNode, nodeAfterComment, closingComment);
    } else {
      removeDelimitedText(parentNode, openingComment, closingComment);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    ReactInstrumentation.debugTool.onHostOperation({
      instanceID: ReactDOMComponentTree.getInstanceFromNode(openingComment)._debugID,
      type: 'replace text',
      payload: stringText
    });
  }
}

var dangerouslyReplaceNodeWithMarkup = Danger.dangerouslyReplaceNodeWithMarkup;
if (process.env.NODE_ENV !== 'production') {
  dangerouslyReplaceNodeWithMarkup = function dangerouslyReplaceNodeWithMarkup(oldChild, markup, prevInstance) {
    Danger.dangerouslyReplaceNodeWithMarkup(oldChild, markup);
    if (prevInstance._debugID !== 0) {
      ReactInstrumentation.debugTool.onHostOperation({
        instanceID: prevInstance._debugID,
        type: 'replace with',
        payload: markup.toString()
      });
    } else {
      var nextInstance = ReactDOMComponentTree.getInstanceFromNode(markup.node);
      if (nextInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onHostOperation({
          instanceID: nextInstance._debugID,
          type: 'mount',
          payload: markup.toString()
        });
      }
    }
  };
}

/**
 * Operations for updating with DOM children.
 */
var DOMChildrenOperations = {

  dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup,

  replaceDelimitedText: replaceDelimitedText,

  /**
   * Updates a component's children by processing a series of updates. The
   * update configurations are each expected to have a `parentNode` property.
   *
   * @param {array<object>} updates List of update configurations.
   * @internal
   */
  processUpdates: function processUpdates(parentNode, updates) {
    if (process.env.NODE_ENV !== 'production') {
      var parentNodeDebugID = ReactDOMComponentTree.getInstanceFromNode(parentNode)._debugID;
    }

    for (var k = 0; k < updates.length; k++) {
      var update = updates[k];
      switch (update.type) {
        case 'INSERT_MARKUP':
          insertLazyTreeChildAt(parentNode, update.content, getNodeAfter(parentNode, update.afterNode));
          if (process.env.NODE_ENV !== 'production') {
            ReactInstrumentation.debugTool.onHostOperation({
              instanceID: parentNodeDebugID,
              type: 'insert child',
              payload: { toIndex: update.toIndex, content: update.content.toString() }
            });
          }
          break;
        case 'MOVE_EXISTING':
          moveChild(parentNode, update.fromNode, getNodeAfter(parentNode, update.afterNode));
          if (process.env.NODE_ENV !== 'production') {
            ReactInstrumentation.debugTool.onHostOperation({
              instanceID: parentNodeDebugID,
              type: 'move child',
              payload: { fromIndex: update.fromIndex, toIndex: update.toIndex }
            });
          }
          break;
        case 'SET_MARKUP':
          setInnerHTML(parentNode, update.content);
          if (process.env.NODE_ENV !== 'production') {
            ReactInstrumentation.debugTool.onHostOperation({
              instanceID: parentNodeDebugID,
              type: 'replace children',
              payload: update.content.toString()
            });
          }
          break;
        case 'TEXT_CONTENT':
          setTextContent(parentNode, update.content);
          if (process.env.NODE_ENV !== 'production') {
            ReactInstrumentation.debugTool.onHostOperation({
              instanceID: parentNodeDebugID,
              type: 'replace text',
              payload: update.content.toString()
            });
          }
          break;
        case 'REMOVE_NODE':
          removeChild(parentNode, update.fromNode);
          if (process.env.NODE_ENV !== 'production') {
            ReactInstrumentation.debugTool.onHostOperation({
              instanceID: parentNodeDebugID,
              type: 'remove child',
              payload: { fromIndex: update.fromIndex }
            });
          }
          break;
      }
    }
  }

};

module.exports = DOMChildrenOperations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9ET01DaGlsZHJlbk9wZXJhdGlvbnMuanMiXSwibmFtZXMiOlsiRE9NTGF6eVRyZWUiLCJyZXF1aXJlIiwiRGFuZ2VyIiwiUmVhY3RET01Db21wb25lbnRUcmVlIiwiUmVhY3RJbnN0cnVtZW50YXRpb24iLCJjcmVhdGVNaWNyb3NvZnRVbnNhZmVMb2NhbEZ1bmN0aW9uIiwic2V0SW5uZXJIVE1MIiwic2V0VGV4dENvbnRlbnQiLCJnZXROb2RlQWZ0ZXIiLCJwYXJlbnROb2RlIiwibm9kZSIsIkFycmF5IiwiaXNBcnJheSIsIm5leHRTaWJsaW5nIiwiZmlyc3RDaGlsZCIsImluc2VydENoaWxkQXQiLCJjaGlsZE5vZGUiLCJyZWZlcmVuY2VOb2RlIiwiaW5zZXJ0QmVmb3JlIiwiaW5zZXJ0TGF6eVRyZWVDaGlsZEF0IiwiY2hpbGRUcmVlIiwiaW5zZXJ0VHJlZUJlZm9yZSIsIm1vdmVDaGlsZCIsIm1vdmVEZWxpbWl0ZWRUZXh0IiwicmVtb3ZlQ2hpbGQiLCJjbG9zaW5nQ29tbWVudCIsInJlbW92ZURlbGltaXRlZFRleHQiLCJvcGVuaW5nQ29tbWVudCIsIm5leHROb2RlIiwic3RhcnROb2RlIiwicmVwbGFjZURlbGltaXRlZFRleHQiLCJzdHJpbmdUZXh0Iiwibm9kZUFmdGVyQ29tbWVudCIsImRvY3VtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJkZWJ1Z1Rvb2wiLCJvbkhvc3RPcGVyYXRpb24iLCJpbnN0YW5jZUlEIiwiZ2V0SW5zdGFuY2VGcm9tTm9kZSIsIl9kZWJ1Z0lEIiwidHlwZSIsInBheWxvYWQiLCJkYW5nZXJvdXNseVJlcGxhY2VOb2RlV2l0aE1hcmt1cCIsIm9sZENoaWxkIiwibWFya3VwIiwicHJldkluc3RhbmNlIiwidG9TdHJpbmciLCJuZXh0SW5zdGFuY2UiLCJET01DaGlsZHJlbk9wZXJhdGlvbnMiLCJwcm9jZXNzVXBkYXRlcyIsInVwZGF0ZXMiLCJwYXJlbnROb2RlRGVidWdJRCIsImsiLCJsZW5ndGgiLCJ1cGRhdGUiLCJjb250ZW50IiwiYWZ0ZXJOb2RlIiwidG9JbmRleCIsImZyb21Ob2RlIiwiZnJvbUluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxjQUFjQyxRQUFRLGVBQVIsQ0FBbEI7QUFDQSxJQUFJQyxTQUFTRCxRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUlFLHdCQUF3QkYsUUFBUSx5QkFBUixDQUE1QjtBQUNBLElBQUlHLHVCQUF1QkgsUUFBUSx3QkFBUixDQUEzQjs7QUFFQSxJQUFJSSxxQ0FBcUNKLFFBQVEsc0NBQVIsQ0FBekM7QUFDQSxJQUFJSyxlQUFlTCxRQUFRLGdCQUFSLENBQW5CO0FBQ0EsSUFBSU0saUJBQWlCTixRQUFRLGtCQUFSLENBQXJCOztBQUVBLFNBQVNPLFlBQVQsQ0FBc0JDLFVBQXRCLEVBQWtDQyxJQUFsQyxFQUF3QztBQUN0QztBQUNBO0FBQ0EsTUFBSUMsTUFBTUMsT0FBTixDQUFjRixJQUFkLENBQUosRUFBeUI7QUFDdkJBLFdBQU9BLEtBQUssQ0FBTCxDQUFQO0FBQ0Q7QUFDRCxTQUFPQSxPQUFPQSxLQUFLRyxXQUFaLEdBQTBCSixXQUFXSyxVQUE1QztBQUNEOztBQUVEOzs7Ozs7OztBQVFBLElBQUlDLGdCQUFnQlYsbUNBQW1DLFVBQVVJLFVBQVYsRUFBc0JPLFNBQXRCLEVBQWlDQyxhQUFqQyxFQUFnRDtBQUNyRztBQUNBO0FBQ0E7QUFDQVIsYUFBV1MsWUFBWCxDQUF3QkYsU0FBeEIsRUFBbUNDLGFBQW5DO0FBQ0QsQ0FMbUIsQ0FBcEI7O0FBT0EsU0FBU0UscUJBQVQsQ0FBK0JWLFVBQS9CLEVBQTJDVyxTQUEzQyxFQUFzREgsYUFBdEQsRUFBcUU7QUFDbkVqQixjQUFZcUIsZ0JBQVosQ0FBNkJaLFVBQTdCLEVBQXlDVyxTQUF6QyxFQUFvREgsYUFBcEQ7QUFDRDs7QUFFRCxTQUFTSyxT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Qyx5QkFBZUUsVUFBZixFQUEyQmdELE9BQU9DLE9BQWxDO0FBQ0EsY0FBSXZCLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q2pDLGlDQUFxQmtDLFNBQXJCLENBQStCQyxlQUEvQixDQUErQztBQUM3Q0MsMEJBQVljLGlCQURpQztBQUU3Q1gsb0JBQU0sY0FGdUM7QUFHN0NDLHVCQUFTYSxPQUFPQyxPQUFQLENBQWVULFFBQWY7QUFIb0MsYUFBL0M7QUFLRDtBQUNEO0FBQ0YsYUFBSyxhQUFMO0FBQ0V6QixzQkFBWWYsVUFBWixFQUF3QmdELE9BQU9JLFFBQS9CO0FBQ0EsY0FBSTFCLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q2pDLGlDQUFxQmtDLFNBQXJCLENBQStCQyxlQUEvQixDQUErQztBQUM3Q0MsMEJBQVljLGlCQURpQztBQUU3Q1gsb0JBQU0sY0FGdUM7QUFHN0NDLHVCQUFTLEVBQUVrQixXQUFXTCxPQUFPSyxTQUFwQjtBQUhvQyxhQUEvQztBQUtEO0FBQ0Q7QUFsREo7QUFvREQ7QUFDRjs7QUF6RXlCLENBQTVCOztBQTZFQUMsT0FBT0MsT0FBUCxHQUFpQmIscUJBQWpCIiwiZmlsZSI6IkRPTUNoaWxkcmVuT3BlcmF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBET01MYXp5VHJlZSA9IHJlcXVpcmUoJy4vRE9NTGF6eVRyZWUnKTtcbnZhciBEYW5nZXIgPSByZXF1aXJlKCcuL0RhbmdlcicpO1xudmFyIFJlYWN0RE9NQ29tcG9uZW50VHJlZSA9IHJlcXVpcmUoJy4vUmVhY3RET01Db21wb25lbnRUcmVlJyk7XG52YXIgUmVhY3RJbnN0cnVtZW50YXRpb24gPSByZXF1aXJlKCcuL1JlYWN0SW5zdHJ1bWVudGF0aW9uJyk7XG5cbnZhciBjcmVhdGVNaWNyb3NvZnRVbnNhZmVMb2NhbEZ1bmN0aW9uID0gcmVxdWlyZSgnLi9jcmVhdGVNaWNyb3NvZnRVbnNhZmVMb2NhbEZ1bmN0aW9uJyk7XG52YXIgc2V0SW5uZXJIVE1MID0gcmVxdWlyZSgnLi9zZXRJbm5lckhUTUwnKTtcbnZhciBzZXRUZXh0Q29udGVudCA9IHJlcXVpcmUoJy4vc2V0VGV4dENvbnRlbnQnKTtcblxuZnVuY3Rpb24gZ2V0Tm9kZUFmdGVyKHBhcmVudE5vZGUsIG5vZGUpIHtcbiAgLy8gU3BlY2lhbCBjYXNlIGZvciB0ZXh0IGNvbXBvbmVudHMsIHdoaWNoIHJldHVybiBbb3BlbiwgY2xvc2VdIGNvbW1lbnRzXG4gIC8vIGZyb20gZ2V0SG9zdE5vZGUuXG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgbm9kZSA9IG5vZGVbMV07XG4gIH1cbiAgcmV0dXJuIG5vZGUgPyBub2RlLm5leHRTaWJsaW5nIDogcGFyZW50Tm9kZS5maXJzdENoaWxkO1xufVxuXG4vKipcbiAqIEluc2VydHMgYGNoaWxkTm9kZWAgYXMgYSBjaGlsZCBvZiBgcGFyZW50Tm9kZWAgYXQgdGhlIGBpbmRleGAuXG4gKlxuICogQHBhcmFtIHtET01FbGVtZW50fSBwYXJlbnROb2RlIFBhcmVudCBub2RlIGluIHdoaWNoIHRvIGluc2VydC5cbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gY2hpbGROb2RlIENoaWxkIG5vZGUgdG8gaW5zZXJ0LlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgY2hpbGQuXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIGluc2VydENoaWxkQXQgPSBjcmVhdGVNaWNyb3NvZnRVbnNhZmVMb2NhbEZ1bmN0aW9uKGZ1bmN0aW9uIChwYXJlbnROb2RlLCBjaGlsZE5vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgLy8gV2UgcmVseSBleGNsdXNpdmVseSBvbiBgaW5zZXJ0QmVmb3JlKG5vZGUsIG51bGwpYCBpbnN0ZWFkIG9mIGFsc28gdXNpbmdcbiAgLy8gYGFwcGVuZENoaWxkKG5vZGUpYC4gKFVzaW5nIGB1bmRlZmluZWRgIGlzIG5vdCBhbGxvd2VkIGJ5IGFsbCBicm93c2VycyBzb1xuICAvLyB3ZSBhcmUgY2FyZWZ1bCB0byB1c2UgYG51bGxgLilcbiAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2hpbGROb2RlLCByZWZlcmVuY2VOb2RlKTtcbn0pO1xuXG5mdW5jdGlvbiBpbnNlcnRMYXp5VHJlZUNoaWxkQXQocGFyZW50Tm9kZSwgY2hpbGRUcmVlLCByZWZlcmVuY2VOb2RlKSB7XG4gIERPTUxhenlUcmVlLmluc2VydFRyZWVCZWZvcmUocGFyZW50Tm9kZSwgY2hpbGRUcmVlLCByZWZlcmVuY2VOb2RlKTtcbn1cblxuZnVuY3Rpb24gbW92ZUNoaWxkKHBhcmVudE5vZGUsIGNoaWxkTm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZE5vZGUpKSB7XG4gICAgbW92ZURlbGltaXRlZFRleHQocGFyZW50Tm9kZSwgY2hpbGROb2RlWzBdLCBjaGlsZE5vZGVbMV0sIHJlZmVyZW5jZU5vZGUpO1xuICB9IGVsc2Uge1xuICAgIGluc2VydENoaWxkQXQocGFyZW50Tm9kZSwgY2hpbGROb2RlLCByZWZlcmVuY2VOb2RlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZChwYXJlbnROb2RlLCBjaGlsZE5vZGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGROb2RlKSkge1xuICAgIHZhciBjbG9zaW5nQ29tbWVudCA9IGNoaWxkTm9kZVsxXTtcbiAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGVbMF07XG4gICAgcmVtb3ZlRGVsaW1pdGVkVGV4dChwYXJlbnROb2RlLCBjaGlsZE5vZGUsIGNsb3NpbmdDb21tZW50KTtcbiAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb3NpbmdDb21tZW50KTtcbiAgfVxuICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVEZWxpbWl0ZWRUZXh0KHBhcmVudE5vZGUsIG9wZW5pbmdDb21tZW50LCBjbG9zaW5nQ29tbWVudCwgcmVmZXJlbmNlTm9kZSkge1xuICB2YXIgbm9kZSA9IG9wZW5pbmdDb21tZW50O1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBuZXh0Tm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgaW5zZXJ0Q2hpbGRBdChwYXJlbnROb2RlLCBub2RlLCByZWZlcmVuY2VOb2RlKTtcbiAgICBpZiAobm9kZSA9PT0gY2xvc2luZ0NvbW1lbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBub2RlID0gbmV4dE5vZGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRGVsaW1pdGVkVGV4dChwYXJlbnROb2RlLCBzdGFydE5vZGUsIGNsb3NpbmdDb21tZW50KSB7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIG5vZGUgPSBzdGFydE5vZGUubmV4dFNpYmxpbmc7XG4gICAgaWYgKG5vZGUgPT09IGNsb3NpbmdDb21tZW50KSB7XG4gICAgICAvLyBUaGUgY2xvc2luZyBjb21tZW50IGlzIHJlbW92ZWQgYnkgUmVhY3RNdWx0aUNoaWxkLlxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VEZWxpbWl0ZWRUZXh0KG9wZW5pbmdDb21tZW50LCBjbG9zaW5nQ29tbWVudCwgc3RyaW5nVGV4dCkge1xuICB2YXIgcGFyZW50Tm9kZSA9IG9wZW5pbmdDb21tZW50LnBhcmVudE5vZGU7XG4gIHZhciBub2RlQWZ0ZXJDb21tZW50ID0gb3BlbmluZ0NvbW1lbnQubmV4dFNpYmxpbmc7XG4gIGlmIChub2RlQWZ0ZXJDb21tZW50ID09PSBjbG9zaW5nQ29tbWVudCkge1xuICAgIC8vIFRoZXJlIGFyZSBubyB0ZXh0IG5vZGVzIGJldHdlZW4gdGhlIG9wZW5pbmcgYW5kIGNsb3NpbmcgY29tbWVudHM7IGluc2VydFxuICAgIC8vIGEgbmV3IG9uZSBpZiBzdHJpbmdUZXh0IGlzbid0IGVtcHR5LlxuICAgIGlmIChzdHJpbmdUZXh0KSB7XG4gICAgICBpbnNlcnRDaGlsZEF0KHBhcmVudE5vZGUsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cmluZ1RleHQpLCBub2RlQWZ0ZXJDb21tZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHN0cmluZ1RleHQpIHtcbiAgICAgIC8vIFNldCB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBmaXJzdCBub2RlIGFmdGVyIHRoZSBvcGVuaW5nIGNvbW1lbnQsIGFuZFxuICAgICAgLy8gcmVtb3ZlIGFsbCBmb2xsb3dpbmcgbm9kZXMgdXAgdW50aWwgdGhlIGNsb3NpbmcgY29tbWVudC5cbiAgICAgIHNldFRleHRDb250ZW50KG5vZGVBZnRlckNvbW1lbnQsIHN0cmluZ1RleHQpO1xuICAgICAgcmVtb3ZlRGVsaW1pdGVkVGV4dChwYXJlbnROb2RlLCBub2RlQWZ0ZXJDb21tZW50LCBjbG9zaW5nQ29tbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZURlbGltaXRlZFRleHQocGFyZW50Tm9kZSwgb3BlbmluZ0NvbW1lbnQsIGNsb3NpbmdDb21tZW50KTtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkhvc3RPcGVyYXRpb24oe1xuICAgICAgaW5zdGFuY2VJRDogUmVhY3RET01Db21wb25lbnRUcmVlLmdldEluc3RhbmNlRnJvbU5vZGUob3BlbmluZ0NvbW1lbnQpLl9kZWJ1Z0lELFxuICAgICAgdHlwZTogJ3JlcGxhY2UgdGV4dCcsXG4gICAgICBwYXlsb2FkOiBzdHJpbmdUZXh0XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIGRhbmdlcm91c2x5UmVwbGFjZU5vZGVXaXRoTWFya3VwID0gRGFuZ2VyLmRhbmdlcm91c2x5UmVwbGFjZU5vZGVXaXRoTWFya3VwO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGFuZ2Vyb3VzbHlSZXBsYWNlTm9kZVdpdGhNYXJrdXAgPSBmdW5jdGlvbiAob2xkQ2hpbGQsIG1hcmt1cCwgcHJldkluc3RhbmNlKSB7XG4gICAgRGFuZ2VyLmRhbmdlcm91c2x5UmVwbGFjZU5vZGVXaXRoTWFya3VwKG9sZENoaWxkLCBtYXJrdXApO1xuICAgIGlmIChwcmV2SW5zdGFuY2UuX2RlYnVnSUQgIT09IDApIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkhvc3RPcGVyYXRpb24oe1xuICAgICAgICBpbnN0YW5jZUlEOiBwcmV2SW5zdGFuY2UuX2RlYnVnSUQsXG4gICAgICAgIHR5cGU6ICdyZXBsYWNlIHdpdGgnLFxuICAgICAgICBwYXlsb2FkOiBtYXJrdXAudG9TdHJpbmcoKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBuZXh0SW5zdGFuY2UgPSBSZWFjdERPTUNvbXBvbmVudFRyZWUuZ2V0SW5zdGFuY2VGcm9tTm9kZShtYXJrdXAubm9kZSk7XG4gICAgICBpZiAobmV4dEluc3RhbmNlLl9kZWJ1Z0lEICE9PSAwKSB7XG4gICAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkhvc3RPcGVyYXRpb24oe1xuICAgICAgICAgIGluc3RhbmNlSUQ6IG5leHRJbnN0YW5jZS5fZGVidWdJRCxcbiAgICAgICAgICB0eXBlOiAnbW91bnQnLFxuICAgICAgICAgIHBheWxvYWQ6IG1hcmt1cC50b1N0cmluZygpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBPcGVyYXRpb25zIGZvciB1cGRhdGluZyB3aXRoIERPTSBjaGlsZHJlbi5cbiAqL1xudmFyIERPTUNoaWxkcmVuT3BlcmF0aW9ucyA9IHtcblxuICBkYW5nZXJvdXNseVJlcGxhY2VOb2RlV2l0aE1hcmt1cDogZGFuZ2Vyb3VzbHlSZXBsYWNlTm9kZVdpdGhNYXJrdXAsXG5cbiAgcmVwbGFjZURlbGltaXRlZFRleHQ6IHJlcGxhY2VEZWxpbWl0ZWRUZXh0LFxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgY29tcG9uZW50J3MgY2hpbGRyZW4gYnkgcHJvY2Vzc2luZyBhIHNlcmllcyBvZiB1cGRhdGVzLiBUaGVcbiAgICogdXBkYXRlIGNvbmZpZ3VyYXRpb25zIGFyZSBlYWNoIGV4cGVjdGVkIHRvIGhhdmUgYSBgcGFyZW50Tm9kZWAgcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXk8b2JqZWN0Pn0gdXBkYXRlcyBMaXN0IG9mIHVwZGF0ZSBjb25maWd1cmF0aW9ucy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcm9jZXNzVXBkYXRlczogZnVuY3Rpb24gKHBhcmVudE5vZGUsIHVwZGF0ZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHBhcmVudE5vZGVEZWJ1Z0lEID0gUmVhY3RET01Db21wb25lbnRUcmVlLmdldEluc3RhbmNlRnJvbU5vZGUocGFyZW50Tm9kZSkuX2RlYnVnSUQ7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCB1cGRhdGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICB2YXIgdXBkYXRlID0gdXBkYXRlc1trXTtcbiAgICAgIHN3aXRjaCAodXBkYXRlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnSU5TRVJUX01BUktVUCc6XG4gICAgICAgICAgaW5zZXJ0TGF6eVRyZWVDaGlsZEF0KHBhcmVudE5vZGUsIHVwZGF0ZS5jb250ZW50LCBnZXROb2RlQWZ0ZXIocGFyZW50Tm9kZSwgdXBkYXRlLmFmdGVyTm9kZSkpO1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Ib3N0T3BlcmF0aW9uKHtcbiAgICAgICAgICAgICAgaW5zdGFuY2VJRDogcGFyZW50Tm9kZURlYnVnSUQsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbnNlcnQgY2hpbGQnLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB7IHRvSW5kZXg6IHVwZGF0ZS50b0luZGV4LCBjb250ZW50OiB1cGRhdGUuY29udGVudC50b1N0cmluZygpIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTU9WRV9FWElTVElORyc6XG4gICAgICAgICAgbW92ZUNoaWxkKHBhcmVudE5vZGUsIHVwZGF0ZS5mcm9tTm9kZSwgZ2V0Tm9kZUFmdGVyKHBhcmVudE5vZGUsIHVwZGF0ZS5hZnRlck5vZGUpKTtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uSG9zdE9wZXJhdGlvbih7XG4gICAgICAgICAgICAgIGluc3RhbmNlSUQ6IHBhcmVudE5vZGVEZWJ1Z0lELFxuICAgICAgICAgICAgICB0eXBlOiAnbW92ZSBjaGlsZCcsXG4gICAgICAgICAgICAgIHBheWxvYWQ6IHsgZnJvbUluZGV4OiB1cGRhdGUuZnJvbUluZGV4LCB0b0luZGV4OiB1cGRhdGUudG9JbmRleCB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1NFVF9NQVJLVVAnOlxuICAgICAgICAgIHNldElubmVySFRNTChwYXJlbnROb2RlLCB1cGRhdGUuY29udGVudCk7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkhvc3RPcGVyYXRpb24oe1xuICAgICAgICAgICAgICBpbnN0YW5jZUlEOiBwYXJlbnROb2RlRGVidWdJRCxcbiAgICAgICAgICAgICAgdHlwZTogJ3JlcGxhY2UgY2hpbGRyZW4nLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB1cGRhdGUuY29udGVudC50b1N0cmluZygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1RFWFRfQ09OVEVOVCc6XG4gICAgICAgICAgc2V0VGV4dENvbnRlbnQocGFyZW50Tm9kZSwgdXBkYXRlLmNvbnRlbnQpO1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Ib3N0T3BlcmF0aW9uKHtcbiAgICAgICAgICAgICAgaW5zdGFuY2VJRDogcGFyZW50Tm9kZURlYnVnSUQsXG4gICAgICAgICAgICAgIHR5cGU6ICdyZXBsYWNlIHRleHQnLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB1cGRhdGUuY29udGVudC50b1N0cmluZygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JFTU9WRV9OT0RFJzpcbiAgICAgICAgICByZW1vdmVDaGlsZChwYXJlbnROb2RlLCB1cGRhdGUuZnJvbU5vZGUpO1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Ib3N0T3BlcmF0aW9uKHtcbiAgICAgICAgICAgICAgaW5zdGFuY2VJRDogcGFyZW50Tm9kZURlYnVnSUQsXG4gICAgICAgICAgICAgIHR5cGU6ICdyZW1vdmUgY2hpbGQnLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB7IGZyb21JbmRleDogdXBkYXRlLmZyb21JbmRleCB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRE9NQ2hpbGRyZW5PcGVyYXRpb25zOyJdfQ==