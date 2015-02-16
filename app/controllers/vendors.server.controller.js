'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Vendor = mongoose.model('Vendor'),
	User = mongoose.model('User'),
	async = require('async'),
	_ = require('lodash');

/**
 * Create a Vendor
 */
exports.create = function(req, res) {
	var userId = req.body.userId;
	if(!userId) {
		return errorHandler.responseError(400, '请填写用户ID', res);
	}
	delete req.body.userId;

	async.parallel([
		function(callback){
			User.findOne({
				userId: parseInt(userId)
			}, function(err, user) {
				callback(err, user);
			});
		},	
		function(callback){
			Vendor.findOne({
				'user.userId': userId
			}, function(err, vendor){
				callback(err, vendor);
			});
		}
	], function(err, results) {
		if(err) {			
			return  errorHandler.responseError(400, err, res);		
		} else {
			var user = results[0];
			var vendor = results[1];

			if (!user) {				
				return  errorHandler.responseError(400, '该用户id不存在', res);
			} else if ( vendor ) {
				var message = '该用户已经是商家。';

				if(vendor.approveStatus === 0) {
					message += '该用户已经申请为商家， 待审批中。';
				} else if(vendor.approveStatus === -1) {
					message += '该用户的商家申请已被拒绝，请联系管理员。';
				}

				return errorHandler.responseError(400, message, res);
			} else {
				vendor = new Vendor(req.body);
				vendor.user = user;

				vendor.save(function(err) {
					if (err) {
						return  errorHandler.responseError(400, err, res);
					} else {
						res.jsonp(vendor);
					}
				});
			}
		}
	});
};

exports.apply = function(req, res){
	var vendor = new Vendor(req.body);
	vendor.user = req.user;
};

/**
 * Show the current Vendor
 */
exports.read = function(req, res) {
	res.jsonp(req.vendor);
};

/**
 * Update a Vendor
 */
exports.update = function(req, res) {
	var vendor = req.vendor ;

	vendor = _.extend(vendor , req.body);

	vendor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vendor);
		}
	});
};

/**
 * Delete an Vendor
 */
exports.delete = function(req, res) {
	var vendor = req.vendor ;

	vendor.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vendor);
		}
	});
};

/**
 * List of Vendors
 */
exports.list = function(req, res) { 
	Vendor.find().sort('-created').populate('user', 'displayName').exec(function(err, vendors) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vendors);
		}
	});
};

/**
 * Vendor middleware
 */
exports.vendorByID = function(req, res, next, id) { 
	Vendor.findById(id).populate('user', 'displayName').exec(function(err, vendor) {
		if (err) return next(err);
		if (! vendor) return next(new Error('Failed to load Vendor ' + id));
		req.vendor = vendor ;
		next();
	});
};

/**
 * Vendor authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.vendor.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
