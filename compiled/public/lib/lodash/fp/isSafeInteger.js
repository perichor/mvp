'use strict';

var convert = require('./convert'),
    func = convert('isSafeInteger', require('../isSafeInteger'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZwL2lzU2FmZUludGVnZXIuanMiXSwibmFtZXMiOlsiY29udmVydCIsInJlcXVpcmUiLCJmdW5jIiwicGxhY2Vob2xkZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFVBQVVDLFFBQVEsV0FBUixDQUFkO0FBQUEsSUFDSUMsT0FBT0YsUUFBUSxlQUFSLEVBQXlCQyxRQUFRLGtCQUFSLENBQXpCLEVBQXNEQSxRQUFRLGlCQUFSLENBQXRELENBRFg7O0FBR0FDLEtBQUtDLFdBQUwsR0FBbUJGLFFBQVEsZUFBUixDQUFuQjtBQUNBRyxPQUFPQyxPQUFQLEdBQWlCSCxJQUFqQiIsImZpbGUiOiJpc1NhZmVJbnRlZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbnZlcnQgPSByZXF1aXJlKCcuL2NvbnZlcnQnKSxcbiAgICBmdW5jID0gY29udmVydCgnaXNTYWZlSW50ZWdlcicsIHJlcXVpcmUoJy4uL2lzU2FmZUludGVnZXInKSwgcmVxdWlyZSgnLi9fZmFsc2VPcHRpb25zJykpO1xuXG5mdW5jLnBsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9wbGFjZWhvbGRlcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jO1xuIl19