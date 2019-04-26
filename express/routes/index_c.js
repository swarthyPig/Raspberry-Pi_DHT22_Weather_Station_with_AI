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
      console.log('===>  Error connecting to th');
      console.log('Reason: th');
  } else {
      console.log('===>  Succeeded in connecting to th');
  }
}); // DB name

// Schema
var thSchema = new Schema({
    date : String,
    temperature : String,
    humidity : String
});

var TH = mongoose.model("th", thSchema);  // sensor data model

/* GET home page. */
router.get('/', async (req, res, next) => {
    
    res.render('index',{ title : 'RaspberryPi sensor'});
});

router.get('/th', async (req, res) => {
    
    try {
        let th = await TH.find({}).exec();
        res.json(th);
        
    } catch(err){
        console.log(err);
    }
});

// find data by id
router.get('/th/:id', async (req, res) => {
    
    try {
        let th = await TH.findById(req.params.id).exec();
        res.json(th);
    } catch(err){
        console.log(err);
    }
    
});

module.exports = router;
