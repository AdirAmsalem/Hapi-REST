var Hapi = angular.module('Hapi', ['ngRoute', 'ngResource'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
			.when('/', {
				templateUrl: 'views/main.html'
			})
			.when('/:endpoint/:itemId?', {
				templateUrl: 'views/items.html',
				controller: 'ItemsController'
			})
			.otherwise({
				redirectTo: '/'
			});

			$locationProvider.html5Mode(false).hashPrefix('!');
	}]);