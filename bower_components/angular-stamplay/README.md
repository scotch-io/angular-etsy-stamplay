# angular-stamplay
Stamplay SDK angularjs service

An Angular.js wrapper for stamplay-js-sdk.js providing a simple and familiar API for Angular Developer.

#How do I add this to my project?
You can download `angular-stamplay` by:

* Using bower and running `bower install angular-stamplay --save`

# Example
How use angular-stamplay in your project

````html
<!-- Include the Stamplay SDK manually -->
<script src="app/bower_components/stamplay-sdk/dist/stamplay.min.js"></script>

<!-- I'm using angular 1.3.8+ but any version should work -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.js"></script>

<!-- Include this module after angular.js -->
<script src="app/bower_components/angular-stamplay/angular-stamplay.js"></script>

<script>
  angular.module('mytestapp', ['ngStamplay'])

 	// Now you may use $stamplay rather than Stamplay
  .controller('MainCtrl', function($scope, $stamplay) {

  	var user = $stamplay.User().Model;

    /* GET the current logged use data */
    user.currentUser()
			.then(function () {
				//DO something
			})
			.catch(function (err) {
				//MANAGE err
			});

		});
</script>
````
# Reference
For all methods doc see [stamplay-js-sdk](https://github.com/Stamplay/stamplay-js-sdk/blob/master/README.md)
