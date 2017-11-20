// server.js

// init project
var express = require('express');
var bodyParser = require('body-parser');
var pug = require('pug');
var less = require('less');
var expressLess = require('express-less');
var app = express();


// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/less-css', expressLess(__dirname + '/less', { cache: false }));
app.use(express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.render('index.pug', {name: "bob"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
