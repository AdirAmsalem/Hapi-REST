// Load modules
var app = require('../config');
var fs = app.getLib('fs');
var utilities = app.getLocal('utilities');

var routes = [];

/**
 * Main URI
 */
routes.push({
	method: 'GET',
	path: '/',
	handler: function(req) {
		req.reply({ result: 'Welcome to my RESTful Web Service! visit \'/endpoints\' for available endpoints.' });
	}
});

/**
 * Get endpoint list
 */
routes.push({
	method: 'GET',
	path: '/endpoints',
	handler: function(req) {
		var endpoints = app.getEndpoints();

		if (endpoints) {
			req.reply({ result: endpoints });
		} else {
			req.reply().code(500);
		}
	}
});


// Publish API
module.exports = {
	getRoutes: function() { return Array.prototype.splice.call(routes, 0); }
};