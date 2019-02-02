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





    addFunction(req) {
        console.log(req)
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
                    if (data == null) {
                        req.reply("some error occured, please /start")
                    } else {

                        t = data.EthId.length

                        if (t != 0) {
                            reply = "list of all eth id \n";
                            x = 0;
                            while (x < t) {
                                x = x + 1;
                                reply = reply + " \n " + x + "." + data.EthId[x - 1];
                            }
                        } else {
                            reply = "list empty"
                        }
                        req.reply(reply)
                    }
                }

            }

        )
    },




    removeFunction(req) {

        return req.reply('removed');
        
    },
    helpFunction(req) {
        return req.reply("help");
    },

}