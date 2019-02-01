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
        var data = new TeleBot({
            EthId : 0,
            chatId : 0,
        })
        data.EthId = req.match;
        data.chatId = req.chat.id;
        data.save((err, data) => {
            if (err){
                console.error(err)
                return req.reply("some error occured")
            }else{

                return req.reply('adding');
            }
        } )
        
    },
    removeFunction(req) {
        return req.reply('removed');
    },
    helpFunction(req) {
        return req.reply("help");
    },

}