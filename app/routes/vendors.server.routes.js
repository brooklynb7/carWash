'use strict';

var config = require('../../config/config');

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var vendors = require('../../app/controllers/vendors.server.controller');

	// Vendors Routes
	app.route('/vendors')
		.get(users.requiresLogin, users.hasAuthorization([config.roles.admin]), vendors.list)
		.post(users.requiresLogin, users.hasAuthorization([config.roles.admin]), vendors.create);

	app.route('/vendors/:verndorSysId')
		.get(vendors.read)
		.put(users.requiresLogin, vendors.hasAuthorization, vendors.update)
		.delete(users.requiresLogin, users.hasAuthorization([config.roles.admin]), vendors.delete);

	app.route('/vendors/apply')
		.post(users.requiresLogin, vendors.apply);

	// Finish by binding the Vendor middleware
	app.param('verndorSysId', vendors.vendorByID);
};
