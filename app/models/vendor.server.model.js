'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vendor Schema
 */
var VendorSchema = new Schema({
	vendorId: {
		
	},
	name: {
		type: String,
		default: '',
		required: '请填写商家名称',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	approvedBy: {
		type:Schema.ObjectId,
		ref: 'User'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Vendor', VendorSchema);