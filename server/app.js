var App = (function() {

	var server;
	var app = require('./config');

	// Initialize the server
	function initServer() {
		var hapi = app.getLib('hapi');
		server = hapi.createServer('0.0.0.0', app.globals.server.port, { cors: true });
	}

	// Register routes
	function registerRoutes() {
		var routers = app.getRouters();

		routers.forEach( function(router) {
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