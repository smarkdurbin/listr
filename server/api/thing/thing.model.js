'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
    name: String,
    memo: String,
    active: Boolean,
    parent_id: {
        type: Schema.Types.ObjectId   
    }
});

module.exports = mongoose.model('Thing', ThingSchema);