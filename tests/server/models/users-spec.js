// Load modules
var app = require('../../../server/config');
var users = app.getModel('users');

describe('Model: Users', function() {

	var user = { username: 'Test', password: 'test' };

	// getAll method
	it('getAll(): Should get all users', function(done) {
		users.getAll().then( function(response) {
			expect(response).toBeDefined();
			expect(response.length).toBeDefined();
			done();
		}, function(response) {
			expect(true).toBeFalsy();
			done();
		});
	});

	// add method
	it('add(): Should return error code 400', function(done) {
		users.add().then( function(response) {
			expect(true).toBeFalsy();
			done();
		}, function(response) {
			expect(response).toBe(400);
			done();
		});
	});

	it('add({}): Should return error code 400', function(done) {
		users.add({}).then( function(response) {
			expect(true).toBeFalsy();
			done();
		}, function(response) {
			expect(response).toBe(400);
			done();
		});
	});

	it('add(user): Should add a new user', function(done) {
		users.add(user).then( function(response) {
			expect(response).toBeDefined();
			expect(response.length).toBeDefined();
			expect(response[0]).toBeDefined();
			expect(response[0]._id).toBeDefined();
			expect(response[0].username).toBe(user.username);
			expect(response[0].password).toBe(user.password);
			user._id = String(response[0]._id);
			done();
		}, function(response) {
			expect(true).toBeFalsy();
			done();
		});
	});

	// update method
	it('update(\'123456\', user): Should return error code 400', function(done) {
		users.update('123456', user).then( function(response) {
			expect(true).toBeFalsy();
			done();
		}, function(response) {
			expect(response).toBe(400);
			done();
		});
	});

	it('update(id, {}): Should return error code 400', function(done) {
		users.update(user._id, {}).then( function(response) {
			expect(true).toBeFalsy();
			done();
		}, function(response) {
			expect(response).toBe(400);
			done();
		});
	});

	it('update(id, user): Should update a user', function(done) {
		users.update(user._id, user).then( function(response) {
			expect(response).toBe(true);
			done();
		}, function(response) {
			expect(true).toBeFalsy();
			done();
		});
	});

	// getById method
	it('getById(): Should return error code 400', function(done) {
		users.getById().then( function(response) {
			expect(true).toBeFalsy();
			done();
		}, function(response) {
			expect(response).toBe(400);
			done();
		});
	});

	it('getById(\'000000000000000000000000\'): Should return error code 404', function(done) {
		users.getById('000000000000000000000000').then( function(response) {
			expect(true).toBeFalsy();
			done();
		}, function(response) {
			expect(response).toBe(404);
			done();
		});
	});

	it('getById(id): Should get a specific user', function(done) {
		users.getById(user._id).then( function(response) {
			expect(response).toBeDefined();
			expect(String(response._id)).toBe(user._id);
			expect(response.username).toBe(user.username);
			expect(response.password).toBe(user.password);
			done();
		}, function(response) {
			expect(true).toBeFalsy();
			done();
		});
	});

	// remove method
	it('remove(): Should return error code 400', function(done) {
		users.remove().then( function(response) {
			expect(true).toBeFalsy();
			done();
		}, function(response) {
			expect(response).toBe(400);
			done();
		});
	});

	it('remove(id): Should remove a user', function(done) {
		users.remove(user._id).then( function(response) {
			expect(response).toBe(true);
			done();
		}, function(response) {
			expect(true).toBeFalsy();
			done();
		});
	});
});