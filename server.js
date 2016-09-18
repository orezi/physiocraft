// server.js

// modules =================================================
var express        = require('express');
var app            = express();
require('dotenv').load();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database
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



// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes/user.route')(app); // configure our routes
require('./app/routes/patient.route')(app);
require('./app/routes/treatment.route')(app);
require('./app/routes/product.route')(app);
require('./app/routes/source.route')(app);
require('./app/routes/media.route')(app);
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('check port ' + port);

// expose app           
exports = module.exports = app;                         
