/**
 * Pupose: Trade Ropsten token update
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TradeTokenSchema = new Schema({
    "cmcName": String,
    "contractAddress": String,
    "decimals": Number,
    "name": String,
    "symbol": String
});

module.exports = mongoose.model('RopstenTrade', TradeTokenSchema);