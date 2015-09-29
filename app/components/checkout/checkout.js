angular
	.module('app.checkout', [])
	.controller('CheckoutController', ['$stateParams', '$rootScope', 'Product', 'Order', CheckoutController]);

function CheckoutController($stateParams, $rootScope, Product, Order) {
	var checkout             = this;
	checkout.orderData       = {}; 		// create an empty object to hold order data
	checkout.cardData        = {};  	// create an empty object to hold credit card data
	checkout.processPurchase = processPurchase;

	// grab the product by the $stateParams.id
	Product.get($stateParams.id)
		.then(function(data) {
			// since this is a singular Stamplay model that was returned, we can bind instance directly
			checkout.product = data.instance;

			// grab the product id and set it to an object called orderData
			checkout.orderData.product = [data.get('_id')];
			checkout.orderData.price   = data.get('price');
		});

	/**
	 * Process the purchase
	 */
	function processPurchase() {
		// clear the success message
		checkout.sucessMessage = '';

		// charge the user first
		Order.charge($rootScope.currentUser.id, checkout.orderData.price, checkout.cardData)
			.then(function(data) {
				// then we will create the order on successful charge
				Order.create(checkout.orderData)
					.then(function(data) {
						// purchase successful
						checkout.successMessage = 'Thanks for your order! Your order number is #' + data.get('_id');
					});
			});

	}
}