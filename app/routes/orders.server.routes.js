'use strict';

var config = require('../../config/config');

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orders = require('../../app/controllers/orders.server.controller');

	// Orders Routes
	app.route('/orders')
		.get(users.requiresLogin, users.hasAuthorization([config.roles.service]), orders.list)
		.post(users.requiresLogin, orders.create);

	app.route('/orders/:orderId')
		.get(orders.read)
		.put(users.requiresLogin, orders.hasAuthorization, orders.update)
		.delete(users.requiresLogin, users.hasAuthorization([config.roles.admin]), orders.delete);

	// Finish by binding the Order middleware
	app.param('orderId', orders.orderByID);
};
