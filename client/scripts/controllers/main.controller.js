Hapi.controller('MainController', ['$scope', 'resource', function($scope, resource) {

	// Get Top-Level actions
	resource('actions').get().$promise.then( function(actions) {
		$scope.actions = actions.result;
	});
}]);