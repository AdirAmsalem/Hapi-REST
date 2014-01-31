Hapi.controller('EndpointsController', function($scope, endpoints, activeItem) {

	// Get Top-Level endpoints
	endpoints.getEndpoints().then( function(result) {
		$scope.endpoints = result;

		// Set the items for the activeItem service
		activeItem.setItems($scope.endpoints);
	});

	/**
	 * Go to the selected item
	 */
	$scope.gotoItem = function() {
		var activeItemIndex = activeItem.get();
		$scope.setPath($scope.endpoints[activeItemIndex].url);
	};
});