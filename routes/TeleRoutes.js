const TeleAlert = require('../controllers/telebot.js');

// Include Files


const Telegraf = require('telegraf'),
    Router = require('telegraf/router'),
    session = require('telegraf/session'),
    Stage = require('telegraf/stage'),
    Scene = require('telegraf/scenes/base');




// Bot key
const bot = new Telegraf(process.env.TELEBOT);





// init for Scenes
const {
    enter,
    leave
} = Stage


// Scene Here
const greeterScene = new Scene('greeter')
greeterScene.enter((req) => req.reply('Hi'))
greeterScene.leave((req) => req.reply('Bye'))
greeterScene.hears('hi', enter('greeter'))
greeterScene.hears('leave', leave('greater'))
greeterScene.on('message', (req) => req.replyWithMarkdown('Send `hi`'))



const addScene = new Scene('addScene');
addScene.enter((req) => req.reply('Enter ETH id'))
addScene.leave((req) => req.reply('b\'bye'))
addScene.hears(/(^0x[a-fA-F0-9]{40}$)/, (req) => TeleAlert.addFunction(req))
addScene.hears('hi', leave('addScene'))



// Staging scenes here
const stage = new Stage([greeterScene, addScene], {
    ttl: 10
})




bot.use(session())
bot.use(stage.middleware())



// Commands Here

bot.command('greeter', enter('greeter'))

bot.start((req) => {
    req.reply('Hey! Nice to meet you').catch((err) => {
        console.error(err);
    });
});


// On Command /add

bot.command('add', enter('addScene'));


// On Command /remove
bot.command('remove', (req) => {
    TeleAlert.removeFunction(req).catch((err) => {
        console.error(err);
    });
});


// on Command /list
bot.command('list', (req) => {
    TeleAlert.listFunction(req)
});

// On Command /help
bot.command('help', (req) => {
    TeleAlert.removeFunction(req).catch((err) => {
        console.error(err);
    });
});





// Start Polling.
bot.startPolling();