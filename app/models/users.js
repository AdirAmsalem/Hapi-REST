// Load modules
var app = require('../config');
var q = app.getLib('q');
var db = app.getLib('mongoskin');
var utilities = app.getLocal('utilities');

/**
 * UserObject
 * 
 * @property {String} _id
 * @property {String} username
 * @property {String} password
 */
var users = db.collection('users');

/**
 * Get all users
 * 
 * @return {Array} [UserObject]
 */
function getAll() {
	var deferred = q.defer();

	users.find().toArray( function(error, result) {
		if (result) {
			deferred.resolve(result);
		} else {
			deferred.reject(500);
		}
	});

	return deferred.promise;
}

/**
 * Get a specific user
 * 
 * @param  {String} id
 * @return {Object} UserObject
 */
function getById(id) {
	var deferred = q.defer();
	id = utilities.convertId(id);

	if (!id) {
		deferred.reject(400);
	} else {
		users.findById(id, function(error, result) {
			if (error) {
				deferred.reject(500);
			} else if (!result) {
				deferred.reject(404);
			} else {
				deferred.resolve(result);
			}
		});
	}

	return deferred.promise;
}

/**
 * Creates a new user
 * 
 * @param  {Object} user
 * @return {Object} UserObject
 */
function add(user) {
	var deferred = q.defer();

	if (typeof user !== 'object' || utilities.isEmptyObject(user)) {
		deferred.reject(400);
	} else {
		users.insert(user, function(error, result) {
			if (result) {
				deferred.resolve(result);
			} else {
				deferred.reject(500);
			}
		});
	}

	return deferred.promise;
}

/**
 * Updates a user
 * 
 * @param  {String} id
 * @param  {Object} user
 * @return {Boolean} true on success
 */
function update(id, user) {
	var deferred = q.defer();
	id = utilities.convertId(id);

	if (!id || typeof user !== 'object' || utilities.isEmptyObject(user)) {
		deferred.reject(400);
	} else {
		users.updateById(id, user, function(error) {
			if (!error) {
				deferred.resolve(true);
			} else {
				deferred.reject(500);
			}
		});
	}

	return deferred.promise;
}

/**
 * Removes a user
 * 
 * @param  {String} id
 * @return {Boolean} true on success
 */
function remove(id) {
	var deferred = q.defer();
	id = utilities.convertId(id);

	if (!id) {
		deferred.reject(400);
	} else {
		users.removeById(id, function(error) {
			if (!error) {
				deferred.resolve(true);
			} else {
				deferred.reject(500);
			}
		});
	}

	return deferred.promise;
}


// Publish API
module.exports = {
	getAll: getAll,
	getById: getById,
	add: add,
	update: update,
	remove: remove
};