/**
 * Pupose: example
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GasPriceSchema = new Schema({
    "fast": Number,
    "safeLowWait": Number,
    "block_time": Number,
    "average": Number,
    "avgWait": Number,
    "blockNum": Number,
    "fastestWait": Number,
    "fastWait": Number,
    "speed": Number,
    "fastest": Number,
    "safeLow": Number
});

module.exports = mongoose.model('Gas', GasPriceSchema);