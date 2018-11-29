const request = require('request')

module.exports = {
    sendNotification: function (message, status) {
        request.post('***REMOVED***', {
            json: {
                text: "New notification from Easwap Server: ",
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
