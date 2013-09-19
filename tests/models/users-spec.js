var users = require('../../app/models/users');

describe('Model: Users', function() {

	var user = { username: 'Test', password: 'test' };

	it('Should return all users', function(done) {
		users.getAll().then( function(response) {
			expect(response).toBeDefined();
			expect(response.length).toBeDefined();
			done();
		}, function(error) {
			expect(true).toBeFalsy();
			done();
		});
	});

	it('Should add a new user', function(done) {
		users.add(user).then( function(response) {
			expect(response).toBeDefined();
			expect(response.length).toBeDefined();
			expect(response[0]).toBeDefined();
			expect(response[0]._id).toBeDefined();
			expect(response[0].username).toBe(user.username);
			expect(response[0].password).toBe(user.password);
			user._id = String(response[0]._id);
			done();
		}, function(error) {
			expect(true).toBeFalsy();
			done();
		});
	});

	it('Should update a user', function(done) {
		users.update(user._id, user).then( function(response) {
			expect(response).toBe(true);
			done();
		}, function(error) {
			expect(true).toBeFalsy();
			done();
		});
	});

	it('Should get a specific user', function(done) {
		users.getById(user._id).then( function(response) {
			expect(response).toBeDefined();
			expect(String(response._id)).toBe(user._id);
			expect(response.username).toBe(user.username);
			expect(response.password).toBe(user.password);
			done();
		}, function(error) {
			expect(true).toBeFalsy();
			done();
		});
	});

	it('Should remove a user', function(done) {
		users.remove(user._id).then( function(response) {
			expect(response).toBe(true);
			done();
		}, function(error) {
			expect(true).toBeFalsy();
			done();
		});
	});
});