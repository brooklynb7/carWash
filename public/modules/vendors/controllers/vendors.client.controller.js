'use strict';

// Vendors controller
angular.module('vendors').controller('VendorsController', function($scope, $stateParams, $location, Authentication, Vendors) {
		$scope.authentication = Authentication;

		// Create new Vendor
		$scope.create = function() {
			// Create new Vendor object
			var vendor = new Vendors ({
				name: this.name,
				address: this.address,
				area: this.area,
				workingTime: this.workingTime,
				storeSize: this.storeSize,
				phone: this.phone,
				serviceIntro: this.serviceIntro,
				userId: this.userId
			});

			// Redirect after save
			vendor.$save(function(response) {
				$location.path('vendors/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vendor
		$scope.remove = function(vendor) {
			if ( vendor ) { 
				vendor.$remove();

				for (var i in $scope.vendors) {
					if ($scope.vendors [i] === vendor) {
						$scope.vendors.splice(i, 1);
					}
				}
			} else {
				$scope.vendor.$remove(function() {
					$location.path('vendors');
				});
			}
		};

		// Update existing Vendor
		$scope.update = function() {
			var vendor = $scope.vendor;

			vendor.$update(function() {
				$location.path('vendors/' + vendor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vendors
		$scope.find = function() {
			$scope.vendors = Vendors.query();
		};

		// Find existing Vendor
		$scope.findOne = function() {
			$scope.vendor = Vendors.get({ 
				vendorId: $stateParams.vendorId
			});
		};
	});