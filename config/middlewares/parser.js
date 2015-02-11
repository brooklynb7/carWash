'use strict';

var config = require('../config'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	mongoStore = require('connect-mongo')({
		session: session
	});

module.exports = function(app, db) {
	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));
};