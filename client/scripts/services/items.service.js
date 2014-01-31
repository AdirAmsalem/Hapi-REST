Hapi.factory('items', ['resource', function(resource) {

	// Storage
	var itemsResource;

	// Public methods
	var methods = {
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
			console.log(itemsResource.get({ itemId: itemId }))
			return itemsResource.get({ itemId: itemId }).$promise;
		}
	};

	// Publish API
	return methods;
}]);