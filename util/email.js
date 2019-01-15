// const nodemailer = require('nodemailer');
// const ses = require('nodemailer-ses-transport');

// const awssesObj = {
//   accessKeyId: process.env.AWS_SES_PUB,
//   secretAccessKey: process.env.AWS_SES_PVT,
//   region: 'us-west-2',
//   rateLimit: 5
// };

// // emailObj format
// // {
// //   from: 'MakerScan <info@instadapp.io>',
// //   to: "",
// //   replyTo: 'info@instadapp.io',
// //   subject: "",
// //   html: ""
// // }

// const transporter = nodemailer.createTransport(ses(awssesObj));
// module.exports = {
//   shoot(emailObj) {
//     transporter.sendMail(emailObj, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(`Emailed | ${emailObj.to} | ${emailObj.subject}`);
//       }
//     });
//   }
// };
