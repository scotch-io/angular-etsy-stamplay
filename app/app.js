angular
	.module('etsyApp', [
		'ngStamplay',
		'ui.router',
		'app.routes',
		'app.admin',
		'app.authenticate',
		'app.checkout',
		'app.home',
		'app.product',
		'app.profile',
		'app.shop',
		'UserService',
		'ProductService',
		'OrderService',
		'ngFileUpload',
		'algoliasearch',
		'ui.bootstrap'
	])
	.controller('MainController', ['User', '$rootScope', 'algolia', '$q', '$state', MainController]);

/**
 * The main controller for our application
 */
function MainController(User, $rootScope, algolia, $q, $state) {
	var main            = this;
	main.logout         = logout;
	main.searchProducts = searchProducts;
	main.searchPicked   = searchPicked;

	// configure algolia
  // grab our credentials from algolia
  var client = algolia.Client('4KRGXPTF7K', '4594f3b07157188f25b3f5a8a7eba04e');
  var index = client.initIndex('products');

	$rootScope.currentUser = {}; // creating this object to hold our current users info

	// get the current user and bind their data to rootScope.currentUser object
	User.getCurrent()
		.then(function(data) {
			if (data.get('_id')) {
				$rootScope.currentUser.id    = data.get('_id');
				$rootScope.currentUser.name  = data.get('displayName');
				$rootScope.currentUser.image = data.get('profileImg');
			} else {
				// clear the current user just to be sure
				$rootScope.currentUser = {};
			}
		});

	/**
   * Use algolia to search for products
   */
  function searchProducts(query) {
    var def = $q.defer();

    // do the search
    index.search(query, { hitsPerPage: 10 })
      .then(function(data) {
        // return the found items
        def.resolve(data.hits);
      }, function(data) {
        // return no items
        def.resolve([]); 
        return [];
      });

    return def.promise;
  }

  /**
   * What to do when an item from the search box is clicked
   * Navigate to that product using ui-routers $state.go
   */
  function searchPicked($item, $model, $label) {
  	$state.go('product', { id: $item.id, name: $item.name });
  }

	/**
   * Use the User factory's logout functionality
   */
  function logout() {
    User.logout();
    $rootScope.currentUser = {};
  }  
}