const TeleBot = require('../models/TeleBot.js');
const helper = require('../util/helper');
const slackit = require('../util/slack').shoot;

module.exports = {
    // TODO{zubin}



    start(req) {
        var data = new TeleBot({
            chatID: req.chat.id,
        })
        data.save(function (err) {
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

        TeleBot.updateOne({
                chatID: req.chat.id
            }, {
                $addToSet: {
                    EthId: req.match[0]
                }
            },
            function (err, tank) {
                console.log(tank)
                if (tank.ok) {
                    if (tank.nModified) {
                        req.reply("added")
                    } else {
                        req.reply("already exists")
                    }
                } else {
                    req.reply("some error occured")
                }
            })
    },





    listFunction(req) {


        TeleBot.findOne({
            chatID: req.chat.id
        }, (err, data) => {
            if (err) {
                console.error(err);
                return req.reply("some error")
            } else {
                arr = data.EthId.
                console.log(arr)
                reply = "list of all eth id \n"
                t = 0
                for (var x in arr) {
                    t = t + 1 
                    reply = reply + " \n " + t + "." + x
                }
                console.log(reply)
                return req.reply(reply)
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