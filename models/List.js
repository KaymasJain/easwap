/**
 * Pupose: List new token
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ListTokenSchema = new Schema({
    "cmcName": String,
    "contractAddress": String,
    "decimals": Number,
    "name": String,
    "symbol": String,
    "reserveAddress": String
});

module.exports = mongoose.model('MainLister', ListTokenSchema);