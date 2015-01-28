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
	workingTime: {
		type: String,
		default: '',
		trim: true,
		required: '请填写营业时间'
	},
	address: {
		type: String,
		default: '',
		trim: true,
		required: '请填写商家地址'
	},	
	area: {
		type: String,
		default: '',
		trim: true,
		required: '请填写所在区域'
	},
	storeSize: {
		type: String,
		default: '',
		trim: true,
		required: '请填写门店面积'
	},
	level:{
		type: Number,
		default: 1
	},
	rate:{
		attitude: {
			type: Number,
			default: 0
		},
		quality: {
			type: Number,
			default: 0
		},
		priceRatio: {
			type: Number,
			default: 0
		}
	},
	phone:{
		type: String,
		default: '',
		trim: true,
		required: '请填写联系电话'
	},
	serviceCategory: [
		{
			categoryId: String,
			categoryIntro: String
		}
	],
	serviceIntro: {
		type: String,
		default: '',
		trim: true,
		required: '请填写服务介绍'
	},
	createdBy:{
		
	},
	created: {
		type: Date,
		default: Date.now
	},
	approveAt: {
		type: Date
	},
	approveStatus: {
		type: Number,
		default: 0
	},
	approveBy: {
		type:Schema.ObjectId,
		ref: 'User'
	},
	approveText: {
		type: String,
		trim: true,
		default: ''
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