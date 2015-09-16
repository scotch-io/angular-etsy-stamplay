angular	
	.module('ProductService', [])
	.factory('Product', ['$stamplay', '$q', 'Upload', ProductService]);

function ProductService($stamplay, $q, Upload) {

	return {
		all: all,
		get: get,
		create: create,
		update: update,
		destroy: destroy,
		getComments: getComments,
		comment: comment,
		createPicture: createPicture,
		getCategories: getCategories
	};

	/** 
	 * Get all the products
	 */
	function all() {
		var def = $q.defer();

		// instanticate a new product collection from the stamplay js sdk
		var products = new Stamplay.Cobject('products').Collection;
		products.populate().fetch()
			.then(function() {
				def.resolve(products);
			});

		return def.promise;
	}

	/**
	 * Get a single product
	 */
	function get(id) {
		var def = $q.defer();

		// instanticate a new product model from the stamplay js sdk
		var product = new Stamplay.Cobject('products').Model;

		// get the product in question and return it
		product.populate().fetch(id)
			.then(function() {
				def.resolve(product);
			});

		return def.promise;
	}

	/**
	 * Create a product
	 */
	function create(data) {
		var def = $q.defer();

		// instanticate a new product model from the stamplay js sdk
		var product = new Stamplay.Cobject('products').Model;		
		
		// loop over the fields in data and update the product
		angular.forEach(data, function(value, key) {
			product.set(key, value);
		});
		
		// save the object
		product.save()
			.then(function() {
				def.resolve(product);
			});

		return def.promise;
	}

	/**
	 * Update an existing product
	 */
	function update(id, data) {
		var def = $q.defer();

		// instanticate a new product model from the stamplay js sdk
		var product = new Stamplay.Cobject('products').Model;
		product.fetch(id)
			.then(function() {
				// loop over the fields in data and update the product
				angular.forEach(data, function(value, key) {
					product.set(key, value);
				});
				return product.save();
			})
			.then(function() {
				// return the product
				def.resolve(product);
			});

		return def.promise;
	}

	/**
	 * DESTROY a product
	 */
	function destroy(id) {
		var def = $q.defer();

		// instanticate a new product model from the stamplay js sdk
		var product = new Stamplay.Cobject('products').Model;
		product.fetch(id)
			.then(function() {
				return product.destroy();
			})
			.then(function() {
				// return true that the product was deleted
				def.resolve({ 'success': true });
			});

		return def.promise;
	}

	/**
	 * Get all the comments for a specific product
	 */
	function getComments(id) {
		var def = $q.defer();

		// instanticate a new product model from the stamplay js sdk
		var product = new Stamplay.Cobject('products').Model;
		product.fetch(id)
			.then(function() {
				// a user will comment on the found product
				def.resolve(product.getComments());
			});

		return def.promise;
	}

	/**
	 * Comment on a product
	 */
	function comment(id, data) {
		var def = $q.defer();

		// instanticate a new product model from the stamplay js sdk
		var product = new Stamplay.Cobject('products').Model;
		product.fetch(id)
			.then(function() {
				// a user will comment on the found product
				return product.comment(data.text);
			})
			.then(function() {
				// return the product
				def.resolve(product);
			});

		return def.promise;
	}	

	/**
	 * Create a picture
	 */
	function createPicture(files) {
		var def = $q.defer();

		// create an object for the ids
		var pictureIDs = {};

		// loop over the files and upload them via the Stamplay API
		angular.forEach(files, function(file) {
			Upload.upload({
				url: 'https://angularetsy.stamplayapp.com/api/cobject/v1/pictures',
				file: file
			})
				.then(function(response) {
					console.log(response);
				});
		});

		return def.promise;
	}

	/**
	 * Get all the product categories
	 */
	function getCategories() {
		var def = $q.defer();

		// instanticate a new product collection from the stamplay js sdk
		var products = new Stamplay.Cobject('categories').Collection;
		products.fetch()
			.then(function() {
				def.resolve(products);
			});

		return def.promise;
	}	

}