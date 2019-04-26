var express = require('express');
var router = express.Router();

// MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/iot',{
    keepAlive: 300000,
    connectTimeoutMS: 30000,
}, (err) => {
  if (err) {
      console.log('===>  Error connecting to cr');
      console.log('Reason: th');
  } else {
      console.log('===>  Succeeded in connecting to cr');
  }
}); // DB name
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

var CR = mongoose.model("cr", crSchema); // sensor data model  

function getDateString() {

    var time = new Date().getTime();
    var datestr = new Date(time + 32400000).toISOString().replace(/T/, ' ').replace(/Z/, '');

    return datestr;
}

router.get('/', async (req, res) => {

    var cr = new CR({ date: getDateString(), cr: req.query.CR, gender:req.query.gender, age: req.query.age });
    // save iot data (document) to MongoDB
    try {
        let newCR = await cr.save();
      
    } catch(err) {
        console.error(err);
    }
    
    res.send("You chose CR value is = " + req.query.CR + " Thank you^^ ");
});

module.exports = router;
