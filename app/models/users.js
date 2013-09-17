// Load modules
var Q = require('q');
var fs = require('fs');
var db = require('mongoskin').db('localhost:27017/hapi-rest');

/**
 * UserObject
 * 
 * @param {String} _id
 * @param {String} username
 * @param {String} password
 */
var users = db.collection('users');

/**
 * Converts and validates the specified id
 * 
 * @param  {String} id
 * @return {String|Boolean} converted id on success / false on failure
 */
function convertId(id) {
	try {
		return db.ObjectID.createFromHexString(id);
	} catch(e) {
		return false;
	}
}

/**
 * Get all users
 * 
 * @return {Array} [UserObject]
 */
function getAll() {
	var deferred = Q.defer();

	users.find().toArray( function(error, result) {
		if (result) {
			deferred.resolve(result);
		} else {
			deferred.reject(500);
		}
	});

	return deferred.promise;
};

/**
 * Get a specific user
 * 
 * @param  {String} id
 * @return {Object} UserObject
 */
function getById(id) {
	var deferred = Q.defer();
	id = convertId(id);

	if (!id) {
		deferred.reject(400);
	} else {
		users.findOne({ '_id': id }, function(error, result) {
			if (result) {
				deferred.resolve(result);
			} else {
				deferred.reject(404);
			}
		});
	}

	return deferred.promise;
};

/**
 * Creates a new user
 * 
 * @param  {Object} user
 * @return {Object} UserObject
 */
function add(user) {
	var deferred = Q.defer();

	if (typeof user !== 'object') {
		deferred.reject(400);
	} else {
		users.insert(user, function(error, result) {
			if (result) {
				deferred.resolve(result);
			} else {
				deferred.reject(500);
			}
		})
	}

	return deferred.promise;
}

/**
 * Updates a user
 * 
 * @param  {String} id
 * @param  {Object} user
 * @return {Object} UserObject
 */
function update(id, user) {
	var deferred = Q.defer();
	id = convertId(id);

	if (!id || typeof user !== 'object') {
		deferred.reject(400);
	} else {
		users.update({ '_id': id }, user, function(error, result) {
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
	var deferred = Q.defer();
	id = convertId(id);

	if (!id) {
		deferred.reject(400);
	} else {
		users.remove({ '_id': id}, function(error) {
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
var exports = {
	getAll: getAll,
	getById: getById,
	add: add,
	update: update,
	remove: remove
};
module.exports = exports;