'use strict';

// Configuring the Articles module
angular.module('vendors').run(['Menus', 'USER_ROLES',
	function(Menus, USER_ROLES) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', '商家管理', 'vendors', 'dropdown', '/vendors(/create)?', false, [USER_ROLES.admin], 99);
		Menus.addSubMenuItem('topbar', 'vendors', '商家列表', 'vendors');
		Menus.addSubMenuItem('topbar', 'vendors', '新建商家', 'vendors/create');
	}
]);