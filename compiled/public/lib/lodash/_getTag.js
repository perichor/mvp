'use strict';

var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function getTag(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString:
                    return dataViewTag;
                case mapCtorString:
                    return mapTag;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag;
                case weakMapCtorString:
                    return weakMapTag;
            }
        }
        return result;
    };
}

module.exports = getTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19nZXRUYWcuanMiXSwibmFtZXMiOlsiRGF0YVZpZXciLCJyZXF1aXJlIiwiTWFwIiwiUHJvbWlzZSIsIlNldCIsIldlYWtNYXAiLCJiYXNlR2V0VGFnIiwidG9Tb3VyY2UiLCJtYXBUYWciLCJvYmplY3RUYWciLCJwcm9taXNlVGFnIiwic2V0VGFnIiwid2Vha01hcFRhZyIsImRhdGFWaWV3VGFnIiwiZGF0YVZpZXdDdG9yU3RyaW5nIiwibWFwQ3RvclN0cmluZyIsInByb21pc2VDdG9yU3RyaW5nIiwic2V0Q3RvclN0cmluZyIsIndlYWtNYXBDdG9yU3RyaW5nIiwiZ2V0VGFnIiwiQXJyYXlCdWZmZXIiLCJyZXNvbHZlIiwidmFsdWUiLCJyZXN1bHQiLCJDdG9yIiwiY29uc3RydWN0b3IiLCJ1bmRlZmluZWQiLCJjdG9yU3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLE1BQU1ELFFBQVEsUUFBUixDQURWO0FBQUEsSUFFSUUsVUFBVUYsUUFBUSxZQUFSLENBRmQ7QUFBQSxJQUdJRyxNQUFNSCxRQUFRLFFBQVIsQ0FIVjtBQUFBLElBSUlJLFVBQVVKLFFBQVEsWUFBUixDQUpkO0FBQUEsSUFLSUssYUFBYUwsUUFBUSxlQUFSLENBTGpCO0FBQUEsSUFNSU0sV0FBV04sUUFBUSxhQUFSLENBTmY7O0FBUUE7QUFDQSxJQUFJTyxTQUFTLGNBQWI7QUFBQSxJQUNJQyxZQUFZLGlCQURoQjtBQUFBLElBRUlDLGFBQWEsa0JBRmpCO0FBQUEsSUFHSUMsU0FBUyxjQUhiO0FBQUEsSUFJSUMsYUFBYSxrQkFKakI7O0FBTUEsSUFBSUMsY0FBYyxtQkFBbEI7O0FBRUE7QUFDQSxJQUFJQyxxQkFBcUJQLFNBQVNQLFFBQVQsQ0FBekI7QUFBQSxJQUNJZSxnQkFBZ0JSLFNBQVNMLEdBQVQsQ0FEcEI7QUFBQSxJQUVJYyxvQkFBb0JULFNBQVNKLE9BQVQsQ0FGeEI7QUFBQSxJQUdJYyxnQkFBZ0JWLFNBQVNILEdBQVQsQ0FIcEI7QUFBQSxJQUlJYyxvQkFBb0JYLFNBQVNGLE9BQVQsQ0FKeEI7O0FBTUE7Ozs7Ozs7QUFPQSxJQUFJYyxTQUFTYixVQUFiOztBQUVBO0FBQ0EsSUFBS04sWUFBWW1CLE9BQU8sSUFBSW5CLFFBQUosQ0FBYSxJQUFJb0IsV0FBSixDQUFnQixDQUFoQixDQUFiLENBQVAsS0FBNENQLFdBQXpELElBQ0NYLE9BQU9pQixPQUFPLElBQUlqQixHQUFKLEVBQVAsS0FBbUJNLE1BRDNCLElBRUNMLFdBQVdnQixPQUFPaEIsUUFBUWtCLE9BQVIsRUFBUCxLQUE2QlgsVUFGekMsSUFHQ04sT0FBT2UsT0FBTyxJQUFJZixHQUFKLEVBQVAsS0FBbUJPLE1BSDNCLElBSUNOLFdBQVdjLE9BQU8sSUFBSWQsT0FBSixFQUFQLEtBQXVCTyxVQUp2QyxFQUlvRDtBQUNsRE8sYUFBUyxnQkFBU0csS0FBVCxFQUFnQjtBQUN2QixZQUFJQyxTQUFTakIsV0FBV2dCLEtBQVgsQ0FBYjtBQUFBLFlBQ0lFLE9BQU9ELFVBQVVkLFNBQVYsR0FBc0JhLE1BQU1HLFdBQTVCLEdBQTBDQyxTQURyRDtBQUFBLFlBRUlDLGFBQWFILE9BQU9qQixTQUFTaUIsSUFBVCxDQUFQLEdBQXdCLEVBRnpDOztBQUlBLFlBQUlHLFVBQUosRUFBZ0I7QUFDZCxvQkFBUUEsVUFBUjtBQUNFLHFCQUFLYixrQkFBTDtBQUF5QiwyQkFBT0QsV0FBUDtBQUN6QixxQkFBS0UsYUFBTDtBQUFvQiwyQkFBT1AsTUFBUDtBQUNwQixxQkFBS1EsaUJBQUw7QUFBd0IsMkJBQU9OLFVBQVA7QUFDeEIscUJBQUtPLGFBQUw7QUFBb0IsMkJBQU9OLE1BQVA7QUFDcEIscUJBQUtPLGlCQUFMO0FBQXdCLDJCQUFPTixVQUFQO0FBTDFCO0FBT0Q7QUFDRCxlQUFPVyxNQUFQO0FBQ0QsS0FmRDtBQWdCRDs7QUFFREssT0FBT0MsT0FBUCxHQUFpQlYsTUFBakIiLCJmaWxlIjoiX2dldFRhZy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhZztcbiJdfQ==