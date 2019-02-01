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
        TeleBot.find({
            "EthId": req.match,
            // chatId: req.chat.id
        },function(err, isExists) {
            
            if (err) {
                return req.reply("Some Error occured");
            }

                if (isExists.length >0 ) {
                console.log(isExists);
                console.log(req.match[0])
                return req.reply("ETH Address Already Exists");                
            }

            var data = new TeleBot({
                EthId : req.match[0],
                chatId : req.chat.id
            });

            data.save((err, data) => {
                if (err){
                    console.error(err)
                    return req.reply("some error occured")
                } else {
                    return req.reply('Done');
                }
            })
        })
        
    },
    listFunction(req){
        var data = new TeleBot({
            chatId : req.chat.id,
        })
        
        TeleBot.find(data , (err, data) => {
            if(err){
                console.error(err);
                return req.reply("some error")
            }else{
                return req.reply(data.EthId)
            }
        })
        // return req.reply('here you go!!!')
    },
    
    removeFunction(req) {
        return req.reply('removed');
    },
    helpFunction(req) {
        return req.reply("help");
    },

}