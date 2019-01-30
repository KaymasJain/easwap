const TeleBot = require('../models/TeleBot.js');
const helper = require('../util/helper');
const slackit = require('../util/slack').shoot;

// const Extra = require('telegraf/extra'),
// Markup = require('telegraf/markup');


module.exports = {
    // TODO{zubin}
    // Example function
    replyFunction(req) {
        return req.reply('Playing with you').catch((err) => {
            console.error(err);
        });
    },
    addFunction(req) {
        return req.reply('adding');
    },
    removeFunction(req) {
        return req.reply('removed');
    },
    helpFunction(req) {
        return req.reply("help");
    },

}