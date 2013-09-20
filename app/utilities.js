/**
 * Handle incoming requests
 * 
 * @param  {Object} req
 * @param  {Object} promise
 */
function handleResponse(req, promise) {
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
}

/**
 * Check if the given object is empty
 * 
 * @param  {Object}  obj
 * @return {Boolean} true/false
 */
function isEmptyObject(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}

// Publish API
module.exports = {
	handleResponse: handleResponse,
	isEmptyObject: isEmptyObject
};