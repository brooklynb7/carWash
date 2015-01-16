'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
	Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: '请填写您的姓名',
		trim: true
	},
	mobile: {
		type: String,
		default: '',
		required: '请填写您的手机号，方便我们与您取得联系',
		trim: true
	},
	washType: {
		type: Number,
		default: 1
	},
	area: {
		type: String,
		default: '',
		trim: true
	},
	carPlate: {
		type: String,
		default: '',
		trim: true
	},
	carType: {
		type: String,
		default: '',
		trim: true
	},
	otherService: {
		type: [String]
	},
	orderTime: {
		type: Date		
	},
	finishTime: {
		type: Date
	},
	paymentTime: {

	},
	created: {
		type: Date,
		default: Date.now
	},
	choiceVendor: {
		type: Schema.ObjectId,
		ref: 'Vendor'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	status: {
		type: Number,
		default: 0
	}
});


OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderId',
    startAt: 100000,
    incrementBy: 1
});

mongoose.model('Order', OrderSchema);