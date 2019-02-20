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
                $set: {
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

    removeFunction(req) {
        console.log(req)
        TeleBot.updateOne({
                chatID: req.chat.id
            }, {
                $set: {
                    EthId: ""
                }
            },
            function (err, tank) {
                console.log(tank)
                if (tank.ok) {
                    if (tank.nModified) {
                        req.reply("Removed")
                    } else {
                        req.reply("already blank")
                    }
                } else {
                    req.reply("some error occured")
                }
            })

    },
    helpFunction(req) {
        return req.reply("help");
    },

}