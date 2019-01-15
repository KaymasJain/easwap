/**
 * Pupose: example
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ExampleSchema = new Schema({
	'exampleKey' : String,
	'sampleKey': Number,
	'numArr': [Number]
});

module.exports = mongoose.model('Example', ExampleSchema);