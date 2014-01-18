Hapi.factory('endpoints', ['$q', 'resource', function($q, resource) {

	// Storage
	var endpointsCache;

	/**
	 * Endpoint
	 * 
	 * @property {String} name
	 * @property {String} url
	 */
	var endpointsResource = resource('endpoints');

	/**
	 * Internal functionality for retrieving a specific endpoint
	 * 
	 * @param  {String} endpointUrl
	 * @return {Object} endpoint
	 */
	function getEndpoint(endpointUrl) {
		var result;

		endpointsCache.some( function(endpoint) {
			if (endpoint.url === endpointUrl) {
				result = endpoint;
				return true;
			}
		});

		return result;
	}

	// Public methods
	var methods = {
		/**
		 * Get all available endpoints
		 * 
		 * @return {Array} [Endpoint] (Promise)
		 */
		getEndpoints: function() {
			var deferred = $q.defer();

			// Get from cache if exists
			if (endpointsCache) {
				deferred.resolve(endpointsCache);
			} else {
				endpointsResource.get().$promise.then( function(data) {
					endpointsCache = data.result;
					deferred.resolve(endpointsCache);
				});
			}

			return deferred.promise;
		},
		/**
		 * Get a specific endpoint by its url
		 * 
		 * @param  {String} endpointUrl
		 * @return {Object} Endpoint (Promise)
		 */
		getByUrl: function(endpointUrl) {
			var deferred = $q.defer();
		
			methods.getEndpoints().then( function() {
				var endpoint = getEndpoint(endpointUrl);

				if (endpoint) {
					deferred.resolve(endpoint);
				} else {
					deferred.reject(404);
				}
			});

			return deferred.promise;
		}
	};

	// Publish API
	return methods;
}]);