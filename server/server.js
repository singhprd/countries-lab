var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/countries_lab';


app.use(express.static('../client/build'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.post('/favcountries', function(req, res) {
  console.log(req.body.name);
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('waaaa');
    }
    var favs = db.collection('favs');
    favs.insert({'name': req.body.name});
    console.log('yaaay');
    db.close();

  });
  res.send('scooby snacks');
});

app.get('/favcountries', function(req, res){
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log('waaaaaaaaaa');
    }
    var favs = db.collection('favs');
    favs.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
});

app.get('/deleteDatabase', function(req, res) {
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log('waaaaaaaaaa');
    }  
    var favs = db.collection('favs');
    favs.remove();
  });
  res.status(200).end();
});


  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
