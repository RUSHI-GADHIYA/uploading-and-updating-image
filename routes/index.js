var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var bodyparser = require('body-parser');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Connection URL
const url = 'mongodb://localhost:27017';

var dbconn = MongoClient.connect(url, { useUnifiedTopology: true });
// Database Name
const dbName = 'mylib';








router.get('/submit-form', (req, res) => {
  res.render('submit');
})



router.post('/submit-form', (req, res) => {

  var name = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var date = req.body.date;

  var data = {
    "name": name,
    "email": email,
    "password": pass,
    "date": date
  }

  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('books').insertOne(data, function (err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);


      console.log("inserted");
    });



    client.close();
  });


  res.send(req.body)
  console.log(req.body)
})

module.exports = router;
