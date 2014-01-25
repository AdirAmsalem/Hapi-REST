// Load modules
var app = require('../config');
var users = app.getModel('users');
var utilities = app.getLocal('utilities');

var endpoint = {
	name: 'User list',
	url: '/users'
};

var routes = [];

/**
 * Get all users / Get a specific user
 */
routes.push({
	method: 'GET',
	path: endpoint.url + '/{id?}',
	handler: function(req) {
		var id = req.params.id;

		if (id) {
			utilities.handleResponse(req, users.getById(id));
		} else {
			utilities.handleResponse(req, users.getAll());
		}
	}
});

/**
 * Create a new user
 */
routes.push({
	method: 'POST',
	path: endpoint.url,
	handler: function(req) {
		var data = req.payload;
		utilities.handleResponse(req, users.add(data));
	}
});

/**
 * Update a user
 */
routes.push({
	method: 'PUT',
	path: endpoint.url + '/{id}',
	handler: function(req) {
		var id = req.params.id;
		var data = req.payload;

		utilities.handleResponse(req, users.update(id, data));
	}
});

/**
 * Delete a user
 */
routes.push({
	method: 'DELETE',
	path: endpoint.url + '/{id}',
	handler: function(req) {
		var id = req.params.id;
		utilities.handleResponse(req, users.remove(id));
	}
});


// Publish API
module.exports = {
	getEndpointDetails: function() { return endpoint; },
	getRoutes: function() { return Array.prototype.splice.call(routes, 0); }
};