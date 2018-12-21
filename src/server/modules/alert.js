const request = require('request')

module.exports = {
    sendNotification: function (title, message, status) {
        request.post('***REMOVED***', {
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
