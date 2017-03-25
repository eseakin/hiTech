import express from 'express';
import bodyParser from 'body-parser';
var path = require('path');
const favicon = require('serve-favicon')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname,'../','public','favicon.png')));

const config = { 
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

app.get('/config', (req, res) => {
  res.status(200).send(config)
});

app.use('/', express.static('public'));


const port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on', port);