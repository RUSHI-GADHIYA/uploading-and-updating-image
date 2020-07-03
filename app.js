var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var indexRouter = require('./routes/index');

var app = express();



// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mylib';

// Use connect method to connect to the server

// MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);

//     db.collection('books').insertOne({ a: 1, b: 26 }, function (err, r) {
//         assert.equal(null, err);
//         assert.equal(1, r.insertedCount);


//         console.log("inserted");
//     });

//     db.collection('books').insertMany([{ a: 2 }, { a: 3 }, { name: "rushi", lastname: "gadhiya" }], function (err, r) {
//         assert.equal(null, err);
//         assert.equal(3, r.insertedCount);
//     });

//     client.close();
// });






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});






module.exports = app;
