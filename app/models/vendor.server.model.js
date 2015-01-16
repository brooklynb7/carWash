'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
	Schema = mongoose.Schema;

/**
 * Vendor Schema
 */
var VendorSchema = new Schema({	
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


VendorSchema.plugin(autoIncrement.plugin, {
    model: 'Vendor',
    field: 'vendorId',
    startAt: 10000,
    incrementBy: 1
});

mongoose.model('Vendor', VendorSchema);