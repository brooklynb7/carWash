'use strict';

//Setting up route
angular.module('orders').config(function($stateProvider, USER_ROLES) {
		// Orders state routing
		$stateProvider.
		state('listOrders', {
			url: '/orders',
			templateUrl: 'modules/orders/views/list-orders.client.view.html',
			authorizedRoles: [USER_ROLES.service]
		}).
		state('createOrder', {
			url: '/orders/create',
			templateUrl: 'modules/orders/views/create-order.client.view.html',
			authorizedRoles: [USER_ROLES.service]
		}).
		state('viewOrder', {
			url: '/orders/:orderId',
			templateUrl: 'modules/orders/views/view-order.client.view.html',
			authorizedRoles: [USER_ROLES.service]
		}).
		state('editOrder', {
			url: '/orders/:orderId/edit',
			templateUrl: 'modules/orders/views/edit-order.client.view.html',
			authorizedRoles: [USER_ROLES.service]
		});
	});