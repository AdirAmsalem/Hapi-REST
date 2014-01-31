Hapi.controller('MainController', function($scope, endpoints) {

	// Get Top-Level endpoints
	endpoints.getEndpoints().then( function(result) {
		$scope.endpoints = result;
	});
});