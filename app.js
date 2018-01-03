var express = require('express');
var app = express();
var admin = require('firebase-admin');
var logger = require('morgan');
var path = require('path');
var main = require('./route/main');
var index = require('./route/index');
var loading = require('./route/loading')
var bodyParser = require('body-parser');
var session = require('express-session');
//Openning connection to Firebase Database


require('dotenv').load();

console.log(process.env.FIREBASE_CONFIG);

var serviceAccount = {
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVIATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URL,
    "token_uri": process.env.TOKEN_URL,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}


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
app.use(session({secret:'Test1234'}));

app.get('/', index.view);
app.get('/loading', loading.view);
app.get('/main', main.view);
app.get('/loading_task', loading.task);


app.post('/register', index.register);
app.post('/login', index.login);
app.post('/logout', main.logout);


module.exports = app;