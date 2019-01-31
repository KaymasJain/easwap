const TeleBot = require('../models/TeleBot.js');
const helper = require('../util/helper');
const slackit = require('../util/slack').shoot;


module.exports = {
    // TODO{zubin}
    

    replyFunction(req) {
        return req.reply('Playing with you').catch((err) => {
            console.error(err);
            // greeterScene();
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