angular	
	.module('OrderService', [])
	.factory('Order', ['$stamplay', '$q', '$http', OrderService]);

function OrderService($stamplay, $q, $http) {

	return {
		create: create,
		charge: charge,
		history: history
	};

	/**
	 * Create a new order
	 */
	function create(data) {
		var def = $q.defer();

		// instantiate a new order model from the stamplay js sdk
		var order = new $stamplay.Cobject('orders').Model;		
		
		// loop over the fields in data and update the order
		angular.forEach(data, function(value, key) {
			order.set(key, value);
		});
		
		// save the object
		order.save()
			.then(function() {
				def.resolve(order);
			});

		return def.promise;
	}

	/**
	 * Charge a customer
	 */
	function charge(userID, price, cardData) {
		var def = $q.defer();

		// create the card token
		Stripe.card.createToken(cardData, function(status, response) {
			// we now have the card token
			var token = response.id;

			// use the stamplay sdk to charge the user
			var customer = new $stamplay.Stripe(); 

			// charge the customer
			price = price * 100; // turn the price into pennies
			customer.charge(userID, token, price, 'USD')
				.then(function() {
					def.resolve(customer);
				}, function(error) {
					console.log(error);
				});

		});

		return def.promise;
	}

	/**
	 * View all the orders for one user
	 */
	function history(userID) {
		var def = $q.defer();

		// instantiate a new orders collection from the stamplay js sdk
		var orders = new $stamplay.Cobject('orders').Collection;
		orders.populate().fetch()
			.then(function() {
				def.resolve(orders);
			});

		return def.promise;
	}

}