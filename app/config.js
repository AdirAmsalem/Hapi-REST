// Global variables
var globals = {
	server: {
		host: 'http://localhost',
		port: parseInt(process.env.PORT, 10) || 3000
	}
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
		directory: './',
		files: ['utilities']
	},
	routers: {
		directory: './routes/',
		files: ['main', 'users']
	},
	models: {
		directory: './models/',
		files: ['users']
	}
};

// Development dependencies (tests, etc)
var devLibs = [
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
	}
};