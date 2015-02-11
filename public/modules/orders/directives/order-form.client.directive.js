'use strict';

angular.module('orders').directive('orderForm', function() {
		return {
			templateUrl: './modules/orders/directives/order-form.html',
			restrict: 'E',
			scope: {
				order: '=',
				control: '='
			},
			link: function(scope, element, attrs){
			}
		};
	});