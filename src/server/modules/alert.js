const request = require('request')

module.exports = {
    sendNotification: function (message, status) {
        request.post('https://hooks.slack.com/services/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', {
            json: {
                text: "New notification from Easwap Server: ",
                attachments: {
                    color: status,
                    text: message
                }
            }
        });
        console.log(`Slack Notification sent !`);
    }
}
