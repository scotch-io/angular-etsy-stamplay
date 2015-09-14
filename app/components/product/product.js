angular
	.module('app.product', [])
	.controller('ProductController', ['Product', '$stateParams', ProductController]);

function ProductController(Product, $stateParams) {
	var product = this;

	// get the product for this page and bind it to the product.listing object
	Product.get($stateParams.id)
		.then(function(data) {
			// since this is a singular Stamplay model that was returned, we can bind instance directly
			product.listing = data.instance;
		});
}