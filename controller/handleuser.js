
var user = require('../models/usermodel');

// var multer = require('multer');
var fs = require('fs');
var path = require('path');

const fileHelper = require('../util/file');

// var form = new formidable.IncomingForm();

exports.savedata = async (req, res, next) => {

    // form.parse(req, function (err, fields, files) {
    //     var filename = files.upload.name;
    // });


    var header = req.headers.host;
    var protocol = req.protocol;

    var imagename = req.file.filename;

    // http://localhost:3500/1610436759017600PX.png

    // var imageurl = `${protocol}://${header}/${imagename}`;

    var imageLink = req.file.path;



    var { firstname, lastname, email } = req.body;
    var newUser = new user();
    newUser.firstname = firstname;
    newUser.lastname = lastname;

    newUser.email = email;
    newUser.imageUrl = imageLink;


    newUser.save().then(() => (res.json('added')));

    // .catch(
    //     (err => {

    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         })
    //     })
    // );
    console.log(newUser);

}

// *********>>>>>>>>>>>>>>>>>>   UPDATE  NOTE : NOT PASS NEW MODEL <<<<<<<<<<<<<<<<<<<<<***********


exports.updatedata = async (req, res, next) => {


    var { firstname, lastname, email } = req.body;


    const image = req.file;

    console.log(req.body);
    user.findById(req.params.id)
        .then(data => {

            data.firstname = firstname;
            data.lastname = lastname;
            data.email = email;


            if (image) {
                fileHelper.deleteFile(data.imageUrl);
                data.imageUrl = image.path;
            }
            return data.save().then(result => {
                console.log('UPDATED data!');
                res.end()
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });


















    // var imagefile = '' ;


    // var { firstname, lastname, email } = req.body;
    // var newUser = {
    //     firstname: firstname,
    //     lastname: lastname,
    //     email: email,

    //     // imagename: imageurl
    // }

    // user.findByIdAndUpdate(req.params.id, newUser,
    //     function (err, docs) {
    //         if (err) {
    //             console.log(err)
    //         }
    //         else {
    //             res.json('updated')
    //         }
    //     });

    // res.json(req.body)














}


//     user.findById(req.params.id, (err, data) => {

//         var str = data.imagename;
//         var res = str.split('http://localhost:3500/')


//         // console.log(data.imagename);

//         imagefile = res[1];

//         console.log(imagefile)




//         process.cwd();

//         fs.unlink('uploads/' + imagefile, (err) => {


//             if (err) {
//                 console.log(err)

//                 // return res.status(200).send(err);

//             }
//             else {


//                 try {
//                     const storage = multer.diskStorage({
//                         destination: function (req, file, cb) {
//                             cb(null, 'uploads/')
//                         },
//                         filename: function (req, file, cb) {
//                             cb(null,
//                                 Date.now() + file.originalname);
//                         }

//                     });

//                     var upload = multer({ storage: storage });

//                     upload.single('photo');
//                 } catch (error) {
//                     console.log(error)
//                 }


//                 // **************************************


//                 ////////
//                 try {
//                     var header = req.headers.host;
//                     var protocol = req.protocol;

//                     var imagename = req.file.filename;
//                     var imageurl = `${protocol}://${header}/${imagename}`;

//                     user.findByIdAndUpdate(req.params.id, { imagename: imageurl },
//                         function (err, docs) {
//                             if (err) {
//                                 console.log(err)
//                             }
//                             else {
//                                 res.json('updated')
//                             }
//                         });


//                 } catch (error) {

//                     console.log(error)
//                 }

//                 /////////////



//             }
//         })

//         // char: success
//         // return res.status(200).send('Successfully! Image has been Deleted');
//         //     console.log('Successfully deleted')
//         // next();




//         //     });
//         //     // console.log('successfully deleted /tmp/hello');

//     })

// }
//     catch (err) {
// // handle the error
// // return res.status(400).send(err);
// console.log(err)
//                     }



// });




// var header = req.headers.host;
// var protocol = req.protocol;

// var imagename = req.file.filename;
// var imageurl = `${protocol}://${header}/${imagename}`;




// user.findById(req.params.id, (err, data) => {

//     console.log(data.imagename);
//     // res.send(data.imagename)
// });

// .then(() => (res.json('updated')));
// ***********************
//   try {
//         fs.unlinkSync(DIR + '/' + req.params.imagename + '.png');
//         console.log('successfully deleted /tmp/hello');
//         return res.status(200).send('Successfully! Image has been Deleted');
//     } catch (err) {
//         // handle the error
//         return res.status(400).send(err);
//     }

// ************************
// .catch(
//     (err => {

//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     })
// );
// console.log(newUser);


// res.end()
// }









exports.ifdeleted = async (req, res, next) => {

    user.findByIdAndUpdate(req.params.id, newUser,
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                res.json('updated')
            }
        });


}



exports.getdata = async (req, res, next) => {

    user.findById(req.params.id, (err, data) => {
        if (!err) {
            console.log(data)

            res.json(data)
            res.end()
        }
        console.log(err);

    })



    // console.log(path.normalize("../uploads" + path))

    // res.send(path.__dirname)
}
