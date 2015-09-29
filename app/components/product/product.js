angular
	.module('app.product', [])
	.controller('ProductController', ['Product', '$stateParams', ProductController]);

function ProductController(Product, $stateParams) {
	var product = this;
	product.createComment = createComment;

	// get the product for this page and bind it to the product.listing object
	Product.get($stateParams.id)
		.then(function(data) {
			// since this is a singular Stamplay model that was returned, we can bind instance directly
			product.listing  = data.instance;
			product.pictures = data.get('pictures');
		});

	// get all the comments and bind to product.comments
	Product.getComments($stateParams.id)
		.then(function(data) {
			product.comments = data.instance;
		});

  /**
   * Create a new comment on this product
   */
  function createComment() {
    Product.comment($stateParams.id, product.commentData)
      .then(function(data) {
        // clear the comment form
        product.commentData = {};

        // replace the comments with the new comments returned
        product.listing.actions.comments = data.instance.actions.comments;
      });
  }

}