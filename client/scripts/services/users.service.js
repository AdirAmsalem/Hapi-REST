Hapi.factory('users', ['resource', function(resource) {

	/**
 	* UserObject
 	* 
 	* @property {String} _id
 	* @property {String} username
 	* @property {String} password
 	*/

	// Users resource
	var users = resource('users/:userId', { userId: '@id' });


	// Publish API
	return {
		/**
		 * Get all users
		 * 
		 * @return {Array} [UserObject] (Promise)
		 */
		getAll: function() {
			return users.getAll().$promise;
		},
		/**
		 * Get a specific user by its id
		 * 
		 * @param  {String} userId
		 * @return {Object} UserObject (Promise)
		 */
		getById: function(userId) {
			return users.get({ userId: userId }).$promise;
		}
	}
}]);