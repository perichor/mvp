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

var _prodInvariant = require('./reactProdInvariant');

var DOMProperty = require('./DOMProperty');
var ReactDOMComponentFlags = require('./ReactDOMComponentFlags');

var invariant = require('fbjs/lib/invariant');

var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
var Flags = ReactDOMComponentFlags;

var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);

/**
 * Check if a given node should be cached.
 */
function shouldPrecacheNode(node, nodeID) {
  return node.nodeType === 1 && node.getAttribute(ATTR_NAME) === String(nodeID) || node.nodeType === 8 && node.nodeValue === ' react-text: ' + nodeID + ' ' || node.nodeType === 8 && node.nodeValue === ' react-empty: ' + nodeID + ' ';
}

/**
 * Drill down (through composites and empty components) until we get a host or
 * host text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */
function getRenderedHostOrTextFromComponent(component) {
  var rendered;
  while (rendered = component._renderedComponent) {
    component = rendered;
  }
  return component;
}

/**
 * Populate `_hostNode` on the rendered host/text component with the given
 * DOM node. The passed `inst` can be a composite.
 */
function precacheNode(inst, node) {
  var hostInst = getRenderedHostOrTextFromComponent(inst);
  hostInst._hostNode = node;
  node[internalInstanceKey] = hostInst;
}

function uncacheNode(inst) {
  var node = inst._hostNode;
  if (node) {
    delete node[internalInstanceKey];
    inst._hostNode = null;
  }
}

/**
 * Populate `_hostNode` on each child of `inst`, assuming that the children
 * match up with the DOM (element) children of `node`.
 *
 * We cache entire levels at once to avoid an n^2 problem where we access the
 * children of a node sequentially and have to walk from the start to our target
 * node every time.
 *
 * Since we update `_renderedChildren` and the actual DOM at (slightly)
 * different times, we could race here and see a newer `_renderedChildren` than
 * the DOM nodes we see. To avoid this, ReactMultiChild calls
 * `prepareToManageChildren` before we change `_renderedChildren`, at which
 * time the container's child nodes are always cached (until it unmounts).
 */
function precacheChildNodes(inst, node) {
  if (inst._flags & Flags.hasCachedChildNodes) {
    return;
  }
  var children = inst._renderedChildren;
  var childNode = node.firstChild;
  outer: for (var name in children) {
    if (!children.hasOwnProperty(name)) {
      continue;
    }
    var childInst = children[name];
    var childID = getRenderedHostOrTextFromComponent(childInst)._domID;
    if (childID === 0) {
      // We're currently unmounting this child in ReactMultiChild; skip it.
      continue;
    }
    // We assume the child nodes are in the same order as the child instances.
    for (; childNode !== null; childNode = childNode.nextSibling) {
      if (shouldPrecacheNode(childNode, childID)) {
        precacheNode(childInst, childNode);
        continue outer;
      }
    }
    // We reached the end of the DOM children without finding an ID match.
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unable to find element with ID %s.', childID) : _prodInvariant('32', childID) : void 0;
  }
  inst._flags |= Flags.hasCachedChildNodes;
}

/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  var closest;
  var inst;
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    closest = inst;
    if (parents.length) {
      precacheChildNodes(inst, node);
    }
  }

  return closest;
}

/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode(node) {
  var inst = getClosestInstanceFromNode(node);
  if (inst != null && inst._hostNode === node) {
    return inst;
  } else {
    return null;
  }
}

/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance(inst) {
  // Without this first invariant, passing a non-DOM-component triggers the next
  // invariant for a missing parent, which is super confusing.
  !(inst._hostNode !== undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : _prodInvariant('33') : void 0;

  if (inst._hostNode) {
    return inst._hostNode;
  }

  // Walk up the tree until we find an ancestor whose DOM node we have cached.
  var parents = [];
  while (!inst._hostNode) {
    parents.push(inst);
    !inst._hostParent ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React DOM tree root should always have a node reference.') : _prodInvariant('34') : void 0;
    inst = inst._hostParent;
  }

  // Now parents contains each ancestor that does *not* have a cached native
  // node, and `inst` is the deepest ancestor that does.
  for (; parents.length; inst = parents.pop()) {
    precacheChildNodes(inst, inst._hostNode);
  }

  return inst._hostNode;
}

var ReactDOMComponentTree = {
  getClosestInstanceFromNode: getClosestInstanceFromNode,
  getInstanceFromNode: getInstanceFromNode,
  getNodeFromInstance: getNodeFromInstance,
  precacheChildNodes: precacheChildNodes,
  precacheNode: precacheNode,
  uncacheNode: uncacheNode
};

module.exports = ReactDOMComponentTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdERPTUNvbXBvbmVudFRyZWUuanMiXSwibmFtZXMiOlsiX3Byb2RJbnZhcmlhbnQiLCJyZXF1aXJlIiwiRE9NUHJvcGVydHkiLCJSZWFjdERPTUNvbXBvbmVudEZsYWdzIiwiaW52YXJpYW50IiwiQVRUUl9OQU1FIiwiSURfQVRUUklCVVRFX05BTUUiLCJGbGFncyIsImludGVybmFsSW5zdGFuY2VLZXkiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzbGljZSIsInNob3VsZFByZWNhY2hlTm9kZSIsIm5vZGUiLCJub2RlSUQiLCJub2RlVHlwZSIsImdldEF0dHJpYnV0ZSIsIlN0cmluZyIsIm5vZGVWYWx1ZSIsImdldFJlbmRlcmVkSG9zdE9yVGV4dEZyb21Db21wb25lbnQiLCJjb21wb25lbnQiLCJyZW5kZXJlZCIsIl9yZW5kZXJlZENvbXBvbmVudCIsInByZWNhY2hlTm9kZSIsImluc3QiLCJob3N0SW5zdCIsIl9ob3N0Tm9kZSIsInVuY2FjaGVOb2RlIiwicHJlY2FjaGVDaGlsZE5vZGVzIiwiX2ZsYWdzIiwiaGFzQ2FjaGVkQ2hpbGROb2RlcyIsImNoaWxkcmVuIiwiX3JlbmRlcmVkQ2hpbGRyZW4iLCJjaGlsZE5vZGUiLCJmaXJzdENoaWxkIiwib3V0ZXIiLCJuYW1lIiwiaGFzT3duUHJvcGVydHkiLCJjaGlsZEluc3QiLCJjaGlsZElEIiwiX2RvbUlEIiwibmV4dFNpYmxpbmciLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJnZXRDbG9zZXN0SW5zdGFuY2VGcm9tTm9kZSIsInBhcmVudHMiLCJwdXNoIiwicGFyZW50Tm9kZSIsImNsb3Nlc3QiLCJwb3AiLCJsZW5ndGgiLCJnZXRJbnN0YW5jZUZyb21Ob2RlIiwiZ2V0Tm9kZUZyb21JbnN0YW5jZSIsInVuZGVmaW5lZCIsIl9ob3N0UGFyZW50IiwiUmVhY3RET01Db21wb25lbnRUcmVlIiwibW9kdWxlIiwi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N0IsRUFBbUM7QUFDakM7QUFDQTtBQUNBLElBQUVBLEtBQUtFLFNBQUwsS0FBbUI0QixTQUFyQixJQUFrQ1osUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDekMsVUFBVSxLQUFWLEVBQWlCLHdDQUFqQixDQUF4QyxHQUFxR0osZUFBZSxJQUFmLENBQXZJLEdBQThKLEtBQUssQ0FBbks7O0FBRUEsTUFBSXlCLEtBQUtFLFNBQVQsRUFBb0I7QUFDbEIsV0FBT0YsS0FBS0UsU0FBWjtBQUNEOztBQUVEO0FBQ0EsTUFBSW9CLFVBQVUsRUFBZDtBQUNBLFNBQU8sQ0FBQ3RCLEtBQUtFLFNBQWIsRUFBd0I7QUFDdEJvQixZQUFRQyxJQUFSLENBQWF2QixJQUFiO0FBQ0EsS0FBQ0EsS0FBSytCLFdBQU4sR0FBb0JiLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixHQUF3Q3pDLFVBQVUsS0FBVixFQUFpQiwwREFBakIsQ0FBeEMsR0FBdUhKLGVBQWUsSUFBZixDQUEzSSxHQUFrSyxLQUFLLENBQXZLO0FBQ0F5QixXQUFPQSxLQUFLK0IsV0FBWjtBQUNEOztBQUVEO0FBQ0E7QUFDQSxTQUFPVCxRQUFRSyxNQUFmLEVBQXVCM0IsT0FBT3NCLFFBQVFJLEdBQVIsRUFBOUIsRUFBNkM7QUFDM0N0Qix1QkFBbUJKLElBQW5CLEVBQXlCQSxLQUFLRSxTQUE5QjtBQUNEOztBQUVELFNBQU9GLEtBQUtFLFNBQVo7QUFDRDs7QUFFRCxJQUFJOEIsd0JBQXdCO0FBQzFCWCw4QkFBNEJBLDBCQURGO0FBRTFCTyx1QkFBcUJBLG1CQUZLO0FBRzFCQyx1QkFBcUJBLG1CQUhLO0FBSTFCekIsc0JBQW9CQSxrQkFKTTtBQUsxQkwsZ0JBQWNBLFlBTFk7QUFNMUJJLGVBQWFBO0FBTmEsQ0FBNUI7O0FBU0E4QixPQUFPQyxPQUFQLEdBQWlCRixxQkFBakIiLCJmaWxlIjoiUmVhY3RET01Db21wb25lbnRUcmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIERPTVByb3BlcnR5ID0gcmVxdWlyZSgnLi9ET01Qcm9wZXJ0eScpO1xudmFyIFJlYWN0RE9NQ29tcG9uZW50RmxhZ3MgPSByZXF1aXJlKCcuL1JlYWN0RE9NQ29tcG9uZW50RmxhZ3MnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgQVRUUl9OQU1FID0gRE9NUHJvcGVydHkuSURfQVRUUklCVVRFX05BTUU7XG52YXIgRmxhZ3MgPSBSZWFjdERPTUNvbXBvbmVudEZsYWdzO1xuXG52YXIgaW50ZXJuYWxJbnN0YW5jZUtleSA9ICdfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSQnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBnaXZlbiBub2RlIHNob3VsZCBiZSBjYWNoZWQuXG4gKi9cbmZ1bmN0aW9uIHNob3VsZFByZWNhY2hlTm9kZShub2RlLCBub2RlSUQpIHtcbiAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoQVRUUl9OQU1FKSA9PT0gU3RyaW5nKG5vZGVJRCkgfHwgbm9kZS5ub2RlVHlwZSA9PT0gOCAmJiBub2RlLm5vZGVWYWx1ZSA9PT0gJyByZWFjdC10ZXh0OiAnICsgbm9kZUlEICsgJyAnIHx8IG5vZGUubm9kZVR5cGUgPT09IDggJiYgbm9kZS5ub2RlVmFsdWUgPT09ICcgcmVhY3QtZW1wdHk6ICcgKyBub2RlSUQgKyAnICc7XG59XG5cbi8qKlxuICogRHJpbGwgZG93biAodGhyb3VnaCBjb21wb3NpdGVzIGFuZCBlbXB0eSBjb21wb25lbnRzKSB1bnRpbCB3ZSBnZXQgYSBob3N0IG9yXG4gKiBob3N0IHRleHQgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgaXMgcHJldHR5IHBvbHltb3JwaGljIGJ1dCB1bmF2b2lkYWJsZSB3aXRoIHRoZSBjdXJyZW50IHN0cnVjdHVyZSB3ZSBoYXZlXG4gKiBmb3IgYF9yZW5kZXJlZENoaWxkcmVuYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmVuZGVyZWRIb3N0T3JUZXh0RnJvbUNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgdmFyIHJlbmRlcmVkO1xuICB3aGlsZSAocmVuZGVyZWQgPSBjb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50KSB7XG4gICAgY29tcG9uZW50ID0gcmVuZGVyZWQ7XG4gIH1cbiAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuLyoqXG4gKiBQb3B1bGF0ZSBgX2hvc3ROb2RlYCBvbiB0aGUgcmVuZGVyZWQgaG9zdC90ZXh0IGNvbXBvbmVudCB3aXRoIHRoZSBnaXZlblxuICogRE9NIG5vZGUuIFRoZSBwYXNzZWQgYGluc3RgIGNhbiBiZSBhIGNvbXBvc2l0ZS5cbiAqL1xuZnVuY3Rpb24gcHJlY2FjaGVOb2RlKGluc3QsIG5vZGUpIHtcbiAgdmFyIGhvc3RJbnN0ID0gZ2V0UmVuZGVyZWRIb3N0T3JUZXh0RnJvbUNvbXBvbmVudChpbnN0KTtcbiAgaG9zdEluc3QuX2hvc3ROb2RlID0gbm9kZTtcbiAgbm9kZVtpbnRlcm5hbEluc3RhbmNlS2V5XSA9IGhvc3RJbnN0O1xufVxuXG5mdW5jdGlvbiB1bmNhY2hlTm9kZShpbnN0KSB7XG4gIHZhciBub2RlID0gaW5zdC5faG9zdE5vZGU7XG4gIGlmIChub2RlKSB7XG4gICAgZGVsZXRlIG5vZGVbaW50ZXJuYWxJbnN0YW5jZUtleV07XG4gICAgaW5zdC5faG9zdE5vZGUgPSBudWxsO1xuICB9XG59XG5cbi8qKlxuICogUG9wdWxhdGUgYF9ob3N0Tm9kZWAgb24gZWFjaCBjaGlsZCBvZiBgaW5zdGAsIGFzc3VtaW5nIHRoYXQgdGhlIGNoaWxkcmVuXG4gKiBtYXRjaCB1cCB3aXRoIHRoZSBET00gKGVsZW1lbnQpIGNoaWxkcmVuIG9mIGBub2RlYC5cbiAqXG4gKiBXZSBjYWNoZSBlbnRpcmUgbGV2ZWxzIGF0IG9uY2UgdG8gYXZvaWQgYW4gbl4yIHByb2JsZW0gd2hlcmUgd2UgYWNjZXNzIHRoZVxuICogY2hpbGRyZW4gb2YgYSBub2RlIHNlcXVlbnRpYWxseSBhbmQgaGF2ZSB0byB3YWxrIGZyb20gdGhlIHN0YXJ0IHRvIG91ciB0YXJnZXRcbiAqIG5vZGUgZXZlcnkgdGltZS5cbiAqXG4gKiBTaW5jZSB3ZSB1cGRhdGUgYF9yZW5kZXJlZENoaWxkcmVuYCBhbmQgdGhlIGFjdHVhbCBET00gYXQgKHNsaWdodGx5KVxuICogZGlmZmVyZW50IHRpbWVzLCB3ZSBjb3VsZCByYWNlIGhlcmUgYW5kIHNlZSBhIG5ld2VyIGBfcmVuZGVyZWRDaGlsZHJlbmAgdGhhblxuICogdGhlIERPTSBub2RlcyB3ZSBzZWUuIFRvIGF2b2lkIHRoaXMsIFJlYWN0TXVsdGlDaGlsZCBjYWxsc1xuICogYHByZXBhcmVUb01hbmFnZUNoaWxkcmVuYCBiZWZvcmUgd2UgY2hhbmdlIGBfcmVuZGVyZWRDaGlsZHJlbmAsIGF0IHdoaWNoXG4gKiB0aW1lIHRoZSBjb250YWluZXIncyBjaGlsZCBub2RlcyBhcmUgYWx3YXlzIGNhY2hlZCAodW50aWwgaXQgdW5tb3VudHMpLlxuICovXG5mdW5jdGlvbiBwcmVjYWNoZUNoaWxkTm9kZXMoaW5zdCwgbm9kZSkge1xuICBpZiAoaW5zdC5fZmxhZ3MgJiBGbGFncy5oYXNDYWNoZWRDaGlsZE5vZGVzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjaGlsZHJlbiA9IGluc3QuX3JlbmRlcmVkQ2hpbGRyZW47XG4gIHZhciBjaGlsZE5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gIG91dGVyOiBmb3IgKHZhciBuYW1lIGluIGNoaWxkcmVuKSB7XG4gICAgaWYgKCFjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBjaGlsZEluc3QgPSBjaGlsZHJlbltuYW1lXTtcbiAgICB2YXIgY2hpbGRJRCA9IGdldFJlbmRlcmVkSG9zdE9yVGV4dEZyb21Db21wb25lbnQoY2hpbGRJbnN0KS5fZG9tSUQ7XG4gICAgaWYgKGNoaWxkSUQgPT09IDApIHtcbiAgICAgIC8vIFdlJ3JlIGN1cnJlbnRseSB1bm1vdW50aW5nIHRoaXMgY2hpbGQgaW4gUmVhY3RNdWx0aUNoaWxkOyBza2lwIGl0LlxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIFdlIGFzc3VtZSB0aGUgY2hpbGQgbm9kZXMgYXJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBjaGlsZCBpbnN0YW5jZXMuXG4gICAgZm9yICg7IGNoaWxkTm9kZSAhPT0gbnVsbDsgY2hpbGROb2RlID0gY2hpbGROb2RlLm5leHRTaWJsaW5nKSB7XG4gICAgICBpZiAoc2hvdWxkUHJlY2FjaGVOb2RlKGNoaWxkTm9kZSwgY2hpbGRJRCkpIHtcbiAgICAgICAgcHJlY2FjaGVOb2RlKGNoaWxkSW5zdCwgY2hpbGROb2RlKTtcbiAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFdlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgRE9NIGNoaWxkcmVuIHdpdGhvdXQgZmluZGluZyBhbiBJRCBtYXRjaC5cbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVW5hYmxlIHRvIGZpbmQgZWxlbWVudCB3aXRoIElEICVzLicsIGNoaWxkSUQpIDogX3Byb2RJbnZhcmlhbnQoJzMyJywgY2hpbGRJRCkgOiB2b2lkIDA7XG4gIH1cbiAgaW5zdC5fZmxhZ3MgfD0gRmxhZ3MuaGFzQ2FjaGVkQ2hpbGROb2Rlcztcbn1cblxuLyoqXG4gKiBHaXZlbiBhIERPTSBub2RlLCByZXR1cm4gdGhlIGNsb3Nlc3QgUmVhY3RET01Db21wb25lbnQgb3JcbiAqIFJlYWN0RE9NVGV4dENvbXBvbmVudCBpbnN0YW5jZSBhbmNlc3Rvci5cbiAqL1xuZnVuY3Rpb24gZ2V0Q2xvc2VzdEluc3RhbmNlRnJvbU5vZGUobm9kZSkge1xuICBpZiAobm9kZVtpbnRlcm5hbEluc3RhbmNlS2V5XSkge1xuICAgIHJldHVybiBub2RlW2ludGVybmFsSW5zdGFuY2VLZXldO1xuICB9XG5cbiAgLy8gV2FsayB1cCB0aGUgdHJlZSB1bnRpbCB3ZSBmaW5kIGFuIGFuY2VzdG9yIHdob3NlIGluc3RhbmNlIHdlIGhhdmUgY2FjaGVkLlxuICB2YXIgcGFyZW50cyA9IFtdO1xuICB3aGlsZSAoIW5vZGVbaW50ZXJuYWxJbnN0YW5jZUtleV0pIHtcbiAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVG9wIG9mIHRoZSB0cmVlLiBUaGlzIG5vZGUgbXVzdCBub3QgYmUgcGFydCBvZiBhIFJlYWN0IHRyZWUgKG9yIGlzXG4gICAgICAvLyB1bm1vdW50ZWQsIHBvdGVudGlhbGx5KS5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjbG9zZXN0O1xuICB2YXIgaW5zdDtcbiAgZm9yICg7IG5vZGUgJiYgKGluc3QgPSBub2RlW2ludGVybmFsSW5zdGFuY2VLZXldKTsgbm9kZSA9IHBhcmVudHMucG9wKCkpIHtcbiAgICBjbG9zZXN0ID0gaW5zdDtcbiAgICBpZiAocGFyZW50cy5sZW5ndGgpIHtcbiAgICAgIHByZWNhY2hlQ2hpbGROb2RlcyhpbnN0LCBub2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xvc2VzdDtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIERPTSBub2RlLCByZXR1cm4gdGhlIFJlYWN0RE9NQ29tcG9uZW50IG9yIFJlYWN0RE9NVGV4dENvbXBvbmVudFxuICogaW5zdGFuY2UsIG9yIG51bGwgaWYgdGhlIG5vZGUgd2FzIG5vdCByZW5kZXJlZCBieSB0aGlzIFJlYWN0LlxuICovXG5mdW5jdGlvbiBnZXRJbnN0YW5jZUZyb21Ob2RlKG5vZGUpIHtcbiAgdmFyIGluc3QgPSBnZXRDbG9zZXN0SW5zdGFuY2VGcm9tTm9kZShub2RlKTtcbiAgaWYgKGluc3QgIT0gbnVsbCAmJiBpbnN0Ll9ob3N0Tm9kZSA9PT0gbm9kZSkge1xuICAgIHJldHVybiBpbnN0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYSBSZWFjdERPTUNvbXBvbmVudCBvciBSZWFjdERPTVRleHRDb21wb25lbnQsIHJldHVybiB0aGUgY29ycmVzcG9uZGluZ1xuICogRE9NIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGdldE5vZGVGcm9tSW5zdGFuY2UoaW5zdCkge1xuICAvLyBXaXRob3V0IHRoaXMgZmlyc3QgaW52YXJpYW50LCBwYXNzaW5nIGEgbm9uLURPTS1jb21wb25lbnQgdHJpZ2dlcnMgdGhlIG5leHRcbiAgLy8gaW52YXJpYW50IGZvciBhIG1pc3NpbmcgcGFyZW50LCB3aGljaCBpcyBzdXBlciBjb25mdXNpbmcuXG4gICEoaW5zdC5faG9zdE5vZGUgIT09IHVuZGVmaW5lZCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnZ2V0Tm9kZUZyb21JbnN0YW5jZTogSW52YWxpZCBhcmd1bWVudC4nKSA6IF9wcm9kSW52YXJpYW50KCczMycpIDogdm9pZCAwO1xuXG4gIGlmIChpbnN0Ll9ob3N0Tm9kZSkge1xuICAgIHJldHVybiBpbnN0Ll9ob3N0Tm9kZTtcbiAgfVxuXG4gIC8vIFdhbGsgdXAgdGhlIHRyZWUgdW50aWwgd2UgZmluZCBhbiBhbmNlc3RvciB3aG9zZSBET00gbm9kZSB3ZSBoYXZlIGNhY2hlZC5cbiAgdmFyIHBhcmVudHMgPSBbXTtcbiAgd2hpbGUgKCFpbnN0Ll9ob3N0Tm9kZSkge1xuICAgIHBhcmVudHMucHVzaChpbnN0KTtcbiAgICAhaW5zdC5faG9zdFBhcmVudCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdCBET00gdHJlZSByb290IHNob3VsZCBhbHdheXMgaGF2ZSBhIG5vZGUgcmVmZXJlbmNlLicpIDogX3Byb2RJbnZhcmlhbnQoJzM0JykgOiB2b2lkIDA7XG4gICAgaW5zdCA9IGluc3QuX2hvc3RQYXJlbnQ7XG4gIH1cblxuICAvLyBOb3cgcGFyZW50cyBjb250YWlucyBlYWNoIGFuY2VzdG9yIHRoYXQgZG9lcyAqbm90KiBoYXZlIGEgY2FjaGVkIG5hdGl2ZVxuICAvLyBub2RlLCBhbmQgYGluc3RgIGlzIHRoZSBkZWVwZXN0IGFuY2VzdG9yIHRoYXQgZG9lcy5cbiAgZm9yICg7IHBhcmVudHMubGVuZ3RoOyBpbnN0ID0gcGFyZW50cy5wb3AoKSkge1xuICAgIHByZWNhY2hlQ2hpbGROb2RlcyhpbnN0LCBpbnN0Ll9ob3N0Tm9kZSk7XG4gIH1cblxuICByZXR1cm4gaW5zdC5faG9zdE5vZGU7XG59XG5cbnZhciBSZWFjdERPTUNvbXBvbmVudFRyZWUgPSB7XG4gIGdldENsb3Nlc3RJbnN0YW5jZUZyb21Ob2RlOiBnZXRDbG9zZXN0SW5zdGFuY2VGcm9tTm9kZSxcbiAgZ2V0SW5zdGFuY2VGcm9tTm9kZTogZ2V0SW5zdGFuY2VGcm9tTm9kZSxcbiAgZ2V0Tm9kZUZyb21JbnN0YW5jZTogZ2V0Tm9kZUZyb21JbnN0YW5jZSxcbiAgcHJlY2FjaGVDaGlsZE5vZGVzOiBwcmVjYWNoZUNoaWxkTm9kZXMsXG4gIHByZWNhY2hlTm9kZTogcHJlY2FjaGVOb2RlLFxuICB1bmNhY2hlTm9kZTogdW5jYWNoZU5vZGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01Db21wb25lbnRUcmVlOyJdfQ==