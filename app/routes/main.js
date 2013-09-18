var routes = [];

/**
 * Main URI
 */
routes.push({
	method: 'GET',
	path: '/',
	handler: function(req) {
		req.reply({ message: 'Welcome to my RESTful Web Service!' });
	}
});


// Publish API
module.exports = {
	getRoutes: function() { return Array.prototype.splice.call(routes, 0); }
};