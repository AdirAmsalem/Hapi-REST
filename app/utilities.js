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


// Publish API
module.exports = {
	handleResponse: handleResponse
};