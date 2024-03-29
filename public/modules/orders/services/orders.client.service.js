'use strict';

//Orders service used to communicate Orders REST endpoints
angular.module('orders').factory('Orders', function($resource) {
		return $resource('orders/:orderId', { orderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	});