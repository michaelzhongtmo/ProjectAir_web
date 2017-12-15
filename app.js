var express = require('express')
var app = express();
var firebase = require('firebase')
var logger = require('morgan')
var path = require('path')


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('App running locally. Use http://localhost:3000/ to access it.'))