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
 * Get available endpoints list
 */
routes.push({
	method: 'GET',
	path: '/endpoints',
	handler: function(req) {
		fs.readFile(__dirname + '/../endpoints.json', function(error, data) {
			if (error) {
				req.reply().code(500);
			} else {
				req.reply({ result: JSON.parse(data) });
			}
		});
	}
});


// Publish API
module.exports = {
	getRoutes: function() { return Array.prototype.splice.call(routes, 0); }
};