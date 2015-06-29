'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListSchema = new Schema({
    name: String,
    description: String,
    public: Boolean,
    active: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
/*    things: [{
        type: Schema.Types.ObjectId,
        ref: 'Thing'
    }],*/
    things: [{
        name: String,
        memo: String,
        active: {
            type: Boolean,
            default: true
        },
        parent_id: {
            type: Schema.Types.ObjectId   
        }
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('List', ListSchema);