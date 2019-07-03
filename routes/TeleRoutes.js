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


// Scenes Here


// add Scene
const addScene = new Scene('addScene');
addScene.enter((req) => req.reply('Enter ETH id'))
addScene.leave((req) => req.reply('b\'bye'))
addScene.hears(/(^0x[a-fA-F0-9]{40}$)/, (req) => TeleAlert.addFunction(req))
addScene.hears("bye", leave('addScene'))


// Staging scenes here
const stage = new Stage([addScene], {
    ttl: 10
})




bot.use(session())
bot.use(stage.middleware())



// Commands Here



bot.start((req) => {
    TeleAlert.start(req);
});


// On Command /add
// bot.hears('/add (.+)/', (req)=> TeleAlert.addFunction(req))
bot.command('add', enter('addScene'));


// On Command /remove
bot.command('remove', (req) => {
    TeleAlert.removeFunction(req)
});




// On Command /help
bot.command('help', (req) => {
    TeleAlert.helpFunction(req)
});


bot.command('about', (req) => {
    TeleAlert.aboutFunction(req)
});

bot.command('stats', (req) =>{
    TeleAlert.statsFunction(req)
});

// Start Polling.
bot.startPolling();