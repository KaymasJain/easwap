const TeleBot = require('../models/TeleBot.js');
const helper = require('../util/helper');
const slackit = require('../util/slack').shoot;

const Extra = require('telegraf/extra'),
    Markup = require('telegraf/markup');


module.exports = {

    // Example function
    replyFunction(req) {
        return req.reply('Playing with you').catch((err) => {
            console.error(err);
        });
    }

}