'use strict';

// Orders controller
angular.module('orders').controller('OrdersController', function($scope, $stateParams, $location, Authentication, Orders) {
		$scope.authentication = Authentication;
		$scope.order = {};
		$scope.order.washType = 1;
		// Create new Order
		$scope.create = function() {			
			// Create new Order object
			var order = new Orders({
				name: this.order.name,
				mobile: this.order.mobile,
				washType: this.order.washType,
				orderTime: this.order.orderTime
			});

			// Redirect after save
			order.$save(function(response) {
				$location.path('orders/' + response._id);

				// Clear form fields
				$scope.order.name = '';
				$scope.order.mobile = '';
				$scope.order.washType = 1;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order
		$scope.remove = function(order) {
			if (order) {
				order.$remove();

				for (var i in $scope.orders) {
					if ($scope.orders[i] === order) {
						$scope.orders.splice(i, 1);
					}
				}
			} else {
				$scope.order.$remove(function() {
					$location.path('orders');
				});
			}
		};

		// Update existing Order
		$scope.update = function() {
			var order = $scope.order;
			//order.orderTime = $scope.formControl.getOrderDateTime();

			order.$update(function() {
				$location.path('orders/' + order._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Orders
		$scope.find = function() {
			$scope.orders = Orders.query();
		};

		// Find existing Order
		$scope.findOne = function() {
			$scope.order = Orders.get({
				orderId: $stateParams.orderId
			});
		};
	});