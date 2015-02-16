'use strict';

angular.module('users').controller('UsersController', function($scope, $stateParams, $location, Authentication, Users) {
	$scope.authentication = Authentication;

	$scope.find = function() {
		$scope.users = Users.query();
	};

});