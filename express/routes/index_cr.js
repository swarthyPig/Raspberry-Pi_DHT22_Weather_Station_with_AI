var express = require('express');
var router = express.Router();

// MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cr'); // DB name
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("mongo db connection OK.");
});
// Schema
var crSchema = new Schema({
    date: String,
    cr: String,
    gender: String,
    age : String
});
// Display data on console in the case of saving data.
crSchema.methods.info = function () {
    var crInfo = this.date 
        ? "date: " + this.date + ", CR: " + this.cr 
        + ", genger: " + this.gender
        + ", age: " + this.age
        : "I don't have a date";
    console.log("crInfo: " + crInfo);
};

var CR = mongoose.model("CR", crSchema); // sensor data model  

function getDateString() {

    var time = new Date().getTime();
    var datestr = new Date(time + 32400000).toISOString().replace(/T/, ' ').replace(/Z/, '');

    return datestr;
}

router.get('/', function(req,res){
    
    var dateStr = getDateString();
    var cr_value= req.query.CR;
    var gender_value = req.query.gender;
    var age_value = req.query.age;

    var cr = new CR({ date: dateStr, cr: cr_value, gender:gender_value, age: age_value });
    // save iot data (document) to MongoDB
    cr.save(function (err, cr) {
        if (err) return handleEvent(err);
        cr.info(); // Display the information of iot data  on console.
    }); 
    
    res.send("You chose CR value is = " + cr_value + " Thank you^^ ");
});

module.exports = router;
