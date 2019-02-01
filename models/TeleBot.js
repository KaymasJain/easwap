/**
 * Telebot user Data schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chatID -> Unique ID of bot and user
// alertTime -> time duration of alert
const TeleBotSchema = new Schema({
	'EthId': [{
		type: String
	}],
	'ordId': [{
		type: String
	}],
	'chatID': {
		unique: true,
		type: Number
	},
	'alertTime': Number
});

module.exports = mongoose.model('TeleBot', TeleBotSchema);