const TeleBot = require('../models/TeleBot.js');
const helper = require('../util/helper');
const slackit = require('../util/slack').shoot;

module.exports = {
    // TODO{zubin}



    start(req){
        var data = new TeleBot({
            chatID: req.chat.id,
        })
        data.save(function(err){
            req.reply(req.chat.id)
        }); 
    },

    replyFunction(req) {
        return req.reply('Playing with you').catch((err) => {
            console.error(err);
            // greeterScene();
        });
    },
    
    
    
    
    addFunction(req) {

        
        
        TeleBot.updateOne(
            { chatID: req.chat.id }, 
            { $addToSet: { EthId: req.match[0] } },
            function(err,tank){
                console.log(tank)
                if(tank.ok){
                    if(tank.nModified){
                        req.reply("added")
                    }else{
                        req.reply("already exists")
                    }
                }
                else{
                    req.reply("some error occured")
                }
            })
            
            // req.reply("added, i guess");
    },





    listFunction(req) {
        var data = new TeleBot({
            chatId: req.chat.id,
        })

        TeleBot.find(data, (err, data) => {
            if (err) {
                console.error(err);
                return req.reply("some error")
            } else {
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