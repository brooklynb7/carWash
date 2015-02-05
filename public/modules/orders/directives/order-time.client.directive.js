'use strict';

angular.module('orders').directive('orderTime', [
	function() {
		return {
			templateUrl: './modules/orders/directives/order-time.html',
			restrict: 'E',
			scope: {
				order: '='
			},
			link: function (scope, element, attrs) {	
				var orderDateOptions =  [
					{'id':'0','value': '今天'},
					{'id':'1','value': '明天'},
					{'id':'2','value': '后天'}
				];

				var orderTimeOptions = [];

				for(var i = 16; i<=36; i ++){
					orderTimeOptions.push({
						id: i,
						value: moment(moment().format('YYYY-MM-DD')).add(i*30,'m').format('HH:mm')
					});
				}
				
				scope.orderDateOptions = orderDateOptions;
				scope.orderTimeOptions = orderTimeOptions;

				if(moment().format('H') >= 17){
					scope.orderDateOptions.shift(); 
				}				

				scope.changeOrderDate = function(){
					if(scope.orderDate === '0') {
						var hourNow = moment().format('H');
						if(hourNow >=8) {
							scope.orderTimeOptions = [];
							for(var i = (parseInt(hourNow)+1)*2 ; i<=36; i ++){
								scope.orderTimeOptions.push({
									id: i,
									value: moment(moment().format('YYYY-MM-DD')).add(i*30,'m').format('HH:mm')
								});
							}
						}
					} else {
						scope.orderTimeOptions = orderTimeOptions;
					}
					scope.orderTime = scope.orderTimeOptions[0].id;
					scope.setOrderDateTime();
				};

				scope.changeOrderTime = function(){
					scope.setOrderDateTime();
				};

				scope.setOrderDateTime = function () {
					scope.order.orderTime = moment(moment().add(scope.orderDate, 'd').format('YYYY-MM-DD')).add(scope.orderTime*30,'m').format('x');
				};

				scope.resetOrderDateTime = function () {						
					scope.orderDate = '1';
					scope.orderTime = scope.orderTimeOptions[0].id;
				};

				scope.resetOrderDateTime();
				scope.setOrderDateTime();
			}
		};
	}
]);