'use strict';

//Setting up route
angular.module('vendors').config(function($stateProvider, USER_ROLES) {
		// Vendors state routing
		$stateProvider.
		state('applyVendor', {
			url: '/vendors/apply',
			templateUrl: 'modules/vendors/views/apply-vendor.client.view.html'
		}).
		state('listVendors', {
			url: '/vendors',
			templateUrl: 'modules/vendors/views/list-vendors.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		}).
		state('createVendor', {
			url: '/vendors/create',
			templateUrl: 'modules/vendors/views/create-vendor.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		}).
		state('viewVendor', {
			url: '/vendors/:vendorId',
			templateUrl: 'modules/vendors/views/view-vendor.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		}).
		state('editVendor', {
			url: '/vendors/:vendorId/edit',
			templateUrl: 'modules/vendors/views/edit-vendor.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		});
	});