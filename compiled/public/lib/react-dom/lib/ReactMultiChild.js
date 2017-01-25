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

var ReactComponentEnvironment = require('./ReactComponentEnvironment');
var ReactInstanceMap = require('./ReactInstanceMap');
var ReactInstrumentation = require('./ReactInstrumentation');

var ReactCurrentOwner = require('react/lib/ReactCurrentOwner');
var ReactReconciler = require('./ReactReconciler');
var ReactChildReconciler = require('./ReactChildReconciler');

var emptyFunction = require('fbjs/lib/emptyFunction');
var flattenChildren = require('./flattenChildren');
var invariant = require('fbjs/lib/invariant');

/**
 * Make an update for markup to be rendered and inserted at a supplied index.
 *
 * @param {string} markup Markup that renders into an element.
 * @param {number} toIndex Destination index.
 * @private
 */
function makeInsertMarkup(markup, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'INSERT_MARKUP',
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for moving an existing element to another index.
 *
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */
function makeMove(child, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'MOVE_EXISTING',
    content: null,
    fromIndex: child._mountIndex,
    fromNode: ReactReconciler.getHostNode(child),
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for removing an element at an index.
 *
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */
function makeRemove(child, node) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'REMOVE_NODE',
    content: null,
    fromIndex: child._mountIndex,
    fromNode: node,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the markup of a node.
 *
 * @param {string} markup Markup that renders into an element.
 * @private
 */
function makeSetMarkup(markup) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'SET_MARKUP',
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the text content.
 *
 * @param {string} textContent Text content to set.
 * @private
 */
function makeTextContent(textContent) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'TEXT_CONTENT',
    content: textContent,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Push an update, if any, onto the queue. Creates a new queue if none is
 * passed and always returns the queue. Mutative.
 */
function enqueue(queue, update) {
  if (update) {
    queue = queue || [];
    queue.push(update);
  }
  return queue;
}

/**
 * Processes any enqueued updates.
 *
 * @private
 */
function processQueue(inst, updateQueue) {
  ReactComponentEnvironment.processChildrenUpdates(inst, updateQueue);
}

var setChildrenForInstrumentation = emptyFunction;
if (process.env.NODE_ENV !== 'production') {
  var getDebugID = function getDebugID(inst) {
    if (!inst._debugID) {
      // Check for ART-like instances. TODO: This is silly/gross.
      var internal;
      if (internal = ReactInstanceMap.get(inst)) {
        inst = internal;
      }
    }
    return inst._debugID;
  };
  setChildrenForInstrumentation = function setChildrenForInstrumentation(children) {
    var debugID = getDebugID(this);
    // TODO: React Native empty components are also multichild.
    // This means they still get into this method but don't have _debugID.
    if (debugID !== 0) {
      ReactInstrumentation.debugTool.onSetChildren(debugID, children ? Object.keys(children).map(function (key) {
        return children[key]._debugID;
      }) : []);
    }
  };
}

/**
 * ReactMultiChild are capable of reconciling multiple children.
 *
 * @class ReactMultiChild
 * @internal
 */
var ReactMultiChild = {

  /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */
  Mixin: {

    _reconcilerInstantiateChildren: function _reconcilerInstantiateChildren(nestedChildren, transaction, context) {
      if (process.env.NODE_ENV !== 'production') {
        var selfDebugID = getDebugID(this);
        if (this._currentElement) {
          try {
            ReactCurrentOwner.current = this._currentElement._owner;
            return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context, selfDebugID);
          } finally {
            ReactCurrentOwner.current = null;
          }
        }
      }
      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
    },

    _reconcilerUpdateChildren: function _reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context) {
      var nextChildren;
      var selfDebugID = 0;
      if (process.env.NODE_ENV !== 'production') {
        selfDebugID = getDebugID(this);
        if (this._currentElement) {
          try {
            ReactCurrentOwner.current = this._currentElement._owner;
            nextChildren = flattenChildren(nextNestedChildrenElements, selfDebugID);
          } finally {
            ReactCurrentOwner.current = null;
          }
          ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
          return nextChildren;
        }
      }
      nextChildren = flattenChildren(nextNestedChildrenElements, selfDebugID);
      ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
      return nextChildren;
    },

    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */
    mountChildren: function mountChildren(nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;

      var mountImages = [];
      var index = 0;
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          var selfDebugID = 0;
          if (process.env.NODE_ENV !== 'production') {
            selfDebugID = getDebugID(this);
          }
          var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._hostContainerInfo, context, selfDebugID);
          child._mountIndex = index++;
          mountImages.push(mountImage);
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        setChildrenForInstrumentation.call(this, children);
      }

      return mountImages;
    },

    /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */
    updateTextContent: function updateTextContent(nextContent) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
          !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
        }
      }
      // Set new text content.
      var updates = [makeTextContent(nextContent)];
      processQueue(this, updates);
    },

    /**
     * Replaces any rendered children with a markup string.
     *
     * @param {string} nextMarkup String of markup.
     * @internal
     */
    updateMarkup: function updateMarkup(nextMarkup) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
          !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
        }
      }
      var updates = [makeSetMarkup(nextMarkup)];
      processQueue(this, updates);
    },

    /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    updateChildren: function updateChildren(nextNestedChildrenElements, transaction, context) {
      // Hook used by React ART
      this._updateChildren(nextNestedChildrenElements, transaction, context);
    },

    /**
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */
    _updateChildren: function _updateChildren(nextNestedChildrenElements, transaction, context) {
      var prevChildren = this._renderedChildren;
      var removedNodes = {};
      var mountImages = [];
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context);
      if (!nextChildren && !prevChildren) {
        return;
      }
      var updates = null;
      var name;
      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var nextIndex = 0;
      var lastIndex = 0;
      // `nextMountIndex` will increment for each newly mounted child.
      var nextMountIndex = 0;
      var lastPlacedNode = null;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (prevChild === nextChild) {
          updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            // The `removedNodes` loop below will actually remove the child.
          }
          // The child must be instantiated before it's mounted.
          updates = enqueue(updates, this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], lastPlacedNode, nextIndex, transaction, context));
          nextMountIndex++;
        }
        nextIndex++;
        lastPlacedNode = ReactReconciler.getHostNode(nextChild);
      }
      // Remove children that are no longer present.
      for (name in removedNodes) {
        if (removedNodes.hasOwnProperty(name)) {
          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
        }
      }
      if (updates) {
        processQueue(this, updates);
      }
      this._renderedChildren = nextChildren;

      if (process.env.NODE_ENV !== 'production') {
        setChildrenForInstrumentation.call(this, nextChildren);
      }
    },

    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted. It does not actually perform any
     * backend operations.
     *
     * @internal
     */
    unmountChildren: function unmountChildren(safely) {
      var renderedChildren = this._renderedChildren;
      ReactChildReconciler.unmountChildren(renderedChildren, safely);
      this._renderedChildren = null;
    },

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild: function moveChild(child, afterNode, toIndex, lastIndex) {
      // If the index of `child` is less than `lastIndex`, then it needs to
      // be moved. Otherwise, we do not need to move it because a child will be
      // inserted or moved before `child`.
      if (child._mountIndex < lastIndex) {
        return makeMove(child, afterNode, toIndex);
      }
    },

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {string} mountImage Markup to insert.
     * @protected
     */
    createChild: function createChild(child, afterNode, mountImage) {
      return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
    },

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild: function removeChild(child, node) {
      return makeRemove(child, node);
    },

    /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */
    _mountChildAtIndex: function _mountChildAtIndex(child, mountImage, afterNode, index, transaction, context) {
      child._mountIndex = index;
      return this.createChild(child, afterNode, mountImage);
    },

    /**
     * Unmounts a rendered child.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @private
     */
    _unmountChild: function _unmountChild(child, node) {
      var update = this.removeChild(child, node);
      child._mountIndex = null;
      return update;
    }

  }

};

module.exports = ReactMultiChild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdE11bHRpQ2hpbGQuanMiXSwibmFtZXMiOlsiX3Byb2RJbnZhcmlhbnQiLCJyZXF1aXJlIiwiUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCIsIlJlYWN0SW5zdGFuY2VNYXAiLCJSZWFjdEluc3RydW1lbnRhdGlvbiIsIlJlYWN0Q3VycmVudE93bmVyIiwiUmVhY3RSZWNvbmNpbGVyIiwiUmVhY3RDaGlsZFJlY29uY2lsZXIiLCJlbXB0eUZ1bmN0aW9uIiwiZmxhdHRlbkNoaWxkcmVuIiwiaW52YXJpYW50IiwibWFrZUluc2VydE1hcmt1cCIsIm1hcmt1cCIsImFmdGVyTm9kZSIsInRvSW5kZXgiLCJ0eXBlIiwiY29udGVudCIsImZyb21JbmRleCIsImZyb21Ob2RlIiwibWFrZU1vdmUiLCJjaGlsZCIsIl9tb3VudEluZGV4IiwiZ2V0SG9zdE5vZGUiLCJtYWtlUmVtb3ZlIiwibm9kZSIsIm1ha2VTZXRNYXJrdXAiLCJtYWtlVGV4dENvbnRlbnQiLCJ0ZXh0Q29udGVudCIsImVucXVldWUiLCJxdWV1ZSIsInVwZGF0ZSIsInB1c2giLCJwcm9jZXNzUXVldWUiLCJpbnN0IiwidXBkYXRlUXVldWUiLCJwcm9jZXNzQ2hpbGRyZW5VcGRhdGVzIiwic2V0Q2hpbGRyZW5Gb3JJbnN0cnVtZW50YXRpb24iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJnZXREZWJ1Z0lEIiwiX2RlYnVnSUQiLCJpbnRlcm5hbCIsImdldCIsImNoaWxkcmVuIiwiZGVidWdJRCIsImRlYnVnVG9vbCIsIm9uU2V0Q2hpbGRyZW4iLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwiUmVhY3RNdWx0aUNoaWxkIiwiTWl4aW4iLCJfcmVjb25jaWxlckluc3RhbnRpYXRlQ2hpbGRyZW4iLCJuZXN0ZWRDaGlsZHJlbiIsInRyYW5zYWN0aW9uIiwiY29udGV4dCIsInNlbGZEZWJ1Z0lEIiwiX2N1cnJlbnRFbGVtZW50IiwiY3VycmVudCIsIl9vd25lciIsImluc3RhbnRpYXRlQ2hpbGRyZW4iLCJfcmVjb25jaWxlclVwZGF0ZUNoaWxkcmVuIiwicHJldkNoaWxkcmVuIiwibmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMiLCJtb3VudEltYWdlcyIsInJlbW92ZWROb2RlcyIsIm5leHRDaGlsZHJlbiIsInVwZGF0ZUNoaWxkcmVuIiwiX2hvc3RDb250YWluZXJJbmZvIiwibW91bnRDaGlsZHJlbiIsIl9yZW5kZXJlZENoaWxkcmVuIiwiaW5kZXgiLCJuYW1lIiwiaGFzT3duUHJvcGVydHkiLCJtb3VudEltYWdlIiwibW91bnRDb21wb25lbnQiLCJjYWxsIiwidXBkYXRlVGV4dENvbnRlbnQiLCJuZXh0Q29udGVudCIsInVubW91bnRDaGlsZHJlbiIsInVwZGF0ZXMiLCJ1cGRhdGVNYXJrdXAiLCJuZXh0TWFya3VwIiwiX3VwZGF0ZUNoaWxkcmVuIiwibmV4dEluZGV4IiwibGFzdEluZGV4IiwibmV4dE1vdW50SW5kZXgiLCJsYXN0UGxhY2VkTm9kZSIsInByZXZDaGlsZCIsIm5leHRDaGlsZCIsIm1vdmVDaGlsZCIsIk1hdGgiLCJtYXgiLCJfbW91bnRDaGlsZEF0SW5kZXgiLCJfdW5tb3VudENoaWxkIiwic2FmZWx5IiwicmVuZGVyZWRDaGlsZHJlbiIsImNyZWF0ZUNoaWxkIiwicmVtb3ZlQ2hpbGQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLGlCQUFpQkMsUUFBUSxzQkFBUixDQUFyQjs7QUFFQSxJQUFJQyw0QkFBNEJELFFBQVEsNkJBQVIsQ0FBaEM7QUFDQSxJQUFJRSxtQkFBbUJGLFFBQVEsb0JBQVIsQ0FBdkI7QUFDQSxJQUFJRyx1QkFBdUJILFFBQVEsd0JBQVIsQ0FBM0I7O0FBRUEsSUFBSUksb0JBQW9CSixRQUFRLDZCQUFSLENBQXhCO0FBQ0EsSUFBSUssa0JBQWtCTCxRQUFRLG1CQUFSLENBQXRCO0FBQ0EsSUFBSU0sdUJB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LGlCQUFpQmlFLFVBQWpCLEVBQTZCL0QsU0FBN0IsRUFBd0NPLE1BQU1DLFdBQTlDLENBQVA7QUFDRCxLQWhPSTs7QUFrT0w7Ozs7OztBQU1BK0UsaUJBQWEscUJBQVVoRixLQUFWLEVBQWlCSSxJQUFqQixFQUF1QjtBQUNsQyxhQUFPRCxXQUFXSCxLQUFYLEVBQWtCSSxJQUFsQixDQUFQO0FBQ0QsS0ExT0k7O0FBNE9MOzs7Ozs7Ozs7OztBQVdBdUUsd0JBQW9CLDRCQUFVM0UsS0FBVixFQUFpQndELFVBQWpCLEVBQTZCL0QsU0FBN0IsRUFBd0M0RCxLQUF4QyxFQUErQ2pCLFdBQS9DLEVBQTREQyxPQUE1RCxFQUFxRTtBQUN2RnJDLFlBQU1DLFdBQU4sR0FBb0JvRCxLQUFwQjtBQUNBLGFBQU8sS0FBSzBCLFdBQUwsQ0FBaUIvRSxLQUFqQixFQUF3QlAsU0FBeEIsRUFBbUMrRCxVQUFuQyxDQUFQO0FBQ0QsS0ExUEk7O0FBNFBMOzs7Ozs7OztBQVFBb0IsbUJBQWUsdUJBQVU1RSxLQUFWLEVBQWlCSSxJQUFqQixFQUF1QjtBQUNwQyxVQUFJTSxTQUFTLEtBQUtzRSxXQUFMLENBQWlCaEYsS0FBakIsRUFBd0JJLElBQXhCLENBQWI7QUFDQUosWUFBTUMsV0FBTixHQUFvQixJQUFwQjtBQUNBLGFBQU9TLE1BQVA7QUFDRDs7QUF4UUk7O0FBVGEsQ0FBdEI7O0FBdVJBdUUsT0FBT0MsT0FBUCxHQUFpQmxELGVBQWpCIiwiZmlsZSI6IlJlYWN0TXVsdGlDaGlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG52YXIgUmVhY3RJbnN0YW5jZU1hcCA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0YW5jZU1hcCcpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0Q2hpbGRSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdENoaWxkUmVjb25jaWxlcicpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBmbGF0dGVuQ2hpbGRyZW4gPSByZXF1aXJlKCcuL2ZsYXR0ZW5DaGlsZHJlbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBtYXJrdXAgdG8gYmUgcmVuZGVyZWQgYW5kIGluc2VydGVkIGF0IGEgc3VwcGxpZWQgaW5kZXguXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1hcmt1cCBNYXJrdXAgdGhhdCByZW5kZXJzIGludG8gYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b0luZGV4IERlc3RpbmF0aW9uIGluZGV4LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZUluc2VydE1hcmt1cChtYXJrdXAsIGFmdGVyTm9kZSwgdG9JbmRleCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0lOU0VSVF9NQVJLVVAnLFxuICAgIGNvbnRlbnQ6IG1hcmt1cCxcbiAgICBmcm9tSW5kZXg6IG51bGwsXG4gICAgZnJvbU5vZGU6IG51bGwsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICBhZnRlck5vZGU6IGFmdGVyTm9kZVxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBtb3ZpbmcgYW4gZXhpc3RpbmcgZWxlbWVudCB0byBhbm90aGVyIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggU291cmNlIGluZGV4IG9mIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHRvSW5kZXggRGVzdGluYXRpb24gaW5kZXggb2YgdGhlIGVsZW1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlTW92ZShjaGlsZCwgYWZ0ZXJOb2RlLCB0b0luZGV4KSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnTU9WRV9FWElTVElORycsXG4gICAgY29udGVudDogbnVsbCxcbiAgICBmcm9tSW5kZXg6IGNoaWxkLl9tb3VudEluZGV4LFxuICAgIGZyb21Ob2RlOiBSZWFjdFJlY29uY2lsZXIuZ2V0SG9zdE5vZGUoY2hpbGQpLFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgYWZ0ZXJOb2RlOiBhZnRlck5vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3IgcmVtb3ZpbmcgYW4gZWxlbWVudCBhdCBhbiBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IEluZGV4IG9mIHRoZSBlbGVtZW50IHRvIHJlbW92ZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VSZW1vdmUoY2hpbGQsIG5vZGUpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdSRU1PVkVfTk9ERScsXG4gICAgY29udGVudDogbnVsbCxcbiAgICBmcm9tSW5kZXg6IGNoaWxkLl9tb3VudEluZGV4LFxuICAgIGZyb21Ob2RlOiBub2RlLFxuICAgIHRvSW5kZXg6IG51bGwsXG4gICAgYWZ0ZXJOb2RlOiBudWxsXG4gIH07XG59XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIHNldHRpbmcgdGhlIG1hcmt1cCBvZiBhIG5vZGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1hcmt1cCBNYXJrdXAgdGhhdCByZW5kZXJzIGludG8gYW4gZWxlbWVudC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VTZXRNYXJrdXAobWFya3VwKSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0VUX01BUktVUCcsXG4gICAgY29udGVudDogbWFya3VwLFxuICAgIGZyb21JbmRleDogbnVsbCxcbiAgICBmcm9tTm9kZTogbnVsbCxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBzZXR0aW5nIHRoZSB0ZXh0IGNvbnRlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRDb250ZW50IFRleHQgY29udGVudCB0byBzZXQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlVGV4dENvbnRlbnQodGV4dENvbnRlbnQpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdURVhUX0NPTlRFTlQnLFxuICAgIGNvbnRlbnQ6IHRleHRDb250ZW50LFxuICAgIGZyb21JbmRleDogbnVsbCxcbiAgICBmcm9tTm9kZTogbnVsbCxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIFB1c2ggYW4gdXBkYXRlLCBpZiBhbnksIG9udG8gdGhlIHF1ZXVlLiBDcmVhdGVzIGEgbmV3IHF1ZXVlIGlmIG5vbmUgaXNcbiAqIHBhc3NlZCBhbmQgYWx3YXlzIHJldHVybnMgdGhlIHF1ZXVlLiBNdXRhdGl2ZS5cbiAqL1xuZnVuY3Rpb24gZW5xdWV1ZShxdWV1ZSwgdXBkYXRlKSB7XG4gIGlmICh1cGRhdGUpIHtcbiAgICBxdWV1ZSA9IHF1ZXVlIHx8IFtdO1xuICAgIHF1ZXVlLnB1c2godXBkYXRlKTtcbiAgfVxuICByZXR1cm4gcXVldWU7XG59XG5cbi8qKlxuICogUHJvY2Vzc2VzIGFueSBlbnF1ZXVlZCB1cGRhdGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NRdWV1ZShpbnN0LCB1cGRhdGVRdWV1ZSkge1xuICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMoaW5zdCwgdXBkYXRlUXVldWUpO1xufVxuXG52YXIgc2V0Q2hpbGRyZW5Gb3JJbnN0cnVtZW50YXRpb24gPSBlbXB0eUZ1bmN0aW9uO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGdldERlYnVnSUQgPSBmdW5jdGlvbiAoaW5zdCkge1xuICAgIGlmICghaW5zdC5fZGVidWdJRCkge1xuICAgICAgLy8gQ2hlY2sgZm9yIEFSVC1saWtlIGluc3RhbmNlcy4gVE9ETzogVGhpcyBpcyBzaWxseS9ncm9zcy5cbiAgICAgIHZhciBpbnRlcm5hbDtcbiAgICAgIGlmIChpbnRlcm5hbCA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KGluc3QpKSB7XG4gICAgICAgIGluc3QgPSBpbnRlcm5hbDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluc3QuX2RlYnVnSUQ7XG4gIH07XG4gIHNldENoaWxkcmVuRm9ySW5zdHJ1bWVudGF0aW9uID0gZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgdmFyIGRlYnVnSUQgPSBnZXREZWJ1Z0lEKHRoaXMpO1xuICAgIC8vIFRPRE86IFJlYWN0IE5hdGl2ZSBlbXB0eSBjb21wb25lbnRzIGFyZSBhbHNvIG11bHRpY2hpbGQuXG4gICAgLy8gVGhpcyBtZWFucyB0aGV5IHN0aWxsIGdldCBpbnRvIHRoaXMgbWV0aG9kIGJ1dCBkb24ndCBoYXZlIF9kZWJ1Z0lELlxuICAgIGlmIChkZWJ1Z0lEICE9PSAwKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25TZXRDaGlsZHJlbihkZWJ1Z0lELCBjaGlsZHJlbiA/IE9iamVjdC5rZXlzKGNoaWxkcmVuKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5ba2V5XS5fZGVidWdJRDtcbiAgICAgIH0pIDogW10pO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBSZWFjdE11bHRpQ2hpbGQgYXJlIGNhcGFibGUgb2YgcmVjb25jaWxpbmcgbXVsdGlwbGUgY2hpbGRyZW4uXG4gKlxuICogQGNsYXNzIFJlYWN0TXVsdGlDaGlsZFxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdE11bHRpQ2hpbGQgPSB7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGNvbW1vbiBmdW5jdGlvbmFsaXR5IGZvciBjb21wb25lbnRzIHRoYXQgbXVzdCByZWNvbmNpbGUgbXVsdGlwbGVcbiAgICogY2hpbGRyZW4uIFRoaXMgaXMgdXNlZCBieSBgUmVhY3RET01Db21wb25lbnRgIHRvIG1vdW50LCB1cGRhdGUsIGFuZFxuICAgKiB1bm1vdW50IGNoaWxkIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBsZW5kcyB7UmVhY3RNdWx0aUNoaWxkLnByb3RvdHlwZX1cbiAgICovXG4gIE1peGluOiB7XG5cbiAgICBfcmVjb25jaWxlckluc3RhbnRpYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhciBzZWxmRGVidWdJRCA9IGdldERlYnVnSUQodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLmluc3RhbnRpYXRlQ2hpbGRyZW4obmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0LCBzZWxmRGVidWdJRCk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLmluc3RhbnRpYXRlQ2hpbGRyZW4obmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgX3JlY29uY2lsZXJVcGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKHByZXZDaGlsZHJlbiwgbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIG1vdW50SW1hZ2VzLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbmV4dENoaWxkcmVuO1xuICAgICAgdmFyIHNlbGZEZWJ1Z0lEID0gMDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHNlbGZEZWJ1Z0lEID0gZ2V0RGVidWdJRCh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5fb3duZXI7XG4gICAgICAgICAgICBuZXh0Q2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHNlbGZEZWJ1Z0lEKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVwZGF0ZUNoaWxkcmVuKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCBtb3VudEltYWdlcywgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgdGhpcywgdGhpcy5faG9zdENvbnRhaW5lckluZm8sIGNvbnRleHQsIHNlbGZEZWJ1Z0lEKTtcbiAgICAgICAgICByZXR1cm4gbmV4dENoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXh0Q2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHNlbGZEZWJ1Z0lEKTtcbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVwZGF0ZUNoaWxkcmVuKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCBtb3VudEltYWdlcywgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgdGhpcywgdGhpcy5faG9zdENvbnRhaW5lckluZm8sIGNvbnRleHQsIHNlbGZEZWJ1Z0lEKTtcbiAgICAgIHJldHVybiBuZXh0Q2hpbGRyZW47XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIFwibW91bnQgaW1hZ2VcIiBmb3IgZWFjaCBvZiB0aGUgc3VwcGxpZWQgY2hpbGRyZW4uIEluIHRoZSBjYXNlXG4gICAgICogb2YgYFJlYWN0RE9NQ29tcG9uZW50YCwgYSBtb3VudCBpbWFnZSBpcyBhIHN0cmluZyBvZiBtYXJrdXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5lc3RlZENoaWxkcmVuIE5lc3RlZCBjaGlsZCBtYXBzLlxuICAgICAqIEByZXR1cm4ge2FycmF5fSBBbiBhcnJheSBvZiBtb3VudGVkIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBtb3VudENoaWxkcmVuOiBmdW5jdGlvbiAobmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9yZWNvbmNpbGVySW5zdGFudGlhdGVDaGlsZHJlbihuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IGNoaWxkcmVuO1xuXG4gICAgICB2YXIgbW91bnRJbWFnZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIGNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW25hbWVdO1xuICAgICAgICAgIHZhciBzZWxmRGVidWdJRCA9IDA7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHNlbGZEZWJ1Z0lEID0gZ2V0RGVidWdJRCh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG1vdW50SW1hZ2UgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoY2hpbGQsIHRyYW5zYWN0aW9uLCB0aGlzLCB0aGlzLl9ob3N0Q29udGFpbmVySW5mbywgY29udGV4dCwgc2VsZkRlYnVnSUQpO1xuICAgICAgICAgIGNoaWxkLl9tb3VudEluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgICBtb3VudEltYWdlcy5wdXNoKG1vdW50SW1hZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHNldENoaWxkcmVuRm9ySW5zdHJ1bWVudGF0aW9uLmNhbGwodGhpcywgY2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW91bnRJbWFnZXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFueSByZW5kZXJlZCBjaGlsZHJlbiB3aXRoIGEgdGV4dCBjb250ZW50IHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXh0Q29udGVudCBTdHJpbmcgb2YgY29udGVudC5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB1cGRhdGVUZXh0Q29udGVudDogZnVuY3Rpb24gKG5leHRDb250ZW50KSB7XG4gICAgICB2YXIgcHJldkNoaWxkcmVuID0gdGhpcy5fcmVuZGVyZWRDaGlsZHJlbjtcbiAgICAgIC8vIFJlbW92ZSBhbnkgcmVuZGVyZWQgY2hpbGRyZW4uXG4gICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51bm1vdW50Q2hpbGRyZW4ocHJldkNoaWxkcmVuLCBmYWxzZSk7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHByZXZDaGlsZHJlbikge1xuICAgICAgICBpZiAocHJldkNoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZVRleHRDb250ZW50IGNhbGxlZCBvbiBub24tZW1wdHkgY29tcG9uZW50LicpIDogX3Byb2RJbnZhcmlhbnQoJzExOCcpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgbmV3IHRleHQgY29udGVudC5cbiAgICAgIHZhciB1cGRhdGVzID0gW21ha2VUZXh0Q29udGVudChuZXh0Q29udGVudCldO1xuICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbnkgcmVuZGVyZWQgY2hpbGRyZW4gd2l0aCBhIG1hcmt1cCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dE1hcmt1cCBTdHJpbmcgb2YgbWFya3VwLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVwZGF0ZU1hcmt1cDogZnVuY3Rpb24gKG5leHRNYXJrdXApIHtcbiAgICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgLy8gUmVtb3ZlIGFueSByZW5kZXJlZCBjaGlsZHJlbi5cbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVubW91bnRDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJldkNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlVGV4dENvbnRlbnQgY2FsbGVkIG9uIG5vbi1lbXB0eSBjb21wb25lbnQuJykgOiBfcHJvZEludmFyaWFudCgnMTE4JykgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciB1cGRhdGVzID0gW21ha2VTZXRNYXJrdXAobmV4dE1hcmt1cCldO1xuICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSByZW5kZXJlZCBjaGlsZHJlbiB3aXRoIG5ldyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMgTmVzdGVkIGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIC8vIEhvb2sgdXNlZCBieSBSZWFjdCBBUlRcbiAgICAgIHRoaXMuX3VwZGF0ZUNoaWxkcmVuKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMgTmVzdGVkIGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQGZpbmFsXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF91cGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICB2YXIgcmVtb3ZlZE5vZGVzID0ge307XG4gICAgICB2YXIgbW91bnRJbWFnZXMgPSBbXTtcbiAgICAgIHZhciBuZXh0Q2hpbGRyZW4gPSB0aGlzLl9yZWNvbmNpbGVyVXBkYXRlQ2hpbGRyZW4ocHJldkNoaWxkcmVuLCBuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgbW91bnRJbWFnZXMsIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4gJiYgIXByZXZDaGlsZHJlbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdXBkYXRlcyA9IG51bGw7XG4gICAgICB2YXIgbmFtZTtcbiAgICAgIC8vIGBuZXh0SW5kZXhgIHdpbGwgaW5jcmVtZW50IGZvciBlYWNoIGNoaWxkIGluIGBuZXh0Q2hpbGRyZW5gLCBidXRcbiAgICAgIC8vIGBsYXN0SW5kZXhgIHdpbGwgYmUgdGhlIGxhc3QgaW5kZXggdmlzaXRlZCBpbiBgcHJldkNoaWxkcmVuYC5cbiAgICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgICAgdmFyIGxhc3RJbmRleCA9IDA7XG4gICAgICAvLyBgbmV4dE1vdW50SW5kZXhgIHdpbGwgaW5jcmVtZW50IGZvciBlYWNoIG5ld2x5IG1vdW50ZWQgY2hpbGQuXG4gICAgICB2YXIgbmV4dE1vdW50SW5kZXggPSAwO1xuICAgICAgdmFyIGxhc3RQbGFjZWROb2RlID0gbnVsbDtcbiAgICAgIGZvciAobmFtZSBpbiBuZXh0Q2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldkNoaWxkID0gcHJldkNoaWxkcmVuICYmIHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IG5leHRDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgaWYgKHByZXZDaGlsZCA9PT0gbmV4dENoaWxkKSB7XG4gICAgICAgICAgdXBkYXRlcyA9IGVucXVldWUodXBkYXRlcywgdGhpcy5tb3ZlQ2hpbGQocHJldkNoaWxkLCBsYXN0UGxhY2VkTm9kZSwgbmV4dEluZGV4LCBsYXN0SW5kZXgpKTtcbiAgICAgICAgICBsYXN0SW5kZXggPSBNYXRoLm1heChwcmV2Q2hpbGQuX21vdW50SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgICAgcHJldkNoaWxkLl9tb3VudEluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcmV2Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBgbGFzdEluZGV4YCBiZWZvcmUgYF9tb3VudEluZGV4YCBnZXRzIHVuc2V0IGJ5IHVubW91bnRpbmcuXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBNYXRoLm1heChwcmV2Q2hpbGQuX21vdW50SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgICAgICAvLyBUaGUgYHJlbW92ZWROb2Rlc2AgbG9vcCBiZWxvdyB3aWxsIGFjdHVhbGx5IHJlbW92ZSB0aGUgY2hpbGQuXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFRoZSBjaGlsZCBtdXN0IGJlIGluc3RhbnRpYXRlZCBiZWZvcmUgaXQncyBtb3VudGVkLlxuICAgICAgICAgIHVwZGF0ZXMgPSBlbnF1ZXVlKHVwZGF0ZXMsIHRoaXMuX21vdW50Q2hpbGRBdEluZGV4KG5leHRDaGlsZCwgbW91bnRJbWFnZXNbbmV4dE1vdW50SW5kZXhdLCBsYXN0UGxhY2VkTm9kZSwgbmV4dEluZGV4LCB0cmFuc2FjdGlvbiwgY29udGV4dCkpO1xuICAgICAgICAgIG5leHRNb3VudEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dEluZGV4Kys7XG4gICAgICAgIGxhc3RQbGFjZWROb2RlID0gUmVhY3RSZWNvbmNpbGVyLmdldEhvc3ROb2RlKG5leHRDaGlsZCk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgY2hpbGRyZW4gdGhhdCBhcmUgbm8gbG9uZ2VyIHByZXNlbnQuXG4gICAgICBmb3IgKG5hbWUgaW4gcmVtb3ZlZE5vZGVzKSB7XG4gICAgICAgIGlmIChyZW1vdmVkTm9kZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICB1cGRhdGVzID0gZW5xdWV1ZSh1cGRhdGVzLCB0aGlzLl91bm1vdW50Q2hpbGQocHJldkNoaWxkcmVuW25hbWVdLCByZW1vdmVkTm9kZXNbbmFtZV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHVwZGF0ZXMpIHtcbiAgICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IG5leHRDaGlsZHJlbjtcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgc2V0Q2hpbGRyZW5Gb3JJbnN0cnVtZW50YXRpb24uY2FsbCh0aGlzLCBuZXh0Q2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm1vdW50cyBhbGwgcmVuZGVyZWQgY2hpbGRyZW4uIFRoaXMgc2hvdWxkIGJlIHVzZWQgdG8gY2xlYW4gdXAgY2hpbGRyZW5cbiAgICAgKiB3aGVuIHRoaXMgY29tcG9uZW50IGlzIHVubW91bnRlZC4gSXQgZG9lcyBub3QgYWN0dWFsbHkgcGVyZm9ybSBhbnlcbiAgICAgKiBiYWNrZW5kIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB1bm1vdW50Q2hpbGRyZW46IGZ1bmN0aW9uIChzYWZlbHkpIHtcbiAgICAgIHZhciByZW5kZXJlZENoaWxkcmVuID0gdGhpcy5fcmVuZGVyZWRDaGlsZHJlbjtcbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVubW91bnRDaGlsZHJlbihyZW5kZXJlZENoaWxkcmVuLCBzYWZlbHkpO1xuICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGEgY2hpbGQgY29tcG9uZW50IHRvIHRoZSBzdXBwbGllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byBtb3ZlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b0luZGV4IERlc3RpbmF0aW9uIGluZGV4IG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsYXN0SW5kZXggTGFzdCBpbmRleCB2aXNpdGVkIG9mIHRoZSBzaWJsaW5ncyBvZiBgY2hpbGRgLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBtb3ZlQ2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgYWZ0ZXJOb2RlLCB0b0luZGV4LCBsYXN0SW5kZXgpIHtcbiAgICAgIC8vIElmIHRoZSBpbmRleCBvZiBgY2hpbGRgIGlzIGxlc3MgdGhhbiBgbGFzdEluZGV4YCwgdGhlbiBpdCBuZWVkcyB0b1xuICAgICAgLy8gYmUgbW92ZWQuIE90aGVyd2lzZSwgd2UgZG8gbm90IG5lZWQgdG8gbW92ZSBpdCBiZWNhdXNlIGEgY2hpbGQgd2lsbCBiZVxuICAgICAgLy8gaW5zZXJ0ZWQgb3IgbW92ZWQgYmVmb3JlIGBjaGlsZGAuXG4gICAgICBpZiAoY2hpbGQuX21vdW50SW5kZXggPCBsYXN0SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VNb3ZlKGNoaWxkLCBhZnRlck5vZGUsIHRvSW5kZXgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY2hpbGQgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50IHRvIGNyZWF0ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW91bnRJbWFnZSBNYXJrdXAgdG8gaW5zZXJ0LlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjcmVhdGVDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBhZnRlck5vZGUsIG1vdW50SW1hZ2UpIHtcbiAgICAgIHJldHVybiBtYWtlSW5zZXJ0TWFya3VwKG1vdW50SW1hZ2UsIGFmdGVyTm9kZSwgY2hpbGQuX21vdW50SW5kZXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgY2hpbGQgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ2hpbGQgdG8gcmVtb3ZlLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICByZW1vdmVDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBub2RlKSB7XG4gICAgICByZXR1cm4gbWFrZVJlbW92ZShjaGlsZCwgbm9kZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1vdW50cyBhIGNoaWxkIHdpdGggdGhlIHN1cHBsaWVkIG5hbWUuXG4gICAgICpcbiAgICAgKiBOT1RFOiBUaGlzIGlzIHBhcnQgb2YgYHVwZGF0ZUNoaWxkcmVuYCBhbmQgaXMgaGVyZSBmb3IgcmVhZGFiaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gbW91bnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgY2hpbGQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgY2hpbGQuXG4gICAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX21vdW50Q2hpbGRBdEluZGV4OiBmdW5jdGlvbiAoY2hpbGQsIG1vdW50SW1hZ2UsIGFmdGVyTm9kZSwgaW5kZXgsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICBjaGlsZC5fbW91bnRJbmRleCA9IGluZGV4O1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hpbGQoY2hpbGQsIGFmdGVyTm9kZSwgbW91bnRJbWFnZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubW91bnRzIGEgcmVuZGVyZWQgY2hpbGQuXG4gICAgICpcbiAgICAgKiBOT1RFOiBUaGlzIGlzIHBhcnQgb2YgYHVwZGF0ZUNoaWxkcmVuYCBhbmQgaXMgaGVyZSBmb3IgcmVhZGFiaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gdW5tb3VudC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91bm1vdW50Q2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgbm9kZSkge1xuICAgICAgdmFyIHVwZGF0ZSA9IHRoaXMucmVtb3ZlQ2hpbGQoY2hpbGQsIG5vZGUpO1xuICAgICAgY2hpbGQuX21vdW50SW5kZXggPSBudWxsO1xuICAgICAgcmV0dXJuIHVwZGF0ZTtcbiAgICB9XG5cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0TXVsdGlDaGlsZDsiXX0=