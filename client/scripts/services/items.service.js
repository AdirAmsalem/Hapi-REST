Hapi.factory('items', ['resource', function(resource) {

	// Storage
	var itemsResource;

	// Publish API
	return {
		/**
		 * Set the resource's endpoint
		 * 
		 * @param {String} endpoint
		 */
		setEndpoint: function(endpoint) {
			itemsResource = resource(endpoint + '/:itemId', { itemId: '@id' });
		},
		/**
		 * Get all items or a specific item by its id
		 * 
		 * @param  {String} itemId (Optional)
		 * @return {Object} result (Promise)
		 */
		get: function(itemId) {
			return itemsResource.get({ itemId: itemId }).$promise;
		}
	}
}]);