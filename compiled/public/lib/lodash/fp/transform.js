'use strict';

var convert = require('./convert'),
    func = convert('transform', require('../transform'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZwL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6WyJjb252ZXJ0IiwicmVxdWlyZSIsImZ1bmMiLCJwbGFjZWhvbGRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsVUFBVUMsUUFBUSxXQUFSLENBQWQ7QUFBQSxJQUNJQyxPQUFPRixRQUFRLFdBQVIsRUFBcUJDLFFBQVEsY0FBUixDQUFyQixDQURYOztBQUdBQyxLQUFLQyxXQUFMLEdBQW1CRixRQUFRLGVBQVIsQ0FBbkI7QUFDQUcsT0FBT0MsT0FBUCxHQUFpQkgsSUFBakIiLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbnZlcnQgPSByZXF1aXJlKCcuL2NvbnZlcnQnKSxcbiAgICBmdW5jID0gY29udmVydCgndHJhbnNmb3JtJywgcmVxdWlyZSgnLi4vdHJhbnNmb3JtJykpO1xuXG5mdW5jLnBsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9wbGFjZWhvbGRlcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jO1xuIl19