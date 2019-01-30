const TeleAlert = require('../controllers/telebot.js');

// I've defined some files. Remove them if you're not using them
const Telegraf = require('telegraf'),
    Router = require('telegraf/router'),
    session = require('telegraf/session'),
    Stage = require('telegraf/stage'),
    Scene = require('telegraf/scenes/base');

const bot = new Telegraf(process.env.TELEBOT);

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

bot.command('add', (req) => {
    TeleAlert.addFunction(req).catch((err) => {
        console.error(err);
    });
});

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