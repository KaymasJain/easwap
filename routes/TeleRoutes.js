const TeleAlert = require('../controllers/telebot.js');

// I've defined some files. Remove them if you're not using them
const Telegraf = require('telegraf'),
    Router = require('telegraf/router'),
    session = require('telegraf/session'),
    Stage = require('telegraf/stage'),
    Scene = require('telegraf/scenes/base');
    const { enter, leave } = Stage
    
    const greeterScene = new Scene('greeter')
    greeterScene.enter((req) => req.reply('Hi'))
    greeterScene.leave((req) => req.reply('Bye'))
    greeterScene.hears('hi', enter('greeter'))
    greeterScene.hears('leave', leave('greater'))
    greeterScene.on('message', (req) => req.replyWithMarkdown('Send `hi`'))
    

const bot = new Telegraf(process.env.TELEBOT);

const stage = new Stage([greeterScene], {
    ttl: 10
})

bot.use(session())
bot.use(stage.middleware())

// bot.on('message', (req) => req.reply('Try /echo or /greeter or /timepass or /add or /remove or /list'))

bot.command('greeter', enter('greeter'))


bot.start((req) => {
    req.reply('Hey! Nice to meet you').catch((err) => {
        console.error(err);
    });
});

// On command "/timepass"
bot.command('timepass', (req) => {
    TeleAlert.replyFunction(req);
});
// On Command /add

bot.command('add', enter('greeter'));
// (req) => {
    // TeleAlert.addFunction(req).catch((err) => {
        // console.error(err);
    // });
// });

// On Command /remove
bot.command('remove', (req) => {
    TeleAlert.removeFunction(req).catch((err) => {
        console.error(err);
    });
});


// on Command /list
bot.command('list', (req) => {
    TeleAlert.removeFunction(req).catch((err) => {
        console.error(err);
    });
});

// On Command /help
bot.command('help', (req) => {
    TeleAlert.removeFunction(req).catch((err) => {
        console.error(err);
    });
});

bot.startPolling();