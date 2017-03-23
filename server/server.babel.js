import express from 'express';
import bodyParser from 'body-parser';
import firebase from 'firebase';
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

firebase.initializeApp(config);
let database = firebase.database();

app.get('/api', (req, res) => {
  database.ref('/').once('value')
    .then((snapshot) => {
      let data = snapshot.val();  
      res.status(200).send(data);
    })
    .catch((error) => console.log(error));
});

app.post('/api', (req, res) => {
  let data = req.body;
  let name = data.api;
  let payload = data.payload;

  if(name === 'users') {
    database.ref(name + '/').child(data.userId).set(payload)
      .then((err) => res.send(err), (err) => res.send(err));
  } else {
    database.ref(name + '/').push(payload)
      .then((err) => res.send(err), (err) => res.send(err));    
  }
});


app.use('/', express.static('public'));


const port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on', port);