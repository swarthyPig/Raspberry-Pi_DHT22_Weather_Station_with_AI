var express = require('express');
var router = express.Router();

// MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;  // Schema object
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/th'); // DB name
var db = mongoose.connection;    
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
        console.log("mongo db connection OK.");
});
// Schema
var thSchema = new Schema({
    date : String,
    temperature : String,
    humidity : String
});

var TH = mongoose.model("TH", thSchema);  // sensor data model

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index',{ title : 'RaspberryPi sensor'});
});
router.get('/th', function (req, res) {
    TH.find(function(err, data) {
        res.json(data);
    });
});
// find data by id
router.get('/th/:id', function (req, res) {
    TH.findById(req.params.id, function(err, data) {
        res.json(data);
    });
});

module.exports = router;
