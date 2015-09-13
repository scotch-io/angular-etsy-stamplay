angular
	.module('app.routes', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

/**
 * Create all the application routes
 */
function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
	
	// pretty Angular URLs
	$locationProvider.html5Mode(true);

	// the route people are sent to when they are lost
	// the home page in this case
	$urlRouterProvider.otherwise('/');

	// create our routes, set the view, pull in the controller
	$stateProvider

		// home page
		.state('home', {
			url					: '/',
			templateUrl	: '/app/components/home/home.html',
			controller	: 'HomeController as home'
		})

		// shop page
		.state('shop', {
			url					: '/shop/{shop_name}',
			templateUrl	: '/app/components/shop/shop.html',
			controller	: 'ShopController as shop'
		})

		// product page (a child of shop)
		.state('product', {
			url					: '/listing/{product_name}',
			templateUrl	: '/app/components/product/product.html',
			controller	: 'ProductController as product'
		})

		// login/signup page
		.state('authenticate', {
			url					: '/authenticate',
			templateUrl	: '/app/components/authenticate/authenticate.html',
			controller	: 'AuthenticateController as authenticate'
		})

		// profile page (see your past purchases)
		.state('profile', {
			url					: '/profile/{user_name}',
			templateUrl	: '/app/components/profile/profile.html',
			controller	: 'profileController as profile'
		})

		// checkout page
		.state('checkout', {
			url					: '/checkout',
			templateUrl	: '/app/components/checkout/checkout.html',
			controller	: 'CheckoutController as checkout'
		})

		// site admin page (create new products from here or edit your site info)
		.state('admin', {
			url					: '/admin',
			templateUrl	: '/app/components/admin/admin.html',
			controller	: 'AdminController as admin'
		});
}