angular	
	.module('ProductService', [])
	.factory('Product', ['$stamplay', '$q', ProductService]);

function ProductService($stamplay, $q) {

	return {
		all: all,
		get: get,
		create: create,
		update: update,
		destroy: destroy,
		getComments: getComments,
		comment: comment,
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

	/**
	 * Create a picture
	 */
	function createPicture(files) {
		// loop over the files and send them to stamplay
		angular.forEach(files, function(file) {
			if (file && !file.$error) {
     		file.upload = Upload.upload({
              url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
              file: file
            });

            file.upload.then(function (response) {
              $timeout(function () {
                file.result = response.data;
              });
            }, function (response) {
              if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
              file.progress = Math.min(100, parseInt(100.0 * 
                                       evt.loaded / evt.total));
            });
  		}   
		});
	}

}