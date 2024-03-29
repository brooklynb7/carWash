'use strict';

// Core module config
angular.module('core')
	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	})
	.constant('USER_ROLES', {
		all: '*',
		user: 'user',
		vendor: 'vendor',
		service: 'service',
		admin: 'admin',
		super: 'super'
	});

moment.locale('zh-cn');