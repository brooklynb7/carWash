'use strict';

angular.module('orders').directive('orderForm', [
	function() {
		return {
			require: 'orderTime',
			templateUrl: './modules/orders/directives/order-form.html',
			restrict: 'E',
			scope: {
				order: '=',
				control: '='
			},
			link: function(scope, element, attrs){
				scope.internalControl = scope.control || {};
				scope.internalControl.getOrderDateTime = function(){
					return new Date().valueOf();
				};
				scope.internalControl.resetOrderDateTime = function(){

				};
			}
		};
	}
]);