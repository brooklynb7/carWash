'use strict';

var config = require('../../config/config');

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var vendors = require('../../app/controllers/vendors.server.controller');

	// Vendors Routes
	app.route('/vendors')
		.get(users.requiresLogin, users.hasAuthorization([config.roles.super]), vendors.list)
		.post(users.requiresLogin, vendors.create);

	app.route('/vendors/:vendorId')
		.get(vendors.read)
		.put(users.requiresLogin, vendors.hasAuthorization, vendors.update)
		.delete(users.requiresLogin, vendors.hasAuthorization, vendors.delete);

	// Finish by binding the Vendor middleware
	app.param('vendorId', vendors.vendorByID);
};
