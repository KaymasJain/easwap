/**
 * Telebot user Data schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chatID -> Unique ID of bot and user
// alertTime -> time duration of alert
const TeleBotSchema = new Schema({
	'EthId': String,
	'chatID': Number,
	'alertTime': Number
});

module.exports = mongoose.model('TeleBot', TeleBotSchema);