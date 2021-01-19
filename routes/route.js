var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var { savedata, updatedata, getdata } = require('../controller/handleuser')


// ***************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,
            Date.now() + file.originalname);
    }

});

var upload = multer({ storage: storage });


router.post('/save', upload.single('photo'), savedata)

router.put('/update/:id',
    //  upload.single('photo'),
    updatedata
    // , upload.single('photo')
)


router.get('/get/:id', getdata);
module.exports = router;