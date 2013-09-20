// Load modules
var request = require('request');

var BASE_URL = 'http://localhost:3000';
request = request.defaults({ json: true });

describe('Router: Users', function() {

	var user = { username: 'Test', password: 'test' };

	// getAll method
	it('getAll(): Should get all users', function(done) {
		request.get({ url: BASE_URL + '/users' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body.length).toBeDefined();
			done();
		});
	});

	// add method
	it('add(): Should return error code 400', function(done) {
		request.post({ url: BASE_URL + '/users' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('add(): Should return error code 400', function(done) {
		request.post({ url: BASE_URL + '/users', body: {} }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('add(): Should add a new user', function(done) {
		request.post({ url: BASE_URL + '/users', body: user }, function(error, response, body) {
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

	// update method
	it('update(): Should return error code 400', function(done) {
		request.post({ url: BASE_URL + '/users/123456' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('update(): Should return error code 400', function(done) {
		request.post({ url: BASE_URL + '/users/' + user._id, body: {} }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('update(): Should update a user', function(done) {
		request.post({ url: BASE_URL + '/users/' + user._id, body: user }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body).toBe(true);
			done();
		});
	});

	// getById method
	it('getById(): Should return error code 400', function(done) {
		request.get({ url: BASE_URL + '/users/123456' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('getById(): Should return error code 404', function(done) {
		request.get({ url: BASE_URL + '/users/000000000000000000000000' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(404);
			done();
		});
	});

	it('getbyId(): Should get a specific user', function(done) {
		request.get({ url: BASE_URL + '/users/' + user._id }, function(error, response, body) {
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

	// remove method
	it('remove(): Should return error code 400', function(done) {
		request.del({ url: BASE_URL + '/users/123456' }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	it('remove(): Should remove a user', function(done) {
		request.del({ url: BASE_URL + '/users/' + user._id }, function(error, response, body) {
			expect(error).toBeNull();
			expect(response).toBeDefined();
			expect(response.statusCode).toBe(200);
			expect(body).toBeDefined();
			expect(body).toBe(true);
			done();
		});
	});
});