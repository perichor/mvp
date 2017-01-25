/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assign = require('object-assign');

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var ReactDebugTool = require('./ReactDebugTool');
var warning = require('fbjs/lib/warning');
var alreadyWarned = false;

function roundFloat(val) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var n = Math.pow(10, base);
  return Math.floor(val * n) / n;
}

// Flow type definition of console.table is too strict right now, see
// https://github.com/facebook/flow/pull/2353 for updates
function consoleTable(table) {
  console.table(table);
}

function warnInProduction() {
  if (alreadyWarned) {
    return;
  }
  alreadyWarned = true;
  if (typeof console !== 'undefined') {
    console.error('ReactPerf is not supported in the production builds of React. ' + 'To collect measurements, please use the development build of React instead.');
  }
}

function getLastMeasurements() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  return ReactDebugTool.getFlushHistory();
}

function getExclusive() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, timerType, applyUpdate) {
    var displayName = treeSnapshot[instanceID].displayName;

    var key = displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key: key,
        instanceCount: 0,
        counts: {},
        durations: {},
        totalDuration: 0
      };
    }
    if (!stats.durations[timerType]) {
      stats.durations[timerType] = 0;
    }
    if (!stats.counts[timerType]) {
      stats.counts[timerType] = 0;
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }

  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements,
        treeSnapshot = flush.treeSnapshot;

    measurements.forEach(function (measurement) {
      var duration = measurement.duration,
          instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      updateAggregatedStats(treeSnapshot, instanceID, timerType, function (stats) {
        stats.totalDuration += duration;
        stats.durations[timerType] += duration;
        stats.counts[timerType]++;
      });
    });
  });

  return Object.keys(aggregatedStats).map(function (key) {
    return _extends({}, aggregatedStats[key], {
      instanceCount: Object.keys(affectedIDs[key]).length
    });
  }).sort(function (a, b) {
    return b.totalDuration - a.totalDuration;
  });
}

function getInclusive() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
    var _treeSnapshot$instanc = treeSnapshot[instanceID],
        displayName = _treeSnapshot$instanc.displayName,
        ownerID = _treeSnapshot$instanc.ownerID;

    var owner = treeSnapshot[ownerID];
    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key: key,
        instanceCount: 0,
        inclusiveRenderDuration: 0,
        renderCount: 0
      };
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }

  var isCompositeByID = {};
  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements;

    measurements.forEach(function (measurement) {
      var instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }
      isCompositeByID[instanceID] = true;
    });
  });

  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements,
        treeSnapshot = flush.treeSnapshot;

    measurements.forEach(function (measurement) {
      var duration = measurement.duration,
          instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }
      updateAggregatedStats(treeSnapshot, instanceID, function (stats) {
        stats.renderCount++;
      });
      var nextParentID = instanceID;
      while (nextParentID) {
        // As we traverse parents, only count inclusive time towards composites.
        // We know something is a composite if its render() was called.
        if (isCompositeByID[nextParentID]) {
          updateAggregatedStats(treeSnapshot, nextParentID, function (stats) {
            stats.inclusiveRenderDuration += duration;
          });
        }
        nextParentID = treeSnapshot[nextParentID].parentID;
      }
    });
  });

  return Object.keys(aggregatedStats).map(function (key) {
    return _extends({}, aggregatedStats[key], {
      instanceCount: Object.keys(affectedIDs[key]).length
    });
  }).sort(function (a, b) {
    return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
  });
}

function getWasted() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
    var _treeSnapshot$instanc2 = treeSnapshot[instanceID],
        displayName = _treeSnapshot$instanc2.displayName,
        ownerID = _treeSnapshot$instanc2.ownerID;

    var owner = treeSnapshot[ownerID];
    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key: key,
        instanceCount: 0,
        inclusiveRenderDuration: 0,
        renderCount: 0
      };
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }

  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements,
        treeSnapshot = flush.treeSnapshot,
        operations = flush.operations;

    var isDefinitelyNotWastedByID = {};

    // Find host components associated with an operation in this batch.
    // Mark all components in their parent tree as definitely not wasted.
    operations.forEach(function (operation) {
      var instanceID = operation.instanceID;

      var nextParentID = instanceID;
      while (nextParentID) {
        isDefinitelyNotWastedByID[nextParentID] = true;
        nextParentID = treeSnapshot[nextParentID].parentID;
      }
    });

    // Find composite components that rendered in this batch.
    // These are potential candidates for being wasted renders.
    var renderedCompositeIDs = {};
    measurements.forEach(function (measurement) {
      var instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }
      renderedCompositeIDs[instanceID] = true;
    });

    measurements.forEach(function (measurement) {
      var duration = measurement.duration,
          instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }

      // If there was a DOM update below this component, or it has just been
      // mounted, its render() is not considered wasted.
      var updateCount = treeSnapshot[instanceID].updateCount;

      if (isDefinitelyNotWastedByID[instanceID] || updateCount === 0) {
        return;
      }

      // We consider this render() wasted.
      updateAggregatedStats(treeSnapshot, instanceID, function (stats) {
        stats.renderCount++;
      });

      var nextParentID = instanceID;
      while (nextParentID) {
        // Any parents rendered during this batch are considered wasted
        // unless we previously marked them as dirty.
        var isWasted = renderedCompositeIDs[nextParentID] && !isDefinitelyNotWastedByID[nextParentID];
        if (isWasted) {
          updateAggregatedStats(treeSnapshot, nextParentID, function (stats) {
            stats.inclusiveRenderDuration += duration;
          });
        }
        nextParentID = treeSnapshot[nextParentID].parentID;
      }
    });
  });

  return Object.keys(aggregatedStats).map(function (key) {
    return _extends({}, aggregatedStats[key], {
      instanceCount: Object.keys(affectedIDs[key]).length
    });
  }).sort(function (a, b) {
    return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
  });
}

function getOperations() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var stats = [];
  flushHistory.forEach(function (flush, flushIndex) {
    var operations = flush.operations,
        treeSnapshot = flush.treeSnapshot;

    operations.forEach(function (operation) {
      var instanceID = operation.instanceID,
          type = operation.type,
          payload = operation.payload;
      var _treeSnapshot$instanc3 = treeSnapshot[instanceID],
          displayName = _treeSnapshot$instanc3.displayName,
          ownerID = _treeSnapshot$instanc3.ownerID;

      var owner = treeSnapshot[ownerID];
      var key = (owner ? owner.displayName + ' > ' : '') + displayName;

      stats.push({
        flushIndex: flushIndex,
        instanceID: instanceID,
        key: key,
        type: type,
        ownerID: ownerID,
        payload: payload
      });
    });
  });
  return stats;
}

function printExclusive(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getExclusive(flushHistory);
  var table = stats.map(function (item) {
    var key = item.key,
        instanceCount = item.instanceCount,
        totalDuration = item.totalDuration;

    var renderCount = item.counts.render || 0;
    var renderDuration = item.durations.render || 0;
    return {
      'Component': key,
      'Total time (ms)': roundFloat(totalDuration),
      'Instance count': instanceCount,
      'Total render time (ms)': roundFloat(renderDuration),
      'Average render time (ms)': renderCount ? roundFloat(renderDuration / renderCount) : undefined,
      'Render count': renderCount,
      'Total lifecycle time (ms)': roundFloat(totalDuration - renderDuration)
    };
  });
  consoleTable(table);
}

function printInclusive(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getInclusive(flushHistory);
  var table = stats.map(function (item) {
    var key = item.key,
        instanceCount = item.instanceCount,
        inclusiveRenderDuration = item.inclusiveRenderDuration,
        renderCount = item.renderCount;

    return {
      'Owner > Component': key,
      'Inclusive render time (ms)': roundFloat(inclusiveRenderDuration),
      'Instance count': instanceCount,
      'Render count': renderCount
    };
  });
  consoleTable(table);
}

function printWasted(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getWasted(flushHistory);
  var table = stats.map(function (item) {
    var key = item.key,
        instanceCount = item.instanceCount,
        inclusiveRenderDuration = item.inclusiveRenderDuration,
        renderCount = item.renderCount;

    return {
      'Owner > Component': key,
      'Inclusive wasted time (ms)': roundFloat(inclusiveRenderDuration),
      'Instance count': instanceCount,
      'Render count': renderCount
    };
  });
  consoleTable(table);
}

function printOperations(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getOperations(flushHistory);
  var table = stats.map(function (stat) {
    return {
      'Owner > Node': stat.key,
      'Operation': stat.type,
      'Payload': _typeof(stat.payload) === 'object' ? JSON.stringify(stat.payload) : stat.payload,
      'Flush index': stat.flushIndex,
      'Owner Component ID': stat.ownerID,
      'DOM Component ID': stat.instanceID
    };
  });
  consoleTable(table);
}

var warnedAboutPrintDOM = false;
function printDOM(measurements) {
  process.env.NODE_ENV !== 'production' ? warning(warnedAboutPrintDOM, '`ReactPerf.printDOM(...)` is deprecated. Use ' + '`ReactPerf.printOperations(...)` instead.') : void 0;
  warnedAboutPrintDOM = true;
  return printOperations(measurements);
}

var warnedAboutGetMeasurementsSummaryMap = false;
function getMeasurementsSummaryMap(measurements) {
  process.env.NODE_ENV !== 'production' ? warning(warnedAboutGetMeasurementsSummaryMap, '`ReactPerf.getMeasurementsSummaryMap(...)` is deprecated. Use ' + '`ReactPerf.getWasted(...)` instead.') : void 0;
  warnedAboutGetMeasurementsSummaryMap = true;
  return getWasted(measurements);
}

function start() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  ReactDebugTool.beginProfiling();
}

function stop() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  ReactDebugTool.endProfiling();
}

function isRunning() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return false;
  }

  return ReactDebugTool.isProfiling();
}

var ReactPerfAnalysis = {
  getLastMeasurements: getLastMeasurements,
  getExclusive: getExclusive,
  getInclusive: getInclusive,
  getWasted: getWasted,
  getOperations: getOperations,
  printExclusive: printExclusive,
  printInclusive: printInclusive,
  printWasted: printWasted,
  printOperations: printOperations,
  start: start,
  stop: stop,
  isRunning: isRunning,
  // Deprecated:
  printDOM: printDOM,
  getMeasurementsSummaryMap: getMeasurementsSummaryMap
};

module.exports = ReactPerfAnalysis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdFBlcmYuanMiXSwibmFtZXMiOlsiX2Fzc2lnbiIsInJlcXVpcmUiLCJfZXh0ZW5kcyIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJSZWFjdERlYnVnVG9vbCIsIndhcm5pbmciLCJhbHJlYWR5V2FybmVkIiwicm91bmRGbG9hdCIsInZhbCIsImJhc2UiLCJ1bmRlZmluZWQiLCJuIiwiTWF0aCIsInBvdyIsImZsb29yIiwiY29uc29sZVRhYmxlIiwidGFibGUiLCJjb25zb2xlIiwid2FybkluUHJvZHVjdGlvbiIsImVycm9yIiwiZ2V0TGFzdE1lYXN1cmVtZW50cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImdldEZsdXNoSGlzdG9yeSIsImdldEV4Y2x1c2l2ZSIsImZsdXNoSGlzdG9yeSIsImFnZ3JlZ2F0ZWRTdGF0cyIsImFmZmVjdGVkSURzIiwidXBkYXRlQWdncmVnYXRlZFN0YXRzIiwidHJlZVNuYXBzaG90IiwiaW5zdGFuY2VJRCIsInRpbWVyVHlwZSIsImFwcGx5VXBkYXRlIiwiZGlzcGxheU5hbWUiLCJzdGF0cyIsImluc3RhbmNlQ291bnQiLCJjb3VudHMiLCJkdXJhdGlvbnMiLCJ0b3RhbER1cmF0aW9uIiwiZm9yRWFjaCIsImZsdXNoIiwibWVhc3VyZW1lbnRzIiwibWVhc3VyZW1lbnQiLCJkdXJhdGlvbiIsImtleXMiLCJtYXAiLCJzb3J0IiwiYSIsImIiLCJnZXRJbmNsdXNpdmUiLCJfdHJlZVNuYXBzaG90JGluc3RhbmMiLCJvd25lcklEIiwib3duZXIiLCJpbmNsdXNpdmVSZW5kZXJEdXJhdGlvbiIsInJlbmRlckNvdW50IiwiaXNDb21wb3NpdGVCeUlEIiwibmV4dFBhcmVudElEIiwicGFyZW50SUQiLCJnZXRXYXN0ZWQiLCJfdHJlZVNuYXBzaG90JGluc3RhbmMyIiwib3BlcmF0aW9ucyIsImlzRGVmaW5pdGVseU5vdFdhc3RlZEJ5SUQiLCJvcGVyYXRpb24iLCJyZW5kZXJlZENvbXBvc2l0ZUlEcyIsInVwZGF0ZUNvdW50IiwiaXNXYXN0ZWQiLCJnZXRPcGVyYXRpb25zIiwiZmx1c2hJbmRleCIsInR5cGUiLCJwYXlsb2FkIiwiX3RyZWVTbmFwc2hvdCRpbnN0YW5jMyIsInB1c2giLCJwcmludEV4Y2x1c2l2ZSIsIml0ZW0iLCJyZW5kZXIiLCJyZW5kZXJEdXJhdGlvbiIsInByaW50SW5jbHVzaXZlIiwicHJpbnRXYXN0ZWQiLCJwcmludE9wZXJhdGlvbnMiLCJzdGF0IiwiSlNPTiIsInN0cmluZ2lmeSIsIndhcm5lZEFib3V0UHJpbnRET00iLCJwcmludERPTSIsIndhcm5lZEFib3V0R2V0TWVhc3VyZW1lbnRzU3VtbWFyeU1hcCIsImdldE1lYXN1cmVtZW50c1N1bW1hcnlNYXAiLCJzdGFydCIsImJlZ2luUHJvZmlsaW5nIiwic3RvcCIsImVuZFByb2ZpbGluZyIsImlzUnVubmluZyIsImlzUHJvZmlsaW5nIiwiUmVhY3RQZXJmQW5hbHlzaXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7OztBQUVBLElBQUlBLFVBQVVDLFFBQVEsZUFBUixDQUFkOztBQUVBLElBQUlDLFdBQVdGLFdBQVcsVUFBVUcsTUFBVixFQUFrQjtBQUFFLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJQyxVQUFVQyxNQUE5QixFQUFzQ0YsR0FBdEMsRUFBMkM7QUFBRSxRQUFJRyxTQUFTRixVQUFVRCxDQUFWLENBQWIsQ0FBMkIsS0FBSyxJQUFJSSxHQUFULElBQWdCRCxNQUFoQixFQUF3QjtBQUFFLFVBQUlFLE9BQU9DLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ0wsTUFBckMsRUFBNkNDLEdBQTdDLENBQUosRUFBdUQ7QUFBRUwsZUFBT0ssR0FBUCxJQUFj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QVlDLFFBQVosS0FBeUIsWUFBM0IsQ0FBSixFQUE4QztBQUM1Q0w7QUFDQSxXQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFPZCxlQUFld0YsV0FBZixFQUFQO0FBQ0Q7O0FBRUQsSUFBSUMsb0JBQW9CO0FBQ3RCekUsdUJBQXFCQSxtQkFEQztBQUV0QkssZ0JBQWNBLFlBRlE7QUFHdEJ5QixnQkFBY0EsWUFIUTtBQUl0QlMsYUFBV0EsU0FKVztBQUt0QlEsaUJBQWVBLGFBTE87QUFNdEJNLGtCQUFnQkEsY0FOTTtBQU90Qkksa0JBQWdCQSxjQVBNO0FBUXRCQyxlQUFhQSxXQVJTO0FBU3RCQyxtQkFBaUJBLGVBVEs7QUFVdEJRLFNBQU9BLEtBVmU7QUFXdEJFLFFBQU1BLElBWGdCO0FBWXRCRSxhQUFXQSxTQVpXO0FBYXRCO0FBQ0FQLFlBQVVBLFFBZFk7QUFldEJFLDZCQUEyQkE7QUFmTCxDQUF4Qjs7QUFrQkFRLE9BQU9DLE9BQVAsR0FBaUJGLGlCQUFqQiIsImZpbGUiOiJSZWFjdFBlcmYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgX2V4dGVuZHMgPSBfYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgUmVhY3REZWJ1Z1Rvb2wgPSByZXF1aXJlKCcuL1JlYWN0RGVidWdUb29sJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBhbHJlYWR5V2FybmVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHJvdW5kRmxvYXQodmFsKSB7XG4gIHZhciBiYXNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAyO1xuXG4gIHZhciBuID0gTWF0aC5wb3coMTAsIGJhc2UpO1xuICByZXR1cm4gTWF0aC5mbG9vcih2YWwgKiBuKSAvIG47XG59XG5cbi8vIEZsb3cgdHlwZSBkZWZpbml0aW9uIG9mIGNvbnNvbGUudGFibGUgaXMgdG9vIHN0cmljdCByaWdodCBub3csIHNlZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvcHVsbC8yMzUzIGZvciB1cGRhdGVzXG5mdW5jdGlvbiBjb25zb2xlVGFibGUodGFibGUpIHtcbiAgY29uc29sZS50YWJsZSh0YWJsZSk7XG59XG5cbmZ1bmN0aW9uIHdhcm5JblByb2R1Y3Rpb24oKSB7XG4gIGlmIChhbHJlYWR5V2FybmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFscmVhZHlXYXJuZWQgPSB0cnVlO1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS5lcnJvcignUmVhY3RQZXJmIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIHByb2R1Y3Rpb24gYnVpbGRzIG9mIFJlYWN0LiAnICsgJ1RvIGNvbGxlY3QgbWVhc3VyZW1lbnRzLCBwbGVhc2UgdXNlIHRoZSBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWFjdCBpbnN0ZWFkLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldExhc3RNZWFzdXJlbWVudHMoKSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgd2FybkluUHJvZHVjdGlvbigpO1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdERlYnVnVG9vbC5nZXRGbHVzaEhpc3RvcnkoKTtcbn1cblxuZnVuY3Rpb24gZ2V0RXhjbHVzaXZlKCkge1xuICB2YXIgZmx1c2hIaXN0b3J5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRMYXN0TWVhc3VyZW1lbnRzKCk7XG5cbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICB3YXJuSW5Qcm9kdWN0aW9uKCk7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIGFnZ3JlZ2F0ZWRTdGF0cyA9IHt9O1xuICB2YXIgYWZmZWN0ZWRJRHMgPSB7fTtcblxuICBmdW5jdGlvbiB1cGRhdGVBZ2dyZWdhdGVkU3RhdHModHJlZVNuYXBzaG90LCBpbnN0YW5jZUlELCB0aW1lclR5cGUsIGFwcGx5VXBkYXRlKSB7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gdHJlZVNuYXBzaG90W2luc3RhbmNlSURdLmRpc3BsYXlOYW1lO1xuXG4gICAgdmFyIGtleSA9IGRpc3BsYXlOYW1lO1xuICAgIHZhciBzdGF0cyA9IGFnZ3JlZ2F0ZWRTdGF0c1trZXldO1xuICAgIGlmICghc3RhdHMpIHtcbiAgICAgIGFmZmVjdGVkSURzW2tleV0gPSB7fTtcbiAgICAgIHN0YXRzID0gYWdncmVnYXRlZFN0YXRzW2tleV0gPSB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBpbnN0YW5jZUNvdW50OiAwLFxuICAgICAgICBjb3VudHM6IHt9LFxuICAgICAgICBkdXJhdGlvbnM6IHt9LFxuICAgICAgICB0b3RhbER1cmF0aW9uOiAwXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIXN0YXRzLmR1cmF0aW9uc1t0aW1lclR5cGVdKSB7XG4gICAgICBzdGF0cy5kdXJhdGlvbnNbdGltZXJUeXBlXSA9IDA7XG4gICAgfVxuICAgIGlmICghc3RhdHMuY291bnRzW3RpbWVyVHlwZV0pIHtcbiAgICAgIHN0YXRzLmNvdW50c1t0aW1lclR5cGVdID0gMDtcbiAgICB9XG4gICAgYWZmZWN0ZWRJRHNba2V5XVtpbnN0YW5jZUlEXSA9IHRydWU7XG4gICAgYXBwbHlVcGRhdGUoc3RhdHMpO1xuICB9XG5cbiAgZmx1c2hIaXN0b3J5LmZvckVhY2goZnVuY3Rpb24gKGZsdXNoKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50cyA9IGZsdXNoLm1lYXN1cmVtZW50cyxcbiAgICAgICAgdHJlZVNuYXBzaG90ID0gZmx1c2gudHJlZVNuYXBzaG90O1xuXG4gICAgbWVhc3VyZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKG1lYXN1cmVtZW50KSB7XG4gICAgICB2YXIgZHVyYXRpb24gPSBtZWFzdXJlbWVudC5kdXJhdGlvbixcbiAgICAgICAgICBpbnN0YW5jZUlEID0gbWVhc3VyZW1lbnQuaW5zdGFuY2VJRCxcbiAgICAgICAgICB0aW1lclR5cGUgPSBtZWFzdXJlbWVudC50aW1lclR5cGU7XG5cbiAgICAgIHVwZGF0ZUFnZ3JlZ2F0ZWRTdGF0cyh0cmVlU25hcHNob3QsIGluc3RhbmNlSUQsIHRpbWVyVHlwZSwgZnVuY3Rpb24gKHN0YXRzKSB7XG4gICAgICAgIHN0YXRzLnRvdGFsRHVyYXRpb24gKz0gZHVyYXRpb247XG4gICAgICAgIHN0YXRzLmR1cmF0aW9uc1t0aW1lclR5cGVdICs9IGR1cmF0aW9uO1xuICAgICAgICBzdGF0cy5jb3VudHNbdGltZXJUeXBlXSsrO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhhZ2dyZWdhdGVkU3RhdHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHt9LCBhZ2dyZWdhdGVkU3RhdHNba2V5XSwge1xuICAgICAgaW5zdGFuY2VDb3VudDogT2JqZWN0LmtleXMoYWZmZWN0ZWRJRHNba2V5XSkubGVuZ3RoXG4gICAgfSk7XG4gIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYi50b3RhbER1cmF0aW9uIC0gYS50b3RhbER1cmF0aW9uO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5jbHVzaXZlKCkge1xuICB2YXIgZmx1c2hIaXN0b3J5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRMYXN0TWVhc3VyZW1lbnRzKCk7XG5cbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICB3YXJuSW5Qcm9kdWN0aW9uKCk7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIGFnZ3JlZ2F0ZWRTdGF0cyA9IHt9O1xuICB2YXIgYWZmZWN0ZWRJRHMgPSB7fTtcblxuICBmdW5jdGlvbiB1cGRhdGVBZ2dyZWdhdGVkU3RhdHModHJlZVNuYXBzaG90LCBpbnN0YW5jZUlELCBhcHBseVVwZGF0ZSkge1xuICAgIHZhciBfdHJlZVNuYXBzaG90JGluc3RhbmMgPSB0cmVlU25hcHNob3RbaW5zdGFuY2VJRF0sXG4gICAgICAgIGRpc3BsYXlOYW1lID0gX3RyZWVTbmFwc2hvdCRpbnN0YW5jLmRpc3BsYXlOYW1lLFxuICAgICAgICBvd25lcklEID0gX3RyZWVTbmFwc2hvdCRpbnN0YW5jLm93bmVySUQ7XG5cbiAgICB2YXIgb3duZXIgPSB0cmVlU25hcHNob3Rbb3duZXJJRF07XG4gICAgdmFyIGtleSA9IChvd25lciA/IG93bmVyLmRpc3BsYXlOYW1lICsgJyA+ICcgOiAnJykgKyBkaXNwbGF5TmFtZTtcbiAgICB2YXIgc3RhdHMgPSBhZ2dyZWdhdGVkU3RhdHNba2V5XTtcbiAgICBpZiAoIXN0YXRzKSB7XG4gICAgICBhZmZlY3RlZElEc1trZXldID0ge307XG4gICAgICBzdGF0cyA9IGFnZ3JlZ2F0ZWRTdGF0c1trZXldID0ge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaW5zdGFuY2VDb3VudDogMCxcbiAgICAgICAgaW5jbHVzaXZlUmVuZGVyRHVyYXRpb246IDAsXG4gICAgICAgIHJlbmRlckNvdW50OiAwXG4gICAgICB9O1xuICAgIH1cbiAgICBhZmZlY3RlZElEc1trZXldW2luc3RhbmNlSURdID0gdHJ1ZTtcbiAgICBhcHBseVVwZGF0ZShzdGF0cyk7XG4gIH1cblxuICB2YXIgaXNDb21wb3NpdGVCeUlEID0ge307XG4gIGZsdXNoSGlzdG9yeS5mb3JFYWNoKGZ1bmN0aW9uIChmbHVzaCkge1xuICAgIHZhciBtZWFzdXJlbWVudHMgPSBmbHVzaC5tZWFzdXJlbWVudHM7XG5cbiAgICBtZWFzdXJlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAobWVhc3VyZW1lbnQpIHtcbiAgICAgIHZhciBpbnN0YW5jZUlEID0gbWVhc3VyZW1lbnQuaW5zdGFuY2VJRCxcbiAgICAgICAgICB0aW1lclR5cGUgPSBtZWFzdXJlbWVudC50aW1lclR5cGU7XG5cbiAgICAgIGlmICh0aW1lclR5cGUgIT09ICdyZW5kZXInKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlzQ29tcG9zaXRlQnlJRFtpbnN0YW5jZUlEXSA9IHRydWU7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGZsdXNoSGlzdG9yeS5mb3JFYWNoKGZ1bmN0aW9uIChmbHVzaCkge1xuICAgIHZhciBtZWFzdXJlbWVudHMgPSBmbHVzaC5tZWFzdXJlbWVudHMsXG4gICAgICAgIHRyZWVTbmFwc2hvdCA9IGZsdXNoLnRyZWVTbmFwc2hvdDtcblxuICAgIG1lYXN1cmVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtZWFzdXJlbWVudCkge1xuICAgICAgdmFyIGR1cmF0aW9uID0gbWVhc3VyZW1lbnQuZHVyYXRpb24sXG4gICAgICAgICAgaW5zdGFuY2VJRCA9IG1lYXN1cmVtZW50Lmluc3RhbmNlSUQsXG4gICAgICAgICAgdGltZXJUeXBlID0gbWVhc3VyZW1lbnQudGltZXJUeXBlO1xuXG4gICAgICBpZiAodGltZXJUeXBlICE9PSAncmVuZGVyJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB1cGRhdGVBZ2dyZWdhdGVkU3RhdHModHJlZVNuYXBzaG90LCBpbnN0YW5jZUlELCBmdW5jdGlvbiAoc3RhdHMpIHtcbiAgICAgICAgc3RhdHMucmVuZGVyQ291bnQrKztcbiAgICAgIH0pO1xuICAgICAgdmFyIG5leHRQYXJlbnRJRCA9IGluc3RhbmNlSUQ7XG4gICAgICB3aGlsZSAobmV4dFBhcmVudElEKSB7XG4gICAgICAgIC8vIEFzIHdlIHRyYXZlcnNlIHBhcmVudHMsIG9ubHkgY291bnQgaW5jbHVzaXZlIHRpbWUgdG93YXJkcyBjb21wb3NpdGVzLlxuICAgICAgICAvLyBXZSBrbm93IHNvbWV0aGluZyBpcyBhIGNvbXBvc2l0ZSBpZiBpdHMgcmVuZGVyKCkgd2FzIGNhbGxlZC5cbiAgICAgICAgaWYgKGlzQ29tcG9zaXRlQnlJRFtuZXh0UGFyZW50SURdKSB7XG4gICAgICAgICAgdXBkYXRlQWdncmVnYXRlZFN0YXRzKHRyZWVTbmFwc2hvdCwgbmV4dFBhcmVudElELCBmdW5jdGlvbiAoc3RhdHMpIHtcbiAgICAgICAgICAgIHN0YXRzLmluY2x1c2l2ZVJlbmRlckR1cmF0aW9uICs9IGR1cmF0aW9uO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG5leHRQYXJlbnRJRCA9IHRyZWVTbmFwc2hvdFtuZXh0UGFyZW50SURdLnBhcmVudElEO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMoYWdncmVnYXRlZFN0YXRzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgYWdncmVnYXRlZFN0YXRzW2tleV0sIHtcbiAgICAgIGluc3RhbmNlQ291bnQ6IE9iamVjdC5rZXlzKGFmZmVjdGVkSURzW2tleV0pLmxlbmd0aFxuICAgIH0pO1xuICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGIuaW5jbHVzaXZlUmVuZGVyRHVyYXRpb24gLSBhLmluY2x1c2l2ZVJlbmRlckR1cmF0aW9uO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2FzdGVkKCkge1xuICB2YXIgZmx1c2hIaXN0b3J5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRMYXN0TWVhc3VyZW1lbnRzKCk7XG5cbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICB3YXJuSW5Qcm9kdWN0aW9uKCk7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIGFnZ3JlZ2F0ZWRTdGF0cyA9IHt9O1xuICB2YXIgYWZmZWN0ZWRJRHMgPSB7fTtcblxuICBmdW5jdGlvbiB1cGRhdGVBZ2dyZWdhdGVkU3RhdHModHJlZVNuYXBzaG90LCBpbnN0YW5jZUlELCBhcHBseVVwZGF0ZSkge1xuICAgIHZhciBfdHJlZVNuYXBzaG90JGluc3RhbmMyID0gdHJlZVNuYXBzaG90W2luc3RhbmNlSURdLFxuICAgICAgICBkaXNwbGF5TmFtZSA9IF90cmVlU25hcHNob3QkaW5zdGFuYzIuZGlzcGxheU5hbWUsXG4gICAgICAgIG93bmVySUQgPSBfdHJlZVNuYXBzaG90JGluc3RhbmMyLm93bmVySUQ7XG5cbiAgICB2YXIgb3duZXIgPSB0cmVlU25hcHNob3Rbb3duZXJJRF07XG4gICAgdmFyIGtleSA9IChvd25lciA/IG93bmVyLmRpc3BsYXlOYW1lICsgJyA+ICcgOiAnJykgKyBkaXNwbGF5TmFtZTtcbiAgICB2YXIgc3RhdHMgPSBhZ2dyZWdhdGVkU3RhdHNba2V5XTtcbiAgICBpZiAoIXN0YXRzKSB7XG4gICAgICBhZmZlY3RlZElEc1trZXldID0ge307XG4gICAgICBzdGF0cyA9IGFnZ3JlZ2F0ZWRTdGF0c1trZXldID0ge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaW5zdGFuY2VDb3VudDogMCxcbiAgICAgICAgaW5jbHVzaXZlUmVuZGVyRHVyYXRpb246IDAsXG4gICAgICAgIHJlbmRlckNvdW50OiAwXG4gICAgICB9O1xuICAgIH1cbiAgICBhZmZlY3RlZElEc1trZXldW2luc3RhbmNlSURdID0gdHJ1ZTtcbiAgICBhcHBseVVwZGF0ZShzdGF0cyk7XG4gIH1cblxuICBmbHVzaEhpc3RvcnkuZm9yRWFjaChmdW5jdGlvbiAoZmx1c2gpIHtcbiAgICB2YXIgbWVhc3VyZW1lbnRzID0gZmx1c2gubWVhc3VyZW1lbnRzLFxuICAgICAgICB0cmVlU25hcHNob3QgPSBmbHVzaC50cmVlU25hcHNob3QsXG4gICAgICAgIG9wZXJhdGlvbnMgPSBmbHVzaC5vcGVyYXRpb25zO1xuXG4gICAgdmFyIGlzRGVmaW5pdGVseU5vdFdhc3RlZEJ5SUQgPSB7fTtcblxuICAgIC8vIEZpbmQgaG9zdCBjb21wb25lbnRzIGFzc29jaWF0ZWQgd2l0aCBhbiBvcGVyYXRpb24gaW4gdGhpcyBiYXRjaC5cbiAgICAvLyBNYXJrIGFsbCBjb21wb25lbnRzIGluIHRoZWlyIHBhcmVudCB0cmVlIGFzIGRlZmluaXRlbHkgbm90IHdhc3RlZC5cbiAgICBvcGVyYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgICAgdmFyIGluc3RhbmNlSUQgPSBvcGVyYXRpb24uaW5zdGFuY2VJRDtcblxuICAgICAgdmFyIG5leHRQYXJlbnRJRCA9IGluc3RhbmNlSUQ7XG4gICAgICB3aGlsZSAobmV4dFBhcmVudElEKSB7XG4gICAgICAgIGlzRGVmaW5pdGVseU5vdFdhc3RlZEJ5SURbbmV4dFBhcmVudElEXSA9IHRydWU7XG4gICAgICAgIG5leHRQYXJlbnRJRCA9IHRyZWVTbmFwc2hvdFtuZXh0UGFyZW50SURdLnBhcmVudElEO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRmluZCBjb21wb3NpdGUgY29tcG9uZW50cyB0aGF0IHJlbmRlcmVkIGluIHRoaXMgYmF0Y2guXG4gICAgLy8gVGhlc2UgYXJlIHBvdGVudGlhbCBjYW5kaWRhdGVzIGZvciBiZWluZyB3YXN0ZWQgcmVuZGVycy5cbiAgICB2YXIgcmVuZGVyZWRDb21wb3NpdGVJRHMgPSB7fTtcbiAgICBtZWFzdXJlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAobWVhc3VyZW1lbnQpIHtcbiAgICAgIHZhciBpbnN0YW5jZUlEID0gbWVhc3VyZW1lbnQuaW5zdGFuY2VJRCxcbiAgICAgICAgICB0aW1lclR5cGUgPSBtZWFzdXJlbWVudC50aW1lclR5cGU7XG5cbiAgICAgIGlmICh0aW1lclR5cGUgIT09ICdyZW5kZXInKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlbmRlcmVkQ29tcG9zaXRlSURzW2luc3RhbmNlSURdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIG1lYXN1cmVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtZWFzdXJlbWVudCkge1xuICAgICAgdmFyIGR1cmF0aW9uID0gbWVhc3VyZW1lbnQuZHVyYXRpb24sXG4gICAgICAgICAgaW5zdGFuY2VJRCA9IG1lYXN1cmVtZW50Lmluc3RhbmNlSUQsXG4gICAgICAgICAgdGltZXJUeXBlID0gbWVhc3VyZW1lbnQudGltZXJUeXBlO1xuXG4gICAgICBpZiAodGltZXJUeXBlICE9PSAncmVuZGVyJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZXJlIHdhcyBhIERPTSB1cGRhdGUgYmVsb3cgdGhpcyBjb21wb25lbnQsIG9yIGl0IGhhcyBqdXN0IGJlZW5cbiAgICAgIC8vIG1vdW50ZWQsIGl0cyByZW5kZXIoKSBpcyBub3QgY29uc2lkZXJlZCB3YXN0ZWQuXG4gICAgICB2YXIgdXBkYXRlQ291bnQgPSB0cmVlU25hcHNob3RbaW5zdGFuY2VJRF0udXBkYXRlQ291bnQ7XG5cbiAgICAgIGlmIChpc0RlZmluaXRlbHlOb3RXYXN0ZWRCeUlEW2luc3RhbmNlSURdIHx8IHVwZGF0ZUNvdW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgY29uc2lkZXIgdGhpcyByZW5kZXIoKSB3YXN0ZWQuXG4gICAgICB1cGRhdGVBZ2dyZWdhdGVkU3RhdHModHJlZVNuYXBzaG90LCBpbnN0YW5jZUlELCBmdW5jdGlvbiAoc3RhdHMpIHtcbiAgICAgICAgc3RhdHMucmVuZGVyQ291bnQrKztcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgbmV4dFBhcmVudElEID0gaW5zdGFuY2VJRDtcbiAgICAgIHdoaWxlIChuZXh0UGFyZW50SUQpIHtcbiAgICAgICAgLy8gQW55IHBhcmVudHMgcmVuZGVyZWQgZHVyaW5nIHRoaXMgYmF0Y2ggYXJlIGNvbnNpZGVyZWQgd2FzdGVkXG4gICAgICAgIC8vIHVubGVzcyB3ZSBwcmV2aW91c2x5IG1hcmtlZCB0aGVtIGFzIGRpcnR5LlxuICAgICAgICB2YXIgaXNXYXN0ZWQgPSByZW5kZXJlZENvbXBvc2l0ZUlEc1tuZXh0UGFyZW50SURdICYmICFpc0RlZmluaXRlbHlOb3RXYXN0ZWRCeUlEW25leHRQYXJlbnRJRF07XG4gICAgICAgIGlmIChpc1dhc3RlZCkge1xuICAgICAgICAgIHVwZGF0ZUFnZ3JlZ2F0ZWRTdGF0cyh0cmVlU25hcHNob3QsIG5leHRQYXJlbnRJRCwgZnVuY3Rpb24gKHN0YXRzKSB7XG4gICAgICAgICAgICBzdGF0cy5pbmNsdXNpdmVSZW5kZXJEdXJhdGlvbiArPSBkdXJhdGlvbjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0UGFyZW50SUQgPSB0cmVlU25hcHNob3RbbmV4dFBhcmVudElEXS5wYXJlbnRJRDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGFnZ3JlZ2F0ZWRTdGF0cykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGFnZ3JlZ2F0ZWRTdGF0c1trZXldLCB7XG4gICAgICBpbnN0YW5jZUNvdW50OiBPYmplY3Qua2V5cyhhZmZlY3RlZElEc1trZXldKS5sZW5ndGhcbiAgICB9KTtcbiAgfSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBiLmluY2x1c2l2ZVJlbmRlckR1cmF0aW9uIC0gYS5pbmNsdXNpdmVSZW5kZXJEdXJhdGlvbjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldE9wZXJhdGlvbnMoKSB7XG4gIHZhciBmbHVzaEhpc3RvcnkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldExhc3RNZWFzdXJlbWVudHMoKTtcblxuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgIHdhcm5JblByb2R1Y3Rpb24oKTtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgc3RhdHMgPSBbXTtcbiAgZmx1c2hIaXN0b3J5LmZvckVhY2goZnVuY3Rpb24gKGZsdXNoLCBmbHVzaEluZGV4KSB7XG4gICAgdmFyIG9wZXJhdGlvbnMgPSBmbHVzaC5vcGVyYXRpb25zLFxuICAgICAgICB0cmVlU25hcHNob3QgPSBmbHVzaC50cmVlU25hcHNob3Q7XG5cbiAgICBvcGVyYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgICAgdmFyIGluc3RhbmNlSUQgPSBvcGVyYXRpb24uaW5zdGFuY2VJRCxcbiAgICAgICAgICB0eXBlID0gb3BlcmF0aW9uLnR5cGUsXG4gICAgICAgICAgcGF5bG9hZCA9IG9wZXJhdGlvbi5wYXlsb2FkO1xuICAgICAgdmFyIF90cmVlU25hcHNob3QkaW5zdGFuYzMgPSB0cmVlU25hcHNob3RbaW5zdGFuY2VJRF0sXG4gICAgICAgICAgZGlzcGxheU5hbWUgPSBfdHJlZVNuYXBzaG90JGluc3RhbmMzLmRpc3BsYXlOYW1lLFxuICAgICAgICAgIG93bmVySUQgPSBfdHJlZVNuYXBzaG90JGluc3RhbmMzLm93bmVySUQ7XG5cbiAgICAgIHZhciBvd25lciA9IHRyZWVTbmFwc2hvdFtvd25lcklEXTtcbiAgICAgIHZhciBrZXkgPSAob3duZXIgPyBvd25lci5kaXNwbGF5TmFtZSArICcgPiAnIDogJycpICsgZGlzcGxheU5hbWU7XG5cbiAgICAgIHN0YXRzLnB1c2goe1xuICAgICAgICBmbHVzaEluZGV4OiBmbHVzaEluZGV4LFxuICAgICAgICBpbnN0YW5jZUlEOiBpbnN0YW5jZUlELFxuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgb3duZXJJRDogb3duZXJJRCxcbiAgICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gc3RhdHM7XG59XG5cbmZ1bmN0aW9uIHByaW50RXhjbHVzaXZlKGZsdXNoSGlzdG9yeSkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgIHdhcm5JblByb2R1Y3Rpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3RhdHMgPSBnZXRFeGNsdXNpdmUoZmx1c2hIaXN0b3J5KTtcbiAgdmFyIHRhYmxlID0gc3RhdHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGtleSA9IGl0ZW0ua2V5LFxuICAgICAgICBpbnN0YW5jZUNvdW50ID0gaXRlbS5pbnN0YW5jZUNvdW50LFxuICAgICAgICB0b3RhbER1cmF0aW9uID0gaXRlbS50b3RhbER1cmF0aW9uO1xuXG4gICAgdmFyIHJlbmRlckNvdW50ID0gaXRlbS5jb3VudHMucmVuZGVyIHx8IDA7XG4gICAgdmFyIHJlbmRlckR1cmF0aW9uID0gaXRlbS5kdXJhdGlvbnMucmVuZGVyIHx8IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgICdDb21wb25lbnQnOiBrZXksXG4gICAgICAnVG90YWwgdGltZSAobXMpJzogcm91bmRGbG9hdCh0b3RhbER1cmF0aW9uKSxcbiAgICAgICdJbnN0YW5jZSBjb3VudCc6IGluc3RhbmNlQ291bnQsXG4gICAgICAnVG90YWwgcmVuZGVyIHRpbWUgKG1zKSc6IHJvdW5kRmxvYXQocmVuZGVyRHVyYXRpb24pLFxuICAgICAgJ0F2ZXJhZ2UgcmVuZGVyIHRpbWUgKG1zKSc6IHJlbmRlckNvdW50ID8gcm91bmRGbG9hdChyZW5kZXJEdXJhdGlvbiAvIHJlbmRlckNvdW50KSA6IHVuZGVmaW5lZCxcbiAgICAgICdSZW5kZXIgY291bnQnOiByZW5kZXJDb3VudCxcbiAgICAgICdUb3RhbCBsaWZlY3ljbGUgdGltZSAobXMpJzogcm91bmRGbG9hdCh0b3RhbER1cmF0aW9uIC0gcmVuZGVyRHVyYXRpb24pXG4gICAgfTtcbiAgfSk7XG4gIGNvbnNvbGVUYWJsZSh0YWJsZSk7XG59XG5cbmZ1bmN0aW9uIHByaW50SW5jbHVzaXZlKGZsdXNoSGlzdG9yeSkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgIHdhcm5JblByb2R1Y3Rpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3RhdHMgPSBnZXRJbmNsdXNpdmUoZmx1c2hIaXN0b3J5KTtcbiAgdmFyIHRhYmxlID0gc3RhdHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGtleSA9IGl0ZW0ua2V5LFxuICAgICAgICBpbnN0YW5jZUNvdW50ID0gaXRlbS5pbnN0YW5jZUNvdW50LFxuICAgICAgICBpbmNsdXNpdmVSZW5kZXJEdXJhdGlvbiA9IGl0ZW0uaW5jbHVzaXZlUmVuZGVyRHVyYXRpb24sXG4gICAgICAgIHJlbmRlckNvdW50ID0gaXRlbS5yZW5kZXJDb3VudDtcblxuICAgIHJldHVybiB7XG4gICAgICAnT3duZXIgPiBDb21wb25lbnQnOiBrZXksXG4gICAgICAnSW5jbHVzaXZlIHJlbmRlciB0aW1lIChtcyknOiByb3VuZEZsb2F0KGluY2x1c2l2ZVJlbmRlckR1cmF0aW9uKSxcbiAgICAgICdJbnN0YW5jZSBjb3VudCc6IGluc3RhbmNlQ291bnQsXG4gICAgICAnUmVuZGVyIGNvdW50JzogcmVuZGVyQ291bnRcbiAgICB9O1xuICB9KTtcbiAgY29uc29sZVRhYmxlKHRhYmxlKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRXYXN0ZWQoZmx1c2hIaXN0b3J5KSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgd2FybkluUHJvZHVjdGlvbigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzdGF0cyA9IGdldFdhc3RlZChmbHVzaEhpc3RvcnkpO1xuICB2YXIgdGFibGUgPSBzdGF0cy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB2YXIga2V5ID0gaXRlbS5rZXksXG4gICAgICAgIGluc3RhbmNlQ291bnQgPSBpdGVtLmluc3RhbmNlQ291bnQsXG4gICAgICAgIGluY2x1c2l2ZVJlbmRlckR1cmF0aW9uID0gaXRlbS5pbmNsdXNpdmVSZW5kZXJEdXJhdGlvbixcbiAgICAgICAgcmVuZGVyQ291bnQgPSBpdGVtLnJlbmRlckNvdW50O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICdPd25lciA+IENvbXBvbmVudCc6IGtleSxcbiAgICAgICdJbmNsdXNpdmUgd2FzdGVkIHRpbWUgKG1zKSc6IHJvdW5kRmxvYXQoaW5jbHVzaXZlUmVuZGVyRHVyYXRpb24pLFxuICAgICAgJ0luc3RhbmNlIGNvdW50JzogaW5zdGFuY2VDb3VudCxcbiAgICAgICdSZW5kZXIgY291bnQnOiByZW5kZXJDb3VudFxuICAgIH07XG4gIH0pO1xuICBjb25zb2xlVGFibGUodGFibGUpO1xufVxuXG5mdW5jdGlvbiBwcmludE9wZXJhdGlvbnMoZmx1c2hIaXN0b3J5KSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgd2FybkluUHJvZHVjdGlvbigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzdGF0cyA9IGdldE9wZXJhdGlvbnMoZmx1c2hIaXN0b3J5KTtcbiAgdmFyIHRhYmxlID0gc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdPd25lciA+IE5vZGUnOiBzdGF0LmtleSxcbiAgICAgICdPcGVyYXRpb24nOiBzdGF0LnR5cGUsXG4gICAgICAnUGF5bG9hZCc6IHR5cGVvZiBzdGF0LnBheWxvYWQgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoc3RhdC5wYXlsb2FkKSA6IHN0YXQucGF5bG9hZCxcbiAgICAgICdGbHVzaCBpbmRleCc6IHN0YXQuZmx1c2hJbmRleCxcbiAgICAgICdPd25lciBDb21wb25lbnQgSUQnOiBzdGF0Lm93bmVySUQsXG4gICAgICAnRE9NIENvbXBvbmVudCBJRCc6IHN0YXQuaW5zdGFuY2VJRFxuICAgIH07XG4gIH0pO1xuICBjb25zb2xlVGFibGUodGFibGUpO1xufVxuXG52YXIgd2FybmVkQWJvdXRQcmludERPTSA9IGZhbHNlO1xuZnVuY3Rpb24gcHJpbnRET00obWVhc3VyZW1lbnRzKSB7XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHdhcm5lZEFib3V0UHJpbnRET00sICdgUmVhY3RQZXJmLnByaW50RE9NKC4uLilgIGlzIGRlcHJlY2F0ZWQuIFVzZSAnICsgJ2BSZWFjdFBlcmYucHJpbnRPcGVyYXRpb25zKC4uLilgIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gIHdhcm5lZEFib3V0UHJpbnRET00gPSB0cnVlO1xuICByZXR1cm4gcHJpbnRPcGVyYXRpb25zKG1lYXN1cmVtZW50cyk7XG59XG5cbnZhciB3YXJuZWRBYm91dEdldE1lYXN1cmVtZW50c1N1bW1hcnlNYXAgPSBmYWxzZTtcbmZ1bmN0aW9uIGdldE1lYXN1cmVtZW50c1N1bW1hcnlNYXAobWVhc3VyZW1lbnRzKSB7XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHdhcm5lZEFib3V0R2V0TWVhc3VyZW1lbnRzU3VtbWFyeU1hcCwgJ2BSZWFjdFBlcmYuZ2V0TWVhc3VyZW1lbnRzU3VtbWFyeU1hcCguLi4pYCBpcyBkZXByZWNhdGVkLiBVc2UgJyArICdgUmVhY3RQZXJmLmdldFdhc3RlZCguLi4pYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICB3YXJuZWRBYm91dEdldE1lYXN1cmVtZW50c1N1bW1hcnlNYXAgPSB0cnVlO1xuICByZXR1cm4gZ2V0V2FzdGVkKG1lYXN1cmVtZW50cyk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgIHdhcm5JblByb2R1Y3Rpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBSZWFjdERlYnVnVG9vbC5iZWdpblByb2ZpbGluZygpO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgIHdhcm5JblByb2R1Y3Rpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBSZWFjdERlYnVnVG9vbC5lbmRQcm9maWxpbmcoKTtcbn1cblxuZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgIHdhcm5JblByb2R1Y3Rpb24oKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gUmVhY3REZWJ1Z1Rvb2wuaXNQcm9maWxpbmcoKTtcbn1cblxudmFyIFJlYWN0UGVyZkFuYWx5c2lzID0ge1xuICBnZXRMYXN0TWVhc3VyZW1lbnRzOiBnZXRMYXN0TWVhc3VyZW1lbnRzLFxuICBnZXRFeGNsdXNpdmU6IGdldEV4Y2x1c2l2ZSxcbiAgZ2V0SW5jbHVzaXZlOiBnZXRJbmNsdXNpdmUsXG4gIGdldFdhc3RlZDogZ2V0V2FzdGVkLFxuICBnZXRPcGVyYXRpb25zOiBnZXRPcGVyYXRpb25zLFxuICBwcmludEV4Y2x1c2l2ZTogcHJpbnRFeGNsdXNpdmUsXG4gIHByaW50SW5jbHVzaXZlOiBwcmludEluY2x1c2l2ZSxcbiAgcHJpbnRXYXN0ZWQ6IHByaW50V2FzdGVkLFxuICBwcmludE9wZXJhdGlvbnM6IHByaW50T3BlcmF0aW9ucyxcbiAgc3RhcnQ6IHN0YXJ0LFxuICBzdG9wOiBzdG9wLFxuICBpc1J1bm5pbmc6IGlzUnVubmluZyxcbiAgLy8gRGVwcmVjYXRlZDpcbiAgcHJpbnRET006IHByaW50RE9NLFxuICBnZXRNZWFzdXJlbWVudHNTdW1tYXJ5TWFwOiBnZXRNZWFzdXJlbWVudHNTdW1tYXJ5TWFwXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UGVyZkFuYWx5c2lzOyJdfQ==