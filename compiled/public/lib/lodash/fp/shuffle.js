'use strict';

var convert = require('./convert'),
    func = convert('shuffle', require('../shuffle'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZwL3NodWZmbGUuanMiXSwibmFtZXMiOlsiY29udmVydCIsInJlcXVpcmUiLCJmdW5jIiwicGxhY2Vob2xkZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFVBQVVDLFFBQVEsV0FBUixDQUFkO0FBQUEsSUFDSUMsT0FBT0YsUUFBUSxTQUFSLEVBQW1CQyxRQUFRLFlBQVIsQ0FBbkIsRUFBMENBLFFBQVEsaUJBQVIsQ0FBMUMsQ0FEWDs7QUFHQUMsS0FBS0MsV0FBTCxHQUFtQkYsUUFBUSxlQUFSLENBQW5CO0FBQ0FHLE9BQU9DLE9BQVAsR0FBaUJILElBQWpCIiwiZmlsZSI6InNodWZmbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29udmVydCA9IHJlcXVpcmUoJy4vY29udmVydCcpLFxuICAgIGZ1bmMgPSBjb252ZXJ0KCdzaHVmZmxlJywgcmVxdWlyZSgnLi4vc2h1ZmZsZScpLCByZXF1aXJlKCcuL19mYWxzZU9wdGlvbnMnKSk7XG5cbmZ1bmMucGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmM7XG4iXX0=