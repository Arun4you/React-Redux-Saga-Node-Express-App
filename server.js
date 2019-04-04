var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');
var cors = require('cors')
var app = express();

require('dotenv').config({
    silent: true
});

app.options('*', cors());

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true }, (err) => {
    if (err) console.log(err);
    console.log("ReactGram MongoDB connected");
})

// Middleware
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(__dirname + '/client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var imagesRoute = require('./routes/imagesRoute');

app.use('/images', imagesRoute);

app.listen(process.env.PORT, function (err) {
    if (err) console.log(err);
    console.log("Server is Running on port " + process.env.PORT);
});
