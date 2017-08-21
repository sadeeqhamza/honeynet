var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var cors = require('cors');

app.use(express.static('public'));



router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/",router);
app.use(cors());


var request = require('request');



app.get('/getHoney', function (req, res) {
  request('http://151.80.145.179/api/session/?api_key=e4125eabf94a4a65918429cd29b3d50d&limit=100&hours_ago=1&honeypot=snort', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = body;
      myObj = new Object()
      myObj= info
      console.log(myObj);
      res.send(myObj);
    }
})
})



var port = process.env.PORT || 3000;
app.listen(port);
