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

var ReactNodeTypes = require('./ReactNodeTypes');

function getHostComponentFromComposite(inst) {
  var type;

  while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
    inst = inst._renderedComponent;
  }

  if (type === ReactNodeTypes.HOST) {
    return inst._renderedComponent;
  } else if (type === ReactNodeTypes.EMPTY) {
    return null;
  }
}

module.exports = getHostComponentFromComposite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9nZXRIb3N0Q29tcG9uZW50RnJvbUNvbXBvc2l0ZS5qcyJdLCJuYW1lcyI6WyJSZWFjdE5vZGVUeXBlcyIsInJlcXVpcmUiLCJnZXRIb3N0Q29tcG9uZW50RnJvbUNvbXBvc2l0ZSIsImluc3QiLCJ0eXBlIiwiX3JlbmRlcmVkTm9kZVR5cGUiLCJDT01QT1NJVEUiLCJfcmVuZGVyZWRDb21wb25lbnQiLCJIT1NUIiwiRU1QVFkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLGlCQUFpQkMsUUFBUSxrQkFBUixDQUFyQjs7QUFFQSxTQUFTQyw2QkFBVCxDQUF1Q0MsSUFBdkMsRUFBNkM7QUFDM0MsTUFBSUMsSUFBSjs7QUFFQSxTQUFPLENBQUNBLE9BQU9ELEtBQUtFLGlCQUFiLE1BQW9DTCxlQUFlTSxTQUExRCxFQUFxRTtBQUNuRUgsV0FBT0EsS0FBS0ksa0JBQVo7QUFDRDs7QUFFRCxNQUFJSCxTQUFTSixlQUFlUSxJQUE1QixFQUFrQztBQUNoQyxXQUFPTCxLQUFLSSxrQkFBWjtBQUNELEdBRkQsTUFFTyxJQUFJSCxTQUFTSixlQUFlUyxLQUE1QixFQUFtQztBQUN4QyxXQUFPLElBQVA7QUFDRDtBQUNGOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCVCw2QkFBakIiLCJmaWxlIjoiZ2V0SG9zdENvbXBvbmVudEZyb21Db21wb3NpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3ROb2RlVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0Tm9kZVR5cGVzJyk7XG5cbmZ1bmN0aW9uIGdldEhvc3RDb21wb25lbnRGcm9tQ29tcG9zaXRlKGluc3QpIHtcbiAgdmFyIHR5cGU7XG5cbiAgd2hpbGUgKCh0eXBlID0gaW5zdC5fcmVuZGVyZWROb2RlVHlwZSkgPT09IFJlYWN0Tm9kZVR5cGVzLkNPTVBPU0lURSkge1xuICAgIGluc3QgPSBpbnN0Ll9yZW5kZXJlZENvbXBvbmVudDtcbiAgfVxuXG4gIGlmICh0eXBlID09PSBSZWFjdE5vZGVUeXBlcy5IT1NUKSB7XG4gICAgcmV0dXJuIGluc3QuX3JlbmRlcmVkQ29tcG9uZW50O1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFJlYWN0Tm9kZVR5cGVzLkVNUFRZKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRIb3N0Q29tcG9uZW50RnJvbUNvbXBvc2l0ZTsiXX0=