Hapi.controller('MainController', function($scope, $location, activeItem) {

	/**
	 * Change the path according to the given path
	 * 
	 * @param {String} path 
	 */
	$scope.setPath = function(path) {
		if (!path) return;
		$location.path(path);
	};

	/**
	 * Go to the main page
	 */
	$scope.gotoHome = function() {
		$scope.setPath('/');
	};

	/**
	 * Select the previous or next item respectively
	 */
	$scope.selectPrevious = activeItem.previous;
	$scope.selectNext = activeItem.next;

	/**
	 * Check if the specified item is the active item
	 * 
	 * @param  {Number}  itemIndex
	 * @return {Boolean} true if it's the active item, false  otherwise
	 */
	$scope.isActiveItem = function(itemIndex) {
		return itemIndex === activeItem.get();
	};
});