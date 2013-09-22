// Load modules
var app = require('../../app/config');
var request = app.getLib('request');

var baseUrl = app.globals.server.host + ':' + app.globals.server.port;

describe('Router: Users', function() {

	var user = { username: 'Test', password: 'test' };

	// GET /users
	it('GET /users: Should get all users', function(done) {
		request.get({ url: baseUrl + '/users' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body.length).toBeDefined();
			done();
		});
	});

	// POST /users/id (user)
	it('POST /users: Should return error code 400', function(done) {
		request.post({ url: baseUrl + '/users' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('POST /users ({}): Should return error code 400', function(done) {
		request.post({ url: baseUrl + '/users', body: {} }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('POST /users (user): Should add a new user', function(done) {
		request.post({ url: baseUrl + '/users', body: user }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body.length).toBeDefined();
			expect(body[0]).toBeDefined();
			expect(body[0]._id).toBeDefined();
			expect(body[0].username).toBe(user.username);
			expect(body[0].password).toBe(user.password);
			user._id = body[0]._id;
			done();
		});
	});

	// PUT /users/id (user)
	it('PUT /users/123456: Should return error code 400', function(done) {
		request.put({ url: baseUrl + '/users/123456' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('PUT /users/id ({}): Should return error code 400', function(done) {
		request.put({ url: baseUrl + '/users/' + user._id, body: {} }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('PUT /users/id (user): Should update a user', function(done) {
		request.put({ url: baseUrl + '/users/' + user._id, body: user }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body).toBe(true);
			done();
		});
	});

	// GET /users/id
	it('GET /users/123456: Should return error code 400', function(done) {
		request.get({ url: baseUrl + '/users/123456' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('GET /users/000000000000000000000000: Should return error code 404', function(done) {
		request.get({ url: baseUrl + '/users/000000000000000000000000' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(404);
			done();
		});
	});

	it('GET /users/id: Should get a specific user', function(done) {
		request.get({ url: baseUrl + '/users/' + user._id }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body._id).toBe(user._id);
			expect(body.username).toBe(user.username);
			expect(body.password).toBe(user.password);
			done();
		});
	});

	// DELETE /users/id
	it('DELETE /users/123456: Should return error code 400', function(done) {
		request.del({ url: baseUrl + '/users/123456' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('DELETE /users/id: Should remove a user', function(done) {
		request.del({ url: baseUrl + '/users/' + user._id }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body).toBe(true);
			done();
		});
	});
});