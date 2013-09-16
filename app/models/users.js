// Load modules
var Q = require('q');
var fs = require('fs');

/**
 * UserObject
 * 
 * @param {Number} id
 * @param {String} username
 * @param {String} password
 */
var users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'));

/**
 * Returns a new user id
 * 
 * @param  {Array} users
 * @return {Number} id
 */
function getNewId(users) {
	return users[users.length-1].id + 1;
}

/**
 * Get all users
 * 
 * @return {Array} [UserObject]
 */
function getAll() {
	var deferred = Q.defer();

	deferred.resolve(Array.prototype.slice.call(users, 0));

	return deferred.promise;
};

/**
 * Get a specific user
 * 
 * @param  {Number} id
 * @return {Object} UserObject
 */
function getById(id) {
	var deferred = Q.defer();

	if (isNaN(id)) {
		deferred.reject(400);
	} else {
		id = Number(id);

		users.some( function(user) {
			if (user.id === id) {
				deferred.resolve(user);
				return true;
			}
		});

		if (deferred.promise.isPending()) {
			deferred.reject(404);
		}
	}

	return deferred.promise;
};

/**
 * Creates a new user
 * 
 * @param  {Object} data (username, password)
 * @return {Object} UserObject
 */
function add(data) {
	var deferred = Q.defer();

	if (typeof data !== 'object' ||
		typeof data.username !== 'string' ||
		typeof data.password !== 'string')
	{
		deferred.reject(400);
	} else {
		var id = getNewId(users);

		if (typeof id === 'number') {
			var user = {
				id: id,
				username: data.username,
				password: data.password
			};
			users.push(user);
			deferred.resolve(user);
		} else {
			deferred.reject(500);
		}
	}

	return deferred.promise;
}

/**
 * Updates a user
 * 
 * @param  {Number} id
 * @param  {Object} data
 * @return {Object} UserObject
 */
function update(id, data) {
	var deferred = Q.defer();

	if (isNaN(id) || typeof data !== 'object') {
		deferred.reject(400);
	} else {
		id = Number(id);

		users.some( function(user, index) {
			if (user.id === id) {
				users[index] = { id: id };

				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						users[index][key] = data[key];
					}
				}

				deferred.resolve(users[index]);
				return true;
			}
		});

		if (deferred.promise.isPending()) {
			deferred.reject(404);
		}
	}

	return deferred.promise;
}

/**
 * Removes a user
 * 
 * @param  {Number} id
 * @return {Boolean} true on success
 */
function remove(id) {
	var deferred = Q.defer();

	if (isNaN(id)) {
		deferred.reject(400);
	} else {
		id = Number(id);

		users.some( function(user, index) {
			if (user.id === id) {
				users.splice(index, 1);
				deferred.resolve(true);
				return true;
			}
		});

		if (deferred.promise.isPending()) {
			deferred.reject(404);
		}
	}

	return deferred.promise;
}


// Publish API
var exports = {
	getAll: getAll,
	getById: getById,
	add: add,
	update: update,
	remove: remove
};
module.exports = exports;