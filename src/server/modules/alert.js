const request = require('request')

module.exports = {
    sendNotification: function (title, message, status) {
        if (process.env.PRODUCTION == "true") {
            var slack_url = process.env.SLACK_URL
            request.post(slack_url, {
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
}
