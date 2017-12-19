var express = require('express');
var app = express();
var firebase = require('firebase-admin');
var logger = require('morgan');
var path = require('path');
var index = require('./route/index')

//View Engine Setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', index.view);

app.listen(3000, () => console.log('App running on http://localhost:3000/.'));