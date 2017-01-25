"use strict";

define(function () {

	"use strict";

	/**
  * Determines whether an object can have data
  */

	return function (owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9kYXRhL3Zhci9hY2NlcHREYXRhLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsIm93bmVyIiwibm9kZVR5cGUiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQVEsWUFBVzs7QUFFbkI7O0FBRUE7Ozs7QUFHQSxRQUFPLFVBQVVDLEtBQVYsRUFBa0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQU9BLE1BQU1DLFFBQU4sS0FBbUIsQ0FBbkIsSUFBd0JELE1BQU1DLFFBQU4sS0FBbUIsQ0FBM0MsSUFBZ0QsQ0FBRyxDQUFDRCxNQUFNQyxRQUFqRTtBQUNBLEVBVEQ7QUFXQyxDQWxCRCIsImZpbGUiOiJhY2NlcHREYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGFuIG9iamVjdCBjYW4gaGF2ZSBkYXRhXG4gKi9cbnJldHVybiBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0Ly8gQWNjZXB0cyBvbmx5OlxuXHQvLyAgLSBOb2RlXG5cdC8vICAgIC0gTm9kZS5FTEVNRU5UX05PREVcblx0Ly8gICAgLSBOb2RlLkRPQ1VNRU5UX05PREVcblx0Ly8gIC0gT2JqZWN0XG5cdC8vICAgIC0gQW55XG5cdHJldHVybiBvd25lci5ub2RlVHlwZSA9PT0gMSB8fCBvd25lci5ub2RlVHlwZSA9PT0gOSB8fCAhKCArb3duZXIubm9kZVR5cGUgKTtcbn07XG5cbn0gKTtcbiJdfQ==