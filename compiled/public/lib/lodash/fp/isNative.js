'use strict';

var convert = require('./convert'),
    func = convert('isNative', require('../isNative'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZwL2lzTmF0aXZlLmpzIl0sIm5hbWVzIjpbImNvbnZlcnQiLCJyZXF1aXJlIiwiZnVuYyIsInBsYWNlaG9sZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxVQUFVQyxRQUFRLFdBQVIsQ0FBZDtBQUFBLElBQ0lDLE9BQU9GLFFBQVEsVUFBUixFQUFvQkMsUUFBUSxhQUFSLENBQXBCLEVBQTRDQSxRQUFRLGlCQUFSLENBQTVDLENBRFg7O0FBR0FDLEtBQUtDLFdBQUwsR0FBbUJGLFFBQVEsZUFBUixDQUFuQjtBQUNBRyxPQUFPQyxPQUFQLEdBQWlCSCxJQUFqQiIsImZpbGUiOiJpc05hdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb252ZXJ0ID0gcmVxdWlyZSgnLi9jb252ZXJ0JyksXG4gICAgZnVuYyA9IGNvbnZlcnQoJ2lzTmF0aXZlJywgcmVxdWlyZSgnLi4vaXNOYXRpdmUnKSwgcmVxdWlyZSgnLi9fZmFsc2VPcHRpb25zJykpO1xuXG5mdW5jLnBsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9wbGFjZWhvbGRlcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jO1xuIl19