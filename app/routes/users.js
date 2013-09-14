// Load modules
var Utilities = require('../utilities');
var users = require('../models/users');

var routes = [];

/**
 * Get all users / Get a specific user
 */
routes.push({
	method: 'GET',
	path: '/users/{id?}',
	handler: function(req) {
		var id = req.params.id;

		if (id) {
			Utilities.handleResponse(req, users.getById(id));
		} else {
			Utilities.handleResponse(req, users.getAll());
		}
	}
});

/**
 * Create a new user
 */
routes.push({
	method: 'POST',
	path: '/users',
	handler: function(req) {
		var data = req.payload;
		Utilities.handleResponse(req, users.add(data));
	}
});

/**
 * Delete a user
 */
routes.push({
	method: 'DELETE',
	path: '/users/{id}',
	handler: function(req) {
		var id = req.params.id;
		Utilities.handleResponse(req, users.remove(id));
	}
});


// Publish API
var exports = {
	getRoutes: function() { return Array.prototype.splice.call(routes, 0); }
};
module.exports = exports;