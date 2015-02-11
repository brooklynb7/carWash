'use strict';

angular.module('users').controller('UsersController', function($scope, $stateParams, $location, Authentication, Orders) {
		$scope.authentication = Authentication;

		$scope.find = function() {
			$scope.users = Orders.query();
		};

	});