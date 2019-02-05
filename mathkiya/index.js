const express = require('express');
const config = require('./config.js')
MongoClient = require('mongodb').MongoClient;


var app = express();


const url = config.db.url;
const dbName = config.db.name;
let dbRetries = 1;

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.post("/number/:number", function(req, res) {

  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log("ERROR CONNECTING TO DB",err);
      res.send("Database Under maintainance");
      return;
    }
    let numbers = client.db(dbName).collection('numbers');
    numbers.insertOne({
      number: req.params.number
    }, function(err, success) {
      if (err) {
        console.log(err);
        res.send("Updating failed");
      }
      if (success) {
        res.send("Success to add data");
      }
      return;
    })
    client.close();
  });
});

app.get("/numbers",function(req,res){
    MongoClient.connect(url,function(err,client){
      if(err){
        console.log("ERROR CONNECTING TO DB",err);
        res.send("Database Under maintainance");
        return;
      }
      let numbers = client.db(dbName).collection('numbers');
      numbers.find().toArray(function(err,result){
        if(err){
          return;
        }
        res.json(result.map(record=>record.number));
      })
      client.close();
    })
})

app.listen(config.port, () => console.log(`Magic happens here ${config.port}`));
