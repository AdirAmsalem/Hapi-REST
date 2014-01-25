// Load modules
var fs = require('fs');

// Global variables
var globals = {
	server: {
		host: 'http://localhost',
		port: parseInt(process.env.PORT, 10) || 3000
	},
	endpoints: []
};

// Application files/dependencies
var requires = {
	libs: {
		directory: '',
		files: [
			{ name: 'q' },
			{ name: 'hapi' },
			{
				name: 'mongoskin',
				extra: {
					method: 'db',
					parameters: ['localhost:27017/hapi-rest', { safe: false }]
				}
			}
		],
	},
	locals: {
		directory: __dirname + '/',
		files: ['utilities']
	},
	routers: {
		directory: __dirname + '/routes/',
	},
	models: {
		directory: __dirname + '/models/',
	}
};

// Used to load all our routers and models
['routers', 'models'].forEach( function(type) {
	var files = [];

	// Retrieve all files from these folders and iterate over them
	fs.readdirSync(requires[type].directory).forEach( function(file) {
		// We only want '.js' files
		if (file.substr(file.length-3, file.length) === '.js') {
			// Push it to the list
			files.push(file.substr(0, file.length-3));
		}
	});

	// Assign the files
	requires[type].files = files;
});

// Development dependencies (tests, etc)
var devLibs = [
	{
		name: 'fs'
	},
	{
		name: 'request',
		extra: {
			method: 'defaults',
			parameters: [{ json: true }]
		}
	}
];

devLibs.forEach( function(lib) {
	requires.libs.files.push(lib);
});


// Publish API
module.exports = {
	globals: globals,
	getLib: function(name) {
		var found;

		requires.libs.files.some( function(lib) {
			if (lib.name === name) {
				found = lib.extra ?
						require(lib.name)[lib.extra.method].apply(null, lib.extra.parameters) :
						require(lib.name);

				return true;
			}
		});

		return found;
	},
	getLocal: function(name) {
		var found;

		requires.locals.files.some( function(local) {
			if (local === name) {
				found = require(requires.locals.directory + local);
				return true;
			}
		});

		return found;
	},
	getRouters: function(name) {
		var found = [];

		if (name) {
			requires.routes.files.some( function(router) {
				if (router === name) {
					found = require(requires.routers.directory + router);
					return true;
				}
			});
		} else {
			requires.routers.files.forEach( function(router) {
				found.push(require(requires.routers.directory + router));
			});
		}

		return found;
	},
	getModel: function(name) {
		var found;

		requires.models.files.some( function(route) {
			if (route === name) {
				found = require(requires.models.directory + route);
				return true;
			}
		});

		return found;
	},
	addEndpoint: function(endpoint) {
		globals.endpoints.push(endpoint);
	},
	getEndpoints: function() {
		return Array.prototype.slice.call(globals.endpoints, 0);
	}
};