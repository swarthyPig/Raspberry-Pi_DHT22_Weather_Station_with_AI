var cheerio = require('cheerio');
var request = require('request');
var io = require('socket.io').listen(3000, function (req, res) {
    console.log('Listening on port 3000');
});

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
// Display data on console in the case of saving data.
thSchema.methods.info = function () {
    var thInfo = this.date
    ? "date: " + this.date +", Temp: " + this.temperature 
    + ", Humi: " + this.humidity 
    : "I don't have a date";
    console.log("thInfo: " + thInfo);
};

var dht22data = [];
var temp_Correlation = [];
var humi_Correlation = [];
var dateStr = '';
var CelsiusData = '';
var HumidityData = '';
var Pearson_correlation = '0';

var TH = mongoose.model("th", thSchema);  // sensor data model

var url = 'http://127.0.0.1:5000/'; // Flask address

var Celsius = '';

function getCelsius() {

    request(url, function (err, res, body) {

        var $ = cheerio.load(body);

        $('#data .Celsius').each(function () {
            Celsius = $(this).text().substring(26, 31);
        });
    });
    return Celsius;
}

var Humidity = '';

function getHumidity() {

    request(url, function (err, res, body) {

        var $ = cheerio.load(body);

        $('#data .Humidity').each(function () {
            Humidity = $(this).text().substring(12, 17);
        });
    });
    return Humidity;
}


function getDateString() {

    var time = new Date().getTime();
    var datestr = new Date(time + 32400000).toISOString().replace(/T/, ' ').replace(/Z/, '');

    return datestr;
}

function getPearsonCorrelation(x, y) {
    
    var shortestArrayLength = 0;
     
    if( x.length == y.length ) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
    }
  
    var xy = [];
    var x2 = [];
    var y2 = [];
  
    for(var i = 0; i < shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }
  
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;
  
    for(var j = 0; j < shortestArrayLength; j++) {
        sum_x += x[j];
        sum_y += y[j];
        sum_xy += xy[j];
        sum_x2 += x2[j];
        sum_y2 += y2[j];
    }
  
    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt(step2 * step3);
    var answer = ((step1 / step4).toFixed(2)) + "";
  
    return answer;
}

io.sockets.on('connection', function (socket) {

    socket.on('message', function (msg) {
        console.log(msg);
    });

    socket.on('disconnect', function () {});
});

setInterval( async (req, res) =>  {
    dateStr = getDateString();
    CelsiusData = getCelsius();
    HumidityData = getHumidity();
    
    dht22data[0] = dateStr; // Date
    dht22data[1] = CelsiusData; // temperature data
    dht22data[2] = HumidityData; // humidity data
    dht22data[3] = Pearson_correlation; //correlation data
    
    if(temp_Correlation.length < 10 && humi_Correlation.length < 10){
        temp_Correlation.push((parseFloat(CelsiusData)) + (parseFloat((Math.random()/1000).toFixed(7))));
        humi_Correlation.push(parseFloat(HumidityData));
        
    }else{
        Pearson_correlation = getPearsonCorrelation(temp_Correlation, humi_Correlation);
        temp_Correlation.splice(0, 1);
        temp_Correlation.push((parseFloat(CelsiusData)) + (parseFloat((Math.random()/1000).toFixed(7))));
        humi_Correlation.splice(0, 1);
        humi_Correlation.push(parseFloat(HumidityData));
    }
    
    var th = new TH({date:dateStr, temperature:CelsiusData, humidity:HumidityData});
        // save iot data (document) to MongoDB
    try {
        let newTH = await th.save();
        
    }catch(err) {
        console.log(err);
    }
    
    io.sockets.emit('message', dht22data);
    //console.log("Raspberry Pi," + dht22data);
}, 3000);
