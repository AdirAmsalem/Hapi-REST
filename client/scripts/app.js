var Hapi = angular.module('Hapi', ['ngRoute', 'ngResource'])
	.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'views/main.html'
		})
		.when('/:endpoint/:itemId?', {
			controller: 'ItemsController',
			templateUrl: 'views/items.html'
		})
		.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(false).hashPrefix('!');
	});