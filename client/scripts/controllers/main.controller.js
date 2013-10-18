Hapi.controller('MainController', ['$scope', 'resource', function($scope, resource) {

	// Get Top-Level actions
	resource('actions').getAll().$promise.then( function(actions) {
		$scope.actions = actions;
	});
}]);