var Hapi = angular.module('Hapi',
	['ngRoute', 'ngResource', 'mgo-mousetrap'])
	.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			controller: 'EndpointsController',
			templateUrl: 'views/endpoints.html'
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