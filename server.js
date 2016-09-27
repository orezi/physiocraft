// server.js
var express        = require('express');
var app            = express();
require('dotenv').load();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');

var db = require('./config/db');
var port = process.env.PORT || 8080; 
mongoose.connect(db.database);

// get all data/stuff of the body (POST) parameters

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// parse application/json 
app.use(bodyParser.json()); 
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, Authorization');
  next();
});

app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes/user.route')(app);
require('./app/routes/patient.route')(app);
require('./app/routes/treatment.route')(app);
require('./app/routes/product.route')(app);
require('./app/routes/source.route')(app);
require('./app/routes/media.route')(app);
app.listen(port);               
console.log('check port ' + port);
exports = module.exports = app;                         
