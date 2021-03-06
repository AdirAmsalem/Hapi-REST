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
			expect(body.result).toBeDefined();
			done();
		});
	});

	// GET /endpoints
	it('GET /endpoints: Should get all endpoints', function(done) {
		request.get({ url: baseUrl + '/endpoints' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body.result).toBeDefined();
			expect(body.result.length).toBeDefined();
			done();
		});
	});
});