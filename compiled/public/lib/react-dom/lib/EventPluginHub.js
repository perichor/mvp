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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _prodInvariant = require('./reactProdInvariant');

var EventPluginRegistry = require('./EventPluginRegistry');
var EventPluginUtils = require('./EventPluginUtils');
var ReactErrorUtils = require('./ReactErrorUtils');

var accumulateInto = require('./accumulateInto');
var forEachAccumulated = require('./forEachAccumulated');
var invariant = require('fbjs/lib/invariant');

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function executeDispatchesAndRelease(event, simulated) {
  if (event) {
    EventPluginUtils.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function executeDispatchesAndReleaseSimulated(e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function executeDispatchesAndReleaseTopLevel(e) {
  return executeDispatchesAndRelease(e, false);
};

var getDictionaryKey = function getDictionaryKey(inst) {
  // Prevents V8 performance issue:
  // https://github.com/facebook/react/pull/7232
  return '.' + inst._rootNodeID;
};

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  /**
   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {function} listener The callback to store.
   */
  putListener: function putListener(inst, registrationName, listener) {
    !(typeof listener === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) : _prodInvariant('94', registrationName, typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) : void 0;

    var key = getDictionaryKey(inst);
    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[key] = listener;

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(inst, registrationName, listener);
    }
  },

  /**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function getListener(inst, registrationName) {
    // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
    // live here; needs to be moved to a better place soon
    var bankForRegistrationName = listenerBank[registrationName];
    if (shouldPreventMouseEvent(registrationName, inst._currentElement.type, inst._currentElement.props)) {
      return null;
    }
    var key = getDictionaryKey(inst);
    return bankForRegistrationName && bankForRegistrationName[key];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function deleteListener(inst, registrationName) {
    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(inst, registrationName);
    }

    var bankForRegistrationName = listenerBank[registrationName];
    // TODO: This should never be null -- when is it?
    if (bankForRegistrationName) {
      var key = getDictionaryKey(inst);
      delete bankForRegistrationName[key];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {object} inst The instance, which is the source of events.
   */
  deleteAllListeners: function deleteAllListeners(inst) {
    var key = getDictionaryKey(inst);
    for (var registrationName in listenerBank) {
      if (!listenerBank.hasOwnProperty(registrationName)) {
        continue;
      }

      if (!listenerBank[registrationName][key]) {
        continue;
      }

      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(inst, registrationName);
      }

      delete listenerBank[registrationName][key];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function enqueueEvents(events) {
    if (events) {
      eventQueue = accumulateInto(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function processEventQueue(simulated) {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    if (simulated) {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
    } else {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    }
    !!eventQueue ? process.env.NODE_ENV !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : _prodInvariant('95') : void 0;
    // This would be a good time to rethrow if any of the event handlers threw.
    ReactErrorUtils.rethrowCaughtError();
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function __purge() {
    listenerBank = {};
  },

  __getListenerBank: function __getListenerBank() {
    return listenerBank;
  }

};

module.exports = EventPluginHub;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9FdmVudFBsdWdpbkh1Yi5qcyJdLCJuYW1lcyI6WyJfcHJvZEludmFyaWFudCIsInJlcXVpcmUiLCJFdmVudFBsdWdpblJlZ2lzdHJ5IiwiRXZlbnRQbHVnaW5VdGlscyIsIlJlYWN0RXJyb3JVdGlscyIsImFjY3VtdWxhdGVJbnRvIiwiZm9yRWFjaEFjY3VtdWxhdGVkIiwiaW52YXJpYW50IiwibGlzdGVuZXJCYW5rIiwiZXZlbnRRdWV1ZSIsImV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZSIsImV2ZW50Iiwic2ltdWxhdGVkIiwiZXhlY3V0ZURpc3BhdGNoZXNJbk9yZGVyIiwiaXNQZXJzaXN0ZW50IiwiY29uc3RydWN0b3IiLCJyZWxlYXNlIiwiZXhlY3V0ZURpc3BhdGNoZXNBbmRSZWxlYXNlU2ltdWxhdGVkIiwiZSIsImV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZVRvcExldmVsIiwiZ2V0RGljdGlvbmFyeUtleSIsImluc3QiLCJfcm9vdE5vZGVJRCIsImlzSW50ZXJhY3RpdmUiLCJ0YWciLCJzaG91bGRQcmV2ZW50TW91c2VFdmVudCIsIm5hbWUiLCJ0eXBlIiwicHJvcHMiLCJkaXNhYmxlZCIsIkV2ZW50UGx1Z2luSHViIiwiaW5qZWN0aW9uIiwiaW5qZWN0RXZlbnRQbHVnaW5PcmRlciIsImluamVjdEV2ZW50UGx1Z2luc0J5TmFtZSIsInB1dExpc3RlbmVyIiwicmVnaXN0cmF0aW9uTmFtZSIsImxpc3RlbmVyIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwia2V5IiwiYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWUiLCJQbHVnaW5Nb2R1bGUiLCJyZWdpc3RyYXRpb25OYW1lTW9kdWxlcyIsImRpZFB1dExpc3RlbmVyIiwiZ2V0TGlzdGVuZXIiLCJfY3VycmVudEVsZW1lbnQiLCJkZWxldGVMaXN0ZW5lciIsIndpbGxEZWxldGVMaXN0ZW5lciIsImRlbGV0ZUFsbExpc3RlbmVycyIsImhhc093blByb3BlcnR5IiwiZXh0cmFjdEV2ZW50cyIsInRvcExldmVsVHlwZSIsInRhcmdldEluc3QiLCJuYXRpdmVFdmVudCIsIm5hdGl2ZUV2ZW50VGFyZ2V0IiwiZXZlbnRzIiwicGx1Z2lucyIsImkiLCJsZW5ndGgiLCJwb3NzaWJsZVBsdWdpbiIsImV4dHJhY3RlZEV2ZW50cyIsImVucXVldWVFdmVudHMiLCJwcm9jZXNzRXZlbnRRdWV1ZSIsInByb2Nlc3NpbmdFdmVudFF1ZXVlIiwicmV0aHJvd0NhdWdodEVycm9yIiwiX19wdXJnZSIsIl9fZ2V0TGlzdGVuZXJCYW5rIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7OztBQUVBLElBQUlBLGlCQUFpQkMsUUFBUSxzQkFBUixDQUFyQjs7QUFFQSxJQUFJQyxzQkFBc0JELFFBQVEsdUJBQVIsQ0FBMUI7QUFDQSxJQUFJRSxtQkFBbUJGLFFBQVEsb0JBQVIsQ0FBdkI7QUFDQSxJQUFJRyxrQkFBa0JILFFBQVEsbUJBQVIsQ0FBdEI7O0FBRUEsSUFBSUksaUJBQWlCSixRQUFRLGtCQUFSLENBQXJCO0FBQ0EsSUFBSUsscUJBQXFCTCxRQUFRLHNCQUFSLENBQXpCO0FBQ0EsSUFBSU0sWUFBWU4sUUFBUSxvQkFBUixDQUFoQjs7QUFFQTs7O0FBR0EsSUFBSU8sZUFBZSxFQUFuQjs7QUFFQTs7OztBQUlBLElBQUlDLGFBQWEsSUFBakI7O0FBRUE7Ozs7Ozs7QUFPQSxJQUFJQyw4QkFBOEIsU0FBOUJBLDJCQUE4QixDQUFVQyxLQUFWLEVBQWlCQyxTQUFqQixFQUE0QjtBQUM1RCxNQUFJRCxLQUFKLEVBQVc7QUFDVFIscUJBQWlCVSx3QkFBakIsQ0FBMENGLEtBQTFDLEVBQWlEQyxTQUFqRDs7QUFFQSxRQUFJLENBQUNELE1BQU1HLFlBQU4sRUFBTCxFQUEyQjtBQUN6QkgsWUFBTUksV0FBTixDQUFrQkMsT0FBbEIsQ0FBMEJMLEtBQTFCO0FBQ0Q7QUFDRjtBQUNGLENBUkQ7QUFTQSxJ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QTtBQUNBSSxvQkFBZ0I2RCxrQkFBaEI7QUFDRCxHQTNKa0I7O0FBNkpuQjs7O0FBR0FDLFdBQVMsbUJBQVk7QUFDbkIxRCxtQkFBZSxFQUFmO0FBQ0QsR0FsS2tCOztBQW9LbkIyRCxxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTzNELFlBQVA7QUFDRDs7QUF0S2tCLENBQXJCOztBQTBLQTRELE9BQU9DLE9BQVAsR0FBaUJ2QyxjQUFqQiIsImZpbGUiOiJFdmVudFBsdWdpbkh1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBFdmVudFBsdWdpblJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi9FdmVudFBsdWdpblJlZ2lzdHJ5Jyk7XG52YXIgRXZlbnRQbHVnaW5VdGlscyA9IHJlcXVpcmUoJy4vRXZlbnRQbHVnaW5VdGlscycpO1xudmFyIFJlYWN0RXJyb3JVdGlscyA9IHJlcXVpcmUoJy4vUmVhY3RFcnJvclV0aWxzJyk7XG5cbnZhciBhY2N1bXVsYXRlSW50byA9IHJlcXVpcmUoJy4vYWNjdW11bGF0ZUludG8nKTtcbnZhciBmb3JFYWNoQWNjdW11bGF0ZWQgPSByZXF1aXJlKCcuL2ZvckVhY2hBY2N1bXVsYXRlZCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIEludGVybmFsIHN0b3JlIGZvciBldmVudCBsaXN0ZW5lcnNcbiAqL1xudmFyIGxpc3RlbmVyQmFuayA9IHt9O1xuXG4vKipcbiAqIEludGVybmFsIHF1ZXVlIG9mIGV2ZW50cyB0aGF0IGhhdmUgYWNjdW11bGF0ZWQgdGhlaXIgZGlzcGF0Y2hlcyBhbmQgYXJlXG4gKiB3YWl0aW5nIHRvIGhhdmUgdGhlaXIgZGlzcGF0Y2hlcyBleGVjdXRlZC5cbiAqL1xudmFyIGV2ZW50UXVldWUgPSBudWxsO1xuXG4vKipcbiAqIERpc3BhdGNoZXMgYW4gZXZlbnQgYW5kIHJlbGVhc2VzIGl0IGJhY2sgaW50byB0aGUgcG9vbCwgdW5sZXNzIHBlcnNpc3RlbnQuXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBldmVudCBTeW50aGV0aWMgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2ltdWxhdGVkIElmIHRoZSBldmVudCBpcyBzaW11bGF0ZWQgKGNoYW5nZXMgZXhuIGJlaGF2aW9yKVxuICogQHByaXZhdGVcbiAqL1xudmFyIGV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZSA9IGZ1bmN0aW9uIChldmVudCwgc2ltdWxhdGVkKSB7XG4gIGlmIChldmVudCkge1xuICAgIEV2ZW50UGx1Z2luVXRpbHMuZXhlY3V0ZURpc3BhdGNoZXNJbk9yZGVyKGV2ZW50LCBzaW11bGF0ZWQpO1xuXG4gICAgaWYgKCFldmVudC5pc1BlcnNpc3RlbnQoKSkge1xuICAgICAgZXZlbnQuY29uc3RydWN0b3IucmVsZWFzZShldmVudCk7XG4gICAgfVxuICB9XG59O1xudmFyIGV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZVNpbXVsYXRlZCA9IGZ1bmN0aW9uIChlKSB7XG4gIHJldHVybiBleGVjdXRlRGlzcGF0Y2hlc0FuZFJlbGVhc2UoZSwgdHJ1ZSk7XG59O1xudmFyIGV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZVRvcExldmVsID0gZnVuY3Rpb24gKGUpIHtcbiAgcmV0dXJuIGV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZShlLCBmYWxzZSk7XG59O1xuXG52YXIgZ2V0RGljdGlvbmFyeUtleSA9IGZ1bmN0aW9uIChpbnN0KSB7XG4gIC8vIFByZXZlbnRzIFY4IHBlcmZvcm1hbmNlIGlzc3VlOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MjMyXG4gIHJldHVybiAnLicgKyBpbnN0Ll9yb290Tm9kZUlEO1xufTtcblxuZnVuY3Rpb24gaXNJbnRlcmFjdGl2ZSh0YWcpIHtcbiAgcmV0dXJuIHRhZyA9PT0gJ2J1dHRvbicgfHwgdGFnID09PSAnaW5wdXQnIHx8IHRhZyA9PT0gJ3NlbGVjdCcgfHwgdGFnID09PSAndGV4dGFyZWEnO1xufVxuXG5mdW5jdGlvbiBzaG91bGRQcmV2ZW50TW91c2VFdmVudChuYW1lLCB0eXBlLCBwcm9wcykge1xuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdvbkNsaWNrJzpcbiAgICBjYXNlICdvbkNsaWNrQ2FwdHVyZSc6XG4gICAgY2FzZSAnb25Eb3VibGVDbGljayc6XG4gICAgY2FzZSAnb25Eb3VibGVDbGlja0NhcHR1cmUnOlxuICAgIGNhc2UgJ29uTW91c2VEb3duJzpcbiAgICBjYXNlICdvbk1vdXNlRG93bkNhcHR1cmUnOlxuICAgIGNhc2UgJ29uTW91c2VNb3ZlJzpcbiAgICBjYXNlICdvbk1vdXNlTW92ZUNhcHR1cmUnOlxuICAgIGNhc2UgJ29uTW91c2VVcCc6XG4gICAgY2FzZSAnb25Nb3VzZVVwQ2FwdHVyZSc6XG4gICAgICByZXR1cm4gISEocHJvcHMuZGlzYWJsZWQgJiYgaXNJbnRlcmFjdGl2ZSh0eXBlKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgYSB1bmlmaWVkIGludGVyZmFjZSBmb3IgZXZlbnQgcGx1Z2lucyB0byBiZSBpbnN0YWxsZWQgYW5kIGNvbmZpZ3VyZWQuXG4gKlxuICogRXZlbnQgcGx1Z2lucyBjYW4gaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgIGBleHRyYWN0RXZlbnRzYCB7ZnVuY3Rpb24oc3RyaW5nLCBET01FdmVudFRhcmdldCwgc3RyaW5nLCBvYmplY3QpOiAqfVxuICogICAgIFJlcXVpcmVkLiBXaGVuIGEgdG9wLWxldmVsIGV2ZW50IGlzIGZpcmVkLCB0aGlzIG1ldGhvZCBpcyBleHBlY3RlZCB0b1xuICogICAgIGV4dHJhY3Qgc3ludGhldGljIGV2ZW50cyB0aGF0IHdpbGwgaW4gdHVybiBiZSBxdWV1ZWQgYW5kIGRpc3BhdGNoZWQuXG4gKlxuICogICBgZXZlbnRUeXBlc2Age29iamVjdH1cbiAqICAgICBPcHRpb25hbCwgcGx1Z2lucyB0aGF0IGZpcmUgZXZlbnRzIG11c3QgcHVibGlzaCBhIG1hcHBpbmcgb2YgcmVnaXN0cmF0aW9uXG4gKiAgICAgbmFtZXMgdGhhdCBhcmUgdXNlZCB0byByZWdpc3RlciBsaXN0ZW5lcnMuIFZhbHVlcyBvZiB0aGlzIG1hcHBpbmcgbXVzdFxuICogICAgIGJlIG9iamVjdHMgdGhhdCBjb250YWluIGByZWdpc3RyYXRpb25OYW1lYCBvciBgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZXNgLlxuICpcbiAqICAgYGV4ZWN1dGVEaXNwYXRjaGAge2Z1bmN0aW9uKG9iamVjdCwgZnVuY3Rpb24sIHN0cmluZyl9XG4gKiAgICAgT3B0aW9uYWwsIGFsbG93cyBwbHVnaW5zIHRvIG92ZXJyaWRlIGhvdyBhbiBldmVudCBnZXRzIGRpc3BhdGNoZWQuIEJ5XG4gKiAgICAgZGVmYXVsdCwgdGhlIGxpc3RlbmVyIGlzIHNpbXBseSBpbnZva2VkLlxuICpcbiAqIEVhY2ggcGx1Z2luIHRoYXQgaXMgaW5qZWN0ZWQgaW50byBgRXZlbnRzUGx1Z2luSHViYCBpcyBpbW1lZGlhdGVseSBvcGVyYWJsZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBFdmVudFBsdWdpbkh1YiA9IHtcblxuICAvKipcbiAgICogTWV0aG9kcyBmb3IgaW5qZWN0aW5nIGRlcGVuZGVuY2llcy5cbiAgICovXG4gIGluamVjdGlvbjoge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthcnJheX0gSW5qZWN0ZWRFdmVudFBsdWdpbk9yZGVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGluamVjdEV2ZW50UGx1Z2luT3JkZXI6IEV2ZW50UGx1Z2luUmVnaXN0cnkuaW5qZWN0RXZlbnRQbHVnaW5PcmRlcixcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpbmplY3RlZE5hbWVzVG9QbHVnaW5zIE1hcCBmcm9tIG5hbWVzIHRvIHBsdWdpbiBtb2R1bGVzLlxuICAgICAqL1xuICAgIGluamVjdEV2ZW50UGx1Z2luc0J5TmFtZTogRXZlbnRQbHVnaW5SZWdpc3RyeS5pbmplY3RFdmVudFBsdWdpbnNCeU5hbWVcblxuICB9LFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgYGxpc3RlbmVyYCBhdCBgbGlzdGVuZXJCYW5rW3JlZ2lzdHJhdGlvbk5hbWVdW2tleV1gLiBJcyBpZGVtcG90ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW5zdCBUaGUgaW5zdGFuY2UsIHdoaWNoIGlzIHRoZSBzb3VyY2Ugb2YgZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVnaXN0cmF0aW9uTmFtZSBOYW1lIG9mIGxpc3RlbmVyIChlLmcuIGBvbkNsaWNrYCkuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBjYWxsYmFjayB0byBzdG9yZS5cbiAgICovXG4gIHB1dExpc3RlbmVyOiBmdW5jdGlvbiAoaW5zdCwgcmVnaXN0cmF0aW9uTmFtZSwgbGlzdGVuZXIpIHtcbiAgICAhKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgJXMgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbiwgaW5zdGVhZCBnb3QgdHlwZSAlcycsIHJlZ2lzdHJhdGlvbk5hbWUsIHR5cGVvZiBsaXN0ZW5lcikgOiBfcHJvZEludmFyaWFudCgnOTQnLCByZWdpc3RyYXRpb25OYW1lLCB0eXBlb2YgbGlzdGVuZXIpIDogdm9pZCAwO1xuXG4gICAgdmFyIGtleSA9IGdldERpY3Rpb25hcnlLZXkoaW5zdCk7XG4gICAgdmFyIGJhbmtGb3JSZWdpc3RyYXRpb25OYW1lID0gbGlzdGVuZXJCYW5rW3JlZ2lzdHJhdGlvbk5hbWVdIHx8IChsaXN0ZW5lckJhbmtbcmVnaXN0cmF0aW9uTmFtZV0gPSB7fSk7XG4gICAgYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWVba2V5XSA9IGxpc3RlbmVyO1xuXG4gICAgdmFyIFBsdWdpbk1vZHVsZSA9IEV2ZW50UGx1Z2luUmVnaXN0cnkucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbcmVnaXN0cmF0aW9uTmFtZV07XG4gICAgaWYgKFBsdWdpbk1vZHVsZSAmJiBQbHVnaW5Nb2R1bGUuZGlkUHV0TGlzdGVuZXIpIHtcbiAgICAgIFBsdWdpbk1vZHVsZS5kaWRQdXRMaXN0ZW5lcihpbnN0LCByZWdpc3RyYXRpb25OYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW5zdCBUaGUgaW5zdGFuY2UsIHdoaWNoIGlzIHRoZSBzb3VyY2Ugb2YgZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVnaXN0cmF0aW9uTmFtZSBOYW1lIG9mIGxpc3RlbmVyIChlLmcuIGBvbkNsaWNrYCkuXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn0gVGhlIHN0b3JlZCBjYWxsYmFjay5cbiAgICovXG4gIGdldExpc3RlbmVyOiBmdW5jdGlvbiAoaW5zdCwgcmVnaXN0cmF0aW9uTmFtZSkge1xuICAgIC8vIFRPRE86IHNob3VsZFByZXZlbnRNb3VzZUV2ZW50IGlzIERPTS1zcGVjaWZpYyBhbmQgZGVmaW5pdGVseSBzaG91bGQgbm90XG4gICAgLy8gbGl2ZSBoZXJlOyBuZWVkcyB0byBiZSBtb3ZlZCB0byBhIGJldHRlciBwbGFjZSBzb29uXG4gICAgdmFyIGJhbmtGb3JSZWdpc3RyYXRpb25OYW1lID0gbGlzdGVuZXJCYW5rW3JlZ2lzdHJhdGlvbk5hbWVdO1xuICAgIGlmIChzaG91bGRQcmV2ZW50TW91c2VFdmVudChyZWdpc3RyYXRpb25OYW1lLCBpbnN0Ll9jdXJyZW50RWxlbWVudC50eXBlLCBpbnN0Ll9jdXJyZW50RWxlbWVudC5wcm9wcykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIga2V5ID0gZ2V0RGljdGlvbmFyeUtleShpbnN0KTtcbiAgICByZXR1cm4gYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWUgJiYgYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWVba2V5XTtcbiAgfSxcblxuICAvKipcbiAgICogRGVsZXRlcyBhIGxpc3RlbmVyIGZyb20gdGhlIHJlZ2lzdHJhdGlvbiBiYW5rLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW5zdCBUaGUgaW5zdGFuY2UsIHdoaWNoIGlzIHRoZSBzb3VyY2Ugb2YgZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVnaXN0cmF0aW9uTmFtZSBOYW1lIG9mIGxpc3RlbmVyIChlLmcuIGBvbkNsaWNrYCkuXG4gICAqL1xuICBkZWxldGVMaXN0ZW5lcjogZnVuY3Rpb24gKGluc3QsIHJlZ2lzdHJhdGlvbk5hbWUpIHtcbiAgICB2YXIgUGx1Z2luTW9kdWxlID0gRXZlbnRQbHVnaW5SZWdpc3RyeS5yZWdpc3RyYXRpb25OYW1lTW9kdWxlc1tyZWdpc3RyYXRpb25OYW1lXTtcbiAgICBpZiAoUGx1Z2luTW9kdWxlICYmIFBsdWdpbk1vZHVsZS53aWxsRGVsZXRlTGlzdGVuZXIpIHtcbiAgICAgIFBsdWdpbk1vZHVsZS53aWxsRGVsZXRlTGlzdGVuZXIoaW5zdCwgcmVnaXN0cmF0aW9uTmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIGJhbmtGb3JSZWdpc3RyYXRpb25OYW1lID0gbGlzdGVuZXJCYW5rW3JlZ2lzdHJhdGlvbk5hbWVdO1xuICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkIG5ldmVyIGJlIG51bGwgLS0gd2hlbiBpcyBpdD9cbiAgICBpZiAoYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWUpIHtcbiAgICAgIHZhciBrZXkgPSBnZXREaWN0aW9uYXJ5S2V5KGluc3QpO1xuICAgICAgZGVsZXRlIGJhbmtGb3JSZWdpc3RyYXRpb25OYW1lW2tleV07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBET00gZWxlbWVudCB3aXRoIHRoZSBzdXBwbGllZCBJRC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGluc3QgVGhlIGluc3RhbmNlLCB3aGljaCBpcyB0aGUgc291cmNlIG9mIGV2ZW50cy5cbiAgICovXG4gIGRlbGV0ZUFsbExpc3RlbmVyczogZnVuY3Rpb24gKGluc3QpIHtcbiAgICB2YXIga2V5ID0gZ2V0RGljdGlvbmFyeUtleShpbnN0KTtcbiAgICBmb3IgKHZhciByZWdpc3RyYXRpb25OYW1lIGluIGxpc3RlbmVyQmFuaykge1xuICAgICAgaWYgKCFsaXN0ZW5lckJhbmsuaGFzT3duUHJvcGVydHkocmVnaXN0cmF0aW9uTmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghbGlzdGVuZXJCYW5rW3JlZ2lzdHJhdGlvbk5hbWVdW2tleV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBQbHVnaW5Nb2R1bGUgPSBFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzW3JlZ2lzdHJhdGlvbk5hbWVdO1xuICAgICAgaWYgKFBsdWdpbk1vZHVsZSAmJiBQbHVnaW5Nb2R1bGUud2lsbERlbGV0ZUxpc3RlbmVyKSB7XG4gICAgICAgIFBsdWdpbk1vZHVsZS53aWxsRGVsZXRlTGlzdGVuZXIoaW5zdCwgcmVnaXN0cmF0aW9uTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBsaXN0ZW5lckJhbmtbcmVnaXN0cmF0aW9uTmFtZV1ba2V5XTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFsbG93cyByZWdpc3RlcmVkIHBsdWdpbnMgYW4gb3Bwb3J0dW5pdHkgdG8gZXh0cmFjdCBldmVudHMgZnJvbSB0b3AtbGV2ZWxcbiAgICogbmF0aXZlIGJyb3dzZXIgZXZlbnRzLlxuICAgKlxuICAgKiBAcmV0dXJuIHsqfSBBbiBhY2N1bXVsYXRpb24gb2Ygc3ludGhldGljIGV2ZW50cy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBleHRyYWN0RXZlbnRzOiBmdW5jdGlvbiAodG9wTGV2ZWxUeXBlLCB0YXJnZXRJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpIHtcbiAgICB2YXIgZXZlbnRzO1xuICAgIHZhciBwbHVnaW5zID0gRXZlbnRQbHVnaW5SZWdpc3RyeS5wbHVnaW5zO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gTm90IGV2ZXJ5IHBsdWdpbiBpbiB0aGUgb3JkZXJpbmcgbWF5IGJlIGxvYWRlZCBhdCBydW50aW1lLlxuICAgICAgdmFyIHBvc3NpYmxlUGx1Z2luID0gcGx1Z2luc1tpXTtcbiAgICAgIGlmIChwb3NzaWJsZVBsdWdpbikge1xuICAgICAgICB2YXIgZXh0cmFjdGVkRXZlbnRzID0gcG9zc2libGVQbHVnaW4uZXh0cmFjdEV2ZW50cyh0b3BMZXZlbFR5cGUsIHRhcmdldEluc3QsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCk7XG4gICAgICAgIGlmIChleHRyYWN0ZWRFdmVudHMpIHtcbiAgICAgICAgICBldmVudHMgPSBhY2N1bXVsYXRlSW50byhldmVudHMsIGV4dHJhY3RlZEV2ZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50cztcbiAgfSxcblxuICAvKipcbiAgICogRW5xdWV1ZXMgYSBzeW50aGV0aWMgZXZlbnQgdGhhdCBzaG91bGQgYmUgZGlzcGF0Y2hlZCB3aGVuXG4gICAqIGBwcm9jZXNzRXZlbnRRdWV1ZWAgaXMgaW52b2tlZC5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBldmVudHMgQW4gYWNjdW11bGF0aW9uIG9mIHN5bnRoZXRpYyBldmVudHMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUV2ZW50czogZnVuY3Rpb24gKGV2ZW50cykge1xuICAgIGlmIChldmVudHMpIHtcbiAgICAgIGV2ZW50UXVldWUgPSBhY2N1bXVsYXRlSW50byhldmVudFF1ZXVlLCBldmVudHMpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbGwgc3ludGhldGljIGV2ZW50cyBvbiB0aGUgZXZlbnQgcXVldWUuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJvY2Vzc0V2ZW50UXVldWU6IGZ1bmN0aW9uIChzaW11bGF0ZWQpIHtcbiAgICAvLyBTZXQgYGV2ZW50UXVldWVgIHRvIG51bGwgYmVmb3JlIHByb2Nlc3NpbmcgaXQgc28gdGhhdCB3ZSBjYW4gdGVsbCBpZiBtb3JlXG4gICAgLy8gZXZlbnRzIGdldCBlbnF1ZXVlZCB3aGlsZSBwcm9jZXNzaW5nLlxuICAgIHZhciBwcm9jZXNzaW5nRXZlbnRRdWV1ZSA9IGV2ZW50UXVldWU7XG4gICAgZXZlbnRRdWV1ZSA9IG51bGw7XG4gICAgaWYgKHNpbXVsYXRlZCkge1xuICAgICAgZm9yRWFjaEFjY3VtdWxhdGVkKHByb2Nlc3NpbmdFdmVudFF1ZXVlLCBleGVjdXRlRGlzcGF0Y2hlc0FuZFJlbGVhc2VTaW11bGF0ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JFYWNoQWNjdW11bGF0ZWQocHJvY2Vzc2luZ0V2ZW50UXVldWUsIGV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZVRvcExldmVsKTtcbiAgICB9XG4gICAgISFldmVudFF1ZXVlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3Byb2Nlc3NFdmVudFF1ZXVlKCk6IEFkZGl0aW9uYWwgZXZlbnRzIHdlcmUgZW5xdWV1ZWQgd2hpbGUgcHJvY2Vzc2luZyBhbiBldmVudCBxdWV1ZS4gU3VwcG9ydCBmb3IgdGhpcyBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkLicpIDogX3Byb2RJbnZhcmlhbnQoJzk1JykgOiB2b2lkIDA7XG4gICAgLy8gVGhpcyB3b3VsZCBiZSBhIGdvb2QgdGltZSB0byByZXRocm93IGlmIGFueSBvZiB0aGUgZXZlbnQgaGFuZGxlcnMgdGhyZXcuXG4gICAgUmVhY3RFcnJvclV0aWxzLnJldGhyb3dDYXVnaHRFcnJvcigpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUaGVzZSBhcmUgbmVlZGVkIGZvciB0ZXN0cyBvbmx5LiBEbyBub3QgdXNlIVxuICAgKi9cbiAgX19wdXJnZTogZnVuY3Rpb24gKCkge1xuICAgIGxpc3RlbmVyQmFuayA9IHt9O1xuICB9LFxuXG4gIF9fZ2V0TGlzdGVuZXJCYW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQmFuaztcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50UGx1Z2luSHViOyJdfQ==