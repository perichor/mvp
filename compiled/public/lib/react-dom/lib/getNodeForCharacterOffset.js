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

/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */

function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

module.exports = getNodeForCharacterOffset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9nZXROb2RlRm9yQ2hhcmFjdGVyT2Zmc2V0LmpzIl0sIm5hbWVzIjpbImdldExlYWZOb2RlIiwibm9kZSIsImZpcnN0Q2hpbGQiLCJnZXRTaWJsaW5nTm9kZSIsIm5leHRTaWJsaW5nIiwicGFyZW50Tm9kZSIsImdldE5vZGVGb3JDaGFyYWN0ZXJPZmZzZXQiLCJyb290Iiwib2Zmc2V0Iiwibm9kZVN0YXJ0Iiwibm9kZUVuZCIsIm5vZGVUeXBlIiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBOzs7Ozs7O0FBT0EsU0FBU0EsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsU0FBT0EsUUFBUUEsS0FBS0MsVUFBcEIsRUFBZ0M7QUFDOUJELFdBQU9BLEtBQUtDLFVBQVo7QUFDRDtBQUNELFNBQU9ELElBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFNBQVNFLGNBQVQsQ0FBd0JGLElBQXhCLEVBQThCO0FBQzVCLFNBQU9BLElBQVAsRUFBYTtBQUNYLFFBQUlBLEtBQUtHLFdBQVQsRUFBc0I7QUFDcEIsYUFBT0gsS0FBS0csV0FBWjtBQUNEO0FBQ0RILFdBQU9BLEtBQUtJLFVBQVo7QUFDRDtBQUNGOztBQUVEOzs7Ozs7O0FBT0EsU0FBU0MseUJBQVQsQ0FBbUNDLElBQW5DLEVBQXlDQyxNQUF6QyxFQUFpRDtBQUMvQyxNQUFJUCxPQUFPRCxZQUFZTyxJQUFaLENBQVg7QUFDQSxNQUFJRSxZQUFZLENBQWhCO0FBQ0EsTUFBSUMsVUFBVSxDQUFkOztBQUVBLFNBQU9ULElBQVAsRUFBYTtBQUNYLFFBQUlBLEtBQUtVLFFBQUwsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkJELGdCQUFVRCxZQUFZUixLQUFLVyxXQUFMLENBQWlCQyxNQUF2Qzs7QUFFQSxVQUFJSixhQUFhRCxNQUFiLElBQXVCRSxXQUFXRixNQUF0QyxFQUE4QztBQUM1QyxlQUFPO0FBQ0xQLGdCQUFNQSxJQUREO0FBRUxPLGtCQUFRQSxTQUFTQztBQUZaLFNBQVA7QUFJRDs7QUFFREEsa0JBQVlDLE9BQVo7QUFDRDs7QUFFRFQsV0FBT0QsWUFBWUcsZUFBZUYsSUFBZixDQUFaLENBQVA7QUFDRDtBQUNGOztBQUVEYSxPQUFPQyxPQUFQLEdBQWlCVCx5QkFBakIiLCJmaWxlIjoiZ2V0Tm9kZUZvckNoYXJhY3Rlck9mZnNldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogR2l2ZW4gYW55IG5vZGUgcmV0dXJuIHRoZSBmaXJzdCBsZWFmIG5vZGUgd2l0aG91dCBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR8RE9NVGV4dE5vZGV9IG5vZGVcbiAqIEByZXR1cm4ge0RPTUVsZW1lbnR8RE9NVGV4dE5vZGV9XG4gKi9cblxuZnVuY3Rpb24gZ2V0TGVhZk5vZGUobm9kZSkge1xuICB3aGlsZSAobm9kZSAmJiBub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlID0gbm9kZS5maXJzdENoaWxkO1xuICB9XG4gIHJldHVybiBub2RlO1xufVxuXG4vKipcbiAqIEdldCB0aGUgbmV4dCBzaWJsaW5nIHdpdGhpbiBhIGNvbnRhaW5lci4gVGhpcyB3aWxsIHdhbGsgdXAgdGhlXG4gKiBET00gaWYgYSBub2RlJ3Mgc2libGluZ3MgaGF2ZSBiZWVuIGV4aGF1c3RlZC5cbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR8RE9NVGV4dE5vZGV9IG5vZGVcbiAqIEByZXR1cm4gez9ET01FbGVtZW50fERPTVRleHROb2RlfVxuICovXG5mdW5jdGlvbiBnZXRTaWJsaW5nTm9kZShub2RlKSB7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKG5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG59XG5cbi8qKlxuICogR2V0IG9iamVjdCBkZXNjcmliaW5nIHRoZSBub2RlcyB3aGljaCBjb250YWluIGNoYXJhY3RlcnMgYXQgb2Zmc2V0LlxuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudHxET01UZXh0Tm9kZX0gcm9vdFxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICogQHJldHVybiB7P29iamVjdH1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9kZUZvckNoYXJhY3Rlck9mZnNldChyb290LCBvZmZzZXQpIHtcbiAgdmFyIG5vZGUgPSBnZXRMZWFmTm9kZShyb290KTtcbiAgdmFyIG5vZGVTdGFydCA9IDA7XG4gIHZhciBub2RlRW5kID0gMDtcblxuICB3aGlsZSAobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICBub2RlRW5kID0gbm9kZVN0YXJ0ICsgbm9kZS50ZXh0Q29udGVudC5sZW5ndGg7XG5cbiAgICAgIGlmIChub2RlU3RhcnQgPD0gb2Zmc2V0ICYmIG5vZGVFbmQgPj0gb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICBvZmZzZXQ6IG9mZnNldCAtIG5vZGVTdGFydFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBub2RlU3RhcnQgPSBub2RlRW5kO1xuICAgIH1cblxuICAgIG5vZGUgPSBnZXRMZWFmTm9kZShnZXRTaWJsaW5nTm9kZShub2RlKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROb2RlRm9yQ2hhcmFjdGVyT2Zmc2V0OyJdfQ==