var Hapi = angular.module('Hapi', ['ngRoute', 'ngResource'])
	.config(['$routeProvider', '$locationProvider' , function($routeProvider, $locationProvider) {

	$routeProvider
			.when('/', {
				templateUrl: 'views/main.html'
			})
			.when('/users/:userId?', {
				templateUrl: 'views/users.html',
				controller: 'UsersController'
			})
			.otherwise({
				redirectTo: '/'
			});

			$locationProvider.html5Mode(false).hashPrefix('!');
	}]);