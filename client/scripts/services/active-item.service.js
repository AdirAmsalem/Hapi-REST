Hapi.factory('activeItem', function() {

	var items = [];
	var activeItem = 0;

	// Public methods
	var methods = {
		/**
		 * Set the items array
		 * 
		 * @param {Array} data
		 */
		setItems: function(data) {
			// Temporary solution to keep track the previous items if we don't overwrite them
			// It Checks if the first and the last items of both arrays having the same ids
			if (items[0] && data[0] && items[0]._id === data[0]._id && items[items.length-1]._id === data[data.length-1]._id) {
				return items;
			}

			activeItem = 0;
			items = data;

			return items;
		},
		/**
		 * Get the current active item
		 * 
		 * @return {Number} activeItem
		 */
		get: function() {
			return activeItem;
		},
		/**
		 * Select the previous item
		 * 
		 * @return {Number} activeItem
		 */
		previous: function() {
			if (activeItem === 0) {
				return activeItem;
			}

			return --activeItem;
		},
		/**
		 * Select the next item
		 * 
		 * @return {Number} activeItem
		 */
		next: function() {
			if (activeItem === (items.length - 1)) {
				return activeItem;
			}

			return ++activeItem;
		}
	};

	// Publish API
	return methods;
});