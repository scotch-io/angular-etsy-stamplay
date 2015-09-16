angular
	.module('app.admin', [])
	.controller('AdminController', ['Product', AdminController]);

function AdminController(Product) {
	var admin         = this;
	admin.productData = {};  // the object to hold the data from our form

	// bind the create product function to the controller
	admin.createProduct = createProduct;
	admin.uploadFiles   = uploadFiles;

	/**
	 * Get all the product categories so we can show them in our form
	 */
	Product.getCategories()
		.then(function(data) {
			admin.categories = data.instance;
		});

	/**
	 * Loop over the files being uploaded, save them to Stamplay
	 * Store the ids into admin.productData.pictures
	 */
	function uploadFiles(files) {

		// create the images and bind the returned IDs to a productData object
		admin.productData.pictures = {};
		angular.forEach(files, function(file) {
			console.log(file);

			Product.createPicture(file)
				.then(function(data) {
					console.log(data);
				});
		});
	}

	/**
	 * Create a new product
	 */
	function createProduct() {
		console.log('hello');

		// create the images and bind the returned IDs to a productData object

		angular.forEach(admin.pictures, function(file) {
			
		});

		// create the product
		Product.create(admin.productData) 
			.then(function(data) {
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