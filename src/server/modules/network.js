const http = require('http');
const alert = require('./alert');

module.exports.init = (app) => {
    let port = app.locals.port;
    http.createServer(app).listen(port, error => {
        if (error) throw error
        console.log(`Magic is Happening at here ${port}`);
        // alert.sendPush('sjain0410@gmail.com', 'note', `Easwap server started at ${port}`, ":)");
    });
}
