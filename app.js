var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var logger = require('morgan');
var multer = require('multer');
var upload = multer();

var userroute = require('./routes/route')
var path = require('path');

app.use(logger('dev'));

var mongourl = "mongodb://localhost:27017/usermodel"
mongoose.connect(mongourl, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, (err) => { if (!err) { console.log('conected to mongodb..') } else { console.log(err.message) } });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())






// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// for parsing multipart/form-data
//app.use(upload.array());
app.use(express.static('./uploads'))


// app.set('uploads', path.join(__dirname, '../backup'));


// express.static(path.join(__dirname, './uploads'));

var port = 3500;


app.get('/', (req, res) => {

    res.send("hello ")

})

app.use('/user', userroute)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

})
