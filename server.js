var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var cors = require('cors');
const geoip = require('geo-from-ip')
app.use(express.static('public'));



router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", function(req, res) {
    res.sendFile(path + "index.html");
});

app.use("/", router);
app.use(cors());


var request = require('request');



app.get('/getHoney', function(req, res) {
    request('http://151.80.145.179/api/session/?api_key=e4125eabf94a4a65918429cd29b3d50d&limit=100&hours_ago=1&honeypot=snort', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = body;
            myObj = new Object()
            myObj = info
            console.log(myObj);
            res.send(myObj);
        }
    })
})

app.get('/getHoneyGeo', function(req, res) {
    request('http://151.80.145.179/api/session/?api_key=e4125eabf94a4a65918429cd29b3d50d&limit=100&hours_ago=1&honeypot=snort', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var geoData = [];
            var info = body;
            myObj = new Object()
            var geoObj = new Object();

            myObj = JSON.parse(info);
            for (var i = 0; i < myObj.data.length; i++) {


                if (geoip.allData(myObj.data[i].source_ip).location) {


                    geoData.push({

                        type: 'public',
                        identifier: myObj.data[i].identifier,
                        protocol: myObj.data[i].protocol,
                        timestamp: myObj.data[i].timestamp,
                        source_port: myObj.data[i].source_port,
                        source_ip: myObj.data[i].source_ip,
                        lat: geoip.allData(myObj.data[i].source_ip).location.latitude,
                        lon: geoip.allData(myObj.data[i].source_ip).location.longitude

                    });



                } else {


                    geoData.push({
                        type: 'private',
                        identifier: myObj.data[i].identifier,
                        protocol: myObj.data[i].protocol,
                        timestamp: myObj.data[i].timestamp,
                        source_ip: myObj.data[i].source_ip,

                    });


                }

            }
            console.log(geoData);

            res.send(JSON.parse(geoData));

        }
    })
})




var port = process.env.PORT || 3000;
app.listen(port);
