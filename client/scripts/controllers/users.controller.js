Hapi.controller('UsersController', ['$scope', '$routeParams', 'users', function($scope, $routeParams, users) {

	// Check if there's a user id
	if ($routeParams.userId) {
		// Get a specific user
		users.getById($routeParams.userId).then( function(user) {
			$scope.user = user;
		});
	} else {
		// Get all users
		users.getAll().then( function(data) {
			$scope.users = data;
		});
	}

}]);