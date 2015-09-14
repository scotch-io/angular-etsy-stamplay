angular
	.module('app.admin', [])
	.controller('AdminController', ['Product', AdminController]);

function AdminController(Product) {
	var admin = this;

	// bind the create product function to the controller
	admin.createProduct = createProduct;

	/**
	 * Get all the product categories so we can show them in our form
	 */
	Product.getCategories()
		.then(function(data) {
			console.log(data.instance);
			admin.categories = data.instance;
		});

	/**
	 * Create a new product
	 */
	function createProduct() {
		Product.create(admin.productData) 
			.then(function(data) {
				console.log(data);
				// clear the form
				admin.productData = {};

				// show a message that the product was successfully created
				// show a link to view that product
				admin.successMessage = 'Product created!';
				admin.newProductId   = data.get('_id');
				admin.newProductName = data.get('name');
			});
	}

}