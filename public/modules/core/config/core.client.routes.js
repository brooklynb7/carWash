'use strict';

// Setting up route
angular.module('core').config(function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('403', {
			url: '/403',
			templateUrl: 'modules/core/views/403.client.view.html'
		}).
		state('401', {
			url: '/401',
			templateUrl: 'modules/core/views/401.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}).run(function($rootScope, $state, $location, Authentication, USER_ROLES, AUTH_EVENTS) {
			$rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRoute) {
				var subTitle = nextRoute.subTitle;
				if(subTitle) {
					document.title = '洗车帮 - ' + subTitle;
				} else {
					document.title = '洗车帮';
				}

				var authorizedRoles = nextRoute.authorizedRoles;
				if (angular.isArray(authorizedRoles) && authorizedRoles.length > 0 &&
					!Authentication.isAuthorized(authorizedRoles)) {
					event.preventDefault();
					if (Authentication.isAuthenticated()) {
						// user is not allowed
						$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
					} else {
						// user is not logged in
						$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
					}
				}
			});

			$rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
				$state.go('401');
			});

			$rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
				$state.go('403');
			});
		});