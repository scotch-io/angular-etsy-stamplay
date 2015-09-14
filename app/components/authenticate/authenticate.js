angular
	.module('app.authenticate', [])
	.controller('AuthenticateController', ['User', '$rootScope', '$state', AuthenticateController]);

function AuthenticateController(User, $rootScope, $state) {
	var authenticate = this;

	// create the objects for our forms
	authenticate.signupData = {};
	authenticate.loginData  = {};

	// bind the functions to our controller
	authenticate.signup = signup;
	authenticate.login  = login;

	/**
	 * Sign a user up and bind their info to $rootScope 
	 */
	function signup() {
		User.signup(authenticate.signupData)
			.then(function(data) {
				if (data.get('_id')) {
					$rootScope.currentUser.id    = data.get('_id');
					$rootScope.currentUser.name  = data.get('displayName');
					$rootScope.currentUser.image = data.get('profileImg');

					// redirect the user
          $state.go('home');
				}
			});
	}

	/**
	 * Use the User factory to log a user in
	 * Bind the user's information to $rootScope
	 */
	function login() {
		User.login(authenticate.loginData)
			.then(function(data) {
				if (data.get('_id')) {
					$rootScope.currentUser.id    = data.get('_id');
					$rootScope.currentUser.name  = data.get('displayName');
					$rootScope.currentUser.image = data.get('profileImg');

					// redirect the user
          $state.go('home');
				}
			});
	}
}