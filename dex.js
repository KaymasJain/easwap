'use strict';

const express = require('express'),
	path = require('path'),
	nunjucks = require('nunjucks'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	compression = require('compression'),
	admin = require('firebase-admin');

require('dotenv').load();

const network = require('./src/server/modules/network'),
	routes = require('./src/server/routes/routes'),
	restApis = require('./src/server/modules/restApis');

// initializing different instances on the server
const app = express();

admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEYS)),
	databaseURL:process.env.FIREBASE_DATABASE
});

// var dbFirestore = admin.firestore();
var db = admin.database();

app.locals.db = db;
app.locals.port = 8000;
network.init(app);
restApis.init(app);

if (process.env.localURL) {
	app.locals.URL = `http://localhost:${app.locals.port}`;
} else {
	app.locals.URL = `https://easwap.com`;
}

app.set('trust proxy', true);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(compression());
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'src/client/public'), {
	maxAge: '750h'
}));

var routePath = '';
for (var i = 0; i < 7; i++) {
	routePath += `/:id${i}`;
	app.use(routePath, express.static(path.join(__dirname, 'src/client/public'), {
		maxAge: '750h',
		redirect: false // to remove slash '/' from the last of url
	}));
}

app.use('/', routes);

nunjucks.configure('./src/client/views', {
	autoescape: false,
	express: app
});
app.set('view engine', 'nunjucks');

exports.module = app;


// Kyber's API's
// Main API with all addresses - https://tracker.kyber.network/api/tokens/pairs
// Coins main net addreses and coin market cap names of coins - https://tracker.kyber.network/api/tokens/supported
// Coins ropsten net addreses and coin market cap names of coins - https://tracker.kyber.network/api/tokens/supported?chain=ropsten
// Price details of coins - https://tracker.kyber.network/api/tickers
// Kovan coins addresses - https://github.com/KyberNetwork/smart-contracts/blob/master/web3deployment/kovanV2.json