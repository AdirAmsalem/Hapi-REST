var App = (function() {

	var server;
	var routes = ['main', 'users'];

	// Initialize the server
	function initServer() {
		var Hapi = require('hapi');
		server = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);
	}

	// Register routes
	function registerRoutes() {
		routes.forEach( function(route) {
			var router = require('./routes/' + route);
			router.getRoutes().forEach( function(route) {
				server.route(route);
			});
		});
	}

	// Start the server
	function startServer() {
		server.start();
		console.log('Server is running...');
	}


	// Publish API
	return {
		init: function() {
			initServer();
			registerRoutes();
			startServer();
		}
	};

})();

App.init();