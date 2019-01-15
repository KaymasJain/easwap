const request = require('request');

exports.shoot = (text, color, isText) => {
  let dataString;
  if (isText) {
    dataString = `{"text": ${text}}`;
  } else {
    dataString = `{
            "attachments": [{
                "text": "${text}",
                "color": "${color}"
            }]
        }`;
  }
  request({
    url: `https://hooks.slack.com/services/${process.env.SLACK_KEY}`,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: dataString
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(`Slack: ${body}`);
    }
  });
};