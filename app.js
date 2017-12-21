var express = require('express');
var app = express();
var firebase = require('firebase-admin');
var logger = require('morgan');
var path = require('path');
var index = require('./route/index')
var bodyParser = require('body-parser');

//Openning connection to Firebase Database

var admin = require("firebase-admin");
var serviceAccount = require("./configs/Project Air-4cd2d236ab04.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-air-34a3f.firebaseio.com"
});

//Connecting to Firebase Database
/**
var db = admin.database();
var ref = db.ref("/users");
ref.once("value", function(snapshot) {
  console.log(snapshot.key);
}).catch(function (error){
    console.log('Failed to get value from Firebase.', error)
});**/
    
//View Engine Setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('firebase', admin);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', index.view);
app.get('/login', index.login);

app.post('/register', index.register);

app.listen(3000, () => console.log('App running on http://localhost:3000/.'));