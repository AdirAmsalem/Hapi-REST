Hapi.controller('ItemsController', ['$scope', '$location', '$routeParams', 'endpoints', 'items', function($scope, $location, $routeParams, endpoints, items) {

	// Make sure we have an endpoint
	if (!$routeParams.endpoint) return;

	/**
	 * Converts field names to labels
	 * 
	 * @param  {String} fieldName
	 * @return {String} label
	 */
	$scope.fieldNameToLabel = function(fieldName) {
		if (!fieldName) return;

		switch (fieldName) {
			case '_id':
				return 'ID';
			default:
				return fieldName;
		}
	};

	/**
	 * Initialize an endpoint
	 * 
	 * @param  {Object} endpoint (name, url)
	 */
	function init(endpoint) {
		// Set the endpoint
		$scope.endpoint = endpoint;
		items.setEndpoint(endpoint.url);

		// Check if there's an item id
		if ($routeParams.itemId) {
			// Get a specific item
			items.get($routeParams.itemId).then( function(data) {
				$scope.identifier = data.identifier;
				$scope.item = data.result;
			}, function() {
				// Return to item list if we failed to get a specific item
				$location.path($routeParams.endpoint);
			});
		} else {
			// Get all items
			items.get().then( function(data) {
				$scope.identifier = data.identifier;
				$scope.items = data.result;
			});
		}
	}

	/**
	 * Handle invalid endpoint
	 */
	function handleError() {
		$location.path('/');
	}

	// Get endpoint details and initialize
	endpoints.getByUrl($routeParams.endpoint).then(init, handleError);
}]);