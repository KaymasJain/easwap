const TeleBot = require('../models/TeleBot.js');
const helper = require('../util/helper');
// const slackit = require('../util/slack').shoot;

module.exports = {


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
        TeleBot.updateOne({
                chatID: req.chat.id
            }, {
                $set: {
                    EthId: null
                }
            },
            function (err, tank) {
                console.log(tank)
                if (tank.ok) {
                    if (tank.nModified) {
                        req.reply("Removed")
                    } else {
                        req.reply("EthId doesnt exist.")
                    }
                } else {
                    req.reply("some error occured")
                }
            })
    },
    aboutFunction(req) {
        TeleBot.findOne({
            chatID: req.chat.id
        }, function (err, tank) {
            if (err) return console.error(err)
            if (tank.EthId == null) {

                req.reply("no eth id set");
            } else {
                // console.log(tank.EthId) // REMOVE LATER
                req.reply(tank.EthId);
            }
        })
    },
    helpFunction(req) {
        req.reply("help");
    },

    statsFunction(req){
        req.reply('stats')
    },

}