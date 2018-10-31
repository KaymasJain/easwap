const PushBullet = require('pushbullet');
const pusher = new PushBullet(require('../keys/push.json').pvt);

module.exports = {
    sendPush: function (target, type, title, linkORtext) {
        pusher[type](target, title, linkORtext, function() {
            console.log(`Push sent to ${target} - ${title}`);
        });
    }
}