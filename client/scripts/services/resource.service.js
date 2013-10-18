Hapi.factory('resource', ['$resource', function($resource) {

	// Define base url
	var baseUrl = 'http://localhost:3000/';

	// Global actions
	var globalActions = {
		//
		get: {
			cache: true,
			method: 'GET'
		},
		getAll: {
			cache: true,
			method: 'GET',
			isArray: true
		}
	};


	// Publish API
	return function(url, params, actions) {
		// Copy global actions since we don't want to overwrite them
		var myActions = angular.copy(globalActions);

		// Extend current actions with user-defined actions (if any)
		if (actions) {
			angular.extend(myActions, actions);
		}

		return $resource(baseUrl + url, params, myActions);
	}
}]);