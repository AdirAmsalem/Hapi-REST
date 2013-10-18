// Load modules
var app = require('../../../server/config');
var request = app.getLib('request');

var baseUrl = app.globals.server.host + ':' + app.globals.server.port;

describe('Router: Main', function() {

	// GET /
	it('GET /: Should get the main page', function(done) {
		request.get({ url: baseUrl + '/' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body.message).toBeDefined();
			done();
		});
	});

	// GET /actions
	it('GET /actions: Should get all actions', function(done) {
		request.get({ url: baseUrl + '/actions' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body.length).toBeDefined();
			done();
		});
	});
});