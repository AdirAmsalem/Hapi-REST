// Load modules
var app = require('./config');
var db = app.getLib('mongoskin');

// Public methods
var methods = {
	/**
	 * Handle incoming requests
	 * 
	 * @param  {Object} req
	 * @param  {Object} promise
	 */
	handleResponse: function(req, promise) {
		promise.then(
			// Success
			function(res) {
				req.reply(res);
			},
			// Error
			function(code) {
				req.reply().code(code);
			}
		);
	},

	/**
	 * Converts and validates the specified id
	 * 
	 * @param  {String} id
	 * @return {String|Boolean} converted id on success / false on failure
	 */
	convertId: function(id) {
		try {
			return db.ObjectID.createFromHexString(id);
		} catch(e) {
			return false;
		}
	},

	/**
	 * Check if the given object is empty
	 * 
	 * @param  {Object}  obj
	 * @return {Boolean} true/false
	 */
	isEmptyObject: function(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}
};


// Publish API
module.exports = methods;