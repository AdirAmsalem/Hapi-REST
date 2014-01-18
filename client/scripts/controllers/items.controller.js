Hapi.controller('ItemsController', ['$scope', '$location', '$routeParams', 'items', function($scope, $location, $routeParams, items) {

	// Make sure we have an endpoint
	if (!$routeParams.endpoint) return;

	// Once we have the actions list - search for this endpoint
	// TODO: Consider moving this to a service
	$scope.$watch('actions', function(actions) {
		if (actions === undefined) return;

		var found;

		// Iterate over the actions
		actions.some( function(action) {
			// If we have a match - initialize the endpoint and stop the iteration
			if (action.url === $routeParams.endpoint) {
				init(action);
				return found = true;
			}
		});

		// Otherwise - return to the main page
		if (!found) {
			$location.path('/');
		}
	});

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
			});
		} else {
			// Get all items
			items.get().then( function(data) {
				$scope.identifier = data.identifier;
				$scope.items = data.result;
			});
		}
	}
}]);