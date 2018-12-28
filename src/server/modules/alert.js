const request = require('request')

module.exports = {
    sendNotification: function (title, message, status) {
        request.post('https://hooks.slack.com/services/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', {
            json: {
                text: title,
                attachments: [
                    {
                        color: status,
                        text: message
                    }
                ]
            }
        });
        console.log(`Slack Notification sent !`);
    }
}
